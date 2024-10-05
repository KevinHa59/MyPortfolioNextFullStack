import {
  Checkbox,
  FormControlLabel,
  IconButton,
  Paper,
  Stack,
} from "@mui/material";
import React, { useContext } from "react";
import ButtonPopover from "../../widgets/buttons/button_popover";
import LabelText from "../../../pages/profile/portfolio-collection/components/label-text";
import SelectCustom from "../../widgets/select/select-custom";
import { editorContext } from "../../../pages/profile/editor";
import { PhoneAndroidSharp, Tv } from "@mui/icons-material";
const screens = {
  Desktop: {
    Icon: <Tv />,
    size: "100%",
  },
  Mobile: {
    Icon: <PhoneAndroidSharp />,
    size: "412px",
  },
};

export default function Settings() {
  const { setting, updateSetting } = useContext(editorContext);
  return (
    <Paper
      variant="outlined"
      sx={{
        position: "fixed",
        bottom: "10px",
      }}
    >
      <Stack direction={"row"} gap={2} alignItems={"center"} padding={1}>
        <ButtonPopover
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          isIconButton={false}
          label={"View"}
        >
          <Stack paddingX={1}>
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={setting.viewStructure}
                  onChange={(e) =>
                    updateSetting({
                      viewStructure: !setting.viewStructure,
                    })
                  }
                />
              }
              label={"Structure"}
            />
          </Stack>
        </ButtonPopover>
        <LabelText label={"Zoom"}>
          <SelectCustom
            selected_value={(setting.zoom * 100).toFixed(0)}
            data={[10, 25, 50, 75, 90, 100, 125, 150, 175, 200]}
            size="small"
            onChange={(value) => updateSetting({ zoom: value / 100 })}
          />
        </LabelText>
        <LabelText label={"Screen"}>
          <Stack direction={"row"}>
            {Object.entries(screens).map((screen, index) => {
              const isSelected = setting.screen === screen[0];
              const Icon = screen[1].Icon;
              return (
                <IconButton
                  key={index}
                  size="small"
                  color={isSelected ? "info" : "default"}
                  onClick={() => updateSetting({ screen: screen[0] })}
                >
                  {Icon}
                </IconButton>
              );
            })}
          </Stack>
        </LabelText>
      </Stack>
    </Paper>
  );
}
