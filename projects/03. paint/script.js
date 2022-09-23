// Paint data
var canvas, context, boundings;

onload = () => {
  canvas = document.getElementById('paint-canvas');
  context = canvas.getContext('2d');
  boundings = canvas.getBoundingClientRect();

  resetCanvas();
  bindEvent();
};

function bindEvent() {
  // Toolbar events
  setToolbarEvents();

  // Canvas events
  setCanvasEvent();
}

function setCanvasEvent() {
  // Specifications

  var mouseX = 0;
  var mouseY = 0;
  var isDrawing = false;
  context.strokeStyle = 'black'; // Initial brush color
  context.lineWidth = 1; // Initial brush width

  // Mouse down
  canvas.addEventListener('mousedown', (event) => {
    setMouseCoordinates(event);
    isDrawing = true;

    // Start drawing
    context.beginPath();
    context.moveTo(mouseX, mouseY);
  });

  // Mouse move
  canvas.addEventListener('mousemove', (event) => {
    setMouseCoordinates(event);

    // Draw
    if (isDrawing) {
      context.lineTo(mouseX, mouseY);
      context.stroke();
    }
  });

  // Mouse up
  canvas.addEventListener('mouseup', (event) => {
    setMouseCoordinates(event);
    isDrawing = false;
  });

  // Handle mouse coordinates
  function setMouseCoordinates(event) {
    mouseX = event.clientX - boundings.left;
    mouseY = event.clientY - boundings.top;
  }
}

function setToolbarEvents() {
  // Color buttons
  var colorButtons = document.querySelectorAll('.colors button');
  colorButtons.forEach((button) => {
    var color = button.getAttribute('value');
    button.addEventListener('click', () => setColor(color));
  });

  // Brush buttons
  var brushButtons = document.querySelectorAll('.brushes button');
  brushButtons.forEach((button) => {
    var brush = button.getAttribute('value');
    button.addEventListener('click', () => setBrush(brush));
  });

  // Clear button
  var clearButton = document.querySelector('.buttons #clear');
  clearButton.addEventListener('click', resetCanvas);

  // Save button
  var saveButton = document.querySelector('.buttons #save');
  saveButton.addEventListener('click', saveCanvas);
}

function setColor(color) {
  context.strokeStyle = color;
}

function setBrush(brush) {
  context.lineWidth = brush;
}

function resetCanvas() {
  // Clear canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Fill canvas with white color
  context.fillStyle = 'white';
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function saveCanvas() {
  var imageName = prompt('Please enter image name');

  var link = document.createElement('a');
  link.download = `${imageName || 'paint'}.png`;
  link.href = canvas.toDataURL();
  link.click();
}
