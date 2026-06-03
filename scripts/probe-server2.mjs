import tencentcloud from 'tencentcloud-sdk-nodejs';

const SECRET_ID = process.env.TENCENT_SECRET_ID;
const SECRET_KEY = process.env.TENCENT_SECRET_KEY;
const REGION = process.env.TENCENT_REGION || 'ap-guangzhou';
const INSTANCE_ID = process.env.TENCENT_INSTANCE_ID || 'lhins-abnq8kv9';

if (!SECRET_ID || !SECRET_KEY) {
  console.error('请设置环境变量 TENCENT_SECRET_ID 和 TENCENT_SECRET_KEY');
  console.error('示例: $env:TENCENT_SECRET_ID="your-id"; $env:TENCENT_SECRET_KEY="your-key"; node scripts/probe-server2.mjs');
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

async function runCmd(script, label, waitSec = 15) {
  const cmd = Buffer.from(script).toString('base64');
  const r = await tat.RunCommand({
    InstanceIds: ['lhins-abnq8kv9'],
    CommandType: 'POWERSHELL',
    Content: cmd,
    Timeout: 120,
  });
  process.stdout.write(`\n[${label}] `);
  await new Promise(res => setTimeout(res, waitSec * 1000));
  const resp = await tat.DescribeInvocationTasks({
    Filters: [{ Name: 'invocation-id', Values: [r.InvocationId] }]
  });
  for (const t of (resp.InvocationTaskSet || [])) {
    const out = t.TaskResult?.Output ? Buffer.from(t.TaskResult.Output, 'base64').toString('utf-8').replace(/\0/g, '') : '';
    console.log('ExitCode=' + (t.TaskResult?.ExitCode || '?'));
    console.log(out.substring(0, 1200));
  }
}

async function main() {
  await runCmd(
    `Write-Host "Node 4828:"; Get-WmiObject Win32_Process -Filter "ProcessId=4828" | Select-Object CommandLine | Format-List; Write-Host "Node 9384:"; Get-WmiObject Win32_Process -Filter "ProcessId=9384" | Select-Object CommandLine | Format-List; Write-Host ""; Write-Host "C:\\项目资源文件夹:"; Get-ChildItem "C:\\项目资源文件夹" -Recurse -Depth 1 -ErrorAction SilentlyContinue | Select-Object FullName | Format-Table -AutoSize; Write-Host ""; Write-Host "C:\\FYops:"; Get-ChildItem "C:\\FYops*" -Directory -ErrorAction SilentlyContinue | Format-Table Name; Write-Host ""; Write-Host "C:\\xmwj:"; Get-ChildItem "C:\\xmwj" -ErrorAction SilentlyContinue | Select-Object Name`,
    '详细探查'
  );
}

main().catch(e => console.error(e));
