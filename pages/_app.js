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
  const [note, setNote] = useState({
    message: null,
    type: "info",
  });

  // const handleUpdateNote = (note, type = "success") => {
  //   setNote({
  //     message: note,
  //     type: type,
  //   });
  // };

  const handleUpdateNote = {
    success: (message) => {
      setNote({
        message: message,
        type: "success",
      });
    },
    error: (message) => {
      setNote({
        message: message,
        type: "error",
      });
    },
    info: (message) => {
      setNote({
        message: message,
        type: "info",
      });
    },
  };

  return (
    <Stack>
      <Head>
        <title>My Portfolio</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <mainContext.Provider
        value={{
          setNote: handleUpdateNote,
        }}
      >
        <ThemeProvider
          theme={createTheme({
            mode: settings.theme,
          })}
        >
          <CssBaseline />
          <Component {...pageProps} />
          <Notification note={note.message} type={note.type} />
        </ThemeProvider>
      </mainContext.Provider>
    </Stack>
  );
}

export default MyApp;
