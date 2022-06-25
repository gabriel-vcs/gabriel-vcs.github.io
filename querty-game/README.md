# Description

OOP game built with web technologies (html, css, javascript)

# How to play

Move player with arrow keys :)

# Demo

https://gabriel-vcs.github.io/querty-game/index.html

# Further Improvements:

Definition:

- Clases

  - Game
    - properties
      	- player
        - enemies[]
        - level
		- language (optional)
		- useNumbers? (optional)
		- useSpecialchars? (optional)
	- methods
		- increaseLevel
  - Enemy
    - properties
		- word
		- distanceToPlayer
		- orientation 
		- image (optional)		
	-  method
		- getRndOrigen()
		- getRndWord()
		- getNextPosition() (calculate based on distance to player)
		- getRandomImage() (optional)
	
  - Player
    - properties
		- orientation
		- health
		- points (every enemy kill = length word)

  - DomElement
	- properties
		- position[x.y]
		- orientation
	- methods
		- getOrientation(origen, destination)
		
  

Functionality:

- [ ] shooting (recommended)
- [ ] drop different things (prizes, different types of obstacles...)
- [ ] count points
- [ ] improve game over
- [ ] levels (ex. increasing speed as user moves to the next level)
- [ ] multiple lives
- [ ] allow moving the player up and down
- [ ] settings (speed of the game, distance between obstacles)
- [ ] avoid repeating code for Player and Obstacle class (inheritance)
- [ ] prevent player from going outside

UX:

- add images (background, player, obstacles...)
- sound

Code quality:

- apply OOP inheritance
- detach logic & DOM manipulation
