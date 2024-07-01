import { Stack, Typography } from "@mui/material";
import React from "react";

export default function FormHeader({ title }) {
  return (
    <Stack alignItems={"center"}>
      <Typography variant="body1" fontWeight={"bold"}>
        {title}
      </Typography>
    </Stack>
  );
}
