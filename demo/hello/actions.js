import { fetchItems } from "./api.js";

export const fetchItemsAction = ({ update }) => {
  setTimeout(
    () => update(() => ({
      state: "loading",
       items: []
    })),
  1000);

  fetchItems().then(items =>
    update(() => ({
      items,
      state: "loaded"
    }))
  );
};
