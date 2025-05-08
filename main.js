const statusArea = document.getElementById('statusArea');
const restartButton = document.getElementById('restartButton');
const cells = document.querySelectorAll('.cell');

let currentPlayer = 'X';
let boardState = Array(9).fill(null);
let gameActive = true;

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

  if (boardState[clickedCellIndex] !== null || !gameActive) {
    return;
  }

  boardState[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;
  clickedCell.classList.add(currentPlayer);

  checkResult();
}

function checkResult() {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const winCondition = winningConditions[i];
    const a = boardState[winCondition[0]];
    const b = boardState[winCondition[1]];
    const c = boardState[winCondition[2]];

    if (a === null || b === null || c === null) {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusArea.textContent = `Player ${currentPlayer} has won!`;
    gameActive = false;
    return;
  }

  if (!boardState.includes(null)) {
    statusArea.textContent = 'Game ended in a draw!';
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusArea.textContent = `Player ${currentPlayer}'s turn`;
}

function restartGame() {
  currentPlayer = 'X';
  boardState = Array(9).fill(null);
  gameActive = true;
  statusArea.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('X', 'O');
  });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

// Initialize status
statusArea.textContent = `Player ${currentPlayer}'s turn`;
