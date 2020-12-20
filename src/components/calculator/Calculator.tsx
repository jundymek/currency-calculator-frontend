import React, { useState, useEffect } from "react";

import styled from "styled-components";
import CalculatorForm from "./calculatorForm/CalculatorForm";

import Result from "./result/Result";
import { getCurrencies } from "./utils/getCurrencies";

export interface Currencies {
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
  const [Currencies, setCurrencies] = useState<Currencies[]>([]);
  const [result, setResult] = useState<ResultType | null>(null);

  useEffect(() => {
    async function fetchData() {
      const acceptedCurrencies = [
        "EUR",
        "USD",
        "HUF",
        "AUD",
        "NZD",
        "CNY",
        "INR",
        "SGD",
        "BYR",
        "CAD",
        "JPY",
        "KPW",
        "THB",
        "HRK",
        "EGP",
        "MXN",
        "PLN",
        "NOK",
        "RUB",
        "GBP",
        "BTC",
      ];
      try {
        const data = await getCurrencies();
        const filteredData = data.filter((item: Currencies) => acceptedCurrencies.includes(item.symbol));
        setCurrencies(
          filteredData.sort((a: Currencies, b: Currencies) => {
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
      <CalculatorForm Currencies={Currencies} setResult={setResult} />
      {result && <Result result={result} />}
    </StyledWrapper>
  );
});

export default Calculator;
