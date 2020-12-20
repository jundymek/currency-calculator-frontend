import React from "react";
import { Form } from "react-final-form";
import { Button } from "@material-ui/core";
import { TextField } from "mui-rff";
import CurrencesSelect from "../currencesSelect/CurrencesSelect";
import { filterCurrences } from "../utils/filterCurrences";
import styled from "styled-components";
import { Currences, ResultType } from "../Calculator";

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

interface CalculatorFormProps {
  currences: Currences[];
  setResult: React.Dispatch<React.SetStateAction<ResultType | null>>;
}

const CalculatorForm = React.memo<CalculatorFormProps>(({ currences, setResult }) => {
  const onSubmit = (values: any) => {
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
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, values }) => (
        <StyledForm onSubmit={handleSubmit}>
          <StyledFormWrapper>
            <CurrencesSelect currences={currences} name="firstCurrency" label="From currency..." />
            <StyledAmountField label="Amount" type="number" name="amount" variant="outlined" color="primary" required />
          </StyledFormWrapper>
          <CurrencesSelect
            currences={filterCurrences(currences, values)}
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
  );
});

export default CalculatorForm;
