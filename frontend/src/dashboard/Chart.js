import * as React from "react";

import {
  BarChart,
  Bar,
  Rectangle,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Chart({ data }) {
  const fixValue = (payload) => {
    let value = payload[0].value.toFixed(2);

    if (payload[0].dataKey.includes("Valor")) {
      const currencyFormat = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      });

      value = currencyFormat.format(value);
    }

    return value;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${payload[0].payload.name} : ${fixValue(
            payload
          )}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="80%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Bar
          dataKey="kWhConsumo"
          fill="#0088FE"
          activeBar={<Rectangle fill="#0088FE" stroke="black" />}
        />
        <Bar
          dataKey="kWhComopensada"
          fill="#00C49F"
          activeBar={<Rectangle fill="#00C49F" stroke="black" />}
        />
        <Bar
          dataKey="ValorTotal"
          fill="#FFBB28"
          activeBar={<Rectangle fill="#FFBB28" stroke="black" />}
        />
        <Bar
          dataKey="ValorTotalEconomia"
          fill="#FF8042"
          activeBar={<Rectangle fill="#FF8042" stroke="black" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
