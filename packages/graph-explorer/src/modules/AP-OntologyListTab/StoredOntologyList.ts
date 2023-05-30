import { OntologyListArrayType, OntologyEntryType } from "./OntologyListTypes"

const OntologyListItem0:OntologyEntryType = {
    name:'Diabetes',
    id:'0',
    description:'Small diabetes ontology',
    vertexArray:[

        {
            "data": {
                "id": "15",
                "type": "Disorder",
                "types": [
                    "Disorder"
                ],
                "neighborsCount": 0,
                "neighborsCountByType": {},
                "attributes": {
                    "FSN": "Hypertensive disorder, systemic arterial (disorder)",
                    "SCTID": "38341003"
                }
            }
        },
        {
            "data": {
                "id": "12",
                "type": "Finding",
                "types": [
                    "Finding"
                ],
                "neighborsCount": 0,
                "neighborsCountByType": {},
                "attributes": {
                    "FSN": "Anxiety (finding)",
                    "SCTID": "48694002"
                }
            }
        },
        {
            "data": {
                "id": "9",
                "type": "Disorder",
                "types": [
                    "Disorder"
                ],
                "neighborsCount": 0,
                "neighborsCountByType": {},
                "attributes": {
                    "FSN": "Diabetes mellitus type 2 (disorder)",
                    "SCTID": "44054006"
                }
            }
        },
    ]
    
}


const OntologyListItem1:OntologyEntryType = {
    name:'Anxiety',
    id:'1',
    description:'Small Anxiety ontology',
    vertexArray:[

    {
            "data": {
                "id": "18",
                "type": "Disorder",
                "types": [
                    "Disorder"
                ],
                "neighborsCount": 0,
                "neighborsCountByType": {},
                "attributes": {
                    "FSN": "Depressive disorder (disorder)",
                    "SCTID": "35489007"
                }
            }
        },
        {
            "data": {
                "id": "12",
                "type": "Finding",
                "types": [
                    "Finding"
                ],
                "neighborsCount": 0,
                "neighborsCountByType": {},
                "attributes": {
                    "FSN": "Anxiety (finding)",
                    "SCTID": "48694002"
                }
            }
        },
        
    ]
}
const OntologyListItem2:OntologyEntryType = {
    name:'Dementia',
    id:'2',
    description:'Small Dementia ontology',
    vertexArray:[
        {
            "data": {
                "id": "18",
                "type": "Disorder",
                "types": [
                    "Disorder"
                ],
                "neighborsCount": 0,
                "neighborsCountByType": {},
                "attributes": {
                    "FSN": "Depressive disorder (disorder)",
                    "SCTID": "35489007"
                }
            }
        }
    ]
}
const OntologyListItem3:OntologyEntryType = {
    name:'Measles',
    id:'3',
    description:'Small Measles ontology',
    vertexArray:[

    ]
}
const OntologyListItem4:OntologyEntryType = {
    name:'Colon Polyps',
    id:'4',
    description:'Small Colon Polyps ontology',
    vertexArray:[

    ]
}

const OntologyList:OntologyListArrayType = [
    OntologyListItem0,
    OntologyListItem1,
    OntologyListItem2,
    OntologyListItem3,
    OntologyListItem4,
    

]
export {OntologyList}



  /*[
    {
        "data": {
            "id": "12",
            "type": "Finding",
            "types": [
                "Finding"
            ],
            "neighborsCount": 0,
            "neighborsCountByType": {},
            "attributes": {
                "FSN": "Anxiety (finding)",
                "SCTID": "48694002"
            }
        }
    },
    {
        "data": {
            "id": "9",
            "type": "Disorder",
            "types": [
                "Disorder"
            ],
            "neighborsCount": 0,
            "neighborsCountByType": {},
            "attributes": {
                "FSN": "Diabetes mellitus type 2 (disorder)",
                "SCTID": "44054006"
            }
        }
    },
    {
        "data": {
            "id": "15",
            "type": "Disorder",
            "types": [
                "Disorder"
            ],
            "neighborsCount": 0,
            "neighborsCountByType": {},
            "attributes": {
                "FSN": "Hypertensive disorder, systemic arterial (disorder)",
                "SCTID": "38341003"
            }
        }
    },
    {
        "data": {
            "id": "18",
            "type": "Disorder",
            "types": [
                "Disorder"
            ],
            "neighborsCount": 0,
            "neighborsCountByType": {},
            "attributes": {
                "FSN": "Depressive disorder (disorder)",
                "SCTID": "35489007"
            }
        }
    }
]*/