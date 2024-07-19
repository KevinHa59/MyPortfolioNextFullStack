import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function useSocket({
  socketApi = "/api/socket",
  serverURL = "http://localhost:443",
  events: {
    joinRoom,
    leaveRoom,
    sendMessage,
    sendData,
    receiveMessage,
    receiveData,
    userJoin,
    userLeft,
    messageHistory,
  },
  defaultRoom = null,
  onReceiveData,
  onReceiveMessage,
  onUserJoin,
  onUserLeft,
}) {
  const [socket, setSocket] = useState(null);
  const events = {
    joinRoom: joinRoom || "join-room",
    leaveRoom: leaveRoom || "leave-room",
    sendMessage: sendMessage || "send-message",
    sendData: sendData || "send-data",
    receiveMessage: receiveMessage || "receive-message",
    receiveData: receiveData || "receive-data",
    userJoin: userJoin || "user-join",
    userLeft: userLeft || "user-left",
    messageHistory: messageHistory || "message-history",
  };
  useEffect(() => {
    init();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []); // Run only once on mount

  async function init() {
    await fetch(socketApi); // Initialize the server-side socket
    const socket = io(serverURL); // Connect to the server
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });
    socket.on(events.receiveMessage, onReceiveMessage);
    onReceiveData && socket.on(events.receiveData, onReceiveData);
    onUserJoin && socket.on(events.userJoin, onUserJoin);
    onUserLeft && socket.on(events.userLeft, onUserLeft);
    socket.on("connect_error", (err) => {
      console.error("Connection error: ", err);
    });
    if (defaultRoom) {
      socket.emit(events.joinRoom, { roomID: defaultRoom });
    }
    setSocket(socket);
  }

  return {
    features: socket
      ? {
          receiveMessage: (callbackMessage) => {
            socket.on(events.receiveMessage, (data) => {
              callbackMessage && callbackMessage(data);
            });
          },
          sendMessage: (roomID, message, senderInfo) => {
            socket.emit(events.sendMessage, {
              roomID: roomID,
              ...senderInfo,
              message: message,
            });
          },
          sendData: (roomID, data) => {
            socket.emit(events.sendData, {
              roomID: roomID,
              data: data,
            });
          },
          leaveRoom: (roomID, userInfo) => {
            socket.emit(events.leaveRoom, { roomID: roomID, ...userInfo });
          },
          joinRoom: (roomID, userInfo) => {
            socket.emit(events.joinRoom, {
              roomID: roomID,
              ...userInfo,
            });
          },
          getHistoryMessages: (callbackHistoryMessages) => {
            socket.on(events.messageHistory, (historyMessages) => {
              callbackHistoryMessages(historyMessages);
            });
          },
        }
      : null,
  };
}
