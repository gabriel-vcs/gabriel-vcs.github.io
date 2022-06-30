# Description

OOP game built with web technologies (html, css, javascript)

# How to play

Move player with arrow keys :)

# Demo

https://gabriel-vcs.github.io/querty-game/index.html

# Further Improvements:

Fix:
-   [x] Once words appear wait 1-2 sec for them to showup, then continue
-   [x] Last resize of gameover 
-   [x] Weird effect on button
-   [x] Import classes from main.js

Functionality:
-   [x] shooting
-   [x] avoid repeating code
-   [x] Add UpperCase, Numbers, Symbols
-   [x] Add level combo boxes
-   [x] count points
-   [x] improve game over
-   [ ] add "restart" button at gameover => ESC key
-   [x] settings (speed, level)
-   [ ] add pronuncionation sound of every word typed
-   [ ] add more symbols to practice coding faster

UX:
-   [ ] Add detonateAll & GetFullHealth icons randomly

Code quality:
-   apply OOP inheritance
-   detach logic & DOM manipulation


# TIPS

To  be able to debug easily add this events listener:
```javascript
        window.addEventListener('keydown', (event) => {
            switch (event.key.toLowerCase()) {
                case 'escape':
                    clearInterval(this.intervalId);
                    break;
                case 'n':
                    this.words.push(new Word(this.level));
                    break;
                case 'm':
                    this.words.forEach((word) => {
                        word.moveElement(this.player);
                    });
                    break;
                case 'enter':
                    this.player.killWord(this.words[0]); //test
                    break;
                default:
                    console.log('pressed key...' + event.key);
            }
        });
```