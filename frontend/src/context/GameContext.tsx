import { createContext, useContext } from "react";
import type { GameContextType } from "../types/Types";

export const GameContext = createContext<GameContextType | undefined>(
  undefined,
);

export function useGameContext() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within GameContextProvider");
  }
  return context;
}
