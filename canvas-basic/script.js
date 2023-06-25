const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
console.log('canvas', canvas);
console.log('initial ctx', { ...ctx });

fitCanvasSize();
// drawRect();
// drawCircle({ x: 150, y: 150 });

window.addEventListener('resize', function () {
  fitCanvasSize();
  drawRect();
  drawCircle({ x: 150, y: 150 });
});

let hue = 0;
const particlesArray = [];
const mouse = {
  x: null,
  y: null,
};

// Draw Circle on click
canvas.addEventListener('click', function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
  console.log('mouse', mouse);
  // drawCircle(mouse);

  // Particle Effect
  for (let i = 0; i < 10; i++) {
    particlesArray.push(new Particle(true));
  }
});

// Draw blush on mouse move
canvas.addEventListener('mousemove', function () {
  mouse.x = event.x;
  mouse.y = event.y;
  // console.log('mouse', mouse);
  // drawBlush(mouse);

  // Particle Effect
  for (let i = 0; i < 2; i++) {
    particlesArray.push(new Particle(true));
  }
});

// Canvas Aniation Loop
// ctx.clearRect(0, 0, canvas.width, canvas.height);
// animateMoveMouse();

function fitCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function drawRect() {
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.fillRect(10, 10, 50, 50);
}

function drawCircle(position) {
  if (!position.x || !position.y) return;

  ctx.fillStyle = 'green';
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 5;

  const { x, y } = position;
  const size = 30;
  const radius = size / 4;

  ctx.beginPath();
  ctx.arc(x + radius, y + radius, size, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
  // console.log('drawCircle() - ctx', ctx);
}

function drawBlush(position) {
  if (!position.x || !position.y) return;

  ctx.fillStyle = 'green';
  // ctx.lineWidth = 3;

  const { x, y } = position;
  const size = 5;
  const radius = size / 4;

  ctx.beginPath();
  ctx.arc(x + radius, y + radius, size, 0, 2 * Math.PI);
  ctx.fill();
  // ctx.stroke();
  // console.log('drawCircle() - ctx', ctx);
}

function animateMoveMouse() {
  requestAnimationFrame(animateMoveMouse);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBlush(mouse);
}

class Particle {
  constructor(isMouse = false) {
    this.x = isMouse ? mouse.x : Math.random() * canvas.width;
    this.y = isMouse ? mouse.y : Math.random() * canvas.height;
    this.size = Math.random() * 15 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = `hsl(${hue}, 100%, 50%)`;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    const xSize = this.x - this.size / 2;
    const ySize = this.y - this.size / 2;
    if (xSize <= 0 || xSize >= canvas.width) this.speedX *= -1;
    if (ySize <= 0 || ySize >= canvas.height) this.speedY *= -1;

    if (this.size > 0.2) this.size -= 0.1;
  }

  draw() {
    // ctx.fillStyle = 'purple';
    ctx.fillStyle = this.color;
    ctx.lineWidth = 5;
    console.log('hue', hue);

    const radius = this.size / 4;

    ctx.beginPath();
    ctx.arc(this.x + radius, this.y + radius, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }
}

function init() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 100; i++) {
    particlesArray.push(new Particle());
  }
}

function handleParticles() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();

    if (particlesArray[i].size <= 0.3) {
      particlesArray.splice(i, 1);
      i--;
    }
  }
}

function animateParicles() {
  const particleCount = particlesArray.length;
  console.log('animateParicles() - particleCount', particleCount);

  // ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  // ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleParticles();

  hue += 3;
  requestAnimationFrame(animateParicles);
}

// init();
// animateParicles();

function handleStarParticles() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();

    for (let j = i; j < particlesArray.length; j++) {
      const dx = particlesArray[i].x - particlesArray[j].x;
      const dy = particlesArray[i].y - particlesArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        ctx.lineWidth = 0.2;
        ctx.strokeStyle = particlesArray[i].color;

        ctx.beginPath();
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke();
        ctx.closePath();
      }
    }

    if (particlesArray[i].size <= 0.3) {
      particlesArray.splice(i, 1);
      i--;
    }
  }
}

function animateStarParicles() {
  const particleCount = particlesArray.length;
  console.log('animateStarParicles() - particleCount', particleCount);

  // ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  // ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleStarParticles();

  hue += 3;
  requestAnimationFrame(animateStarParicles);
}

// init();
animateStarParicles();
