export const fetchItems = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([{ name: "Ford" }]);
    }, 2000);
  });
};
