import tencentcloud from 'tencentcloud-sdk-nodejs';

const SECRET_ID = process.env.TENCENT_SECRET_ID;
const SECRET_KEY = process.env.TENCENT_SECRET_KEY;

if (!SECRET_ID || !SECRET_KEY) {
  console.error('请设置环境变量 TENCENT_SECRET_ID 和 TENCENT_SECRET_KEY');
  process.exit(1);
}

const cred = {
  credential: { secretId: SECRET_ID, secretKey: SECRET_KEY },
  region: 'ap-guangzhou',
};

const lighthouse = new tencentcloud.lighthouse.v20200324.Client(cred);

async function main() {
  // 查看防火墙规则
  const resp = await lighthouse.DescribeFirewallRules({
    InstanceId: 'lhins-abnq8kv9',
  });

  console.log('当前防火墙规则:');
  for (const rule of (resp.FirewallRuleSet || [])) {
    console.log(`  ${rule.Protocol} ${rule.Port} ${rule.Action} ${rule.FirewallRuleDescription || ''}`);
  }

  // 添加 3001 端口规则（如果不存在）
  const has3001 = (resp.FirewallRuleSet || []).some(r => r.Port === '3001' && r.Protocol === 'TCP');
  if (!has3001) {
    console.log('\n3001 端口规则不存在，正在添加...');
    await lighthouse.CreateFirewallRules({
      InstanceId: 'lhins-abnq8kv9',
      FirewallRules: [{
        Protocol: 'TCP',
        Port: '3001',
        Action: 'ACCEPT',
        FirewallRuleDescription: 'FYops API',
      }]
    });
    console.log('3001 端口防火墙规则已添加');
  } else {
    console.log('\n3001 端口规则已存在');
  }
}

main().catch(e => console.error('Error:', e.message));
