class ShootingController {
    constructor() {
        this.bullets = [];
        this.startPostion = [];
        this.endPosition = [];
    }
    getBullets() {}
    createNewBullet() {
        const bulletElm = document.createElement('div');
        bulletElm.className = 'bullet';
        bulletElm.style.left = this.startPostion[0] + 'px';
        bulletElm.style.top = this.startPostion[1] + 'px';
        const gameElm = document.getElementById('game');
        gameElm.appendChild(bulletElm);
        return bulletElm;
    }
}
