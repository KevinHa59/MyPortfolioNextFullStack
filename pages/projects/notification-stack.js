import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
  notificationElement,
  stackPlacementStyles,
} from "../../components/packages/t-note/note-item";
import { theme } from "../../components/packages/t-note/styles/theme";
import { dark } from "../../components/packages/t-note/styles/dark";
import { light } from "../../components/packages/t-note/styles/light";
import { useEffect } from "react";
import MonacoEditor from "../../components/widgets/monoca/moraco-editor";

/**
 * Description placeholder
 *
 * @export
 * @returns {*}
 */
export default function Index() {
  const [config, setConfig] = useState({
    mode: "dark",
    color: "primary",
    placement: "top-right",
    enableOutlined: false,
    timeout: 0,
    animationSpeed: 1000,
  });
  const isDark = config.mode === "dark";
  const style = isDark ? dark : light;

  useEffect(() => {
    const sampleContainer = document.getElementById("sampleNote");
    if (sampleContainer) {
      sampleContainer.innerHTML = "";
      sampleContainer.appendChild(
        notificationElement({
          title: config.color,
          message:
            "[MONGODB DRIVER] Warning: useNewUrlParser is a deprecated option",
          config: {
            ...config,
            timeout: 0,
          },
        })
      );
    }
  }, [config]);

  const handleFire = () => {
    notificationElement({
      title: config.color,
      message:
        "[MONGODB DRIVER] Warning: useNewUrlParser is a deprecated option",
      config: config,
    });
  };

  const handleConfigChange = (newValue) => {
    setConfig((prev) => {
      return {
        ...prev,
        ...newValue,
      };
    });
  };

  return (
    <Stack
      padding={2}
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Paper variant="outlined" sx={{ padding: 1 }}>
        <Stack direction="row" gap={1}>
          <Stack>
            <Stack gap={5}>
              <Stack>
                <Grid container spacing={1}>
                  {["dark", "light"].map((mode, index) => {
                    return (
                      <Grid item xs={6} key={index}>
                        <Button
                          fullWidth
                          className="br0"
                          size="small"
                          variant={
                            config.mode === mode ? "contained" : "outlined"
                          }
                          onClick={() => handleConfigChange({ mode: mode })}
                        >
                          {mode}
                        </Button>
                      </Grid>
                    );
                  })}
                </Grid>
              </Stack>

              <Stack direction={"row"}>
                <Grid container spacing={1} sx={{ width: "300px" }}>
                  {Object.keys(theme).map((color, index) => {
                    return (
                      <Grid item xs={6} key={index}>
                        <Button
                          fullWidth
                          className="br0"
                          size="small"
                          variant={config.color === color ? "outlined" : "text"}
                          onClick={() => handleConfigChange({ color: color })}
                          sx={{
                            borderColor: style[color],
                            color: style[color],
                            background:
                              config.color === color && `${style[color]}33`,
                          }}
                        >
                          {color}
                        </Button>
                      </Grid>
                    );
                  })}
                </Grid>
                <Stack
                  id={"sampleNote"}
                  alignItems={"center"}
                  height={"150px"}
                  width={"100%"}
                ></Stack>
              </Stack>
              <Stack>
                <Grid container spacing={1}>
                  {Object.keys(stackPlacementStyles(0)).map(
                    (placement, index) => {
                      return (
                        <Grid item xs={4} key={index}>
                          <Button
                            fullWidth
                            className="br0"
                            size="small"
                            variant={
                              config.placement === placement
                                ? "contained"
                                : "outlined"
                            }
                            onClick={() =>
                              handleConfigChange({ placement: placement })
                            }
                          >
                            {placement}
                          </Button>
                        </Grid>
                      );
                    }
                  )}
                </Grid>
              </Stack>
              <FormControlLabel
                control={
                  <Checkbox
                    value={config.enableOutlined}
                    onChange={(e) =>
                      handleConfigChange({ enableOutlined: e.target.checked })
                    }
                  />
                }
                label="Enable Outlined"
              />
              <Stack>
                <Typography>Timeout: {config.timeout} ms</Typography>
                <Slider
                  value={parseInt(config.timeout / 1000)}
                  valueLabelDisplay="auto"
                  getAriaValueText={(value) => `${value}s`}
                  step={1}
                  marks
                  min={0}
                  max={10}
                  onChange={(e, value) =>
                    handleConfigChange({ timeout: value * 1000 })
                  }
                />
              </Stack>
              <Stack>
                <Typography>
                  Animation Speed: {config.animationSpeed} ms
                </Typography>
                <Slider
                  value={parseFloat(config.animationSpeed / 1000).toFixed(1)}
                  valueLabelDisplay="auto"
                  getAriaValueText={(value) => `${value}s`}
                  step={0.1}
                  marks
                  min={0}
                  max={5}
                  onChange={(e, value) =>
                    handleConfigChange({ animationSpeed: value * 1000 })
                  }
                />
              </Stack>
              <Stack>
                <Divider />
                <Button onClick={handleFire}>Fire</Button>
              </Stack>
            </Stack>
          </Stack>
          <Divider orientation="vertical" flexItem />
          {/* ------------------------------------------------------------------------- */}
          <Stack flex={1} width={"300px"}>
            <MonacoEditor
              readOnly={true}
              disableGuide={true}
              height={"100%"}
              defaultLanguage="json"
              value={{ config: config }}
            />
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
}
