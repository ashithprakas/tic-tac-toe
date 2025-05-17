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
  return null;
}

export class AICpuStrategy {
  private readonly SCORES = {
    o: 1,
    x: -1,
    draw: 0,
  };
  getMove(board: string[]): number {
    let bestMove = -1;
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = "o";
        let score = this.miniMaxSolver(board, false, 0);
        board[i] = "";
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
          console.log(bestMove);
        }
      }
    }
    return bestMove;
  }

  private miniMaxSolver(
    board: string[],
    isMaximizing: boolean,
    depth: number = 0
  ): number {
    let result = checkWinner(board);
    if (result != null) {
      let score = this.SCORES[result as keyof typeof this.SCORES];
      return score;
    }
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
          board[i] = "o";
          let score = this.miniMaxSolver(board, false, depth + 1);
          board[i] = "";
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
          board[i] = "x";
          let score = this.miniMaxSolver(board, true, depth + 1);
          board[i] = "";
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }
}
