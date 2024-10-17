import { theme, themeColors } from "./styles/theme";
import { dark } from "./styles/dark";
import { light } from "./styles/light";
import React from "react";
import ReactDOM from "react-dom";
import { styles as noteStyles } from "./styles/note";

const defaultConfig = {
  mode: "dark",
  color: "primary",
  placement: "bottom-right",
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
};
/**
 * Creates and displays a notification element on the page.
 * @param {Object} params - The parameters for creating the notification.
 * @param {string} params.title - The title of the notification.
 * @param {string} params.message - The message body of the notification.
 * @param {Object} [params.config] - Optional configuration options for the notification. If not provided, default or global config will be used..
 * @param {('dark'|'light')} [params.config.mode='dark'] - The color mode of the notification.
 * @param {('primary'|'secondary'|'success'|'error'|'warning'|'info')} [params.config.color='primary'] - The color theme of the notification.
 * @param {number|null} [params.config.timeout=3000] - The time in milliseconds before the notification automatically closes. Set to null for no auto-close.
 * @param {('center'|'top-left'|'top'|'top-right'|'bottom-left'|'bottom'|'bottom-right'|'left'|'right')} [params.config.placement='top-right'] - The position of the notification on the screen.
 * @param {number} [params.config.animationSpeed=200] - The speed of the animation in milliseconds.
 * @param {boolean} [params.config.enableOutlined=false] - Whether to show an outline around the notification.
 * @param {boolean} [params.config.enableCloseButton=true] - Whether to show a close button on the notification.
 * @param {string} [params.config.padding='10px'] - The gap between notification to the edge.
 * @param {number} [params.config.lineCount=3] - Number of lines will be shown in the notification before ...
 * @param {Object} [params.config.customStyles] - Custom styles for the notification.
 * @param {Object} [params.config.customStyles._colors] - Custom colors for the notification themes.
 * @param {string} [params.config.customStyles._colors.primary='#febfca'] - Custom color for the primary theme.
 * @param {Function} [params.events] - A function that returns an object of event handlers. It receives the onClose function as a parameter to use for closing the notification.
 * @param {Function} params.events.eventName - Each key in the returned object represents an event name, and its value is the corresponding event handler function.
 * @example
 * events: (onClose) => ({
 *   Confirm: () => {
 *     alert("Yo Confirm");
 *     onClose();
 *   },
 * })
 * @returns {HTMLElement} The created notification DOM element.
 */
