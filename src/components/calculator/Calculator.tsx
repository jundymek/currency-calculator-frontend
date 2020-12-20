import React, { useState, useEffect } from "react";

import styled from "styled-components";
import CalculatorForm from "./calculatorForm/CalculatorForm";

import Result from "./result/Result";
import { getCurrences } from "./utils/getCurrences";

export interface Currences {
  symbol: string;
  name: string;
}

export interface ResultType {
  price: number;
  firstCurrency: string;
  secondCurrency: string;
  amount: string;
  result: number;
  date: string;
  id: number;
}

const StyledWrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 640px) {
    width: 50%;
  }
`;

const Calculator = React.memo(() => {
  const [currences, setCurrences] = useState<Currences[]>([]);
  const [result, setResult] = useState<ResultType | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCurrences();
        setCurrences(
          data.sort((a: any, b: any) => {
            return a.symbol > b.symbol ? 1 : b.symbol > a.symbol ? -1 : 0;
          })
        );
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <StyledWrapper>
      <CalculatorForm currences={currences} setResult={setResult} />
      {result && <Result result={result} />}
    </StyledWrapper>
  );
});

export default Calculator;
