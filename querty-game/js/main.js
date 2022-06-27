class Game {
    constructor() {
        this.player = new Player();
        this.words = [];
        this.level = 4; // 1..4
        this.speed = 1; // 1..4
        this.intervalId = 0;
    }

    start() {
        this.createListeners();

        let timer = 0;
        this.words.push(new Word(this.level));
        // this.intervalId = setInterval(() => {
        //   timer++;
        //   if ((timer * 50) % 20000 === 0) {
        //     const word = new Word(this.level);
        //     this.words.push(word);
        //     // this.words.shift().elm.remove();
        //   }
        //   // if ((timer * 50) % 300 === 0) {
        //   //   this.words.forEach((word) => {
        //   //     word.moveElement();
        //   //   });
        //   // }
        // }, 1000 / 50);
    }
    createListeners() {
        window.addEventListener('keydown', (event) => {
            switch (event.key.toLowerCase()) {
                case 'escape':
                    clearInterval(this.intervalId);
                    break;
                case 'n':
                    this.words.push(new Word(this.level));
                    break;
                case 'm':
                    this.words.forEach((word) => {
                        word.moveElement(player);
                    });
                    break;
                default:
                    console.log('pressed key...' + event.key);
            }
        });
        document.querySelector('.box.typearea').addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                this.words
                    .filter((word) => word.rndWord === event.target.value)
                    .forEach((word) => {
                        word.explode();
                        event.target.value = '';
                    });
            }
        });
    }
}

class Player {
    constructor() {
        this.health = 100;
        this.points = 0;
        this.elm = document.getElementById('player');
    }
    rotateToWord() {
        this.rotation = 0;
    }
    calculateRotation(word) {}
}

class Word extends WordController {
    constructor(level) {
        super(level);
        this.distanceToPlayer = 100;
        this.movesToPlayer = 10;
        this.hasExplode = false;
        this.timer = 0;
        this.rndWord = this.getRndWord();
        [this.positionX, this.positionY] = this.getRndPosition();
        this.elm = this.createNewElm();
    }
    createNewElm() {
        const wordElm = document.createElement('div');
        wordElm.className = 'word';
        wordElm.innerText = this.rndWord;
        wordElm.style.left = this.positionX + 'px';
        wordElm.style.top = this.positionY + 'px';
        const gameElm = document.getElementById('game');
        gameElm.appendChild(wordElm);
        return wordElm;
    }
    moveElement() {
        const playerElem = document.getElementById('player');
        let { left, top, width, height } = playerElem.getBoundingClientRect();
        const playerCenterX = left + width / 2;
        const playerCenterY = top + height / 2;
        const playerWidth = width;

        ({ left, top, width, height } = this.elm.getBoundingClientRect());
        const elmCenterX = left + width / 2;
        const elmCenterY = top + height / 2;
        this.elm.style.width = width + 'px';

        const dx = playerCenterX - elmCenterX;
        const dy = playerCenterY - elmCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (!this.hasExplode) {
            if (distance > playerWidth) {
                this.timer++;
                if (this.timer >= 2) {
                    this.positionX += (playerCenterX - elmCenterX) / this.movesToPlayer;
                    this.positionY += (playerCenterY - elmCenterY) / this.movesToPlayer;

                    this.elm.style.left = this.positionX + 'px';
                    this.elm.style.top = this.positionY + 'px';
                }
            } else {
                this.hasExplode = true;
                this.explode();
            }
        }
    }
    explode() {
        this.elm.innerText = ''; // to be done before adding the img
        const img = document.createElement('img');
        img.src = '../img/explosion.png';
        this.elm.appendChild(img);
        setTimeout(() => {
            this.elm.remove();
        }, 500);
    }
}

const game = new Game();
game.start();
