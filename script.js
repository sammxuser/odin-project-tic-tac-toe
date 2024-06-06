function gameBoard() {
  const gameBoardState = ['', '', '', '', '', '', '', '', ''];

  let playerChoices = [];
  const player = (name) => name;
  const getPlayerChoices = () => playerChoices;
  const updatePlayerChoices = (choice) => playerChoices.push(choice);

  return { gameBoardState, player, getPlayerChoices, updatePlayerChoices };
}

const newGame = gameBoard();
const player1 = newGame.player('sam');
const player2 = newGame.player('doe');

console.log(newGame.getPlayerChoices());
console.log(newGame);
console.log(player1);
console.log(player2);
