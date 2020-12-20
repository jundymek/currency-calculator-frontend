export const getCurrences = () => {
  return fetch("http://localhost:3001/currences").then((res) => res.json());
};
