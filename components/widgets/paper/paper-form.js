import { Button, Paper, Stack, Zoom } from "@mui/material";
import React from "react";
import FormHeader from "../texts/form-header";
import LoadingComponent from "../loading/loading-component";
import { darkStyles } from "../../../theme/dark-theme-options";
import { Clear } from "@mui/icons-material";

export default function PaperForm({
  title,
  isLoading,
  titleColor = "#fff",
  onClose = null,
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
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <FormHeader title={title} color={darkStyles.text.primary} />
            {onClose && (
              <Button
                color="error"
                size="small"
                onClick={onClose}
                sx={{ padding: 0, minWidth: 0 }}
              >
                <Clear />
              </Button>
            )}
          </Stack>
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
