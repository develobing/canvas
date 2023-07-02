// Human Player Paddle
const HumanPlayerPaddle = (canvas, ball) => {
  const paddle = Paddle(canvas, ball);
  const changes = {
    dy: 100,
    update(e) {
      const { keyCode } = e;

      switch (keyCode) {
        case KEYS.UP:
          this.y = Math.max(this.y - this.dy, 0);
          break;

        case KEYS.DOWN:
          this.y = Math.min(this.y + this.dy, canvas.height - this.height);
          break;

        default:
          break;
      }
    },

    collideWithBall() {
      const withInX = ball.x <= this.x + this.width + ball.radius;
      const withInY = ball.y >= this.y && ball.y <= this.y + this.height;

      return withInX && withInY;
    },
  };

  return Object.assign(paddle, changes);
};
