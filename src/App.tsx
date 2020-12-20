import React from "react";
import "./App.css";
import CalculatorForm from "./components/calculatorForm/CalculatorForm";
import styled from "styled-components";
import History from "./components/calculatorForm/history/History";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

function App() {
  return (
    <Wrapper>
      <CalculatorForm />
      <History />
    </Wrapper>
  );
}

export default App;
