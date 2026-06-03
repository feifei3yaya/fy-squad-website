import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.qq.com',
      port: 465,
      secure: true,
      auth: {
        user: 'fy.squad@qq.com',
        pass: 'twliievixbqaddfb',
      },
    });
  }

  async sendVerificationEmail(to: string, code: string): Promise<void> {
    const html = `
      <div style="max-width:600px;margin:0 auto;padding:40px 20px;font-family:'Microsoft YaHei',sans-serif;background:#0a0b0d;color:#c8cdd0;">
        <div style="text-align:center;margin-bottom:30px;">
          <h1 style="color:#d4a84b;font-size:24px;letter-spacing:0.3em;margin:0;">FY SQUAD</h1>
          <p style="color:#6b7280;font-size:12px;letter-spacing:0.2em;margin:8px 0 0;">肥鸭战队 · 邮箱验证</p>
        </div>
        <div style="background:#111318;border:1px solid #1e293b;border-radius:8px;padding:32px 24px;text-align:center;">
          <p style="font-size:15px;color:#94a3b8;margin:0 0 8px;">您的验证码为</p>
          <div style="font-size:36px;font-weight:700;color:#d4a84b;letter-spacing:0.3em;margin:16px 0;font-family:monospace;">${code}</div>
          <p style="font-size:13px;color:#64748b;margin:0;">验证码10分钟内有效，请勿泄露给他人</p>
        </div>
        <div style="margin-top:24px;padding-top:16px;border-top:1px solid #1e293b;text-align:center;">
          <p style="font-size:11px;color:#475569;margin:0;">此邮件由系统自动发送，请勿回复</p>
          <p style="font-size:11px;color:#475569;margin:4px 0 0;">肥鸭战队 FY Squad · fy.squad@qq.com</p>
        </div>
      </div>
    `;

    await this.transporter.sendMail({
      from: '"肥鸭战队 FY Squad" <fy.squad@qq.com>',
      to,
      subject: '【肥鸭战队】邮箱验证码',
      html,
    });
  }
}
