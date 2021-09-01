"use strict";

let socket = io();
// const startingSection = document.querySelector(".starting-section");
const homeBtn = document.querySelector(".home-btn");
let crazyButton = document.getElementById("crazyButton");

//setting variables 
let score;
  
const playerID = Math.random().toString(36).slice(2);

//
let startButton = document.getElementById("startButton");
startButton.addEventListener("click", () => {
  socket.emit("startGame", playerID);
});

// socket.on("showMessage", () => {
//   let messageContainer = document.getElementById("messageContainer");
//   messageContainer.innerHTML = "<h2> new player Connected </h2>";
//   setTimeout(() => {
//     messageContainer.innerHTML = "";
//   }, 3000);
// });

socket.on("startGame", hideStartBtn);
function hideStartBtn() {
  
  let messageContainer = document.getElementById("messageContainer");
  let span = document.createElement("span");
  messageContainer.appendChild(span);
  span.setAttribute('id',`${playerID}`);

  startButton.style.display = "none";
  crazyButton.style.display = "block";
//   startingSection.style.display = "none";
}

crazyButton.addEventListener("click", () => {
  // score++;
  // console.log(bigScore,'newwww ssssss')

  let messageSpan = document.getElementById(`${playerID}`);

  let bigScore1;
  socket.on('newScore',bigScore=>{
    Object.keys(bigScore.players).forEach(playerID=>{
      let span = document.createElement("span");
      messageSpan.appendChild(span);

      span.textContent = `My Score: ${bigScore.players[playerID].score}  `;
    })
    bigScore1=bigScore
    console.log(bigScore1,'this is bigScore1')

    
  })




  socket.emit("crazyClicked", {
    score:bigScore1,
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
