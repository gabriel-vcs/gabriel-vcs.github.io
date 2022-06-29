import { WordController } from './WordController.js';
import { ShootingController } from './ShootingController.js';
import { DomController } from './DomController.js';

class Game {
    constructor() {
        this.player = new Player();
        this.words = [];
        this.setup = {
            level: 1, // 1-4
            speed: 1, // 1-4
            hasUppercase: false,
            hasNumber: false,
            hasSpecialChars: true,
        };
        this.intervalId = 0;
        this.healthElm = document.querySelector('.box.health');
        this.textElm = document.querySelector('.box.typearea');
    }

    start() {
        this.createListeners();

        let timer = 0;

        this.intervalId = setInterval(() => {
            timer++;
            if ((timer * 50) % Math.floor(10000 / Math.pow(2, this.setup.speed - 1)) === 0) {
                this.words.push(new Word(this.setup));
            }
            if ((timer * 50) % Math.floor(2000 / Math.pow(2, this.setup.speed - 1)) === 0) {
                this.words.forEach((word, index) => {
                    word.moveElement(this.player);
                    if (word.hasExplode) {
                        this.player.health -= Math.floor(word.text.length / 2);
                        this.words.splice(index, 1);
                        if (this.player.health <= 0) {
                            this.healthElm.value = 0;
                            setTimeout(() => this.gameOver(), 500);
                        } else {
                            this.healthElm.value = this.player.health;
                        }
                    }
                });
            }
        }, 1000 / 50);
    }
    gameOver() {
        clearInterval(this.intervalId);
        this.words.forEach((word) => {
            word.domElm.remove();
        });
        this.player.domElm.src = './img/game-over.jpg';
        this.player.domElm.style.height = '300px';
        this.player.setSizeAndPostion();
        this.player.updatePosition();
    }
    createListeners() {
        window.addEventListener('load', () => {
            this.healthElm.value = this.player.health;
            this.textElm.focus();
        });

        this.textElm.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                this.words
                    .filter((word) => word.text === event.target.value)
                    .forEach((word) => {
                        this.player.killWord(word);
                        event.target.value = '';
                    });
            }
        });
    }
}

class Player extends DomController {
    constructor() {
        super();
        this.health = 100;
        this.points = 0;
        this.domElm = document.getElementById('player');
        this.setSizeAndPostion();
        this.updatePosition();
    }

    updatePosition() {
        this.domElm.style.marginTop = -this.height / 2 + 'px';
        this.domElm.style.marginLeft = -this.width / 2 + 'px';
    }

    killWord(word) {
        this.rotateToWord(word);
        const shootingController = new ShootingController(this.centerX, this.centerY);
        shootingController.shoot(word);
        this.points += word.text.length;
        document.querySelector('.box.score').value = this.points;
    }
    rotateToWord(word) {
        const degres =
            (Math.atan2(word.centerY - this.centerY, word.centerX - this.centerX) * 180) / Math.PI;
        this.domElm.style.transform = `rotate(${degres + 90}deg)`;
    }
}

class Word extends DomController {
    constructor(setup) {
        super('word');
        this.movesToPlayer = 10;
        this.hasExplode = false;
        this.timer = 0;
        this.text = '';
        this.createWord(setup);
    }
    createWord(setup) {
        const wordController = new WordController(setup);
        this.text = wordController.getRndWord();
        [this.positionX, this.positionY] = wordController.getRndPosition();

        this.domElm = this.createDomElement(this.positionX, this.positionY);
        this.domElm.innerText = this.text;
        this.setSizeAndPostion();
        this.domElm.style.width = this.width + 'px'; //required for the explosion to be in the middle of the word
    }
    moveElement(player) {
        if (!this.hasExplode) {
            this.setSizeAndPostion();

            const distance = this.getDistante(player, this);
            if (distance > player.width) {
                this.timer++;
                //delay before starting moving the word from the corner
                if (this.timer >= 5) {
                    this.positionX += (player.centerX - this.centerX) / this.movesToPlayer;
                    this.positionY += (player.centerY - this.centerY) / this.movesToPlayer;

                    this.domElm.style.left = this.positionX + 'px';
                    this.domElm.style.top = this.positionY + 'px';
                }
            } else {
                this.explode(player);
            }
        }
    }
    explode() {
        this.domElm.innerText = ''; // it needs to be done before adding the img
        const img = document.createElement('img');
        img.src = './img/explosion.png';
        this.domElm.appendChild(img);
        setTimeout(() => {
            this.domElm.remove();
        }, 350);
        this.hasExplode = true;
    }
}

const game = new Game();
game.start();
