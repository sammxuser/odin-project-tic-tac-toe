let currentPlayer = 'X'; // Player X always starts
let gameBoard = ['', '', '', '', '', '', '', '', '']; // 3x3 game board
let gameActive = true;

function handlePlayerTurn(clickedCellIndex) {
  if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
    return;
  }
  gameBoard[clickedCellIndex] = currentPlayer;
  checkForWinOrDraw();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function cellClicked(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(clickedCell.id.replace('cell-', '')) - 1;
  if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
    return;
  }
  handlePlayerTurn(clickedCellIndex);
  updateUI();
}

const cells = document.querySelectorAll('.cell');

cells.forEach((cell) => {
  cell.addEventListener('click', cellClicked, false);
});

function updateUI() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = gameBoard[i];
  }
}

function announceWinner(player) {
  const messageElement = document.getElementById('gameMessage');
  messageElement.innerText = `Player ${player} Wins!`;
}

function announceDraw() {
  const messageElement = document.getElementById('gameMessage');
  messageElement.innerText = 'Game Draw!';
}

const winConditions = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Left-to-right diagonal
  [2, 4, 6], // Right-to-left diagonal
];

function checkForWinOrDraw() {
  let roundWon = false;

  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    announceWinner(currentPlayer);
    gameActive = false;
    return;
  }

  let roundDraw = !gameBoard.includes('');
  if (roundDraw) {
    announceDraw();
    gameActive = false;
    return;
  }
}

function resetGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  cells.forEach((cell) => {
    cell.innerText = '';
  });
  document.getElementById('gameMessage').innerText = '';
}

const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetGame, false);

// // A cell represents '1' square on the board and can have
// // *** blank
// // *** 0
// // *** X
// function Cell() {
//   let value = 'O';

//   // Accept a player's change of value of the cell
//   const playCell = (player) => {
//     value = player;
//   };
//   // retrieve the current value of this cell through closure
//   const getValue = () => value;

//   return { playCell, getValue };
// }

// function GameBoard() {
//   const rows = 3;
//   const columns = 3;
//   const board = [];

//   // create a 2d array that represents the state of the game board
//   for (let i = 0; i < rows; i++) {
//     board[i] = [];
//     for (let j = 0; j < columns; j++) {
//       board[i].push(Cell().getValue());
//     }
//   }

//   // method for getting the board for the UI to render
//   const getBoard = () => board;

//   // method to get the cell played and the player
//   const playedCell = (cell, player) => {
//     console.log(cell);
//     console.log(player);
//   };

//   //method to printBoard
//   const printBoard = () => {
//     console.log(board);
//   };

//   return { getBoard, playedCell, printBoard };
// }

// // The gameController will be responsible for controlling the flow and state of the game's turns
// // as well as whether anybody has won the game

// function GameController(
//   playerOneName = 'Player One',
//   playerTwoName = 'Player Two'
// ) {
//   const board = GameBoard();
//   const players = [{ name: playerOneName }, { name: playerTwoName }];
//   let activePlayer = players[0];
//   const switchPlayerTurn = () => {
//     activePlayer = activePlayer === players[0] ? players[1] : players[0];
//   };
//   const getActivePlayer = () => activePlayer;
//   const printNewRound = () => {
//     board.printBoard();
//     console.log(`${getActivePlayer().name}'s turn.`);
//   };

//   const playRound = () => {
//     console.log(`${getActivePlayer().name} playing`);
//     // const inputValue = prompt(`${getActivePlayer().name} enter value`);

//     board.playedCell((inputValue = 0), activePlayer);

//     // Check winner logic and print a winning message

//     // switch player turn
//     switchPlayerTurn();
//     printNewRound();
//   };

//   //Initial play game message
//   printNewRound();
//   return { playRound, getActivePlayer };
// }

// const game = GameController();
// game.playRound();
