import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";

interface HistoryState {
  id: number;
  firstCurrency: string;
  secondCurrency: string;
  amount: number;
  price: string;
  result: string;
  date: Date;
}

const Wrapper = styled.div`
  width: 90%;
  /* margin-top: 300px; */
  @media (min-width: 640px) {
    max-width: 800px;
  }
`;

const History = React.memo(() => {
  const [history, setHistory] = useState<HistoryState[] | null>(null);
  const getHistory = () => {
    return fetch("http://localhost:3001/calc").then((res) => res.json());
  };

  console.log(history);

  useEffect(() => {
    async function fetchData() {
      const data = await getHistory();
      setHistory(data);
    }
    fetchData();
  }, []);
  return (
    <>
      {history ? (
        <Wrapper>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell align="right">date</TableCell>
                  <TableCell align="right">From</TableCell>
                  <TableCell align="right">To</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell align="right">Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {history.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell component="th" scope="row">
                      {item.id}
                    </TableCell>
                    <TableCell align="right">{item.date}</TableCell>
                    <TableCell align="right">{item.firstCurrency}</TableCell>
                    <TableCell align="right">{item.secondCurrency}</TableCell>
                    <TableCell align="right">{item.amount}</TableCell>
                    <TableCell align="right">{item.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Wrapper>
      ) : (
        "No data"
      )}
    </>
  );
});

export default History;
