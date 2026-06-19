import { createTheme, type MantineColorsTuple } from "@mantine/core";
import { darkModePalette, lightModePalette } from "./ColorPalettes";

export const theme = createTheme({
  fontFamily: "Arvo, serif",
  colors: {
    lightModePalette: lightModePalette as MantineColorsTuple,
    darkModePalette: darkModePalette as MantineColorsTuple,
  },
  primaryColor: "lightModePalette",
});
