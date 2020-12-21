import React, { useState } from "react";
import { Form } from "react-final-form";
import { Button } from "@material-ui/core";
import { TextField } from "mui-rff";
import CurrenciesSelect from "./currencesSelect/CurrenciesSelect";
import { filterCurrencies } from "../utils/filterCurrencies";
import styled from "styled-components";
import { Currency, ResultType } from "../Calculator";

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

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledError = styled.p`
  color: #f50057;
`;

interface CalculatorFormProps {
  currencies: Currency[];
  setResult: React.Dispatch<React.SetStateAction<ResultType | null>>;
}

interface FormValues {
  firstCurrency: string;
  secondCurrency: string;
  amount: number;
}

const CalculatorForm = React.memo<CalculatorFormProps>(({ currencies, setResult }) => {
  const [error, setError] = useState("");
  const validate = (values: FormValues) => {
    if (!values.firstCurrency || !values.secondCurrency) {
      setError("You must select both currencies");
      return false;
    } else {
      return true;
    }
  };
  const onSubmit = (values: FormValues) => {
    if (validate(values)) {
      return fetch("http://localhost:3001/calc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((result) => {
          setResult(result);
        })
        .catch((error) => console.log("error", error));
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, values }) => (
        <StyledForm onSubmit={handleSubmit}>
          <StyledFormWrapper>
            <CurrenciesSelect currencies={currencies} name="firstCurrency" label="From currency..." />
            <StyledAmountField label="Amount" type="number" name="amount" variant="outlined" color="primary" required />
          </StyledFormWrapper>
          <CurrenciesSelect
            currencies={filterCurrencies(currencies, values)}
            name="secondCurrency"
            label="To currency..."
            disabled={!values.firstCurrency}
          />
          <StyledButtonWrapper>
            <StyledError>{error && `${error}*`}</StyledError>
            <StyledButton variant="contained" color="primary" type="submit">
              Submit
            </StyledButton>
          </StyledButtonWrapper>
        </StyledForm>
      )}
    />
  );
});

export default CalculatorForm;
