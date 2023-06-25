onload = () => {
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  // learnRect(context, canvas);
  drawChessboard(context);
  // learnCircle(context);
  // drawPacman(context);
  // learnPolygon(context);
  // learnShadow(context);
};

function learnRect(context, canvas) {
  context.rect(50, 200, 200, 200);

  context.strokeStyle = 'red';
  context.lineWidth = 10;
  context.lineJoin = 'round';
  context.stroke();

  context.fillStyle = 'blue';
  context.fill();

  context.fillStyle = 'green';
  context.fillRect(300, 200, 200, 200);

  context.lineWidth = 3;
  context.strokeStyle = 'black';
  context.lineJoin = 'square';
  context.strokeRect(550, 200, 200, 200);

  context.clearRect(150, 250, 50, 50);

  // Clear canvas
  // context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawChessboard(context) {
  var lightColor = '#ddb180';
  var darkColor = '#7c330c';
  var startX = 250,
    startY = 100;
  var cellSize = 50;

  // Frame
  context.strokeStyle = 'black';
  context.strokeRect(250, 100, 400, 400);

  // Manually draw cells (not recommended)
  // // Cell 1
  // context.fillStyle = lightColor;
  // context.fillRect(250, 100, 50, 50);

  // // Cell 2
  // context.fillStyle = darkColor;
  // context.fillRect(300, 100, 50, 50);

  // // Cell 2
  // context.fillStyle = lightColor;
  // context.fillRect(350, 100, 50, 50);

  // Draw cells
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      context.fillStyle = (i + j) % 2 == 0 ? lightColor : darkColor;
      context.fillRect(
        startX + cellSize * i,
        startY + cellSize * j,
        cellSize,
        cellSize
      );
    }
  }
}

function learnCircle(context) {
  const radian = Math.PI / 180;

  context.beginPath();
  // context.arc(450, 300, 150, 0 * radian, 360 * radian);
  context.arc(450, 300, 150, 125 * radian, 360 * radian);

  // context.strokeStyle = 'red';
  // context.lineWidth = 15;
  // context.stroke();
  context.fillStyle = 'orange';
  context.fill();
}

function drawPacman(context) {
  const radian = Math.PI / 180;

  // // First way
  // // Body
  // context.beginPath();
  // context.moveTo(250, 250);
  // context.lineTo(330, 310);
  // context.arc(250, 250, 100, 37 * radian, 323 * radian);
  // context.lineTo(250, 250);
  // context.fillStyle = 'orange';
  // context.fill();

  // // Eye
  // context.beginPath();
  // context.arc(250, 200, 10, 0 * radian, 360 * radian);
  // context.fillStyle = 'black';
  // context.fill();

  // Second way
  // Object 1
  context.beginPath();
  context.arc(600, 250, 100, 143 * radian, 323 * radian);
  context.fillStyle = 'orange';
  context.fill();

  // Object2
  context.beginPath();
  context.arc(600, 250, 100, 37 * radian, 217 * radian);
  context.fillStyle = 'orange';
  context.fill();

  // Eye
  context.beginPath();
  context.arc(600, 200, 10, 0 * radian, 360 * radian);
  context.fillStyle = 'black';
  context.fill();
}

function learnPolygon(context) {
  // Polygon variables
  var sides = 7;
  var radius = 100;
  var centerX = 350;
  var centerY = 300;
  var startAngle = 200;
  var angle = (2 * Math.PI) / sides;

  // Start drawing
  context.beginPath();
  context.strokeStyle = 'red';
  context.lineWidth = 5;
  context.lineJoin = 'round';

  // Beginning point coordinates
  var beginX = centerX + radius * Math.cos(startAngle);
  var beginY = centerY - radius * Math.sin(startAngle);

  context.moveTo(beginX, beginY);

  // Draw lines
  for (var i = 1; i <= sides; i++) {
    // Current point's coordinates
    var currentAngle = startAngle + i * angle;
    var currentPointX = centerX + radius * Math.cos(currentAngle);
    var currentPointY = centerY - radius * Math.sin(currentAngle);

    // Draw the line
    context.lineTo(currentPointX, currentPointY);
  }

  context.closePath(); // Close the path
  context.stroke(); // Draw the path
}

function learnShadow(context) {
  // Rectangle
  context.beginPath();
  context.rect(150, 100, 150, 400);

  context.strokeStyle = 'green';
  context.fillStyle = 'green';
  context.shadowColor = 'blue';
  context.shadowOffsetX = 10;
  context.shadowOffsetY = 10;
  context.shadowBlur = 10;
  context.stroke();
  context.fill();

  // Circle
  const radian = Math.PI / 180;
  context.beginPath();
  context.arc(650, 300, 100, 0 * radian, 360 * radian);

  context.strokeStyle = 'orange';
  context.fillStyle = 'orange';
  context.shadowColor = 'black';
  context.shadowOffsetX = -10;
  context.shadowOffsetY = -10;
  context.shadowBlur = 5;
  context.stroke();
  context.fill();
}
