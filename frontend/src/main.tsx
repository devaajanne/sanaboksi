import "@fontsource/arvo";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { GameSettingsContextProvider } from "./context/gameSettingsContext/GameSettingsContextProvider";
import { NotificationModalSourceContextProvider } from "./context/notificationModalSourceContext/NotificationModalSourceContextProvider";
import { ViewportContextProvider } from "./context/viewportContext/ViewportContextProvider.tsx";
import "./localization/i18n.ts";
import { theme } from "./utils/MantineTheme";

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
  </StrictMode>
);
