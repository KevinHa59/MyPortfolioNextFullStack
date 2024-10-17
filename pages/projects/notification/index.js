import {
  Button,
  Checkbox,
  Divider,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { notificationElement } from "../../../components/packages/t-note/note-item";
import { themeColors } from "../../../components/packages/t-note/styles/theme";
import { dark } from "../../../components/packages/t-note/styles/dark";
import { light } from "../../../components/packages/t-note/styles/light";
import { useEffect } from "react";
import { stackPlacementStyles } from "../../../components/packages/t-note/styles/note";
import ProjectWrapper from "../../../components/projects/wrapper";
import { stringUtil } from "../../../utils/stringUtil";
import LabelText from "../../../components/widgets/texts/label-text";
import { Navigation } from "@mui/icons-material";
import CodeSnippet from "../../../components/widgets/code-render/code-snippet";
import { HowToUse, Sample } from "../../../components/projects/sections";

/**
 * Description placeholder
 *
 * @export
 * @returns {*}
 */
export default function Index() {
  const [config, setConfig] = useState({
    mode: "dark",
    color: "primary",
    placement: "top-right",
    enableOutlined: false,
    enableCloseButton: true,
    lineCount: 3,
    padding: "10px",
    timeout: 3000,
    animationSpeed: 200,
    customStyles: {
      _colors: {
        primary: "#febfca",
      },
    },
  });
  const isDark = config.mode === "dark";
  const style = isDark ? dark : light;

  useEffect(() => {
    const sampleContainer = document.getElementById("sampleNote");
    if (sampleContainer) {
      sampleContainer.innerHTML = "";
      sampleContainer.appendChild(
        notificationElement({
          title: config.color,
          message: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate ipsam doloremque nam, vero tempora officia nesciunt accusantium optio a laborum minima blanditiis voluptas. A et officia eveniet molestiae expedita atque?`,
          config: {
            ...config,
            timeout: 0,
          },
        })
      );
    }
  }, [config]);

  const handleFire = () => {
    notificationElement({
      title: (
        <Typography variant="h5" sx={{ color: `${config.color}.main` }}>
          {stringUtil.randomString(10)}
        </Typography>
      ),
      message: `Lorem ipsum dolor sit amet consectetur adipisicing elit.`,
      config: config,
      events: (onClose) => {
        return {
          Confirm: () => {
            alert("Yo Confirm");
            onClose();
          },
        };
      },
    });
  };

  const handleConfigChange = (newValue) => {
    setConfig((prev) => {
      return {
        ...prev,
        ...newValue,
      };
    });
  };

  const codeString = `
    // The config object contains various configuration options for the notification, 
    // such as the color mode, color theme, placement position, 
    // whether to show an outline or close button,
    // number of lines to show before truncating, 
    // padding, timeout before auto-closing, animation speed, and custom styles.
    const config = {
      mode: "dark", // The color mode of the notification. Can be 'dark' or 'light'.
      color: "primary", // The color theme of the notification. Can be 'primary', 'secondary', 'success', 'error', 'warning', or 'info'.
      placement: "bottom-right", // The position of the notification on the screen. Can be 'center', 'top-left', 'top', 'top-right'...
      enableOutlined: false, // Whether to show an outline around the notification.
      enableCloseButton: true, // Whether to show a close button on the notification.
      lineCount: 3, // Number of lines to show in the notification before truncating with '...'.
      padding: "10px", // The gap between the notification and the edge of the screen.
      timeout: 3000, // The time in milliseconds before the notification automatically closes. Set to null for no auto-close.
      animationSpeed: 200, // The speed of the animation in milliseconds.
      customStyles: { // Custom styles for the notification.
        _colors: { // Custom colors for the notification themes.
          primary: "#febfca", // Custom color for the primary theme.
        },
      },
    };

    // The events object is a function that returns an object of event handlers for the notification. 
    // It receives the onClose function as a parameter to use for closing the notification.
    const events = (onClose) => {
        return {
          Confirm: () => {
            alert("Yo Confirm");
            onClose();
          },
        };
      },

    // This code creates a new notification element by calling the notificationElement function 
    // and passing in an object with the title, message, config, and events properties.
    notificationElement({
      title: "Title",
      message: "Message",
      config: config,
      events: events
    });`;

  return (
    <ProjectWrapper>
      <Sample>
        <Stack
          id={"sampleNote"}
          minHeight={"250px"}
          alignItems={"center"}
        ></Stack>
        <Stack alignItems={"center"} width="100%">
          <Stack gap={3}>
            <Stack>
              <LabelText
                label={"Mode"}
                sx={{ flexDirection: "row", alignItems: "center" }}
                sx_label={{ width: "150px" }}
              >
                <Grid container>
                  {["dark", "light"].map((mode, index) => {
                    return (
                      <Grid item xs={6} key={index}>
                        <Button
                          fullWidth
                          size="small"
                          variant={config.mode === mode ? "contained" : "text"}
                          onClick={() => handleConfigChange({ mode: mode })}
                        >
                          {mode}
                        </Button>
                      </Grid>
                    );
                  })}
                </Grid>
              </LabelText>
            </Stack>

            <Stack direction={"row"}>
              <LabelText
                label={"Color"}
                sx={{ flexDirection: "row", alignItems: "center" }}
                sx_label={{ width: "150px" }}
              >
                <Stack direction={"row"}>
                  {Object.keys(themeColors).map((color, index) => {
                    return (
                      <Button
                        key={index}
                        fullWidth
                        size="small"
                        onClick={() => handleConfigChange({ color: color })}
                        sx={{
                          borderColor: style[color],
                          color: style[color],
                          background:
                            config.color === color && `${style[color]}33`,
                        }}
                      >
                        {color}
                      </Button>
                    );
                  })}
                </Stack>
              </LabelText>
            </Stack>
            <Stack>
              <LabelText
                label={"Placement"}
                sx={{ flexDirection: "row", alignItems: "flex-start" }}
                sx_label={{ width: "150px" }}
              >
                <Paper
                  variant="outlined"
                  sx={{ background: "transparent", position: "relative" }}
                >
                  <PlacementArrow placement={config.placement} />
                  <Grid container width={"400px"}>
                    {Object.keys(stackPlacementStyles).map(
                      (placement, index) => {
                        return (
                          <Grid item xs={4} key={index}>
                            <Button
                              className="br0"
                              fullWidth
                              size="small"
                              onClick={() =>
                                handleConfigChange({ placement: placement })
                              }
                            >
                              {placement}
                            </Button>
                          </Grid>
                        );
                      }
                    )}
                  </Grid>
                </Paper>
              </LabelText>
            </Stack>
            <Stack gap={3}>
              <LabelText
                label={"Enable Close Button"}
                sx={{ flexDirection: "row", alignItems: "center" }}
                sx_label={{ width: "150px" }}
              >
                <Checkbox
                  checked={config.enableCloseButton}
                  onChange={(e) =>
                    handleConfigChange({
                      enableCloseButton: e.target.checked,
                    })
                  }
                />
              </LabelText>
              <LabelText
                label={"Enable Outlined"}
                sx={{ flexDirection: "row", alignItems: "center" }}
                sx_label={{ width: "150px" }}
              >
                <Checkbox
                  checked={config.enableOutlined}
                  onChange={(e) =>
                    handleConfigChange({ enableOutlined: e.target.checked })
                  }
                />
              </LabelText>
            </Stack>
            <Stack gap={3}>
              <LabelText
                label={"Line Count"}
                sx={{ flexDirection: "row", alignItems: "flex-start" }}
                sx_label={{ width: "150px" }}
              >
                <Stack>
                  <TextField
                    size="small"
                    type="number"
                    value={parseInt(config.lineCount)}
                    onChange={(e) =>
                      handleConfigChange({
                        lineCount: parseInt(e.target.value),
                      })
                    }
                  />
                  <Typography
                    variant="body2"
                    fontStyle={"italic"}
                    sx={{ opacity: 0.7, whiteSpace: "pre-wrap" }}
                  >
                    {`* limit number of lines\n* only take effect if message is string`}
                  </Typography>
                </Stack>
              </LabelText>
              <LabelText
                label={"Padding"}
                sx={{ flexDirection: "row", alignItems: "flex-start" }}
                sx_label={{ width: "150px" }}
              >
                <Stack>
                  <TextField
                    size="small"
                    value={config.padding}
                    onChange={(e) =>
                      handleConfigChange({
                        padding: e.target.value,
                      })
                    }
                  />
                  <Typography
                    variant="body2"
                    fontStyle={"italic"}
                    sx={{ opacity: 0.7, whiteSpace: "pre-wrap" }}
                  >
                    {`* Space between notification to the edge`}
                  </Typography>
                </Stack>
              </LabelText>
              <LabelText
                label={"Timeout"}
                sx={{ flexDirection: "row", alignItems: "flex-start" }}
                sx_label={{ width: "150px" }}
              >
                <Stack>
                  <TextField
                    size="small"
                    type="number"
                    value={parseInt(config.timeout)}
                    onChange={(e) =>
                      handleConfigChange({
                        timeout: parseInt(e.target.value),
                      })
                    }
                    InputProps={{ endAdornment: "ms" }}
                  />
                  <Typography
                    variant="body2"
                    fontStyle={"italic"}
                    sx={{ opacity: 0.7, whiteSpace: "pre-wrap" }}
                  >
                    {`* Duration of appearance\n* Set value 0 to stay`}
                  </Typography>
                </Stack>
              </LabelText>
              <LabelText
                label={"Animation Speed"}
                sx={{ flexDirection: "row", alignItems: "center" }}
                sx_label={{ width: "150px" }}
              >
                <TextField
                  size="small"
                  type="number"
                  value={parseInt(config.animationSpeed)}
                  onChange={(e) =>
                    handleConfigChange({
                      animationSpeed: parseInt(e.target.value),
                    })
                  }
                  InputProps={{ endAdornment: "ms" }}
                />
              </LabelText>
            </Stack>
            <Stack>
              <Divider />
              <Button onClick={handleFire}>Fire</Button>
            </Stack>
          </Stack>
        </Stack>
      </Sample>
      <Divider />
      <HowToUse>
        <Typography textAlign={"left"} sx={{ width: "100%" }} variant="h6">
          Basic.
        </Typography>
        <CodeSnippet>{codeString}</CodeSnippet>
      </HowToUse>
    </ProjectWrapper>
  );
}

const styles = {
  "top-left": {
    position: {
      top: 0,
      left: 0,
    },
    rotation: "-45deg",
  },
  top: {
    position: {
      top: 0,
      left: "50%",
      transform: "translateX(-50%)",
    },
  },
  "top-right": {
    position: {
      top: 0,
      left: "100%",
      transform: "translateX(-100%)",
    },
    rotation: "45deg",
  },
  right: {
    position: {
      top: "50%",
      left: "100%",
      transform: "translate(-100%, -50%)",
    },
    rotation: "90deg",
  },
  "bottom-right": {
    position: {
      top: "100%",
      left: "100%",
      transform: "translate(-100%, -100%)",
    },
    rotation: "135deg",
  },
  bottom: {
    position: {
      top: "100%",
      left: "50%",
      transform: "translate(-50%, -100%)",
    },
    rotation: "180deg",
  },
  "bottom-left": {
    position: {
      top: "100%",
      left: 0,
      transform: "translate(0%, -100%)",
    },
    rotation: "225deg",
  },
  left: {
    position: {
      top: "50%",
      left: 0,
      transform: "translateY(-50%)",
    },
    rotation: "270deg",
  },
  center: {
    position: {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      opacity: 0,
    },
  },
};
function PlacementArrow({ placement }) {
  const { position = {}, rotation = {} } = styles[placement];
  return (
    <Stack
      position={"absolute"}
      sx={{ ...position, transition: "ease 0.3s", zIndex: 5 }}
    >
      <Navigation
        color="info"
        sx={{ transform: `rotate(${rotation})`, transition: "ease 0.3s" }}
      />
    </Stack>
  );
}
