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
    window.addEventListener("keydown", (event) => {
      switch (event.key.toLowerCase()) {
        case "escape":
          clearInterval(this.intervalId);
          break;
        case "n":
          this.words.push(new Word(this.level));
          break;
        case "m":
          this.words.forEach((word) => {
            word.moveElement();
          });
          break;
        default:
          console.log("pressed key..." + event.key);
      }
    });
    // document.querySelector(".box.typearea").addEventListener("keydown", (event, target) => {
    //   if (event.key === "Enter") {
    //     this.words.filter(word => word.rndWord === target.innerText).
    //   }
    // }
  }
}

class Player {
  constructor() {
    this.health = 100;
    this.points = 0;
    this.elm = document.getElementById("player");
    this.rotation = 45;
  }
}

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
    const gameRect = document.getElementById("game").getBoundingClientRect();
    const panelRect = document.getElementById("panel").getBoundingClientRect();
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
    this.elm.style.transform = "rotate(" + this.rotation + "deg)";
  }
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
    const wordElm = document.createElement("div");
    wordElm.className = "word";
    wordElm.innerText = this.rndWord;
    wordElm.style.left = this.positionX + "px";
    wordElm.style.top = this.positionY + "px";
    const gameElm = document.getElementById("game");
    gameElm.appendChild(wordElm);
    return wordElm;
  }
  moveElement() {
    const playerElem = document.getElementById("player");
    let { left, top, width, height } = playerElem.getBoundingClientRect();
    const playerCenterX = left + width / 2;
    const playerCenterY = top + height / 2;
    const playerWidth = width;

    ({ left, top, width, height } = this.elm.getBoundingClientRect());
    const elmCenterX = left + width / 2;
    const elmCenterY = top + height / 2;
    const elmWidth = width;

    const dx = playerCenterX - elmCenterX;
    const dy = playerCenterY - elmCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (!this.hasExplode) {
      if (distance > (playerWidth + elmWidth) / 2) {
        this.timer++;
        if (this.timer >= 2) {
          this.positionX += (playerCenterX - elmCenterX) / this.movesToPlayer;
          this.positionY += (playerCenterY - elmCenterY) / this.movesToPlayer;

          this.elm.style.left = this.positionX + "px";
          this.elm.style.top = this.positionY + "px";
        }
      } else {
        this.hasExplode = true;
        this.elm.innerText = ""; // to be done before adding the img
        const img = document.createElement("img");
        img.src = "../img/explosion.png";
        this.elm.appendChild(img);
        this.elm.style.width = elmWidth + "px"; //set width to have the explossion in the middle of the word
        this.elm.style.textAlign =
          playerCenterX > elmCenterX ? "right" : "center";
        setTimeout(() => {
          this.elm.remove();
        }, 500);
      }
    }
  }
}

const game = new Game();
game.start();
