// Randomize speed given a min and max
function getSpeed(min, max) {
    return Math.floor(Math.random() * (max-min))+min;
}
// Enemies our player must avoid
var Enemy = function(startLane) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.col = 101; // col width
    this.row = 83; // row height
    this.rowOffset = 23; //center sprite in row
    this.sprite = "images/enemy-bug.png";
    this.x = -this.col;
    this.y = (startLane * this.row) - this.rowOffset;
    this.speed = getSpeed(100, 600); // set speed min and max

};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // ensure the game runs at the same speed for all computers.
    this.x += this.speed * dt;
    // when enemy goes offscreen reset to starting position
    if (this.x > 505) {
        this.x = -101;
    }

    this.checkCollisions();
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Check for collision with Player sprite
Enemy.prototype.checkCollisions = function() {
    var playerOffset = 20; //make collision occur more naturally
    // create enemy rectangle for collision check
    // set width/height of collision box
    var enemyRect = {
        x: this.x,
        y: this.y + this.rowOffset,
        WIDTH: 100,
        HEIGHT: 70
    };
    // create player rectangle for collision check
    // set width/height of collision box
    var playerRect = {
        x: player.x+ playerOffset,
        y: player.y + player.rowOffset,
        WIDTH: 60,
        HEIGHT: 80
    };
    //check whether rectangles collide
    // algorithm used from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    if (
        enemyRect.x < playerRect.x + playerRect.WIDTH &&
        enemyRect.x + enemyRect.WIDTH > playerRect.x &&
        enemyRect.y < playerRect.y + playerRect.HEIGHT &&
        enemyRect.y + enemyRect.HEIGHT > playerRect.y
    ) {
        player.reset(); //reset player on collision
    }
};

// Player class
var Player = function() {
    this.col = 101; //column width
    this.row = 83; //row height
    this.rowOffset = 13; //offset sprite to center in row
    //default starting position
    this.startPos = {
        row:5,
        col:2
    };
    this.sprite = "images/char-boy.png";
    //handle movement and limit movement to within grid
    this.handleInput = function(input) {
        switch (input) {
            case 'left':
                if (this.x > 0) {
                    this.x = this.x - this.col;
                }
                break;
            case 'up':
                this.y = this.y - this.row;
                break;
            case 'right':
                if (this.x < 4 * this.col) {
                    this.x = this.x + this.col;
                }
                break;
            case 'down':
                if (this.y < 5 * this.row - this.rowOffset) {
                    this.y = this.y + this.row;
                }
                break;
        }
    };
    //initialize starting pos
    this.reset();
};

// Update the player's position
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // display popup if player reaches water
    if (this.y < this.row - this.rowOffset) {
        window.alert("CONGRATULATIONS! Level passed!");
        this.reset();
    }
};

// Set starting position based on variables in player object
Player.prototype.reset = function() {
    this.x = this.startPos.col * this.col;
    this.y = this.startPos.row * this.row - this.rowOffset;
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//initialze enemies
var enemyA = new Enemy(1);
var enemyB = new Enemy(2);
var enemyC = new Enemy(3);
var enemyD = new Enemy(2);
var allEnemies = [enemyA, enemyB, enemyC, enemyD];

//initialize player
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
