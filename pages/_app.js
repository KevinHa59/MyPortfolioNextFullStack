// import { createTheme, CssBaseline, Stack, ThemeProvider } from "@mui/material";
import { CssBaseline, Stack, ThemeProvider } from "@mui/material";
import "../styles/globals.css";
import Head from "next/head";
import { useState } from "react";
import { createTheme } from "../theme";

function MyApp({ Component, pageProps }) {
  const [settings, setSettings] = useState({
    theme: "dark",
  });
  return (
    <Stack>
      <Head>
        <title>My Portfolio</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider
        theme={createTheme({
          mode: settings.theme,
        })}
      >
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </Stack>
  );
}

export default MyApp;
