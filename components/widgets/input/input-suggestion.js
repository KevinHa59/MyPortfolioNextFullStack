import { MenuItem, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import ButtonPopover from "../buttons/button_popover";
import { ArrowDropDown } from "@mui/icons-material";

export default function InputSuggestion({
  label,
  value,
  onChange,
  onSelect,
  options,
  size = "small",
  sx,
  variant = "standard",
}) {
  return (
    <TextField
      size={size}
      sx={sx}
      variant={variant}
      value={value}
      onChange={onChange}
      fullWidth
      InputProps={{
        style: { fontSize: "12px", height: "30px" },
        startAdornment: (
          <Typography
            sx={{ minWidth: "100px", opacity: 0.7, fontSize: "12px" }}
          >
            {label}
          </Typography>
        ),
        endAdornment: options && (
          <ButtonPopover size="small" label={<ArrowDropDown />}>
            {options.map((option, index) => {
              return (
                <MenuItem
                  key={index}
                  size="small"
                  onClick={() => onSelect(option)}
                >
                  {option}
                </MenuItem>
              );
            })}
          </ButtonPopover>
        ),
      }}
    />
  );
}
