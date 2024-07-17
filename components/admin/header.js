import { Divider, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { styles } from "../../styles/useStyle";

export default function Header({ title, children }) {
  return (
    <Stack paddingX={5}>
      <Stack
        direction={"row"}
        sx={{
          justifyContent: "space-between",
          paddingX: 2,
          borderRadius: 0,
          background: "transparent",
        }}
      >
        <Stack direction={"row"} gap={1} paddingY={1} alignItems={"center"}>
          <Typography variant="h5">{title}</Typography>
        </Stack>
        <Stack direction={"row"} gap={1} alignItems={"center"}>
          {children}
        </Stack>
      </Stack>
      <Divider sx={{ background: "rgba(100,100,100,1)" }} />
    </Stack>
  );
}
