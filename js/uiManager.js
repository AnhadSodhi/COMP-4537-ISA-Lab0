import { NUM_PROMPT, BUTTON_TEXT, WIN_MESSAGE, LOSE_MESSAGE, INVALID_INPUT } from "../lang/messages/en/user.js"

const MESSAGE_DISPLAY_DURATION = 2000; // display messages for 2 seconds

export class UIManager {
    static validateInput() {
        const inputNum = document.getElementById("input-num").value;
        const n = parseInt(inputNum);
        if (!isNaN(n) && n >= 3 && n <= 7) {
            return n;
        }
        else {
            return -1;
        }
    }

    static populateText() {
        document.getElementById("num-prompt").innerHTML = NUM_PROMPT;
        document.getElementById("go-button").innerHTML = BUTTON_TEXT;
    }

    static displayMsg(message) {
        const box = document.createElement("div")
        box.className = "ui-message"
        box.innerHTML = message;
        document.body.appendChild(box);

        //hide after 2 seconds
        setTimeout(() => {
            box.style.display = "none";
        }, MESSAGE_DISPLAY_DURATION);
    }

    static displayInvalidInputMsg() {
        UIManager.displayMsg(INVALID_INPUT);
    }
    static displayWinMsg() {
        UIManager.displayMsg(WIN_MESSAGE);
    }
    static displayLoseMsg() {
        UIManager.displayMsg(LOSE_MESSAGE);
    }
}
