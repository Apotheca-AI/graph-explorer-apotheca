import { css, cx } from "@emotion/css";
import { useClickOutside, useHotkeys } from "@mantine/hooks";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Vertex } from "../../@types/entities";

import {
  AddCircleIcon,
  AdvancedList,
  Card,
  Carousel,
  CloseIcon,
  GraphIcon,
  IconButton,
  Input,
  LoadingSpinner,
  PanelEmptyState,
  RemoveIcon,
  SearchIcon,
  Select,
  OntologySelect,
  VertexIcon,
} from "../../components";

import { CarouselRef } from "../../components/Carousel/Carousel";
import HumanReadableNumberFormatter from "../../components/HumanReadableNumberFormatter";
import RemoveFromCanvasIcon from "../../components/icons/RemoveFromCanvasIcon";
import {
  fade,
  useConfiguration,
  useWithTheme,
  withClassNamePrefix,
} from "../../core";
import { useEntities, useFetchNode, useSet } from "../../hooks";
import useDisplayNames from "../../hooks/useDisplayNames";
import useTextTransform from "../../hooks/useTextTransform";
import useTranslations from "../../hooks/useTranslations";

import NodeDetail from "../EntityDetails/NodeDetail";
import defaultStyles from "./OntologySearch.styles";
import toAdvancedList from "./toAdvancedList";
import useOntologySearch from "./useOntologySearch";

import { OntologyList } from "../AP-OntologyListTab/StoredOntologyList";

export type KeywordSearchProps = {
  classNamePrefix?: string;
  className?: string;
};

