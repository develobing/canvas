function GameBackground(src, canvas) {
  // Base
  var bg = this;

  // Global attributes
  bg.canvas = canvas;
  bg.context = bg.canvas.getContext('2d');

  // Specific
  bg.x = 0;
  bg.y = 0;
  bg.w = bg.canvas.width;
  bg.h = bg.canvas.height;
  bg.src = src;

  // Create background image
  bg.create();
}

GameBackground.prototype.create = function () {
  // Base
  var bg = this;

  // Create image
  bg.img = new Image();
  bg.img.src = bg.src;
};

GameBackground.prototype.draw = function () {
  // Base
  var bg = this;

  // Draw image
  if (bg.img != null) {
    bg.context.drawImage(bg.img, bg.x, bg.y, bg.w, bg.h);
  }
};
