"use trict";
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const currentScore0 = document.getElementById("current--0");
const currentScore1 = document.getElementById("current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const diceEl = document.querySelector(".dice");
const newBtn = document.querySelector(".btn--new");
const rollBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");
const howToPlayBtn = document.querySelector(".btn--htp");
const closeBtnModal = document.querySelector(".close-modal-js");
const overplay = document.querySelector(".over-play");
const modal = document.querySelector(".open-modal");

function closeModal() {
  modal.classList.add("hidden");
  overplay.classList.add("hidden");
}

function openModal() {
  modal.classList.remove("hidden");
  overplay.classList.remove("hidden");
}

howToPlayBtn.addEventListener("click", openModal);

closeBtnModal.addEventListener("click", closeModal);
overplay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// 1.Bắt đầu game
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
};

init();

const swichPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};
diceEl.classList.add("hidden");

// 2. Khi chơi
// a)  Số ngẫu nhiên

rollBtn.addEventListener("click", function () {
  if (playing) {
    let dice = Math.trunc(Math.random() * 6 + 1);

    // b) Add math random vào hình ảnh
    diceEl.classList.remove("hidden");
    diceEl.src = `/IMG/dice-${dice}.png`;
    if (dice !== 1) {
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore += dice;
    } else {
      // Swich to the next player
      swichPlayer();
    }
  }
});

// 1.Add current score to the active player's score

holdBtn.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2.Check if the player's score is >=100
    //Finish the game
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //Swich to the next player
      swichPlayer();
    }
  }
});

newBtn.addEventListener("click", init);
