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
import { getCookie } from "cookies-next";
import React, { useEffect, useRef, useState } from "react";
import { darkStyles } from "../../theme/dark-theme-options";
import { AccountCircle } from "@mui/icons-material";
import _ from "lodash";
import socketUtils from "../../hooks/use-socket";
import useSocket from "../../hooks/use-socket";

export default function ChatBox() {
  const { features } = useSocket(
    {
      socketApi: "/api/socket",
      serverURL: "http://localhost:443",
    },
    handleReceiveMessage
  );
  const [allMessages, setAllMessages] = useState([]);
  const [userInput, setUserInput] = useState({
    room: "public",
    senderName: null,
    senderID: null,
    message: "",
  });
  const userInputRef = useRef(userInput);
  const messagesRef = useRef(null);

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

  const handleSend = () => {
    features.sendMessage(userInput.room, userInput);
    handleUpdateUserInput({ message: "" });
  };

  const handleJoinRoom = (roomKey) => {
    setAllMessages([]);
    features.leaveRoom(userInputRef.current.room);
    features.joinRoom(roomKey, userInput);
    features.getHistoryMessages((historyMessages) => {
      setAllMessages(historyMessages);
      if (messagesRef.current) {
        setTimeout(() => {
          messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }, 0);
      }
    });
  };
  async function handleReceiveMessage(data) {
    if (
      data.roomKey === userInputRef.current.room ||
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

  const handleChangeRoom = (roomKey) => {
    handleUpdateUserInput({ room: roomKey });
    handleJoinRoom(roomKey);
  };
  return (
    <Stack
      sx={{
        height: "clamp(400px, 100vh, 100vh)",
        // background: darkStyles.background.default,
      }}
    >
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
            {/* <Fade in={userJoinNotification !== null}>
              <Typography
                textAlign={"right"}
                variant="body2"
                sx={{
                  opacity: 0.3,
                  position: "fixed",
                  top: 0,
                  left: "50%",
                }}
              >
                {userJoinNotification || ""}
              </Typography>
            </Fade> */}
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
                variant={userInput.room === "public" && "contained"}
                onClick={() => handleChangeRoom("public")}
              >
                public
              </Button>
              <Button
                size="small"
                variant={userInput.room === "private" && "contained"}
                onClick={() => handleChangeRoom("private")}
              >
                private
              </Button>
            </Stack>

            <Stack gap={1} direction={"row"} height={"50px"}>
              <TextField
                size="small"
                fullWidth
                value={userInput.message}
                InputProps={{
                  startAdornment: (
                    <Paper
                      sx={{ paddingX: 2, color: "inherit", marginRight: 1 }}
                    >
                      {userInput.senderName}
                    </Paper>
                  ),
                }}
                onChange={(e) =>
                  handleUpdateUserInput({ message: e.target.value })
                }
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
