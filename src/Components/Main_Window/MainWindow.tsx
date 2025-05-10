import { useState, useEffect } from "react";
import { O_IMAGE, X_IMAGE } from "../../assets";

const MainWindow = () => {
  const [board, setBoard] = useState<string[]>(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState<string>("x");
  const [moves, setMoves] = useState<number>(0);

  function handleCellClick(row: number, col: number){
    if(board[row * 3 + col] == ''){
        setCurrentPlayer(currentPlayer === 'x' ? 'o' : 'x')
        setMoves(prev => prev + 1);
        const newBoard = [...board];
        newBoard[row * 3 + col] = currentPlayer;
        setBoard(newBoard);
    }
  }

  function resetGame(){
    setBoard(Array(9).fill(""));
    setCurrentPlayer("x");
    setMoves(0);
  }

  useEffect(() => {
    const winningCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]   

    winningCombinations.forEach(combination => {    
        const [a,b,c] = combination;
        if(board[a] && board[a] === board[b] && board[a] === board[c]){
            alert(`${board[a]} wins!`);
            resetGame();
        }
    })  

    if(moves === 9){
        alert("It's a draw!");
        resetGame();
    }
  }, [board]);

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
                <div className="game-board-cell" key={col} onClick={() => handleCellClick(row,col)}>
                  {
                    item === 'x' && <img src={X_IMAGE} alt="X" />
                  }
                  {
                    item === 'o' && <img src={O_IMAGE} alt="O" />
                  }
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <button className="reset-button" onClick={() => resetGame()}>Reset</button>
    </div>
  );
};

export default MainWindow;
