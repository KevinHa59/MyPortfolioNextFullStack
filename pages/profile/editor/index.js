import {
  Button,
  ClickAwayListener,
  Collapse,
  Divider,
  IconButton,
  MenuItem,
  Paper,
  Stack,
} from "@mui/material";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { controllerTags, layoutTags, tags } from "./tags";
import Stepper, { Step } from "../../../components/widgets/stepper/stepper";
import SelectCustom from "../../../components/widgets/select/select-custom";
import LabelText from "../portfolio-collection/components/label-text";
import { PersonalVideo, PhoneAndroidSharp, Tv } from "@mui/icons-material";
import StyleComponent from "./style-component";

export const editorContext = createContext();

export default function Index() {
  const [hoveredID, setHoveredID] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [setting, setSetting] = useState({
    zoom: 1,
    view: "Desktop",
  });
  const [HTMLData, setHTMLData] = useState(sections);
  const HTMLDataRef = useRef(sections);
  const selectedRef = useRef(null);

  console.log(HTMLData, HTMLDataRef, selectedRef);
  const handleUpdateSetting = (newSetting) => {
    setSetting((prev) => {
      return {
        ...prev,
        ...newSetting,
      };
    });
  };

  return (
    <editorContext.Provider
      value={{
        hoveredID,
        setHoveredID,
        HTMLDataRef,
        setHTMLData,
        selectedRef,
        selectedComponent,
        setSelectedComponent,
        setting,
        updateSetting: handleUpdateSetting,
      }}
    >
      <Stack minHeight={"100vh"} direction={"row"} width={"100%"} gap={2}>
        <Paper
          gap={1}
          sx={{
            width: "350px",
            maxHeight: "100vh",
            overflowY: "auto",
          }}
        >
          <Stepper>
            <Step title={"Sections"} step={0}>
              <SectionComponent sections={HTMLData} />
            </Step>
            <Step title={"Layouts"} step={1}>
              <LayoutComponents />
            </Step>
            <Step title={"Controllers"} step={2}>
              <ControllerComponents />
            </Step>
          </Stepper>
        </Paper>
        <Stack width={"100%"} alignItems={"center"}>
          <Paper
            variant="outlined"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              height: "100vh",
              background: "transparent",
              overflowY: "auto",
              scrollBehavior: "smooth",
              padding: 1,
            }}
          >
            <ClickAwayListener
              onClickAway={() => {
                setHoveredID(null);
                setSelectedComponent(null);
                // selectedRef.current = null;
              }}
            >
              <Stack
                sx={{
                  zoom: setting.zoom,
                  width: screens[setting.view].size,
                  transition: "ease 0.3s",
                }}
              >
                <HTMLRender sections={HTMLData} />
              </Stack>
            </ClickAwayListener>
          </Paper>
          <SettingComponent />
        </Stack>
        <Paper sx={{ width: "350px", maxHeight: "100vh", padding: 1 }}>
          {selectedRef.current && (
            <StyleComponent component={selectedRef.current} />
          )}
        </Paper>
      </Stack>
    </editorContext.Provider>
  );
}

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

