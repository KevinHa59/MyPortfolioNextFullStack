import { Fade, Slide, Stack, Typography, Zoom } from "@mui/material";
import React from "react";
import { lightStyles } from "../../../theme/light-theme-options";

export default function FormHeader({
  variant = "h6",
  sx,
  title,
  color = null,
}) {
  return (
    <Stack alignItems={"center"} width={"100%"}>
      <Slide in={true} direction="down" timeout={500}>
        <Typography
          variant={variant}
          textAlign={"left"}
          fontWeight={400}
          data-text={title}
          sx={{
            width: "100%",
            ...sx,
          }}
        >
          {title}
        </Typography>
      </Slide>
    </Stack>
  );
}
