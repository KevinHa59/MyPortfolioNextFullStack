import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const socketContext = createContext();

// predefined events
const events = {
  joinRoom: "join-room",
  joinChatRoom: "join-chat-room",
  leaveRoom: "leave-room",
  sendMessage: "send-message",
  sendData: "send-data",
  receiveData: "receive-data",
  receiveMessage: "receive-message",
  messageHistory: "message-history",
  userJoin: "user-join",
  userJoinChatRoom: "user-join-chat-room",
  userLeft: "user-left",
};

const socketApi = "/api/socket";
const serverURL = "http://localhost:443";

export const useSocket = () => {
  const { socket, listeners, emits } = useContext(socketContext);
  return {
    socket: socket,
    listeners: {
      onReceiveData: listeners.onReceiveData,
      onUserJoin: listeners.onUserJoin,
      onUserLeft: listeners.onUserLeft,
      onMessageHistory: listeners.onMessageHistory,
      onReceiveMessage: listeners.onReceiveMessage,
      onUserJoinChatRoom: listeners.onUserJoinChatRoom,
    },
    emits: {
      joinRoom: emits.joinRoom,
      joinChatRoom: emits.joinChatRoom,
      leaveRoom: emits.leaveRoom,
      sendData: emits.sendData,
      sendMessage: emits.sendMessage,
    },
    events,
  };
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  // init socket
  useEffect(() => {
    init();
  }, []);

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
    // listen from "send-data" event
    onReceiveData: (callback) => {
      if (socket) socket.on(events.receiveData, callback);
    },
    // listen from "user-join" event
    onUserJoin: (callback) => {
      if (socket) socket.on(events.userJoin, callback);
    },
    // listen from "user-leave" event
    onUserLeft: (callback) => {
      if (socket) socket.on(events.userLeft, callback);
    },
    // listen from "user-join-chat-room" event
    onMessageHistory: (callback) => {
      if (socket) socket.on(events.messageHistory, callback);
    },
    // listen from "send-message" event
    onReceiveMessage: (callback) => {
      if (socket) socket.on(events.receiveMessage, callback);
    },
    // listen from "user-join-chat-room" event
    onUserJoinChatRoom: (callback) => {
      if (socket) socket.on(events.userJoinChatRoom, callback);
    },
  };

  const emits = {
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
    // input: roomID and message details {sender: {senderID, firstName, lastName}, message, sendDatetime}
    sendMessage: (
      roomID,
      { sender: { senderID, firstName, lastName }, message, sendDatetime }
    ) => {
      if (socket)
        socket.emit(events.sendMessage, {
          roomID: roomID,
          message: {
            sender: { senderID, firstName, lastName },
            message,
            sendDatetime,
          },
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
