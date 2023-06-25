onload = () => {
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  // Blue rectangle
  context.fillStyle = 'blue';
  context.fillRect(10, 10, 30, 50);

  // Yellow rectangle
  context.fillStyle = 'yellow';
  context.fillRect(50, 30, 60, 30);
};
