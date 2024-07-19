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

        // type: join-room
        // join a room by roomKey, public room by default
        socket.on("join-room", (data) => {
          const { roomKey, ...userInfo } = data;
          //  join room
          socket.join(roomKey);
          // retrieve all messages from that room key
          if (rooms[roomKey] && rooms[roomKey].messages.length > 0) {
            socket.emit("message-history", rooms[roomKey].messages);
          }

          // send notification
          socket.to(roomKey).emit("user-join", { joinUser: userInfo });
        });

        socket.on("leave-room", (roomKey) => {
          socket.leave(roomKey);
          socket.to(roomKey).emit("user-left", { userId: socket.id });
        });

        // type: send message
        // send message to other people in the same room key
        socket.on("send-message", (obj) => {
          const { roomKey, ...rest } = obj;
          if (!rooms[roomKey]) {
            rooms[roomKey] = { messages: [] };
          }
          rooms[roomKey].messages.push(rest);
          // type receive-message
          // receive signal with type "receive-message" from all users when "send-message" done
          io.to(roomKey).emit("receive-message", { roomKey, ...rest }); // Emit to all connected sockets
        });

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
