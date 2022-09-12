onload = () => {
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  // learnLine(context);
  // learnZigZag(context);
  // learnLineCap(context);
  // learnLineJoin(context);
  // learnShadow(context);
  // learnShape(context);
  // learnCurve(context);
  // learnQuadraticCurve(context);
  // learnBezierCurve(context);
  practiceHeart(context);
};

function learnLine(context) {
  // Draw a line
  context.strokeStyle = 'red'; // color of the line
  context.lineWidth = 5; // width of the line
  context.beginPath(); // Reset the current path
  context.moveTo(15, 15); // starting point of the line
  context.lineTo(75, 15); // ending point of the line
  context.stroke(); // Draw the line

  // Another line
  // context.beginPath(); // Reset the current path
  // context.strokeStyle = 'blue';
  // context.moveTo(150, 10); // starting point of the line
  // context.lineTo(100, 120); // ending point of the line
  // context.stroke(); // Draw the line
}

function learnZigZag(context) {
  // Draw a new line
  context.strokeStyle = 'black'; // color of the line
  context.lineWidth = 1; // width of the line
  context.beginPath(); // Reset the current path
  context.moveTo(30, 30); // starting point of the line
  context.lineTo(80, 80); // ending point of the line
  context.lineTo(130, 30); // ending point of the line
  context.lineTo(180, 80); // ending point of the line
  context.lineTo(230, 30); // ending point of the line
  context.stroke(); // Draw the line

  // // Draw a zigzag line
  // context.strokeStyle = 'blue'; // color of the line
  // context.lineWidth = 1; // width of the line
  // context.beginPath(); // Reset the current path
  // context.moveTo(30, 30); // starting point of the line
  // context.lineTo(80, 80); // ending point of the line
  // context.stroke(); // Draw the line

  // context.beginPath(); // Reset the current path
  // context.moveTo(80, 80); // starting point of the line
  // context.lineTo(130, 30); // ending point of the line
  // context.stroke(); // Draw the line

  // context.beginPath(); // Reset the current path
  // context.moveTo(130, 30); // starting point of the line
  // context.lineTo(180, 80); // ending point of the line
  // context.stroke(); // Draw the line

  // context.beginPath(); // Reset the current path
  // context.moveTo(180, 80); // starting point of the line
  // context.lineTo(230, 30); // ending point of the line
  // context.stroke(); // Draw the line
}

function learnLineCap(context) {
  // Draw a line with lineCap
  context.beginPath();
  context.lineCap = 'butt';
  context.strokeStyle = 'red';
  context.lineWidth = 10;
  context.moveTo(100, 100);
  context.lineTo(250, 100);
  context.stroke();

  context.beginPath();
  context.lineCap = 'round';
  context.strokeStyle = 'blue';
  context.lineWidth = 10;
  context.moveTo(100, 125);
  context.lineTo(250, 125);
  context.stroke();

  context.beginPath();
  context.lineCap = 'square';
  context.strokeStyle = 'green';
  context.lineWidth = 10;
  context.moveTo(100, 150);
  context.lineTo(250, 150);
  context.stroke();
}

function learnLineJoin(context) {
  // Line joins
  // - miter / bevel / round
  context.beginPath();
  context.lineWidth = 20;
  context.strokeStyle = 'red';
  context.lineJoin = 'miter';
  context.moveTo(330, 30);
  context.lineTo(430, 30);
  context.lineTo(430, 130);
  context.lineTo(330, 130);
  context.lineTo(330, 230);
  context.stroke();

  context.beginPath();
  context.lineWidth = 20;
  context.strokeStyle = 'blue';
  context.lineJoin = 'bevel';
  context.moveTo(360, 60);
  context.lineTo(460, 60);
  context.lineTo(460, 160);
  context.lineTo(360, 160);
  context.lineTo(360, 260);
  context.stroke();

  context.beginPath();
  context.lineWidth = 20;
  context.strokeStyle = 'green';
  context.lineJoin = 'round';
  context.moveTo(390, 90);
  context.lineTo(490, 90);
  context.lineTo(490, 190);
  context.lineTo(390, 190);
  context.lineTo(390, 290);
  context.stroke();
}

