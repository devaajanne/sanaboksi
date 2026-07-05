import { createContext, useContext } from "react";
import type { GameSettingsContextType } from "../../types/Types";

export const GameSettingsContext = createContext<
  GameSettingsContextType | undefined
>(undefined);

export function useGameSettingsContext() {
  const context = useContext(GameSettingsContext);
  if (!context) {
    throw new Error(
      "useGameSettingsContext must be used within GameSettingsContextProvider",
    );
  }
  return context;
}
