import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import type { ModuleContainerHeaderProps } from "../../components";
import { ModuleContainer, ModuleContainerHeader } from "../../components";
import GraphIcon from "../../components/icons/GraphIcon";
import PanelEmptyState from "../../components/PanelEmptyState/PanelEmptyState";
import { edgesSelectedIdsAtom } from "../../core/StateProvider/edges";
import {
  nodesAtom,
  nodesSelectedIdsAtom,
} from "../../core/StateProvider/nodes";
import useTranslations from "../../hooks/useTranslations";
import OntologyCreatorTabContent from "./OntologyCreatorTabContent";

//APOTHECA CHANGES


export type OntologyCreatorTabProps = Omit<
  ModuleContainerHeaderProps,
  "title" | "sidebar"
> & {
  title?: ModuleContainerHeaderProps["title"];
};

const OntologyCreatorTab = ({ title = "Ontology Creator", ...headerProps }: OntologyCreatorTabProps) => {
  const t = useTranslations();
  const nodes = useRecoilValue(nodesAtom);
  const nodesSelectedIds = useRecoilValue(nodesSelectedIdsAtom);
  const edgesSelectedIds = useRecoilValue(edgesSelectedIdsAtom);

  const selectedNode = useMemo(() => {
    return nodes.find(node => nodesSelectedIds.has(node.data.id));
  }, [nodes, nodesSelectedIds]);
  //console.log('here are nodes')
  //console.log(nodes)

  return (
    <ModuleContainer>
      
      <ModuleContainerHeader
        title={title}
        variant={"sidebar"}
        {...headerProps}
      />
      {nodesSelectedIds.size === 0 && selectedNode && (

  <OntologyCreatorTabContent vertex={selectedNode} vertexArray={nodes} />
      )}
      {nodesSelectedIds.size === 0 && selectedNode && (
        <OntologyCreatorTabContent vertex={selectedNode} vertexArray={nodes} />
      )}

      {nodes !== undefined && selectedNode && (
        <OntologyCreatorTabContent vertex={selectedNode} vertexArray={nodes} />
      )}
    </ModuleContainer>
  );
};

export default OntologyCreatorTab;
