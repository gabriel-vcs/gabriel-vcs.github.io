class WordController {
    constructor(level) {
        this.level = level;
        this.gridMaxXPos = 12;
        this.gridMaxYPos = 12;
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
        return asc[this.level - 1];
    }
    getRndPosition() {
        const rndIndex = Math.floor(Math.random() * this.positionMap.length);
        return this.positionMap[rndIndex];
    }
    getPositionMap() {
        const gameRect = document.getElementById('game').getBoundingClientRect();
        const panelRect = document.getElementById('panel').getBoundingClientRect();
        const width = gameRect.width;
        const heigth = gameRect.height - panelRect.height;
        const positionMap = [];
        for (let i = 0; i < this.gridMaxXPos - 1; i++) {
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
    rotate() {
        this.elm.style.transform = 'rotate(' + this.rotation + 'deg)';
    }
}
