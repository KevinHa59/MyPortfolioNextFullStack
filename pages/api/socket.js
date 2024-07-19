// pages/api/socket.js
import { Server } from "socket.io";
import http from "http";

let io;
// store all rooms and messages
const rooms = {};
export default async function handler(req, res) {
  if (!io) {
    try {
      // Create an HTTP server
      const httpServer = http.createServer((req, res) => {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("okay");
      });

      // Attach socket to the HTTP server
      io = new Server(httpServer, {
        cors: {
          origin: "http://localhost:3000", // client url
          methods: ["GET", "POST"], // allow methods
        },
      });

      // socket listen on port 443
      httpServer.listen(443, () => {
        console.log("Socket.IO server listening on port 443");
      });

      // connect and define message types
      io.on("connection", (socket) => {
        console.log("New client connected");
        // join room and get message history
        joinRoomAndGetMessageHistory(socket, rooms);
        // leave room
        leaveRoom(socket);
        // send and broadcast message
        sendAndBroadcastMessage(io, socket, rooms);
        // send and broadcast data
        sendAndBroadcastData(io, socket);

        socket.on("disconnect", () => {
          console.log("Client disconnected");
        });
      });

      console.log("Socket.IO server initialized");
    } catch (error) {
      console.error("Error initializing Socket.IO server:", error);
      res.status(500).end("Internal Server Error");
      return;
    }
  }

  res.end();
}
/**
 * @param {import('socket.io').Server} io
 * @param {import('socket.io').Socket} socket
 */
// join room and get history message
function joinRoomAndGetMessageHistory(socket, rooms) {
  socket.on("join-room", (data) => {
    const { roomID, ...userInfo } = data;
    //  join room
    socket.join(roomID);
    // retrieve all messages from that room key
    if (rooms[roomID] && rooms[roomID].messages.length > 0) {
      socket.emit("message-history", rooms[roomID].messages);
    }

    // send notification
    socket.to(roomID).emit("user-join", { user: data });
  });
}

/**
 * @param {import('socket.io').Server} io
 * @param {import('socket.io').Socket} socket
 */
// leave room
function leaveRoom(socket) {
  socket.on("leave-room", (data) => {
    const { roomID, ...userInfo } = data;
    socket.to(roomID).emit("user-left", { user: data });
  });
}

/**
 * @param {import('socket.io').Server} io
 * @param {import('socket.io').Socket} socket
 */
// send message
function sendAndBroadcastMessage(io, socket, rooms) {
  socket.on("send-message", (obj) => {
    const { roomID, ...rest } = obj;
    if (!rooms[roomID]) {
      rooms[roomID] = { messages: [] };
    }
    rooms[roomID].messages.push(rest);
    // type receive-message
    // receive signal with type "receive-message" from all users when "send-message" done
    io.to(roomID).emit("receive-message", { roomID, ...rest }); // Emit to all connected sockets
  });
}

/**
 * @param {import('socket.io').Server} io
 * @param {import('socket.io').Socket} socket
 */
function sendAndBroadcastData(io, socket) {
  socket.on("send-data", (obj) => {
    const { roomID, data } = obj;
    io.to(roomID).emit("receive-data", data);
  });
}
