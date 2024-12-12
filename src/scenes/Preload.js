import airplane from '../assets/images/airplane.png';
import balanceBar from '../assets/images/balance-bar.png';
import betButton from '../assets/images/bet-button.png';
import button from '../assets/images/button.png';
import filler from '../assets/images/filler.png';
import flyingArea from '../assets/images/flying-area.png';
import glow from '../assets/images/glow.png';
import plane from '../assets/images/plane.png';
import amount_bg from '../assets/images/amount_bg.png';
import add from '../assets/images/add.png';
import minus from '../assets/images/minus.png';

export default class Preload extends Phaser.Scene {
    constructor() {
        super("Preload");
    }
    editorPreload() {
        this.load.image('airplane', airplane);
        this.load.image('balanceBar', balanceBar);
        this.load.image('betButton', betButton);
        this.load.image('button', button);
        this.load.image('filler', filler);
        this.load.image('flyingArea', flyingArea);
        this.load.image('glow', glow);
        this.load.spritesheet('plane', plane, {
            frameWidth: 119.75,
            frameHeight: 62
        });
        this.load.image('add', add);
        this.load.image('minus', minus);
        this.load.image('amount_bg', amount_bg);
    }
    editorCreate() {
        this.txt_progress = this.add.text(this.game.config.width / 2, this.game.config.height / 2, "0%", { fontSize: '48px' });
        this.txt_progress.setOrigin(0.5, 0.5);
    }
    preload() {

        this.editorCreate();
        this.editorPreload();

        this.load.on(Phaser.Loader.Events.PROGRESS, (progress) => {
            this.txt_progress.setText(`${Math.round(progress * 100)}%`)
        });
        let oGameStates = {
            isNewGame: true,
            isHomeScreen: true,
        }
        this.load.on(Phaser.Loader.Events.COMPLETE, () => this.scene.start("Level", oGameStates));

    }

}