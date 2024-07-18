import { Divider, Fade, Paper, Slide, Stack, Typography } from "@mui/material";
import React from "react";
import FormHeader from "../widgets/texts/form-header";

export default function Header({ title, icon, children }) {
  return (
    <Stack>
      <Stack
        direction={"row"}
        sx={{
          justifyContent: "space-between",
          alignItems: "flex-end",
          paddingX: 2,
          paddingY: 4,
          borderRadius: 0,
        }}
      >
        <Stack
          direction={"row"}
          gap={1}
          alignItems={"center"}
          sx={{
            position: "relative",
            overflow: "hidden",
            paddingBottom: "5px",
            paddingRight: 5,
          }}
        >
          {icon && icon}
          <Fade in={true} timeout={1000}>
            <Stack>
              <FormHeader title={title} />
            </Stack>
          </Fade>
          <Slide direction="right" in={true} timeout={1000}>
            <Paper
              className="reverse"
              sx={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                height: "2px",
              }}
            />
          </Slide>
        </Stack>
        <Stack direction={"row"} gap={1} alignItems={"center"}>
          {children}
        </Stack>
      </Stack>
    </Stack>
  );
}
