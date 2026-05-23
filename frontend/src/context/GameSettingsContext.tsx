import { createContext, useContext } from "react";
import type { GameSettingsContextType } from "../types/Types";

export const GameSettingsContext = createContext<
  GameSettingsContextType | undefined
>(undefined);

export function useGameSettings() {
  const context = useContext(GameSettingsContext);
  if (!context) {
    throw new Error("useGameSettings must be used within GameSettingsProvider");
  }
  return context;
}
