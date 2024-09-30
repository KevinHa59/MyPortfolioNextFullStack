import { Clear } from "@mui/icons-material";
import {
  Button,
  Dialog,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

export default function ButtonDialog({
  isIconButton = false,
  button_label = "Button",
  className,
  isStartIcon = true,
  isEndIcon = false,
  fullWidth = false,
  sx_button,
  sx_dialog,
  paperProps,
  icon,
  children,
  title,
  size = "large",
  color,
  variant,
  open,
  onClick,
  onClose,
  isCloseOnClickOut = true,
  disabled = false,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (value) => {
    setIsOpen(value);
  };

  return (
    <Stack width={fullWidth ? "100%" : "max-content"}>
      {isIconButton ? (
        <IconButton
          disabled={disabled}
          sx={sx_button}
          size={size}
          color={color}
          variant={variant}
          onClick={(event) =>
            !isCloseOnClickOut ? onClick(event) : handleOpen(true)
          }
        >
          {icon}
        </IconButton>
      ) : (
        <Button
          className={className}
          disabled={disabled}
          startIcon={isStartIcon && icon}
          endIcon={isEndIcon && icon}
          sx={sx_button}
          size={size}
          color={color}
          variant={variant}
          onClick={(event) => {
            if (!isCloseOnClickOut) {
              onClick(event);
            } else if (open === undefined) {
              onClick && onClick(event);
              handleOpen(true);
            } else {
              handleOpen(true);
            }
          }}
        >
          {button_label}
        </Button>
      )}
      <Dialog
        sx={sx_dialog}
        PaperProps={{ ...paperProps }}
        open={!isCloseOnClickOut ? open : isOpen}
        onClose={() => {
          if (isCloseOnClickOut) {
            onClose && onClose();
            handleOpen(false);
          } else {
            return null;
          }
        }}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          paddingX={1}
        >
          <Typography variant="body2" fontWeight={"bold"}>
            {title}
          </Typography>
          {open !== undefined && onClose && (
            <IconButton size="small" color="error" onClick={onClose}>
              <Clear />
            </IconButton>
          )}
        </Stack>
        {onClose && <Divider />}

        {children}
      </Dialog>
    </Stack>
  );
}

// use
//1. Button Dialog with Close button to close dialog
{
  /*  
const [open, setOpen] = useState(false)
<ButtonDialog
      open={open}
      onClick={() => setOpen(true)}
      button_label="Re-Bake"
      isCloseOnClickOut={false}
    >
      // dialog content here

      // close button
      <Button onClick={() => { setOpen((prev) => !prev);}}>
        Close
      </Button>
</ButtonDialog> 
*/
}

// 2. Button Dialog without Close button, but click outside to close dialog
{
  /*  
<ButtonDialog
      button_label="Re-Bake"
      isCloseOnClickOut={false}
    >
      // dialog content here
</ButtonDialog> 
*/
}
