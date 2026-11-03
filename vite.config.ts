import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // The site lives at /homeworks-desktop/app/ and is shown inside the fixed 1440x1024 frame at /homeworks-desktop/.
  base: process.env.FIGMA_PUBLIC_URL || "/homeworks-desktop/app/",
  build: { outDir: "dist/homeworks-desktop/app", emptyOutDir: true },
  server: {
    port: process.env.FIGMA ? Number(process.env.PORT) : 5173,
    host: process.env.FIGMA ? process.env.FIGMA_DEV_SERVER_HOST || "0.0.0.0" : undefined,
    strictPort: Boolean(process.env.FIGMA),
    allowedHosts: process.env.FIGMA ? true : undefined,
  },
});
