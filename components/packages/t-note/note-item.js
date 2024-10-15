import { useContext, useEffect, useState } from "react";
import { theme } from "./styles/theme";
import { dark } from "./styles/dark";
import { light } from "./styles/light";
import ClearIcon from "./icons/clear";
import { TNoteContext } from "./t-note-provider";
import React from "react";
import ReactDOM from "react-dom";
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
export default function Notification({
  id,
  mode = "dark",
  color,
  title,
  message,
  speed = 1000,
  timeoutOnClose,
}) {
  const { config, deleteNote } = useContext(TNoteContext);
  const [active, setActive] = useState(false);
  const [shadowSize, setShadowSize] = useState(30);
  const [loadingSize, setLoadingSize] = useState(0);

  const isDark = mode === "dark";
  const style = isDark ? dark : light;
  const Icon = theme[color].Icon;
  const themeColor = style[color];
  useEffect(() => {
    // wait for 50ms before active
    setTimeout(() => {
      setActive(true);
      setShadowSize(6);
      setLoadingSize(100);
    }, 10);
    // auto close if given timeoutOnClose
    timeoutOnClose &&
      setTimeout(() => {
        handleDelete();
      }, timeoutOnClose);
  }, []);

  const handleDelete = () => {
    setActive(false);
    setShadowSize(30);
    setTimeout(() => {
      deleteNote(id);
    }, speed);
  };

  return (
    <div
      id={id}
      style={{
        width: "max-content",
        minWidth: "300px",
        maxWidth: "500px",
        display: "flex",
        flexDirection: "row",
        borderRadius: "2px",
        border: `${config.isOutlined ? 1 : 0}px solid ${themeColor}`,
        transition: `ease ${speed / 1000}s`,
        maxHeight: active ? "500px" : "0px",
        overflow: "hidden",
        opacity: active ? 1 : 0,
        boxShadow: `-${shadowSize}px -${shadowSize}px 0px ${themeColor}80, ${shadowSize}px ${shadowSize}px 0px ${themeColor}4D`,
        background: isDark ? "rgb(40,40,40)" : "#fff",
        color: isDark ? "#fff" : "#000",
      }}
    >
      <div
        style={{
          overflow: "auto",
          minWidth: "50px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: `${themeColor}33`,
          padding: "20px 0",
          color: themeColor,
        }}
      >
        <Icon fontSize="20px" />
      </div>
      <div
        style={{
          gap: "10px",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>{title}</span>
          <button
            style={{
              background: "transparent",
              border: 0,
              color: isDark ? "#fff" : "#000",
              textDecoration: "none",
              fontSize: "20px",
              cursor: "pointer",
            }}
            onClick={() => handleDelete()}
          >
            <ClearIcon />
          </button>
        </div>
        <span>{message}</span>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <a
            href="#"
            style={{
              fontWeight: 400,
              textDecoration: "none",
              color: themeColor,
            }}
          >
            View Detail
          </a>
        </div>
        <div
          style={{
            width: "100%",
            height: "4px",
            background: `${themeColor}33`,
            padding: "1px",
          }}
        >
          <div
            style={{
              height: "100%",
              background: `${themeColor}`,
              width: `${loadingSize}%`,
              transition: `all ${timeoutOnClose / 1000}s linear`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

const defaultConfig = {
  mode: "dark",
  color: "info",
  timeout: 4000,
  placement: "bottom-right",
  animationSpeed: 300,
  enableOutlined: false,
  padding: "20px",
};
/**
 * Creates and displays a notification element on the page.
 * @param {Object} params - The parameters for creating the notification.
 * @param {string} params.title - The title of the notification.
 * @param {string} params.message - The message body of the notification.
 * @param {Object} [params.config] - Configuration options for the notification.
 * @param {('dark'|'light')} [params.config.mode='dark'] - The color mode of the notification.
 * @param {('primary'|'secondary'|'success'|'error'|'warning'|'info')} [params.config.color='info'] - The color theme of the notification.
 * @param {number|null} [params.config.timeout=4000] - The time in milliseconds before the notification automatically closes. Set to null for no auto-close.
 * @param {('center'|'top-left'|'top'|'top-right'|'bottom-left'|'bottom'|'bottom-right'|'left'|'right')} [params.config.placement='bottom-right'] - The position of the notification on the screen.
 * @param {number} [params.config.animationSpeed=300] - The speed of the animation in milliseconds.
 * @param {boolean} [params.config.enableOutlined=false] - Whether to show an outline around the notification.
 * @param {string} [params.config.padding='20px'] - The gap between notification to the edge.
 * @returns {HTMLElement} The created notification DOM element.
 */
export function notificationElement({
  title,
  message,
  config = defaultConfig,
}) {
  // Create the main notification element
  const notification = document.createElement("div");
  notification.setAttribute("id", "tNoteDetail");
  const {
    mode,
    color,
    timeout,
    placement,
    animationSpeed,
    enableOutlined,
    padding,
  } = {
    ...defaultConfig,
    ...config,
  };
  const isDark = mode === "dark";
  const style = isDark ? dark : light;
  const Icon = theme[color].Icon;
  const themeColor = style[color];

  const handleClose = () => {
    // Wait for the transition to finish before removing the notification
    setTimeout(() => {
      notification.remove(); // Remove notification after fade out

      // Check if the container has any child elements left
      const container = document.getElementById("uniqueNote"); // Get the container by ID
      if (container && container.childNodes.length === 0) {
        container.remove(); // Remove the container if empty
      }
    }, animationSpeed); // Timeout should match the transition duration
  };

  // Set up the automatic timeout for closing the notification
  if (timeout) {
    setTimeout(() => {
      // Start the exit animation
      notification.style.maxHeight = "0px"; // Start fade out
      notification.style.opacity = "0"; // Start fade out
      notification.style.boxShadow = `-30px -30px 0px ${themeColor}80, 30px 30px 0px ${themeColor}4D`;
      handleClose();
    }, timeout);
  }

  // Set styles using Object.assign
  Object.assign(notification.style, {
    width: "max-content",
    minWidth: "300px",
    maxWidth: "500px",
    maxHeight: "0px",
    display: "flex",
    flexDirection: "row",
    borderRadius: "2px",
    border: `${enableOutlined ? 1 : 0}px solid ${themeColor}`,
    opacity: 0,
    transition: `ease ${animationSpeed / 1000}s`,
    background: isDark ? "rgb(40,40,40)" : "#fff",
    boxShadow: `-30px -30px 0px ${themeColor}80, 30px 30px 0px ${themeColor}4D`,
    color: isDark ? "#fff" : "#000",
    overflow: "hidden",
  });

  // Create content elements
  const iconContainer = document.createElement("div");
  Object.assign(iconContainer.style, {
    overflow: "auto",
    minWidth: "50px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: `${themeColor}33`,
    padding: "20px 0",
    color: themeColor,
  });

  const iconContainerRoot = ReactDOM.createRoot(iconContainer);
  iconContainerRoot.render(<Icon />);

  const contentContainer = document.createElement("div");
  Object.assign(contentContainer.style, {
    gap: "10px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    flex: 1, // Allow contentContainer to fill remaining space
  });

  const titleContainer = document.createElement("div");
  Object.assign(titleContainer.style, {
    display: "flex",
    width: "100%", // Ensures it takes full width of contentContainer
    alignItems: "center",
    justifyContent: "space-between",
  });

  const titleElement = document.createElement("span");
  titleElement.innerText = title;
  titleContainer.appendChild(titleElement);

  const closeButton = document.createElement("button");
  Object.assign(closeButton.style, {
    background: "transparent",
    border: "0",
    color: isDark ? "#fff" : "#000",
    textDecoration: "none",
    fontSize: "20px",
    cursor: "pointer",
  });
  closeButton.innerHTML = "✖"; // Placeholder for the close icon
  // Event listener for close button
  closeButton.onclick = () => {
    // Start the exit animation
    notification.style.maxHeight = "0px"; // Start fade out
    notification.style.opacity = "0"; // Start fade out
    notification.style.boxShadow = `-30px -30px 0px ${themeColor}80, 30px 30px 0px ${themeColor}4D`;
    handleClose();
  };
  titleContainer.appendChild(closeButton);

  contentContainer.appendChild(titleContainer);

  const messageElement = document.createElement("span");
  messageElement.innerText = message;
  contentContainer.appendChild(messageElement);

  const viewDetailLink = document.createElement("a");
  viewDetailLink.href = "#";
  Object.assign(viewDetailLink.style, {
    width: "max-content",
    fontWeight: "400",
    textDecoration: "none",
    color: themeColor,
  });
  viewDetailLink.innerText = "View Detail";
  contentContainer.appendChild(viewDetailLink);

  const progressBarContainer = document.createElement("div");
  Object.assign(progressBarContainer.style, {
    width: "100%",
    height: "4px",
    background: `${themeColor}33`,
    padding: "1px",
  });

  const progressBar = document.createElement("div");
  Object.assign(progressBar.style, {
    height: "100%",
    background: `${themeColor}`,
    width: `0%`,
    transition: `all ${timeout / 1000}s linear`,
  });

  progressBarContainer.appendChild(progressBar);

  contentContainer.appendChild(progressBarContainer);

  notification.appendChild(iconContainer);
  notification.appendChild(contentContainer);

  let container = document.getElementById(`uniqueNote-${placement}`);
  if (!container) {
    container = document.createElement("div");
    container.setAttribute("id", `uniqueNote-${placement}`);
    Object.assign(container.style, {
      position: "fixed",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: "10px",
      ...stackPlacementStyles(0)[placement],
      margin: padding,
    });
    document.body.appendChild(container);
  }

  container.appendChild(notification);
  requestAnimationFrame(() => {
    notification.style.maxHeight = "500px";
    notification.style.opacity = 1;
    notification.style.boxShadow = `-6px -6px 0px ${themeColor}80, 6px 6px 0px ${themeColor}4D`;
    if (timeout) {
      progressBar.style.width = "100%";
    }
  });

  return notification; // Return the DOM node
}

/**
 * Description placeholder
 *
 * @param {number} [padding=0]
 * @returns {{ "top-left": { top: number; left: number; }; top: { top: number; left: string; transform: string; }; "top-right": { top: number; right: number; }; left: { top: string; left: number; transform: string; }; ... 4 more ...; "bottom-right": { ...; }; }}
 */
export const stackPlacementStyles = (padding = 0) => {
  return {
    "top-left": { top: padding, left: padding },
    top: { top: padding, left: "50%", transform: "translateX(-50%)" },
    "top-right": { top: padding, right: padding },
    left: { top: "50%", left: padding, transform: "translateY(-50%)" },
    center: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
    right: { top: "50%", right: padding, transform: "translateY(-50%)" },
    "bottom-left": {
      bottom: padding,
      left: padding,
      transformOrigin: "bottom-left",
      flexDirection: "column-reverse",
    },
    bottom: {
      bottom: padding,
      left: "50%",
      transform: "translateX(-50%)",
      flexDirection: "column-reverse",
    },
    "bottom-right": {
      bottom: padding,
      right: padding,
      transformOrigin: "bottom-right",
      flexDirection: "column-reverse",
    },
  };
};
