import { Game } from "./core/Game";
import { Mover } from "./core/Mover";

const mover = new Mover(50, 50);
const game = new Game(window.innerWidth, window.innerHeight, mover);

const blueStars =
  "https://cdn.codewizardshq.com/c44f9e7cc342cd57424a8305da41f8c457c8fcc062a7bcd2225855dbd092e9f9.png";
const purpleStars =
  "https://cdn.codewizardshq.com/92adf23f6a22359a634067ce22eb35af13e52f063ef1eb1015a9af15df45ec84.png";
const yellowStars =
  "https://cdn.codewizardshq.com/ff133f0a2556e3c4d0b4ea0e3532f43b239ed86ca3b46863a4b42ee84c249b17.png";
const backgroundGame =
  "https://cdn.codewizardshq.com/228adcd6046fe021c56f8ae41f8d70da3b9b557f807b0eb4cf82adfdb189cdac.png";

const app = document.getElementById("app");
const gameElement = createGameElement(game);
const moverElement = createMoverElement(mover);
const scoreElement = createScoreElement(game);
const startGameButton = createStartGame(game);

gameElement.append(moverElement);
gameElement.append(scoreElement);
gameElement.append(startGameButton);

app?.append(gameElement);

function createStartGame(game: Game): HTMLButtonElement {
  const startBtnGame = document.createElement("button");
  startBtnGame.style.padding = "10px 15px";
  startBtnGame.innerText = "Start Again";
  startBtnGame.style.position = "absolute";
  startBtnGame.style.bottom = "-38px";
  startBtnGame.style.left = "0";
  return startBtnGame;
}

function createGameElement(game: Game): HTMLDivElement {
  const gameElement = document.createElement("div");
  gameElement.setAttribute("id", "galactic");
  gameElement.style.width = game.width + "px";
  gameElement.style.height = game.height + "px";
  gameElement.style.background = `url(${backgroundGame})`;
  gameElement.style.backgroundSize = "cover";
  gameElement.style.position = "relative";
  return gameElement;
}

function createMoverElement(mover: Mover): HTMLDivElement {
  const moverElement = document.createElement("img");
  moverElement.setAttribute("id", "mover");
  moverElement.setAttribute("src", blueStars);
  moverElement.setAttribute("alt", "icon star");
  moverElement.style.width = mover.width + "px";
  moverElement.style.height = mover.height + "px";
  moverElement.style.position = "absolute";
  moverElement.style.transition = "left 0.5s ease-in, top 0.5s ease-in-out";
  moverElement.style.transform = "translate(-15px, 15px)";
  return moverElement;
}

function createScoreElement(game: Game): HTMLDivElement {
  const scoreElement = document.createElement("div");
  scoreElement.style.position = "absolute";
  scoreElement.style.right = "10px";
  scoreElement.style.bottom = "5px";
  scoreElement.style.color = "#fff";
  scoreElement.style.fontSize = "30px";
  scoreElement.innerText = game.score.toString();
  return scoreElement;
}

function addListeners(): void {
  moverElement.addEventListener("click", () => {
    game.addScore();
    render();
  });

  const threshold = 60;

  gameElement.addEventListener("mousemove", function (event) {
    console.log(event.clientX, event.clientY);
    if (
      Math.abs(event.clientX - mover.x) < threshold &&
      Math.abs(event.clientY - mover.y) < threshold
    ) {
      console.log("x: ", event.clientX, mover.x, "y: ", event.clientY, mover.y);
      console.log(Math.abs(event.clientX - mover.x), threshold);
      game.moveMover();
      console.log("move!");
    }
  });

  moverElement.addEventListener("click", function (e) {
    console.log(e);
  });
}

function startGameAgainBtn(): void {
  startGameButton.addEventListener("click", () => {
    game.score = 0;
    scoreElement.innerText = "0";
    moverElement.style.display = "block";
    const interval = setInterval(() => {
      game.moveMover();
      render();
      if (Number(game.score) > 3) {
        clearInterval(interval);
        startGameButton.style.display = "block";
        moverElement.style.display = "none";
      }
    }, 1000);
  });
}

function changeColorMover() {
  if (mover.x <= 160 || mover.y >= 150) {
    moverElement.setAttribute("src", purpleStars);
  }
  if (mover.y > 150) {
    moverElement.setAttribute("src", yellowStars);
  }
  if (mover.x > 160) {
    moverElement.setAttribute("src", blueStars);
  }
}

function render() {
  moverElement.style.left = mover.x + "px";
  moverElement.style.top = mover.y + "px";
  scoreElement.innerText = game.score.toString();
  startGameButton.style.display = "none";

  changeColorMover();
}

render();

const intervalId = setInterval(() => {
  //game.moveMover();

  render();
  if (Number(scoreElement.textContent) > 3) {
    clearInterval(intervalId);

    moverElement.style.display = "none";
    startGameButton.style.display = "block";

    startGameAgainBtn();
  }
}, 1000);

addListeners();
