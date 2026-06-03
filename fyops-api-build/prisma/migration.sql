ALTER TABLE users ADD COLUMN email_verified BOOLEAN DEFAULT 0;
ALTER TABLE users ADD COLUMN email_verification_code TEXT;
ALTER TABLE users ADD COLUMN email_verification_expires_at DATETIME;
