import { useContext, useEffect, useState } from "react";
import { theme } from "./styles/theme";
import { dark } from "./styles/dark";
import { light } from "./styles/light";
import ClearIcon from "./icons/clear";
import { TNoteContext } from "./t-note-provider";

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
