import { useEffect, useState } from "react";
import { O_IMAGE, X_IMAGE } from "../../assets";
import { EasyCpuStrategy, type CpuStrategy } from "../../Logic/Logic.abstract";
import "./GameWindow.css";
import { GAME_MODES } from "../../Constants/Constants";
import type { GameMode } from "../../Models/Models";

const GameWindow = ({ gameMode }: { gameMode: GameMode | null }) => {
  const [board, setBoard] = useState<string[]>(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState<string>("x");
  const [moves, setMoves] = useState<number>(0);
  const [cpuStrategy, setCpuStrategy] = useState<CpuStrategy>(
    new EasyCpuStrategy()
  );
  const [lock, setLock] = useState<boolean>(true);

  function handleCellClick(row: number, col: number) {
    const index = row * 3 + col;
    if (lock) return;
    if (board[index] === "") {
      setLock(true);
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      setCurrentPlayer((prev) => (prev === "x" ? "o" : "x"));
      setMoves((prev) => prev + 1);
      setLock(false);
    }
  }

  function resetGame() {
    setBoard(Array(9).fill(""));
    setCurrentPlayer("x");
    setMoves(0);
    setLock(false);
  }

  function makeCpuMove() {
    if (lock) return;
    setLock(true);
    const index = cpuStrategy.getMove(board);
    if (board[index] === "") {
      const newBoard = [...board];
      newBoard[index] = "o";
      setTimeout(() => {
        setBoard(newBoard);
        setCurrentPlayer("x");
        setMoves((prev) => prev + 1);
      }, 500);
      setLock(false);
    }
  }

  useEffect(() => {
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

    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        alert(`${board[a]} wins!`);
        resetGame();
        return;
      }
    }

    if (moves === 9) {
      alert("It's a draw!");
      resetGame();
      return;
    }

    // CPU move after player's turn
    if (gameMode === GAME_MODES.CPU && currentPlayer === "o") {
      makeCpuMove();
    }
  }, [board]);

  useEffect(() => {
    if (gameMode) {
      setLock(false);
    }

    if (gameMode === GAME_MODES.CPU) {
      setCpuStrategy(new EasyCpuStrategy());
    }
  }, [gameMode]);

  return (
    <div className="container">
      <h1 className="title">
        Tic Tac Toe <span>Game</span>
      </h1>
      <div className="game-container">
        <div className="game-board">
          {[0, 1, 2].map((row) => (
            <div className="game-board-row" key={row}>
              {board.slice(row * 3, row * 3 + 3).map((item, col) => (
                <div
                  className="game-board-cell"
                  key={col}
                  onClick={() =>
                    gameMode === GAME_MODES.CPU && currentPlayer === "o"
                      ? null
                      : handleCellClick(row, col)
                  }
                >
                  {item === "x" && (
                    <img
                      className="game-board-cell-image"
                      src={X_IMAGE}
                      alt="X"
                    />
                  )}
                  {item === "o" && (
                    <img
                      className="game-board-cell-image"
                      src={O_IMAGE}
                      alt="O"
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <button className="reset-button" onClick={resetGame}>
        Reset
      </button>
    </div>
  );
};

export default GameWindow;
