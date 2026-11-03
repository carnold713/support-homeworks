import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // The site lives at /homeworks-desktop/ and draws its own fixed 1440x1024 frame (see src/main.tsx).
  // Relative base so the same build works wherever it is served: Railway (/homeworks-desktop/), the site root, or a Figma Make published URL.
  base: process.env.FIGMA_PUBLIC_URL || "./",
  build: { outDir: "dist/homeworks-desktop", emptyOutDir: true },
  server: {
    port: process.env.FIGMA ? Number(process.env.PORT) : 5173,
    host: process.env.FIGMA ? process.env.FIGMA_DEV_SERVER_HOST || "0.0.0.0" : undefined,
    strictPort: Boolean(process.env.FIGMA),
    allowedHosts: process.env.FIGMA ? true : undefined,
  },
});
