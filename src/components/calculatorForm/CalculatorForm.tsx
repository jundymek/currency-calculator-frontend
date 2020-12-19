import { Button, MenuItem, Typography } from "@material-ui/core";
import { Select, TextField } from "mui-rff";
import React, { useState, useEffect } from "react";
import { Form } from "react-final-form";
import styled from "styled-components";

interface Currences {
  symbol: string;
  name: string;
}

const StyledForm = styled.form`
  width: 90%;
  @media (min-width: 640px) {
    width: 50%;
  }
`;

const StyledAmountField = styled(TextField)`
  @media (min-width: 640px) {
    && {
      max-width: 200px;
      margin-left: 20px;
    }
  }
`;

const StyledButton = styled(Button)`
  && {
    margin-top: 1rem;
    justify-self: end;
  }
`;

const StyledWrapper = styled.div`
  @media (min-width: 640px) {
    display: flex;
    align-items: center;
    justify-items: between;
  }
`;

const CalculatorForm = React.memo(() => {
  const [currences, setCurrences] = useState<Currences[]>([]);

  const onSubmit = (values: any) => {
    console.log(values);
    console.log(currences);
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

  return (
    <>
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
            <StyledWrapper>
              <Select name="fromCurrency" label="From currency..." formControlProps={{ margin: "normal" }}>
                {currences.map((currency) => {
                  return (
                    <MenuItem key={currency.symbol} value={currency.symbol}>
                      {currency.symbol} - {currency.name}
                    </MenuItem>
                  );
                })}
              </Select>
              <StyledAmountField
                label="Amount"
                type="number"
                name="amount"
                variant="outlined"
                color="primary"
                required
              />
            </StyledWrapper>
            <Select name="toCurrency" label="To currency...">
              {currences
                .filter((item) => item.symbol !== values.fromCurrency)
                .map((currency) => {
                  return (
                    <MenuItem key={currency.symbol} value={currency.symbol}>
                      {currency.symbol} - {currency.name}
                    </MenuItem>
                  );
                })}
            </Select>
            <StyledButton variant="contained" color="primary" type="submit">
              Submit
            </StyledButton>
          </StyledForm>
        )}
      />
    </>
  );
});

export default CalculatorForm;
