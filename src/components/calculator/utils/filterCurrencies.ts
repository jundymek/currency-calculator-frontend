import { Currencies } from "../Calculator";

export const filterCurrencies = (Currencies: Currencies[], values: Record<string, any>) => {
  return Currencies.filter((item) => {
    return item.symbol !== values.firstCurrency;
  });
};
