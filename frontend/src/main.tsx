import "@mantine/core/styles.css";
import { StrictMode } from "react";
import "@fontsource/arvo";
import "./localization/i18n.ts";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { MantineProvider } from "@mantine/core";
import { ViewportContextProvider } from "./context/ViewportContextProvider.tsx";
import { theme } from "./utils/MantineTheme.tsx";
import { GameContextProvider } from "./context/GameContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <ViewportContextProvider>
        <GameContextProvider>
          <App />
        </GameContextProvider>
      </ViewportContextProvider>
    </MantineProvider>
  </StrictMode>,
);
