import { MantineProvider, createTheme } from "@mantine/core";
import type { MantineColorsTuple } from "@mantine/core";
import App from "./App.tsx";
import { lightModePalette, darkModePalette } from "./utils/ColorPalettes.tsx";
import "@mantine/core/styles.css";
import { StrictMode, useMemo } from "react";
import "@fontsource/arvo";
import "./localization/i18n.ts";
import { ViewportContextProvider } from "./context/ViewportContextProvider.tsx";
import { GameContextProvider } from "./context/GameContextProvider.tsx";

export default function Main() {
  const theme = useMemo(
    () =>
      createTheme({
        fontFamily: "Arvo, serif",
        colors: {
          lightModePalette: lightModePalette as MantineColorsTuple,
          darkModePalette: darkModePalette as MantineColorsTuple,
        },
        primaryColor: "lightModePalette",
      }),
    [],
  );

  return (
    <StrictMode>
      <MantineProvider theme={theme}>
        <ViewportContextProvider>
          <GameContextProvider>
            <App />
          </GameContextProvider>
        </ViewportContextProvider>
      </MantineProvider>
    </StrictMode>
  );
}
