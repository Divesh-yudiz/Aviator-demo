export default class InputManager {
    constructor(scene) {
        this.oScene = scene;
        this.setButtons();
    }
    setButtons() {
        // Assuming buttons are already declared in your level file and accessible via this.oScene
        this.button10 = this.oScene.button10;
        this.button50 = this.oScene.button50;
        this.button100 = this.oScene.button100;
        this.button500 = this.oScene.button500;

        // Set event listeners for each button
        [this.button10, this.button50, this.button100, this.button500].forEach(button => {
            button.addEventListener('click', () => {
                this.oScene.betValue1 = Number(button.textContent)
                // this.oScene.betButton_1.textContent = `Bet \n ${this.oScene.betValue1} \n INR`;
                this.oScene.betAmount.value = Number(button.textContent);
            });
        });

        if (this.cashOutBtn) {
            this.cashOutBtn.addEventListener('click', () => {
                console.log("cash out button clicked")
            });
        }

        if (this.oScene.betButton_1) {
            this.oScene.betButton_1.addEventListener('click', () => {
                console.log("cash out button clicked", this.oScene.betButton_1.textContent)
                if (this.oScene.betButton_1.textContent.includes('Cash Out')) {
                    console.log("this.multiplier_txt", this.oScene.multiplier_txt.text)
                    this.oScene.oSocketManager.handleCashOut();
                } else {
                    this.oScene.oSocketManager.handlePlaceBet(this.oScene.betAmount.value);
                }
            });
        }

        // Add event listeners for increase/decrease buttons
        if (this.oScene.decreaseBtn) {
            this.oScene.decreaseBtn.addEventListener('click', () => {
                const currentValue = Number(this.oScene.betAmount.value);
                if (currentValue >= 20) {  // Ensure we don't go below 10
                    this.oScene.betAmount.value = currentValue - 10;
                    this.oScene.betValue1 = this.oScene.betAmount.value;
                }
            });
        }

        if (this.oScene.increaseBtn) {
            this.oScene.increaseBtn.addEventListener('click', () => {
                const currentValue = Number(this.oScene.betAmount.value);
                this.oScene.betAmount.value = currentValue + 10;
                this.oScene.betValue1 = this.oScene.betAmount.value;
            });
        }

    }
}