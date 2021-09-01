"use strict";

let socket = io();
// const startingSection = document.querySelector(".starting-section");
const homeBtn = document.querySelector(".home-btn");
let crazyButton = document.getElementById("crazyButton");

//setting variables 
let score;

const playerID = Math.random().toString(36).slice(2);

//

let winnerId;
let max = 0;
let status = {
  max: 0,
  winnerId: "",
  curentP: 0
}

let startButton = document.getElementById("startButton");
startButton.addEventListener("click", () => {
  socket.emit("startGame", playerID);
});


socket.on("startGame", hideStartBtn);
function hideStartBtn() {

  setTimeout(() => {
    // console.log(status)
    // console.log(status.max, 'max after', status.winnerId);
    // console.log(status.winnerId)
    // console.log(playerID, 'player')
    let gameOver = document.getElementById('gameOver').innerHTML = '<h1>Game Over</h1>';

    if (status.curentP > status.max) {
      let gameOver2 = document.getElementById('messageContainer').innerHTML = '<p>you are the winner</p>';

    } else {
      let gameOver2 = document.getElementById('messageContainer').innerHTML = '<p>You are too slow</p>';

    }




  }, 10000);

  let messageContainer = document.getElementById("messageContainer");
  let span = document.createElement("span");
  messageContainer.appendChild(span);
  span.setAttribute('id', `${playerID}`);

  startButton.style.display = "none";
  crazyButton.style.display = "block";
  //   startingSection.style.display = "none";
}


let bigScore1;
socket.on('newScore', bigScore => {
  // let messageSpan = document.getElementById(`${playerID}`);

  let spanName = document.getElementById('score2');
  let spanplayerName = document.getElementById('playeName');

  let span = document.createElement("span");
  // messageSpan.appendChild(span);

  Object.keys(bigScore.players).forEach(ID => {
    console.log(status.curentP, 'current')

    if (bigScore.players[ID].score > max) {
      status.max = bigScore.players[ID].score;
      status.winnerId = ID;
      console.log(status.max, 'max', status.winnerId);


    }
    let name = document.createElement('li');
    spanplayerName.appendChild(name);

    if (ID == playerID) {
      name.textContent = `${ID}///My Score: ${bigScore.players[ID].score}///`
    } else {
      name.textContent = `${ID}///${bigScore.players[ID].score}///`
    }


    socket.on('over', (queue) => {

      overWrite(queue)
    })
    function overWrite(queue) {
      // name.textContent = `${ID}///${queue.players[ID].score}///`;
      if (ID == playerID) {
        name.textContent = `${ID}///My Score: ${queue.players[ID].score}///`
      } else {
        name.textContent = `${ID}///${queue.players[ID].score}///`
      }
      // let myScore=document.getElementById('myscore').innerHTML=`<span>PlayerID:${playerID}/\My Score:${queue.players[playerID].score}</span>`
    }



    // spanName.textContent = `My Score:${bigScore.players[ID].score}  `;
  })
  // console.log(max,'max',winnerId);

  bigScore1 = bigScore


})


crazyButton.addEventListener("click", () => {
  status.curentP++;





  socket.emit("crazyClicked", {
    score: bigScore1,
    offsetLeft:
      Math.random() * (window.innerWidth - crazyButton.clientWidth - 100),
    offsetTop:
      Math.random() * (window.innerHeight - crazyButton.clientHeight - 50),
    //score
    playerID: playerID,
  });
});

socket.on("crazyClicked", (data) => {
  goCrazy(data.offsetLeft, data.offsetTop);
  updateScore(data.score, playerID);
});
function goCrazy(setLeft, setTop) {
  let top, left;

  left = setLeft;
  top = setTop;

  crazyButton.style.top = top + "px";
  crazyButton.style.left = left + "px";
  crazyButton.style.animation = "none";
}

function updateScore(score, playerID) {
  let scoreSpan = document.getElementById('score');
  console.log(score)
  // let score2=
  //${playerID}


  // scoreSpan.textContent = `  second player: ${score} `;
}


