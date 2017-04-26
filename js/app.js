function getSpeed(min, max) {
    return Math.floor(Math.random() * (max-min))+min;
}
// Enemies our player must avoid
var Enemy = function(startLane) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.col = 101;
    this.row = 83;
    this.rowOffset = 23;
    this.sprite = "images/enemy-bug.png";
    this.x = -this.col;
    this.y = (startLane * this.row) - this.rowOffset;
    this.speed = getSpeed(100, 600);

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    if (this.x > 505) {
        this.x = -101;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Player class
var Player = function() {
    this.col = 101;
    this.row = 83;
    this.rowOffset = 13
    this.startPos = {
        row:5,
        col:2
    };
    this.sprite = "images/char-boy.png"
    this.handleInput = function(input) {
        switch (input) {
            case 'left':
                this.x = this.x - this.col;
                console.log("A");
                break;
            case 'up':
                this.y = this.y - this.row;
                console.log("B");
                break;
            case 'right':
                this.x = this.x + this.col;
                console.log("C");
                break;
            case 'down':
                this.y = this.y + this.row;
                console.log("D");
                break;
        }
    }
    this.x = this.startPos.col * this.col;
    this.y = this.startPos.row * this.row - this.rowOffset;
};

// Update the player's position
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    if ((this.y < - this.rowOffset) || (this.y > 5 * this.row - this.rowOffset)) {
        this.y = 5 * this.row - this.rowOffset;
    };
    if (this.x < 0) {
        this.x = 0;
    };
    if (this.x > 4 * this.col) {
        this.x = 4 * this.col;
    }
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemyA = new Enemy(1);
var enemyB = new Enemy(2);
var enemyC = new Enemy(3);
var enemyD = new Enemy(2);

var allEnemies = [enemyA, enemyB, enemyC, enemyD];
var player = new Player();


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
