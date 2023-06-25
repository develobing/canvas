onload = () => {
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  // testDrawBall(context);
  // learnVelocity(context);
  // learnAcceleration(context);
  // learnVerticalProjection(context);
  // learnHorizontalProjection(context);
  // learnMomentum(context);
  learnMomentumTwoAxes(context);
};

// Ball variable
var ball;
function testDrawBall(context) {
  ball = new Ball(50, 'purple');
  ball.x = 200;
  ball.y = 200;
  ball.context = context;
  ball.draw();
}

function learnVelocity(context) {
  ball = new Ball(30, 'red');
  ball.x = 100;
  ball.y = 150;
  ball.context = context;
  ball.draw();

  // Velocity
  ball.vx = 3;
  ball.vy = 3;

  velocityAnimationLoop(context);
}

function learnAcceleration(context) {
  ball = new Ball(50, 'green');
  ball.x = 200;
  ball.y = 200;
  ball.context = context;
  ball.draw();

  // Velocity
  ball.vx = -1;
  ball.vy = 1;

  // Acceleration
  ball.ax = 0.1;
  ball.ay = -0.05;

  accelerationAnimationLoop(context);
}

var ball1, ball2, ball3;
function learnVerticalProjection(context) {
  // Ball 1
  ball1 = new Ball(50, 'red');
  ball1.x = 100;
  ball1.y = 100;
  ball1.context = context;
  ball1.draw();

  // Ball 2
  ball2 = new Ball(50, 'green');
  ball2.x = 350;
  ball2.y = 100;
  ball2.context = context;
  ball2.draw();

  // Ball 3
  ball3 = new Ball(50, 'blue');
  ball3.x = 600;
  ball3.y = 100;
  ball3.context = context;
  ball3.draw();

  // Gravity
  ball1.g = 0.098;
  ball2.g = 0.098;
  ball3.g = 0.098;

  // Velocity
  ball1.vy = 0;
  ball2.vy = 5;
  ball3.vy = -7;

  verticalProjectionAnimationLoop(context);
}

function learnHorizontalProjection(context) {
  // Ball 1
  ball1 = new Ball(50, 'red');
  ball1.x = 100;
  ball1.y = 100;
  ball1.context = context;
  ball1.draw();

  // Ball 2
  ball2 = new Ball(50, 'green');
  ball2.x = 100;
  ball2.y = 500;
  ball2.context = context;
  ball2.draw();

  // Gravity
  ball1.g = 0.098;
  ball2.g = 0.098;

  // Velocity
  ball1.vx = 5;
  ball1.vy = 0;
  ball2.vx = 10;
  ball2.vy = -5;

  horizontalProjectionAnimationLoop(context);
}

function learnMomentum(context) {
  // Large ball
  ball1 = new Ball(50, 'red');
  ball1.x = 190;
  ball1.y = 250;
  ball1.m = 10;
  ball1.context = context;
  ball1.draw();

  // Small ball
  ball2 = new Ball(30, 'green');
  ball2.x = 550;
  ball2.y = 250;
  ball2.m = 6;
  ball2.context = context;
  ball2.draw();

  // Velocity
  ball1.vx = 6;
  ball2.vx = -6;

  momentumAnimationLoop(context);
}

var balls = [];
function learnMomentumTwoAxes(context) {
  var numOfBalls = 10;

  for (var i = 0; i < numOfBalls; i++) {
    var radius = getRandomInt(10, 25);
    var ball = new Ball(radius);
    ball.x = getRandomInt(radius, canvas.width - radius);
    ball.y = getRandomInt(radius, canvas.height - radius);
    ball.m = radius;
    ball.context = context;
    ball.vx = getRandomInt(0, 20) - 10;
    ball.vy = getRandomInt(0, 20) - 10;
    ball.draw();
    balls.push(ball);
  }

  momentumTwoAxesAnimationLoop(context);
}

function velocityAnimationLoop(context) {
  // Clear Canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Update
  ball.x = ball.x + ball.vx;
  ball.y = ball.y + ball.vy;

  // Draw
  ball.draw();

  // Animate
  window.requestAnimationFrame(() => velocityAnimationLoop(context));
}

function accelerationAnimationLoop(context) {
  // Clear Canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Update
  ball.vx = ball.vx + ball.ax;
  ball.vy = ball.vy + ball.ay;
  ball.x = ball.x + ball.vx;
  ball.y = ball.y + ball.vy;

  // Draw
  ball.draw();

  // Animate
  window.requestAnimationFrame(() => accelerationAnimationLoop(context));
}

function verticalProjectionAnimationLoop(context) {
  // Clear Canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Update - Ball 1
  ball1.vy = ball1.vy + ball1.g;
  ball1.y = ball1.y + ball1.vy;

  // Update - Ball 2
  ball2.vy = ball2.vy + ball2.g;
  ball2.y = ball2.y + ball2.vy;

  // Update - Ball 3
  ball3.vy = ball3.vy + ball3.g;
  ball3.y = ball3.y + ball3.vy;

  // Draw
  ball1.draw();
  ball2.draw();
  ball3.draw();

  // Animate
  window.requestAnimationFrame(() => verticalProjectionAnimationLoop(context));
}

