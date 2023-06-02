import type { Vertex } from "../../../@types/entities";
import type { NeighborsCountResponse } from "../../AbstractConnector";
import type { GVertex } from "../types";
import parsePropertiesValues from "./parsePropertiesValues";
<<<<<<< HEAD
import toStringId from './toStringId'
=======
import toStringId from "./toStringId";
>>>>>>> 0072316067b7c8f9e3d7d7464b956a3415649f61

const mapApiVertex = (
  apiVertex: GVertex,
  neighborsCount: NeighborsCountResponse = { totalCount: 0, counts: {} }
): Vertex => {
  const labels = apiVertex["@value"].label.split("::");
  const vt = labels[0];

  return {
    data: {
      id: toStringId(apiVertex["@value"].id),
      type: vt,
      types: labels,
      neighborsCount: neighborsCount?.totalCount || 0,
      neighborsCountByType: neighborsCount?.counts || {},
      attributes: parsePropertiesValues(apiVertex["@value"].properties),
    },
  };
};

export default mapApiVertex;
