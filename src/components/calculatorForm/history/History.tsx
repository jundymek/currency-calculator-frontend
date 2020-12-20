import React, { useEffect } from "react";

const History = React.memo(() => {
  const getHistory = () => {
    return fetch("http://localhost:3001/calc").then((res) => res.json());
  };

  useEffect(() => {
    async function fetchData() {
      const data = await getHistory();
      console.log(data);
    }
    fetchData();
  }, []);
  return <div></div>;
});

export default History;
