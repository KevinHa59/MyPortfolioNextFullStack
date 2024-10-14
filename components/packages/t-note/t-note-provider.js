import React, { createContext, useState } from "react";
import { stringUtil } from "../../../utils/stringUtil";
import Notification from "./note-item";

// create note context
export const TNoteContext = createContext();

export default function TNoteProvider({
  mode = "light",
  config = {
    isOutlined: false,
    isStack: false,
    color: "primary",
    placement: "bottom-right",
    padding: "20px",
    timeout: 0,
    speed: 500,
  },
  children,
}) {
  const [noteList, setNoteList] = useState([
    {
      id: stringUtil.randomString(5),
      isOutlined: true,
      color: "info",
      title: "info",
      message:
        "[MONGODB DRIVER] Warning: useNewUrlParser is a deprecated option",
      speed: config.speed,
      timeoutOnClose: config.timeout,
    },
    {
      id: stringUtil.randomString(5),
      isOutlined: true,
      color: "primary",
      title: "primary",
      message:
        "[MONGODB DRIVER] Warning: useNewUrlParser is a deprecated option",
      speed: config.speed,
      timeoutOnClose: config.timeout,
    },
    {
      id: stringUtil.randomString(5),
      isOutlined: true,
      color: "secondary",
      title: "secondary",
      message:
        "[MONGODB DRIVER] Warning: useNewUrlParser is a deprecated option",
      speed: config.speed,
      timeoutOnClose: config.timeout,
    },
    {
      id: stringUtil.randomString(5),
      isOutlined: true,
      color: "success",
      title: "success",
      message:
        "[MONGODB DRIVER] Warning: useNewUrlParser is a deprecated option",
      speed: config.speed,
      timeoutOnClose: config.timeout,
    },
    {
      id: stringUtil.randomString(5),
      isOutlined: true,
      color: "warning",
      title: "warning",
      message:
        "[MONGODB DRIVER] Warning: useNewUrlParser is a deprecated option",
      speed: config.speed,
      timeoutOnClose: config.timeout,
    },
    {
      id: stringUtil.randomString(5),
      isOutlined: true,
      color: "error",
      title: "error",
      message:
        "[MONGODB DRIVER] Warning: useNewUrlParser is a deprecated option",
      speed: config.speed,
      timeoutOnClose: config.timeout,
    },
  ]); // notifications state

  const handleAddNote = (newNote) => {
    if (!config.isStack) {
      const newID = randomString(6);
      setNoteList([
        {
          id: newID,
          timeoutOnClose: newNote.timeoutOnClose
            ? newNote.timeoutOnClose
            : config.timeout,
          ...newNote,
        },
      ]);
    } else {
      setNoteList((prev) => {
        return [{ id: newID, ...newNote }, ...prev];
      });
    }
  };

  const handleDeleteNote = (noteID) => {
    setNoteList((prev) => {
      return prev.filter((item) => item.id !== noteID);
    });
  };

  return (
    <TNoteContext.Provider
      value={{
        config: config,
        getNotes: noteList,
        addNote: handleAddNote,
        deleteNote: handleDeleteNote,
      }}
    >
      <NotesRender noteList={noteList} config={config} mode={mode} />
      {children}
    </TNoteContext.Provider>
  );
}

function NotesRender({ noteList, config, mode }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        position: "fixed",
        top: 0,
        left: 0,
        background: "transparent",
        padding: config.padding,
        zIndex: 2000,
        transition: "ease 0.3s",
      }}
    >
      {noteList.map((note) => {
        return <Notification key={note.id} {...note} mode={mode} />;
      })}
    </div>
  );
}

export function randomString(length = 6) {
  const allChars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*-_+;:,.~";
  const max = allChars.length - 1;

  let result = "";
  while (result.length < length) {
    const randomIndex = Math.floor(max * Math.random());
    result += allChars.charAt(randomIndex);
  }

  return result;
}
