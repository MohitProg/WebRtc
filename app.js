import express from "express";
import http from "http";
import { Server } from "socket.io";
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("user is connected ", socket.id);

  // getting offer

  socket.on("offer", (data) => {
 
    socket.broadcast.emit("offer", data);
  });

  // gtting ICE candidate value
  socket.on("candidate", (data) => {
    socket.broadcast.emit("candidate", data);
  });

  // getiing asnwer and sending it to another user
  socket.on("answer", (data) => {
    console.log(data);
    socket.broadcast.emit("answer", data);
  });

  // disconnect
  socket.on("disconnect", () => {
    console.log("A user is disconnected", socket.id);
  });
});

server.listen(8000, () => {
  console.log("Server is started");
});
