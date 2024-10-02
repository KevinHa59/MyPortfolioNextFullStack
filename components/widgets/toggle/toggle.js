import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";

export default function Toggle({
  size = "small",
  color = "primary",
  value = "",
  fullWidth = false,
  options,
  onChange,
}) {
  return (
    <ToggleButtonGroup
      fullWidth={fullWidth}
      size={size}
      color={color}
      value={value}
      exclusive
      onChange={(event, value) => onChange && onChange(value)}
      aria-label="Platform"
    >
      {options.map((option, index) => {
        return (
          <ToggleButton key={index} value={option}>
            {option}
          </ToggleButton>
        );
      })}
    </ToggleButtonGroup>
  );
}
