import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ButtonLoading from "./button-loading";

export default function ButtonDialogConfirm({
  children,
  size,
  color,
  startIcon,
  variant,
  sx,
  dialog_title,
  dialog_message,
  onConfirm,
  isLoading,
  isConfirmRequired = true,
  button_agree_label = "Agree",
  button_disagree_label = "Disagree",
  dialog_variant,
  dialog_color = null,
  disabled = false,
  disabledButtonConfirm = false,
  onClick,
}) {
  const [open, setOpen] = useState(false);
  const handleConfirm = () => {
    onConfirm && onConfirm(setOpen);
  };
  return (
    <Stack
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <ButtonLoading
        disabled={disabled}
        size={size}
        color={color}
        variant={variant}
        startIcon={startIcon}
        sx={{ ...sx }}
        isLoading={isLoading}
        onClick={() => {
          if (isConfirmRequired) {
            setOpen((old) => !old);
            onClick && onClick();
          } else {
            handleConfirm();
          }
        }}
      >
        {children}
      </ButtonLoading>
      <AlertDialog
        title={dialog_title}
        message={dialog_message}
        loading={isLoading}
        open={open}
        onConfirm={() => handleConfirm()}
        disabledButtonConfirm={disabledButtonConfirm}
        onClose={() => setOpen(false)}
        dialog_variant={dialog_variant}
        dialog_color={dialog_color}
        button_agree_label={button_agree_label}
        button_disagree_label={button_disagree_label}
      />
    </Stack>
  );
}
export function AlertDialog({
  title,
  message,
  loading,
  open,
  onClose,
  onConfirm,
  disabledButtonConfirm,
  dialog_variant,
  dialog_color,
  button_agree_label,
  button_disagree_label,
}) {
  const handleClose = () => {
    onClose && onClose();
  };
  const handleConfirm = () => {
    onConfirm && onConfirm();
  };

  const dialog_style = (color) => {
    const _color = color ? color : "default";
    switch (_color) {
      case "error":
        return {
          shadowColor: "rgba(230, 57, 70, 0.2)",
          buttonShadowColor: "rgba(230, 57, 70, 0.7)",
        };
      case "warning":
        return {
          shadowColor: "rgba(253, 175, 32, 0.2)",
          buttonShadowColor: "rgba(253, 175, 32, 0.7)",
        };
      default:
        return {
          shadowColor: "rgba(117, 130, 235, 0.2)",
          buttonShadowColor: "rgba(117, 130, 235, 0.7)",
        };
    }
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        variant: dialog_variant,
        style: {
          minWidth: "300px",
          borderColor: dialog_style(dialog_color).shadowColor,
        },
      }}
    >
      {loading ? (
        <Stack alignItems={"center"} sx={{ p: 2 }}>
          <CircularProgress />
        </Stack>
      ) : (
        <Stack padding={2} gap={3}>
          <Stack alignItems={"center"} gap={1}>
            <Stack
              alignItems={"center"}
              justifyContent="center"
              sx={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                padding: 1,
                background: dialog_style(dialog_color).shadowColor,
              }}
            >
              {dialog_color ? (
                <WarningAmberIcon
                  color={dialog_color ? dialog_color : "primary"}
                />
              ) : (
                <PriorityHighIcon color="primary" />
              )}
            </Stack>
            <Typography fontWeight={"bold"}>{title}</Typography>
          </Stack>
          <Stack
            id="alert-dialog-description"
            width={"100%"}
            alignItems={"center"}
            sx={{ fontSize: "15px", opacity: "0.7" }}
          >
            {loading ? <CircularProgress /> : message}
          </Stack>
          <DialogActions>
            <Stack
              paddingX={2}
              justifyContent={"center"}
              width={"100%"}
              gap={1}
            >
              <Button
                disabled={disabledButtonConfirm}
                variant={"contained"}
                color={dialog_color ? dialog_color : "primary"}
                onClick={handleConfirm}
                size="small"
                sx={{
                  borderRadius: "3px",
                  boxShadow: `0px 2px 7px ${
                    dialog_style(dialog_color).buttonShadowColor
                  }`,
                }}
                autoFocus
              >
                {button_agree_label}
              </Button>
              <Button
                variant={"text"}
                onClick={handleClose}
                size="small"
                sx={{ borderRadius: "3px" }}
              >
                {button_disagree_label}
              </Button>
            </Stack>
          </DialogActions>
        </Stack>
      )}
    </Dialog>
  );
}

// usage
// size: small | medium | large
// dialog_color: default | warning | error
// setOpen: a useState hook in ButtonDialogConfirm component to close dialog when confirm done

{
  /* 
const handleConfirm (setOpen) => {
  // handle logic
  // if success
  setOpen(false)
}
<ButtonDialogConfirm
  disabled={disabled}
  onConfirm={(setOpen) => handleConfirm(setOpen)} 
  isLoading={isLoading}
  dialog_title={"Confirm Title"}
  dialog_message={"Confirm Message"}
  dialog_color={"warning"}
  >
  Button
</ButtonDialogConfirm> 
*/
}
