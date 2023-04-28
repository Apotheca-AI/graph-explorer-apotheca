/* Purpose of this file is to display a list of Ontologies with a small description of that Ontology
This data is called from StoredOntologList.ts */

import { Card, ModuleContainerFooter, VertexIcon } from "../../components";
import Button from "../../components/Button";
import { useWithTheme, withClassNamePrefix } from "../../core";
import defaultStyles from "./OntologyTabContent.styles";
import {OntologyList} from './StoredOntologyList'
import { OntologyListArrayType, OntologyListItemType} from './OntologyListTypes'


export type OntologyTabContentProps = {
  classNamePrefix?: string;
  OntologyList:OntologyListArrayType

};

const OntologyTabContent = ({
  classNamePrefix = "ft",
  OntologyList
}: OntologyTabContentProps) => {
  const styleWithTheme = useWithTheme();
  const pfx = withClassNamePrefix(classNamePrefix);

  return (
    <div className={styleWithTheme(defaultStyles(classNamePrefix))}>
      <div className={pfx("header")}>

        <div className={pfx("content")}>
          <div className={pfx("title")}>
            Ontology List
          </div>
          
        </div>
      </div>
      <div>
        {OntologyList && (
          <div >
            {OntologyList.map((ontologyItem) => (
              <Card className={pfx("ontology-card-root")} elevation={3} >
                <div key={ontologyItem.OntologyID}>
                  <h3>{ontologyItem.OntologyName}</h3>
                  <p>{ontologyItem.OntologyDescription}</p>
                  <ul>
                    <Button onPress={() => console.log('bloob')}> Display {ontologyItem.OntologyName}</Button>
                  </ul>
                </div>
              </Card>))}
          </div>)}
      </div>
      <>
 
<div className={pfx("grow")} />
<ModuleContainerFooter>
  {/*<input
     type="text"
     placeholder="Ontology Name"
     onChange={(e) =>
       setNewOntology({
         ...newOntology,
         OntologyName: e.target.value,
       })
     }
   />
   <input
     type="number"
     placeholder="Ontology ID"
     onChange={(e) =>
       setNewOntology({
         ...newOntology,
         OntologyID: parseInt(e.target.value),
       })
     }
   />
  <input
     type="text"
     placeholder="Ontology Description"
     onChange={(e) =>
       setNewOntology({
         ...newOntology,
         OntologyDescription: e.target.value,
       })
     }
   />
   <button onClick={addOntology}></button>
    */}
</ModuleContainerFooter>
</>
    </div>
  );
};

export default OntologyTabContent;
