import tencentcloud from 'tencentcloud-sdk-nodejs';

const SECRET_ID = process.env.TENCENT_SECRET_ID;
const SECRET_KEY = process.env.TENCENT_SECRET_KEY;

if (!SECRET_ID || !SECRET_KEY) {
  console.error('请设置环境变量 TENCENT_SECRET_ID 和 TENCENT_SECRET_KEY');
  process.exit(1);
}

const cred = {
  credential: { secretId: SECRET_ID, secretKey: SECRET_KEY }
};

const cdn = new tencentcloud.cdn.v20180606.Client(cred);
const DOMAIN = 'www.fy-squad.cn';
const API_SERVER = '43.138.188.183';
const API_PORT = 3001;

async function main() {
  // Step 1: 获取当前域名配置
  console.log('正在获取当前 CDN 配置...');
  const detailResp = await cdn.DescribeDomainsConfig({
    Filters: [{ Name: 'domain', Value: [DOMAIN] }]
  });

  const domain = detailResp.Domains[0];
  if (!domain) {
    console.error('未找到域名:', DOMAIN);
    process.exit(1);
  }

  const currentOrigin = domain.Origin;
  console.log('当前源站配置:', JSON.stringify({
    Origins: currentOrigin.Origins,
    OriginType: currentOrigin.OriginType,
    OriginPullProtocol: currentOrigin.OriginPullProtocol,
    PathBasedOrigin: (currentOrigin.PathBasedOrigin || []).map(r => ({ RuleType: r.RuleType, RulePaths: r.RulePaths, Origin: r.Origin })),
  }, null, 2));

  // Step 2: 合并 PathBasedOrigin 规则
  const apiRule = {
    RuleType: 'path',
    RulePaths: ['/api/*'],
    Origin: [`${API_SERVER}:${API_PORT}`],
  };

  const existingRules = currentOrigin.PathBasedOrigin || [];
  const hasApiRule = existingRules.some(r =>
    r.RuleType === 'path' && r.RulePaths.includes('/api/*')
  );

  let newRules;
  if (hasApiRule) {
    console.log('/api/* 规则已存在，将更新...');
    newRules = existingRules.map(r =>
      (r.RuleType === 'path' && r.RulePaths.includes('/api/*')) ? apiRule : r
    );
  } else {
    console.log('添加 /api/* 路径回源规则...');
    newRules = [...existingRules, apiRule];
  }

  // Step 3: 提交完整配置（必须包含主源站信息，否则会报"源站类型错误"）
  console.log('正在提交配置...');
  const updatePayload = {
    Domain: DOMAIN,
    Origin: {
      OriginType: currentOrigin.OriginType || 'domain',
      Origins: currentOrigin.Origins,
      OriginPullProtocol: currentOrigin.OriginPullProtocol || 'http',
      ServerName: currentOrigin.ServerName,
      PathBasedOrigin: newRules,
    }
  };

  console.log('提交的配置:', JSON.stringify(updatePayload.Origin.PathBasedOrigin, null, 2));
  const resp = await cdn.UpdateDomainConfig(updatePayload);
  console.log('CDN 配置更新成功! RequestId:', resp.RequestId);

  // Step 4: 刷新 CDN 缓存
  console.log('正在刷新 CDN 缓存...');
  try {
    await cdn.PurgeUrlsCache({
      Urls: [`https://${DOMAIN}/`]
    });
    console.log('CDN 缓存刷新已提交');
  } catch (e) {
    console.log('缓存刷新失败（可忽略）:', e.message);
  }
}

main().catch(e => {
  console.error('Error:', e.message);
  process.exit(1);
});
