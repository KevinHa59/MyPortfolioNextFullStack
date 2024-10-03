import {
  Button,
  Collapse,
  Divider,
  MenuItem,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Toggle from "../../../components/widgets/toggle/toggle";

import { editorContext } from ".";
import LabelText from "../portfolio-collection/components/label-text";
import InputSuggestion from "../../../components/widgets/input/input-suggestion";
import { background, propOptions, typography } from "./css-styles";
import { stringUtil } from "../../../utils/stringUtil";
import Stepper, { Step } from "../../../components/widgets/stepper/stepper";
const fontStyles = {
  fontSize: "12px",
};
export default function StyleComponent({}) {
  const { updateStyle, selectedComponent } = useContext(editorContext);
  const theme = useTheme();
  const handleChange = (newStyle) => {
    updateStyle(newStyle);
  };

  return (
    <Stack height={"100%"} gap={1}>
      <Typography># {selectedComponent?.id}</Typography>
      <Stepper>
        <Step title={"Layout"} step={0}>
          <Display
            theme={theme}
            styles={selectedComponent.styles}
            onChange={(newValue) => handleChange(newValue)}
          />
        </Step>
        <Step title={"Position"} step={1}>
          <Position
            theme={theme}
            styles={selectedComponent.styles}
            onChange={(newValue) => handleChange(newValue)}
          />
        </Step>
        <Step title={"Background"} step={2}>
          <Background
            theme={theme}
            styles={selectedComponent.styles}
            onChange={(newValue) => handleChange(newValue)}
          />
        </Step>
        <Step title={"Font"} step={3}>
          <Font
            theme={theme}
            styles={selectedComponent.styles}
            onChange={(newValue) => handleChange(newValue)}
          />
        </Step>
      </Stepper>

      {/* <Display
        theme={theme}
        styles={selectedComponent.styles}
        onChange={(newValue) => handleChange(newValue)}
      />
      <Position
        theme={theme}
        styles={selectedComponent.styles}
        onChange={(newValue) => handleChange(newValue)}
      />
      <Background
        theme={theme}
        styles={selectedComponent.styles}
        onChange={(newValue) => handleChange(newValue)}
      />
      <Font
        theme={theme}
        styles={selectedComponent.styles}
        onChange={(newValue) => handleChange(newValue)}
      /> */}
    </Stack>
  );
}

function Display({ theme, styles, onChange }) {
  const isFlex = styles.display === "flex";
  const isGrid = styles.display === "grid";

  return (
    <Stack height={"100%"} padding={1} gap={1}>
      <LabelText label={"Display"} label_sx={{ fontSize: fontStyles.fontSize }}>
        <Toggle
          fullWidth={true}
          value={styles.display}
          options={["block", "flex", "grid"]}
          onChange={(value) => onChange && onChange({ display: value })}
        />
      </LabelText>

      {isFlex && (
        <>
          <InputSuggestion
            label={"Direction"}
            value={styles.flexDirection || ""}
            options={propOptions["flexDirection"]}
            onSelect={(value) => onChange && onChange({ flexDirection: value })}
            onChange={(e) =>
              onChange && onChange({ flexDirection: e.target.value })
            }
          />
          <InputSuggestion
            label={"Justify Content"}
            value={styles.justifyContent || ""}
            options={propOptions["justifyContent"]}
            onSelect={(value) =>
              onChange && onChange({ justifyContent: value })
            }
            onChange={(e) =>
              onChange && onChange({ justifyContent: e.target.value })
            }
          />
          <InputSuggestion
            label={"Align Items"}
            value={styles.alignItems || ""}
            options={propOptions["alignItems"]}
            onSelect={(value) => onChange && onChange({ alignItems: value })}
            onChange={(e) =>
              onChange && onChange({ alignItems: e.target.value })
            }
          />
          <InputSuggestion
            label={"Align Content"}
            value={styles.alignContent || ""}
            options={propOptions["alignContent"]}
            onSelect={(value) => onChange && onChange({ alignContent: value })}
            onChange={(e) =>
              onChange && onChange({ alignContent: e.target.value })
            }
          />
          <InputSuggestion
            label={"Gap"}
            value={styles.gap || ""}
            options={propOptions["gap"]}
            onSelect={(value) => onChange && onChange({ gap: value })}
            onChange={(e) => onChange && onChange({ gap: e.target.value })}
          />
        </>
      )}

      {isGrid && (
        <>
          <InputSuggestion
            label={"Grid Template Columns"}
            value={styles.gridTemplateColumns || ""}
            options={propOptions["gridTemplateColumns"]}
            onSelect={(value) =>
              onChange && onChange({ gridTemplateColumns: value })
            }
            onChange={(e) =>
              onChange && onChange({ gridTemplateColumns: e.target.value })
            }
          />
          <InputSuggestion
            label={"Grid Template Rows"}
            value={styles.gridTemplateRows || ""}
            options={propOptions["gridTemplateRows"]}
            onSelect={(value) =>
              onChange && onChange({ gridTemplateRows: value })
            }
            onChange={(e) =>
              onChange && onChange({ gridTemplateRows: e.target.value })
            }
          />
          <InputSuggestion
            label={"Gap"}
            value={styles.gap || ""}
            options={propOptions["gap"]}
            onSelect={(value) => onChange && onChange({ gap: value })}
            onChange={(e) => onChange && onChange({ gap: e.target.value })}
          />
          <InputSuggestion
            label={"Justify Items"}
            value={styles.justifyItems || ""}
            options={propOptions["justifyItems"]}
            onSelect={(value) => onChange && onChange({ justifyItems: value })}
            onChange={(e) =>
              onChange && onChange({ justifyItems: e.target.value })
            }
          />
          <InputSuggestion
            label={"Align Items"}
            value={styles.alignItems || ""}
            options={propOptions["alignItems"]}
            onSelect={(value) => onChange && onChange({ alignItems: value })}
            onChange={(e) =>
              onChange && onChange({ alignItems: e.target.value })
            }
          />
        </>
      )}

      <InputSuggestion
        label={"Flex Grow"}
        value={styles.flexGrow || ""}
        options={propOptions["flexGrow"]}
        onSelect={(value) => onChange && onChange({ flexGrow: value })}
        onChange={(e) => onChange && onChange({ flexGrow: e.target.value })}
      />
      <InputSuggestion
        label={"Width"}
        value={styles.width || ""}
        options={propOptions["width"]}
        onSelect={(value) => onChange && onChange({ width: value })}
        onChange={(e) => onChange && onChange({ width: e.target.value })}
      />
      <InputSuggestion
        label={"Height"}
        value={styles.height || ""}
        options={propOptions["height"]}
        onSelect={(value) => onChange && onChange({ height: value })}
        onChange={(e) => onChange && onChange({ height: e.target.value })}
      />
      <InputSuggestion
        label={"Padding"}
        value={styles.padding || ""}
        options={propOptions["padding"]}
        onSelect={(value) => onChange && onChange({ padding: value })}
        onChange={(e) => onChange && onChange({ padding: e.target.value })}
      />
    </Stack>
  );
}

function Position({ theme, styles, onChange }) {
  const isPositioned =
    styles.position === "relative" ||
    styles.position === "absolute" ||
    styles.position === "fixed" ||
    styles.position === "sticky";

  return (
    <Stack height={"100%"} padding={1} gap={1}>
      <InputSuggestion
        label={"Position"}
        value={styles.position}
        options={propOptions["position"]}
        onSelect={(value) => onChange && onChange({ position: value })}
        onChange={(e) => onChange && onChange({ position: e.target.value })}
      />

      {isPositioned && (
        <>
          <InputSuggestion
            label={"Top"}
            value={styles.top || "auto"}
            options={propOptions["top"]}
            onSelect={(value) => onChange && onChange({ top: value })}
            onChange={(e) => onChange && onChange({ top: e.target.value })}
          />
          <InputSuggestion
            label={"Right"}
            value={styles.right || "auto"}
            options={propOptions["right"]}
            onSelect={(value) => onChange && onChange({ right: value })}
            onChange={(e) => onChange && onChange({ right: e.target.value })}
          />
          <InputSuggestion
            label={"Bottom"}
            value={styles.bottom || "auto"}
            options={propOptions["bottom"]}
            onSelect={(value) => onChange && onChange({ bottom: value })}
            onChange={(e) => onChange && onChange({ bottom: e.target.value })}
          />
          <InputSuggestion
            label={"Left"}
            value={styles.left || "auto"}
            options={propOptions["left"]}
            onSelect={(value) => onChange && onChange({ left: value })}
            onChange={(e) => onChange && onChange({ left: e.target.value })}
          />
        </>
      )}
      <InputSuggestion
        label={"Z-Index"}
        value={styles.zIndex || "auto"}
        options={propOptions["zIndex"]}
        onSelect={(value) => onChange && onChange({ zIndex: value })}
        onChange={(e) => onChange && onChange({ zIndex: e.target.value })}
      />
      <InputSuggestion
        label={"Transform"}
        value={styles.transform || ""}
        options={propOptions["transform"]}
        onSelect={(value) => onChange && onChange({ transform: value })}
        onChange={(e) => onChange && onChange({ transform: e.target.value })}
      />
      <InputSuggestion
        label={"Transform Origin"}
        value={styles.transformOrigin || ""}
        options={propOptions["transformOrigin"]}
        onSelect={(value) => onChange && onChange({ transformOrigin: value })}
        onChange={(e) =>
          onChange && onChange({ transformOrigin: e.target.value })
        }
      />
    </Stack>
  );
}

function Background({ theme, styles, onChange }) {
  return (
    <Stack height={"100%"} padding={1} gap={1}>
      {Object.entries(background).map((prop, index) => {
        return (
          <InputSuggestion
            key={index}
            label={stringUtil.camelToTitle(prop[0]).replace("Background ", "")}
            value={styles[prop[0]] || prop[1]}
            options={propOptions[prop[0]]}
            onSelect={(value) => onChange && onChange({ [prop[0]]: value })}
            onChange={(e) =>
              onChange && onChange({ [prop[0]]: e.target.value })
            }
          />
        );
      })}
    </Stack>
  );
}

function Font({ theme, styles, onChange }) {
  return (
    <Stack height={"100%"} padding={1} gap={1}>
      {Object.entries(typography).map((prop, index) => {
        return (
          <InputSuggestion
            key={index}
            label={stringUtil.camelToTitle(prop[0])}
            value={styles[prop[0]] || prop[1]}
            options={propOptions[prop[0]]}
            onSelect={(value) => onChange && onChange({ [prop[0]]: value })}
            onChange={(e) =>
              onChange && onChange({ [prop[0]]: e.target.value })
            }
          />
        );
      })}
    </Stack>
  );
}

function CollapseBox({ title, theme, children }) {
  const [open, setOpen] = useState(true);
  return (
    <Paper variant="elevation" className="flat br0" sx={{ overflow: "hidden" }}>
      <Button
        className="br0"
        fullWidth
        size="small"
        variant="body2"
        fontWeight={"200"}
        onClick={() => setOpen((prev) => !prev)}
        sx={{ padding: 0 }}
      >
        {title}
      </Button>
      <Divider />
      <Collapse in={open}>
        <Stack
          gap={1}
          paddingX={1}
          paddingY={2}
          sx={{ background: theme.palette.background.default }}
        >
          {children}
        </Stack>
      </Collapse>
    </Paper>
  );
}
