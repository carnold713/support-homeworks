// Copies the 1440x1024 frame page to dist/homeworks-desktop/index.html after the Vite build.
const fs = require('fs');
const path = require('path');
fs.copyFileSync(path.join(__dirname, 'index.html'), path.join(__dirname, '..', 'dist', 'homeworks-desktop', 'index.html'));
