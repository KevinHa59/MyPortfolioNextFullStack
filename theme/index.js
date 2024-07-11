import {
  createTheme as createMuiTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import { baseThemeOptions } from "./base-theme-options";
import { darkThemeOptions } from "./dark-theme-options";

export const createTheme = (config) => {
  let theme = createMuiTheme(baseThemeOptions, darkThemeOptions, {
    direction: "ltr",
  });
  return theme;
};
