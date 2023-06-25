function Wall(canvas) {
  // Base
  var wall = this;

  // Global attributes
  wall.canvas = canvas;
  wall.context = wall.canvas.getContext('2d');

  // Specifications
  wall.x = wall.canvas.width;
  wall.y = 0;
  wall.w = 100;
  wall.h = 0;
  wall.gap = 0;
  wall.color = getRandomColor();
}

Wall.prototype.draw = function () {
  // Base
  var wall = this;

  // Wall color
  wall.context.save();
  wall.context.fillStyle = wall.color;

  // Draw upper part
  wall.context.fillRect(wall.x, wall.y, wall.w, wall.h);

  // Draw lower part
  wall.context.fillRect(wall.x, wall.h + wall.gap, wall.w, wall.canvas.height);

  // Restore context
  wall.context.restore();
};
