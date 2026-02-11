import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: process.env.VITE_DEV_HOST === "true" ? true : "localhost",
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: process.env.VITE_USE_POLLING === "true",
    },
  },
});
