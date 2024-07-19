import { useEffect, useState } from "react";
import { io } from "socket.io-client";

// let socket;
// class socketUtils {
//   async init({ socketApi, serverURL }) {
//     await fetch(socketApi); // Initialize the server-side socket
//     socket = io(serverURL); // Connect to the server
//     socket.on("connect", () => {
//       console.log("Connected to Socket.IO server");
//     });

//     socket.on("connect_error", (err) => {
//       console.error("Connection error: ", err);
//     });
//     // return socket;
//   }
//   receiveMessage(callbackMessage) {
//     socket.on("receive-message", (data) => {
//       callbackMessage && callbackMessage(data);
//     });
//   }
//   sendMessage(roomID, data) {
//     socket.emit("send-message", { roomKey: roomID, ...data });
//   }
//   leaveRoom(roomID) {
//     socket.emit("leave-room", roomID);
//   }
//   joinRoom(roomID, data) {
//     socket.emit("join-room", {
//       roomKey: roomID,
//       ...data,
//     });
//   }
//   getHistoryMessages(callbackHistoryMessages) {
//     socket.on("message-history", (historyMessages) => {
//       callbackHistoryMessages(historyMessages);
//     });
//   }
// }

// export default new socketUtils();

export default function useSocket({ socketApi, serverURL }, onReceiveMessage) {
  const [socket, setSocket] = useState(null);
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
    socket.on("receive-message", onReceiveMessage);
    socket.on("connect_error", (err) => {
      console.error("Connection error: ", err);
    });

    setSocket(socket);
    // const socketFeatures = {
    //   receiveMessage: (callbackMessage) => {
    //     socket.on("receive-message", (data) => {
    //       callbackMessage && callbackMessage(data);
    //     });
    //   },
    //   sendMessage: (roomID, data) => {
    //     socket.emit("send-message", { roomKey: roomID, ...data });
    //   },
    //   leaveRoom: (roomID) => {
    //     socket.emit("leave-room", roomID);
    //   },
    //   joinRoom: (roomID, data) => {
    //     socket.emit("join-room", {
    //       roomKey: roomID,
    //       ...data,
    //     });
    //   },
    //   getHistoryMessages: (callbackHistoryMessages) => {
    //     socket.on("message-history", (historyMessages) => {
    //       callbackHistoryMessages(historyMessages);
    //     });
    //   },
    // };
    // setSocket({
    //   receiveMessage: socketFeatures.receiveMessage,
    //   sendMessage: socketFeatures.sendMessage,
    //   leaveRoom: socketFeatures.leaveRoom,
    //   joinRoom: socketFeatures.joinRoom,
    //   getHistoryMessages: socketFeatures.getHistoryMessages,
    // });
  }

  return {
    features: socket
      ? {
          receiveMessage: (callbackMessage) => {
            socket.on("receive-message", (data) => {
              callbackMessage && callbackMessage(data);
            });
          },
          sendMessage: (roomID, data) => {
            socket.emit("send-message", { roomKey: roomID, ...data });
          },
          leaveRoom: (roomID) => {
            socket.emit("leave-room", roomID);
          },
          joinRoom: (roomID, data) => {
            socket.emit("join-room", {
              roomKey: roomID,
              ...data,
            });
          },
          getHistoryMessages: (callbackHistoryMessages) => {
            socket.on("message-history", (historyMessages) => {
              callbackHistoryMessages(historyMessages);
            });
          },
        }
      : null,
  };
}
