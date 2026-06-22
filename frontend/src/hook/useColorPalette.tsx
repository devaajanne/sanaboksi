import {
  useMantineColorScheme,
  useMantineTheme,
  type MantineColorsTuple,
} from "@mantine/core";
import { useMemo } from "react";

/**
 * Custom hook to get the current color palette (light or dark) from Mantine theme.
 *
 * Returns the palette array defined in the MantineProvider theme as either
 * `theme.colors.light` or `theme.colors.dark`, depending on the current color scheme.
 *
 * @returns {MantineColorsTuple} The current color palette array for the active color scheme.
 */
export default function useColorPalette(): MantineColorsTuple {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  const colorPalette = useMemo(() => {
    return colorScheme === "light" ? theme.colors.light : theme.colors.dark;
  }, [colorScheme, theme]);

  return colorPalette;
}
