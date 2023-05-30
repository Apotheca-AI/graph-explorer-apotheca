import { Vertex } from "../../@types/entities";
export type OntologyListArrayType = Array<OntologyEntryType>

export type OntologyVertexAttributes = {label: string, sctid: string}[] | []
//export type OntologySearchAttributes = string[]

export type OntologyEntryType ={
    name:string;
    id:string;
    description:string|null
    vertexArray: Vertex[]
}