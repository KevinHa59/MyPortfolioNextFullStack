import {
  Button,
  Chip,
  Divider,
  Fade,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { darkStyles } from "../../theme/dark-theme-options";
import { AccountCircle } from "@mui/icons-material";
import _ from "lodash";
import useSocket from "../../hooks/use-socket";
import useChatNote from "./components/user-notifications";

export default function ChatBox() {
  const { features } = useSocket({
    events: {},
    onReceiveMessage: onReceiveMessage,
    onUserJoin: onUserJoin,
    onUserLeft: onUserLeft,
  });
  const { setNote, Note } = useChatNote();
  const [allMessages, setAllMessages] = useState([]);
  const [userInput, setUserInput] = useState({
    roomID: "public",
    senderName: null,
    senderID: null,
  });
  const userInputRef = useRef(userInput);
  const messagesRef = useRef(null);
  const messageInputRef = useRef(null);

  const handleUpdateUserInput = (newValue) => {
    setUserInput((prev) => {
      const newInput = {
        ...prev,
        ...newValue,
      };
      userInputRef.current = newInput;
      return newInput;
    });
  };

  // handle send message
  const handleSend = () => {
    // extract value from textfield
    const _message = messageInputRef.current.value;
    if (_message && _message.length > 0) {
      // send message to socket server (roomID, message, senderInfo)
      features.sendMessage(userInputRef.current.roomID, _message, userInput);
      // reset textfield
      messageInputRef.current.value = "";
    }
  };

  // on an user join a room alert
  function onUserJoin(data) {
    // only note users in the room that is going to join
    if (userInputRef.current.roomID === data.user.roomID) {
      setNote({
        message: `${data.user.senderName} has joined`,
        color: "info",
      });
    }
  }

  // on an user left room alert
  function onUserLeft(data) {
    // no need to self notification
    // only note users in the the room is going to leave
    if (
      userInputRef.current.senderName !== data.user.senderName &&
      userInputRef.current.roomID === data.user.roomID
    ) {
      setNote({
        message: `${data.user.senderName} has left`,
        color: "error",
      });
    }
  }

  // handle user leave room
  const handleLeaveRoom = (roomID) => {
    features.leaveRoom(roomID, userInputRef.current);
  };

  // handle user join room
  const handleJoinRoom = (roomID) => {
    setAllMessages([]);
    features.joinRoom(roomID, userInputRef.current);

    features.getHistoryMessages((historyMessages) => {
      setAllMessages(historyMessages);
      if (messagesRef.current) {
        setTimeout(() => {
          messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }, 0);
      }
    });
  };
  async function onReceiveMessage(data) {
    if (
      data.roomID === userInputRef.current.roomID ||
      userInputRef.current.senderName === data.senderName
    ) {
      setAllMessages((prev) => [...prev, data]);

      setTimeout(() => {
        messagesRef.current.scrollTo({
          top: messagesRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    }
  }

  const handleChangeRoom = (roomID) => {
    handleLeaveRoom(userInputRef.current.roomID);
    handleUpdateUserInput({ roomID: roomID });
    handleJoinRoom(roomID);
  };
  return (
    <Stack
      sx={{
        height: "clamp(400px, 100vh, 100vh)",
        // background: darkStyles.background.default,
      }}
    >
      <Note />
      {userInput.senderName ? (
        <>
          <Stack
            ref={messagesRef}
            height={"calc(100% - 100px)"}
            padding={1}
            gap={1}
            sx={{
              overflowY: "auto",
              position: "relative",
            }}
          >
            {allMessages.map((ms, index) => {
              return (
                <Stack
                  key={index}
                  gap={1}
                  width={"100%"}
                  direction={
                    ms.senderName === userInput.senderName
                      ? "row-reverse"
                      : "row"
                  }
                >
                  <AccountCircle sx={{ fontSize: "35px" }} />
                  <Paper
                    sx={{
                      minWidth: "200px",
                      padding: 1,
                      background:
                        ms.senderName === userInput.senderName &&
                        darkStyles.info.main,
                      borderTopRightRadius:
                        ms.senderName === userInput.senderName && 0,
                      borderTopLeftRadius:
                        ms.senderName !== userInput.senderName && 0,
                    }}
                  >
                    <Typography variant="body2" fontWeight={"bold"}>
                      {ms.senderName}
                    </Typography>
                    <Typography>{ms.message}</Typography>
                  </Paper>
                </Stack>
              );
            })}
          </Stack>
          <Divider />
          <Paper>
            <Stack direction={"row"} gap={1} height={"40px"} padding={1}>
              <Button
                size="small"
                variant={userInput.roomID === "public" && "contained"}
                onClick={() => handleChangeRoom("public")}
              >
                public
              </Button>
              <Button
                size="small"
                variant={userInput.roomID === "private" && "contained"}
                onClick={() => handleChangeRoom("private")}
              >
                private
              </Button>
            </Stack>

            <Stack gap={1} direction={"row"} height={"50px"}>
              <TextField
                size="small"
                fullWidth
                inputRef={messageInputRef}
                InputProps={{
                  startAdornment: (
                    <Paper
                      sx={{ paddingX: 2, color: "inherit", marginRight: 1 }}
                    >
                      {userInput.senderName}
                    </Paper>
                  ),
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSend();
                  }
                }}
              />
              <Button size="small" onClick={handleSend}>
                send
              </Button>
            </Stack>
          </Paper>
        </>
      ) : (
        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          padding={1}
          gap={0.5}
          minHeight={"400px"}
          minWidth={"350px"}
        >
          <TextField
            label="Who are you?"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleUpdateUserInput({ senderName: e.target.value });
                handleJoinRoom("public");
              }
            }}
          />
        </Stack>
      )}
    </Stack>
  );
}
