import { useEffect, useState } from "react";
import { O_IMAGE, X_IMAGE } from "../../assets";
import {
  AICpuStrategy,
  checkWinner,
  EasyCpuStrategy,
} from "../../Logic/Logic.abstract";
import "./GameWindow.css";
import { GAME_MODES } from "../../Constants/Constants";
import type { GameMode } from "../../Models/Models";

const GameWindow = ({ gameMode }: { gameMode: GameMode | null }) => {
  const [board, setBoard] = useState<string[]>(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState<string>("x");
  const [cpuStrategy, setCpuStrategy] = useState<any>();
  const [lock, setLock] = useState<boolean>(true);
  const [gameMessage, setGameMessage] = useState<string | null>(null);
  const [awaitingReset, setAwaitingReset] = useState<boolean>(false);

  function handleCellClick(row: number, col: number) {
    const index = row * 3 + col;
    if (lock) return;
    if (board[index] === "") {
      setLock(true);
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      setCurrentPlayer((prev) => (prev === "x" ? "o" : "x"));
      setLock(false);
    }
  }

  function resetGame() {
    setBoard(Array(9).fill(""));
    setCurrentPlayer("x");
    setLock(false);
    setGameMessage(null);
    setAwaitingReset(false);
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
      }, 500);
      setLock(false);
    }
  }

  useEffect(() => {
    const winner = checkWinner(board);
    if (winner === "draw") {
      setGameMessage("It's a draw! Press Enter to restart.");
      setAwaitingReset(true);
      setLock(true);
      return;
    }
    if (winner) {
      setGameMessage(`${winner.toUpperCase()} wins! Press Enter to restart.`);
      setAwaitingReset(true);
      setLock(true);
      return;
    }

    if (gameMode !== GAME_MODES.PVP && currentPlayer === "o") {
      makeCpuMove();
    }
  }, [board]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (awaitingReset && e.key === "Enter") {
        resetGame();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [awaitingReset]);

  useEffect(() => {
    if (gameMode) {
      setLock(false);
    }

    if (gameMode === GAME_MODES.CPU) {
      setCpuStrategy(new EasyCpuStrategy());
    }
    if (gameMode === GAME_MODES.AI) {
      setCpuStrategy(new AICpuStrategy());
    }
  }, [gameMode]);

  return (
    <div className="container">
      <h1 className="title">
        Tic Tac Toe <span>Game</span>
      </h1>
      {gameMessage && (
        <div className="game-message-container">
          <div className="game-message">
            <p>{gameMessage}</p>
            <button className="restart-button" onClick={resetGame}>
              Tap to Restart
            </button>
          </div>
        </div>
      )}

      <div className="game-container">
        <div className="game-board">
          {[0, 1, 2].map((row) => (
            <div className="game-board-row" key={row}>
              {board.slice(row * 3, row * 3 + 3).map((item, col) => (
                <div
                  className="game-board-cell"
                  key={col}
                  onClick={() =>
                    gameMode !== GAME_MODES.PVP && currentPlayer === "o"
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
