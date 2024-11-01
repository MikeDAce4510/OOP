class Connect4 {
    constructor(player1Color, player2Color) {
        this.rows = 6;
        this.cols = 7;
        this.board = Array.from({ length: this.rows }, () => Array(this.cols).fill(null));
        this.currentPlayer = 1;
        this.playerColors = [player1Color, player2Color];
        this.createBoard();
    }

    createBoard() {
        const boardElement = document.getElementById('board');
        boardElement.innerHTML = ''; // Clear any existing cells

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                // Add click event listener to columns

                cell.addEventListener('click', () => this.makeMove(col));

                boardElement.appendChild(cell);
            }
        }
    }



    makeMove(col) {
        for (let row = this.rows - 1; row >= 0; row--) {
            if (!this.board[row][col]) {
                this.board[row][col] = this.currentPlayer;
                this.updateBoard();
                if (this.checkWin(row, col)) {
                    alert(`Player ${this.currentPlayer} wins!`);
                    this.resetGame();
                } else {
                    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
                }
                return;
            }
        }
        alert("Column is full! Choose another.");
    }

    updateBoard() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell, index) => {
            const col = index % this.cols;
            const row = Math.floor(index / this.cols);
            cell.className = 'cell';
            if (this.board[row][col]) {
                cell.classList.add(`player${this.board[row][col]}`);
            }
        });
    }

    checkWin(row, col) {
        const directions = [
            { x: 1, y: 0 },  // Horizontal
            { x: 0, y: 1 },  // Vertical
            { x: 1, y: 1 },  // Diagonal \
            { x: 1, y: -1 }  // Diagonal /
        ];

        for (const { x, y } of directions) {
            let count = 1;
            count += this.countInDirection(row, col, x, y);
            count += this.countInDirection(row, col, -x, -y);
            if (count >= 4) return true;
        }
        return false;
    }

    countInDirection(row, col, x, y) {
        let count = 0;
        let r = row + y;
        let c = col + x;
        while (r >= 0 && r < this.rows && c >= 0 && c < this.cols && this.board[r][c] === this.currentPlayer) {
            count++;
            r += y;
            c += x;
        }
        return count;
    }

    resetGame() {
        this.board = Array.from({ length: this.rows }, () => Array(this.cols).fill(null));
        this.currentPlayer = 1;
        this.updateBoard();
    }
}

// Prompt players for colors and start the game
const player1Color = prompt("Enter color for Player 1 (e.g., 'red'):", "red") || "red";
const player2Color = prompt("Enter color for Player 2 (e.g., 'yellow'):", "yellow") || "yellow";
const game = new Connect4(player1Color, player2Color);

