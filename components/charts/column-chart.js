import { BarChart } from "@mui/x-charts";
import React, { useEffect, useState } from "react";
import { chartUtils } from "./utils";

export default function ChartColumn({ data, showLegend = false }) {
  const [chartData, setChartData] = useState({
    data: [4000, 3000, 2000, 2780, 1890, 2390, 3490],
    label: [
      "Page A",
      "Page B",
      "Page C",
      "Page D",
      "Page E",
      "Page F",
      "Page G",
    ],
    color: chartUtils.colors.slice(0, 7),
  });

  useEffect(() => {
    if (data) {
      setChartData(data);
    }
  }, [data]);
  return (
    <BarChart
      slotProps={{
        legend: { hidden: showLegend },
      }}
      // Fix: Return an object for each series, not an array
      series={[{ data: chartData.data }]}
      xAxis={[
        {
          data: chartData.label,
          scaleType: "band",
        },
      ]} // X-axis labels
    />
  );
}
