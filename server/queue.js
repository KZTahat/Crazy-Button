"use strict";

const ioClient = require("socket.io-client");
const playerNamespace = ioClient.connect(`http://localhost:3004/player`);

const queue = {
    players: {}
}

playerNamespace.on('addPlayer', (playerID) => {
    queue.players[playerID] = {
        score: 0,
    }

    console.log('score', queue.players[playerID].score);
    console.log(playerID, 'llllll');
})

playerNamespace.on('updateScore', playerID => {
    console.log(playerID, 'plaaaaa')
    queue.players[playerID].score++;

    console.log(queue.players[playerID].score, 'scoreeeee');
    
    console.log(queue);

    playerNamespace.emit('newScore',queue)
        
 



})