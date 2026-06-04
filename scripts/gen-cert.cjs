const forge = require('node-forge');
const fs = require('fs');

const pki = forge.pki;

// 生成 RSA 密钥对
console.log('生成 RSA 密钥对...');
const keys = pki.rsa.generateKeyPair(2048);

// 创建证书
console.log('创建自签名证书...');
const cert = pki.createCertificate();
cert.publicKey = keys.publicKey;
cert.serialNumber = '01';

// 有效期 10 年
cert.validity.notBefore = new Date();
cert.validity.notAfter = new Date();
cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 10);

// 设置 subject 和 issuer（自签名所以相同）
const attrs = [
  { name: 'commonName', value: 'api.fy-squad.cn' },
  { name: 'organizationName', value: 'FY Squad' },
  { name: 'countryName', value: 'CN' },
];
cert.setSubject(attrs);
cert.setIssuer(attrs);

// 设置 SAN (Subject Alternative Name)
cert.setExtensions([
  {
    name: 'subjectAltName',
    altNames: [{ type: 2, value: 'api.fy-squad.cn' }], // type 2 = DNS
  },
  {
    name: 'basicConstraints',
    cA: false,
  },
]);

// 用私钥签名
cert.sign(keys.privateKey, forge.md.sha256.create());

// 导出 PEM
const certPem = pki.certificateToPem(cert);
const keyPem = pki.privateKeyToPem(keys.privateKey);

// 写入文件
fs.writeFileSync(__dirname + '/api-cert.pem', certPem);
fs.writeFileSync(__dirname + '/api-key.pem', keyPem);

console.log('证书生成成功！');
console.log('证书文件: scripts/api-cert.pem');
console.log('私钥文件: scripts/api-key.pem');
console.log('证书长度:', certPem.length);
console.log('私钥长度:', keyPem.length);

// 输出 Base64（用于传输）
console.log('\n=== CERT BASE64 ===');
console.log(Buffer.from(certPem).toString('base64'));
console.log('\n=== KEY BASE64 ===');
console.log(Buffer.from(keyPem).toString('base64'));
