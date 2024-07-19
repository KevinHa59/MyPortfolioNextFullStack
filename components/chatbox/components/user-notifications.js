import { Button, Fade, Slide, Stack } from "@mui/material";
import { memo, useEffect, useState } from "react";

export default function useChatNote() {
  const [note, setNote] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState(null);
  useEffect(() => {
    if (note !== null) {
      setIsActive(true);
      setTimer(
        setTimeout(() => {
          setIsActive(false);
          setNote(null);
        }, 3000)
      );
    }
    return () => {
      clearTimeout(timer);
    };
  }, [note]);

  const handleNoteChange = (data) => {
    _.isString(data)
      ? setNote(data)
      : setNote((prev) => {
          return {
            ...prev,
            ...data,
          };
        });
  };

  function Note() {
    return (
      <Fade in={isActive === true}>
        <Slide in={isActive === true} direction="down">
          <Stack
            alignItems={"center"}
            width={"100%"}
            sx={{ position: "fixed", top: 0, left: 0 }}
          >
            <Button
              color={note?.color || "primary"}
              variant="contained"
              size="small"
              sx={{
                paddingX: 1,
                cursor: "none",
              }}
            >
              {note?.message || note || ""}
            </Button>
          </Stack>
        </Slide>
      </Fade>
    );
  }

  return { setNote: handleNoteChange, Note: memo(Note) };
}
