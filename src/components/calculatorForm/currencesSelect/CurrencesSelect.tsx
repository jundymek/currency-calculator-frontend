import React from "react";
import { Select } from "mui-rff";
import { MenuItem } from "@material-ui/core";
import { Currences } from "../CalculatorForm";

interface CurrencesSelectProps {
  currences: Currences[];
  name: string;
  label: string;
  disabled?: boolean;
}

const CurrencesSelect = React.memo<CurrencesSelectProps>(({ currences, name, label, disabled = false }) => {
  return (
    <Select name={name} label={label} formControlProps={{ margin: "normal" }} disabled={disabled}>
      {currences.map((currency) => {
        return (
          <MenuItem key={currency.symbol} value={currency.symbol}>
            {currency.symbol} - {currency.name}
          </MenuItem>
        );
      })}
    </Select>
  );
});

export default CurrencesSelect;
