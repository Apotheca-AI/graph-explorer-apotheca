import uniq from "lodash/uniq";
import uniqBy from "lodash/uniqBy";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useNotification } from "../../components/NotificationProvider";
import { KeywordSearchResponse } from "../../connector/AbstractConnector";
import { useConfiguration } from "../../core";
import useConnector from "../../core/ConnectorProvider/useConnector";
import useDebounceValue from "../../hooks/useDebounceValue";
import usePrefixesUpdater from "../../hooks/usePrefixesUpdater";
import useTextTransform from "../../hooks/useTextTransform";

import { OntologyList } from "../AP-OntologyListTab/StoredOntologyList";

import { OntologyEntryType, OntologyVertexAttributes, OntologyListArrayType } from "../AP-OntologyListTab/OntologyListTypes";
import { Vertex } from "../../@types/entities";

export interface PromiseWithCancel<T> extends Promise<T> {
  cancel?: () => void;
}
const useOntologySearch = ({ isOpen }: { isOpen: boolean }) => {
  const config = useConfiguration();
  const connector = useConnector();

  const [searchTerm, setSearchTerm] = useState("make a search");
  const debouncedSearchTerm = useDebounceValue(searchTerm, 1000);
  const [selectedVertexType, setSelectedVertexType] = useState("__all");
  const [selectedAttribute, setSelectedAttribute] = useState("__all");
  const textTransform = useTextTransform();

  //Apotheca Changes to state variables
  const [selectedOntologyName, setSelectedOntologyName] = useState('')
  
  const [fetchedData, setFetchedData] = useState<Vertex[]>([]);

  const vertexOptions = useMemo(() => {
    const vertexOps =
      config?.vertexTypes
        .map(vt => {
          const vtConfig = config?.getVertexTypeConfig(vt);
          return {
            label: textTransform(vtConfig?.displayLabel || vt),
            value: vt,
          };
        })
        .sort((a, b) => a.label.localeCompare(b.label)) || [];

    return [{ label: "All", value: "__all" }, ...vertexOps];
  }, [config, textTransform]);

  const onSearchTermChange = useCallback((value: string) => {
      setSearchTerm(value);
  }, []);
  
// -------------APOTHECA CHANGES TO ALLOW FOR VALUE TO BE A NUMBER------------
  const onVertexOptionChange = useCallback((value: string | string[] |number) => {
    if (typeof value=== 'string') {
      setSelectedVertexType(value as string);
    }
    if (typeof value ==='number'){
      setSelectedVertexType(value.toString() as string);
    }
    
  }, []);

  // -------------APOTHECA CHANGES TO ALLOW FOR VALUE TO BE A NUMBER------------
  const onAttributeOptionChange = useCallback((value: string | string[]| number) => {
    if (typeof value=== 'string') {
      setSelectedAttribute(value as string);
    }
    if (typeof value ==='number'){
      setSelectedAttribute(value.toString() as string);
    }
  }, []);

  const searchableAttributes = useMemo(() => {
    if (selectedVertexType !== "__all") {
      return (
        config?.getVertexTypeSearchableAttributes(selectedVertexType) || []
      );
    }

    return (
      config?.schema?.vertices.flatMap(vertex =>
        config?.getVertexTypeSearchableAttributes(vertex.type)
      ) || []
    );
  }, [config, selectedVertexType]);

  

  const attributesOptions = useMemo(() => {
    if (selectedVertexType === "__all") {
      const attributes = uniqBy(
        searchableAttributes.map(attr => ({
          value: attr.name,
          label: attr.displayLabel || textTransform(attr.name),
        })),
        op => op.value
      );
      return [{ label: "All", value: "__all" }, ...attributes];
    }

    const attributes = uniqBy(
      config
        ?.getVertexTypeSearchableAttributes(selectedVertexType)
        .map(attr => ({
          value: attr.name,
          label: attr.displayLabel || textTransform(attr.name),
        })),
      op => op.value
    );
    return [{ label: "All", value: "__all" }, ...attributes];
  }, [config, searchableAttributes, selectedVertexType, textTransform]);

  const { enqueueNotification } = useNotification();
  const [isMount, setMount] = useState(false);
  
  const vertexTypes =
    selectedVertexType === "__all" ? config?.vertexTypes : [selectedVertexType];
  const searchByAttributes =
    selectedAttribute === "__all"
      ? uniq(searchableAttributes.map(attr => attr.name))
      : [selectedAttribute];

  const updatePrefixes = usePrefixesUpdater();
  
  const ontologyResultArray:string[]=[]

  

  //previous useQueryy data
  const { data, isFetching } = useQuery(
    [
      "keyword-search",
      ontologyResultArray,
      debouncedSearchTerm,
      vertexTypes,
      searchByAttributes,
      isMount,
      isOpen,
    ],
    
    () => {
      if (!isOpen || !config) {
        return;
      }
    
      const controller = new AbortController();
      
      const promise = connector.explorer?.keywordSearch(
        {
          searchTerm: debouncedSearchTerm,
          vertexTypes,
          searchByAttributes,
          searchById: searchableAttributes.length === 0,
        },
        { abortSignal: controller.signal }
      ) as PromiseWithCancel<KeywordSearchResponse>;

      promise.cancel = () => {
        controller.abort();
      };
      
      return promise;
    
    },
    {
      enabled: !!config,
      onSuccess: response => {

        if (!response) {
          return;
        }
        //maybe don't need this
        //setFetchedData(prevData => [...prevData, ...response.vertices]);
        // the issue is here, it is only returning the final in the list of data
        //console.log('here is fetched data from within useOntologySearch')
        //console.log(fetchedData)
        updatePrefixes(response.vertices.map(v => v.data.id));
      },
      onError: (e: Error) => {
        enqueueNotification({
          type: "error",
          title: "Something went wrong",
          message: e.message,
        });
      },
    }
  );

  const storedData = localStorage.getItem('OntologyData');
  const OntologyList2:OntologyListArrayType = storedData ? JSON.parse(storedData) : [];
  console.log(OntologyList2)


  ///APTHECA CHANGES FOR ONTOLOGY SEARCH
  const ontologyOptions =OntologyList2.map(({ 
    name: label, 
    name: value,
    description:description
   }) => ({ 
      label, 
      value:value!,
      description:description!
    }));

    const getVertexArrayByName = (name: string): Array<Vertex> => {
      const entry = OntologyList2.find((item) => item.name === name);
      return entry?.vertexArray || [];
    };

   const onOntologyChange = useCallback((value:string|string[] ) => {

    setSelectedOntologyName(value as string);
    const sctidValues = getVertexArrayByName(value as string)

    setFetchedData(sctidValues)


    
  }, []);

  if (isOpen && !isMount) {
    setMount(true);
  }

  useEffect(() => {
    setSelectedAttribute("__all");
  }, [selectedVertexType]);

  return {
    isFetching,
    debouncedSearchTerm,
    onSearchTermChange,
    onVertexOptionChange,
   
    searchTerm,
    selectedVertexType,
    vertexOptions,
    selectedAttribute,
    attributesOptions,

    ontologyOptions,
    selectedOntologyName,
    onOntologyChange,
    fetchedData,

    onAttributeOptionChange,
    searchResults: data?.vertices || [],
    
  };
};

export default useOntologySearch;
