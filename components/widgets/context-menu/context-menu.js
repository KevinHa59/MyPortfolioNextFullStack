import {
  ClickAwayListener,
  Divider,
  Fade,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { createContext, useContext, useState } from "react";

const menuContext = createContext();
export default function ContextMenu({
  title,
  minWidth,
  open = false,
  position,
  onClose,
  children,
  anchorOrigin = {
    vertical: "top",
    horizontal: "left",
  },
  transformOrigin = {
    vertical: "top",
    horizontal: "left",
  },
  onMouseLeave,
}) {
  return (
    // <Menu
    //   open={Boolean(position) || open}
    //   anchorReference="anchorPosition"
    //   anchorPosition={
    //     position ? { top: position.top, left: position.left } : undefined
    //   }
    //   anchorOrigin={anchorOrigin}
    //   transformOrigin={transformOrigin}
    //   onClose={() => onClose && onClose()}
    //   PaperProps={{
    //     style: {
    //       minWidth: minWidth,
    //     },
    //   }}
    //   sx={{ overflow: "visible" }}
    //   onMouseLeave={onMouseLeave}
    // >
    //   {title && (
    //     <>
    //       <Stack paddingX={1}>{title}</Stack>
    //       <Divider />
    //     </>
    //   )}
    //   <MenuList sx={{ overflow: "visible" }}>{children}</MenuList>
    // </Menu>
    Boolean(position) && (
      <Stack
        sx={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          zIndex: 5,
        }}
      >
        <ClickAwayListener onClickAway={() => onClose && onClose()}>
          <Fade in={Boolean(position)}>
            <Paper
              variant="outlined"
              sx={{
                minWidth: minWidth,
                position: "fixed",
                top: position?.top,
                left: position?.left,
              }}
            >
              {title && (
                <>
                  <Stack paddingX={1}>{title}</Stack>
                  <Divider />
                </>
              )}
              {children}
            </Paper>
          </Fade>
        </ClickAwayListener>
      </Stack>
    )
  );
}

export function ContextItem({ StartIcon, title, EndIcon, onClick }) {
  return (
    <MenuItem sx={{ paddingY: 0 }} onClick={(e) => onClick && onClick(e)}>
      {StartIcon && (
        <ListItemIcon>
          <StartIcon fontSize="12px" />
        </ListItemIcon>
      )}
      <ListItemText inset={!StartIcon}>
        <Typography variant="body2">{title}</Typography>
      </ListItemText>
      {EndIcon && <EndIcon sx={{ fontSize: "25px" }} />}
    </MenuItem>
  );
}

export function ContextContainer({
  StartIcon,
  title,
  EndIcon,
  onClick,
  children,
}) {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const handleMouseEnter = () => {
    setSubmenuOpen(true);
  };

  const handleMouseLeave = () => {
    setSubmenuOpen(false);
  };

  return (
    <Stack
      width={"100%"}
      sx={{ position: "relative" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <MenuItem sx={{ paddingY: 0 }} onClick={(e) => onClick && onClick(e)}>
        {StartIcon && (
          <ListItemIcon>
            <StartIcon fontSize="12px" />
          </ListItemIcon>
        )}
        <ListItemText inset={!StartIcon}>
          <Typography variant="body2">{title}</Typography>
        </ListItemText>
        {EndIcon && <EndIcon sx={{ fontSize: "25px" }} />}
      </MenuItem>
      <Fade in={submenuOpen}>
        <Paper
          variant="outlined"
          sx={{
            position: "absolute",
            left: "100%",
            minWidth: "200px",
            zIndex: 5,
          }}
        >
          {children}
        </Paper>
      </Fade>
    </Stack>
  );
}
