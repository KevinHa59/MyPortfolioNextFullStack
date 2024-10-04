import React, { useContext, useEffect, useState } from "react";
import { mainContext } from "../../pages/_app";
import { Button, Slide, Stack, useTheme } from "@mui/material";
import { getCookie, setCookie } from "cookies-next";
import { DarkMode, LightMode } from "@mui/icons-material";

export default function ThemeButton({ sx, size }) {
  const theme = useTheme();
  const { themeToggle } = useContext(mainContext);

  useEffect(() => {
    let settings = getCookie("setting");
    if (settings) {
      settings = JSON.parse(settings);
    }
  }, []);

  const handleToggleMode = () => {
    themeToggle();
  };

  return (
    <Button
      size={size}
      sx={{
        ...sx,
        borderRadius: "25px",
        padding: 0,
        height: "30px",
        width: "80px",
        display: "flex",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
      variant="contained"
      onClick={handleToggleMode}
    >
      <Slide direction={"down"} in={theme.palette.mode === "dark"}>
        <Stack
          direction={"row"}
          gap={0.5}
          sx={{
            color: "inherit",
            position: "absolute",
          }}
        >
          <DarkMode />
          Dark
        </Stack>
      </Slide>
      <Slide direction={"up"} in={theme.palette.mode === "light"}>
        <Stack
          direction={"row"}
          gap={0.5}
          sx={{
            color: "inherit",
            position: "absolute",
          }}
        >
          <LightMode />
          Light
        </Stack>
      </Slide>
    </Button>
  );
}

export function getMode() {
  let settings = getCookie("settings");
  if (settings) {
    settings = JSON.parse(settings);
    const newMode = settings["mode"]
      ? settings["mode"] === "dark"
        ? "light"
        : "dark"
      : "light";
    return newMode;
  } else {
    return "dark";
  }
}