function learnShadow(context) {
  // Shadows - 1
  context.beginPath();
  context.strokeStyle = 'red';
  context.lineWidth = 20;
  context.shadowColor = 'black';
  context.shadowOffsetX = 10;
  context.shadowOffsetY = 10;
  context.shadowBlur = 10;
  context.moveTo(100, 60);
  context.lineTo(200, 60);
  context.stroke();

  // Shadows - 2
  context.beginPath();
  context.strokeStyle = 'red';
  context.lineWidth = 20;
  context.shadowColor = 'blue';
  context.shadowOffsetX = -10;
  context.shadowOffsetY = 10;
  context.shadowBlur = 10;
  context.moveTo(350, 60);
  context.lineTo(450, 60);
  context.stroke();

  // Shadows - 3
  context.beginPath();
  context.lineWidth = 20;
  context.strokeStyle = 'red';
  context.shadowColor = 'green';
  context.shadowOffsetX = 10;
  context.shadowOffsetY = -10;
  context.shadowBlur = 10;
  context.moveTo(100, 200);
  context.lineTo(200, 200);
  context.stroke();

  // Shadows - 4
  context.beginPath();
  context.strokeStyle = 'red';
  context.lineWidth = 20;
  context.shadowColor = 'brown';
  context.shadowOffsetX = -10;
  context.shadowOffsetY = -10;
  context.shadowBlur = 10;
  context.moveTo(350, 200);
  context.lineTo(450, 200);
  context.stroke();

  // // Shadow
  // context.shadowColor = 'rgba(0, 0, 0, 0.5)';
  // context.shadowOffsetX = 5;
  // context.shadowOffsetY = 5;
  // context.shadowBlur = 4;
  // context.font = '30px Arial';
  // context.fillStyle = 'red';
  // context.fillText('Hello World', 100, 100);
}

function learnShape(context) {
  // First Z Shape
  context.beginPath();
  context.strokeStyle = 'red';
  context.lineWidth = 15;
  context.lineCap = 'butt';
  context.lineJoin = 'miter';
  context.shadowColor = 'lime';
  context.shadowOffsetX = 10;
  context.shadowOffsetY = 10;
  context.shadowBlur = 10;
  context.moveTo(60, 80);
  context.lineTo(160, 80);
  context.lineTo(80, 180);
  context.lineTo(180, 180);
  context.stroke();

  // Second Z Shape
  context.beginPath();
  context.strokeStyle = 'blue';
  context.lineWidth = 15;
  context.lineCap = 'round';
  context.lineJoin = 'round';
  context.shadowColor = 'yellow';
  context.shadowOffsetX = 10;
  context.shadowOffsetY = 10;
  context.shadowBlur = 10;
  context.moveTo(340, 80);
  context.lineTo(240, 80);
  context.lineTo(340, 180);
  context.lineTo(240, 180);
  context.stroke();

  // Third Z Shape
  context.beginPath();
  context.strokeStyle = 'green';
  context.lineWidth = 15;
  context.lineCap = 'square';
  context.lineJoin = 'bevel';
  context.shadowColor = 'purple';
  context.shadowOffsetX = 10;
  context.shadowOffsetY = 10;
  context.shadowBlur = 10;
  context.moveTo(420, 80);
  context.lineTo(520, 80);
  context.lineTo(440, 180);
  context.lineTo(540, 180);
  context.stroke();
}

function learnCurve(context) {
  const radian = Math.PI / 180;

  // First arc
  context.beginPath();
  context.strokeStyle = 'blue';
  context.lineWidth = 10;
  context.arc(100, 100, 50, 0 * radian, 180 * radian, false);
  context.stroke();

  // Second arc
  context.beginPath();
  context.strokeStyle = 'red';
  context.lineWidth = 10;
  context.arc(300, 200, 50, 45 * radian, 135 * radian, false);
  context.stroke();

  // Third arc
  context.beginPath();
  context.strokeStyle = 'green';
  context.lineWidth = 10;
  context.arc(300, 100, 50, 45 * radian, 135 * radian, true);
  context.stroke();
}

function learnQuadraticCurve(context) {
  context.beginPath();
  context.strokeStyle = 'red';
  context.lineWidth = 10;
  context.moveTo(200, 250);
  // context.quadraticCurveTo(300, 100, 400, 250);
  // context.quadraticCurveTo(100, 100, 400, 250);
  // context.quadraticCurveTo(500, 100, 400, 250);
  // context.quadraticCurveTo(500, 10, 400, 250);
  context.quadraticCurveTo(500, 110, 400, 250);
  context.stroke();
}

