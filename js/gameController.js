import { Button } from "./button.js";
import { UIManager } from "./uiManager.js";

const MOVE_INTERVAL = 2000; // wait 2 seconds before moving the blocks when scrambling

export class GameController {
    constructor() {
        this.buttonArray = [];
        this.gameInProgress = false;
        this.expectedOrder = 1;
        this.clickable = false; // cannot click until scrambling is over
        UIManager.populateText();
    }

    startGame() {
        const inputNum = UIManager.validateInput()
        if (inputNum === -1) { // not a valid number inputted
            UIManager.displayInvalidInputMsg();
            return;
        }
        
        // reset state
        this.clearButtons();
        this.gameInProgress = true;
        this.expectedOrder = 1;
        this.clickable = false;

        // create buttons in row
        this.createButtons(inputNum);
        this.showOrders();

        // wait n seconds, then scramble n times
        setTimeout(() => {
            this.hideOrders();
            this.scrambleButtons(inputNum);
        }, inputNum * 1000);
    }

    createButtons(n) {
        for (let i = 0; i < n; i++) {
            const color = this.getRandRGBColor();
            const btn = new Button(color, 0, 0, i+1, this);
            this.buttonArray.push(btn);
            btn.showOrder(); 
        }
    }

    clearButtons() {
        for (const btn of this.buttonArray) {
            btn.remove();
        }
        this.buttonArray = [];
    }

    getRandRGBColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r},${g},${b})`;
    }

    scrambleButtons(n) {
        if (n <= 0) {
            this.clickable = true;
            return;
        }
        for (const btn of this.buttonArray) {
            btn.moveRandom();
        }
        setTimeout(() => {
            this.scrambleButtons(n-1);
        }, MOVE_INTERVAL);
    }

    showOrders() {
        for (const btn of this.buttonArray) {
            btn.showOrder();
        }
    }

    hideOrders() {
        for (const btn of this.buttonArray) {
            btn.hideOrder();
        }
    }

    handleGuess(btn) {
        if (!this.clickable) {
            return; // ignore clicks during scrambling
        }

        if (this.expectedOrder === btn.order) { // correct guess
            btn.showOrder();
            this.expectedOrder++;
            if (this.expectedOrder > this.buttonArray.length) { // all correct guesses
                UIManager.displayWinMsg();
                this.gameInProgress = false;
                this.clickable = false;
            }
        }
        else { // incorrect guess
            UIManager.displayLoseMsg();
            this.showOrders();
            this.gameInProgress = false;
            this.clickable = false;
        }
    }
}
