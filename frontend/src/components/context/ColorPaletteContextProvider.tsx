import { useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { ColorPaletteContext } from "./ColorPaletteContext";
import type { ReactNode } from "react";

export function ColorPaletteProvider({ children }: { children: ReactNode }) {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const colorPalette =
    colorScheme === "dark"
      ? theme.colors.darkModePalette
      : theme.colors.lightModePalette;

  return (
    <ColorPaletteContext.Provider value={colorPalette}>
      {children}
    </ColorPaletteContext.Provider>
  );
}
