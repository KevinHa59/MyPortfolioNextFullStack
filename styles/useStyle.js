import { getCookie } from "cookies-next";
import { useContext } from "react";
import { mainContext } from "../pages/_app";
import { darkStyles } from "../theme/dark-theme-options";
import { lightStyles } from "../theme/light-theme-options";

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

export function StyleMode(dark, light, mode = "dark") {
  const context = useContext(mainContext);
  let _mode = mode;
  if (context) {
    _mode = context.settings.theme;
  }
  if (_mode === "dark" || _mode === undefined) {
    return dark;
  } else {
    return light;
  }
}
export function Styles() {
  const context = useContext(mainContext);
  let _mode = "dark";
  if (context) {
    _mode = context.settings.theme;
  }

  if (_mode === "dark" || _mode === undefined) {
    return style_dark;
  } else {
    return style;
  }
}
