import React from "react";
import { Select } from "mui-rff";
import { Currencies } from "../../Calculator";
import { MenuItem } from "@material-ui/core";

interface CurrenciesSelectProps {
  Currencies: Currencies[];
  name: string;
  label: string;
  disabled?: boolean;
}

const CurrenciesSelect = React.memo<CurrenciesSelectProps>(({ Currencies, name, label, disabled }) => {
  return (
    <Select name={name} label={label} disabled={disabled}>
      {Currencies.map((currency) => {
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
