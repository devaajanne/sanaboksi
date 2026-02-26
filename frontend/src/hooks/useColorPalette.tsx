import { useMantineTheme, useMantineColorScheme } from "@mantine/core";

/**
 * Custom hook to get the current color palette (light or dark) from Mantine theme.
 *
 * Returns the palette array defined in the MantineProvider theme as either
 * `theme.colors.lightModePalette` or `theme.colors.darkModePalette`, depending on the current color scheme.
 *
 * @returns {string[]} The current color palette array for the active color scheme.
 */
export function useColorPalette() {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  type CustomColors = typeof theme.colors & {
    lightModePalette: (typeof theme.colors)[keyof typeof theme.colors];
    darkModePalette: (typeof theme.colors)[keyof typeof theme.colors];
  };

  const colors = theme.colors as CustomColors;

  return colorScheme === "light"
    ? colors.lightModePalette
    : colors.darkModePalette;
}
