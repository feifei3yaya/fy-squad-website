const fs = require('fs');
const schemaPath = process.argv[2];
let content = fs.readFileSync(schemaPath, 'utf-8');

const oldLine = '  subscriptionExpiresAt      DateTime? @map("subscription_expires_at")';
const newLines = '  subscriptionExpiresAt      DateTime? @map("subscription_expires_at")\n  emailVerified              Boolean   @default(false) @map("email_verified")\n  emailVerificationCode      String?   @map("email_verification_code")\n  emailVerificationExpiresAt DateTime? @map("email_verification_expires_at")';

if (content.includes('emailVerified')) {
  console.log('Schema already has email verification fields');
} else {
  content = content.replace(oldLine, newLines);
  fs.writeFileSync(schemaPath, content);
  console.log('Schema updated: added emailVerified, emailVerificationCode, emailVerificationExpiresAt');
}
