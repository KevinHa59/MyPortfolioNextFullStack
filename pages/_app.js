// import { createTheme, CssBaseline, Stack, ThemeProvider } from "@mui/material";
import { CssBaseline, Stack, ThemeProvider } from "@mui/material";
import "../styles/globals.css";
import Head from "next/head";
import { createContext, useState } from "react";
import { createTheme } from "../theme";
import Notification from "../components/widgets/notification/notification";

export const mainContext = createContext(null);

function MyApp({ Component, pageProps }) {
  const [settings, setSettings] = useState({
    theme: "dark",
  });
  const [note, setNote] = useState(null);
  return (
    <Stack>
      <Head>
        <title>My Portfolio</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <mainContext.Provider
        value={{
          setNote: setNote,
        }}
      >
        <ThemeProvider
          theme={createTheme({
            mode: settings.theme,
          })}
        >
          <CssBaseline />
          <Component {...pageProps} />
          <Notification note={note} />
        </ThemeProvider>
      </mainContext.Provider>
    </Stack>
  );
}

export default MyApp;
