import { RemoveRedEye, Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { styles } from "../../../styles/useStyle";

export default function Input({
  autoComplete = "off",
  id,
  label,
  subLabel,
  type,
  multiline = false,
  rows = 1,
  sx,
  sx_input,
  inputProps,
  inputClassName,
  size = "small",
  fullWidth = false,
  isInvalidInput = false,
  inputErrorMessage = "",
  variant,
  value,
  onChange,
  onKeyPress = null,
}) {
  const [visible, setVisible] = useState(false);
  return (
    <Stack sx={sx}>
      <Stack direction={"row"} paddingX={1} gap={1} sx={{ opacity: 0.7 }}>
        <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
          {label}
        </Typography>
        <Typography variant="body2" fontStyle={"italic"}>
          {subLabel}
        </Typography>
        {isInvalidInput && (
          <Typography sx={{ color: styles.error.main }} variant="body2">
            {inputErrorMessage}
          </Typography>
        )}
      </Stack>
      <TextField
        id={id}
        type={type === "password" ? (visible ? "text" : "password") : type}
        variant={variant}
        fullWidth={fullWidth}
        multiline={multiline}
        rows={rows}
        size={size}
        sx={sx_input}
        autoComplete={autoComplete}
        InputProps={
          type === "password"
            ? {
                ...inputProps,
                endAdornment: (
                  <IconButton
                    size="small"
                    onClick={() => setVisible((prev) => !prev)}
                  >
                    {visible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }
            : inputProps
        }
        className={inputClassName}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
    </Stack>
  );
}
