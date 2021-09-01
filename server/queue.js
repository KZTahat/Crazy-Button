"use strict";

const ioClient = require("socket.io-client");
const playerNamespace = ioClient.connect(`http://localhost:3004/player`);

const queue = {
    players:{}
}

playerNamespace.on('addPlayer', (playerID) => {
    // queue.players[playerID]
})