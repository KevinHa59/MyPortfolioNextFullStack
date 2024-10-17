import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { Box, Stack, useTheme } from "@mui/material";
import React, { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
export default function CodeSnippet({ children }) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Stack
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: open ? "50px" : "150px",
          background: `linear-gradient(0deg, ${theme.palette.background.default} 10%, transparent)`,
          cursor: "pointer",
        }}
        onClick={() => setOpen((prev) => !prev)}
        alignItems={"center"}
        justifyContent={"flex-end"}
      >
        {open ? <ArrowUpward /> : <ArrowDownward />}
      </Stack>
      <SyntaxHighlighter
        language="javascript"
        style={{
          ...atomOneDark,
          hljs: {
            ...atomOneDark.hljs,
            background: theme.palette.background.default,
          },
        }}
        customStyle={{
          width: "100%",
          maxHeight: open ? "max-content" : "300px",
          overflow: "hidden",
          paddingBottom: "50px",
        }}
      >
        {children}
      </SyntaxHighlighter>
    </Box>
  );
}
