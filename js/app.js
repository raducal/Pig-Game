class UI {
  constructor(dice, input) {
    this.dice = dice;
    this.activePlayer = 0;
    this.roundScore = 0;
    this.scores = [0, 0];
    this.input = input;
  }

  getRandomNumber() {
    const random = Math.floor(Math.random() * 6) + 1;
    this.rollDice(random);
    this.changeScore(random);
  }

  rollDice(random) {
    this.dice.classList.add("active");
    let URL = `images/dice-${random}.png`;
    this.dice.src = URL;
  }

  changeScore(random) {
    const currentPlayer = document.querySelector(
      `.current-player-${this.activePlayer}`
    );
    if (random !== 1) {
      this.roundScore += random;
      currentPlayer.textContent = this.roundScore;
    } else {
      console.log("nope");
      this.nextPlayer();
      console.log(this.activePlayer);
    }
  }

  nextPlayer() {
    const player1 = document.querySelector(".current-player-0");
    const player2 = document.querySelector(".current-player-1");

    if (this.activePlayer === 0) {
      this.activePlayer = 1;
      this.roundScore = 0;
    } else {
      this.activePlayer = 0;
      this.roundScore = 0;
    }

    player1.textContent = "0";
    player2.textContent = "0";
  }

  addScore() {
    this.scores[this.activePlayer] += this.roundScore;
    const playerScore = document.querySelector(
      `.player-${this.activePlayer}-score`
    );

    playerScore.textContent = this.scores[this.activePlayer];
  }

  checkWinner() {
    if (this.scores[this.activePlayer] >= parseInt(this.input.value)) {
      console.log("you win");
      document.querySelector(
        ".congrats-player"
      ).textContent = `Congrats, Player ${this.activePlayer}`;
      document.querySelector(".message-1").textContent = "YOU WIN";
      document.querySelector(".modal").classList.add("active");
      this.init();
    } else {
      this.nextPlayer();
    }
  }

  init() {
    document.querySelector(".message-2").textContent = "Enter Winning Score";
    document.querySelector(".modal").classList.add("active");
    document.querySelector("input").classList.add("active");
    document.querySelector(".btn-modal").classList.add("active");
    document.querySelector(`.player-0-score`).textContent = "0";
    document.querySelector(`.player-1-score`).textContent = "0";
    document.querySelector(".current-player-0").textContent = "0";
    document.querySelector(".current-player-1").textContent = "0";
    this.dice.classList.remove("active");
    this.roundScore = 0;
    this.input.value = "";
    this.activePlayer = 0;
    this.scores = [0, 0];
  }

  checkScoreValue() {
    if (parseInt(this.input.value) > 0) {
      document.querySelector(".modal").classList.remove("active");
    } else {
      console.log("nope");
    }
  }
}

function eventListeners() {
  const btnRoll = document.querySelector(".btn-roll");
  const btnHold = document.querySelector(".btn-hold");
  const btnModal = document.querySelector(".btn-modal");

  const form = document.querySelector("form");

  const input = document.querySelector(".score-input");

  let dice = document.querySelector(".dice img");

  const ui = new UI(dice, input);

  ui.init();

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    ui.checkScoreValue();
  });

  btnRoll.addEventListener("click", function() {
    ui.getRandomNumber();
  });

  btnHold.addEventListener("click", function() {
    ui.addScore();
    ui.checkWinner();
  });
}

document.addEventListener("DOMContentLoaded", eventListeners);
