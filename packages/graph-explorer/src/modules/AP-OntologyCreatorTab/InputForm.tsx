import React, { useState, useEffect } from 'react';
import { Vertex } from '../../@types/entities';
import { OntologyEntryType } from '../AP-OntologyListTab/OntologyListTypes';
import StoredOntologyList from '../AP-OntologyListTab/StoredOntologyList.json'
import fs from 'fs'

const InputForm = (vertexArray:any) => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  //const [items, setItems] = useState(StoredOntologyList)
  //console.log(StoredOntologyList)
  //console.log('vertexArray')
  //console.log(vertexArray)
  /// below code may not work, I may need to get into the mechanism for import of a connection type

  /**STEP 1 use localStorage to store all the relevant ontologies that you would like possibly done
   * STEP 2 get it so that you can include this data when you export the connection data, this goes back to the connections screen
   * STEP 3 get it so that you can import the data and allow for the copying of that to the new connection
   */

  const storedData = localStorage.getItem('OntologyData');
  const initialData = storedData ? JSON.parse(storedData) : [];
  const [items, setItems] = useState(initialData);

  const addItemToList = (newItem:OntologyEntryType) => {
    const StoredOntologyJSON = JSON.stringify(StoredOntologyList)
    localStorage.setItem('OntologyData', StoredOntologyJSON)
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    localStorage.setItem('OntologyData', JSON.stringify(updatedItems));

  };

  const handleAddItem = () => {
    const newItem = ontologyBuild(vertexArray)
  
    addItemToList(newItem);
    console.log('here is local storage of ontologyData')
    console.log(JSON.parse(localStorage.OntologyData))
    //console.log(localStorage)
  };
  

  //above may not work



  const handleInputChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput1(e.target.value);
  };

  const handleInputChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput2(e.target.value);
  };



  const ontologyBuild = (vertexArray:any) => {
    
    const temp = vertexArray
    const newOntology:OntologyEntryType = {
      name:input1,
      id:Math.floor(1000 + Math.random() * 9000).toString(),
      description:input2,
      vertexArray:temp.vertexArray
      
    }
    console.log('here is new ontoloy to be added')
    console.log(newOntology)
    return newOntology
  }

  const resetStoredOntologies = () => {
    localStorage.clear();
    const StoredOntologyJSON = JSON.stringify(StoredOntologyList)
    localStorage.setItem('OntologyData', StoredOntologyJSON)
    setItems(StoredOntologyList)
    console.log('this is the local storage after resetting')
    console.log(JSON.parse(localStorage.OntologyData))
  }

  const logStoredOntologies = () =>{
    console.log('this is the local storage for OntologyData via logging of the data')
    console.log(JSON.parse(localStorage.OntologyData))

  }

  return (
    <div>
      <header>New Ontology Name</header>
      <input type="text" value={input1} onChange={handleInputChange1} />
      <header>Short Description</header>
      <input type="text" value={input2} onChange={handleInputChange2} />
      <button onClick={handleAddItem}>Add this ontology</button>
      <button onClick={logStoredOntologies}>log local storage</button>
      <button onClick={resetStoredOntologies}>clear cache</button>

      
    </div>
  );
};

export default InputForm;
