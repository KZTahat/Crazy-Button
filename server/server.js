"use strict";

const path = require("path");
const http = require("http");
const express = require("express");
const socket_io = require("socket.io");

const uuid = require('uuid').v4;// random uuid




const publicPath = path.join(__dirname, "/../public");
const port = process.env.PORT || 3004;

let app = express();
let server = http.createServer(app);
let io = socket_io(server);
let queueServer = io.of('/player');


let score;
app.use(express.static(publicPath));

io.on("connection", (socket) => {
  console.log("A user just connected");
  io.emit('showMessage')

  socket.on("startGame", (playerID) => {

    queueServer.emit('addPlayer', playerID);

    io.emit("startGame");
  });

  socket.on("crazyClicked", (data) => {
    // data.score++;


    io.on('newScore', (score) => {
      console.log(score.score, 'newwwwwwwwwwww')
    })
    // console.log('score in crazy ', data.score)   

    queueServer.emit('updateScore', data.playerID)
    io.emit('crazyClicked', data);
    console.log(data, 'data in crazy')
  });

  socket.on("disconnect", () => {
    console.log("A user has disconnected");
  });

});

queueServer.on('connection', socket => {
  console.log('queue is connected');
  let bigScore;

  socket.on('newScore', score => {
    console.log(score, 'score from q')
    bigScore = score;
    io.emit('newScore',bigScore)
  })
  // socket.emit('addPlayer',payload)


})





server.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
