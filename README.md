# Description

OOP game built with web technologies (html, css, javascript) designed to improve your typing speed. You will see lots of words coming from any corner of the main screen towards the center, which represents the player. If the word is typed correctly in the input box at the bottom, the word will be killed, if not it will get closer and closer till it explodes near the player, causing the health counter initially set at 100 to go down. The list of words is based on the 3000 most used words in english.

# How to play

* In the initial red panel select the difficulty level. 
    * In lower levels there will be shorter words and they will appear less often
    * In higher levels there will be longer words and they will appear more often
* Select also an extra option
    * Uppercase will make the words to appear with first letter in uppercase
    * Number will make the words have an added number at the end
    * And the same for special characters, making the "word" more difficult to type
* Click "Enter" to start the game and start typing
* You can exit the game by just pressing the ESC key at any moment 
* And of course if the health counter drops to cero it will mean game over.  



# Demo

https://gabriel-vcs.github.io/quertygame/



# Further Improvements:

Functionality:
- [ ] detach logic & DOM manipulation
- [ ] add the pronuncionation sound of every word typed in order to practice listening
- [ ] add more languages
- [ ] add more symbols to practice coding faster
- [ ] add images to words
- [ ] Add detonateAll & GetFullHealth icons randomly

Code quality:
-   apply OOP inheritance
-   apply clean code principles


# TIPS

To  be able to debug easily add this events listener:
```javascript
        window.addEventListener('keydown', (event) => {
            switch (event.key.toLowerCase()) {
                case 'n':
                    this.words.push(new Word(this.level));
                    break;
                case 'm':
                    this.words.forEach((word) => {
                        word.moveElement(this.player);
                    });
                    break;
                default:
                    console.log('pressed key...' + event.key);
            }
        });
```