import tencentcloud from 'tencentcloud-sdk-nodejs';

const SECRET_ID = process.env.TENCENT_SECRET_ID;
const SECRET_KEY = process.env.TENCENT_SECRET_KEY;

const cred = {
  credential: { secretId: SECRET_ID, secretKey: SECRET_KEY }
};

const cdn = new tencentcloud.cdn.v20180606.Client(cred);

async function main() {
  const resp = await cdn.DescribeDomains({});
  console.log(JSON.stringify(resp.Domains.map(d => ({
    domain: d.Domain,
    status: d.Status,
    origins: d.Origin
  })), null, 2));
}

main().catch(e => console.error(e));