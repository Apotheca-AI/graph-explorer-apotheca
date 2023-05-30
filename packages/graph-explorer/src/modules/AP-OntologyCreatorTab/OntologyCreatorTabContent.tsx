import { useCallback, useMemo, useState, useRef, useEffect } from "react";
import type { Vertex } from "../../@types/entities";
import { ModuleContainerFooter, VertexIcon } from "../../components";
import Button from "../../components/Button";
import ExpandGraphIcon from "../../components/icons/ExpandGraphIcon";
import GraphIcon from "../../components/icons/GraphIcon";
import LoadingSpinner from "../../components/LoadingSpinner";
import PanelEmptyState from "../../components/PanelEmptyState/PanelEmptyState";
import { useWithTheme, withClassNamePrefix } from "../../core";
import useConfiguration from "../../core/ConfigurationProvider/useConfiguration";
import fade from "../../core/ThemeProvider/utils/fade";
import { useExpandNode } from "../../hooks";
import useDisplayNames from "../../hooks/useDisplayNames";
import useNeighborsOptions from "../../hooks/useNeighborsOptions";
import useTextTransform from "../../hooks/useTextTransform";
import useTranslations from "../../hooks/useTranslations";
import NeighborsList from "../common/NeighborsList/NeighborsList";
import defaultStyles from "./OntologyCreatorTabContent.styles";
import { nodesAtom } from "../../core/StateProvider/nodes";

import { AdvancedList, Carousel } from "../../components";
import toAdvancedList from "./toAdvancedList";
import { useSet } from "../../hooks";
import { CarouselRef } from "../../components/Carousel/Carousel";
import NodeDetail from "../EntityDetails/NodeDetail";
import InputForm from "./InputForm";


export type OntologyCreatorTabContentProps = {
  classNamePrefix?: string;
  vertex: Vertex;
  vertexArray:Vertex[]
};

const OntologyCreatorTabContent = ({
  classNamePrefix = "ft",
  vertex,
  vertexArray,
  
}: OntologyCreatorTabContentProps) => {
  const config = useConfiguration();
  const t = useTranslations();
  const expandNode = useExpandNode();
  const styleWithTheme = useWithTheme();
  const pfx = withClassNamePrefix(classNamePrefix);

  const [isExpanding, setIsExpanding] = useState(false);

  const textTransform = useTextTransform();
  const neighborsOptions = useNeighborsOptions(vertex);

  const [selectedType, setSelectedType] = useState<string>(
    neighborsOptions[0]?.value
  );
  const selection = useSet<string>(new Set());

  const carouselRef = useRef<CarouselRef>(null);
    useEffect(() => {
    carouselRef.current?.slideTo(selection.state.size - 1);
    }, [selection.state.size]);
  const displayLabels = useMemo(() => {
    return (vertex.data.types ?? [vertex.data.type])
      .map(type => {
        return (
          config?.getVertexTypeConfig(type)?.displayLabel || textTransform(type)
        );
      })
      .filter(Boolean)
      .join(", ");
  }, [config, textTransform, vertex.data.type, vertex.data.types]);

  const getDisplayNames = useDisplayNames();
  const { name } = getDisplayNames(vertex);
  const vtConfig = config?.getVertexTypeConfig(vertex.data.type);


  const resultItems = useMemo(() => {
    return toAdvancedList(vertexArray, {

      getItem: vertex => {
        const vtConfig = config?.getVertexTypeConfig(vertex.data.type);
        const { name, longName } = getDisplayNames(vertex);
        return {
          className: 'test',
          id: vertex.data.id,
          title: name,
          subtitle: longName,
          icon: (
            <VertexIcon
              iconUrl={vtConfig?.iconUrl}
              iconImageType={vtConfig?.iconImageType}
            />
          ),
          properties: vertex,
        };
      },
    });
  }, [
    
    config,
    getDisplayNames,
    textTransform,
    pfx,
  ]);
  return (
    <div className={styleWithTheme(defaultStyles(classNamePrefix))}>
      <div className={pfx("header")}>
        <InputForm
        vertexArray={vertexArray}/>

        
      </div>
      
      <AdvancedList
        classNamePrefix={classNamePrefix}
        className={pfx("search-results-advanced-list")}
        items={resultItems}
        draggable={false}
        defaultItemType={"graph-viewer__node"}
        onItemClick={(event: any, item: { id: any; }) => {
          selection.toggle(item.id);
        }}

        selectedItemsIds={Array.from(selection.state)}
        hideFooter
      />
      {/**NEED TO DECIDE IF I WANT TO HAVE THE CAROUSEL HERE OR NOT. MAY BE TOO OVERWHELMING WITH THE INPUT OF EVERTHING ELSE */}
        {/*selection.state.size > 0 && (
          <Carousel
            ref={carouselRef}
            slidesToShow={1}
            className={pfx("carousel")}
          >
            {Array.from(selection.state).map(nodeId => {
              const node = vertexArray.find(
                n => n.data.id === nodeId
              );
              return node !== undefined ? (
                <NodeDetail
                  key={nodeId}
                  node={node}
                  hideNeighbors={true}
                />
              ) : null;
            })}
          </Carousel>
          )*/}
      
        <>

                <Button
        variant={"filled"}
        size={"base"}
        rounded={true}
        onPress={()=>{console.log(vertexArray)}}
        > print the current list</Button></>
      

    </div>
  );
};

export default OntologyCreatorTabContent;
