import transporter from './config';
import { emailTemplates } from './templates';

export async function sendVerificationEmail(email: string, token: string, name: string) {
  const template = emailTemplates.verification(token, name);
  
  await transporter.sendMail({
    from: `"CodeEarn" <${process.env.SMTP_USER}>`,
    to: email,
    subject: template.subject,
    html: template.html,
  });
}

export async function sendPasswordResetEmail(email: string, token: string, name: string) {
  const template = emailTemplates.passwordReset(token, name);
  
  await transporter.sendMail({
    from: `"CodeEarn" <${process.env.SMTP_USER}>`,
    to: email,
    subject: template.subject,
    html: template.html,
  });
}