const Utils = {
  copyBuffer(buffer) {
    const newBuffer = document.createElement('canvas');
    newBuffer.width = buffer.width;
    newBuffer.height = buffer.height;
    newBuffer.getContext('2d').drawImage(buffer, 0, 0);
    return newBuffer;
  },

  loadImage(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const buffer = document.createElement('canvas');
          buffer.width = img.width;
          buffer.height = img.height;
          buffer.getContext('2d').drawImage(img, 0, 0);
          resolve(buffer);
        };
      };
      reader.readAsDataURL(file);
    });
  },

  randomFilename(extension, length = 10) {
    const randomName = Math.random().toString(36).substring(2, 15);
    return `${randomName}.${extension}`;
  },
};
