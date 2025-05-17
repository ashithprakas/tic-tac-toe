import { useState } from "react";
import GameWindow from "../Game_Window/GameWindow";
import MenuWindow from "../Menu_Window/MenuWindow";
import type { GameMode } from "../../Models/Models";

const MainWindow = () => {
  const [gameMode, setGameMode] = useState<GameMode | null>(null);

  const handleStartGame = (mode: GameMode) => {
    setGameMode(mode);
  };

  return (
    <div>
      <MenuWindow onStartGame={handleStartGame} />
      <GameWindow gameMode={gameMode} />
    </div>
  );
};

export default MainWindow;
