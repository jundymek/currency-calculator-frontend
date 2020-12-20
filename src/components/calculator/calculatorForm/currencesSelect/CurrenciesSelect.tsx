import React from "react";
import { Select } from "mui-rff";
import { Currency } from "../../Calculator";
import { MenuItem } from "@material-ui/core";

interface CurrenciesSelectProps {
  currencies: Currency[];
  name: string;
  label: string;
  disabled?: boolean;
}

const CurrenciesSelect = React.memo<CurrenciesSelectProps>(({ currencies, name, label, disabled }) => {
  return (
    <Select name={name} label={label} disabled={disabled}>
      {currencies.map((currency: Currency) => {
        return (
          <MenuItem key={currency.symbol} value={currency.symbol}>
            {currency.symbol} - {currency.name}
          </MenuItem>
        );
      })}
    </Select>
  );
});

export default CurrenciesSelect;
