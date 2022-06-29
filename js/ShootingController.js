import { DomController } from './DomController.js';

export class ShootingController {
    constructor(positionX, positionY) {
        this.bulletsPerShoot = 5;
        this.positionX = positionX;
        this.positionY = positionY;
        this.intervalId = 0;
    }
    shoot(word) {
        let bullets = [];
        let numBullets = 0;
        let totalHits = 0;
        let timer = 0;
        this.intervalId = setInterval(() => {
            timer++;
            if ((timer * 50) % 200 === 0 && numBullets < this.bulletsPerShoot) {
                bullets.push(new Bullet(this.positionX, this.positionY));
                numBullets++;
            }
            bullets.forEach((bullet, index) => {
                if (bullet.hasHit) {
                    totalHits++;
                    bullets.splice(index, 1);
                    if (totalHits === this.bulletsPerShoot) {
                        word.explode();
                        clearInterval(this.intervalId);
                    }
                } else {
                    bullet.moveBullet(word, this.bulletsPerShoot);
                }
            });
        }, 1000 / 50);
    }
}

class Bullet extends DomController {
    constructor(positionX, positionY) {
        super('bullet');
        this.positionX = positionX;
        this.positionY = positionY;
        this.domElm = this.createDomElement(positionX, positionY);
        this.domElm.style.width = '5px';
        this.domElm.style.height = '5px';
        this.hasHit = false;
    }
    moveBullet(word, totalbullets) {
        this.setSizeAndPostion();
        this.distance = this.getDistante(word, this);
        if (this.distance > word.width / 2) {
            this.positionX += (word.centerX - this.centerX) / totalbullets;
            this.positionY += (word.centerY - this.centerY) / totalbullets;

            this.domElm.style.left = this.positionX + 'px';
            this.domElm.style.top = this.positionY + 'px';
        } else {
            this.hasHit = true;
            this.domElm.remove();
        }
    }
}
