export const getCurrencies = () => {
  return fetch("http://localhost:3001/Currencies").then((res) => res.json());
};
