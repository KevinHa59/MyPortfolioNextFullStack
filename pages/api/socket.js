import http from "http";
import { Server } from "socket.io";

// let io;
let httpServer;

const activeUsers = {};
const rooms = {};
let currentRoomID = null;
export default async function handler(req, res) {
  if (!res.socket.server.io) {
    try {
      if (!httpServer) {
        // create http server
        httpServer = http.createServer((req, res) => {
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end("ok");
        });

        // listen to port
        httpServer.listen(443, () => {
          console.log("HTTP server running at port 443");
        });
      }

      // create new socket server with http server
      const io = new Server(httpServer, {
        cors: {
          origin: "http://localhost:3000",
          methods: ["GET", "POST"],
        },
      });
      res.socket.server.io = io;
      console.log("Socket.io server running at port 443");

      io.on("connection", (socket) => {
        console.log("new client connected");
        // join room
        onJoinRoom(socket, io);
        // join chat room
        onJoinChatRoom(socket, io);
        // leave room
        onLeaveRoom(socket, io);
        // get all active users
        onGetActiveUsers(socket, io);
        // send and broadcast data
        onSendData(socket, io);
        // send and broadcast chat message
        onSendMessage(socket, io);
        // remove all messages from a group
        onRemoveAllMessagesInRoom(socket, io);

        socket.on("disconnect", () => {
          console.log("client disconnected ", activeUsers[socket.id]);
          // send announcement to other people in room
          emitUserLeave(socket, io, currentRoomID, activeUsers[socket.id]);

          delete activeUsers[socket.id];
          // update active users to client
          emitActiveUsers(socket, io, currentRoomID);
          currentRoomID = null;
        });
      });
    } catch (error) {
      console.log("Error init socket io", error);
      res.status(500).end("Internal Server Error");
      return;
    }
  }

  res.end();
}

/////////////////////////////
/////////listeners: listen events from client//////////
/////////////////////////////
/**
 * @param {import('socket.io').Server} io
 * @param {import('socket.io').Socket} socket
 */
function onJoinRoom(socket, io) {
  socket.on("client:joinRoom", (data) => {
    // extract roomID and the rest data
    const { roomID } = data;
    currentRoomID = roomID;
    // join to given roomID
    socket.join(roomID);
    // broadcast to all other users in the room
    emitUserJoin(socket, io, roomID, data);
  });
}
/**
 * @param {import('socket.io').Server} io
 * @param {import('socket.io').Socket} socket
 */
function onJoinChatRoom(socket, io) {
  socket.on("client:joinChatRoom", (data) => {
    // extract roomID and the rest data
    const { roomID, user } = data;
    activeUsers[socket.id] = user;
    currentRoomID = roomID;
    // join to given roomID
    socket.join(roomID);
    // send announcement to other people in room
    emitUserJoinChatRoom(socket, io, roomID, user);
    // get chat history
    emitMessageHistory(socket, io, roomID);
    // update active users to client
    emitActiveUsers(socket, io, roomID);
  });
}
/**
 * @param {import('socket.io').Server} io
 * @param {import('socket.io').Socket} socket
 */
function onGetActiveUsers(socket, io) {
  socket.on("client:getActiveUsers", (data) => {
    // extract roomID and the rest data
    const { roomID } = data;
    emitActiveUsers(socket, io, roomID);
  });
}
/**
 * @param {import('socket.io').Server} io
 * @param {import('socket.io').Socket} socket
 */
function onLeaveRoom(socket, io) {
  socket.on("client:leaveRoom", (data) => {
    // extract roomID and the rest data
    const { roomID, user } = data;
    // // join to given roomID
    socket.leave(roomID);
    // send announcement to other people in room
    emitUserLeave(socket, io, roomID, user);
    // remove user
    delete activeUsers[socket.id];
    // update active users to client
    emitActiveUsers(socket, io, roomID);
    currentRoomID = null;
  });
}
/**
 * @param {import('socket.io').Server} io
 * @param {import('socket.io').Socket} socket
 */
function onSendData(socket, io) {
  socket.on("client:sendData", (obj) => {
    // extract roomID and the rest data
    const { roomID, data } = obj;
    // send announcement to other people in room
    emitData(socket, io, roomID, data);
  });
}
/**
 * @param {import('socket.io').Server} io
 * @param {import('socket.io').Socket} socket
 */
function onSendMessage(socket, io) {
  socket.on("client:sendMessage", (obj) => {
    // extract roomID and the rest data
    const { roomID, message } = obj;
    // send announcement to other people in room
    emitMessage(socket, io, roomID, message);
  });
}
/**
 * @param {import('socket.io').Server} io
 * @param {import('socket.io').Socket} socket
 */
function onRemoveAllMessagesInRoom(socket, io) {
  socket.on("client:removeAllMessagesInRoom", (obj) => {
    // extract roomID and the rest data
    const { roomID } = obj;
    rooms[roomID].messages = [];
    // send announcement to other people in room
    emitMessageHistory(socket, io, roomID);
  });
}

/////////////////////////////
///////////emits: send events to client/////////////
/////////////////////////////
/**
 * @param {import('socket.io').Server} io
 * @param {import('socket.io').Socket} socket
 */
function emitUserJoin(socket, io, roomID, data) {
  // send announcement to other people in room
  socket.to(roomID).emit("server:userJoin", data);
}
/**
 * @param {import('socket.io').Server} io
 * @param {import('socket.io').Socket} socket
 */
function emitUserJoinChatRoom(socket, io, roomID, user) {
  // send announcement to other people in room
  socket.to(roomID).emit("server:userJoinChatRoom", user);
}
/**
 * @param {import('socket.io').Server} io
 * @param {import('socket.io').Socket} socket
 */
function emitMessageHistory(socket, io, roomID) {
  // send announcement to other people in room
  if (rooms[roomID] === undefined) {
    rooms[roomID] = {
      name: roomID,
      messages: [],
    };
  }
  io.to(roomID).emit("server:messageHistory", rooms[roomID].messages);
}
/**
 * @param {import('socket.io').Server} io
 * @param {import('socket.io').Socket} socket
 */
function emitActiveUsers(socket, io, roomID) {
  // send announcement to other people in room
  const _users = Object.entries(activeUsers).map((user) => {
    const userInfo = user[1];
    return userInfo;
  });
  io.to(roomID).emit("server:activeUsers", _users);
}
/**
 * @param {import('socket.io').Server} io
 * @param {import('socket.io').Socket} socket
 */
function emitUserLeave(socket, io, roomID, user) {
  // send announcement to other people in room
  socket.to(roomID).emit("server:userLeft", user);
}
/**
 * @param {import('socket.io').Server} io
 * @param {import('socket.io').Socket} socket
 */
function emitData(socket, io, roomID, data) {
  // send announcement to other people in room
  socket.to(roomID).emit("server:data", data);
}
/**
 * @param {import('socket.io').Server} io
 * @param {import('socket.io').Socket} socket
 */
function emitMessage(socket, io, roomID, message) {
  if (roomID && rooms[roomID] === undefined) {
    rooms[roomID] = {
      name: roomID,
      messages: [],
    };
  }
  rooms[roomID].messages.push(message);
  // send announcement to other people in room
  io.to(roomID).emit("server:message", message);
}
