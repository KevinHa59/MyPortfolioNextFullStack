// import { createTheme, CssBaseline, Stack, ThemeProvider } from "@mui/material";
import { CssBaseline, Stack, ThemeProvider } from "@mui/material";
import "../styles/globals.css";
import Head from "next/head";
import { createContext, useEffect, useState } from "react";
import { createTheme } from "../theme";
import Notification from "../components/widgets/notification/notification";
import { getCookie, getCookies, setCookie } from "cookies-next";
import { StyleMode } from "../styles/useStyle";
import { darkStyles } from "../theme/dark-theme-options";
import { lightStyles } from "../theme/light-theme-options";

export const mainContext = createContext(null);

function MyApp({ Component, pageProps }) {
  const [settings, setSettings] = useState({
    theme: "dark",
  });
  const [note, setNote] = useState({
    message: null,
    type: "info",
    timeout: 3000,
  });

  useEffect(() => {
    let settingCookies = getCookie("settings");
    if (settingCookies) {
      settingCookies = JSON.parse(settingCookies);
      if (settingCookies.mode) {
        handleUpdateTheme(settingCookies.mode);
      } else {
        setCookie("settings", {
          ...settingCookies,
          mode: "dark",
        });
      }
    } else {
      setCookie("settings", {
        mode: "dark",
      });
    }
  }, []);

  const handleUpdateTheme = (mode = null) => {
    setSettings((prev) => {
      return {
        ...prev,
        theme: mode ? mode : prev.theme === "dark" ? "light" : "dark",
      };
    });
  };

  const handleUpdateNote = {
    success: (message, timeout = 3000) => {
      setNote({
        message: message,
        type: "success",
        timeout: timeout,
      });
    },
    error: (message, timeout = 3000) => {
      setNote({
        message: message,
        type: "error",
        timeout: timeout,
      });
    },
    info: (message, timeout = 3000) => {
      setNote({
        message: message,
        type: "info",
        timeout: timeout,
      });
    },
  };

  return (
    <Stack
      className={settings.theme}
      sx={StyleMode(
        { background: darkStyles.background.default, color: "#abbce0" },
        { background: lightStyles.background.default, color: "#000" },
        settings.theme
      )}
    >
      <Head>
        <title>My Portfolio</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <mainContext.Provider
        value={{
          setNote: handleUpdateNote,
          settings: settings,
          themeToggle: handleUpdateTheme,
        }}
      >
        <ThemeProvider
          theme={createTheme({
            mode: settings.theme,
          })}
        >
          <CssBaseline />
          <Component {...pageProps} />
          <Notification
            note={note.message}
            type={note.type}
            timeout={note.timeout}
          />
        </ThemeProvider>
      </mainContext.Provider>
    </Stack>
  );
}

export default MyApp;
