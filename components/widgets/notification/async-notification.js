import { CheckCircle, ErrorOutline } from "@mui/icons-material";
import { CircularProgress, Fade, Paper, Slide, Stack } from "@mui/material";
import React, { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const asyncNoteContext = createContext(null);

export default function AsyncNotification({ children }) {
  const [notes, setNotes] = useState({});

  const handleAddNote = async (message = "", func) => {
    const id = uuidv4();

    setNotes((prev) => {
      const copy = _.cloneDeep(prev);
      copy[id] = {
        status: "processing",
        message: message,
      };
      return copy;
    });
    try {
      const res = await func;
      if ([200, 201].includes(res.status)) {
        setNotes((prev) => {
          const copy = _.cloneDeep(prev);
          copy[id].status = "success";
          return copy;
        });
      } else {
        setNotes((prev) => {
          const copy = _.cloneDeep(prev);
          copy[id].status = "fail";
          return copy;
        });
      }
      setTimeout(() => {
        setNotes((prev) => {
          const copy = _.cloneDeep(prev);
          delete copy[id];
          return copy;
        });
      }, 2000);
      return res;
    } catch (error) {
      console.log(error);
      setNotes((prev) => {
        const copy = _.cloneDeep(prev);
        copy[id].status = "fail";
        return copy;
      });
      setTimeout(() => {
        setNotes((prev) => {
          const copy = _.cloneDeep(prev);
          delete copy[id];
          return copy;
        });
      }, 2000);
    }
  };
  return (
    <asyncNoteContext.Provider value={{ addNote: handleAddNote }}>
      <Stack position={"fixed"} bottom="50px" right="50px" gap={1} zIndex={500}>
        {Object.entries(notes).map((m, index) => {
          const messageDetail = m[1];
          return <Message key={index} messageDetail={messageDetail} />;
        })}
      </Stack>
      {children}
    </asyncNoteContext.Provider>
  );
}

function Message({ messageDetail }) {
  const [isIn, setIsIn] = useState(true);

  useEffect(() => {
    if (messageDetail.status !== "processing") {
      setTimeout(() => {
        setIsIn(false);
      }, 1500);
    }
  }, [messageDetail]);

  return (
    <Slide in={isIn} direction="left">
      <Paper variant="outlined" sx={{ padding: 1 }}>
        <Stack direction={"row"} gap={2} alignItems={"center"}>
          <Stack width={"40px"}>
            {messageDetail.status === "processing" ? (
              <CircularProgress size={12} />
            ) : messageDetail.status === "success" ? (
              <CheckCircle color="success" />
            ) : (
              <ErrorOutline color="error" />
            )}
          </Stack>
          {messageDetail.message}
        </Stack>
      </Paper>
    </Slide>
  );
}
