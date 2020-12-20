import { Currences } from "../Calculator";

export const filterCurrences = (currences: Currences[], values: Record<string, any>) => {
  return currences.filter((item) => {
    return item.symbol !== values.firstCurrency;
  });
};
