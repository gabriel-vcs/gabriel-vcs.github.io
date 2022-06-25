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
    const enemy = new Word();
    this.words.push(enemy);
    this.intervalId = setInterval(() => {
      // timer++;
      // if (timer % (60 / this.speed) === 0) {
      // this.enemies = new Enemy();
      // }
      this.words.forEach((word) => {
        // enemy.
      });
    }, 50);
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
  constructor() {
    this.elm = null;
    this.position = [0, 0];
    this.orientation = 0;
    this.elm = this.getNewElement();
  }
  getNewElement() {
    const divElm = document.createElement("div");
  }
}

class Player extends DomElement {
  constructor() {
    super();
    this.health = 100;
    this.points = 0;
    this.elm = document.getElementById("player");
  }
}

class Word extends DomElement {
  constructor() {
    super();
    this.word = this.getRndWord();
    this.distanceToPlayer = 100;
    this.orientation = 0;
  }
  getRndWord() {
    console.log(words[Math.floor(Math.random() * words.length)]);
  }
}

const game = new Game();
game.start();
