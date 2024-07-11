import { Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { styles } from "../../styles/useStyle";

export default function Header({ title, children }) {
  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "space-between",
        paddingX: 2,
        borderRadius: 0,
      }}
    >
      <Stack direction={"row"} gap={1} paddingY={1} alignItems={"center"}>
        <Typography color={styles.text.black} variant="h5">
          {title}
        </Typography>
      </Stack>
      <Stack direction={"row"} gap={1} alignItems={"center"}>
        {children}
      </Stack>
    </Paper>
  );
}
