import { useMemo, useState, type ReactNode } from "react";
import { NotificationModalSourceContext } from "./NotificationModalSourceContext";
import { NotificationModalSource } from "../../types/Types";

export function NotificationModalSourceContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [notificationModalSource, setNotificationModalSource] =
    useState<NotificationModalSource>(NotificationModalSource.NoSource);
  const notificationModalSourceContextValue = useMemo(
    () => ({
      notificationModalSource,
      setNotificationModalSource,
    }),
    [notificationModalSource],
  );

  return (
    <NotificationModalSourceContext.Provider
      value={notificationModalSourceContextValue}
    >
      {children}
    </NotificationModalSourceContext.Provider>
  );
}
