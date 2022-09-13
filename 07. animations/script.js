onload = () => {
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  // learnAnimationBasic(context, canvas);
  // learnBouncingBall(context);
  // learnSprite(context);
  learnCharacterMoving(context);
};

function learnAnimationBasic(context, canvas) {
  // Fallback for browsers that don't support requestAnimationFrame
  // setAnimationFrame();

  drawRandomColorRectangle(context, canvas);
}

// Record start time
var startTime = new Date();
function drawRandomColorRectangle(context, canvas) {
  // Calculate the time
  var currentTime = new Date();
  if (currentTime - startTime > 1000) {
    startTime = currentTime;

    // Clear Canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    var color = createRandomRGBColor();
    var fillOpacity = Math.random();
    var fillColor =
      'rgba(' +
      color.r +
      ',' +
      color.g +
      ',' +
      color.b +
      ',' +
      fillOpacity +
      ')';
    var borderColor = 'rgba(' + color.r + ',' + color.g + ',' + color.b + ')';

    var x = getRandomInt(0, canvas.width);
    var y = getRandomInt(0, canvas.height);
    var w = getRandomInt(0, canvas.width - x);
    var h = getRandomInt(0, canvas.height - y);

    // Draw the rectangle
    context.beginPath();
    context.lineWidth = 1;
    context.strokeStyle = borderColor;
    context.fillStyle = fillColor;
    context.rect(x, y, w, h);
    context.stroke();
    context.fill();
  }

  // Animate
  window.requestAnimationFrame(() => drawRandomColorRectangle(context, canvas));
}

function setAnimationFrame() {
  window.requestAnimationFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();
}

function createRandomRGBColor() {
  var red = getRandomInt(0, 257);
  var green = getRandomInt(0, 257);
  var blue = getRandomInt(0, 257);
  return { r: red, g: green, b: blue };
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// Sprite animation variables
var cellIndex = 0;
var startTime = new Date();
var cellWidth = 192;
var cellHeight = 200;
var tile = new Image();

function learnSprite(context) {
  tile.src = 'tile.png';

  tile.onload = () => {
    context.drawImage(tile, 0, 0, 768, 200, 10, 0, 768, 200);
    animateSprite(context);
  };
}

function drawTileCell(context, tile, cellWidth, cellHeight, index) {
  context.drawImage(
    tile,
    index * cellWidth,
    0,
    cellWidth,
    cellHeight,
    300,
    300,
    cellWidth,
    cellHeight
  );
}

function animateSprite(context) {
  // Calculate the time
  var currentTime = new Date();
  if (currentTime - startTime >= 100) {
    startTime = currentTime;

    // Clear Canvas
    context.clearRect(0, 200, canvas.width, canvas.height - 200);

    // Update
    cellIndex++;
    cellIndex = cellIndex % 4;

    // Draw
    drawTileCell(context, tile, cellWidth, cellHeight, cellIndex);
  }

  // Animate
  window.requestAnimationFrame(() => animateSprite(context));
}

// Bouncing animation variables
var ballX = 250;
var ballY = 250;
var ballRadius = 30;
var ballColor = 'red';
var changeX = 5;
var changeY = 5;

function learnBouncingBall(context) {
  // Start the animation loop
  animateBouncing(context);
}

function drawTileCell(context, tile, cellWidth, cellHeight, index) {
  context.drawImage(
    tile,
    index * cellWidth,
    0,
    cellWidth,
    cellHeight,
    300,
    300,
    cellWidth,
    cellHeight
  );
}

function animateBouncing(context) {
  // Clear Canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Update

  // Top edge
  if (ballY - ballRadius <= 0) {
    changeY *= -1;
  }

  // Bottom edge
  if (ballY + ballRadius >= canvas.height) {
    changeY *= -1;
  }

  // Right edge
  if (ballX + ballRadius >= canvas.width) {
    changeX *= -1;
  }

  // Left edge
  if (ballX - ballRadius <= 0) {
    changeX *= -1;
  }

  ballX += changeX;
  ballY += changeY;

  // Draw the ball
  drawBall(context, ballX, ballY, ballRadius, ballColor);

  // Animate
  window.requestAnimationFrame(() => animateBouncing(context));
}

function drawBall(context, x, y, radius, color) {
  var radian = Math.PI / 180;

  context.beginPath();
  context.strokeStyle = color;
  context.fillStyle = color;
  context.arc(x, y, radius, 0, 360 * radian, false);
  context.stroke();
  context.fill();
}

// Character animation variables
var background = new Image();
var character = new Image();
var cellWidth = 256;
var cellHeight = 256;
var currentCell = 0;
var moveAmount = 10;
var moveX = 100;
var startTime = new Date();
var isBackgroundLoaded = false;
var isCharacterLoaded = false;

function learnCharacterMoving(context) {
  // Load background
  background.src = 'back.png';
  background.onload = () => {
    isBackgroundLoaded = true;
  };

  // Load character
  character.src = 'character.png';
  character.onload = () => {
    isCharacterLoaded = true;
  };

  // Animate
  animateCharacter(context);
}

function animateCharacter(context) {
  // Calculate the time
  var currentTime = new Date();
  if (currentTime - startTime >= 50) {
    startTime = currentTime;

    // Clear Canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Update
    currentCell++;
    currentCell = currentCell % 6;

    if (moveX >= canvas.width) {
      moveX = -1 * cellWidth;
    } else {
      moveX = moveX + moveAmount;
    }

    // Draw
    if (isBackgroundLoaded) {
      context.drawImage(background, 0, 0, canvas.width, canvas.height);
    }
    if (isCharacterLoaded) {
      context.drawImage(
        character,
        currentCell * cellWidth,
        0,
        256,
        256,
        moveX,
        400,
        100,
        100
      );
    }
  }

  // Animate
  window.requestAnimationFrame(() => animateCharacter(context));
}
