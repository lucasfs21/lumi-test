import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import SeachInput from "../search-input/SearchInput";

export default function BibliotecaFaturas() {
  const [data, setData] = React.useState([]);
  const handleSearch = async (search) => {
    const response = await axios.get(`http://localhost:3001/getData/${search}`);

    if (response.data.length) {
      console.log(response.data);
      setData(response.data);
    }
  };

  const handleMonth = (month) => {
    switch (month) {
      case "JUN":
        return "JUNHO";
      case "JUL":
        return "JULHO";
      case "AGO":
        return "AGOSTO";
      case "SET":
        return "SETEMBRO";
      case "OUT":
        return "OUTUBRO";
      case "NOV":
        return "NOVEMBRO";
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <SeachInput
          onSearch={(search) => {
            if (search) handleSearch(search);
          }}
        />
        {!!data.length && (
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 400,
              }}
            >
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Nº do cliente</TableCell>
                      <TableCell align="right">Mês</TableCell>
                      <TableCell align="right">Ano</TableCell>
                      <TableCell align="right">Download</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((item) => (
                      <TableRow
                        key={item.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {item.numeroCliente}
                        </TableCell>
                        <TableCell align="right">
                          {handleMonth(item.referenciaMes)}
                        </TableCell>
                        <TableCell align="right">
                          {item.referenciaAno}
                        </TableCell>
                        <TableCell align="right">
                          <a href={`http://localhost:3001/getPdf/?pdf=${item.path}`} target="_blank">Download</a>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
