import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import { useEffect } from "react";
import { Stack, Typography } from "@mui/material";

export default function SelectCustom({
  data,
  sx,
  sx_select = {},
  label,
  subLabel,
  size = "large",
  variant = "outlined",
  item_field,
  sub_item_field,
  value_field,
  onChange,
  selected_value,
}) {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };

  useEffect(() => {
    setValue(selected_value);
  }, [selected_value]);

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
      <Select
        value={value}
        size={size}
        variant={variant}
        onChange={handleChange}
        SelectDisplayProps={{
          style: { ...sx_select },
        }}
      >
        {data &&
          data.map((item, index) => (
            <MenuItem
              key={index}
              value={value_field ? item[value_field] : item}
              // sx={{ ...sx_item }}
            >
              {item_field ? item[item_field] : item}{" "}
              {sub_item_field && ` - ${item[sub_item_field]}`}
            </MenuItem>
          ))}
        {data && data.length === 0 && <MenuItem>No Item</MenuItem>}
      </Select>
    </Stack>
  );
}
