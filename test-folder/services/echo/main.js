const http = require('http');

const hostname = '0.0.0.0';
const port = 80;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`${process.env.RESPONSE}\n`);
});

server.listen(port, hostname, () => {
    console.log(`El servidor se está ejecutando en http://${hostname}:${port}/`);
});

process.on('SIGTERM', () => {
    console.log('SIGTERM detected. Shutting down.');
    process.exit();
});
