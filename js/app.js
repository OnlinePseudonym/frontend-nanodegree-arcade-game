function getSpeed(min, max) {
    return Math.floor(Math.random() * (max-min))+min;
}
// Enemies our player must avoid
var Enemy = function(startLane) {
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

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // ensure the game runs at the same speed for all computers.
    this.x += this.speed * dt;

    if (this.x > 505) {
        this.x = -101;
    };

    this.checkCollisions();
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollisions = function() {
    var spriteOffset = 20;
    var enemyRect = {
        x: this.x,
        y: this.y + this.rowOffset,
        width: 100,
        height: 70
    };
    var playerRect = {
        x: player.x + spriteOffset,
        y: player.y + player.rowOffset,
        width: 60,
        height: 80,
    };

    if (
        enemyRect.x < playerRect.x + playerRect.width &&
        enemyRect.x + enemyRect.width > playerRect.x &&
        enemyRect.y < playerRect.y + playerRect.height &&
        enemyRect.y + enemyRect.height > playerRect.y
    ) {
        console.log("collision detected");
        player.reset();
    };
};

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
                if (this.x > 0) {
                    this.x = this.x - this.col;
                };
                break;
            case 'up':
                this.y = this.y - this.row;
                console.log("B");
                break;
            case 'right':
                if (this.x < 4 * this.col) {
                    this.x = this.x + this.col;
                };
                break;
            case 'down':
                if (this.y < 5 * this.row - this.rowOffset) {
                    this.y = this.y + this.row;
                }
                break;
        }
    }
    this.x = this.startPos.col * this.col;
    this.y = this.startPos.row * this.row - this.rowOffset;
};

// Update the player's position
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    if (this.y < this.row - this.rowOffset) {
      window.alert("CONGRATULATIONS! Level passed!");
      player.reset();
    };
};

Player.prototype.reset = function() {
    this.x = this.startPos.col * this.col;
    this.y = this.startPos.row * this.row - this.rowOffset;
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var enemyA = new Enemy(1);
var enemyB = new Enemy(2);
var enemyC = new Enemy(3);
var enemyD = new Enemy(2);

var allEnemies = [enemyA, enemyB, enemyC, enemyD];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
