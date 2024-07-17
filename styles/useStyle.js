import { getCookie } from "cookies-next";

export default function useStyle() {
  return style;
}
let theme = getCookie("settings");
let mode = "dark";
if (theme) {
  theme = JSON.parse(theme);
  mode = theme.mode ? theme.mode : "dark";
}
const neutral = {
  100: "#F3F4F6",
  200: "#E5E7EB",
  300: "#D1D5DB",
  400: "#9CA3AF",
  500: "#6B7280",
  600: "#4B5563",
  700: "#374151",
  800: "#1F2937",
  900: "#111827",
};

const background = {
  default: "#efefef",
  paper: "#ffffff",
  menu: "#2b3240",
  subMenu: "#304152",
};

const divider = "#2D3748";

const primary = {
  main: "#7582EB",
  light: "#909BEF",
  dark: "#515BA4",
  contrastText: neutral[900],
};

const secondary = {
  main: "#10B981",
  light: "#3FC79A",
  dark: "#0B815A",
  contrastText: neutral[900],
};

const success = {
  main: "#14B8A6",
  light: "#43C6B7",
  dark: "#0E8074",
  contrastText: neutral[900],
};

const info = {
  main: "#2196F3",
  light: "#64B6F7",
  dark: "#0B79D0",
  contrastText: neutral[900],
};

const warning = {
  main: "#FFB020",
  light: "#FFBF4C",
  dark: "#B27B16",
  contrastText: neutral[900],
};

const error = {
  main: "#D14343",
  light: "#DA6868",
  dark: "#922E2E",
  contrastText: neutral[900],
};

const text = {
  primary: "#EDF2F7",
  secondary: "#A0AEC0",
  white: "#fff",
  black: "#000",
  disabled: "rgba(255, 255, 255, 0.48)",
};

const style = {
  background,
  divider,
  primary,
  secondary,
  success,
  info,
  warning,
  error,
  text,
};

export const styles = style;
