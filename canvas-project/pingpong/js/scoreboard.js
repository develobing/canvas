const Scoreboard = (canvas, options = {}) => {
  const { goal = 5 } = options;
  let scores = {
    player: 0,
    computer: 0,
  };
  const render = (ctx) => {
    const displayedText = `
      Player:   ${scores.player}
      Computer: ${scores.computer}
    `;
    ctx.save();
    ctx.font = '30px Comic Sans MS';
    ctx.fillText(displayedText, 30, 40);
    ctx.restore();
  };
  const playerScores = () => {
    scores.player += 1;
  };
  const computerScores = () => {
    scores.computer += 1;
  };
  const isThereAWinner = () => {
    return scores.player === goal || scores.computer === goal;
  };
  const whoIsTheWinner = () => {
    if (!isThereAWinner()) return 'No one yet';

    if (scores.player === goal) {
      return 'Player';
    } else if (scores.computer === goal) {
      return 'Computer';
    }
  };
  const reset = () => {
    scores = {
      player: 0,
      computer: 0,
    };
  };

  return {
    playerScores,
    computerScores,
    isThereAWinner,
    whoIsTheWinner,
    render,
    reset,
  };
};
