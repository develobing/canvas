const Game = (selector, options = {}) => {
  const { width, height, gameBorder, Player, Computer } = options;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = width ? width : window.innerWidth;
  canvas.height = height ? height : window.innerHeight;
  canvas.style.border = gameBorder || '';
  canvas.innerHTML = 'Your browser does not support the HTML5 canvas tag.';

  const mountPoint = document.querySelector(selector);
  mountPoint.appendChild(canvas);

  let ball, computer, player;
  const rerenders = () => {
    ball = Ball(canvas);
    computer = Computer
      ? Computer(canvas, ball)
      : GrowingComputerPaddle(canvas, ball);
    player = Player ? Player(canvas, ball) : HumanPlayerPaddle(canvas, ball);
  };
  rerenders();

  const scoreboard = Scoreboard(canvas, { goal: 10 });
  window.addEventListener('keydown', (e) => player.update(e));

  const paintBackground = () => {
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  };

  // Main
  const main = () => {
    requestAnimationFrame(main);
    paintBackground();
    if (scoreboard.isThereAWinner()) {
      const winner = scoreboard.whoIsTheWinner();
      alert(`${winner} wins!`);
      scoreboard.reset();
      rerenders();
    }

    // Check some conditions
    // Bounce off the top and bottom
    if (ball.hitTop() || ball.hitBottom()) {
      ball.bounceY();
    }

    // Bounce off the left and right
    if (ball.hitLeft() || ball.hitRight()) {
      if (ball.hitLeft()) {
        scoreboard.computerScores();
      } else if (ball.hitRight()) {
        scoreboard.playerScores();
      }

      rerenders();
    }

    // Bounce off the top and bottom
    if (computer.hitTop() || computer.hitBottom()) {
      computer.bounceY();
    }

    if (player.collideWithBall() || computer.collideWithBall()) {
      ball.bounceX();
      ball.bounceY();
    }

    // Updates
    ball.update();
    computer.update();
    ball.render(ctx);
    player.render(ctx);
    computer.render(ctx);
    scoreboard.render(ctx);
  };

  requestAnimationFrame(main);

  // Public API
  return {
    main,
    paintBackground,
  };
};