export function notificationElement({
  title,
  message,
  config = defaultConfig,
  events,
}) {
  const {
    mode,
    color,
    timeout,
    placement,
    animationSpeed,
    enableOutlined,
    enableCloseButton,
    padding,
    lineCount,
    customStyles,
  } = {
    ...defaultConfig,
    ...config,
  };

  const { _colors = {} } = customStyles || {};
  const isDark = mode === "dark";
  const style = isDark ? dark : light;
  const Icon = themeColors[color].Icon;
  const themeColor = _colors[color] ? _colors[color] : style[color];

  const styles = noteStyles(
    {
      ...defaultConfig,
      ...config,
    },
    isDark,
    themeColor
  );

  const handleClose = () => {
    notification.style.maxHeight = "0px";
    notification.style.opacity = "0";
    notification.style.boxShadow = `-30px -30px 0px ${themeColor}80, 30px 30px 0px ${themeColor}4D`;
    setTimeout(() => {
      notification.remove();
      const container = document.getElementById("uniqueNote");
      if (container && container.childNodes.length === 0) {
        container.remove();
      }
    }, animationSpeed);
  };

  // Create the main notification element
  const notification = document.createElement("div");
  notification.setAttribute("id", "tNoteDetail");
  Object.assign(notification.style, styles.notification);

  // Set up auto-close functionality if timeout is provided
  if (timeout) {
    setTimeout(() => {
      handleClose();
    }, timeout);
  }

  // Create and style the icon container
  const iconContainer = document.createElement("div");
  Object.assign(iconContainer.style, styles.iconContainer);
  const iconContainerRoot = ReactDOM.createRoot(iconContainer);
  iconContainerRoot.render(<Icon />);

  // Create and style the content container
  const contentContainer = document.createElement("div");
  Object.assign(contentContainer.style, styles.contentContainer);

  // Create and style the title container
  const titleContainer = document.createElement("div");
  Object.assign(titleContainer.style, styles.titleContainer);

  // Create and add the title element
  const titleElement = document.createElement("div");
  const titleRoot = ReactDOM.createRoot(titleElement);
  titleRoot.render(title);
  titleContainer.appendChild(titleElement);

  // Create and style the close button
  const closeButton = document.createElement("button");
  Object.assign(closeButton.style, styles.closeButton);
  closeButton.innerHTML = "✖";
  closeButton.onclick = () => {
    handleClose();
  };
  enableCloseButton && titleContainer.appendChild(closeButton);

  contentContainer.appendChild(titleContainer);

  // Create and style the message element
  const messageElement = document.createElement("div");
  Object.assign(messageElement.style, styles.messageElement);
  const messageRoot = ReactDOM.createRoot(messageElement);
  messageRoot.render(message);
  contentContainer.appendChild(messageElement);

  // Create and style the "action bar"
  const actionBarElement = document.createElement("div");
  Object.assign(actionBarElement.style, styles.actionBarElement);

  // Create and style the "View Detail" link
  const viewDetailLink = document.createElement("button");
  Object.assign(viewDetailLink.style, styles.viewDetailLink);
  viewDetailLink.innerText = "View Detail";
  viewDetailLink.onmouseenter = () => {
    viewDetailLink.style.borderBottomColor = themeColor;
  };
  viewDetailLink.onmouseleave = () => {
    viewDetailLink.style.borderBottomColor = `transparent`;
  };
  viewDetailLink.onclick = () => {
    if (viewDetailLink.innerText === "View Detail") {
      messageElement.style.overflowY = "auto";
      messageElement.style["-webkit-line-clamp"] = "";
      viewDetailLink.innerText = "View Less";
    } else {
      messageElement.style.overflowY = "hidden";
      messageElement.style["-webkit-line-clamp"] = lineCount;
      viewDetailLink.innerText = "View Detail";
    }
  };
  actionBarElement.appendChild(viewDetailLink);
  // if there is/are events, add event buttons
  if (events) {
    Object.entries(events(handleClose))?.forEach(([eventName, func]) => {
      const eventLink = document.createElement("button");
      Object.assign(eventLink.style, styles.viewDetailLink);
      eventLink.innerText = eventName;
      eventLink.onmouseenter = () => {
        eventLink.style.borderBottomColor = themeColor;
      };
      eventLink.onmouseleave = () => {
        eventLink.style.borderBottomColor = `transparent`;
      };
      eventLink.onclick = func;
      actionBarElement.appendChild(eventLink);
    });
  }
  contentContainer.appendChild(actionBarElement);

  // Create and style the progress bar container
  const progressBarContainer = document.createElement("div");
  Object.assign(progressBarContainer.style, styles.progressBarContainer);

  // Create and style the progress bar
  const progressBar = document.createElement("div");
  Object.assign(progressBar.style, styles.progressBar);

  progressBarContainer.appendChild(progressBar);
  contentContainer.appendChild(progressBarContainer);

  // Assemble the notification
  notification.appendChild(iconContainer);
  notification.appendChild(contentContainer);

  // Create or get the container for notifications
  let container = document.getElementById(`uniqueNote-${placement}`);
  if (!container) {
    container = document.createElement("div");
    container.setAttribute("id", `uniqueNote-${placement}`);
    document.body.appendChild(container);
  }
  Object.assign(container.style, styles.container);
  // Add the notification to the container
  container.appendChild(notification);

  // Animate the notification appearance
  requestAnimationFrame(() => {
    notification.style.maxHeight = "500px";
    notification.style.opacity = 1;
    notification.style.boxShadow = `-6px -6px 0px ${themeColor}80, 6px 6px 0px ${themeColor}4D`;
    if (timeout) {
      progressBar.style.width = "100%";
    }
  });

  return notification;
}
