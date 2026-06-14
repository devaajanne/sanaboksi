import { useMemo, type ReactNode } from "react";
import { ViewportContext } from "./ViewportContext";
import { useMediaQuery } from "@mantine/hooks";

export function ViewportContextProvider({ children }: { children: ReactNode }) {
  const isSmViewport = useMediaQuery("(max-width: 48em)");
  const viewportContextValue = useMemo(
    () => ({ isSmViewport }),
    [isSmViewport],
  );

  return (
    <ViewportContext.Provider value={viewportContextValue}>
      {children}
    </ViewportContext.Provider>
  );
}
