import { Word } from './WordController.js';
import { DomController } from './DomController.js';
import { ShootingController } from './ShootingController.js';

class Game {
    constructor() {
        this.words = [];
        this.setup = {
            level: 1, // 1-4
            hasUppercase: false,
            hasNumber: false,
            hasSpecialChars: false,
            speed: 1, // default value (increase it to test)
        };
        this.intervalId = 0;
        this.healthDomElm = document.querySelector('.box.health');
        this.setupDomElm = document.getElementById('setup');
        this.gameOverDomElm = document.getElementById('gameover');
        this.typeBoxDomElm = document.querySelector('.box.typearea');
        this.scoreBoxDomElm = document.querySelector('.box.score');
        this.rdBtnDomElms = document.querySelectorAll(`input[name="radio"]`);
        this.cbox1DomElm = document.getElementById('cboxOption1');
        this.cbox2DomElm = document.getElementById('cboxOption2');
        this.cbox3DomElm = document.getElementById('cboxOption3');
        this.btnEnter = document.getElementById('btnEnter');
        this.btnEscape = document.getElementById('btnEscape');
        this.playerElm = document.getElementById('player');
    }
    initialize() {
        window.addEventListener('keydown', (event) => {
            if (event.key.toLowerCase() === 'escape') {
                clearInterval(this.intervalId);
                this.restartGame();
            }
        });
        this.typeBoxDomElm.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                this.words
                    .filter((word) => word.text === event.target.value)
                    .forEach((word) => {
                        this.player.killWord(word);
                        this.scoreBoxDomElm.value = this.player.points;
                        event.target.value = '';
                    });
            }
        });

        this.btnEnter.addEventListener('click', (event) => {
            this.start();
            event.stopPropagation();
        });
    }
    restartGame() {
        this.words.forEach((word) => word.domElm.remove());
        this.player.domElm.style.display = 'none';
        this.gameOverDomElm.style.display = 'none';
        this.typeBoxDomElm.value = '';
        this.scoreBoxDomElm.value = '0';
        this.healthDomElm.value = '100';
        this.setupDomElm.style.display = 'initial';
    }
    start() {
        this.setupDomElm.style.display = 'none';
        this.playerElm.style.display = 'initial';
        this.typeBoxDomElm.focus();
        this.player = new Player(this.playerElm);

        const newSetup = this.getSetup();
        if (newSetup && newSetup !== {}) this.setup = newSetup;
        this.words.push(new Word(this.setup));

        let timer = 0;
        this.intervalId = setInterval(() => {
            timer++;
            if ((timer * 50) % Math.floor(20000 / Math.pow(2, this.setup.level - 1)) === 0) {
                this.words.push(new Word(this.setup));
            }
            if ((timer * 50) % (4000 / Math.pow(2, this.setup.speed - 1)) === 0) {
                this.words.forEach((word, index) => {
                    word.moveElement(this.player);
                    if (word.hasExplode) {
                        this.player.health -= Math.floor(word.text.length / 2);
                        this.words.splice(index, 1);
                        if (this.player.health <= 0) {
                            this.healthDomElm.value = 0;
                            setTimeout(() => this.gameOver(), 1000);
                        } else {
                            this.healthDomElm.value = this.player.health;
                        }
                    }
                });
            }
        }, 1000 / 50);
    }
    getSetup() {
        this.rdBtnDomElms.forEach((element) => {
            if (element.checked) {
                this.setup.level = element.value;
            }
        });
        this.setup.hasUppercase = this.cbox1DomElm.checked;
        this.setup.hasNumber = this.cbox2DomElm.checked;
        this.setup.hasSpecialChars = this.cbox3DomElm.checked;
        return this.setup;
    }
    gameOver() {
        clearInterval(this.intervalId);
        this.words.forEach((word) => {
            word.domElm.remove();
        });
        this.player.domElm.style.display = 'none';
        this.gameOverDomElm.style.display = 'initial';
    }
}

class Player extends DomController {
    constructor(domElm) {
        super();
        this.domElm = domElm;
        this.health = 100;
        this.points = 0;
        this.setSizeAndPostion();
    }
    killWord(word) {
        this.rotateToWord(word);
        const shootingController = new ShootingController(this.centerX, this.centerY);
        shootingController.shoot(word);
        this.points += word.text.length;
    }
    rotateToWord(word) {
        const degres =
            (Math.atan2(word.centerY - this.centerY, word.centerX - this.centerX) * 180) / Math.PI;
        this.domElm.style.transform = `rotate(${degres + 90}deg)`;
    }
}

const game = new Game();
game.initialize();
