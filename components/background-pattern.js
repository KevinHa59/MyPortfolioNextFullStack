import { Stack } from "@mui/material";
import React from "react";

export default function BackgroundPattern() {
  return (
    <>
      <Stack
        sx={{
          position: "absolute",
          top: 0,
          left: 100,
          width: "15vw",
          height: "100%",
          background: "#0366d61a",
          zIndex: 1,
        }}
      />
      <Stack
        sx={{
          position: "absolute",
          top: 100,
          left: 0,
          width: "100%",
          height: "30vh",
          background: "#0366d61a",
          zIndex: 1,
        }}
      />
    </>
  );
}
