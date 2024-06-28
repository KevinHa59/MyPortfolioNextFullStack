import { Fade, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function Splash({ isDone = false, timeout = null, onDone }) {
  const [isActive, setIsActive] = useState(true);
  useEffect(() => {
    setIsActive(!isDone);
    if (isDone === false && timeout) {
      setTimeout(() => {
        setIsActive(false);
        onDone && onDone();
      }, timeout);
    } else {
      onDone && onDone();
    }
  }, [isDone]);

  return (
    <Stack
      sx={{
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Fade in={isActive} timeout={1000}>
        <Stack
          padding={1}
          sx={{
            border: "5px dashed #000",
            borderRadius: "25px",
            background: "linear-gradient(90deg, #00afb9, #7209b7)",
          }}
        >
          <Stack sx={{ background: "#000", borderRadius: "15px" }} padding={2}>
            <Typography
              variant="h3"
              fontWeight={"bold"}
              sx={{
                background: "linear-gradient(90deg, #00afb9, #7209b7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              My Portfolio
            </Typography>
          </Stack>
        </Stack>
      </Fade>
    </Stack>
  );
}
