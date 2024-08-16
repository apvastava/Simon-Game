let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
// Initialize highest score
let highestScore = 0;

let h2 = document.querySelector("h2");
// Create and display highest score element
let highestScoreDisplay = document.createElement("h3");
highestScoreDisplay.innerText = `Highest Score: ${highestScore}`;
document.body.appendChild(highestScoreDisplay);

document.addEventListener("keypress", function () {
  if (!started) {
    console.log("Game Started");
    started = true;

    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  // Random btn choose
  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  console.log(gameSeq);
  gameFlash(randBtn);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    // Update highest score if current level is greater
    if (level > highestScore) {
      highestScore = level;
      highestScoreDisplay.innerText = `Highest Score: ${highestScore}`;
    }
    // Display game over message
    h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br>Press any key to start.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    reset();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

// Add click event listener to all buttons
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

// Reset the game
function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
