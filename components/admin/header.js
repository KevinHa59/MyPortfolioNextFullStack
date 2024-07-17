import { Divider, Paper, Stack, Typography } from "@mui/material";
import React from "react";

export default function Header({ title, icon, children }) {
  return (
    <Stack>
      <Stack
        direction={"row"}
        sx={{
          justifyContent: "space-between",
          paddingX: 2,
          paddingY: 4,
          borderRadius: 0,
        }}
      >
        <Stack direction={"row"} gap={1} alignItems={"center"}>
          <Typography>{icon && icon}</Typography>
          <Typography variant="h5">{title}</Typography>
        </Stack>
        <Stack direction={"row"} gap={1} alignItems={"center"}>
          {children}
        </Stack>
      </Stack>
    </Stack>
  );
}
