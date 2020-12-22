export const getCurrencies = () => {
  return fetch("http://localhost:3001/currencies")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Cannot connect to API");
      } else {
        return res.json();
      }
    })
    .catch((err) => {
      throw err;
    });
};
