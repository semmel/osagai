// Using morphdom for applying the diff
import morphdom from "./morphdom";

export default function updateDom(fromNode, toNode) {
  const
    templateElement = document.createElement("template");
  
  templateElement.innerHTML = toNode;
  return morphdom(fromNode, templateElement.content);
}
