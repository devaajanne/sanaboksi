import { MantineProvider, createTheme } from "@mantine/core";
import type { MantineColorsTuple } from "@mantine/core";
import App from "./App";
import { lightModePalette, darkModePalette } from "../utility/ColorPalettes";
import "@mantine/core/styles.css";
import { useMemo } from "react";
import "@fontsource/arvo";
import "../localization/i18n.ts";

export default function Main() {
  const theme = useMemo(
    () =>
      createTheme({
        fontFamily: "Arvo, serif",
        headings: {
          fontFamily: "Arvo, serif",
        },
        colors: {
          lightModePalette: lightModePalette as MantineColorsTuple,
          darkModePalette: darkModePalette as MantineColorsTuple,
        },
        primaryColor: "lightModePalette",
      }),
    [],
  );

  return (
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  );
}
