class Paint {
  constructor(selector) {
    this.canvas = document.querySelector(selector);
    this.swatch = document.querySelector('#swatch');
    this.sizeInput = document.querySelector('#size');
    this.redoBtn = document.querySelector('#redo');
    this.undoBtn = document.querySelector('#undo');
    this.saveBtn = document.querySelector('#save');
    this.clearBtn = document.querySelector('#clear');
    this.undoStacks = [];
    this.ctx = canvas.getContext('2d');
    this.paths = [];
    this.size = this.sizeInput.valueAsNumber || 5;
    this.color = '#000000';
    this.isDrawing = false;
    this.path = new Path(this.color, this.size);
    this.setEvents();
  }

  setEvents() {
    // mousedown
    canvas.addEventListener('mousedown', (e) => {
      this.isDrawing = true;
      this.setColor(this.swatch.value);
      this.path = new Path(this.color, this.size);
      this.path.addPointFromEvent(e);
      this.undoStacks = [];
      this.render();
    });

    // mouseup
    canvas.addEventListener('mouseup', (e) => {
      this.isDrawing = false;
      this.path.addPointFromEvent(e);

      this.paths.push(this.path);
      this.render();
    });

    // mousemove
    canvas.addEventListener('mousemove', (e) => {
      if (!this.isDrawing) return;

      this.path.addPointFromEvent(e);
      this.render();
    });

    // Change Color Swatch
    this.swatch.addEventListener('change', (e) => {
      this.setColor(e.target.value);
    });

    // Change Size
    this.sizeInput.addEventListener('change', (e) => {
      this.setSize(e.target.valueAsNumber);
    });

    // Redo
    this.redoBtn.addEventListener('click', () => {
      this.redo();
    });

    // Undo
    this.undoBtn.addEventListener('click', () => {
      this.undo();
    });

    // Save
    this.saveBtn.addEventListener('click', () => {
      let filename = prompt('Enter a filename');
      filename = filename.endsWith('.png') ? filename : `${filename}.png`;
      this.save(filename);
    });

    // Clear
    this.clearBtn.addEventListener('click', () => {
      this.clear();
    });
  }

  setSize(size) {
    this.size = size;
  }

  setColor(color) {
    this.color = color;
  }

  redo() {
    if (this.undoStacks.length < 1) return;
    this.clearCanvas();

    this.paths.push(this.undoStacks.pop());
    this.paths.forEach((path) => {
      this.path = path;
      this.render();
    });
    this.path = new Path();
  }

  undo() {
    if (this.paths.length < 1) return;

    this.clearCanvas();

    this.undoStacks.push(this.paths.pop());
    this.paths.forEach((path) => {
      this.path = path;
      this.render();
    });
    this.path = new Path();
  }

  save(filename = 'image.png') {
    const data = this.canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = data;
    link.download = filename;
    link.click();
  }

  clear() {
    this.clearCanvas();
    this.paths = [];
    this.undoStacks = [];
    this.path = new Path();
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  reset() {
    this.clearCanvas();
    this.paths = [];
    this.path = new Path();
  }

  render() {
    this.path.render(this.ctx);
  }
}

const paint = new Paint('#canvas');
