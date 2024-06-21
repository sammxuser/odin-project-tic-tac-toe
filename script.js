function GameBoard() {
  const board = ['', '', '', '', '', '', '', '', ''];
  const getBoard = () => board;
  // const getActivePlayer = () => activePlayer;

  return {
    getBoard,
    // getGameStatus,
    // getActivePlayer,
  };
}

function Player(playersNames) {
  let activePlayer = 'X';
  const getActivePlayer = () => activePlayer;

  let activePlayerName = playersNames[0];
  const getActivePlayerName = () => activePlayerName;

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === 'X' ? 'O' : 'X';
    if (activePlayerName === playersNames[0]) {
      activePlayerName = playersNames[1];
    } else if (activePlayerName === playersNames[1]) {
      activePlayerName = playersNames[0];
    }
  };

  return { getActivePlayer, switchPlayerTurn, getActivePlayerName };
}
// The gameController will be responsible for controlling the flow and state of the game's turns
// as well as whether anybody has won the game
function GameController(gamePlayStatus, playersNames) {
  const board = GameBoard();
  // let gameStatus = board.getGameStatus();
  let gameBoard = board.getBoard();
  let gameStatus = gamePlayStatus;
  const gameStartBtn = document.getElementById('gamestartbtn');
  // if (gameStatus) {
  // Disable game start button if game is in play
  // gameStartBtn.classList.toggle('togglehidden');
  // }
  const getGameStatus = () => gameStatus;

  const player = Player(playersNames);
  let activePlayer = player.getActivePlayer();
  let activePlayerName = player.getActivePlayerName();

  const cells = document.querySelectorAll('.cell');

  // method to get the cell played and the player
  const playedCell = (playedCellIndex, currentPlayer, gameStatus) => {
    if (gameStatus) {
      gameBoard[playedCellIndex] = currentPlayer;
      const welcomeDiv = document.querySelector('.welcome');
      const playerChoices = document.createElement('p');
      playerChoices.textContent = `${activePlayerName} played ${currentPlayer}`;
      welcomeDiv.appendChild(playerChoices);
    }
  };

  function cellClicked(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.id.replace('cell-', '')) - 1;

    if (gameBoard[clickedCellIndex] !== '' || !gameStatus) {
      return;
    }
    playedCell(clickedCellIndex, activePlayer, gameStatus);
    updateBoard();
    // switch player turn
    player.switchPlayerTurn();
    activePlayer = player.getActivePlayer();
    activePlayerName = player.getActivePlayerName();
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
      player.switchPlayerTurn();
      activePlayer = player.getActivePlayer();
      activePlayerName = player.getActivePlayerName();
      announceResult(activePlayerName, roundWon, roundDraw);
      gameStatus = false;
    }

    if (roundDraw) {
      announceResult(activePlayerName, roundWon, roundDraw);
      gameStatus = false;
    }
  };

  const announceResult = (currentPlayerName, roundWon, roundDraw) => {
    const messageElement = document.getElementById('gameMessage');
    const resetButton = document.getElementById('resetButton');

    if (roundWon) {
      messageElement.innerText = `${currentPlayerName} Wins!`;
      messageElement.classList.toggle('togglehidden');
      resetButton.classList.toggle('togglehidden');
    } else if (roundDraw) {
      messageElement.innerText = 'Game Draw!';
      messageElement.classList.toggle('togglehidden');
      resetButton.classList.toggle('togglehidden');
    }
  };

  const resetGame = () => {
    if (!gameStatus) {
      cells.forEach((cell) => {
        cell.innerText = '';
      });
      gameBoard = ['', '', '', '', '', '', '', '', ''];
      document.getElementById('gameMessage').innerText = '';
      gameStatus = true;
      if (activePlayer !== 'X') {
        player.switchPlayerTurn();
        activePlayer = player.getActivePlayer();
        activePlayerName = player.getActivePlayerName();
      }
      const namesForm = document.getElementById('playersform');
      let retainPlayerNames = confirm('Retain same players?', false);
      if (!retainPlayerNames) {
        namesForm.player1.value = '';
        namesForm.player2.value = '';
      }
      const resetBtn = document.getElementById('resetButton');
      resetBtn.classList.toggle('togglehidden');
      const messageElement = document.getElementById('gameMessage');
      messageElement.classList.toggle('togglehidden');

      const welcomeDiv = document.querySelector('.welcome');
      welcomeDiv.textContent = '';
    }
  };

  const resetBtn = document.getElementById('resetButton');
  resetBtn.addEventListener('click', resetGame, false);

  //Initial play game message
  return {
    playedCell,
    printBoard,
    checkWinOrDraw,
    announceResult,
    getGameStatus,
  };
}

const playerForm = document.getElementById('playersform');
playerForm.addEventListener('submit', handlePlayerNamesForm);

function handlePlayerNamesForm(event) {
  let playersNames = [];
  playersNames[0] = playerForm.player1.value;
  playersNames[1] = playerForm.player2.value;
  event.preventDefault();

  const game = GameController(true, playersNames);
  const boardOnPage = document.getElementById('tic-tac-toe-board');
  boardOnPage.classList.toggle('togglehidden');
  game.printBoard();
}
