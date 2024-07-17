import { Paper, Stack, Zoom } from "@mui/material";
import React from "react";
import FormHeader from "../texts/form-header";
import LoadingComponent from "../loading/loading-component";

export default function PaperForm({
  title,
  isLoading,
  titleColor = "#fff",
  sx,
  sx_paper,
  children,
}) {
  return (
    <Zoom in={true} timeout={300}>
      <Paper
        sx={{
          maxWidth: "100vw",
          background: "rgba(255,255,255,0.1)",
          overflowX: "hidden",
          backdropFilter: "blur(5px)",
          ...sx,
        }}
        variant="outlined"
      >
        <Stack gap={1} padding={1} sx={{ height: "100%" }}>
          <FormHeader title={title} color={titleColor} />
          <Paper sx={{ position: "relative", height: "100%", ...sx_paper }}>
            <LoadingComponent isLoading={isLoading}>
              {children}
            </LoadingComponent>
          </Paper>
        </Stack>
      </Paper>
    </Zoom>
  );
}