function SettingComponent() {
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
        <LabelText label={"Zoom"}>
          <SelectCustom
            selected_value={(setting.zoom * 100).toFixed(0)}
            data={[10, 25, 50, 75, 90, 100, 125, 150, 175, 200]}
            size="small"
            onChange={(value) => updateSetting({ zoom: value / 100 })}
          />
        </LabelText>
        <LabelText label={"View"}>
          <Stack direction={"row"}>
            {Object.entries(screens).map((screen, index) => {
              const isSelected = setting.view === screen[0];
              const Icon = screen[1].Icon;
              return (
                <IconButton
                  key={index}
                  size="small"
                  color={isSelected ? "info" : "default"}
                  onClick={() => updateSetting({ view: screen[0] })}
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

const sections = [
  {
    tagName: "div",
    id: "root",
    attributes: {},
    styles: {
      display: "block",
      width: "100%",
      minHeight: "100vh",
    },
    children: [
      {
        tagName: "div",
        id: "landing",
        attributes: {},
        styles: {
          display: "block",
          width: "100%",
          height: "100vh",
        },
        children: [],
      },
      {
        tagName: "div",
        id: "education",
        attributes: {},
        styles: {
          display: "block",
          width: "100%",
          height: "100vh",
        },
        children: [],
      },
    ],
  },
];
function SectionComponent({ sections }) {
  const {
    hoveredID,
    setHoveredID,
    selectedComponent,
    setSelectedComponent,
    selectedRef,
  } = useContext(editorContext);

  return (
    <Stack>
      {sections.map((tag, index) => {
        const isHovered = hoveredID === tag.id;
        const isSelected = selectedComponent?.id === tag.id || false;
        return (
          <Stack key={index}>
            <MenuItem
              selected={isHovered}
              size="small"
              sx={{ paddingY: 0, color: isSelected && "#0366d6" }}
              onMouseOver={(e) => {
                if (tag.id !== hoveredID) {
                  e.stopPropagation();
                  setHoveredID(tag.id);
                }
              }}
              onClick={(e) => {
                e.stopPropagation();
                selectedRef.current = tag;
                setSelectedComponent(tag);
                document
                  .getElementById(tag.id)
                  .scrollIntoView({ behavior: "smooth" });
              }}
            >
              #{tag.id}
            </MenuItem>
            {tag.children.length > 0 && (
              <Stack
                marginLeft={2}
                sx={{ borderLeft: "1px dashed rgba(150,150,150,0.5)" }}
              >
                <SectionComponent
                  sections={tag.children}
                  hoveredID={hoveredID}
                  onHoveredID={setHoveredID}
                />
              </Stack>
            )}
          </Stack>
        );
      })}
    </Stack>
  );
}

function HTMLRender({ sections }) {
  return <SectionRenderer sections={sections} />;
}

function SectionRenderer({ sections }) {
  return sections.map((section, index) => {
    return <Section key={index} section={section} />;
  });
}

function Section({ section }) {
  const {
    hoveredID,
    setHoveredID,
    selectedComponent,
    setSelectedComponent,
    selectedRef,
  } = useContext(editorContext);

  const isHovered = hoveredID === section.id;
  const isSelected = selectedComponent?.id === section.id || false;
  const combineStyles = {
    ...section.styles,
    padding: "20px",
    border: `1px dashed ${
      isHovered || isSelected ? "#0366d6" : "rgba(150,150,150,0.5)"
    }`,
  };
  let styles = isHovered
    ? {
        ...combineStyles,
        background: "rgba(150,150,150,0.2)",
      }
    : combineStyles;
  styles = isSelected ? { ...styles, background: "#0366d61a" } : styles;
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          opacity: isSelected || isHovered ? 1 : 0.6,
        }}
      >
        #{section.id}
      </div>
      {React.createElement(
        section.tagName,
        {
          key: section.id,
          id: section.id,
          ...section.attributes,
          style: styles,
          onMouseOver: (e) => {
            if (section.id !== hoveredID) {
              e.stopPropagation();
              setHoveredID(section.id);
            }
          },
          onClick: (e) => {
            e.stopPropagation();
            setSelectedComponent(section);
            selectedRef.current = section;
            document
              .getElementById(section.id)
              .scrollIntoView({ behavior: "smooth" });
          },
        },
        section.children.length > 0 ? (
          <SectionRenderer sections={section.children} />
        ) : null
      )}
    </div>
  );
}

function LayoutComponents() {
  return (
    <Stack>
      {layoutTags.map((tag, index) => {
        return (
          <Button key={index} size="small">
            {tag.tagName}
          </Button>
        );
      })}
    </Stack>
  );
}
function ControllerComponents() {
  return (
    <Stack>
      {controllerTags.map((tag, index) => {
        return (
          <Button key={index} size="small">
            {tag.tagName}
          </Button>
        );
      })}
    </Stack>
  );
}
