import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  root: ".",
  plugins: [react()],
  base: "/",
  server: {
    port: 4000,
    host: true,
    allowedHosts: [  
      ".replit.dev"
    ],
  },
});
