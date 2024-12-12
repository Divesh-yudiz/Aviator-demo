import assets from '../scripts/assets';
import InputManager from '../scripts/inputManager';
import TweenManager from '../scripts/TweenManager';
import SocketManager from '../scripts/SocketManager';

export default class Level extends Phaser.Scene {
    constructor() {
        super("Level");
    }

    editorCreate() {
        // body
        this.body = this.add.container(0, 0);

        // flying_area_1
        this.flying_area_1 = this.add.image(960, 540, assets.flyingArea);
        this.flying_area_1.scaleX = 4;
        this.flying_area_1.scaleY = 4;
        this.flying_area_1.alpha = 0.3;
        this.flying_area_1.alphaTopLeft = 0.3;
        this.flying_area_1.alphaTopRight = 0.3;
        this.flying_area_1.alphaBottomLeft = 0.3;
        this.flying_area_1.alphaBottomRight = 0.3;
        this.flying_area_1.tintTopLeft = 2522352;
        this.flying_area_1.tintTopRight = 2522352;
        this.flying_area_1.tintBottomLeft = 2522352;
        this.flying_area_1.tintBottomRight = 2522352;
        this.body.add(this.flying_area_1);

        // flying_area
        this.flying_area = this.add.image(1000.000011920929, 0, assets.filler);
        this.flying_area.scaleX = 3.8;
        this.flying_area.scaleY = 6.3;
        this.flying_area.tintFill = true;
        this.flying_area.tintTopLeft = 7218;
        this.flying_area.tintTopRight = 3152197;
        this.flying_area.tintBottomLeft = 3152197;
        this.flying_area.tintBottomRight = 71722;
        this.body.add(this.flying_area);

        // glow
        this.glow = this.add.image(50, 1080, assets.glow);
        this.glow.scaleX = 4;
        this.glow.scaleY = 4;
        this.glow.alpha = 0.7;
        // this.glow.setOrigin(0, 0);
        this.glow.alphaTopLeft = 0.7;
        this.glow.alphaTopRight = 0.7;
        this.glow.alphaBottomLeft = 0.7;
        this.glow.alphaBottomRight = 0.7;
        this.body.add(this.glow);

        // filler
        this.filler = this.add.sprite(200, 807, assets.filler);
        this.filler.scaleX = 3;
        this.filler.scaleY = 3;
        this.filler.setOrigin(1, 0);
        this.filler.alpha = 0.5;
        this.filler.alphaTopLeft = 0.5;
        this.filler.alphaTopRight = 0.5;
        this.filler.alphaBottomLeft = 0.5;
        this.filler.alphaBottomRight = 0.5;
        this.body.add(this.filler);

        // multiplier_txt
        this.multiplier_txt = this.add.text(1130, 420, "", {});
        this.multiplier_txt.setOrigin(0.5, 0.5);
        this.multiplier_txt.alpha = 0.8;
        this.multiplier_txt.alphaTopLeft = 0.8;
        this.multiplier_txt.alphaTopRight = 0.8;
        this.multiplier_txt.alphaBottomLeft = 0.8;
        this.multiplier_txt.alphaBottomRight = 0.8;
        this.multiplier_txt.setStyle({ "align": "center", "fontSize": "64px", "fontStyle": "bold italic", "fontFamily": "Open Sans" });
        this.body.add(this.multiplier_txt);


        // cashOut_txt
        this.cashOut_txt = this.add.text(1130, 500, "", {});
        this.cashOut_txt.setOrigin(0.5, 0.5);
        this.cashOut_txt.alpha = 0.8;
        this.cashOut_txt.alphaTopLeft = 0.8;
        this.cashOut_txt.alphaTopRight = 0.8;
        this.cashOut_txt.alphaBottomLeft = 0.8;
        this.cashOut_txt.alphaBottomRight = 0.8;
        this.cashOut_txt.setStyle({ "align": "center", "fontSize": "64px", "fontStyle": "bold italic", "fontFamily": "Open Sans" });
        this.body.add(this.cashOut_txt);

        // airplane
        this.airplane = this.add.sprite(120, 970, assets.plane);
        this.airplane.scaleX = 1.5;
        this.airplane.scaleY = 1.5;
        this.airplane.angle = -20;
        this.body.add(this.airplane);

        // container_buttons
        this.container_buttons = this.add.container(0, 0);
        this.body.add(this.container_buttons);

        // betButton_1
        // this.betButton_1 = this.add.image(871, 835, assets.flyingArea);
        // this.betButton_1.scaleX = 0.3;
        // this.betButton_1.scaleY = 0.53;
        // this.betButton_1.setOrigin(0.5, 0);
        // this.betButton_1.tintFill = true;
        // this.betButton_1.tintTopLeft = 2658560;
        // this.betButton_1.tintTopRight = 2658560;
        // this.betButton_1.tintBottomLeft = 2658560;
        // this.betButton_1.tintBottomRight = 2658560;
        // this.container_buttons.add(this.betButton_1);

        // totalBalance_txt
        this.totalBalance_txt = this.add.text(330, 55, "", {});
        this.totalBalance_txt.setOrigin(0, 0.5);
        this.totalBalance_txt.text = "0";
        this.totalBalance_txt.setStyle({ "align": "center", "color": "#aba9a9ff", "fontSize": "64px", "fontFamily": "Open Sans" });
        this.body.add(this.totalBalance_txt);

        // balance_txt
        this.balance_txt = this.add.text(200, 50, "", {});
        this.balance_txt.setOrigin(0.5, 0.5);
        this.balance_txt.text = "Balance:";
        this.balance_txt.setStyle({ "align": "center", "color": "#aba9a9ff", "fontSize": "64px", "fontFamily": "Open Sans" });
        this.body.add(this.balance_txt);

        // start_button
        this.start_button = this.add.image(1146, 397, assets.button);
        this.start_button.setVisible(false);
        this.body.add(this.start_button);


        this.button10 = document.querySelector('.bet-10');
        this.button50 = document.querySelector('.bet-50');
        this.button100 = document.querySelector('.bet-100');
        this.button500 = document.querySelector('.bet-500');

        this.betButton_1 = document.querySelector('.start-bet-button');
        this.betAmount = document.querySelector('.bet-amount');
        this.decreaseBtn = document.querySelector('.decrease-btn');
        this.increaseBtn = document.querySelector('.increase-btn');
    }

