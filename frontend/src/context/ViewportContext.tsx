import { createContext, useContext } from "react";
import type { ViewportContextType } from "../types/Types";

export const ViewportContext = createContext<ViewportContextType | undefined>(
  undefined,
);

export function useViewport() {
  const context = useContext(ViewportContext);
  if (!context) {
    throw new Error("useViewport must be used within ViewportProvider");
  }
  return context;
}
