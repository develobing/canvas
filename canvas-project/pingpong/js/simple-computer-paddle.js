const SimpleComputerPaddle = (canvas, ball) => {
  const paddle = Paddle(canvas, ball);
  const changes = {
    x: canvas.width - paddle.width,
    bounceY() {
      this.dy *= -1;
    },
    update() {
      this.y += this.dy;
    },
    collideWithBall() {
      const withInX = ball.x >= this.x - ball.radius;
      const withInY = ball.y >= this.y && ball.y <= this.y + this.height;

      return withInX && withInY;
    },
  };

  return Object.assign(paddle, changes);
};
