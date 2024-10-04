// import { createTheme, CssBaseline, Stack, ThemeProvider } from "@mui/material";
import { CssBaseline, Stack, ThemeProvider } from "@mui/material";
import "../styles/globals.css";
import Head from "next/head";
import { createContext, useEffect, useMemo, useState } from "react";
import { createTheme } from "../theme";
import Notification from "../components/widgets/notification/notification";
import { getCookie, getCookies, setCookie } from "cookies-next";
import { StyleMode } from "../styles/useStyle";
import { darkStyles } from "../theme/dark-theme-options";
import { lightStyles } from "../theme/light-theme-options";
import AsyncNotification from "../components/widgets/notification/async-notification";
import { SessionProvider } from "next-auth/react";

export const mainContext = createContext(null);

function MyApp({ Component, pageProps }) {
  const [mode, setMode] = useState("dark"); // Initial theme mode
  const [note, setNote] = useState({
    message: null,
    type: "info",
    timeout: 3000,
  });
  const [theme, setTheme] = useState(null);

  // console.log("theme", theme);
  useEffect(() => {
    let settingCookies = getCookie("settings");
    let _mode = "dark";
    if (settingCookies) {
      settingCookies = JSON.parse(settingCookies);

      if (settingCookies.mode) {
        setMode(settingCookies.mode);
        _mode = settingCookies.mode;
      } else {
        setCookie("settings", {
          ...settingCookies,
          mode: "dark",
        });
        setMode("dark");
      }
    } else {
      setCookie("settings", {
        mode: "dark",
      });
    }
    const _theme = createTheme({ mode: _mode });
    setTheme(_theme);
  }, []);

  const handleUpdateTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    let settings = getCookie("settings");
    if (settings) {
      settings = JSON.parse(settings);
      const newMode = settings["mode"]
        ? settings["mode"] === "dark"
          ? "light"
          : "dark"
        : "light";
      settings["mode"] = newMode;
      setCookie("settings", settings);
    } else {
      setCookie("settings", {
        mode: "dark",
      });
    }
    const _theme = createTheme({ mode: mode === "light" ? "dark" : "light" });
    setTheme(_theme);
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
    theme && (
      <Stack
        alignItems={"center"}
        className={mode}
        sx={StyleMode(
          { background: darkStyles.background.default, color: "#abbce0" },
          { background: lightStyles.background.default, color: "#000" },
          mode
        )}
      >
        <Head>
          <title>EZ-Folio</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        </Head>
        <mainContext.Provider
          value={{
            setNote: handleUpdateNote,
            themeToggle: handleUpdateTheme,
          }}
        >
          <SessionProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <AsyncNotification>
                <Component {...pageProps} />
              </AsyncNotification>
              <Notification
                note={note.message}
                type={note.type}
                timeout={note.timeout}
              />
            </ThemeProvider>
          </SessionProvider>
        </mainContext.Provider>
      </Stack>
    )
  );
}

export default MyApp;
