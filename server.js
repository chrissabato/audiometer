const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const HOST = '0.0.0.0';

const options = {
  key: fs.readFileSync(path.join(__dirname, 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert.pem')),
};

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
};

const server = https.createServer(options, (req, res) => {
  const filePath = req.url === '/' ? '/index.html' : req.url;
  const fullPath = path.join(__dirname, filePath);
  const ext = path.extname(fullPath);

  // Prevent directory traversal
  if (!fullPath.startsWith(__dirname)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(fullPath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, HOST, () => {
  const nets = require('os').networkInterfaces();
  console.log(`Mic Level Meter server running (HTTPS):\n`);
  console.log(`  Local:   https://localhost:${PORT}`);
  for (const iface of Object.values(nets).flat()) {
    if (iface.family === 'IPv4' && !iface.internal) {
      console.log(`  Network: https://${iface.address}:${PORT}`);
    }
  }
  console.log(`\nNote: You will need to accept the self-signed certificate warning in your browser.`);
  console.log(`Press Ctrl+C to stop.`);
});
