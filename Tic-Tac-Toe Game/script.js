const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('resetButton');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', '']; // Empty board
let playerXScore = 0;
let playerOScore = 0;

// Handle cell click
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);

function handleCellClick(event) {
    const index = event.target.getAttribute('data-index');

    // If the cell is already filled, do nothing
    if (gameBoard[index] !== '') return;

    // Fill the cell with the current player's mark
    gameBoard[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    // Check for a winner
    if (checkWinner()) {
        message.textContent = `${currentPlayer} wins!`;
        updateScore(currentPlayer);
        disableBoard();
    } else if (gameBoard.every(cell => cell !== '')) {
        message.textContent = 'It\'s a tie!';
    } else {
        // Switch to the next player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// Check if the current player has won
function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }
    return false;
}

// Disable the board after the game ends
function disableBoard() {
    cells.forEach(cell => {
        cell.removeEventListener('click', handleCellClick);
    });
}

// Reset the game
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleCellClick);
    });
    currentPlayer = 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;
}

// Update the score
function updateScore(winner) {
    if (winner === 'X') {
        playerXScore++;
        scoreX.textContent = playerXScore;
    } else if (winner === 'O') {
        playerOScore++;
        scoreO.textContent = playerOScore;
    }
}