function horizontalProjectionAnimationLoop(context) {
  // Clear Canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Update - Ball 1
  ball1.vy = ball1.vy + ball1.g;
  ball1.x = ball1.x + ball1.vx;
  ball1.y = ball1.y + ball1.vy;

  // Update - Ball 2
  ball2.vy = ball2.vy + ball2.g;
  ball2.x = ball2.x + ball2.vx;
  ball2.y = ball2.y + ball2.vy;

  // Draw
  ball1.draw();
  ball2.draw();

  // Animate
  window.requestAnimationFrame(() =>
    horizontalProjectionAnimationLoop(context)
  );
}

function momentumAnimationLoop(context) {
  // Clear Canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Update
  ball1.x = ball1.x + ball1.vx;
  ball2.x = ball2.x + ball2.vx;

  // Detect Ball collision
  if (Math.abs(ball1.x - ball2.x) < ball1.r + ball2.r) {
    // New velocity of ball 1 after collision
    var v1 = ((ball1.m - ball2.m) * ball1.vx) / (ball1.m + ball2.m);
    v1 += (2 * ball2.m * ball2.vx) / (ball1.m + ball2.m);

    // New velocity of ball 2 after collision
    var v2 = ((ball2.m - ball1.m) * ball2.vx) / (ball2.m + ball1.m);
    v2 += (2 * ball1.m * ball1.vx) / (ball1.m + ball2.m);

    ball1.vx = v1;
    ball2.vx = v2;
  }

  // Detect Edge collision
  if (ball1.x + ball1.r > canvas.width || ball1.x - ball1.r < 0) {
    ball1.vx = -ball1.vx;
  }
  if (ball2.x + ball2.r > canvas.width || ball2.x - ball2.r < 0) {
    ball2.vx = -ball2.vx;
  }

  // Draw
  ball1.draw();
  ball2.draw();

  // Animate
  window.requestAnimationFrame(() => momentumAnimationLoop(context));
}

function momentumTwoAxesAnimationLoop(context) {
  // Clear Canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Update
  moveBalls(balls);
  checkBallCollision(balls);

  // Detect Ball collision
  drawBalls(balls);

  // Animate
  window.requestAnimationFrame(() => momentumTwoAxesAnimationLoop(context));
}

function move(ball, balls) {
  ball.x = ball.x + ball.vx;
  ball.y = ball.y + ball.vy;

  checkEdges(ball);
}

function checkEdges(ball) {
  // Detect Edge collision
  if (ball.x + ball.r > canvas.width || ball.x - ball.r < 0) {
    ball.vx = -ball.vx;
  }
  if (ball.y + ball.r > canvas.height || ball.y - ball.r < 0) {
    ball.vy = -ball.vy;
  }
}

function checkBallCollision(balls) {
  for (var i = 0; i < balls.length; i++) {
    var ball1 = balls[i];
    for (var j = i + 1; j < balls.length; j++) {
      if (i === j) continue;

      var ball2 = balls[j];
      var isCollided = checkCollision(ball1, ball2);
      if (isCollided) {
        // New horizontal velocity of ball 1 after collision
        var vx1 = ((ball1.m - ball2.m) * ball1.vx) / (ball1.m + ball2.m);
        vx1 += (2 * ball2.m * ball2.vx) / (ball1.m + ball2.m);

        // New horizontal velocity of ball 2 after collision
        var vx2 = ((ball2.m - ball1.m) * ball2.vx) / (ball2.m + ball1.m);
        vx2 += (2 * ball1.m * ball1.vx) / (ball1.m + ball2.m);

        ball1.vx = vx1;
        ball2.vx = vx2;

        // New vertical velocity of ball 1 after collision
        var vy1 = ((ball1.m - ball2.m) * ball1.vy) / (ball1.m + ball2.m);
        vy1 += (2 * ball2.m * ball2.vy) / (ball1.m + ball2.m);

        // New vertical velocity of ball 2 after collision
        var vy2 = ((ball2.m - ball1.m) * ball2.vy) / (ball2.m + ball1.m);
        vy2 += (2 * ball1.m * ball1.vy) / (ball1.m + ball2.m);

        ball1.vx = vy1;
        ball2.vx = vy2;
      }
    }
  }
}

function checkCollision(ball1, ball2) {
  return (
    Math.abs(ball1.x - ball2.x) < ball1.r + ball2.r &&
    Math.abs(ball1.y - ball2.y) < ball1.r + ball2.r
  );
}

function moveBalls(balls) {
  for (var i = 0; i < balls.length; i++) {
    move(balls[i], balls);
  }
}

function drawBalls(balls) {
  for (var i = 0; i < balls.length; i++) {
    balls[i].draw();
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

window.requestAnimationFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();
