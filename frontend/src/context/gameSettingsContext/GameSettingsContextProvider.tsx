import { useMemo, useState, type ReactNode } from "react";
import { gameConstants } from "../../utils/Constants";
import { GameSettingsContext } from "./GameSettingsContext";

export function GameSettingsContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [wordLength, setWordLength] = useState<number>(
    gameConstants.WORD_LENGTH_5,
  );

  const gameSettingsContextValue = useMemo(
    () => ({
      gameDifficulty: {
        wordLength,
        setWordLength,
      },
    }),
    [wordLength],
  );

  return (
    <GameSettingsContext.Provider value={gameSettingsContextValue}>
      {children}
    </GameSettingsContext.Provider>
  );
}
