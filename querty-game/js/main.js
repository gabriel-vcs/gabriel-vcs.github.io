class Game {
  constructor() {
    this.player = new Player();
    this.words = [];
    this.level = 1; // 1..4
    this.speed = 1; // 1..4
    this.intervalId = 0;
  }

  start() {
    this.createListeners();
    let timer = 0;
    this.words.push(new Word());
    this.intervalId = setInterval(() => {
      timer++;
      if ((timer * 50) % 1000 === 0) {
      }
      // this.words.forEach((word) => {
      // });
    }, 1000 / 50);
  }
  createListeners() {
    window.addEventListener("keydown", (event) => {
      console.log(event.key);
      if (event.key === "Escape") {
        clearInterval(this.intervalId);
      }
    });
  }
}

class DomElement {
  constructor(tagName, position, rotation) {
    this.rotation += 5;
    if (tagName) {
      this.elm = this.getNewElement(tagName);
    } else {
      this.elm = null;
    }
  }
  getNewElement(tagName) {
    console.log("this.position>>>", this.position);
    // const elm = document.createElement(tagName);
    // elm.position = this.getRndPosition();
  }
  getRndPosition() {}
  rotate() {
    this.elm.style.transform = "rotate(" + this.rotation + "deg)";
  }
}

class Player extends DomElement {
  constructor() {
    super(null, [0, 0], 45);
    this.health = 100;
    this.points = 0;
    this.elm = document.getElementById("player");
    this.rotation = 45;
  }
}

class Word extends DomElement {
  constructor() {
    super("span");
    this.word = this.getRndWord();
    this.distanceToPlayer = 100;
    this.orientation = 0;
  }
  getRndWord() {
    return words[Math.floor(Math.random() * words.length)];
  }
}

const game = new Game();
game.start();
