onload = () => {
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  // learnScale(context);
  // learnRotate(context);
  // learnTranslate(context);
  learnTransformation(context);
};

function learnScale(context) {
  // Red rectangle
  context.fillStyle = 'red';
  context.fillRect(50, 50, 100, 100);

  // Scale
  // context.scale(2, 2);
  context.scale(0.5, 0.5);

  // Blue rectangle
  context.fillStyle = 'blue';
  context.fillRect(50, 50, 100, 100);

  // Scale
  // context.scale(2, 2);
  context.scale(0.5, 0.5);

  // Blue rectangle
  context.fillStyle = 'green';
  context.fillRect(50, 50, 100, 100);
}

function learnRotate(context) {
  var radian = Math.PI / 180;

  // Rotate
  context.rotate(30 * radian);

  // Red rectangle
  context.fillStyle = 'red';
  context.fillRect(350, 200, 150, 150);
}

function learnTranslate(context) {
  // Red rectangle
  context.fillStyle = 'red';
  context.fillRect(50, 50, 100, 100);

  // Translate
  context.translate(100, 100);

  // Blue rectangle
  context.fillStyle = 'blue';
  context.fillRect(50, 50, 100, 100);
}

function learnTransformation(context) {
  // Red rectangle
  context.fillStyle = 'red';
  context.fillRect(50, 50, 100, 100);

  // Transformation
  // context.transform(1.5, 0, 0, 1.5, 0, 0); // Scale
  // context.setTransform(1.5, 0, 0, 1.5, 0, 0); // Scale
  context.transform(1.5, 0, 0, 1.5, 100, 100); // Translate

  // Blue rectangle
  context.fillStyle = 'blue';
  context.fillRect(50, 50, 100, 100);

  // Transformation
  // context.transform(1.5, 0, 0, 1.5, 0, 0); // Scale
  // context.setTransform(1.5, 0, 0, 1.5, 0, 0); // Scale
  // context.transform(1.5, 0, 0, 1.5, 100, 100); // Translate
  context.resetTransform(); // Reset

  // Blue rectangle
  context.fillStyle = 'green';
  context.fillRect(50, 50, 100, 100);
}
