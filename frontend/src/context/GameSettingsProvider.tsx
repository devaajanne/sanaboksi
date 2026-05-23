import { useState, type ReactNode } from "react";
import { gameConstants } from "../utility/Constants";
import { GameSettingsContext } from "./GameSettingsContext";

export function GameSettingsProvider({ children }: { children: ReactNode }) {
  const [wordLength, setWordLength] = useState<number>(
    gameConstants.WORD_LENGTH_5,
  );

  return (
    <GameSettingsContext.Provider value={{ wordLength, setWordLength }}>
      {children}
    </GameSettingsContext.Provider>
  );
}
