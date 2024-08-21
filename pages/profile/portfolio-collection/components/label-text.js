import { Stack, Typography } from "@mui/material";
import React from "react";

export default function LabelText({
  label,
  label_sx,
  detail_sx,
  sx,
  gap = 1,
  children,
}) {
  return (
    <Stack direction={"row"} gap={gap} alignItems={"center"} sx={sx}>
      <Typography sx={{ opacity: 0.7, ...label_sx }}>{label}</Typography>
      <Typography variant="body1" fontWeight={"bold"} sx={{ detail_sx }}>
        {children}
      </Typography>
    </Stack>
  );
}
