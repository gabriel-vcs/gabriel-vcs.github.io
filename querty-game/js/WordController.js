export default class WordController {
  wordMap = [];
  constructor() {}

  buildWordMap() {
    const gameElm = document.getElementById("game");
    const panelElm = document.getElementById("panel");
    const gameElmRect = gameElm.getBoundingClientRect();
    const panelElmRect = panelElm.getBoundingClientRect();

    this.position = [gameElmRect.x, gameElmRect.y];
  }
}
