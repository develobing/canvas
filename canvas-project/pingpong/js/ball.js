// Ball
let Ball = (canvas) => ({
  x: canvas.width / 2,
  y: canvas.height / 2,
  dx: -5,
  dy: 5,
  radius: 20,
  color: 'blue',
  update() {
    this.x += this.dx;
    this.y += this.dy;
  },
  bounceX() {
    this.dx *= -1;
  },
  bounceY() {
    this.dy *= -1;
  },
  hitTop() {
    return this.y < this.radius;
  },
  hitBottom() {
    return this.y > canvas.height - this.radius;
  },
  hitLeft() {
    return this.x < this.radius;
  },
  hitRight() {
    return this.x > canvas.width - this.radius;
  },
  render(ctx) {
    ctx.save();
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.closePath();
    ctx.restore();
  },
});
