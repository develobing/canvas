function GameScore(canvas) {
  // Base
  var gameScore = this;

  // Global attributes
  gameScore.canvas = canvas;
  gameScore.context = gameScore.canvas.getContext('2d');

  // Specifications
  gameScore.isStart = false;
  gameScore.score = 0;
  gameScore.x = 0;
  gameScore.y = 0;
}

GameScore.prototype.draw = function () {
  // Base
  var gameScore = this;

  // Game start
  if (!gameScore.isStart) {
    gameScore.start = new Date();
    gameScore.isStart = true;
  }

  // Draw
  var currentTime = new Date();
  gameScore.score = parseFloat((currentTime - gameScore.start) / 1000).toFixed(
    1
  );
  gameScore.context.font = '45px Verdana';
  gameScore.context.fillText(gameScore.score, gameScore.x, gameScore.y);
};
