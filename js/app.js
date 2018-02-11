// Enemies our player must avoid
var Enemy = function(sprite, x, y, speed = 1) {
    // Variables applied to each of our instances go here
    this.sprite = sprite;
	this.x = x;
	this.y = y;
	this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // calculate the new position
	this.x = (this.x + dt * this.speed) % 10;
	
	// check collisions
	if(Math.round(this.x) == player.x && Math.round(this.y) == player.y) {
    	player.resetGame();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    window.ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
};

// Player
var Player = function(sprite, x, y) {
	Enemy.call(this, sprite, x, y);
}

Player.prototype = Object.create(Enemy.prototype);
Player.prototype.constructor = Player;

// Player update method, no logic needed now.
Player.prototype.update = function() {
};

// Hanlde the input to set the position
Player.prototype.handleInput = function(key) {
	if(key === 'up' && this.y > 0) {
		this.y--;
		if(this.y == 0) {
			alert("You win!");
			this.resetGame();
		}
	}
	else if(key === 'down' && this.y < 5) {
		this.y++;
	}
	else if(key === 'left' && this.x > 0) {
		this.x--;
	}
	else if(key === 'right' && this.x < 4) {
		this.x++;
	}
};

// Reset the game
Player.prototype.resetGame = function() {
	this.x = 2;
    this.y = 5;
};

// Create the enemies and player for the game
var player = new Player('images/char-boy.png', 2, 5);
var allEnemies = [];
allEnemies.push(new Enemy('images/enemy-bug.png', 0, 1, 2));
allEnemies.push(new Enemy('images/enemy-bug.png', 0, 1, 5));
allEnemies.push(new Enemy('images/enemy-bug.png', 0, 2, 1));
allEnemies.push(new Enemy('images/enemy-bug.png', 0, 3, 3));


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
