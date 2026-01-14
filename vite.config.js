import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  root: ".",
  plugins: [
    react(),
    {
      name: "add-nojekyll",
      closeBundle() {
        const nojekyllPath = path.resolve("dist", ".nojekyll");
        fs.writeFileSync(nojekyllPath, "");
        console.log("✅ Created .nojekyll file for GitHub Pages");
      },
    },
  ],
  base: "/",
  server: {
    port: 4000,
    host: true,
    allowedHosts: [  
      ".replit.dev"
    ],
  },
});
