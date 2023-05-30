/* Purpose of this file is to display a list of Ontologies with a small description of that Ontology
This data is called from StoredOntologList.ts */

import { Card, ModuleContainerFooter, VertexIcon } from "../../components";
import Button from "../../components/Button";
import { useWithTheme, withClassNamePrefix } from "../../core";
import defaultStyles from "./OntologyTabContent.styles";
import {OntologyList} from './StoredOntologyList'
import OntologySearch from '../AP-OntologySearch/OntologySearch'
import { OntologyListArrayType} from './OntologyListTypes'


export type OntologyTabContentProps = {
  classNamePrefix?: string;
  

};



const OntologyTabContent = ({
  classNamePrefix = "ft",
  
}: OntologyTabContentProps) => {
  const styleWithTheme = useWithTheme();
  const pfx = withClassNamePrefix(classNamePrefix);
  

  return (
    <div className={styleWithTheme(defaultStyles(classNamePrefix))}>

      <OntologySearch/>

      <>
 
<div className={pfx("grow")} />
<ModuleContainerFooter>
</ModuleContainerFooter>
</>
    </div>
  );
};

export default OntologyTabContent;
