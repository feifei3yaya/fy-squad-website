import COS from 'cos-nodejs-sdk-v5';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

const secretId = process.env.TENCENT_SECRET_ID || '';
const secretKey = process.env.TENCENT_SECRET_KEY || '';

if (!secretId || !secretKey) {
  console.error('请设置环境变量 TENCENT_SECRET_ID 和 TENCENT_SECRET_KEY');
  process.exit(1);
}

const cos = new COS({ SecretId: secretId, SecretKey: secretKey });

function getAllFiles(dir, basePath = dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(basePath, fullPath).replace(/\\/g, '/');
    if (entry.isDirectory()) {
      files = files.concat(getAllFiles(fullPath, basePath));
    } else {
      files.push({ localPath: fullPath, key: relativePath });
    }
  }
  return files;
}

const command = process.argv[2];
const bucketName = process.argv[3];
const region = process.argv[4] || 'ap-guangzhou';

if (command === 'deploy') {
  if (!bucketName) {
    console.log('用法: node scripts/deploy-cos.mjs deploy <BucketName> [Region]');
    process.exit(1);
  }
  const files = getAllFiles(distDir);
  console.log(`准备上传 ${files.length} 个文件到 ${bucketName} (${region})...`);
  let uploaded = 0, failed = 0;
  function uploadFile(file) {
    const content = fs.readFileSync(file.localPath);
    let contentType = 'application/octet-stream';
    const ext = path.extname(file.key).toLowerCase();
    const mimeMap = { '.html':'text/html; charset=utf-8','.css':'text/css','.js':'application/javascript','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.webp':'image/webp','.mp4':'video/mp4','.woff2':'font/woff2' };
    if (mimeMap[ext]) contentType = mimeMap[ext];
    cos.putObject({ Bucket: bucketName, Region: region, Key: file.key, Body: content, ContentType: contentType, CacheControl: 'max-age=86400' }, (err, data) => {
      if (err) { console.error(`  ✗ ${file.key}: ${err.message}`); failed++; } else { console.log(`  ✓ ${file.key}`); uploaded++; }
      if (uploaded + failed === files.length) { console.log(`\n完成: ${uploaded} 成功, ${failed} 失败`); if (failed > 0) process.exit(1); }
    });
  }
  for (const file of files) uploadFile(file);
} else if (command === 'list-buckets') {
  cos.getService({}, (err, data) => { if (err) { console.error('查询存储桶失败:', err); process.exit(1); } console.log(JSON.stringify(data.Buckets, null, 2)); });
} else {
  console.log('可用命令:');
  console.log('  list-buckets — 列出所有存储桶');
  console.log('  deploy <bucket> — 上传 dist 到指定存储桶');
  console.log('  setup-website <bucket> — 启用静态网站托管');
  console.log('  set-public <bucket> — 设置公共读权限');
}
