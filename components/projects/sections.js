import { Stack, Typography } from "@mui/material";
import React from "react";

export function Sample({ children }) {
  return (
    <Stack width={"100%"} alignItems={"center"}>
      <Typography textAlign={"left"} sx={{ width: "100%" }} variant="h4">
        Sample
      </Typography>
      {children}
    </Stack>
  );
}

export function HowToUse({ children }) {
  return (
    <Stack width={"100%"} alignItems={"center"}>
      <Typography textAlign={"left"} sx={{ width: "100%" }} variant="h4">
        How to use.
      </Typography>
      {children}
    </Stack>
  );
}
