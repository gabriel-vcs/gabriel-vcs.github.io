# Description

OOP game built with web technologies (html, css, javascript)

# How to play

Move player with arrow keys :)

# Demo

https://gabriel-vcs.github.io/querty-game/index.html

# Further Improvements:

Fix:
-   [x] Once words appear wait 1-2 sec for them to showup, then continue

Functionality:
-   [x] shooting
-   [x] avoid repeating code
-   [] Add UpperCase, Numbers, Symbols
-   [ ] drop different things
-   [ ] count points
-   [ ] improve game over
-   [ ] settings (speed, level)
-   [ ] Game Over buttom that clears the interval

UX:
-   sound

Code quality:
-   apply OOP inheritance
-   detach logic & DOM manipulation


# TIPS

To  be able to debug easily add this event listener:
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