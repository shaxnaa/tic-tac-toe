// Select the game board and its cells
const cells = document.querySelectorAll(".cell");
const statusMessage = document.getElementById("status-message");
const resetButton = document.getElementById("reset-button");

// Initialize game variables
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X"; // Player 'X' starts
let gameActive = true;

// Winning combinations (rows, columns, diagonals)
const winningCombinations = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal (top-left to bottom-right)
  [2, 4, 6], // Diagonal (top-right to bottom-left)
];

// Handle player move
function handleCellClick(e) {
  const cell = e.target;
  const cellIndex = cell.dataset.index;

  // Check if the cell is already taken or the game is inactive
  if (board[cellIndex] !== "" || !gameActive) return;

  // Mark the cell with the current player's symbol
  board[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add("taken");

  // Check for a win or draw
  if (checkWinner()) {
    statusMessage.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (board.every(cell => cell !== "")) {
    statusMessage.textContent = "It's a draw!";
    gameActive = false;
  } else {
    // Switch players
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusMessage.textContent = `Player ${currentPlayer}'s turn`;
  }
}

// Check for a winner
function checkWinner() {
  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return (
      board[a] === currentPlayer &&
      board[b] === currentPlayer &&
      board[c] === currentPlayer
    );
  });
}
// Reset the game
function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""]; // Clear the board
  currentPlayer = "X"; // Reset to Player X
  gameActive = true; // Reactivate the game
  statusMessage.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => {
    cell.textContent = ""; // Clear cell content
    cell.classList.remove("taken"); // Remove 'taken' class
  });
}
// Add event listeners to cells
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
// Add event listener to reset button
resetButton.addEventListener("click", resetGame);
