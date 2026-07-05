#!/usr/bin/env node
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const HOST = '0.0.0.0';

const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg'
};

const server = http.createServer((req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    let filePath = req.url === '/' ? '/index.html' : req.url;
    filePath = path.join(__dirname, filePath);

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'text/plain';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(`
                <!DOCTYPE html>
                <html>
                <head><title>404</title></head>
                <body style="background:#000;color:#fff;text-align:center;padding:50px">
                    <h1>404 - Página no encontrada</h1>
                    <p>Archivo: ${filePath}</p>
                </body>
                </html>
            `);
            return;
        }

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
});

server.listen(PORT, HOST, () => {
    console.log(`
╔════════════════════════════════════════════════════════════╗
║          ELITE TRADING PRO - SERVIDOR ACTIVO              ║
╚════════════════════════════════════════════════════════════╝

🚀 Servidor corriendo en:
   http://localhost:${PORT}

📱 Desde tu red local:
   http://192.168.1.X:${PORT}
   (reemplaza X con tu IP local)

✅ Presiona Ctrl+C para detener

`);
});

process.on('uncaughtException', (err) => {
    console.error('Error:', err);
});
