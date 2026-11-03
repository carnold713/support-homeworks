# HomeWorks Support prototype

Website prototype of the lutron.com HomeWorks support page, built from the Support Overhaul UI final components
(Figma file 2nTVLkcPzCj9tymX9hhdcc: components page 12595:306408, desktop 1440 frame 14758:311202, mobile 390 frame 14849:25685).
Find Products lists all 29 HomeWorks products A–Z from node 14244:133491.

All copy, products, articles and documents live in `src/content/`. See `EDITING.md` for how to change them without touching UI code.
The font is Lutron Sans Screen (variable woff2, bundled in `src/assets/fonts/`).

## Run

```
npm install
npm run dev          # Vite dev server
npm run build && npm start   # production build served by server.cjs on http://localhost:3000
```

`server.cjs` uses Node built-ins only. Set `SITE_PASSWORD` to put the site behind a password page.
Deployed on Railway from this repo, which redeploys on every push to `main`.
