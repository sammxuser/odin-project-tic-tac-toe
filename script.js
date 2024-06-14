function GameBoard() {
  const board = ['', '', '', '', '', '', '', '', ''];
  const getBoard = () => board;
  const gameActive = true;
  let activePlayer = 'X';
  const getActivePlayer = () => activePlayer;
  const getGameStatus = () => gameActive;

  return {
    getBoard,
    getGameStatus,
    getActivePlayer,
  };
}

// The gameController will be responsible for controlling the flow and state of the game's turns
// as well as whether anybody has won the game
function GameController() {
  const board = GameBoard();
  let gameBoard = board.getBoard();
  let gameStatus = board.getGameStatus();

  let activePlayer = board.getActivePlayer();
  const cells = document.querySelectorAll('.cell');

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === 'X' ? 'O' : 'X';
  };
  // method to get the cell played and the player
  const playedCell = (playedCellIndex, currentPlayer, gameStatus) => {
    if (gameStatus) {
      gameBoard[playedCellIndex] = currentPlayer;
    }
  };

  function cellClicked(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.id.replace('cell-', '')) - 1;

    if (gameBoard[clickedCellIndex] !== '' || !board.getGameStatus()) {
      return;
    }
    playedCell(clickedCellIndex, activePlayer, gameStatus);
    updateBoard();
    // switch player turn
    switchPlayerTurn();
    checkWinOrDraw();
    printNewRound();
  }

  // update the board after a player makes a move
  const updateBoard = () => {
    for (let i = 0; i < cells.length; i++) {
      cells[i].innerText = gameBoard[i];
    }
  };
  //method to printBoard
  const printBoard = () => {
    cells.forEach((cell) => {
      cell.addEventListener('click', cellClicked, false);
    });
  };

  const printNewRound = () => {
    printBoard();
  };

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

  const checkWinOrDraw = () => {
    let roundWon = false;
    let roundDraw = !gameBoard.includes('');

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
      switchPlayerTurn();
      announceResult(activePlayer, roundWon, roundDraw);
      gameStatus = false;
    }

    if (roundDraw) {
      announceResult(activePlayer, roundWon, roundDraw);
      gameStatus = false;
    }
  };

  const announceResult = (currentPlayer, roundWon, roundDraw) => {
    const messageElement = document.getElementById('gameMessage');
    if (roundWon) {
      messageElement.innerText = `Player ${currentPlayer} Wins!`;
    } else if (roundDraw) {
      messageElement.innerText = 'Game Draw!';
    }
  };

  const resetGame = () => {
    cells.forEach((cell) => {
      cell.innerText = '';
    });
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    document.getElementById('gameMessage').innerText = '';
    gameStatus = true;
    if (activePlayer !== 'X') {
      switchPlayerTurn();
    }
  };

  const resetBtn = document.getElementById('resetButton');
  resetBtn.addEventListener('click', resetGame, false);

  //Initial play game message
  return { playedCell, printBoard, checkWinOrDraw, announceResult };
}

const game = GameController();
// game.playRound();
game.printBoard();
// game.checkWinOrDraw();
