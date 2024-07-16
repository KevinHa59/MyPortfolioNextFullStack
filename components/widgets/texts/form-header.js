import { Fade, Slide, Stack, Typography, Zoom } from "@mui/material";
import React from "react";

export default function FormHeader({ variant = "h6", sx, title, color }) {
  return (
    <Stack alignItems={"center"} width={"100%"}>
      <Slide in={true} direction="down" timeout={500}>
        <Typography
          variant={variant}
          textAlign={"left"}
          fontWeight={"bold"}
          data-text={title}
          sx={{ color: color, width: "100%", ...sx }}
        >
          {title}
        </Typography>
      </Slide>
    </Stack>
  );
}
