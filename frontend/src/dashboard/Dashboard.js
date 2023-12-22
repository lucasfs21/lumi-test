import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "./Chart";
import axios from "axios";
import SeachInput from "../search-input/SearchInput";

import {
  LabelsContainer,
  LabelWrapper,
  LabelCircle,
  LabelText,
} from "./dashbord.styles";

export default function Dashboard() {
  const [chartData, setChartData] = React.useState([]);

  const handleChartData = (data) => {
    let consumo = 0;
    let energiaCompensada = 0;
    let valorTotal = 0;
    let economia = 0;

    data.forEach((item) => {
      consumo =
        consumo + item.energiaQuantidade + item.energiaSceeIcmsQuantidade;
      energiaCompensada = energiaCompensada + item.energiaCompensadaQuantidade;
      valorTotal =
        valorTotal +
        item.energiaValor +
        item.energiaSceeIcmsValor +
        item.contribIlumPublicaMunicipal;
      economia = economia + item.energiaCompensadaValor;
    });

    const chartData = [
      {
        name: "Consumo de Energia Elétrica",
        kWhConsumo: consumo,
      },
      {
        name: "Energia Compensada",
        kWhComopensada: energiaCompensada,
      },
      {
        name: "Valor Total sem GD",
        ValorTotal: valorTotal,
      },
      {
        name: "Economia GD",
        ValorTotalEconomia: economia * -1,
      },
    ];

    setChartData(chartData);
  };

  const handleSearch = async (search) => {
    const response = await axios.get(`http://localhost:3001/getData/${search}`);

    if (response.data.length) {
      handleChartData(response.data);
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
        {/* Chart */}
        {!!chartData.length && (
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 400,
              }}
            >
              <Chart data={chartData} />
              <LabelsContainer>
                <LabelWrapper>
                  <LabelCircle color="#0088FE" />
                  <LabelText>Consumo de Energia Elétrica (kWh)</LabelText>
                </LabelWrapper>
                <LabelWrapper>
                  <LabelCircle color="#00C49F" />
                  <LabelText>Energia Compensada (kWh)</LabelText>
                </LabelWrapper>
                <LabelWrapper>
                  <LabelCircle color="#FFBB28" />
                  <LabelText>Valor Total sem GD (R$)</LabelText>
                </LabelWrapper>
                <LabelWrapper>
                  <LabelCircle color="#FF8042" />
                  <LabelText>Economia GD (R$)</LabelText>
                </LabelWrapper>
              </LabelsContainer>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
