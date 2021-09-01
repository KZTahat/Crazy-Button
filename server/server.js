"use strict";

const path = require("path");
const http = require("http");
const express = require("express");
const socket_io = require("socket.io");

const publicPath = path.join(__dirname, "/../public");
const port = process.env.PORT || 3004;

let app = express();
let server = http.createServer(app);
let io = socket_io(server);
let queueServer = io.of('/player');

app.use(express.static(publicPath));

io.on("connection", (socket) => {
  console.log("A user just connected");
  io.emit('showMessage')

  socket.on("startGame", (playerID) => {
    queueServer.emit('addPlayer', playerID);
    io.emit("startGame");
  });
  
  socket.on("crazyClicked", (data) => {
      io.emit('crazyClicked', data);
  });

  socket.on("disconnect", () => {
    console.log("A user has disconnected");
  });

});

queueServer.on('connection', () => {
    console.log('queue is connected');


})

server.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
