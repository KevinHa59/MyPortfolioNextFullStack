import { RemoveRedEye, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  ClickAwayListener,
  Divider,
  IconButton,
  Paper,
  Popover,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { styles } from "../../../styles/useStyle";
import useDelay from "../../../hooks/use-delay";
import SelectCustom from "../select/select-custom";
export default function Input({
  autoComplete = "off",
  id,
  label,
  subLabel,
  type,
  multiline = false,
  rows = 1,
  sx,
  sx_input,
  inputProps,
  inputClassName,
  size = "small",
  fullWidth = false,
  isInvalidInput = false,
  isEdit = true,
  inputErrorMessage = "",
  variant,
  value,
  nullReplacement,
  onChange,
  OptionListMinWidth,
  isAutoComplete = false,
  isSelect = false,
  selectLabel = null,
  selectValue = null,
  onSelect,
  isOpenOptionOnFocus = false,
  defaultOptions,
  optionPlacement = "bottom",
  optionKey,
  APIOptions,
  APIOptionKey,
  onKeyPress = null,
  callbackOption,
}) {
  const [visible, setVisible] = useState(false);
  const [isDelaying, startDelay] = useDelay(500);
  const [options, setOptions] = useState([]);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [open, setOpen] = useState(false);
  const handleChange = (e) => {
    onChange && onChange(e);
    if (isAutoComplete) {
      if (APIOptions) {
        setIsFetchingData(true);
        startDelay(async () => {
          const searchValue = e.target.value;
          const res = await APIOptions(searchValue, 20);
          if (res?.data?.length > 0) {
            setOpen(true);
          }
          setOptions(res?.data || []);
          setIsFetchingData(false);
        });
      } else if (defaultOptions) {
        const res = defaultOptions.filter((opt) => {
          return optionKey
            ? opt[optionKey]
                ?.toLowerCase()
                .includes(e.target.value.toLowerCase())
            : opt?.toLowerCase().includes(e.target.value.toLowerCase());
        });
        setOptions(res);
        if (res?.length > 0) {
          setOpen(true);
        }
      }
    }
  };

  return (
    <Stack sx={sx}>
      <Stack direction={"row"} paddingX={1} gap={1} sx={{ opacity: 0.7 }}>
        <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
          {label}
        </Typography>
        <Typography variant="body2" fontStyle={"italic"}>
          {subLabel}
        </Typography>
        {isInvalidInput && (
          <Typography sx={{ color: styles.error.main }} variant="body2">
            {inputErrorMessage}
          </Typography>
        )}
      </Stack>
      {isEdit ? (
        <Stack position={"relative"}>
          {isSelect ? (
            <SelectCustom
              size={size}
              sx={sx_input}
              variant={variant}
              fullWidth={fullWidth}
              item_field={selectLabel}
              value_field={selectValue}
              selected_value={value}
              data={defaultOptions}
              onChange={(value) => onSelect && onSelect(value)}
            />
          ) : (
            <>
              {optionPlacement === "top" && (
                <ClickAwayListener
                  onClickAway={() => open === true && setOpen(false)}
                >
                  <Stack minWidth={OptionListMinWidth}>
                    {open && (
                      <Paper
                        sx={{
                          width: "100%",
                          position: "absolute",
                          bottom: "100%",
                          zIndex: 10,
                          maxHeight: "500px",
                          overflowY: "auto",
                        }}
                      >
                        <Stack width={"100%"}>
                          {options.map((s, i) => {
                            return (
                              <>
                                <Button
                                  key={i}
                                  size="small"
                                  className="br0 flex-start"
                                  onClick={() => {
                                    onSelect && onSelect(s);
                                    setOpen(false);
                                  }}
                                >
                                  {callbackOption
                                    ? callbackOption(s)
                                    : APIOptionKey
                                    ? s[APIOptionKey]
                                    : s}
                                </Button>
                                <Divider />
                              </>
                            );
                          })}
                        </Stack>
                      </Paper>
                    )}
                  </Stack>
                </ClickAwayListener>
              )}
              <TextField
                id={id}
                type={
                  type === "password" ? (visible ? "text" : "password") : type
                }
                variant={variant}
                fullWidth={fullWidth}
                multiline={multiline}
                rows={rows}
                size={size}
                sx={sx_input}
                autoComplete={autoComplete}
                InputProps={
                  type === "password"
                    ? {
                        ...inputProps,
                        endAdornment: (
                          <Stack direction={"row"}>
                            <IconButton
                              size="small"
                              onClick={() => setVisible((prev) => !prev)}
                            >
                              {visible ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </Stack>
                        ),
                      }
                    : isAutoComplete === true
                    ? {
                        ...inputProps,
                        endAdornment: (
                          <Stack direction={"row"}>
                            {isFetchingData && <CircularProgress size={14} />}
                          </Stack>
                        ),
                      }
                    : inputProps
                }
                className={inputClassName}
                value={value}
                onChange={handleChange}
                onKeyPress={onKeyPress}
              />
              {optionPlacement === "bottom" && (
                <ClickAwayListener
                  onClickAway={() => open === true && setOpen(false)}
                >
                  <Stack minWidth={OptionListMinWidth}>
                    {open && (
                      <Paper
                        sx={{
                          width: "100%",
                          position: "absolute",
                          top: "100%",
                          zIndex: 10,
                          maxHeight: "500px",
                          overflowY: "auto",
                        }}
                      >
                        <Stack width={"100%"}>
                          {options.map((s, i) => {
                            return (
                              <>
                                <Button
                                  key={i}
                                  size="small"
                                  className="br0 flex-start"
                                  onClick={() => {
                                    onSelect && onSelect(s);
                                    setOpen(false);
                                  }}
                                >
                                  {callbackOption
                                    ? callbackOption(s)
                                    : APIOptionKey
                                    ? s[APIOptionKey]
                                    : s}
                                </Button>
                                <Divider />
                              </>
                            );
                          })}
                        </Stack>
                      </Paper>
                    )}
                  </Stack>
                </ClickAwayListener>
              )}
            </>
          )}
        </Stack>
      ) : (
        <Typography
          sx={{ paddingLeft: 1, whiteSpace: "pre-line", lineHeight: 2 }}
        >
          {value || nullReplacement}
        </Typography>
      )}
    </Stack>
  );
}
