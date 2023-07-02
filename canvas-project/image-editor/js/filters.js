const Filters = {
  grayscale(buffer) {
    const copyBuffer = Utils.copyBuffer(buffer);
    const imageData = copyBuffer
      .getContext('2d')
      .getImageData(0, 0, copyBuffer.width, copyBuffer.height);

    const { data } = imageData;
    for (let i = 0; i < data.length; i += 4) {
      const red = data[i];
      const green = data[i + 1];
      const blue = data[i + 2];
      const gray = Math.floor((red + green + blue) / 3);
      data[i] = gray;
      data[i + 1] = gray;
      data[i + 2] = gray;
    }

    copyBuffer.getContext('2d').putImageData(imageData, 0, 0);

    return copyBuffer;
  },
  sepia(buffer) {
    const copyBuffer = Utils.copyBuffer(buffer);
    const imageData = copyBuffer
      .getContext('2d')
      .getImageData(0, 0, copyBuffer.width, copyBuffer.height);

    const { data } = imageData;
    for (let i = 0; i < data.length; i += 4) {
      const red = data[i];
      const green = data[i + 1];
      const blue = data[i + 2];
      const tRed = 0.4 * red + 0.77 * green + 0.19 * blue;
      const tGreen = 0.35 * red + 0.69 * green + 0.17 * blue;
      const tBlue = 0.27 * red + 0.54 * green + 0.13 * blue;
      data[i] = tRed;
      data[i + 1] = tGreen;
      data[i + 2] = tBlue;
    }

    copyBuffer.getContext('2d').putImageData(imageData, 0, 0);

    return copyBuffer;
  },
  brighten(buffer) {
    const copyBuffer = Utils.copyBuffer(buffer);
    const imageData = copyBuffer
      .getContext('2d')
      .getImageData(0, 0, copyBuffer.width, copyBuffer.height);

    const { data } = imageData;
    for (let i = 0; i < data.length; i += 4) {
      const red = data[i];
      const green = data[i + 1];
      const blue = data[i + 2];
      data[i] = Math.min(red + 100, 255);
      data[i + 1] = Math.min(green + 100, 255);
      data[i + 2] = Math.min(blue + 100, 255);
    }

    copyBuffer.getContext('2d').putImageData(imageData, 0, 0);

    return copyBuffer;
  },
};