const KeywordSearch = ({
  classNamePrefix = "ft",
  className,
}: KeywordSearchProps) => {
  const config = useConfiguration();
  const t = useTranslations();
  const fetchNode = useFetchNode();
  const [entities, setEntities] = useEntities();
  const styleWithTheme = useWithTheme();
  const pfx = withClassNamePrefix(classNamePrefix);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const [isFocused, setInputFocused] = useState(true);
  const selection = useSet<string>(new Set());

  const {
    isFetching,
    onSearchTermChange,
    onVertexOptionChange,
    
    searchResults,
    searchTerm,
    selectedVertexType,
    vertexOptions,
    selectedAttribute,
    attributesOptions,
    onAttributeOptionChange,

    ontologyOptions,
    selectedOntologyName,
    onOntologyChange,

    fetchedData,

  } = useOntologySearch({
    isOpen: isFocused,
  });

  const onInputFocusChange = useCallback(
    (isFocused: boolean) => () => {
      setInputFocused(isFocused);
    },
    []
  );

  const ref = useClickOutside(onInputFocusChange(false));
  useHotkeys([["Escape", onInputFocusChange(false)]]);

  const noResultsAfterFetching = !isFetching && fetchedData.length === 0;
  const withResultsAfterFetching = !isFetching && fetchedData.length > 0;
  const getDisplayNames = useDisplayNames();
  const textTransform = useTextTransform();
  //console.log('outside here')
  //console.log(fetchedData)
  const resultItems = useMemo(() => {
    return toAdvancedList(fetchedData, {
      
     
      
      /*
      getGroupLabel: vertex => {
        const vtConfig = config?.getVertexTypeConfig(vertex.data.type);
        return vtConfig?.displayLabel || textTransform(vertex.data.type);
      },*/

      /*getItem: ontology =>{

      }*/
      getItem: vertex => {
        //console.log(fetchedData[0].data.attributes)
        const vtConfig = config?.getVertexTypeConfig(vertex.data.type);
        const { name, longName } = getDisplayNames(vertex);
        return {
          className: css`
            .ft-start-adornment {
              background-color: ${fade(vtConfig?.color, 0.2)} !important;
              color: ${vtConfig?.color} !important;
            }
          `,
          id: vertex.data.id,
          title: name,
          subtitle: longName,
          icon: (
            <VertexIcon
              iconUrl={vtConfig?.iconUrl}
              iconImageType={vtConfig?.iconImageType}
            />
          ),
          endAdornment: entities.nodes.find(
            n => n.data.id === vertex.data.id
          ) ? (
            <IconButton
              tooltipText={"Remove from canvas"}
              icon={
                <RemoveFromCanvasIcon className={pfx("graph-remove-icon")} />
              }
              size={"small"}
              variant={"text"}
              onPress={() => {
                setEntities(prev => {
                  return {
                    ...prev,
                    nodes: prev.nodes.filter(n => n.data.id !== vertex.data.id),
                    forceSet: true,
                  };
                });
              }}
            />
          ) : (
            <IconButton
              tooltipText={"Add to canvas"}
              icon={<AddCircleIcon />}
              size={"small"}
              variant={"text"}
              onPress={() => {
                fetchNode(vertex);
                setInputFocused(true);
              }}
            />
          ),
          properties: vertex,
        };
      },
    });
  }, [
    fetchedData,
    config,
    getDisplayNames,
    textTransform,
    entities.nodes,
    pfx,
    setEntities,
    fetchNode,
  ]);

  const isTheNodeAdded = (nodeId: string): boolean => {
    const possibleNode = entities.nodes.find(
      addedNode => addedNode.data.id === nodeId
    );
    return possibleNode !== undefined;
  };

  const getNodeIdsToAdd = () => {
    const selectedNodeIds = Array.from(selection.state);
    return selectedNodeIds.filter(nodeId => !isTheNodeAdded(nodeId));
  };

  const getNodeSearchedById = (nodeId: string): Vertex | undefined => {
    return fetchedData.find(result => result.data.id === nodeId);
  };

  const addSelectedNodesMessage = () => {
    const nodeIdsToAdd = getNodeIdsToAdd();
    const numberOfNodesToAdd =
      nodeIdsToAdd.length > 0 ? `(${nodeIdsToAdd.length})` : "";
    return `Add Selected ${numberOfNodesToAdd}`;
  };

  const handleOnClose = useCallback(() => {
    selection.clear();
    setInputFocused(true);
  }, [selection]);

  const handleAddEntities = () => {
    const nodeIdsToAdd = getNodeIdsToAdd();
    const nodes = nodeIdsToAdd
      .map(getNodeSearchedById)
      .filter(Boolean) as Vertex[];
    fetchNode(nodes);
    handleOnClose();
  };


  // fxn for button to select entire list
  const setAllActive =()=> {
    
    setEntities
  }



  const currentTotal = useMemo(() => {
    if (!config?.vertexTypes.length) {
      return null;
    }

    if (selectedVertexType === "__all") {
      let total = 0;

      for (const vt of config.vertexTypes) {
        const currTotal = config?.getVertexTypeConfig(vt)?.total;
        if (currTotal == null) {
          return null;
        }

        total += currTotal;
      }

      return total;
    }

    const vtConfig = config?.getVertexTypeConfig(selectedVertexType);
    return vtConfig?.total;
  }, [config, selectedVertexType]);

  useEffect(() => {
    selection.clear();
    // selection is non-trivial type, and it makes the effect change infinitely
    // selection.clear does not have deps,
    // so its initial value is valid for resetting the selection
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVertexType, searchTerm]);

  const carouselRef = useRef<CarouselRef>(null);
  useEffect(() => {
    carouselRef.current?.slideTo(selection.state.size - 1);
  }, [selection.state.size]);

  return (
    <div
      ref={rootRef}
      id={"keyword-search-module"}
      className={cx(styleWithTheme(defaultStyles(classNamePrefix)), className)}
    >

      {isFocused && (
        <Card className={pfx("panel-container")} elevation={3}>
          <div className={pfx("search-controls")}>
            
            <OntologySelect
              className={pfx("entity-select")}
              label={'Ontology Select'}
              labelPlacement={"inner"}
              hideError={true}
              selectionMode={"single"}
              options={ontologyOptions}
              value={selectedOntologyName}
              onChange={onOntologyChange}
              menuWidth={200}   
            />
            
          </div>
          <div className={pfx("search-results")}>
            {isFetching && (
              <PanelEmptyState
                classNamePrefix={classNamePrefix}
                title={"Searching..."}
                subtitle={
                  <div>
                    Looking {currentTotal != null && "at "}
                    {currentTotal != null && (
                      <HumanReadableNumberFormatter
                        value={currentTotal}
                        maxFractionDigits={0}
                      />
                    )}
                    {currentTotal != null && " records "}
                    for matching results
                  </div>
                }
                icon={<LoadingSpinner />}
              />
            )}
            {noResultsAfterFetching && (
              <PanelEmptyState
                classNamePrefix={classNamePrefix}
                title={"Please Select an Ontology"}
                subtitle={"Or build a new one in the Ontology Creator Tab"}
                icon={<SearchIcon />}
              />
            )}
            {withResultsAfterFetching && (
              <div className={pfx("search-results-grid")}>
                <></>
                <AdvancedList
                  classNamePrefix={classNamePrefix}
                  className={pfx("search-results-advanced-list")}
                  items={resultItems}
                  draggable={false}
                  defaultItemType={"graph-viewer__node"}
                  onItemClick={(event, item) => {
                    selection.toggle(item.id);
                  }}
                  selectedItemsIds={Array.from(selection.state)}
                  hideFooter
                />
                {selection.state.size > 0 && (
                  <Carousel
                    ref={carouselRef}
                    slidesToShow={1}
                    className={pfx("carousel")}
                  >
                    {Array.from(selection.state).map(nodeId => {
                      const node = fetchedData.find(
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
                )}
                {selection.state.size === 0 && (
                  <PanelEmptyState
                    className={pfx("node-preview")}
                    title="Select an item to preview"
                    icon={<GraphIcon />}
                  />
                )}
              </div>
            )}
          </div>
          <div className={pfx("actions-footer")}>
            <span className={pfx("footer-text")}>
              Search returned {fetchedData.length} results
              {currentTotal != null && " of "}
              {currentTotal != null && (
                <HumanReadableNumberFormatter value={currentTotal} />
              )}
            </span>
            <div>
              <IconButton
                className={pfx("actions-button")}
                icon={<RemoveIcon />}
                onPress={() => selection.clear()}
              >
                <div className={pfx("icon-button-name")}>Clear Selection</div>
              </IconButton>
              <IconButton
                className={pfx("actions-button")}
                icon={<AddCircleIcon />}
                onPress={handleAddEntities}
              >
                <div className={pfx("icon-button-name")}>
                  {addSelectedNodesMessage()}
                </div>
              </IconButton>
              <IconButton
                className={pfx("actions-button")}
                icon={<AddCircleIcon />}
                onPress={setAllActive}
              >set all active

                <div className={pfx("icon-button-name")}>
                  {/*console.log(ontologySearchResults)*/}
                </div>
              </IconButton>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default KeywordSearch;
