import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  root: ".",
  base: "/",
  plugins: [react()],
  server: {
    port: 4000,
    host: true,
    allowedHosts: [
      "11b32f9b-c1b8-4f5a-a31c-8dff7597464d-00-ndsa5d2rlysp.worf.replit.dev",
    ],
  },
});
