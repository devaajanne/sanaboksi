import { useMemo, type ReactNode } from "react";
import { stylingConstants } from "../utility/Constants";
import { ViewportContext } from "./ViewportContext";
import { useMediaQuery } from "@mantine/hooks";

export function ViewportContextProvider({ children }: { children: ReactNode }) {
  const isSmViewport = useMediaQuery(stylingConstants.SM_VIEWPORT_MAX_WIDTH);
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
