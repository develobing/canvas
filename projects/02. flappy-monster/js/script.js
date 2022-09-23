onload = () => {
  // Canvas
  var canvas = document.getElementById('flappy-monster-game');

  // Game Object
  var flappyMonster = new FlappyMonster(canvas);
  flappyMonster.start();
};
