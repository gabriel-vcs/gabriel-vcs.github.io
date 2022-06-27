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
      console.log("event.key>>>", event.key);
      if (event.key === "Escape") {
        clearInterval(this.intervalId);
      } else if (event.key === "n") {
        this.words.push(new Word(this.level));
      } else if (event.key === "m") {
        this.words.forEach((word) => {
          word.moveElement();
        });
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
    this.positionX = 0;
    this.positionY = 0;
    this.counter = 0;
    this.elm = this.createNewElm();
  }
  createNewElm() {
    const wordElm = document.createElement("div");
    wordElm.className = "word";
    wordElm.innerText = this.getRndWord();
    [this.positionX, this.positionY] = this.getRndPosition();
    wordElm.style.left = this.positionX + "px";
    wordElm.style.top = this.positionY + "px";
    const gameElm = document.getElementById("game");
    gameElm.appendChild(wordElm);
    return wordElm;
  }
  moveElement() {
    const playerElem = document.getElementById("player");
    const cssPlayerObj = window.getComputedStyle(playerElem, null);
    const playerPositionX = +cssPlayerObj
      .getPropertyValue("left")
      .replace("px", "");
    const playerPositionY = +cssPlayerObj
      .getPropertyValue("top")
      .replace("px", "");
    const playerWidth = +cssPlayerObj
      .getPropertyValue("width")
      .replace("px", "");
    const playerHeight = +cssPlayerObj
      .getPropertyValue("height")
      .replace("px", "");
    const cssWordObj = window.getComputedStyle(this.elm, null);
    const wordWidth = +cssWordObj.getPropertyValue("width").replace("px", "");
    const wordHeight = +cssWordObj.getPropertyValue("height").replace("px", "");

    console.log("playerPositionX>>>", playerPositionX);
    console.log("this.positionX>>>", this.positionX);
    console.log(
      "playerPositionX - this.positionX>>>",
      Math.abs(playerPositionX - this.positionX)
    );
    console.log("playerWidth>>>", playerWidth);
    console.log(
      "playerPositionY - this.positionY>>>",
      Math.abs(playerPositionY - this.positionY)
    );
    console.log("playerHeight>>>", playerHeight);
    if (
      Math.abs(playerPositionX - this.positionX) > playerWidth / 2 ||
      Math.abs(playerPositionY - this.positionY) > playerHeight
    ) {
      this.positionX += (playerPositionX - this.positionX) / this.movesToPlayer;
      this.positionY += (playerPositionY - this.positionY) / this.movesToPlayer;
    } else {
      this.counter++;
      this.elm.innerText = "";
      const img = document.createElement("img");
      img.src = "../img/explosion.png";
      this.elm.appendChild(img);
    }
    this.elm.style.left = this.positionX + "px";
    this.elm.style.top = this.positionY + "px";
    if (this.counter >= 4) {
      this.elm.remove();
    }
  }
}

const game = new Game();
game.start();
