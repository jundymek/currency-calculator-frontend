import { Button, MenuItem, Typography, Paper } from "@material-ui/core";
import { Select, TextField } from "mui-rff";
import React, { useState, useEffect } from "react";
import { Form } from "react-final-form";
import styled from "styled-components";
import CurrencesSelect from "./currencesSelect/CurrencesSelect";
import Result from "./result/Result";

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

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledAmountField = styled(TextField)`
  && {
    margin-top: 1rem;
    @media (min-width: 640px) {
      margin: 0;
      max-width: 200px;
      margin-left: 20px;
    }
  }
`;

const StyledButton = styled(Button)`
  && {
    margin-top: 1rem;
    align-self: flex-end;
  }
`;

const StyledFormWrapper = styled.div`
  @media (min-width: 640px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

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

const CalculatorForm = React.memo(() => {
  const [currences, setCurrences] = useState<Currences[]>([]);
  const [result, setResult] = useState<ResultType | null>(null);
  const onSubmit = (values: any) => {
    console.log(values);
    return fetch("http://localhost:3001/calc", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setResult(result);
      })
      .catch((error) => console.log("error", error));
  };

  const getCurrences = () => {
    return fetch("http://localhost:3001/currences").then((res) => res.json());
  };

  useEffect(() => {
    async function fetchData() {
      const data = await getCurrences();
      setCurrences(
        data.sort((a: any, b: any) => {
          return a.symbol > b.symbol ? 1 : b.symbol > a.symbol ? -1 : 0;
        })
      );
    }
    fetchData();
  }, []);

  const filteredCurrences = (currences: Currences[], values: any) => {
    return currences.filter((item) => {
      return item.symbol !== values.firstCurrency;
    });
  };

  return (
    <StyledWrapper>
      <Typography variant="h4" align="center" component="h1" gutterBottom>
        Currency converter
      </Typography>
      <Typography variant="h5" align="center" component="h2" gutterBottom>
        Convert any currency
      </Typography>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, values }) => (
          <StyledForm onSubmit={handleSubmit}>
            <StyledFormWrapper>
              <CurrencesSelect currences={currences} name="firstCurrency" label="From currency..." />
              <StyledAmountField
                label="Amount"
                type="number"
                name="amount"
                variant="outlined"
                color="primary"
                required
              />
            </StyledFormWrapper>
            <CurrencesSelect
              currences={filteredCurrences(currences, values)}
              name="secondCurrency"
              label="To currency..."
              disabled={!values.firstCurrency}
            />
            <StyledButton variant="contained" color="primary" type="submit">
              Submit
            </StyledButton>
          </StyledForm>
        )}
      />
      {result && <Result result={result} />}
    </StyledWrapper>
  );
});

export default CalculatorForm;
