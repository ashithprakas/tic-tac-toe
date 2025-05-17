import { useState } from "react";
import "./MenuWindow.css";
import type { GameMode } from "../../Models/Models";
import { GAME_MODES } from "../../Constants/Constants";

type MenuWindowProps = {
  onStartGame: (gameMode: GameMode) => void;
};

const MenuWindow = ({ onStartGame }: MenuWindowProps) => {
  const [showMenu, setShowMenu] = useState(true);
  const [gameMode, setGameMode] = useState<GameMode>(GAME_MODES.PVP);

  const handleStartGame = () => {
    onStartGame(gameMode);
    setShowMenu(false);
  };

  return (
    <>
      {showMenu && (
        <div className="menu-overlay">
          <h2 className="menu-title">Select Game Mode</h2>
          <select
            className="mode-select"
            onChange={(e) => setGameMode(e.target.value as GameMode)}
          >
            <option value={GAME_MODES.PVP}>Player vs Player</option>
            <option value={GAME_MODES.CPU}>Player vs CPU</option>
            <option value={GAME_MODES.AI}>Player vs AI</option>
          </select>
          <button className="start-button" onClick={() => handleStartGame()}>
            Start Game
          </button>
        </div>
      )}
    </>
  );
};

export default MenuWindow;
