import { Button, IconButton, Stack, Tooltip } from "@mui/material";
import Popover from "@mui/material/Popover";
import * as React from "react";

export default function ButtonPopover({
  label,
  sx,
  width = "100%",
  disabled = false,
  color,
  openColor = null,
  sx_popover,
  sx_button,
  sx_paper,
  variant = "text",
  size = "large",
  anchorOrigin = {
    vertical: "bottom",
    horizontal: "right",
  },
  transformOrigin = {
    vertical: "top",
    horizontal: "right",
  },
  children,
  isIconButton = true,
  startIcon = null,
  endIcon = null,
  tooltip_title = "",
  tooltip_placement = "right",
  isCloseOnClick = false,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Tooltip title={tooltip_title} placement={tooltip_placement}>
        {isIconButton ? (
          <IconButton
            disabled={disabled}
            color={open ? (openColor ? openColor : color) : color}
            sx={sx}
            aria-describedby={id}
            size={size}
            variant={variant}
            onClick={handleClick}
          >
            {label}
          </IconButton>
        ) : (
          <Button
            disabled={disabled}
            onClick={handleClick}
            size={size}
            variant={variant}
            sx={{ width: "max-content", minWidth: "30px", ...sx_button }}
            startIcon={startIcon}
            endIcon={endIcon}
          >
            {label}
          </Button>
        )}
      </Tooltip>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        PaperProps={{
          style: { boxShadow: "10px 10px 2px rgba(0,0,0,0.2)", ...sx_paper },
        }}
      >
        <Stack sx={sx_popover} onClick={() => isCloseOnClick && handleClose()}>
          {children}
        </Stack>
      </Popover>
    </>
  );
}
