import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: Number(process.env.VITE_PORT),
    strictPort: true,
    watch: {
      usePolling: process.env.VITE_USE_POLLING === "true",
    },
  },
});
