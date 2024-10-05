import {
  Divider,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useContext } from "react";
import { editorContext } from "../../../pages/profile/editor";
import { Clear } from "@mui/icons-material";

export default function Structure({ sections }) {
  const theme = useTheme();
  const { setting, updateSetting } = useContext(editorContext);

  return (
    <Paper
      variant="outlined"
      className="normal"
      sx={{
        height: "max-content",
        padding: "1px",
        position: "fixed",
        bottom: "20px",
        left: setting.viewStructure ? "20px" : "-300px",
        transition: "ease 0.3s",
        zIndex: 5,
        overflow: "hidden",
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        width={"250px"}
        paddingX={1}
      >
        <Typography variant="body2" fontWeight={"bold"}>
          Structure
        </Typography>
        <IconButton
          size="small"
          onClick={() =>
            updateSetting({ viewStructure: !setting.viewStructure })
          }
        >
          <Clear />
        </IconButton>
      </Stack>
      <Divider />
      <Stack sx={{ background: theme.palette.background.default }}>
        <StructureRender sections={sections} />
      </Stack>
    </Paper>
  );
}

function StructureRender({ sections }) {
  const {
    hoveredID,
    setHoveredID,
    selectedComponent,
    setSelectedComponent,
    deleteComponent,
  } = useContext(editorContext);

  return (
    <Stack sx={{ height: "max-content" }}>
      {sections.map((tag, index) => {
        const isHovered = hoveredID === tag.id;
        const isSelected = selectedComponent?.id === tag.id || false;
        return (
          <Stack key={index}>
            <MenuItem
              selected={isHovered}
              size="small"
              sx={{ paddingY: 0, color: isSelected && "#0366d6" }}
              tabIndex={0}
              onMouseOver={(e) => {
                if (tag.id !== hoveredID) {
                  e.stopPropagation();
                  setHoveredID(tag.id);
                }
              }}
              onMouseLeave={(e) => {
                if (tag.id === "root") {
                  setHoveredID(null);
                }
              }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedComponent(tag);
                document
                  .getElementById(tag.id)
                  .scrollIntoView({ behavior: "smooth" });
              }}
              onKeyDown={(e) => {
                if (e.key === "Delete" && isSelected) {
                  deleteComponent(tag.id);
                }
              }}
            >
              #{tag.id}
            </MenuItem>
            {tag.children.length > 0 && (
              <Stack
                marginLeft={2}
                sx={{ borderLeft: "1px dashed rgba(150,150,150,0.5)" }}
              >
                <StructureRender
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
