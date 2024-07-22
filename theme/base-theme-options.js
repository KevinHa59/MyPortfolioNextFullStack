import { styles, styles_dark } from "../styles/useStyle";
import { darkStyles } from "./dark-theme-options";
import { lightStyles } from "./light-theme-options";

export const baseThemeOptions = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1000,
      lg: 1200,
      xl: 1920,
    },
  },
  components: {
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: 0,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "25px",
          fontWeight: 400,
          "&.active": {
            color: "#ff0f50",
            fontWeight: "bold",
          },
          "&.dark-active": {
            background: styles_dark.background.default,
            color: darkStyles.text.primary,
          },
          "&.dark-inactive": {
            color: darkStyles.text.primary,
          },
          "&.light-active": {
            background: lightStyles.background.default,
            color: "#fff",
          },
          "&.light-inactive": {
            background: "#000",
            color: "#fff",
          },

          "&.flex-start": {
            minWidth: 0,
            display: "flex",
            justifyContent: "flex-start",
          },
          "&.flex-end": {
            minWidth: 0,
            display: "flex",
            justifyContent: "flex-end",
          },
          "&.br0": {
            borderRadius: 0,
          },
          "&.bw": {
            filter: "grayScale(1)",
            opacity: 0.7,
          },
        },
        sizeSmall: {
          padding: "6px 16px",
        },
        sizeMedium: {
          padding: "8px 20px",
        },
        sizeLarge: {
          padding: "11px 24px",
        },
        textSizeSmall: {
          padding: "7px 12px",
        },
        textSizeMedium: {
          padding: "9px 16px",
        },
        textSizeLarge: {
          padding: "12px 16px",
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          color: "#000",
          borderRadius: "25px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        useFlexGap: true,
      },
      styleOverrides: {
        root: {
          color: "#000",
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: "16px 24px",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "32px 24px",
          "&:last-child": {
            paddingBottom: "32px",
          },
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: {
          variant: "h6",
        },
        subheaderTypographyProps: {
          variant: "body2",
        },
      },
      styleOverrides: {
        root: {
          padding: "32px 24px",
        },
      },
    },
    MuiCheckbox: {
      defaultProps: {
        color: "primary",
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          color: "#fff",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box",
        },
        html: {
          MozOsxFontSmoothing: "grayscale",
          WebkitFontSmoothing: "antialiased",
          display: "flex",
          flexDirection: "column",
          minHeight: "100%",
          width: "100%",
        },
        body: {
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
          minHeight: "100%",
          width: "100%",
        },
        "#__next": {
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
          height: "100%",
          width: "100%",
        },
        "#nprogress": {
          pointerEvents: "none",
        },
        "#nprogress .bar": {
          backgroundColor: "#5048E5",
          height: 3,
          left: 0,
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 2000,
        },
      },
    },

    MuiDrawer: {},
    MuiIconButton: {
      styleOverrides: {
        root: {
          // borderRadius: 8,
          padding: 8,
          "&.Mui-disabled": {
            color: "rgba(150,150,150,0.5)", // Color when the IconButton is disabled
            opacity: 0.5, // Opacity when disabled (optional)
          },
        },
        sizeSmall: {
          padding: 4,
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 3,
          overflow: "hidden",
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: "hover",
        fontWeight: "bold",
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          marginRight: "16px",
          "&.MuiListItemIcon-root": {
            minWidth: "unset",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          fontWeight: 500,
        },
        root: {
          borderRadius: "25px", // Set your desired border radius here
        },
      },
    },
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
      styleOverrides: {
        root: {
          "&.dark": {
            background: styles_dark.background.paper,
            color: styles_dark.text.primary,
          },
          "&.light": {
            background: styles.background.menu,
            color: styles.text.primary,
          },
          "&.reverse": {
            background: darkStyles.background.paper,
            color: darkStyles.text.primary,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          position: "relative",
          color: "#000",
          boxShadow:
            "inset 0px 0px 100px rgba(255,255,255,0.02), 0px 0px 10px rgba(0,0,0,0.2)",
          "&.MuiPaper-outlined": {
            borderColor: "rgba(180,180,180,0.1)",
          },
          "&.flat": {
            boxShadow: "none",
          },
          "&.br0": {
            borderRadius: 5,
          },
          "&.brMAX": {
            borderRadius: "100%",
          },
          "&.reverse": {
            background: darkStyles.background.paper,
          },
        },
      },
    },
    MuiPopover: {
      defaultProps: {
        elevation: 16,
      },
    },
    MuiRadio: {
      defaultProps: {
        color: "primary",
      },
    },
    MuiSwitch: {
      defaultProps: {
        color: "primary",
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 500,
          lineHeight: 1.71,
          minWidth: "auto",
          paddingLeft: 0,
          paddingRight: 0,
          textTransform: "none",
          "& + &": {
            marginLeft: 24,
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          height: "100px",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {},
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&.odd": {
            background: "rgba(255,255,255,0.03)",
            "&.hasChild": {
              background:
                "linear-gradient(50deg, rgba(0, 255, 189, 0.4) 0%,rgba(0, 255, 189, 0.4) 15%,rgba(255, 255, 255, 0)  15.1%, rgba(255,255,255,0.03) 100%);",
            },
          },
          "&.hasChild": {
            background:
              "linear-gradient(50deg, rgba(0, 255, 189, 0.4) 0%,rgba(0, 255, 189, 0.4) 15%,rgba(255, 255, 255, 0)  15.1%);",
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          borderBottom: "none",
          "& .MuiTableCell-root": {
            borderBottom: "none",
            fontSize: "12px",
            fontWeight: 600,
            lineHeight: 1,
            letterSpacing: 0.5,
            textTransform: "uppercase",
          },
          "& .MuiTableCell-paddingCheckbox": {
            paddingTop: 4,
            paddingBottom: 4,
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#000",
          color: "rgba(144, 155, 239, 1)",
          textAlign: "center",
          fontSize: 14,
          paddingLeft: "15px",
          paddingRight: "15px",
          paddingTop: "8px",
          paddingBottom: "8px",
          border: "none",
        },
        arrow: {
          color: "#000",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          position: "relative",
          zIndex: 2,
          "&:after": {
            content: `attr(data-text)`,
            position: "absolute",
            left: 0,
            zIndex: 0,
            top: "75%",
            width: "100%",
            background: `linear-gradient(0deg, rgb(190,190,190), transparent 80%)`,
            "-webkit-background-clip": "text",
            color: "transparent",
            transform: "scaleY(-1)",
            opacity: "0.8",
            height: "80%",
            overflow: "hidden",
          },
        },
      },
    },
  },
  direction: "ltr",
  shape: {
    borderRadius: 8,
  },
  typography: {
    button: {
      fontWeight: 600,
    },
    fontFamily:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.57,
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: 1.75,
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.57,
    },
    overline: {
      fontSize: "0.75rem",
      fontWeight: 600,
      letterSpacing: "0.5px",
      lineHeight: 2.5,
      textTransform: "uppercase",
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 400,
      lineHeight: 1.66,
    },
    h1: {
      fontWeight: 700,
      fontSize: "3.5rem",
      lineHeight: 1.375,
    },
    h2: {
      fontWeight: 700,
      fontSize: "3rem",
      lineHeight: 1.375,
    },
    h3: {
      fontWeight: 700,
      fontSize: "2.25rem",
      lineHeight: 1.375,
    },
    h4: {
      fontWeight: 700,
      fontSize: "2rem",
      lineHeight: 1.375,
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: 1.375,
    },
    h6: {
      fontWeight: 600,
      fontSize: "1.125rem",
      lineHeight: 1.375,
    },
  },
  MuiInputAdornment: {
    styleOverrides: {
      root: {
        "& .MuiSvgIcon-root": {
          color: "#ff0000", // Change the color of the calendar icon
          fontSize: "2rem", // Change the size of the calendar icon
        },
      },
    },
  },
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
  palette: {
    background: {
      default: "#efefef",
      paper: "#ffffff",
      menu: "#2b3240",
    },
  },
};
