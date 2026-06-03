import tencentcloud from 'tencentcloud-sdk-nodejs';

const SECRET_ID = process.env.TENCENT_SECRET_ID;
const SECRET_KEY = process.env.TENCENT_SECRET_KEY;
const REGION = process.env.TENCENT_REGION || 'ap-guangzhou';
const INSTANCE_ID = process.env.TENCENT_INSTANCE_ID || 'lhins-abnq8kv9';

if (!SECRET_ID || !SECRET_KEY) {
  console.error('请设置环境变量 TENCENT_SECRET_ID 和 TENCENT_SECRET_KEY');
  console.error('示例: $env:TENCENT_SECRET_ID="your-id"; $env:TENCENT_SECRET_KEY="your-key"; node scripts/probe-server.mjs');
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

async function runCmd(script, label, waitSec = 12) {
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

  const tasks = resp.InvocationTaskSet || [];
  for (const t of tasks) {
    const code = t.TaskResult?.ExitCode;
    process.stdout.write(`ExitCode=${code}`);
    if (t.TaskResult?.Output) {
      const out = Buffer.from(t.TaskResult.Output, 'base64').toString('utf-8').replace(/\0/g, '');
      console.log('\n' + out.substring(0, 1000));
    }
  }
  return tasks;
}

async function main() {
  await runCmd(
    'Write-Host "Drives:"; Get-PSDrive -PSProvider FileSystem | Format-Table Name,Used,Free -AutoSize; Write-Host ""; Write-Host "C:\\ top level:"; Get-ChildItem C:\\ -Directory -ErrorAction SilentlyContinue | Select-Object Name | Format-Table -HideTableHeaders; Write-Host ""; Write-Host "Listening ports:"; netstat -ano | findstr LISTENING | findstr ":3001"; Write-Host ""; Write-Host "Node processes:"; Get-Process node -ErrorAction SilentlyContinue | Format-Table Id,ProcessName,WorkingSet -AutoSize',
    '环境探查'
  );
}

main().catch(e => console.error(e));
