const http = require('http');

let cache = null;
let lastUpdateTime = 0;
const REVALIDATE_INTERVAL = 30000; // 1 minute

http.createServer((req, res) => {
    if (req.url === '/') {
        const now = Date.now();

        if (!cache || (now - lastUpdateTime) > REVALIDATE_INTERVAL) {
            cache = { timestamp: new Date().toISOString() };
            lastUpdateTime = now;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(cache));
    } else {
        res.writeHead(404);
        res.end();
    }
}).listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
