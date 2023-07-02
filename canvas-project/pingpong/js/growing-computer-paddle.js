const GrowingComputerPaddle = (canvas, ball) => {
  const paddle = SimpleComputerPaddle(canvas, ball);
  const changes = {
    lastChange: Date.now(),
    growTime: 3, // seconds before the next growth
    dHeight: 10, // pixels to grow
    heightLimit: 400,
    update() {
      this.move();
      const deltaTime = Math.abs(this.lastChange - Date.now()) / 1000;

      if (deltaTime > this.growTime && this.height < this.heightLimit) {
        this.height += this.dHeight;
        this.lastChange = Date.now();
      }
    },
    move: paddle.update,
  };

  return Object.assign(paddle, changes);
};
