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
  padding: 20px 0;
  @media (min-width: 640px) {
    margin: 0;
    max-width: 800px;
  }
`;

const StyledTableCell = styled(TableCell)`
  && {
    background-color: black;
    color: white;
  }
`;

const History = React.memo(() => {
  const [history, setHistory] = useState<HistoryState[] | null>(null);
  const getHistory = () => {
    try {
      return fetch("http://localhost:3001/calc").then((res) => res.json());
    } catch (error) {
      console.log(error);
    }
  };

  const formattedDate = (date: Date): string => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    const hour = newDate.getHours();
    const minutes = newDate.getMinutes();
    const seconds = newDate.getSeconds();
    return `${day}/${month}/${year} - ${hour}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    async function fetchData() {
      const data = await getHistory();
      setHistory(data);
    }
    fetchData();
  }, []);
  return (
    <>
      {history?.length ? (
        <Wrapper>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>id</StyledTableCell>
                  <StyledTableCell align="right">date</StyledTableCell>
                  <StyledTableCell align="right">From</StyledTableCell>
                  <StyledTableCell align="right">To</StyledTableCell>
                  <StyledTableCell align="right">Amount</StyledTableCell>
                  <StyledTableCell align="right">Price</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {history.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell component="th" scope="row">
                      {item.id}
                    </TableCell>
                    <TableCell align="right">{formattedDate(item.date)}</TableCell>
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
