import { CircularProgress, Stack } from "@mui/material";
import React from "react";

export default function LoadingComponent({
  isLoading = false,
  loadingMessage = "",
  children,
  sx,
}) {
  return (
    <Stack
      width={"100%"}
      height={"100%"}
      alignItems={"center"}
      justifyContent={"center"}
      sx={sx}
    >
      {isLoading ? (
        <Stack alignItems={"center"} gap={1}>
          <CircularProgress />
          {loadingMessage}
        </Stack>
      ) : (
        children
      )}
    </Stack>
  );
}
