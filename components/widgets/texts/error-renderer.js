import { Stack, Typography, useTheme } from "@mui/material";
import React from "react";

export default function ErrorRenderer({ errors }) {
  const theme = useTheme();
  const palette = theme.palette;
  return (
    <Stack>
      {errors.map((error, index) => {
        return (
          <Typography key={index} color={palette.error.main}>
            * {error}
          </Typography>
        );
      })}
    </Stack>
  );
}
