import React, { useState } from "react";
import { Form } from "react-final-form";
import { Button } from "@material-ui/core";
import CurrenciesSelect from "./currencesSelect/CurrenciesSelect";
import { filterCurrencies } from "../utils/filterCurrencies";
import styled from "styled-components";
import { Currency, ResultType } from "../Calculator";
import { TextField } from "mui-rff";

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  @media (min-width: 640px) {
    margin: 0;
  }
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
    align-self: flex-start;
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
  align-items: center;
  justify-content: space-between;
`;

const StyledError = styled.p`
  margin: 0;
  padding: 2px;
  font-size: 14px;
  color: #f50057;
`;

const StyledErrorWrapper = styled.div`
  margin-top: 1rem;
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
  const [error, setError] = useState<string[]>([]);

  const validate = (values: FormValues) => {
    const error = [];
    if (!values.firstCurrency || !values.secondCurrency) {
      error.push("You must select both currencies");
    }
    if (values.amount < 1) {
      error.push("You must set amount to at least 1");
    }
    if (error.length > 0) {
      setError(error);
      return false;
    } else {
      return true;
    }
  };

  const onSubmit = (values: FormValues) => {
    setError([]);
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
            <StyledErrorWrapper>
              {error.length > 0 && error.map((item: string) => <StyledError>{`${item}*`}</StyledError>)}
            </StyledErrorWrapper>
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
