import { define } from "./node_modules/osagai/osagai.mjs";
import { on } from "./node_modules/osagai/events.mjs";
import { update, attachShadow } from "./node_modules/osagai/dom.mjs";
import { fetchItemsAction } from "./actions.js";
import {onConnected, onDisconnected} from "./node_modules/osagai/lifecycles.mjs";
import morphdom from './node_modules/morphdom/dist/morphdom-esm.js';

function Hello({ element, query }) {
  fetchItemsAction({ update: fn => update(element, fn) });

  attachShadow(element);
  
  query(".btn").then((btn) => console.log("got button", btn), error => console.log("Error:" + error.message));
  
  on("click", query(".btn"), () => {
    console.log("on click");
    update(element, currentState => {
      currentState.items.push({
        name: "Yaya"
      });

      console.log("click update:", currentState);
      return currentState;
    });
  });

  return ({ state, items } = {}) => {
    console.log("update:", state, items);
    
    return `<button class="btn" id="onlyButton">Click me</button>
      ${state === "loading" ? "Loading..." : ""}
      ${state === "loaded"
        ? `<ul class="list">
          ${items.map(item => `<li>${item.name}</li>`).join("")}
        </ul>`
      : ""
    }`;
  };
}

export default define("x-hello", Hello, {
  renderer: (element, templateHTML) => {
    // if the destination node is a DocumentFragment, we need to pass a DocumentFragment as source as well
    const
      templateElement = document.createElement("template");
    
    templateElement.innerHTML = templateHTML;
    
    morphdom(
      element.__shadowDom__,
      templateElement.content
    );
  }
});
