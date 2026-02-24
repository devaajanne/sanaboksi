import { MantineProvider } from "@mantine/core";
import App from "./App";
import "@mantine/core/styles.css";

export default function Main() {
  return (
    <MantineProvider>
      <App />
    </MantineProvider>
  );
}
