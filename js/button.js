export class Button {
    constructor(color, top, left, order, game) {
        this.order = order;
        this.game = game;

        this.btn = document.createElement("button")
        this.btn.className = "button"
        this.btn.style.backgroundColor = color;
        this.setLocation(top, left);
        document.getElementById("buttons-container").appendChild(this.btn);

        this.btn.addEventListener("click", () => {
            this.game.handleGuess(this)
        });
    }

    setLocation(top, left) {
        this.btn.style.top = `${top}px`;
        this.btn.style.left = `${left}px`;
    }

    moveRandom() {
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;

        const btnWidth = this.btn.offsetWidth + (this.btn.style.margin * 2);
        const btnHeight = this.btn.offsetHeight + (this.btn.style.margin * 2);

        const maxTop = windowHeight - btnHeight;
        const maxLeft = windowWidth - btnWidth;

        const top = Math.floor(Math.random() * maxTop);
        const left = Math.floor(Math.random() * maxLeft);

        this.btn.style.position = "absolute";
        this.setLocation(top, left);
    }

    showOrder() {
        this.btn.innerHTML = this.order;
    }

    hideOrder() {
        this.btn.innerHTML = "";
    }

    remove() {
        if (this.btn.parentNode) {
            this.btn.parentNode.removeChild(this.btn);
        }
    }

    getWidth() {
        return this.btn.offsetWidth;
    }

    getHeight() {
        return this.btn.offsetHeight;
    }
}
