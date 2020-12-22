import React, { useState, useEffect } from "react";

import styled from "styled-components";
import Spinner from "../spinner/Spinner";
import CalculatorForm from "./calculatorForm/CalculatorForm";

import Result from "./result/Result";
import { getCurrencies } from "./utils/getCurrencies";

export interface Currency {
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
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [result, setResult] = useState<ResultType | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);
        const data = await getCurrencies();
        const filteredData = data.filter((item: Currency) => acceptedCurrencies.includes(item.symbol));
        setCurrencies(
          filteredData.sort((a: Currency, b: Currency) => {
            return a.symbol > b.symbol ? 1 : b.symbol > a.symbol ? -1 : 0;
          })
        );
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const renderCalculator = !error && !isLoading;
  const renderError = error && !isLoading;

  return (
    <StyledWrapper>
      {renderCalculator && (
        <>
          <CalculatorForm currencies={currencies} setResult={setResult} />
          {result && <Result result={result} />}
        </>
      )}
      {renderError && <p>{error}</p>}
      {isLoading && <Spinner />}
    </StyledWrapper>
  );
});

export default Calculator;
