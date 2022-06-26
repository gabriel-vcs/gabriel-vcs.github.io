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
    this.intervalId = setInterval(() => {
      timer++;
      if ((timer * 50) % 3000 === 0) {
        this.words.push(new Word(this.level));
        this.words.shift().elm.remove();
      }
      this.words.forEach((word) => {
        word.moveElement();
      });
    }, 1000 / 50);
  }
  createListeners() {
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        clearInterval(this.intervalId);
      }
    });
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
    this.marginLeft = 5;
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
    this.elm = this.createNewElm();
    this.distanceToPlayer = 100;
    this.orientation = 0;
    this.movesToPlayer = 10;
  }
  createNewElm() {
    const wordElm = document.createElement("span");
    wordElm.className = "word";
    wordElm.innerText = this.getRndWord();
    const rndPosition = this.getRndPosition();
    wordElm.style.left = rndPosition[0] + "px";
    wordElm.style.top = rndPosition[1] + "px";
    const gameElm = document.getElementById("game");
    gameElm.appendChild(wordElm);
    return wordElm;
  }
  moveElement() {
    const playerElem = document.getElementById("player");
    console.log("this.playerElem.style.left>>>", playerElem.style.left);
    // if (Math.abs(this.playerElem.style.left - this.elm.style.left) > 20) {
    //   this.elm.style.left +=
    //     (playerElem.style.left - this.elm.style.left) / this.movesToPlayer;
    // }
    // if (Math.abs(this.playerElem.style.top - this.elm.style.top) > 20) {
    //   this.elm.style.top +=
    //     (playerElem.style.top - this.elm.style.top) / this.movesToPlayer;
    // }
  }
}

const game = new Game();
game.start();
