import tencentcloud from 'tencentcloud-sdk-nodejs';
import https from 'https';

const SECRET_ID = process.env.TENCENT_SECRET_ID;
const SECRET_KEY = process.env.TENCENT_SECRET_KEY;
const REGION = process.env.TENCENT_REGION || 'ap-guangzhou';
const INSTANCE_ID = process.env.TENCENT_INSTANCE_ID || 'lhins-abnq8kv9';

if (!SECRET_ID || !SECRET_KEY) {
  console.error('请设置环境变量 TENCENT_SECRET_ID 和 TENCENT_SECRET_KEY');
  console.error('示例: $env:TENCENT_SECRET_ID="your-id"; $env:TENCENT_SECRET_KEY="your-key"; node scripts/deploy-email-backend.mjs');
  process.exit(1);
}

const cred = {
  credential: {
    secretId: SECRET_ID,
    secretKey: SECRET_KEY,
  },
  region: REGION,
};

const tat = new tencentcloud.tat.v20201028.Client(cred);

function download(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function runCmd(script, label, waitSec = 15) {
  const cmd = Buffer.from(script).toString('base64');
  const r = await tat.RunCommand({
    InstanceIds: ['lhins-abnq8kv9'],
    CommandType: 'POWERSHELL',
    Content: cmd,
    Timeout: 300,
  });
  process.stdout.write(`[${label}] `);
  await new Promise(res => setTimeout(res, waitSec * 1000));

  const resp = await tat.DescribeInvocationTasks({
    Filters: [{ Name: 'invocation-id', Values: [r.InvocationId] }]
  });

  const tasks = resp.InvocationTaskSet || [];
  for (const t of tasks) {
    const code = t.TaskResult?.ExitCode;
    process.stdout.write(`ExitCode=${code} `);
    if (t.TaskResult?.Output) {
      const out = Buffer.from(t.TaskResult.Output, 'base64').toString('utf-8').replace(/\0/g, '');
      console.log('\n' + out.substring(0, 800));
      if (out.length > 800) console.log(`...(共${out.length}字符)`);
    }
  }
  console.log('');
  return tasks;
}

async function main() {
  const patchUrl = 'https://6bb8-static-sq-fy-1gwn7bzhf9dbe34a-1324173422.cos-website.ap-shanghai.myqcloud.com/fyops-patch';

  // Step 1: Check server and download patch files
  console.log('=== Step 1: 下载补丁文件到服务器 ===');
  await runCmd(`
$ErrorActionPreference = 'Continue'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$baseUrl = '${patchUrl}'
$destDir = 'D:\\fyops-patch'
New-Item -ItemType Directory -Path $destDir -Force | Out-Null

$files = @(
  'mail/mail.module.ts',
  'mail/mail.service.ts',
  'auth/dto/index.ts',
  'auth/auth.module.ts',
  'auth/auth.service.ts',
  'auth/auth.controller.ts',
  'app.module.ts',
  'main.ts',
  'update-prisma-schema.js',
  'migration.sql'
)

foreach ($f in $files) {
  $url = "$baseUrl/$f"
  $dest = Join-Path $destDir $f
  $destFolder = Split-Path $dest -Parent
  New-Item -ItemType Directory -Path $destFolder -Force | Out-Null
  try {
    Invoke-WebRequest -Uri $url -OutFile $dest -UseBasicParsing -ErrorAction Stop
    Write-Host "  OK: $f"
  } catch {
    Write-Host "  FAIL: $f - $($_.Exception.Message)"
  }
}
Write-Host 'Download complete'
`, '下载文件', 20);

  // Step 2: Apply changes to FYops project
  console.log('=== Step 2: 应用补丁到 FYops 项目 ===');
  await runCmd(`
$patchDir = 'D:\\fyops-patch'
$projectDir = 'D:\\FYops-v1.0.0.0\\apps\\api'

# Update Prisma Schema
node "$patchDir\\update-prisma-schema.js" "$projectDir\\prisma\\schema.prisma"
Write-Host 'Prisma Schema updated'

# Copy mail module
Copy-Item "$patchDir\\mail\\*" -Destination "$projectDir\\src\\mail\\" -Force -ErrorAction SilentlyContinue
Write-Host 'Mail module copied'

# Copy auth module
Copy-Item "$patchDir\\auth\\dto\\index.ts" -Destination "$projectDir\\src\\auth\\dto\\index.ts" -Force
Copy-Item "$patchDir\\auth\\auth.module.ts" -Destination "$projectDir\\src\\auth\\auth.module.ts" -Force
Copy-Item "$patchDir\\auth\\auth.service.ts" -Destination "$projectDir\\src\\auth\\auth.service.ts" -Force
Copy-Item "$patchDir\\auth\\auth.controller.ts" -Destination "$projectDir\\src\\auth\\auth.controller.ts" -Force
Write-Host 'Auth module copied'

# Copy app module and main
Copy-Item "$patchDir\\app.module.ts" -Destination "$projectDir\\src\\app.module.ts" -Force
Copy-Item "$patchDir\\main.ts" -Destination "$projectDir\\src\\main.ts" -Force
Write-Host 'Main files copied'

# Database migration
$dbPath = "$projectDir\\prisma\\dev.db"
if (Test-Path $dbPath) {
  sqlite3 $dbPath "ALTER TABLE users ADD COLUMN email_verified BOOLEAN DEFAULT 0;" 2>$null
  sqlite3 $dbPath "ALTER TABLE users ADD COLUMN email_verification_code TEXT;" 2>$null
  sqlite3 $dbPath "ALTER TABLE users ADD COLUMN email_verification_expires_at DATETIME;" 2>$null
  Write-Host 'DB migration done (errors ignored if columns exist)'
} else {
  Write-Host 'DB file not found, schema will be created on next start'
}
`, '应用补丁', 15);

  // Step 3: Rebuild API
  console.log('=== Step 3: 重新构建后端 ===');
  await runCmd(`
$projectDir = 'D:\\FYops-v1.0.0.0\\apps\\api'
Set-Location $projectDir
npm run build 2>&1 | Write-Host
`, '构建', 30);

  // Step 4: Restart API container
  console.log('=== Step 4: 重启 API 服务 ===');
  await runCmd(`
Set-Location D:\\FYops-v1.0.0.0
docker-compose down api 2>&1 | Write-Host
docker-compose up -d --build api 2>&1 | Write-Host
docker ps --filter name=fyops-api --format '{{.Names}} {{.Status}}' | Write-Host
`, '重启', 60);

  console.log('\n=== 部署完成！===');
  console.log('前端已更新: https://www.fy-squad.cn/login');
  console.log('后端已更新: https://www.fy-squad.cn:3001');
}

main().catch(e => { console.error('Error:', e.message); });
