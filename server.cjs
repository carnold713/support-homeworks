// Static server for the HomeWorks Support prototype (serves the Vite build in dist/). Node built-ins only.
// Set SITE_PASSWORD to put the site behind a simple password page.
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 3000;
const ROOT = path.join(__dirname, 'dist');
const PASSWORD = process.env.SITE_PASSWORD || '';
const TOKEN = PASSWORD ? crypto.createHash('sha256').update('hw:' + PASSWORD).digest('hex') : '';

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.json': 'application/json',
};

function loginPage(error) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>HomeWorks Support prototype</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f8f8f8;font:16px/24px L,system-ui,sans-serif;color:#262626}
form{background:#fff;border:1px solid #e9e9e9;border-radius:16px;padding:32px;width:min(360px,calc(100vw - 32px));display:flex;flex-direction:column;gap:16px}
h1{font-size:24px;line-height:32px;font-weight:500;margin:0}input{height:48px;border:0;border-radius:28px;background:rgba(0,0,0,.06);padding:0 20px;font:inherit}
button{height:44px;border:0;border-radius:24px;background:#006dcc;color:#fff;font:inherit;font-weight:500;cursor:pointer}p{margin:0;color:#d0021b;font-size:14px}</style></head>
<body><form method="post" action="/__login"><h1>HomeWorks Support prototype</h1><input type="password" name="password" placeholder="Password" autofocus required>${error ? '<p>That password is not right.</p>' : ''}<button>View prototype</button></form></body></html>`;
}

function authed(req) {
  if (!PASSWORD) return true;
  const m = (req.headers.cookie || '').match(/(?:^|;\s*)hwauth=([a-f0-9]+)/);
  return !!m && m[1] === TOKEN;
}

http.createServer((req, res) => {
  const url = new URL(req.url, 'http://x');

  if (url.pathname === '/healthz') { res.writeHead(200); return res.end('ok'); }

  if (PASSWORD && url.pathname === '/__login' && req.method === 'POST') {
    let body = '';
    req.on('data', (c) => { body += c; if (body.length > 1e4) req.destroy(); });
    req.on('end', () => {
      const pw = new URLSearchParams(body).get('password') || '';
      if (pw === PASSWORD) {
        res.writeHead(302, { 'Set-Cookie': `hwauth=${TOKEN}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000; Secure`, Location: '/homeworks-desktop/' });
        return res.end();
      }
      res.writeHead(401, { 'Content-Type': TYPES['.html'] });
      res.end(loginPage(true));
    });
    return;
  }

  // The prototype lives at /homeworks-desktop/ (it draws its own fixed 1440x1024 frame).
  // The old /homeworks-desktop/app/ address from the earlier iframe version redirects there too.
  if (url.pathname === '/' || url.pathname === '/homeworks-desktop' || url.pathname === '/homeworks-desktop/app' || url.pathname === '/homeworks-desktop/app/') {
    res.writeHead(302, { Location: '/homeworks-desktop/' });
    return res.end();
  }

  let rel = decodeURIComponent(url.pathname);
  if (rel.endsWith('/')) rel += 'index.html';
  const file = path.normalize(path.join(ROOT, rel));
  if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end(); }

  const isPage = path.extname(file) === '.html';
  const isFont = path.extname(file) === '.woff2';
  if (!authed(req) && !isFont) {
    if (!isPage) { res.writeHead(401); return res.end(); }
    res.writeHead(200, { 'Content-Type': TYPES['.html'], 'Cache-Control': 'no-store' });
    return res.end(loginPage(false));
  }

  fs.stat(file, (err, st) => {
    if (err || !st.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('Not found');
    }
    const ext = path.extname(file);
    res.writeHead(200, {
      'Content-Type': TYPES[ext] || 'application/octet-stream',
      'Content-Length': st.size,
      'Cache-Control': isPage || ext === '.css' || ext === '.js' ? 'no-cache' : 'public, max-age=86400',
    });
    if (req.method === 'HEAD') return res.end();
    fs.createReadStream(file).pipe(res);
  });
}).listen(PORT, () => console.log(`HomeWorks Support prototype on :${PORT}${PASSWORD ? ' (password on)' : ''}`));
