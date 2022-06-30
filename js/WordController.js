import { data } from './data.js';
import { DomController } from './DomController.js';

export class Word extends DomController {
    constructor(setup) {
        super('word');
        this.movesToPlayer = 10;
        this.hasExplode = false;
        this.timer = setup.level;
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
                this.hasExplode = true;
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
        }, 250);
    }
}

class WordController {
    constructor(setup) {
        this.level = setup.level;
        this.hasUppercase = setup.hasUppercase;
        this.hasNumber = setup.hasNumber;
        this.hasSpecialChars = setup.hasSpecialChars;
        this.specialChars = '!"#$%&/()\'+;:_[]{}=?*,.-';
        this.gridMaxXPos = 15;
        this.gridMaxYPos = 15;
        this.marginLeft = 0;
        this.positionMap = this.getPositionMap();
    }
    getRndWord() {
        const words = [];
        for (let i = 0; i < 4; i++) {
            const rndWordIndex = Math.floor(Math.random() * data.length) + 1;
            words.push(data[rndWordIndex]);
        }
        const asc = words.sort((a, b) => a.length - b.length);
        let word = asc[this.level - 1]; //for lower levels we pick up the shortest word

        if (this.hasUppercase) word = word.charAt(0).toUpperCase() + word.slice(1);
        if (this.hasNumber) word += Math.floor(Math.random() * 10);
        if (this.hasSpecialChars) {
            const rndCharPos = Math.floor(Math.random() * this.specialChars.length);
            word += this.specialChars[rndCharPos];
        }
        return word;
    }
    getRndPosition() {
        const rndIndex = Math.floor(Math.random() * this.positionMap.length);
        return this.positionMap[rndIndex];
    }
    /**
     * Creates a matrix of position in top,bottom, left and right of game panel
     * For the words to start appearing
     * @returns array with position inside game panel
     */
    getPositionMap() {
        const gameRect = document.getElementById('game').getBoundingClientRect();
        const panelRect = document.getElementById('panel').getBoundingClientRect();
        const width = gameRect.width;
        const heigth = gameRect.height - panelRect.height;
        const positionMap = [];
        for (let i = 0; i < this.gridMaxXPos - 1; i++) {
            // fill top and bottom
            positionMap.push(
                [
                    Math.floor((width / this.gridMaxXPos) * i) + this.marginLeft,
                    Math.floor(heigth / this.gridMaxYPos),
                ],
                [
                    Math.floor((width / this.gridMaxXPos) * i) + this.marginLeft,
                    Math.floor(heigth - heigth / this.gridMaxYPos),
                ]
            );
        }
        for (let i = 2; i < this.gridMaxYPos - 1; i++) {
            // fill left and right
            positionMap.push(
                [this.marginLeft, Math.floor(heigth / this.gridMaxYPos) * i],
                [
                    Math.floor(width - (width / this.gridMaxXPos) * 2) + this.marginLeft,
                    Math.floor(heigth / this.gridMaxYPos) * i,
                ]
            );
        }
        return positionMap;
    }
}
