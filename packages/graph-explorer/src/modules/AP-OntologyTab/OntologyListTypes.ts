export type OntologyListArrayType = Array<OntologyListItemType>

type Test = {Label: string,SCTID: string}[]

export type OntologyListItemType ={
    OntologyName:string;
    OntologyID:number;
    OntologyDescription:string|null
    VertexArray: Test | []
}