import { createContext, useContext } from "react";
import type { ViewportContextType } from "../../types/Types";

export const ViewportContext = createContext<ViewportContextType | undefined>(
  undefined,
);

export function useViewportContext() {
  const context = useContext(ViewportContext);
  if (!context) {
    throw new Error(
      "useViewportContext must be used within ViewportContextProvider",
    );
  }
  return context;
}
