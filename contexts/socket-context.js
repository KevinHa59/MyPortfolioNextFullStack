import { Paper, Slide, Stack } from "@mui/material";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Message } from "@mui/icons-material";
import ButtonDialog from "../components/widgets/buttons/button_dialog";
import ChatBox from "../components/widgets/chat/chat-box";

const socketContext = createContext();

// predefined events
const events = {
  // events from clients
  getActiveUsers: "client:getActiveUsers",
  joinRoom: "client:joinRoom",
  joinChatRoom: "client:joinChatRoom",
  leaveRoom: "client:leaveRoom",
  sendMessage: "client:sendMessage",
  sendData: "client:sendData",
  removeAllMessageInRoom: "client:removeAllMessagesInRoom",
  // events from server
  receiveActiveUsers: "server:activeUsers",
  receiveData: "server:data",
  receiveMessage: "server:message",
  messageHistory: "server:messageHistory",
  userJoin: "server:userJoin",
  userJoinChatRoom: "server:userJoinChatRoom",
  userLeft: "server:userLeft",
};

const socketApi = "/api/socket";
const serverURL = "http://localhost:443";

// custom useSocket hook
export const useSocket = () => {
  const { socket, listeners, emits } = useContext(socketContext);

  return {
    socket: socket,
    listeners: {
      onReceiveActiveUsers: listeners.onReceiveActiveUsers,
      onReceiveData: listeners.onReceiveData,
      onUserJoin: listeners.onUserJoin,
      onUserLeft: listeners.onUserLeft,
      onMessageHistory: listeners.onMessageHistory,
      onReceiveMessage: listeners.onReceiveMessage,
      onUserJoinChatRoom: listeners.onUserJoinChatRoom,
    },
    emits: {
      getActiveUsers: (roomID) => emits.getActiveUsers(roomID),
      joinRoom: (roomID) => emits.joinRoom(roomID),
      joinChatRoom: (roomID, { userID, firstName, lastName }) =>
        emits.joinChatRoom(roomID, { userID, firstName, lastName }),
      leaveRoom: (roomID, { userID, firstName, lastName }) =>
        emits.leaveRoom(roomID, { userID, firstName, lastName }),
      sendData: (roomID, data) => emits.sendData(roomID, data),
      sendMessage: (
        roomID,
        { sender: { senderID, firstName, lastName }, message }
      ) =>
        emits.sendMessage(roomID, {
          sender: { senderID, firstName, lastName },
          message,
        }),
      removeAllMessageInRoom: (roomID) => emits.removeAllMessageInRoom(roomID),
    },
    events,
  };
};

// socket provider
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  // init socket
  useEffect(() => {
    if (socket === null) {
      init();
    }
  }, [socket]);

  async function init() {
    await fetch(socketApi); // init server
    const socket = io(serverURL); // connect to server
    // socket connect
    socket.on("connect", () => {
      console.log("Connected to Socket.io server");
    });

    socket.on("connect_error", (err) => {
      console.error("Connection error: ", err);
    });
    setSocket(socket);
  }

  // event listeners listen to socket server event
  const listeners = {
    // listen from "client:sendData" event
    onReceiveActiveUsers: (callback) => {
      if (socket) socket.on(events.receiveActiveUsers, callback);
    },
    // listen from "client:sendData" event
    onReceiveData: (callback) => {
      if (socket) socket.on(events.receiveData, callback);
    },
    // listen from "server:userJoin" event
    onUserJoin: (callback) => {
      if (socket) socket.on(events.userJoin, callback);
    },
    // listen from "user-leave" event
    onUserLeft: (callback) => {
      if (socket) socket.on(events.userLeft, callback);
    },
    // listen from "server:userJoinChatRoom" event
    onMessageHistory: (callback) => {
      if (socket) socket.on(events.messageHistory, callback);
    },
    // listen from "client:sendMessage" event
    onReceiveMessage: (callback) => {
      if (socket) socket.on(events.receiveMessage, callback);
    },
    // listen from "server:userJoinChatRoom" event
    onUserJoinChatRoom: (callback) => {
      if (socket) socket.on(events.userJoinChatRoom, callback);
    },
  };

  const emits = {
    // join room function
    getActiveUsers: (roomID) => {
      if (socket) socket.emit(events.getActiveUsers, { roomID });
    },
    // join room function
    // input: roomID
    joinRoom: (roomID) => {
      if (socket)
        socket.emit(events.joinRoom, {
          roomID,
        });
    },
    // join chat room
    // input: roomID and user details
    joinChatRoom: (roomID, { userID, firstName, lastName }) => {
      if (socket)
        socket.emit(events.joinChatRoom, {
          roomID,
          user: {
            userID,
            firstName,
            lastName,
          },
        });
    },
    // leave room
    // input: roomID and/or user info
    leaveRoom: (roomID, { userID, firstName, lastName }) => {
      if (socket)
        socket.emit(events.leaveRoom, {
          roomID,
          user: {
            userID,
            firstName,
            lastName,
          },
        });
    },
    // send data
    // input: roomID and data need to send to other user in room
    sendData: (roomID, data) => {
      if (socket)
        socket.emit(events.sendData, {
          roomID: roomID,
          data: data,
        });
    },
    // send message
    // input: roomID and message details {sender: {senderID, firstName, lastName}, message}
    sendMessage: (
      roomID,
      { sender: { senderID, firstName, lastName }, message }
    ) => {
      if (socket)
        socket.emit(events.sendMessage, {
          roomID: roomID,
          message: {
            sender: { senderID, firstName, lastName },
            message,
            sendDatetime: new Date().toLocaleString("en-US"),
          },
        });
    },
    // send data
    // input: roomID and data need to send to other user in room
    removeAllMessageInRoom: (roomID) => {
      if (socket)
        socket.emit(events.removeAllMessageInRoom, {
          roomID: roomID,
        });
    },
  };

  return (
    <socketContext.Provider
      value={{
        socket: socket,
        listeners: listeners,
        emits: emits,
      }}
    >
      {children}
    </socketContext.Provider>
  );
};

// public chat component button
export function DirectMessageButton() {
  const session = useSession();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleOpen = () => {
    if (session.data.user && user === null) {
      setUser({
        EmployeeID: session.data.user.employeeID,
        FirstName: session.data.user.fname,
        LastName: session.data.user.lname,
      });
    }
    setOpen(true);
  };

  return (
    <Stack paddingX={2}>
      <ButtonDialog
        isCloseOnClickOut={false}
        open={open}
        onClose={() => setOpen(false)}
        onClick={handleOpen}
        button_label={<Message />}
        color={"info"}
        variant={"contained"}
        sx_button={{
          padding: 0,
          minWidth: 0,
          width: "50px",
          height: "50px",
          borderRadius: "50%",
        }}
        sx_dialog={{
          display: "flex",
          justifyContent: "flex-end",
          maxWidth: "100vw",
          padding: 0,
          borderRadius: 0,
        }}
        paperProps={{
          style: {
            height: "100%",
            maxHeight: "100%",
            maxWidth: "100%",
            margin: 0,
            background: "transparent",
            borderRadius: 0,
          },
        }}
      >
        <Slide in={true} direction="left">
          <Paper
            variant="outlined"
            sx={{
              height: "100%",
              width: "clamp(300px, 100vw, 500px)",
              borderRadius: 0,
            }}
          >
            {user && <ChatBox user={user} onClose={() => setOpen(false)} />}
          </Paper>
        </Slide>
      </ButtonDialog>
    </Stack>
  );
}
