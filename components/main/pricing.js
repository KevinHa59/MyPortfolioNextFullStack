import React from "react";
import { Paper, Stack, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

const pricing = [
  {
    title: "Free",
    cost: "$0 USD/Month",
    benefits: ["Max 1 Portfolio Page", "Limit Portfolio Sections"],
  },
  {
    title: "Basic",
    cost: "$1.99 USD/Month",
    benefits: [
      "Max 5 Portfolio Pages",
      "Unlimited Portfolio Sections",
      "Access to Resumes",
    ],
  },
  {
    title: "Dev",
    cost: "$2.99 USD/Month",
    benefits: [
      "Max 10 Portfolio Pages",
      "Unlimited Portfolio Sections",
      "Access to Resumes",
      "Access to API",
    ],
  },
];

export default function Pricing() {
  return (
    <Stack direction={"row"} justifyContent={"center"} gap={10} padding={5}>
      {pricing.map((p, index) => {
        return (
          <Paper variant="outlined" key={index} sx={{ width: "300px" }}>
            <Stack alignItems={"center"} padding={5} gap={2}>
              <Typography variant="h4">{p.title}</Typography>
              <Typography variant="h6">{p.cost}</Typography>
            </Stack>
            <Stack padding={3} gap={2}>
              {p.benefits.map((b, _index) => {
                return (
                  <Stack key={_index} direction={"row"} gap={2}>
                    <CheckCircle /> {b}
                  </Stack>
                );
              })}
            </Stack>
          </Paper>
        );
      })}
    </Stack>
  );
}
