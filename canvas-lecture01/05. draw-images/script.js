onload = () => {
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  // learnImage(context);
  // learnImageTile(context);
  learnImageFilter(context);
};

function learnImage(context) {
  var image = new Image();
  image.src = 'image.png';
  image.onload = () => {
    // context.drawImage(image, 200, 100); // draw image 1
    // context.drawImage(image, 200, 100, 200, 200); // draw image 2
    context.drawImage(image, 40, 100, 150, 250, 200, 100, 200, 200); // draw image 3
  };
}

function learnImageTile(context) {
  var pokemonTile = new Image();
  pokemonTile.src = 'pokemons.png';
  pokemonTile.onload = () => {
    // Pikachu
    context.drawImage(pokemonTile, 0, 0, 200, 200, 0, 0, 200, 200);

    // Jamanbo
    context.drawImage(pokemonTile, 400, 0, 200, 200, 200, 0, 200, 200);

    // Squirtle
    context.drawImage(pokemonTile, 400, 200, 200, 190, 400, 0, 200, 200);

    // Bulbasaur
    context.drawImage(pokemonTile, 1000, 0, 200, 200, 600, 0, 200, 200);
  };
}

function learnImageFilter(context) {
  var image = new Image();
  image.src = 'amsterdam.jpg';
  image.onload = () => {
    context.drawImage(image, 180, 35);

    var imageData = context.getImageData(230, 55, 350, 166);
    // console.log(imageData);
    // putImage(imageData);

    for (var i = 0; i < imageData.data.length; i += 4) {
      // Paint image with black
      // imageData.data[i + 0] = 0; // R
      // imageData.data[i + 1] = 0; // G
      // imageData.data[i + 2] = 0; // B
      imageData.data[i + 3] = 50; // Alpha

      // // Filter reverse color
      // imageData.data[i + 0] = 255 - imageData.data[i + 0]; // R
      // imageData.data[i + 1] = 255 - imageData.data[i + 1]; // G
      // imageData.data[i + 2] = 255 - imageData.data[i + 2]; // B

      // Filter grayscale
      // var average =
      //   (imageData.data[i + 0] +
      //     imageData.data[i + 1] +
      //     imageData.data[i + 2]) /
      //   3;
      // imageData.data[i + 0] = average; // R
      // imageData.data[i + 1] = average; // G
      // imageData.data[i + 2] = average; // B
    }

    context.putImageData(imageData, 230, 55);

    // show image data in other canvas
    putImage(imageData);
  };
}

function putImage(imageData) {
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');

  canvas.id = 'canvas';
  canvas.width = 800;
  canvas.height = 600;

  context.putImageData(imageData, 20, 20);
  document.body.appendChild(canvas);
}
