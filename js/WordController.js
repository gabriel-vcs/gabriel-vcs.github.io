import { data } from './data.js';
export class WordController {
    constructor(setup) {
        this.level = setup.level;
        this.hasUppercase = setup.hasUppercase;
        this.hasNumber = setup.hasNumber;
        this.hasSpecialChars = setup.hasSpecialChars;
        this.specialChars = '!"#$%&/()\'+;:_[]{}=?,.-';
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
