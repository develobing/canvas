onload = () => {
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  // learnText(context);
  // learnTextStyle(context);
  // learn3dText(context);
  // learnTextPositon(context);
  learnTextShadow(context);
};

function learnText(context) {
  var textToFill = 'Fill Text !!!';

  context.font = 'bold 30px Arial';
  context.fillText(textToFill, 10, 50);
  // context.fillText(textToFill, 10, 50, 100);

  context.font = '45px Verdana';
  var textToStroke = 'Stroke Text !!!';
  context.strokeText(textToStroke, 10, 150, 250);
}

function learnTextStyle(context) {
  var text = 'This text will be styled!';

  context.font = 'normal 800 xx-large times';
  context.fillText(text, 100, 100);

  context.font = 'italic 400 32px monospace';
  context.strokeText(text, 100, 250);
}

function learn3dText(context) {
  var text = 'This will be 3d text!';

  // Manual way
  // context.font = 'normal 600 54px monospace';

  // // Layer 1
  // context.fillStyle = 'black';
  // context.fillText(text, 99, 299);

  // // Layer 2
  // context.fillText(text, 98, 298);

  // // Layer 3
  // context.fillText(text, 97, 297);

  // // Layer 4
  // context.fillText(text, 96, 296);

  // // Original Text
  // context.fillStyle = 'violet';
  // context.fillText(text, 100, 300);

  // Using reusable function
  draw3dText(context, text, 100, 300, 'bold 30px Arial', 'red', 5);
}

function draw3dText(context, text, x, y, style, color, size) {
  context.font = style;
  context.fillStyle = 'black';

  for (var i = 0; i < size; i++) {
    context.fillText(text, x - i, y - i);
  }

  context.fillStyle = color;
  context.fillText(text, x, y);
}

function learnTextPositon(context) {
  // Vertical Reference Line
  context.strokeStyle = 'red';
  context.moveTo(400, 50);
  context.lineTo(400, 550);
  context.stroke();

  // Define a style
  context.font = 'italic 400 18px monospace';

  // Aplly textAlign values
  context.textAlign = 'start';
  context.fillText('start', 400, 50);

  context.textAlign = 'left';
  context.fillText('left', 400, 80);

  context.textAlign = 'center';
  context.fillText('center', 400, 110);

  context.textAlign = 'right';
  context.fillText('right', 400, 140);

  context.textAlign = 'end';
  context.fillText('end', 400, 170);

  // Horizontal Reference Line
  context.strokeStyle = 'red';
  context.moveTo(100, 300);
  context.lineTo(700, 300);
  context.stroke();

  // Apply textBaseline values
  context.textBaseline = 'alphabetic';
  context.fillText('alphabetic', 130, 300);

  context.textBaseline = 'top';
  context.fillText('top', 230, 300);

  context.textBaseline = 'hanging';
  context.fillText('hanging', 330, 300);

  context.textBaseline = 'middle';
  context.fillText('middle', 430, 300);

  context.textBaseline = 'ideographic';
  context.fillText('ideographic', 530, 300);

  context.textBaseline = 'bottom';
  context.fillText('bottom', 630, 300);
}

function learnTextShadow(context) {
  var text = 'This text will have shadow!';

  // Shadow with fillText
  context.font = 'normal 600 24px times';
  context.shadowColor = 'red';
  context.shadowOffsetX = 5;
  context.shadowOffsetY = 5;
  context.shadowBlur = 4;

  context.fillText(text, 100, 100);

  // Shadow with strokeText
  context.font = 'italic 400 38px monospace';
  context.shadowColor = 'green';
  context.shadowOffsetX = -5;
  context.shadowOffsetY = -5;
  context.shadowBlur = 4;

  context.strokeText(text, 100, 300);
}
