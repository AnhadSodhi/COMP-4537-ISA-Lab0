import { GameController } from "./gameController.js";

const game = new GameController();
document.getElementById("go-button").addEventListener("click", () => game.startGame());
