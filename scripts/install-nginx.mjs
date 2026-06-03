import tencentcloud from 'tencentcloud-sdk-nodejs';

const SECRET_ID = process.env.TENCENT_SECRET_ID;
const SECRET_KEY = process.env.TENCENT_SECRET_KEY;
const REGION = process.env.TENCENT_REGION || 'ap-guangzhou';
const INSTANCE_ID = process.env.TENCENT_INSTANCE_ID || 'lhins-abnq8kv9';

if (!SECRET_ID || !SECRET_KEY) {
  console.error('请设置环境变量 TENCENT_SECRET_ID 和 TENCENT_SECRET_KEY');
  console.error('示例: $env:TENCENT_SECRET_ID="your-id"; $env:TENCENT_SECRET_KEY="your-key"; node scripts/install-nginx.mjs');
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
let gInvId = null;

async function runCmd(script, label) {
  const cmd = Buffer.from(script).toString('base64');
  const r = await tat.RunCommand({ InstanceIds: [INSTANCE_ID], CommandType: 'POWERSHELL', Content: cmd });
  gInvId = r.InvocationId;
  process.stdout.write(`[${label}] `);
  await new Promise(res => setTimeout(res, 15000));
  
  const resp = await tat.DescribeInvocationTasks({
    Filters: [{ Name: 'invocation-id', Values: [r.InvocationId] }]
  });
  
  const tasks = resp.InvocationTaskSet || [];
  for (const t of tasks) {
    const code = t.TaskResult?.ExitCode;
    process.stdout.write(`ExitCode=${code} `);
    if (t.TaskResult?.Output) {
      const out = Buffer.from(t.TaskResult.Output, 'base64').toString('utf-8').replace(/\0/g, '');
      console.log('\n' + out.substring(0, 600));
      if (out.length > 600) console.log(`...(共${out.length}字符)`);
    }
  }
  console.log('');
  return tasks;
}

async function main() {
  // Step 1: Download Nginx
  console.log('=== Step 1: 下载 Nginx ===');
  await runCmd(`
$ErrorActionPreference = 'Continue'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
Write-Host 'Downloading...'
Invoke-WebRequest -Uri 'https://nginx.org/download/nginx-1.26.2.zip' -OutFile 'C:\\nginx.zip' -UseBasicParsing -ErrorAction Stop
Write-Host 'Extracting...'
Expand-Archive -Path 'C:\\nginx.zip' -DestinationPath 'C:\\' -Force
Remove-Item 'C:\\nginx.zip' -Force -ErrorAction SilentlyContinue
if (Test-Path 'C:\\nginx-1.26.2\\nginx.exe') { Write-Host 'OK: nginx.exe exists' } else { Write-Host 'FAIL: nginx.exe missing' }
`, '下载Nginx');

  // Step 2: Write config
  console.log('=== Step 2: 写入配置 ===');
  await runCmd(`
$conf = @'
worker_processes 1;
events { worker_connections 1024; }
http {
    include mime.types;
    default_type application/octet-stream;
    sendfile on;
    keepalive_timeout 65;
    gzip on;
    
    server {
        listen 80;
        server_name fy-squad.cn www.fy-squad.cn;
        return 301 http://www.fy-squad.cn\\$request_uri;
    }
}
'@
Set-Content -Path 'C:\\nginx-1.26.2\\conf\\nginx.conf' -Value $conf -Encoding UTF8 -Force
Write-Host 'Config written'
Get-Content 'C:\\nginx-1.26.2\\conf\\nginx.conf' | Select-Object -First 5
`, '配置');

  // Step 3: Start Nginx
  console.log('=== Step 3: 启动 Nginx ===');
  await runCmd(`
$dir = 'C:\\nginx-1.26.2'
cd $dir
# Test config
& .\\nginx.exe -t 2>&1 | Write-Host
# Kill existing
Get-Process -Name nginx -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep 1
# Start
Start-Process -FilePath '.\\nginx.exe' -WorkingDirectory $dir -WindowStyle Hidden
Start-Sleep 3
$p = Get-Process -Name nginx -ErrorAction SilentlyContinue
if ($p) { Write-Host "STARTED! PIDs: $($p.Id -join ',')" } else { Write-Host 'FAILED to start' }
`, '启动');

  // Step 4: Verify locally
  console.log('=== Step 4: 本地验证 ===');
  await runCmd(`
try {
  $r = Invoke-WebRequest -Uri 'http://localhost/' -UseBasicParsing -MaximumRedirection 0 -ErrorAction Stop
  Write-Host "HTTP $($r.StatusCode)"
} catch {
  $code = ($_.Exception.Response.StatusCode.value__)
  $loc = ''
  try { $loc = $_.Exception.Response.Headers['Location'] } catch {}
  Write-Host "HTTP $code -> $loc"
}
Get-NetTCPConnection -LocalPort 80 -State Listen -ErrorAction SilentlyContinue | Select-Object LocalAddress, LocalPort | Format-Table
`, '本地验证');

  console.log('\n=== 完成！===');
  console.log('请用浏览器访问: http://fy-squad.cn/');
}

main().catch(e => console.error(e));
