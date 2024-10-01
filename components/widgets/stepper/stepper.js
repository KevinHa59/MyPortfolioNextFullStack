import {
  Collapse,
  Divider,
  MenuItem,
  Paper,
  Stack,
  useTheme,
} from "@mui/material";
import React, { createContext, useContext, useEffect, useState } from "react";
const stepperContext = createContext();
export default function Stepper({ children }) {
  const theme = useTheme();
  const [selectedStep, setSelectedStep] = useState(0);

  return (
    <Stack gap={1} sx={{ height: "100%", overflow: "hidden" }}>
      <stepperContext.Provider value={{ selectedStep, setSelectedStep, theme }}>
        {children}
      </stepperContext.Provider>
    </Stack>
  );
}

export function Step({ title, step = 0, children }) {
  const { selectedStep, setSelectedStep, theme } = useContext(stepperContext);

  return (
    <Stack
      sx={{
        height: selectedStep === step ? `100%` : "max-content",
        overflow: "hidden",
      }}
    >
      <MenuItem
        sx={{ height: "50px" }}
        title={title}
        onClick={() => setSelectedStep(step === selectedStep ? -1 : step)}
      >
        {title}
      </MenuItem>
      {selectedStep === step && (
        <Paper
          sx={{
            marginX: 1,
            height: "100%",
            overflowY: "auto",
            background: theme.palette.background.default,
          }}
        >
          {children}
        </Paper>
      )}
    </Stack>
  );
}
