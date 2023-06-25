onload = () => {
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  // learnSaveAndRestore(context);
  // learnImageSave(context);
  // learnPatternImage(context);
  learnGradient(context);
};

function learnSaveAndRestore(context) {
  // Rect 1 and Save-State 1
  context.fillStyle = 'red';
  context.fillRect(150, 100, 120, 120);
  context.save();

  // Rect 2 and Save-State 2
  context.fillStyle = 'green';
  context.fillRect(300, 100, 120, 120);
  context.save();

  // Rect 3 and Save-State 3
  context.fillStyle = 'blue';
  context.fillRect(450, 100, 120, 120);
  context.save();

  // Rect 4 and Restore-State 3
  context.restore();
  context.fillRect(150, 300, 120, 120);

  // Rect 5 and Restore-State 2
  context.restore();
  context.fillRect(300, 300, 120, 120);

  // Rect 6 and Restore-State 1
  context.restore();
  context.fillRect(450, 300, 120, 120);
}

function learnImageSave(context) {
  var image = new Image();
  image.src = 'amsterdam.jpg';
  image.onload = () => {
    context.drawImage(image, 180, 35);

    var imageData = context.getImageData(230, 55, 390, 250);
    // console.log(imageData);
    // putImage(imageData);

    for (var i = 0; i < imageData.data.length; i += 4) {
      // Filter grayscale
      var average =
        (imageData.data[i + 0] +
          imageData.data[i + 1] +
          imageData.data[i + 2]) /
        3;
      imageData.data[i + 0] = average; // R
      imageData.data[i + 1] = average; // G
      imageData.data[i + 2] = average; // B

      imageData.data[i + 3] = 150; // Alpha
    }

    context.putImageData(imageData, 230, 55);

    var dataURL = canvas.toDataURL();
    showImageOnHtml(dataURL);
  };
}

function showImageOnHtml(imageUrl) {
  var img = document.createElement('img');
  img.src = imageUrl;
  document.body.appendChild(img);
}

function learnPatternImage(context) {
  var image = new Image();
  image.src = 'pattern.jpg';
  image.onload = () => {
    var pattern = context.createPattern(image, 'repeat');
    // var pattern = context.createPattern(image, 'repeat-x');
    // var pattern = context.createPattern(image, 'repeat-y');
    // var pattern = context.createPattern(image, 'no-repeat');

    context.fillStyle = pattern;
    context.fillRect(0, 0, 800, 600);
  };

  var image2 = new Image();
  image2.src = 'apple.png';
  image2.onload = () => {
    var pattern2 = context.createPattern(image2, 'repeat');
    // var pattern2 = context.createPattern(image, 'repeat-x');
    // var pattern2 = context.createPattern(image, 'repeat-y');
    // var pattern2 = context.createPattern(image, 'no-repeat');

    context.lineWidth = 25;
    context.strokeStyle = pattern2;
    context.strokeRect(50, 50, 500, 350);
  };
}

function learnGradient(context) {
  // Linear Gradient
  var linearGradient = context.createLinearGradient(50, 50, 270, 270);
  linearGradient.addColorStop(0, 'red');
  linearGradient.addColorStop(0.25, 'blue');
  linearGradient.addColorStop(0.5, 'green');
  linearGradient.addColorStop(0.75, 'orange');
  linearGradient.addColorStop(1, 'white');

  context.strokeStyle = 'blue';
  context.lineWidth = 4;
  context.fillStyle = linearGradient;

  context.beginPath();
  context.rect(50, 50, 220, 220);
  context.stroke();
  context.fill();

  // Radial Gradient
  var radialGradient = context.createRadialGradient(
    520,
    270,
    250,
    520,
    270,
    50
  );
  radialGradient.addColorStop(0, 'red');
  radialGradient.addColorStop(0.25, 'blue');
  radialGradient.addColorStop(0.5, 'green');
  radialGradient.addColorStop(0.75, 'orange');
  radialGradient.addColorStop(1, 'white');

  context.strokeStyle = 'blue';
  context.lineWidth = 4;
  context.fillStyle = radialGradient;

  context.beginPath();
  context.rect(300, 50, 220, 220);
  context.stroke();
  context.fill();
}
