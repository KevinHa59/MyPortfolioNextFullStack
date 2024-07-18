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
import { io } from "socket.io-client";
import { darkStyles } from "../../theme/dark-theme-options";
import {
  AccountBoxRounded,
  AccountCircle,
  Person,
  Person2Rounded,
} from "@mui/icons-material";

let socket;
export default function ChatBox() {
  const [allMessages, setAllMessages] = useState([]);
  const [userInput, setUserInput] = useState({
    roomKey: "public",
    senderName: null,
    senderID: null,
    message: "",
  });
  const [userJoinNotification, setUserJoinNotification] = useState(null);
  const messagesRef = useRef(null);
  useEffect(() => {
    // initUser();
    socketInit();
  }, []);

  //   const initUser = () => {
  //     let userInfo = getCookie("user");
  //     if (userInfo) {
  //       userInfo = JSON.parse(userInfo);
  //       handleUpdateUserInput({
  //         senderName: `${userInfo.firstName} ${userInfo.lastName}`,
  //         senderID: userInfo.id,
  //       });
  //     }
  //   };

  const handleUpdateUserInput = (newValue) => {
    setUserInput((prev) => {
      return {
        ...prev,
        ...newValue,
      };
    });
  };

  const handleSend = () => {
    console.log(userInput);
    socket.emit("send-message", userInput);
    setUserInput((prev) => ({
      ...prev,
      message: "",
    }));
  };

  const handleJoinRoom = (roomKey, user = null) => {
    setAllMessages([]);
    setUserJoinNotification(null);
    console.log(userInput.senderName, roomKey);
    socket.emit("join-room", {
      roomKey,
      userInfo: user ? user : userInput.senderName,
    });

    socket.on("message-history", (historyMessages) => {
      setAllMessages(historyMessages);
      if (messagesRef.current) {
        setTimeout(() => {
          messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }, 0);
      }
    });

    socket.on("user-join", ({ joinUser }) => {
      if (roomKey === userInput.roomKey) {
        setUserJoinNotification(`${joinUser} joined room`);
        setTimeout(() => {
          setUserJoinNotification(null);
        }, 3000);
      }
    });
  };

  async function socketInit() {
    await fetch("/api/socket"); // Initialize the server-side socket
    socket = io("http://localhost:443"); // Connect to the server
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });
    socket.on("receive-message", (data) => {
      console.log("receive", data, userInput);
      if (data.roomKey === userInput.roomKey) {
        setAllMessages((prev) => [...prev, data]);

        setTimeout(() => {
          messagesRef.current.scrollTo({
            top: messagesRef.current.scrollHeight,
            behavior: "smooth",
          });
        }, 100);
      }
    });

    socket.on("connect_error", (err) => {
      console.error("Connection error: ", err);
    });
  }

  const handleChangeRoom = (roomKey) => {
    handleUpdateUserInput({ roomKey: roomKey });
    handleJoinRoom(roomKey, userInput.senderName);
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
            <Fade in={userJoinNotification !== null}>
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
            </Fade>
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
                variant={userInput.roomKey === "public" && "contained"}
                onClick={() => handleChangeRoom("public")}
              >
                public
              </Button>
              <Button
                size="small"
                variant={userInput.roomKey === "private" && "contained"}
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
                handleJoinRoom("public", e.target.value);
              }
            }}
          />
        </Stack>
      )}
    </Stack>
  );
}
