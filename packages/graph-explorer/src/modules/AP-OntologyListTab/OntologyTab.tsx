import { useState, useMemo, Children } from "react";
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

//apotheca changes
import Button from '../../components/Button/Button'
import OntologyTabContent from "./OntologyTabContent";
import {OntologyList} from './StoredOntologyList'
import {OntologyListArrayType} from './OntologyListTypes'
import { IconButton, AddIcon } from "../../components/";
import { useFetchNode } from "../../hooks";
import useOntologySearch from "../AP-OntologySearch/useOntologySearch";

export type OntologyTabProps = Omit<
  ModuleContainerHeaderProps,
  "title" | "sidebar"
> & {
  title?: ModuleContainerHeaderProps["title"];
};

const OntologyListTab = ({ title = "Ontologies", ...headerProps }: OntologyTabProps) => {
  const t = useTranslations();
  const nodes = useRecoilValue(nodesAtom);
  const nodesSelectedIds = useRecoilValue(nodesSelectedIdsAtom);
  const edgesSelectedIds = useRecoilValue(edgesSelectedIdsAtom);
  

  const selectedNode = useMemo(() => {
    return nodes.find(node => nodesSelectedIds.has(node.data.id));
  }, [nodes, nodesSelectedIds]);



  return (
    <ModuleContainer>
      <ModuleContainerHeader
        title={'Ontology List'}
        variant={"sidebar"}
        {...headerProps}
      />
      <OntologyTabContent/>

    </ModuleContainer>
  );
};

export default OntologyListTab;
