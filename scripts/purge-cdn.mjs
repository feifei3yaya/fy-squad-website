import tencentcloud from 'tencentcloud-sdk-nodejs';

const SECRET_ID = process.env.TENCENT_SECRET_ID;
const SECRET_KEY = process.env.TENCENT_SECRET_KEY;

if (!SECRET_ID || !SECRET_KEY) {
  console.error('请设置 TENCENT_SECRET_ID 和 TENCENT_SECRET_KEY');
  process.exit(1);
}

const cred = {
  credential: { secretId: SECRET_ID, secretKey: SECRET_KEY }
};

const cdn = new tencentcloud.cdn.v20180606.Client(cred);
const DOMAIN = 'www.fy-squad.cn';

async function main() {
  console.log('正在提交 CDN 刷新请求...');
  
  // 刷新全站 URL 缓存（这里刷新根目录和首页）
  try {
    const res = await cdn.PurgePathCache({
      Paths: [
        `https://${DOMAIN}/`,
        `https://${DOMAIN}/assets/`,
        `https://${DOMAIN}/images/`
      ],
      FlushType: "flush"
    });
    console.log('CDN 目录缓存刷新成功! RequestId:', res.RequestId);
  } catch (e) {
    console.log('CDN 目录缓存刷新失败:', e.message);
  }
}

main().catch(e => {
  console.error('Error:', e.message);
  process.exit(1);
});
