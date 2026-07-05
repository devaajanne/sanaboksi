import { createContext, useContext } from "react";
import type { NotificationModalSourceType } from "../../types/Types";

export const NotificationModalSourceContext = createContext<
  NotificationModalSourceType | undefined
>(undefined);

export function useNotificationModalSourceContext() {
  const context = useContext(NotificationModalSourceContext);
  if (!context) {
    throw new Error(
      "useNotificationModalSourceContext must be used within NotificationModalSourceContextProvider",
    );
  }
  return context;
}
