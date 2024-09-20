import colorUtil from "../utils/colorUtil";
import { lightStyles } from "./light-theme-options";

const neutral = {
  100: "#111827",
  200: "#1F2937",
  300: "#374151",
  400: "#4B5563",
  500: "#6B7280",
  600: "#9CA3AF",
  700: "#D1D5DB",
  800: "#E5E7EB",
  900: "#F3F4F6",
};

const background = {
  default: "#151719",
  paper: "#1c1e20",
  menu: "#23262b",
  subMenu: "#241d49",
  button: "#fff",
};

const divider = "#42464e";

const primary = {
  main: "#515BA4",
  light: "#3B429D",
  dark: "#7582EB",
  contrastText: neutral[100],
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
  primary: "#d6d6d6",
  secondary: "#ffffffE6",
  white: "#fff",
  black: "#000",
  disabled: "rgba(0, 0, 0, 0.48)",
};

export const darkStyles = {
  neutral,
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

export const darkThemeOptions = {
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          background: "linear-gradient(270deg, rgb(4, 42, 87), rgb(5, 14, 39))",
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: neutral[500],
          color: "#FFFFFF",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: text.primary,

          "&:hover": {
            color: "rgba(150,150,150,1)",
            background: `rgba(200,200,200,0.1)`,
          },
          "&.MuiButton-containedPrimary": {
            color: text.black,
            boxShadow: `${background.button}cc`,
            background: background.button,
            "&:hover": {
              color: text.black,
              background: `${background.button}cc`,
            },
          },
          "&.MuiButton-containedSecondary": {
            boxShadow: `0px 2px 7px rgba(23, 166, 119, 0.4)`,
            color: "#000",
            "&:hover": {
              color: "#fff",
              background: `${secondary.main}cc`,
            },
          },
          "&.MuiButton-containedError": {
            boxShadow: `0px 2px 7px rgba(230, 57, 70, 0.4)`,
            "&:hover": {
              background: `${error.main}cc`,
            },
          },
          "&.MuiButton-containedWarning": {
            boxShadow: `0px 2px 7px rgba(207, 145, 33, 0.4)`,
            "&:hover": {
              background: `${warning.main}cc`,
            },
          },
          "&.MuiButton-containedSuccess": {
            boxShadow: `0px 2px 7px rgba(21, 163, 148, 0.4)`,
            color: "#000",
            "&:hover": {
              background: `${success.main}cc`,
              color: "#fff",
            },
          },
          "&.MuiButton-containedInfo": {
            boxShadow: `0px 2px 7px rgba(16, 138, 235, 0.4)`,
            "&:hover": {
              background: `${info.main}cc`,
              color: "#fff",
            },
          },
          "&.MuiButton-textSecondary": {
            color: `${secondary.main}`,
            "&:hover": {
              background: `${secondary.main}1A`,
            },
          },

          "&.MuiButton-textError": {
            color: `${error.main}`,
            "&:hover": {
              background: `${error.main}1A`,
            },
          },

          "&.MuiButton-textWarning": {
            color: `${warning.main}`,
            "&:hover": {
              background: `${warning.main}1A`,
            },
          },

          "&.MuiButton-textSuccess": {
            color: `${success.main}`,
            "&:hover": {
              background: `${success.main}1A`,
            },
          },
          "&.MuiButton-textInfo": {
            color: `${info.main}`,
            "&:hover": {
              background: `${info.main}1A`,
            },
          },
          "&.Mui-disabled": {
            color: "rgba(150,150,150,0.5)", // Color when the IconButton is disabled
            opacity: 0.5, // Opacity when disabled (optional)
          },
          "&.active": {
            // background: background.paper,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          "&.MuiChip-filledDefault": {
            // backgroundColor: neutral[800],
            "& .MuiChip-deleteIcon": {
              color: error.main,
            },
          },
          "&.MuiChip-outlinedDefault": {
            borderColor: neutral[700],
            "& .MuiChip-deleteIcon": {
              color: error.main,
            },
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent", // Change background color of the progress bar
        },
        bar: {
          backgroundColor: text.primary, // Change the color of the progress bar itself
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        colorPrimary: {
          color: text.primary, // Change the color of the circular progress indicator
        },
        circle: {
          strokeLinecap: "round", // Make the progress circle's line cap rounded
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "rgba(100,100,100,0.4)",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: text.primary,
          "&:placeholder": {
            opacity: 1,
            color: text.primary,
          },
        },
        root: {
          color: text.primary,
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: text.primary,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "rgba(255,255,255,0.1)",
        },
        "&:hover MuiOutlinedInput-notchedOutline": {
          borderColor: "rgba(120, 120, 120, 1)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          background: "rgba(0,0,0,0.2)",
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        useFlexGap: true,
      },
      styleOverrides: {
        root: {
          color: text.primary,
          background: "rgba(0,0,0,0.2)",
        },
      },
    },
    MuiPopper: {
      styleOverrides: {
        root: {
          "& .MuiPaper-root": {
            color: text.primary,
          },
          // Styles for the root container if needed
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          "&.Mui-checked": {
            color: "#fff", // customize the color when checked
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderColor: divider,
          borderStyle: "solid",
          borderWidth: 1,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: text.primary,
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          borderColor: divider,
          borderStyle: "solid",
          borderWidth: 1,
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          color: neutral[700],
        },
        track: {
          backgroundColor: neutral[500],
          opacity: 1,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${divider}`,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&.odd": {
            background: "rgba(255,255,255,0.03)",
            "&.hasChild": {
              background:
                "linear-gradient(50deg, rgba(0, 255, 189, 0.4) 0%,rgba(0, 255, 189, 0.4) 15%,rgba(255, 255, 255, 0)  15.1%), rgba(255,255,255,0.03) 100%",
            },
          },
          "&.hasChild": {
            background:
              "linear-gradient(50deg, rgba(0, 255, 189, 0.4) 0%,rgba(0, 255, 189, 0.4) 15%,rgba(255, 255, 255, 0)  15.1%);",
          },
          "&.issue": {
            background: "rgba(209, 67, 67, 0.3)",
            boxShadow: "inset 0 -5px 0px rgba(209, 67, 67, 0.7)",
            "&:hover": {
              background: "rgba(209, 67, 67, 0.5)",
            },
            "&.open": {
              border: "2px solid rgb(57, 169, 135)",
              borderTop: "5.5px solid rgb(57, 169, 135)",
              borderBottom: "none",
            },
          },
          "&.open": {
            border: "2px solid rgb(57, 169, 135)",
            borderTop: "5.5px solid rgb(57, 169, 135)",
            borderBottomColor: "transparent",
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: neutral[800],
          ".MuiTableCell-root": {
            color: neutral[300],
          },
        },
      },
    },
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
      styleOverrides: {
        root: {
          color: text.primary,
          "&.reverse": {
            background: lightStyles.background.default,
            color: lightStyles.text.primary,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          color: text.primary,
          background: `${background.paper}`,
          // backdropFilter: "blur(5px)",
          "&.normal": {
            boxShadow: "3px 3px 10px rgba(200,200,200,0.2)",
          },
          "&.MuiPaper-outlined": {
            // background: background.paper,
            // borderColor: divider,
          },
          "&.reverse": {
            background: lightStyles.background.paper,
          },
          "&.bgt10": {
            background: colorUtil.hexToRgba(background.paper, 0.1),
          },
          "&.bgt20": {
            background: colorUtil.hexToRgba(background.paper, 0.2),
          },
          "&.bgt30": {
            background: colorUtil.hexToRgba(background.paper, 0.3),
          },
          "&.bgt40": {
            background: colorUtil.hexToRgba(background.paper, 0.4),
          },
          "&.bgt50": {
            background: colorUtil.hexToRgba(background.paper, 0.5),
          },
          "&.bgt60": {
            background: colorUtil.hexToRgba(background.paper, 0.6),
          },
          "&.bgt70": {
            background: colorUtil.hexToRgba(background.paper, 0.7),
          },
          "&.bgt80": {
            background: colorUtil.hexToRgba(background.paper, 0.8),
          },
          "&.bgt90": {
            background: colorUtil.hexToRgba(background.paper, 0.9),
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: text.primary,
          position: "relative",
          zIndex: 2,
          "&:after": {
            content: `none`,
            position: "absolute",
            left: 0,
            zIndex: 0,
            top: "90%",
            width: "100%",
            background: `transparent`,
            "-webkit-background-clip": "text",
            color: "transparent",
            transform: "scaleY(-1)",
            opacity: 0,
            height: "80%",
            overflow: "hidden",
          },
        },
      },
    },
  },
  palette: {
    action: {
      active: neutral[400],
      hover: "rgba(255, 255, 255, 0.04)",
      selected: "rgba(255, 255, 255, 0.08)",
      disabledBackground: "rgba(255, 255, 255, 0.12)",
      disabled: "rgba(255, 255, 255, 0.26)",
    },
    background: background,
    divider,
    error,
    info,
    mode: "dark",
    neutral,
    primary,
    secondary,
    success,
    text,
    warning,
  },
  shadows: [
    "none",
    "0px 1px 2px rgba(0, 0, 0, 0.24)",
    "0px 1px 2px rgba(0, 0, 0, 0.24)",
    "0px 1px 4px rgba(0, 0, 0, 0.24)",
    "0px 1px 5px rgba(0, 0, 0, 0.24)",
    "0px 1px 6px rgba(0, 0, 0, 0.24)",
    "0px 2px 6px rgba(0, 0, 0, 0.24)",
    "0px 3px 6px rgba(0, 0, 0, 0.24)",
    "0px 4px 6px rgba(0, 0, 0, 0.24)",
    "0px 5px 12px rgba(0, 0, 0, 0.24)",
    "0px 5px 14px rgba(0, 0, 0, 0.24)",
    "0px 5px 15px rgba(0, 0, 0, 0.24)",
    "0px 6px 15px rgba(0, 0, 0, 0.24)",
    "0px 7px 15px rgba(0, 0, 0, 0.24)",
    "0px 8px 15px rgba(0, 0, 0, 0.24)",
    "0px 9px 15px rgba(0, 0, 0, 0.24)",
    "0px 10px 15px rgba(0, 0, 0, 0.24)",
    "0px 12px 22px -8px rgba(0, 0, 0, 0.24)",
    "0px 13px 22px -8px rgba(0, 0, 0, 0.24)",
    "0px 14px 24px -8px rgba(0, 0, 0, 0.24)",
    "0px 20px 25px rgba(0, 0, 0, 0.24)",
    "0px 25px 50px rgba(0, 0, 0, 0.24)",
    "0px 25px 50px rgba(0, 0, 0, 0.24)",
    "0px 25px 50px rgba(0, 0, 0, 0.24)",
    "0px 25px 50px rgba(0, 0, 0, 0.24)",
  ],
};
