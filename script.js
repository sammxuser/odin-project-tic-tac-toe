// A cell represents '1' square on the board and can have
// *** blank
// *** 0
// *** X
function Cell() {
  let value = 'O';

  // Accept a player's change of value of the cell
  const playCell = (player) => {
    value = player;
  };
  // retrieve the current value of this cell through closure
  const getValue = () => value;

  return { playCell, getValue };
}

function GameBoard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  // create a 2d array that represents the state of the game board
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell().getValue());
    }
  }

  // method for getting the board for the UI to render
  const getBoard = () => board;

  // method to get the cell played and the player
  const playedCell = (cell, player) => {
    console.log(cell);
    console.log(player);
  };

  //method to printBoard
  const printBoard = () => {
    console.log(board);
  };

  return { getBoard, playedCell, printBoard };
}

// The gameController will be responsible for controlling the flow and state of the game's turns
// as well as whether anybody has won the game

function GameController(
  playerOneName = 'Player One',
  playerTwoName = 'Player Two'
) {
  const board = GameBoard();
  const players = [{ name: playerOneName }, { name: playerTwoName }];
  let activePlayer = players[0];
  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;
  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const playRound = () => {
    console.log(`${getActivePlayer().name} playing`);
    // const inputValue = prompt(`${getActivePlayer().name} enter value`);

    board.playedCell((inputValue = 0), activePlayer);

    // Check winner logic and print a winning message

    // switch player turn
    switchPlayerTurn();
    printNewRound();
  };

  //Initial play game message
  printNewRound();
  return { playRound, getActivePlayer };
}

const game = GameController();
game.playRound();
