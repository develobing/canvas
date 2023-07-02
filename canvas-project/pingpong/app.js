const homage = Game('#app', {
  width: 800,
  height: 600,
  gameBorder: '1px dashed black',
  Player: HumanPlayerPaddle,
  Computer: GrowingComputerPaddle,
});
homage.paintBackground();
homage.main();
