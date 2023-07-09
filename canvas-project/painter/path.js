class Path {
  constructor(color, size) {
    this.points = [];
    this.color = color;
    this.size = size;
  }

  addPointFromEvent(e) {
    const { offsetX: x, offsetY: y } = e;
    this.points.push(new Point(x, y));
  }

  render(ctx) {
    if (this.points.length < 1) return;

    const [first, ...rest] = this.points;

    ctx.save();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.size;
    ctx.beginPath();
    ctx.moveTo(first.x, first.y);

    let before;
    rest.forEach((point, i) => {
      // Basic Line
      // ctx.lineTo(point.x, point.y);
      // ctx.moveTo(point.x, point.y);

      // Quadratic Curve
      if (point.x != undefined && point.y != undefined) {
        ctx.moveTo(point.x, point.y);
        if (before != undefined) {
          ctx.lineTo(before.x, before.y);
          ctx.quadraticCurveTo(point.x, point.y, before.x, before.y);
        }
      }

      before = point;
    });

    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }
}
