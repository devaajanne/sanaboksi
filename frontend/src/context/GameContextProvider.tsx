import { useMemo, useState, type ReactNode } from "react";
import { gameConstants } from "../utils/Constants";
import { GameContext } from "./GameContext";
import { NotificationModalSource } from "../types/Types";

export function GameContextProvider({ children }: { children: ReactNode }) {
  const [wordLength, setWordLength] = useState<number>(
    gameConstants.WORD_LENGTH_5,
  );
  const [notificationModalSource, setNotificationModalSource] =
    useState<NotificationModalSource>(NotificationModalSource.NoSource);
  const gameContextValue = useMemo(
    () => ({
      wordLength,
      setWordLength,
      notificationModalSource,
      setNotificationModalSource,
    }),
    [wordLength, notificationModalSource],
  );

  return (
    <GameContext.Provider value={gameContextValue}>
      {children}
    </GameContext.Provider>
  );
}
