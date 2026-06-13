import { useMemo, useState, type ReactNode } from "react";
import { gameConstants } from "../utility/Constants";
import { GameContext } from "./GameContext";

export function GameContextProvider({ children }: { children: ReactNode }) {
  const [wordLength, setWordLength] = useState<number>(
    gameConstants.WORD_LENGTH_5,
  );
  const gameContextValue = useMemo(
    () => ({ wordLength, setWordLength }),
    [wordLength],
  );

  return (
    <GameContext.Provider value={gameContextValue}>
      {children}
    </GameContext.Provider>
  );
}
