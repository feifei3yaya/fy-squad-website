const https = require('https');
const http = require('http');
const fs = require('fs');

const CERT = 'C:/nginx-1.26.2/conf/api-cert.pem';
const KEY = 'C:/nginx-1.26.2/conf/api-key.pem';
const PORT = 3443;
const TARGET = 'http://127.0.0.1:3001';

const options = {
  key: fs.readFileSync(KEY),
  cert: fs.readFileSync(CERT),
};

const proxy = https.createServer(options, (clientReq, clientRes) => {
  const opts = {
    hostname: '127.0.0.1',
    port: 3001,
    path: clientReq.url,
    method: clientReq.method,
    headers: { ...clientReq.headers, 'X-Forwarded-Proto': 'https', host: clientReq.headers.host },
  };

  const backendReq = http.request(opts, (backendRes) => {
    clientRes.writeHead(backendRes.statusCode, backendRes.headers);
    backendRes.pipe(clientRes);
  });

  backendReq.on('error', (e) => {
    clientRes.writeHead(502);
    clientRes.end('Backend error: ' + e.message);
  });

  clientReq.pipe(backendReq);
});

proxy.listen(PORT, () => console.log(`HTTPS proxy on port ${PORT} → ${TARGET}`));