function learnBezierCurve(context) {
  // Bezier Curve - 1
  // context.beginPath();
  // context.strokeStyle = 'red';
  // context.lineWidth = 10;
  // context.moveTo(200, 250);
  // context.bezierCurveTo(100, 100, 500, 100, 400, 250);
  // context.stroke();

  // // View the control points
  // context.beginPath();
  // context.arc(200, 250, 5, 0, Math.PI * 2, false); // Start point
  // context.fill();

  // context.beginPath();
  // context.arc(100, 100, 5, 0, Math.PI * 2, false); // Control point 1
  // context.fill();

  // context.beginPath();
  // context.arc(500, 100, 5, 0, Math.PI * 2, false); // Control point 2
  // context.fill();

  // context.beginPath();
  // context.arc(400, 250, 5, 0, Math.PI * 2, false); // End point
  // context.fill();

  // Bezier Curve - 2
  context.beginPath();
  context.strokeStyle = 'red';
  context.lineWidth = 10;
  context.moveTo(200, 250);
  context.bezierCurveTo(20, 10, 50, 150, 400, 250);
  context.stroke();

  // View the control points
  context.beginPath();
  context.arc(200, 250, 5, 0, Math.PI * 2, false); // Start point
  context.fill();

  context.beginPath();
  context.arc(20, 10, 5, 0, Math.PI * 2, false); // Control point 1
  context.fill();

  context.beginPath();
  context.arc(50, 150, 5, 0, Math.PI * 2, false); // Control point 2
  context.fill();

  context.beginPath();
  context.arc(400, 250, 5, 0, Math.PI * 2, false); // End point
  context.fill();
}

function practiceHeart(context) {
  // Test out the functions
  // drawQuadraticCurve(context, 500, 250, 600, 50, 700, 250, 'red', 5);
  // drawBezierCurve(context, 200, 250, 100, 100, 500, 100, 400, 250, 'blue', 5);

  // Draw with the helper functions
  // // Right side
  // drawBezierCurve(context, 430, 130, 470, 10, 670, 10, 670, 180, 'red', 3);
  // drawQuadraticCurve(context, 670, 180, 670, 380, 430, 520, 'red', 3);

  // // Left side
  // drawBezierCurve(context, 430, 130, 400, 10, 190, 10, 190, 180, 'red', 3);
  // drawQuadraticCurve(context, 190, 180, 190, 400, 430, 520, 'red', 3);

  // Heart
  context.beginPath();
  context.moveTo(430, 130);
  context.bezierCurveTo(470, 10, 670, 10, 670, 180);
  context.quadraticCurveTo(670, 380, 430, 520);
  context.quadraticCurveTo(190, 380, 190, 180);
  context.bezierCurveTo(190, 10, 400, 10, 430, 130);

  // Draw stroke of the heart
  context.lineWidth = 5;
  context.strokeStyle = 'orange';
  context.stroke();

  // Fill the heart
  context.fillStyle = 'pink';
  context.fill();
}

function drawQuadraticCurve(
  context,
  startX,
  startY,
  controlX,
  controlY,
  endX,
  endY,
  curveColor,
  curveWidth
) {
  context.beginPath();
  context.strokeStyle = curveColor;
  context.lineWidth = curveWidth;
  context.moveTo(startX, startY);
  context.quadraticCurveTo(controlX, controlY, endX, endY);
  context.stroke();

  // View the control points
  drawPoints(
    context,
    [
      { x: startX, y: startY },
      { x: endX, y: endY },
      { x: controlX, y: controlY },
    ],
    curveColor
  );
}

function drawBezierCurve(
  context,
  startX,
  startY,
  controlX1,
  controlY1,
  controlX2,
  controlY2,
  endX,
  endY,
  curveColor,
  curveWidth
) {
  context.beginPath();
  context.strokeStyle = curveColor;
  context.lineWidth = curveWidth;
  context.moveTo(startX, startY);
  context.bezierCurveTo(controlX1, controlY1, controlX2, controlY2, endX, endY);
  context.stroke();

  // View the control points
  drawPoints(
    context,
    [
      { x: startX, y: startY },
      { x: endX, y: endY },
      { x: controlX1, y: controlY1 },
      { x: controlX2, y: controlY2 },
    ],
    curveColor
  );
}

function drawPoints(context, points, color = 'black') {
  context.save();

  if (Array.isArray(points)) {
    points.forEach((coordinates) => {
      const { x, y } = coordinates;

      // View the control points
      context.beginPath();
      context.fillStyle = color;
      context.arc(x, y, 7, 0, Math.PI * 2, false); // Start point
      context.fill();
    });
  }

  context.restore();
}
