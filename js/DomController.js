export class DomController {
    constructor(className) {
        this.className = className;
        this.positionX = 0;
        this.positionY = 0;
        this.domElm = null;
        this.centerX = 0;
        this.centerY = 0;
        this.width = 0;
        this.height = 0;
    }
    createDomElement(positionX, positionY) {
        let domElm = document.createElement('div');
        domElm.className = this.className;
        domElm.style.left = positionX + 'px';
        domElm.style.top = positionY + 'px';
        const gameElm = document.getElementById('game');
        gameElm.appendChild(domElm);
        return domElm;
    }
    setSizeAndPostion() {
        let { left, top, width, height } = this.domElm.getBoundingClientRect();
        this.centerX = left + width / 2;
        this.centerY = top + height / 2;
        this.width = width;
        this.height = height;
    }
    getDistante(elm1, elm2) {
        const dx = elm1.centerX - elm2.centerX;
        const dy = elm1.centerY - elm2.centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance;
    }
}
