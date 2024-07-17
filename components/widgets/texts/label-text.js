import { Stack, TextField, Typography } from "@mui/material";
import React from "react";

export default function LabelText({ label, subLabel, sx, children }) {
  return (
    <Stack sx={sx}>
      <Stack direction={"row"} width={"100%"} gap={1}>
        <Typography variant="body2" fontWeight={"bold"}>
          {label}
        </Typography>
        <Typography variant="body2" fontStyle={"italic"}>
          {subLabel}
        </Typography>
      </Stack>
      <Typography>{children}</Typography>
    </Stack>
  );
}
