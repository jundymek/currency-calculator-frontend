import { Currency } from "../Calculator";

export const filterCurrencies = (currencies: Currency[], values: Record<string, any>) => {
  return currencies.filter((item) => {
    return item.symbol !== values.firstCurrency;
  });
};
