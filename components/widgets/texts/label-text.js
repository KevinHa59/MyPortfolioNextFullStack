import { Stack, TextField, Typography } from "@mui/material";
import React from "react";

export default function LabelText({
  label,
  subLabel,
  sx,
  sx_label,
  sx_typo,
  children,
}) {
  return (
    <Stack width={"100%"} sx={sx}>
      <Stack direction={"row"} width="max-content" gap={1} sx={sx_label}>
        <Typography variant="body2" fontWeight={"bold"}>
          {label}
        </Typography>
        <Typography variant="body2" fontStyle={"italic"}>
          {subLabel}
        </Typography>
      </Stack>
      <Typography sx={sx_typo}>{children}</Typography>
    </Stack>
  );
}
