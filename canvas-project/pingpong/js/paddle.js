// Paddle
const Paddle = (canvas, ball) => ({
  x: 0,
  y: canvas.height / 2 - canvas.height / 6,
  dy: 15,
  width: canvas.width / 50,
  height: canvas.height / 3,
  color: 'salmon',
  hitTop() {
    return this.y <= 0;
  },
  hitBottom() {
    return this.y >= canvas.height - this.height;
  },
  render(ctx) {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.restore();
  },
});
