import { PieChart } from "@mui/x-charts";
import React, { useEffect, useState } from "react";
import { chartUtils } from "./utils";

export default function ChartPie({ data, showLabel = false, height = 300 }) {
  const [chartData, setChartData] = useState([
    {
      label: "Windows",
      value: 72.72,
    },
    {
      label: "OS X",
      value: 16.38,
    },
    {
      label: "Linux",
      value: 3.83,
    },
    {
      label: "Chrome OS",
      value: 2.42,
    },
    {
      label: "Other",
      value: 4.65,
    },
  ]);

  useEffect(() => {
    if (data) {
      const _data = data.map((item, index) => {
        return {
          ...item,
          color: chartUtils.colors[index],
        };
      });
      setChartData(_data);
    }
  }, [data]);
  return (
    <PieChart
      height={height}
      slotProps={{
        legend: { direction: "row", hidden: true },
      }}
      series={[
        {
          data: chartData,
          innerRadius: "60%",

          arcLabel: (params) =>
            showLabel && params.value > 0 ? params.label : "",
        },
      ]}
    />
  );
}
