import {
  CheckCircle,
  Clear,
  ErrorOutline,
  PriorityHighOutlined,
  WarningAmber,
} from "@mui/icons-material";
import {
  Button,
  FormControlLabel,
  Grid,
  IconButton,
  Link,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import ReactDOM from "react-dom/client";
/**
 * Description placeholder
 *
 * @export
 * @returns {*}
 */
export default function Index() {
  const theme = useTheme();
  const [noteSettings, setNoteSettings] = useState({
    color: "primary",
    placement: "bottom-right",
    padding: 0,
    timeout: 3000,
    speed: 200,
  });

  const handleSettingChange = (newSetting) => {
    setNoteSettings((prev) => {
      return {
        ...prev,
        ...newSetting,
      };
    });
  };

  return (
    <Stack
      padding={2}
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Paper variant="outlined" sx={{ padding: 1, width: "500px" }}>
        <Stack gap={1}>
          <Paper
            variant="outlined"
            sx={{ padding: 1, background: theme.palette.background.default }}
          >
            Color
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="primary"
              name="radio-buttons-group"
              value={noteSettings.color}
              onChange={(va) => handleSettingChange({ color: va.target.value })}
            >
              <Grid container>
                {Object.keys(colors).map((color, index) => {
                  return (
                    <Grid item key={index} xs={4}>
                      <FormControlLabel
                        key={index}
                        control={<Radio color={color} />}
                        value={color}
                        label={color}
                        sx={{ color: `${color}.main` }}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </RadioGroup>
          </Paper>
          <Paper
            variant="outlined"
            sx={{ padding: 1, background: theme.palette.background.default }}
          >
            Placement
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="primary"
              name="radio-buttons-group"
              value={noteSettings.placement}
              onChange={(va) =>
                handleSettingChange({ placement: va.target.value })
              }
            >
              <Grid container>
                {Object.keys(placementStyles(0)).map((pos, index) => {
                  return (
                    <Grid item key={index} xs={4}>
                      <FormControlLabel
                        key={index}
                        control={<Radio />}
                        value={pos}
                        label={pos}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </RadioGroup>
          </Paper>
          <Paper
            variant="outlined"
            sx={{ padding: 1, background: theme.palette.background.default }}
          >
            <Stack direction="row" gap={1}>
              <TextField
                label="padding"
                value={noteSettings.padding}
                onChange={(e) =>
                  handleSettingChange({ padding: e.target.value })
                }
              />
              <TextField
                label="timeout"
                value={noteSettings.timeout}
                onChange={(e) =>
                  handleSettingChange({ timeout: e.target.value })
                }
              />
              <TextField
                label="speed"
                value={noteSettings.speed}
                onChange={(e) => handleSettingChange({ speed: e.target.value })}
              />
            </Stack>
          </Paper>
          <Button
            onClick={() =>
              setNote(
                "Title",
                "compiled client and server successfully in 648 ms (14570 modules)",
                noteSettings
              )
            }
          >
            Fire
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
}
let previousTimeoutClose = null; // Store the previous timeout reference
/**
 * Displays a notification on the screen, replacing any previous notification.
 *
 * @param {string} [title="Notification Title"] - The title of the notification.
 * @param {string} [message="Detail"] - The message body of the notification.
 * @param {Object} config - Configuration settings for the notification.
 * @param {'primary'|'secondary'|'success'|'error'|'warning'|'info'} config.color - The color theme of the notification (e.g., "primary", "secondary", etc.).
 * @param {'center'|'top-left'|'top'|'top-right'|'bottom-left'|'bottom'|'bottom-right'|'left'|'right'} config.placement - The placement of the notification on the screen (e.g., "top-left", "bottom-right").
 * @param {number} config.padding - The space (in px) between notification to the corner.
 * @param {number} [config.timeout] - The time (in milliseconds) before the notification automatically closes, or null to disable automatically closes
 * @param {number} config.speed - The speed (in milliseconds) of the notification's entrance and exit animation.
 *
 * @example
 * setNote("Welcome", "This is a test message", {
 *   color: "primary",
 *   placement: "bottom-right",
 *   padding: "20px",
 *   timeout: 3000,
 *   speed: 200
 * });
 */
export function setNote(
  title = "Notification Title",
  message = "Detail",
  config
) {
  // Find the existing notification with ID "uniqueNote"
  const previousNote = document.getElementById("uniqueNote");

  // Clear any existing timeout to prevent the previous notification from closing itself after being removed
  if (previousTimeoutClose) {
    clearTimeout(previousTimeoutClose);
    previousTimeoutClose = null; // Reset timeout reference to ensure it's not reused
  }

  // Remove the previous notification from the DOM if it exists and is still attached to the body
  if (previousNote && document.body.contains(previousNote)) {
    const previousRoot = ReactDOM.createRoot(previousNote);
    previousRoot.unmount(); // Use the root's unmount method
    document.body.removeChild(previousNote); // Remove the container from the body
  }

  // Create a new container div for the new notification and attach it to the body
  const container = document.createElement("div");
  container.setAttribute("id", "uniqueNote");
  document.body.appendChild(container);

  // Check if a valid timeout value is provided in the config
  const isTimeoutProvided = !isNaN(parseInt(config.timeout));

  // Set up a timeout to automatically close the notification after the specified time
  const timeoutClose = isTimeoutProvided
    ? setTimeout(() => {
        handleClose(); // Trigger the close action when the timeout ends
      }, config.timeout + config.speed - 50) // Timeout includes config.speed and buffer for smooth close animation
    : null;

  // Function to close and clean up the notification
  function handleClose() {
    if (container) {
      timeoutClose && clearTimeout(timeoutClose); // Clear the timeout if it still exists
      const previousRoot = ReactDOM.createRoot(container);
      previousRoot.unmount(); // Use the root's unmount method
      document.body.removeChild(container); // Remove the container from the body
    }
  }

  // Store the current timeout reference globally so it can be cleared if a new notification is created
  previousTimeoutClose = timeoutClose;

  // Render the new notification component into the container
  const root = ReactDOM.createRoot(container);
  root.render(
    <Notification
      isOutlined={true}
      color={colors[config.color]} // Notification color from config
      title={title} // Notification title
      message={message} // Notification message
      speed={config.speed} // Animation speed for the notification
      onClose={handleClose} // Function to handle closing of the notification
      timeoutOnClose={config.timeout} // Time before automatically closing the notification
      padding={config.padding} // Padding for notification
      placement={config.placement} // Placement of the notification on the screen
    />,
    container // Render into the newly created container div
  );
}

/**
 * Description Props
 *
 * @param {object} props
 * @param {boolean} props.open - Control open/close of dialog
 * @param {boolean} props.isOutlined
 * @param {'primary'|'secondary'|'success'|'error'|'warning'|'info'} props.color
 * @param {string} props.title
 * @param {string} props.message
 * @param {function} props.onClose
 * @param {number} props.timeoutOnClose - Dialog call onClose function prop after the given timeout
 * @param {number} props.speed
 * @param {'center'|'top-left'|'top'|'top-right'|'bottom-left'|'bottom'|'bottom-right'|'left'|'right'} props.placement - The position of the tooltip relative to the target element.
 * @param {number} [props.padding]
 * @returns {*}
 */
function Notification({
  isOutlined,
  color,
  title,
  message,
  onClose,
  speed,
  timeoutOnClose,
  placement = "bottom-right",
  padding = 0,
}) {
  const [active, setActive] = useState(true);
  const [shadowSize, setShadowSize] = useState(30);
  const [loadingSize, setLoadingSize] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    // wait for 50ms before active
    setTimeout(() => {
      setShadowSize(6);
      setLoadingSize(100);
    }, 10);
    // auto close if given timeoutOnClose
    timeoutOnClose &&
      setTimeout(() => {
        setActive(false);
        setShadowSize(30);
      }, timeoutOnClose);
  }, []);

  // handle click on close
  const handleClose = () => {
    setActive(false);
    setShadowSize(30);
    setTimeout(() => {
      onClose && onClose();
    }, speed);
  };

  return (
    <Paper
      variant={isOutlined ? "outlined" : "elevation"}
      sx={{
        position: "fixed",
        zIndex: 2000,
        width: "max-content",
        minWidth: "300px",
        maxWidth: "500px",
        display: "flex",
        borderRadius: "2px",
        borderColor: `${theme.palette[color.iconBackground].main}33`,
        transition: `ease ${speed / 1000}s`,
        opacity: active ? 1 : 0,
        boxShadow: `-${shadowSize}px -${shadowSize}px 0px ${
          theme.palette[color.iconBackground].main
        }80, ${shadowSize}px ${shadowSize}px 0px ${
          theme.palette[color.iconBackground].main
        }4D`,
        ...placementStyles(padding)[placement],
      }}
    >
      <Stack
        padding={2}
        sx={{
          width: "50px",
          flexShrink: 0,
          background: `${theme.palette[color.iconBackground].main}33`,
          alignItems: "center",
        }}
      >
        <color.Icon color={color.iconColor} />
      </Stack>
      <Stack flex={1} gap={2} padding={2}>
        <Stack
          width="100%"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography>{title}</Typography>
          <IconButton size="small" onClick={handleClose}>
            <Clear />
          </IconButton>
        </Stack>
        <Typography>{message}</Typography>
        <Stack direction="row">
          <Link href={"#"} fontWeight="200" sx={{ textDecoration: "none" }}>
            <Typography sx={{ color: `${color.iconColor}.main` }}>
              View Detail
            </Typography>
          </Link>
        </Stack>
        <Stack
          width="100%"
          height="2px"
          sx={{ background: `${theme.palette[color.iconBackground].main}33` }}
        >
          <Stack
            height="100%"
            sx={{
              background: `${theme.palette[color.iconBackground].main}`,
              width: `${loadingSize}%`,
              transition: `all ${timeoutOnClose / 1000}s linear`,
            }}
          />
        </Stack>
      </Stack>
    </Paper>
  );
}

/**
 * Description placeholder
 *
 * @type {{ primary: { iconBackground: string; iconColor: string; Icon: any; }; secondary: { iconBackground: string; iconColor: string; Icon: any; }; success: { iconBackground: string; iconColor: string; Icon: any; }; info: { ...; }; error: { ...; }; warning: { ...; }; }}
 */
const colors = {
  primary: {
    iconBackground: "primary",
    iconColor: "primary",
    Icon: CheckCircle,
  },
  secondary: {
    iconBackground: "secondary",
    iconColor: "secondary",
    Icon: CheckCircle,
  },
  success: {
    iconBackground: "success",
    iconColor: "success",
    Icon: CheckCircle,
  },
  info: {
    iconBackground: "info",
    iconColor: "info",
    Icon: PriorityHighOutlined,
  },
  error: {
    iconBackground: "error",
    iconColor: "error",
    Icon: ErrorOutline,
  },
  warning: {
    iconBackground: "warning",
    iconColor: "warning",
    Icon: WarningAmber,
  },
};

/**
 * Description placeholder
 *
 * @param {number} [padding=0]
 * @returns {{ "top-left": { top: number; left: number; }; top: { top: number; left: string; transform: string; }; "top-right": { top: number; right: number; }; left: { top: string; left: number; transform: string; }; ... 4 more ...; "bottom-right": { ...; }; }}
 */
const placementStyles = (padding = 0) => {
  return {
    "top-left": { top: padding, left: padding },
    top: { top: padding, left: "50%", transform: "translateX(-50%)" },
    "top-right": { top: padding, right: padding },
    left: { top: "50%", left: padding, transform: "translateY(-50%)" },
    center: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
    right: { top: "50%", right: padding, transform: "translateY(-50%)" },
    "bottom-left": { bottom: padding, left: padding },
    bottom: { bottom: padding, left: "50%", transform: "translateX(-50%)" },
    "bottom-right": { bottom: padding, right: padding },
  };
};
