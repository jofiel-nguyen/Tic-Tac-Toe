document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Play Again';
    resetButton.style.display = 'none'; // initially hide the reset button
    resetButton.addEventListener('click', resetGame);

    let currentPlayer = '✖️';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    // Create the game board
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', () => cellClick(i));
        board.appendChild(cell);
    }

    // Handle cell click
    function cellClick(index) {
        if (!gameActive || gameBoard[index] !== '') return;

        gameBoard[index] = currentPlayer;
        updateBoard();
        checkWinner();

        // Switch player
        currentPlayer = currentPlayer === '✖️' ? '⭕' : '✖️';
    }

    // Update the visual representation of the board
    function updateBoard() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell, index) => {
            cell.textContent = gameBoard[index];
        });
    }

    // Check for a winner
    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                announceWinner(gameBoard[a]);
                return;
            }
        }

        // Check for a tie
        if (!gameBoard.includes('')) {
            announceTie();
        }
    }

    // Announce the winner and end the game
    function announceWinner(winner) {
        alert(`Player ${winner} wins!`);
        endGame();
    }

    // Announce a tie and end the game
    function announceTie() {
        alert("It's a tie!");
        endGame();
    }

    // End the game and ask if the user wants to play again
    function endGame() {
        gameActive = false;
        resetButton.style.display = 'block';
        document.body.appendChild(resetButton);
    }

    // Reset the game
    function resetGame() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = '✖️';
        updateBoard();
        gameActive = true;
        resetButton.style.display = 'none';
    }
});
