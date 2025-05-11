export class EasyCpuStrategy {
  getMove(board: string[]): number {
    const emptyCells = board
      .map((cell, index) => (cell === "" ? index : null))
      .filter((cell) => cell !== null);
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  }
}

export function checkWinner(board: string[]) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let moves = board.reduce((acc, cell) => (cell !== "" ? acc + 1 : acc), 0);
  if (moves === 9) {
    return "draw";
  }
  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
}
