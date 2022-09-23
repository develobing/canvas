// Screens and game states
// 1. Initial screen
// 2. Game playing screen
// 3. Game over screen
var INITIAL = 1;
var GAME_PLAYING = 2;
var GAME_OVER = 3;

// Key maps
var KEY_CODE = {
  R: 82,
};

function FlappyMonster(canvas) {
  // Base
  var game = this;

  // Global attributes
  game.canvas = canvas;
  game.context = game.canvas.getContext('2d');

  // Game state
  game.currentState = INITIAL;

  // Game speed
  game.velocity = 5;

  // Events
  game.bindEvents();

  // Create game objects
  game.createObjects();
}

FlappyMonster.prototype.createObjects = function () {
  // Base
  var game = this;

  // Background
  game.background1 = new GameBackground('images/back.png', game.canvas);
  game.background2 = new GameBackground('images/back.png', game.canvas);
  game.background2.x = game.canvas.width;

  // Score
  game.gameScore = new GameScore(game.canvas);
  game.gameScore.x = game.canvas.width - 150;
  game.gameScore.y = 80;

  // Wall Factory
  game.wallFactory = new WallFactory(game.canvas);

  // Monster
  game.monster = new Monster('images/monster.png', game.canvas);
};

FlappyMonster.prototype.bindEvents = function () {
  // Base
  var game = this;

  // Mouse L istener
  game.canvas.addEventListener('click', function (event) {
    switch (game.currentState) {
      case INITIAL:
        game.currentState = GAME_PLAYING;
        game.wallFactory.generateWalls();
        break;

      case GAME_PLAYING:
        // Draw playing screen
        game.monster.vy = -1 * game.velocity;
        break;
    }
  });

  // Key Listener
  document.addEventListener('keydown', function (event) {
    switch (game.currentState) {
      case GAME_OVER:
        if (event.keyCode === KEY_CODE.R) {
          game.reset();
          game.currentState = GAME_PLAYING;
        }
        break;
    }
  });
};

FlappyMonster.prototype.reset = function () {
  // Base
  var game = this;

  // Reset states
  game.gameScore.start = new Date();
  game.gameScore.score = 0;
  game.wallFactory.walls = [];
  game.monster.x = 115;
  game.monster.y = 115;
};

FlappyMonster.prototype.start = function () {
  // Base
  var game = this;

  // Start game
  window.requestAnimationFrame(function () {
    game.runGameLoop();
  });
};

FlappyMonster.prototype.runGameLoop = function () {
  // Base
  var game = this;

  // Game state
  switch (game.currentState) {
    case INITIAL:
      // Draw initial screen
      game.drawInitialScreen();
      break;

    case GAME_PLAYING:
      // Draw game playing screen
      game.drawGamePlayingScreen();
      break;

    case GAME_OVER:
      // Draw game over screen
      game.drawGameOverScreen();
      break;
  }

  // Start game
  window.requestAnimationFrame(function () {
    game.runGameLoop();
  });
};

FlappyMonster.prototype.drawInitialScreen = function () {
  // Base
  var game = this;

  // Draw backgorund
  game.context.fillStyle = 'black';
  game.context.fillRect(0, 0, game.canvas.width, game.canvas.height);

  // Draw text
  game.context.fillStyle = 'white';
  game.context.font = '30px Arial';
  game.context.textAlign = 'center';
  game.context.textBaseline = 'bottom';
  game.context.fillText(
    'Click to start',
    game.canvas.width / 2,
    game.canvas.height / 2
  );
};

FlappyMonster.prototype.drawGamePlayingScreen = function () {
  // Base
  var game = this;

  // Clear canvas
  game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);

  // Draw background
  game.animateBackground();

  // Draw score
  game.gameScore.draw();

  // Draw walls
  game.drawWalls();

  // Draw monster
  game.monster.draw();

  // Collision check
  game.checkCollisions();
};

FlappyMonster.prototype.checkCollisions = function () {
  // Base
  var game = this;

  // Check collision with walls
  var walls = game.wallFactory.walls;

  for (var i = 0; i < walls.length; i++) {
    if (game.isCollided(game.monster, walls[i])) {
      // Game over
      game.currentState = GAME_OVER;
    }
  }

  // Check collision with ground
  if (game.monster.y + game.monster.h >= game.canvas.height) {
    // Game over
    game.currentState = GAME_OVER;
  }
};

FlappyMonster.prototype.isCollided = function (monster, wall) {
  // Base
  var game = this;

  // Check collision
  var isCollided = true;

  // Monster coordinates
  var monsterTop = monster.y;
  var monsterBottom = monster.y + monster.h;
  var monsterLeft = monster.x;
  var monsterRight = monster.x + monster.w;

  // Wall coordinates
  var wallTop = wall.y + wall.h + wall.gap;
  var wallBottom = wall.y + wall.h;
  var wallLeft = wall.x;
  var wallRight = wall.x + wall.w;

  if (
    (monsterBottom < wallTop && monsterTop > wallBottom) ||
    monsterLeft > wallRight ||
    monsterRight < wallLeft
  ) {
    isCollided = false;
  }

  return isCollided;
};

FlappyMonster.prototype.drawWalls = function () {
  // Base
  var game = this;

  // Draw walls
  var walls = game.wallFactory.walls;

  for (var i = 0; i < walls.length; i++) {
    walls[i].draw();
    walls[i].x = walls[i].x - game.velocity;
  }

  // Remove extra walls
  game.removeExtraWalls();
};

FlappyMonster.prototype.removeExtraWalls = function () {
  // Base
  var game = this;

  // Draw walls
  var walls = game.wallFactory.walls;

  for (var i = 0; i < walls.length; i++) {
    if (walls[i].x + walls[i].w < 0) {
      // remove
      walls.shift();
    }
  }
};

FlappyMonster.prototype.animateBackground = function () {
  // Base
  var game = this;

  // Draw background 1
  game.background1.draw();

  if (Math.abs(game.background1.x) >= game.canvas.width) {
    game.background1.x = game.canvas.width - game.velocity;
  }
  game.background1.x = game.background1.x - game.velocity;

  // Draw background 2
  game.background2.draw();

  if (Math.abs(game.background2.x) >= game.canvas.width) {
    game.background2.x = game.canvas.width - game.velocity;
  }
  game.background2.x = game.background2.x - game.velocity;
};

FlappyMonster.prototype.drawGameOverScreen = function () {
  // Base
  var game = this;

  // Draw backgorund
  game.context.fillStyle = 'black';
  game.context.fillRect(0, 0, game.canvas.width, game.canvas.height);

  // Draw text
  // Game over message
  game.context.fillStyle = 'white';
  game.context.font = '36px Arial';
  game.context.textAlign = 'center';
  game.context.textBaseline = 'bottom';
  game.context.fillText(
    'Game over :(',
    game.canvas.width / 2,
    game.canvas.height / 2
  );

  // Game score message
  game.context.font = '46px Arial';
  game.context.textAlign = 'center';
  game.context.textBaseline = 'bottom';
  game.context.fillText(
    `Your Score: ${game.gameScore.score}`,
    game.canvas.width / 2,
    game.canvas.height / 2 - 80
  );

  // Press R to restart message
  game.context.font = '24px Arial';
  game.context.textAlign = 'center';
  game.context.textBaseline = 'bottom';
  game.context.fillText(
    'Press R to restart!',
    game.canvas.width / 2,
    game.canvas.height / 2 + 70
  );
};
