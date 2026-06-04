import tencentcloud from 'tencentcloud-sdk-nodejs';
import fs from 'fs';
import path from 'path';

const SECRET_ID = process.env.TENCENT_SECRET_ID;
const SECRET_KEY = process.env.TENCENT_SECRET_KEY;
if (!SECRET_ID || !SECRET_KEY) {
  console.error('请设置环境变量 TENCENT_SECRET_ID 和 TENCENT_SECRET_KEY');
  process.exit(1);
}
const cred = { credential: { secretId: SECRET_ID, secretKey: SECRET_KEY }, region: 'ap-guangzhou' };
const tat = new tencentcloud.tat.v20201028.Client(cred);

async function runCmd(script, label, timeout = 60) {
  const cmd = Buffer.from(script, 'utf-8').toString('base64');
  console.log(`\n[${label}]`);
  const r = await tat.RunCommand({
    InstanceIds: ['lhins-abnq8kv9'], CommandType: 'POWERSHELL', Content: cmd, Timeout,
  });
  for (let i = 0; i < 12; i++) {
    await new Promise(res => setTimeout(res, 5000));
    const resp = await tat.DescribeInvocationTasks({
      Filters: [{ Name: 'invocation-id', Values: [r.InvocationId] }]
    });
    const tasks = resp.InvocationTaskSet || [];
    if (tasks.length > 0 && (tasks[0].TaskStatus === 'SUCCESS' || tasks[0].TaskStatus === 'FAILED')) {
      for (const t of tasks) {
        const out = t.TaskResult?.Output ? Buffer.from(t.TaskResult.Output, 'base64').toString('utf-8').replace(/\0/g, '') : '';
        console.log(out.replace(/<Objs[\s\S]*?<\/Objs>/g, ''));
      }
      return;
    }
    process.stdout.write('.');
  }
}

// 一体化服务：静态文件 + API 代理 + HTTPS
const unifiedServer = `
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const STATIC_DIR = 'C:/FYops/www';
const API_HOST = '127.0.0.1';
const API_PORT = 3001;
const PORT = 80;
const HTTPS_PORT = 3443;

function proxyApi(req, res) {
  const targetPath = req.url.replace(/^\\/api/, '') || '/';
  const opts = {
    hostname: API_HOST, port: API_PORT,
    path: targetPath, method: req.method,
    headers: { ...req.headers, 'x-forwarded-proto': 'https', host: API_HOST + ':' + API_PORT }
  };
  delete opts.headers['host'];
  opts.headers.host = API_HOST + ':' + API_PORT;
  
  const backend = http.request(opts, bres => {
    res.writeHead(bres.statusCode, bres.headers);
    bres.pipe(res);
  });
  backend.on('error', e => { res.writeHead(502); res.end('API Error: ' + e.message); });
  req.pipe(backend);
}

function serveStatic(req, res) {
  let filePath = path.join(STATIC_DIR, req.url === '/' ? '/index.html' : req.url);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // SPA fallback: serve index.html for non-file routes
      fs.readFile(path.join(STATIC_DIR, 'index.html'), (err2, data2) => {
        if (err2) { res.writeHead(404); res.end('Not Found'); return; }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data2);
      });
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const mime = { '.html':'text/html','.js':'application/javascript','.css':'text/css',
      '.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml',
      '.ico':'image/x-icon','.mp4':'video/mp4','.webp':'image/webp','.xml':'application/xml',
      '.txt':'text/plain','.woff2':'font/woff2' }[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': mime });
    res.end(data);
  });
}

const handler = (req, res) => {
  if (req.url.startsWith('/api/')) {
    proxyApi(req, res);
  } else {
    serveStatic(req, res);
  }
};

// HTTP 服务器
http.createServer(handler).listen(PORT, () => console.log('HTTP on ' + PORT));

// HTTPS 服务器
const sslOpts = {
  key: fs.readFileSync('C:/nginx-1.26.2/conf/api-key.pem'),
  cert: fs.readFileSync('C:/nginx-1.26.2/conf/api-cert.pem')
};
https.createServer(sslOpts, handler).listen(HTTPS_PORT, () => console.log('HTTPS on ' + HTTPS_PORT));
`;