    create() {
        this.editorCreate();
        this.oSocketManager = new SocketManager(this);
        this.nTime = Math.floor(Math.random() * (10 - 3) + 3);
        this.nMultiplier = 1.00;
        this.betValue1 = 1;
        this.betValue2 = 1;
        this.isBet_1_On = false;
        this.isBet_2_On = false;
        this.initialX = this.airplane.x;
        this.initialY = this.airplane.y;
        this.targetX = Phaser.Math.Between(1500, 1700);
        this.targetY = 130;
        const distanceX = this.targetX - this.airplane.x;
        this.duration = Math.abs(distanceX) / 0.3;

        this.anims.create({
            key: 'fly', // Name of the animation
            frames: this.anims.generateFrameNumbers(assets.plane, { start: 0, end: 3 }),
            frameRate: 8, // Frames per second
            repeat: -1 // Loop indefinitely
        });
        this.airplane.play('fly');

        this.inputManager = new InputManager(this);
        this.tweenManager = new TweenManager(this);

        let animationShape = this.make.graphics();
        animationShape.fillRect(50, 0, 1920, 1020);
        const mask = animationShape.createGeometryMask();
        this.glow.setMask(mask);
    }

    moveAirplane = (initialY, targetX, targetY, duration, delay) => {
        this.moveAirplaneTween = this.tweens.add({
            targets: this.airplane,
            x: targetX,
            y: targetY,
            duration: duration,
            onStart: () => {
                if (this.betButton_1.name == 'bet') {
                    if (delay != 0) {
                        console.log("this.totalBalance_txt", this.totalBalance_txt)
                        this.isBet_1_On = true;
                        this.totalBalance_txt.setText((Number(this.totalBalance_txt.text) - this.betValue1).toFixed(2));
                        this.betButton_1.style.backgroundColor = '#ff0000';
                    }
                }
                this.multiplier_txt.setVisible(true)
            },
            delay: delay,
            ease: 'Linear',
            onComplete: () => {
                targetX = Phaser.Math.Between(1220, this.airplane.x);
                targetY = Phaser.Math.Between(initialY, 500);
                this.moveAirplane(initialY, targetX, targetY, duration, 0);
            }
        });
    }

    setTimer = (nTime, nMultiplier, initialX, initialY, nMultiplyMoneyValue) => {
        const targetMultiplier = nMultiplyMoneyValue;
        const startMultiplier = 1.00;
        const incrementInterval = 100;
        const totalTimeInSeconds = nTime / 1000;
        const multiplierIncrement = ((targetMultiplier - startMultiplier) * (incrementInterval / 1000)) / totalTimeInSeconds;

        nMultiplier = startMultiplier;
        this.multiplier_txt.setText(`${startMultiplier.toFixed(2)}X`);

        this.timeIntervel = setInterval(() => {
            if (nTime > 0) {
                nTime -= 1000;
                console.log("nTime", nTime);
            }
            if (nTime <= 0) {
                this.moveAirplaneTween.stop();
                clearInterval(this.timeIntervel);
                clearInterval(this.multiplierIntervel);
                this.isBet_1_On = false;
                this.isBet_2_On = false;
                this.multiplier_txt.setText(`Flew Away! \n ${targetMultiplier.toFixed(2)}X`);
                this.filler.visible = false;
                this.moveAirplaneTween = this.tweens.add({
                    targets: this.airplane,
                    x: 3000,
                    duration: 300,
                    delay: 100,
                    ease: 'Linear',
                    onComplete: () => {
                        setTimeout(() => {
                            this.betButton_1.style.backgroundColor = '#00ff00';
                            nTime = nTime = Math.random() * (10 - 3) + 3;
                            nMultiplier = 1.00;
                            this.betButton_1.enabled = true;
                            this.filler.visible = true;
                            this.airplane.setPosition(initialX, initialY);
                        }, 3000);
                    }
                });
            }
        }, 1000);

        // Update multiplier more frequently for smoother animation
        this.multiplierIntervel = setInterval(() => {
            nMultiplier += multiplierIncrement;
            nMultiplier = Math.min(nMultiplier, targetMultiplier);
            this.multiplier_txt.setText(`${Number(nMultiplier).toFixed(2)}X`);
        }, incrementInterval);
    }

    setBetStartCountdown = (timeoutDuration) => {
        this.betStartCountdown = setInterval(() => {
            if (timeoutDuration > 0) {
                this.multiplier_txt.setVisible(true);
                this.multiplier_txt.setText(`${timeoutDuration}s`);
                timeoutDuration--;
            }
        }, 950);
    }

    update() {
        // Game logic and updates go here
        let fillerShape = this.make.graphics();
        fillerShape.fillTriangle(80, 1020, this.filler.x, this.filler.y, this.filler.x, 1020);
        const mask = fillerShape.createGeometryMask();
        this.filler.setMask(mask);
        this.filler.setPosition(this.airplane.x - 77, this.airplane.y + 50);
    }
}
