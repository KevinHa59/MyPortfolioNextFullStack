import { ClickAwayListener, Paper, Stack } from "@mui/material";
import React, { createContext, useEffect, useState } from "react";
import { PhoneAndroidSharp, Tv } from "@mui/icons-material";
import StyleComponent from "../../../components/profile/editor/style-component";
import _ from "lodash";
import Structure from "../../../components/profile/editor/structure";
import Settings from "../../../components/profile/editor/settings";
import { HTMLRender } from "../../../components/profile/editor/section-renderer";
import ContextMenu, {
  ContextItemRenderer,
} from "../../../components/widgets/context-menu/context-menu";
import LabelText from "../portfolio-collection/components/label-text";
import { menuData } from "../../../components/profile/editor/context-menu-details/templates";
import { stringUtil } from "../../../utils/stringUtil";
export const editorContext = createContext();

export default function Index() {
  const [hoveredID, setHoveredID] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [setting, setSetting] = useState({
    zoom: 1,
    screen: "Desktop",
    viewStructure: false,
  });
  const [contextPosition, setContextPosition] = useState(null);
  const [HTMLData, setHTMLData] = useState(sections);

  useEffect(() => {
    onKeyPress("Escape", () => {
      setSelectedComponent(null);
      setHoveredID(null);
    });
  }, [selectedComponent]);

  const handleUpdateSetting = (newSetting) => {
    setSetting((prev) => {
      return {
        ...prev,
        ...newSetting,
      };
    });
  };

  const handleUpdateStyle = (newStyle) => {
    const copy = _.cloneDeep(HTMLData);

    const newSelected = updateStyle(copy, selectedComponent.id, newStyle);

    if (newSelected) {
      setSelectedComponent(newSelected);
    }

    setHTMLData(copy);
  };
  const handleDeleteComponent = (id) => {
    const copy = _.cloneDeep(HTMLData);

    deleteComponent(copy, id);

    setHTMLData(copy);
  };

  const handleContextMenuClick = (e, component) => {
    e.stopPropagation();
    e.preventDefault();
    setContextPosition({ top: e.clientY, left: e.clientX });
    setSelectedComponent(component);
  };

  const contextMenuEvents = {
    Delete: (data) => {
      handleDeleteComponent(selectedComponent.id);
      setSelectedComponent(null);
      setContextPosition(null);
    },
    Insert: (data) => {
      const copy = _.cloneDeep(HTMLData);
      const _data = createID(data);
      insertComponent(copy, _data, selectedComponent.id);
      setHTMLData(copy);
    },
  };

  return (
    <editorContext.Provider
      value={{
        hoveredID,
        setHoveredID,
        setHTMLData,
        selectedComponent,
        setSelectedComponent,
        setting,
        updateSetting: handleUpdateSetting,
        updateStyle: handleUpdateStyle,
        deleteComponent: handleDeleteComponent,
        onContextMenu: handleContextMenuClick,
      }}
    >
      <ContextMenu
        title={<LabelText label={"# "}>{selectedComponent?.id}</LabelText>}
        minWidth="250px"
        open={contextPosition !== null}
        position={contextPosition}
        onClose={() => {
          setContextPosition(null);
        }}
      >
        <ContextItemRenderer value={menuData} onEvent={contextMenuEvents} />
      </ContextMenu>
      <Stack minHeight={"100vh"} direction={"row"} width={"100%"} gap={2}>
        <Structure sections={HTMLData} />
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
            <Stack
              sx={{
                zoom: setting.zoom,
                width: screens[setting.screen].size,
                transition: "ease 0.3s",
              }}
            >
              <HTMLRender sections={HTMLData} />
            </Stack>
          </Paper>
          <Settings />
        </Stack>
        {selectedComponent && (
          <Paper
            sx={{
              width: "450px",
              maxHeight: "100vh",
              // overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <StyleComponent />
          </Paper>
        )}
      </Stack>
    </editorContext.Provider>
  );
}

function createID(section) {
  const copy = { ...section };
  copy.id += `-${stringUtil.randomString(6)}`;
  return copy;
}

// recursion update style
function updateStyle(sections, id, newStyle) {
  let componentUpdated = null;

  sections.forEach((section) => {
    if (id === section.id) {
      section.styles = {
        ...section.styles,
        ...newStyle,
      };
      section.styles = Object.entries(section.styles).reduce((res, cur) => {
        if ([null, undefined, ""].includes(cur[1]) === false) {
          res[cur[0]] = cur[1];
        }
        return res;
      }, {});
      componentUpdated = section;
    } else {
      if (section.children.length > 0) {
        componentUpdated = updateStyle(section.children, id, newStyle);
      }
    }
  });

  return componentUpdated;
}

function insertComponent(sections, newSection, toID) {
  sections?.forEach((section) => {
    if (section.id === toID) {
      section.children.push(newSection);
    } else {
      if (section.children.length > 0) {
        insertComponent(section.children, newSection, toID);
      }
    }
  });
}

function deleteComponent(sections, id) {
  sections = sections.filter((item) => item.id !== id);
  sections.forEach((section) => {
    // Check if the current item has children
    if (section.children && section.children.length > 0) {
      // Recursively call deleteComponent on the children
      section.children = deleteComponent(section.children, id);
    }
  });
  return sections;
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

function onKeyPress(key, event) {
  document.addEventListener("keydown", (e) => {
    if (e.key === key) {
      event && event();
    }
  });

  return () => {
    document.removeEventListener("keydown", (e) => {
      if (e.key === key) {
        event && event();
      }
    });
  };
}
