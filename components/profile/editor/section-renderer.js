import React, { useContext } from "react";
import { editorContext } from "../../../pages/profile/editor";

export function HTMLRender({ sections }) {
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
    deleteComponent,
    onContextMenu,
  } = useContext(editorContext);

  const isHovered = hoveredID === section.id;
  const isSelected = selectedComponent?.id === section.id || false;

  const combineStyles = {
    padding: "20px",
    ...section.styles,
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
    <div style={{ position: "relative", display: "contents" }}>
      {React.createElement(
        section.tagName,
        {
          key: section.id,
          id: section.id,
          ...section.attributes,
          style: styles,
          tabIndex: 0, // Make the element focusable
          onMouseOver: (e) => {
            if (section.id !== hoveredID) {
              e.stopPropagation();
              setHoveredID(section.id);
            }
          },
          onMouseLeave: (e) => {
            if (section.id === "root") {
              setHoveredID(null);
            }
          },
          onClick: (e) => {
            e.stopPropagation();
            setSelectedComponent(section);
            document
              .getElementById(section.id)
              .scrollIntoView({ behavior: "smooth" });
          },
          onKeyDown: (e) => {
            if (e.key === "Delete" && isSelected) {
              deleteComponent(section.id);
            }
          },
          onContextMenu: (e) => {
            onContextMenu && onContextMenu(e, section);
          },
        },
        section.children.length > 0 ? (
          <SectionRenderer sections={section.children} />
        ) : null
      )}
    </div>
  );
}
