import React, { useState } from "react";
import "./App.css";
import Calculator from "./components/calculator/Calculator";
import styled from "styled-components";
import History from "./components/history/History";
import Navigation from "./components/navigation/Navigation";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

export enum Page {
  Calc = "CALC",
  History = "HISTORY",
}

function App() {
  const [renderPage, setRenderPage] = useState<Page>(Page.Calc);
  return (
    <Wrapper>
      <Navigation setRenderPage={setRenderPage} />
      {renderPage === Page.Calc ? <Calculator /> : <History />}
    </Wrapper>
  );
}

export default App;