const serverB64 = Buffer.from(unifiedServer, 'utf-8').toString('base64');

async function main() {
  // Step 1: 上传前端 dist 到服务器
  console.log('=== Step 1: 上传前端到服务器 ===');

  // 读取本地 dist 目录的文件列表
  const distDir = path.join(import.meta.dirname, '..', 'dist');
  const files = [];
  function walkDir(dir, prefix = '') {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const relPath = prefix + entry.name;
      if (entry.isDirectory()) {
        walkDir(path.join(dir, entry.name), relPath + '/');
      } else {
        files.push({ path: relPath, content: fs.readFileSync(path.join(dir, entry.name), 'utf-8') });
      }
    }
  }
  walkDir(distDir);

  // 上传文件列表（核心文件，跳过视频和大文件）
  const coreFiles = files.filter(f => !f.path.startsWith('videos/') && !f.path.startsWith('assets/'));
  const otherFiles = files.filter(f => !coreFiles.includes(f));

  // 先部署一体化服务
  console.log('部署一体化服务...');
  await runCmd([
    `$b64 = "${serverB64}"`,
    '$js = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($b64))',
    '[System.IO.File]::WriteAllText("C:\\FYops\\api\\server.js", $js)',
    'Write-Host "server.js written"',

    // 创建 www 目录并部署前端文件
    'New-Item -ItemType Directory -Path "C:\\FYops\\www" -Force | Out-Null',
    'Write-Host "www dir created"',
  ].join('\n'), 'Deploy Server', 30);

  // 上传核心前端文件（HTML, CSS, JS, 图片等）
  for (const f of coreFiles) {
    const contentB64 = Buffer.from(f.content, 'utf-8').toString('base64');
    const dir = path.dirname(f.path);
    await runCmd([
      `New-Item -ItemType Directory -Path "C:\\FYops\\www\\${dir.replace(/\//g, '\\\\')}" -Force | Out-Null`,
      `$b64 = "${contentB64}"`,
      '$content = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($b64))',
      `[System.IO.File]::WriteAllText("C:\\FYops\\www\\${f.path.replace(/\//g, '\\\\')}", $content)`,
      `Write-Host "OK: ${f.path}"`,
    ].join('\n'), `Upload ${f.path}`, 30);
  }

  // Step 2: 停止旧服务，启动新的一体化服务
  console.log('\n=== Step 2: 启动一体化服务 ===');
  await runCmd([
    'cd C:\\FYops\\api',
    'pm2 delete fyops-api 2>$null',
    'pm2 delete https-proxy 2>$null',
    'pm2 delete fyops-server 2>$null',
    'Start-Sleep 1',
    'pm2 start server.js --name fyops-server',
    'pm2 save',
    'Start-Sleep 3',
    'pm2 status',
    '',
    'netstat -ano | findstr LISTENING | findstr ":80"',
    'netstat -ano | findstr LISTENING | findstr ":3001"',
    'netstat -ano | findstr LISTENING | findstr ":3443"',
  ].join('\n'), 'Restart Services', 30);

  // Step 3: 测试
  console.log('\n=== Step 3: 测试 ===');
  await runCmd([
    'Write-Host "--- HTTP API ---"',
    'try {',
    '  $b = ConvertTo-Json @{username="u03";email="u03@qq.com";password="pass"} -Compress',
    '  $r = iwr "http://localhost/api/auth/register" -Method POST -Body $b -ContentType "application/json" -UseBasicParsing',
    '  Write-Host "OK: $($r.StatusCode)"',
    '} catch { Write-Host "ERR: $($_.Exception.Message)" }',
    '',
    'Write-Host "--- Static Page ---"',
    'try { $r = iwr "http://localhost/" -UseBasicParsing; Write-Host "Home: $($r.StatusCode) $($r.Content.Length)chars" } catch { Write-Host "ERR" }',
  ].join('\n'), 'Final Test');
}

main().catch(e => console.error(e.message));
