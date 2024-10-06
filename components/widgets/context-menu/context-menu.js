import { ArrowRight } from "@mui/icons-material";
import {
  Button,
  ClickAwayListener,
  Divider,
  Fade,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

export default function ContextMenu({
  title,
  minWidth,
  position,
  onClose,
  children,
}) {
  const [newPosition, setNewPosition] = useState(position);
  const menuRef = useRef(null);
  useEffect(() => {
    // setNewPosition(position);
    position && handleUpdatePosition(position.top, position.left);
  }, [position]);

  const handleUpdatePosition = (top, left) => {
    if (menuRef.current) {
      const menuRect = menuRef.current.getBoundingClientRect();
      const { innerWidth, innerHeight } = window;

      // Calculate the new position
      let newTop = top;
      let newLeft = left;

      // Check if the menu overflows off the bottom of the screen
      if (top + menuRect.height > innerHeight) {
        newTop = innerHeight - menuRect.height; // Move the menu up
      }

      // Check if the menu overflows off the right of the screen
      if (left + menuRect.width > innerWidth) {
        newLeft = innerWidth - menuRect.width; // Move the menu left
      }
      // Apply the new position
      setNewPosition({ top: newTop, left: newLeft });
    }
  };

  return (
    Boolean(position) && (
      <Stack
        sx={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          zIndex: 5,
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          onClose();
          setNewPosition(null);
        }}
      >
        <ClickAwayListener
          onClickAway={() => {
            if (onClose) {
              onClose();

              setNewPosition(null);
            }
          }}
        >
          <Fade in={Boolean(newPosition)}>
            <Paper
              ref={menuRef}
              className="normal br3"
              variant="outlined"
              sx={{
                minWidth: minWidth,
                position: "fixed",
                top: newPosition?.top,
                left: newPosition?.left,
                background: "#3c3c3c",
              }}
            >
              {title && (
                <>
                  <Stack padding={1}>{title}</Stack>
                  <Divider />
                </>
              )}
              <Stack paddingY={1} width={"100%"} gap={1}>
                {children}
              </Stack>
            </Paper>
          </Fade>
        </ClickAwayListener>
      </Stack>
    )
  );
}

export function ContextItem({
  StartIcon,
  title,
  isContainer = false,
  isEnterParent = false,
  onClick,
}) {
  return (
    <Button
      className="br0"
      fullWidth
      sx={{
        padding: 0,
        paddingX: 2,
        display: "flex",
        justifyContent: "flex-start",
        position: "relative",
        cursor: isContainer ? "default" : "pointer",
        overflow: "hidden",
      }}
      onClick={onClick}
    >
      <Stack sx={{ minWidth: "30px" }}>
        {StartIcon && <StartIcon fontSize="12px" />}
      </Stack>
      <Typography variant="body2" textAlign={"left"} sx={{ width: "100%" }}>
        {title}
      </Typography>
      {isContainer && (
        <ArrowRight
          sx={{
            fontSize: "25px",
            position: "absolute",
            right: isEnterParent ? "0px" : "20px",
            // zIndex: 10,
            transition: "ease 0.5s",
          }}
        />
      )}
    </Button>
  );
}

export function ContextContainer({ StartIcon, title, onClick, children }) {
  const [isMouseEnter, setIsMouseEnter] = useState(false);
  const [newPosition, setNewPosition] = useState(null);
  const subMenuRef = useRef();
  useEffect(() => {
    if (isMouseEnter && subMenuRef.current) {
      const menuRect = subMenuRef.current.getBoundingClientRect();
      const { innerWidth, innerHeight } = window;

      let nextPosition = {
        // paddingLeft: "20px",
        left: "calc(100% - 10px)",
        top: "-10px",
      };
      // Check if submenu goes off the right side of the screen
      const isOffScreenRight = menuRect.right + 200 > innerWidth;

      if (isOffScreenRight) {
        nextPosition = {
          ...nextPosition,
          right: "calc(100% - 10px)",
          // paddingRight: "20px",
        };
        delete nextPosition["left"];
        delete nextPosition["paddingLeft"];
      }
      // Check if submenu goes off the bottom of the screen
      const isOffScreenBottom = menuRect.bottom > innerHeight;
      if (isOffScreenBottom) {
        nextPosition = { ...nextPosition, bottom: 0 };
        delete nextPosition["top"];
      }
      setNewPosition(nextPosition);
    }
  }, [isMouseEnter, subMenuRef]);

  const handleMouseEnter = () => {
    setIsMouseEnter(true);
  };

  const handleMouseLeave = () => {
    setIsMouseEnter(false);
    setNewPosition(null);
  };

  return (
    <Stack
      width={"100%"}
      sx={{ position: "relative" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ContextItem
        StartIcon={StartIcon}
        title={title}
        isContainer={true}
        isEnterParent={isMouseEnter}
        onClick={onClick}
      />
      <Fade in={isMouseEnter} timeout={{ enter: 300, exit: 0 }}>
        <Stack
          ref={subMenuRef}
          sx={{
            position: "absolute",
            minWidth: "200px",
            zIndex: 5,
            ...newPosition,
          }}
        >
          <Paper
            variant="outlined"
            className="normal br2"
            sx={{ paddingY: 1, background: "#3c3c3c" }}
          >
            {children}
          </Paper>
        </Stack>
      </Fade>
    </Stack>
  );
}

export function ContextItemRenderer({ value, onClick, onEvent }) {
  return <RenderItem sections={value} onClick={onClick} onEvent={onEvent} />;
}

function RenderItem({ sections, onClick, onEvent }) {
  return sections.map((section, index) => {
    if (section.subMenu?.length > 0) {
      return (
        <ContextContainer key={index} title={section.label}>
          <RenderItem
            sections={section.subMenu}
            onClick={onClick}
            onEvent={onEvent}
          />
        </ContextContainer>
      );
    } else if (section.Component) {
      return section.Component;
    } else {
      return (
        <ContextItem
          key={index}
          title={section.label}
          StartIcon={section.Icon}
          onClick={() => {
            if (section.event) {
              onEvent && onEvent[section.event](section.data);
            }
          }}
        />
      );
    }
  });
}
