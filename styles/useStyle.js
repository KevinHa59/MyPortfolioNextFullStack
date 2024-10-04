import { getCookie } from "cookies-next";
import { darkStyles } from "../theme/dark-theme-options";
import { lightStyles } from "../theme/light-theme-options";
import { useTheme } from "@mui/material";

export default function useStyle() {
  return style;
}
let theme = getCookie("settings");
let mode = "dark";
if (theme) {
  theme = JSON.parse(theme);
  mode = theme.mode ? theme.mode : "dark";
}

const style = {
  ...lightStyles,
};
const style_dark = {
  ...darkStyles,
};

export const styles = style;
export const styles_dark = style_dark;

export function StyleMode(dark, light, mode) {
  let _mode = mode;
  if (_mode === "dark" || _mode === undefined) {
    return dark;
  } else {
    return light;
  }
}
export function Styles() {
  const theme = useTheme();
  let _mode = theme.palette.mode;
  if (_mode === "dark" || _mode === undefined) {
    return style_dark;
  } else {
    return style;
  }
}
