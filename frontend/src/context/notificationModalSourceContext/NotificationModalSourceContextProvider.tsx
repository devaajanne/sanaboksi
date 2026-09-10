import { useMemo, useState, type ReactNode } from "react";
import { NotificationModalSource } from "../../types/Types";
import { NotificationModalSourceContext } from "./NotificationModalSourceContext";

export function NotificationModalSourceContextProvider({
  children
}: {
  children: ReactNode;
}) {
  const [notificationModalSource, setNotificationModalSource] =
    useState<NotificationModalSource>(NotificationModalSource.NoSource);
  const notificationModalSourceContextValue = useMemo(
    () => ({ notificationModalSource, setNotificationModalSource }),
    [notificationModalSource]
  );

  return (
    <NotificationModalSourceContext.Provider
      value={notificationModalSourceContextValue}
    >
      {children}
    </NotificationModalSourceContext.Provider>
  );
}
