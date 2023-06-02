<<<<<<< HEAD
import { GInt64 } from "../types";

const toStringId = (id: string | GInt64): string => {
=======
import { GInt64, JanusID } from "../types";

const isJanusID = (id: any): id is JanusID => {
  return (
    typeof id === "object" &&
    "@type" in id &&
    typeof id["@type"] === "string" &&
    "@value" in id &&
    typeof id["@value"] === "object" &&
    "relationId" in id["@value"] &&
    typeof id["@value"]["relationId"] === "string"
  );
};

const toStringId = (id: string | GInt64 | JanusID): string => {
>>>>>>> 0072316067b7c8f9e3d7d7464b956a3415649f61
  if (typeof id === "string") {
    return id;
  }

<<<<<<< HEAD
=======
  if (isJanusID(id)) {
    return id["@value"]["relationId"];
  }

>>>>>>> 0072316067b7c8f9e3d7d7464b956a3415649f61
  return String(id["@value"]);
};

export default toStringId;