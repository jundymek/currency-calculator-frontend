import React, { useState, useEffect } from "react";
import { Form, Field } from "react-final-form";

interface Currences {
  symbol: string;
  name: string;
}

const CalculatorForm = React.memo(() => {
  const [currences, setCurrences] = useState<Currences[]>([]);

  const onSubmit = (values: any) => {
    console.log(values);
    console.log(currences);
  };

  const getCurrences = () => {
    return fetch("http://localhost:3001/currences").then((res) => res.json());
  };

  useEffect(() => {
    async function fetchData() {
      const data = await getCurrences();
      setCurrences(
        data.sort((a: any, b: any) => {
          return a.symbol > b.symbol ? 1 : b.symbol > a.symbol ? -1 : 0;
        })
      );
    }
    fetchData();
  }, []);

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, values }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Mam walutę</label>
            <Field name="ownedCurrency" component="select">
              <option value="" disabled selected>
                Select your option
              </option>
              {currences.map((currency) => {
                return (
                  <option key={currency.symbol} value={currency.symbol}>
                    {currency.symbol} - {currency.name}
                  </option>
                );
              })}
            </Field>
          </div>
          <div>
            <label>Chcę walutę</label>
            <Field name="desiredCurrency" component="select">
              <option value="" disabled selected>
                Select your option
              </option>
              {currences
                .filter((item) => item.symbol !== values.ownedCurrency)
                .map((currency) => {
                  return (
                    <option key={currency.symbol} value={currency.symbol}>
                      {currency.symbol} - {currency.name}
                    </option>
                  );
                })}
            </Field>
          </div>
          <button>submit</button>
        </form>
      )}
    />
  );
});

export default CalculatorForm;
