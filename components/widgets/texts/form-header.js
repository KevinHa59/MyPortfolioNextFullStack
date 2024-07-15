import { Fade, Slide, Stack, Typography, Zoom } from "@mui/material";
import React from "react";

export default function FormHeader({ title, color }) {
  return (
    <Stack alignItems={"center"} width={"100%"}>
      <Slide in={true} direction="down" timeout={500}>
        <Typography
          variant="h6"
          textAlign={"left"}
          fontWeight={"bold"}
          data-text={title}
          sx={{ color: color, width: "100%" }}
        >
          {title}
        </Typography>
      </Slide>
    </Stack>
  );
}
