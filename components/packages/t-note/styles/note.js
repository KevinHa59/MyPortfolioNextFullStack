/**
 * Description placeholder
 *
 * @param {number} [padding=0]
 * @returns {{ "top-left": { top: number; left: number; }; top: { top: number; left: string; transform: string; }; "top-right": { top: number; right: number; }; left: { top: string; left: number; transform: string; }; ... 4 more ...; "bottom-right": { ...; }; }}
 */
export const stackPlacementStyles = {
  "top-left": { top: 0, left: 0 },
  top: { top: 0, left: "50%", transform: "translateX(-50%)" },
  "top-right": { top: 0, right: 0 },
  left: { top: "50%", left: 0, transform: "translateY(-50%)" },
  center: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
  right: { top: "50%", right: 0, transform: "translateY(-50%)" },
  "bottom-left": {
    bottom: 0,
    left: 0,
    transformOrigin: "bottom-left",
    flexDirection: "column-reverse",
  },
  bottom: {
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    flexDirection: "column-reverse",
  },
  "bottom-right": {
    bottom: 0,
    right: 0,
    transformOrigin: "bottom-right",
    flexDirection: "column-reverse",
  },
};

export const styles = (config, isDark, themeColor) => {
  return {
    notification: {
      width: "max-content",
      minWidth: "300px",
      maxWidth: "500px",
      maxHeight: "0px",
      display: "flex",
      flexDirection: "row",
      borderRadius: "2px",
      border: `${config.enableOutlined ? 1 : 0}px solid ${themeColor}`,
      opacity: 0,
      transition: `ease ${config.animationSpeed / 1000}s`,
      background: isDark ? "rgb(40,40,40)" : "#fff",
      boxShadow: `-30px -30px 0px ${themeColor}80, 30px 30px 0px ${themeColor}4D`,
      color: isDark ? "#fff" : "#000",
      overflow: "hidden",
    },
    iconContainer: {
      overflow: "auto",
      minWidth: "50px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      background: `${themeColor}33`,
      padding: "20px 0",
      color: themeColor,
    },
    contentContainer: {
      gap: "10px",
      padding: "10px",
      display: "flex",
      flexDirection: "column",
      flex: 1,
    },
    titleContainer: {
      display: "flex",
      width: "100%",
      alignItems: "center",
      justifyContent: "space-between",
    },
    closeButton: {
      background: "transparent",
      border: "0",
      color: isDark ? "#fff" : "#000",
      textDecoration: "none",
      fontSize: "20px",
      cursor: "pointer",
    },
    messageElement: {
      height: "100%",
      display: "-webkit-box",
      "-webkit-line-clamp": config.lineCount,
      "-webkit-box-orient": "vertical",
      overflowY: "hidden",
      textOverflow: "ellipsis",
    },
    actionBarElement: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    viewDetailLink: {
      width: "max-content",
      background: "transparent",
      border: "0",
      fontWeight: "400",
      textDecoration: "none",
      color: themeColor,
      cursor: "pointer",
      borderBottom: `1px solid transparent`,
    },
    progressBarContainer: {
      width: "100%",
      height: "4px",
      background: `${themeColor}33`,
      padding: "1px",
    },
    progressBar: {
      height: "100%",
      background: `${themeColor}`,
      width: "0%",
      transition: `all ${config.timeout / 1000}s linear`,
    },
    container: {
      position: "fixed",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: "10px",
      ...stackPlacementStyles[config.placement],
      margin: config.padding,
      zIndex: 2000,
    },
  };
};
