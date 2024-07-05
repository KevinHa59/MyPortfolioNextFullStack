import { Stack, TextField, Typography } from "@mui/material";
import React from "react";

export default function Input({
  label,
  subLabel,
  type,
  multiline = false,
  rows = 1,
  sx,
  sx_input,
  size = "small",
  fullWidth = false,
  variant,
  value,
  onChange,
  onKeyPress = null,
}) {
  return (
    <Stack sx={sx}>
      <Stack direction={"row"} gap={1}>
        <Typography variant="body2" fontWeight={"bold"}>
          {label}
        </Typography>
        <Typography variant="body2" fontStyle={"italic"}>
          {subLabel}
        </Typography>
      </Stack>
      <TextField
        type={type}
        variant={variant}
        fullWidth={fullWidth}
        multiline={multiline}
        rows={rows}
        size={size}
        sx={sx_input}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
    </Stack>
  );
}
