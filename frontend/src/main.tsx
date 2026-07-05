import "@mantine/core/styles.css";
import { StrictMode } from "react";
import "@fontsource/arvo";
import "./localization/i18n.ts";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import App from "./App";
import { theme } from "./utils/MantineTheme";
import { ViewportContextProvider } from "./context/viewportContext/ViewportContextProvider.tsx";
import { NotificationModalSourceContextProvider } from "./context/notificationModalSourceContext/NotificationModalSourceContextProvider";
import { GameSettingsContextProvider } from "./context/gameSettingsContext/GameSettingsContextProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <ViewportContextProvider>
        <NotificationModalSourceContextProvider>
          <GameSettingsContextProvider>
            <App />
          </GameSettingsContextProvider>
        </NotificationModalSourceContextProvider>
      </ViewportContextProvider>
    </MantineProvider>
  </StrictMode>,
);
