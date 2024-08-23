import { Stack, Typography } from "@mui/material";
import React from "react";
export default function LabelText({
  label,
  label_sx,
  detail_sx,
  startIcon,
  sx,
  gap = 1,
  children,
}) {
  return (
    <Stack direction={"row"} gap={gap} alignItems={"center"} sx={sx}>
      <Stack direction={"row"}>
        {startIcon}
        <Typography sx={{ opacity: 0.7, ...label_sx }}>{label}</Typography>
      </Stack>
      {typeof children === "string" ? (
        <Typography variant="body1" fontWeight={"bold"} sx={detail_sx}>
          {children}
        </Typography>
      ) : (
        children
      )}
    </Stack>
  );
}
