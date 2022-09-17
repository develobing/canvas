onload = () => {
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  // learnKeyEvents(context, canvas);
  // learnMouseEvents(context, canvas);
  // learnMouseEventsWithBall(context, canvas);
  learnDragAndDrop(context, canvas);
};

function learnKeyEvents(context, canvas) {
  var x = 30;
  var y = 30;
  var width = 100;
  var height = 100;

  const drawRect = (x, y) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'red';
    context.fillRect(x, y, width, height);
  };

  drawRect(x, y);

  // Key maps
  var KEY_CODE = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
  };

  window.addEventListener('keydown', (event) => {
    var { key, keyCode } = event;

    switch (keyCode) {
      case KEY_CODE.LEFT:
        console.log('left pressed');
        x -= 10;
        drawRect(x, y);

        break;
      case KEY_CODE.UP:
        console.log('up pressed');
        y -= 10;
        drawRect(x, y);

        break;
      case KEY_CODE.RIGHT:
        x += 10;
        drawRect(x, y);
        console.log('right pressed');

        break;
      case KEY_CODE.DOWN:
        console.log('down pressed');
        y += 10;
        drawRect(x, y);
        break;
    }
  });
}

function learnMouseEvents(context, canvas) {
  canvas.addEventListener('mousedown', (e) => {
    console.log('mousedown', e);
  });

  canvas.addEventListener('mouseup', (e) => {
    console.log('mouseup', e);
  });

  // canvas.addEventListener('mousemove', (e) => {
  //   console.log('mousemove', e);
  // });

  canvas.addEventListener('click', (e) => {
    console.log('click', e);
  });

  canvas.addEventListener('dblclick', (e) => {
    console.log('dblclick', e);
  });

  canvas.addEventListener('mouseover', (e) => {
    console.log('mouseover', e);
  });

  canvas.addEventListener('mouseout', (e) => {
    console.log('mouseout', e);
  });
}

function learnMouseEventsWithBall(context, canvas) {
  var ball;
  var mouseX = 0;
  var mouseY = 0;

  // Mouse events
  canvas.addEventListener('mousemove', (e) => {
    var boundings = canvas.getBoundingClientRect();
    mouseX = e.clientX - boundings.left;
    mouseY = e.clientY - boundings.top;
  });

  drawBall(context);

  function drawBall(context) {
    ball = new Ball(30, 'red');
    ball.x = 100;
    ball.y = 50;
    ball.g = 0.098;
    ball.context = context;
    ball.draw();

    // Velocity
    // ball.vy = 5;

    ballAnimationLoop(context);
  }

  function ballAnimationLoop(context) {
    // Clear Canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Update
    ball.vy = ball.vy + ball.g;
    ball.y = ball.y + ball.vy;

    // Mouse collision check
    if (
      Math.sqrt(Math.pow(ball.x - mouseX, 2) + Math.pow(ball.y - mouseY, 2)) <
      ball.r
    ) {
      console.log('collision');
      ball.vy *= -1;
    }

    // Draw
    ball.draw();

    // Animate
    window.requestAnimationFrame(() => ballAnimationLoop(context));
  }
}

function learnDragAndDrop(context, canvas) {
  // Specs
  var balls = 10;
  var ballsArr = [];
  var currentBall = null;
  var boundings = canvas.getBoundingClientRect();

  // Create balls
  for (let i = 0; i < balls; i++) {
    var radius = getRandomInt(25, 50);
    var randomColor = createRandomRGBColor();
    var ballColor = `rgb(${randomColor.r}, ${randomColor.g}, ${randomColor.b})`;
    var ball = new Ball(radius, ballColor);

    ball.context = context;
    ball.x = getRandomInt(radius, canvas.width - radius);
    ball.y = getRandomInt(radius, canvas.height - radius);
    ballsArr.push(ball);
  }

  // Draw balls
  function drawBalls() {
    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw balls
    for (let i = 0; i < ballsArr.length; i++) {
      ballsArr[i].draw();
    }
  }

  drawBalls();

  function hitOnBall(mx, my) {
    for (let i = ballsArr.length - 1; i >= 0; i--) {
      if (
        Math.sqrt(
          Math.pow(mx - ballsArr[i].x, 2) + Math.pow(my - ballsArr[i].y, 2)
        ) < ballsArr[i].r
      ) {
        console.log('clicked on ball', i);

        currentBall = ballsArr.splice(i, 1)[0];
        ballsArr.push(currentBall);
        break;
      }
    }

    return null;
  }

  // Mouse events handlers
  canvas.addEventListener('mousedown', (e) => {
    // console.log('mousedown', e);

    var mouseX = e.clientX - boundings.left;
    var mouseY = e.clientY - boundings.top;

    hitOnBall(mouseX, mouseY);
  });

  canvas.addEventListener('mousemove', (e) => {
    // console.log('mousemove', e);

    var mouseX = e.clientX - boundings.left;
    var mouseY = e.clientY - boundings.top;

    if (currentBall) {
      currentBall.x = mouseX;
      currentBall.y = mouseY;
      drawBalls();
    }
  });

  canvas.addEventListener('mouseup', (e) => {
    // console.log('mouseup', e);

    currentBall = null;
  });
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
