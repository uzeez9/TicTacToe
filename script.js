document.addEventListener('DOMContentLoaded', () => {
    const O = "o";
    const X = "x";
    let currentPlayer = X;
    const cells = document.querySelectorAll('[data-cell]');
    const winningMessageElement = document.getElementById('winningMessage');
    const winningTextElement = document.getElementById('winningText');
    const restartButton = document.getElementById('restartButton');

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            if (cell.classList.contains(X) || cell.classList.contains(O)) return;

            cell.innerText = currentPlayer;  
            cell.classList.add(currentPlayer);

            if (checkWin(currentPlayer)) {
                winningTextElement.innerText = `${currentPlayer.toUpperCase()} Wins!`;
                winningMessageElement.style.display = 'block';
            } else if (isDraw()) {
                winningTextElement.innerText = 'Draw!';
                winningMessageElement.style.display = 'block';
            } else {
                currentPlayer = currentPlayer === X ? O : X;
            }
        });
    });

    restartButton.addEventListener('click', resetGame);

    function resetGame() {
        cells.forEach(cell => {
            cell.className = 'cell';
            cell.innerText = ''; 
            cell.setAttribute('data-cell', '');  
        });
        winningMessageElement.style.display = 'none';
        currentPlayer = X;
    }

    function checkWin(player) {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return cells[index].classList.contains(player);
            });
        });
    }

    function isDraw() {
        return [...cells].every(cell => {
            return cell.classList.contains(X) || cell.classList.contains(O);
        });
    }
});
