import { useMemo, type ReactNode } from "react";
import { ViewportContext } from "./ViewportContext";
import { useMediaQuery } from "@mantine/hooks";
import { useMantineTheme } from "@mantine/core";

export function ViewportContextProvider({ children }: { children: ReactNode }) {
  const theme = useMantineTheme();
  const xs = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);
  const sm = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const md = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  const lg = useMediaQuery(`(max-width: ${theme.breakpoints.lg})`);
  const xl = useMediaQuery(`(max-width: ${theme.breakpoints.xl})`);
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const viewportContextValue = useMemo(
    () => ({ xs, sm, md, lg, xl, isMobile }),
    [xs, sm, md, lg, xl, isMobile],
  );

  return (
    <ViewportContext.Provider value={viewportContextValue}>
      {children}
    </ViewportContext.Provider>
  );
}
