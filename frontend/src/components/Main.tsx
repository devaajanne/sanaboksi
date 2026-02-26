import { MantineProvider, createTheme } from "@mantine/core";
import type { MantineColorsTuple } from "@mantine/core";
import App from "./App";
import { darkModePalette, lightModePalette } from "../utility/ColorPalettes";
import { ColorPaletteProvider } from "./context/ColorPaletteContextProvider";
import "@mantine/core/styles.css";
import { useMemo } from "react";
import "@fontsource/arvo";

export default function Main() {
  const theme = useMemo(
    () =>
      createTheme({
        fontFamily: "Arvo, serif",
        headings: {
          fontFamily: "Arvo, serif",
        },
        colors: {
          darkModePalette: darkModePalette as MantineColorsTuple,
          lightModePalette: lightModePalette as MantineColorsTuple,
        },
        primaryColor: "lightModePalette",
      }),
    [],
  );

  return (
    <MantineProvider theme={theme}>
      <ColorPaletteProvider>
        <App />
      </ColorPaletteProvider>
    </MantineProvider>
  );
}
