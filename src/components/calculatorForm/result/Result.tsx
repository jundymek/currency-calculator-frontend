import { Paper } from "@material-ui/core";
import React from "react";
import { ResultType } from "../CalculatorForm";
import styled from "styled-components";

interface ResultProps {
  result: ResultType;
}

const StyledPaper = styled(Paper)`
  && {
    margin-top: 1rem;
    padding: 1rem;
    width: 90%;
    @media (min-width: 640px) {
      width: 50%;
      align-self: flex-end;
    }
  }
`;

const Result = React.memo<ResultProps>(({ result }) => {
  return (
    <StyledPaper variant="outlined" square>
      <p>
        1 {result.firstCurrency} = {result.price} {result.secondCurrency}
      </p>
      <p>
        For {result.amount} {result.firstCurrency} you will receive {result.result} {result.secondCurrency}{" "}
      </p>
    </StyledPaper>
  );
});

export default Result;
