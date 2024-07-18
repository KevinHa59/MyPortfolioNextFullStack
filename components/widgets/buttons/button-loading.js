import { Button, CircularProgress, Stack } from "@mui/material";
import React from "react";

export default function ButtonLoading({
  isLoading = false,
  loadingText = "Loading",
  className,
  disabled,
  sx,
  size = "large",
  color,
  startIcon,
  variant,
  onClick,
  children,
  ...props
}) {
  return (
    <Button
      {...props}
      disabled={disabled || isLoading}
      sx={sx}
      size={size}
      color={color}
      variant={variant}
      onClick={onClick}
      startIcon={startIcon}
      className={className}
    >
      {isLoading ? (
        <Stack direction={"row"} gap={1} sx={{ whiteSpace: "nowrap" }}>
          <CircularProgress
            size={size === "small" ? 15 : size === "medium" ? 20 : 25}
          />
          {loadingText}
        </Stack>
      ) : (
        children
      )}
    </Button>
  );
}

// usage
// import ButtonLoading from './widgets/buttons/button-loading';

// const [isLoading, setIsLoading] = useState(false); // use this state to toggle loading

// <ButtonLoading isLoading={isLoading} variant="contained" color={'success'}>Submit</ButtonLoading>
