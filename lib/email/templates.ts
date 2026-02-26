const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

const commonStyles = `
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 20px;
  color: #1a1a1a;
  background-color: #ffffff;
  border: 1px solid #f0f0f0;
  border-radius: 12px;
`;

const buttonStyles = `
  display: inline-block;
  background-color: #2563eb;
  color: #ffffff !important;
  padding: 14px 28px;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  margin: 25px 0;
`;

const footerStyles = `
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
  font-size: 13px;
  color: #666666;
  line-height: 1.5;
`;

export const emailTemplates = {
  verification: (token: string, name: string) => {
    const verifyUrl = `${APP_URL}/api/auth/verify-email?token=${token}`;
    return {
      subject: ' Verify your CodEarn Account',
      html: `
        <div style="${commonStyles}">
          <h1 style="color: #0f172a; font-size: 24px; margin-bottom: 20px;">Welcome to CodEarn Tech, ${name}!</h1>
          <p style="font-size: 16px; line-height: 1.6;">We're excited to have you on board. To get started and access your courses, please verify your email address below:</p>
          
          <center>
            <a href="${verifyUrl}" style="${buttonStyles}">Verify My Email Address</a>
          </center>
          
          <p style="font-size: 14px; color: #64748b;">If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="font-size: 13px; color: #2563eb; word-break: break-all;">${verifyUrl}</p>
          
          <div style="${footerStyles}">
            <p><strong>Security Note:</strong> This verification link will expire in <strong>24 hours</strong>. If you did not create a CodEarn account, please ignore this email.</p>
            <p>© ${new Date().getFullYear()} CodEarn Tech Pakistan. <br> Samundri, Faisalabad, Pakistan</p>
          </div>
        </div>
      `,
    };
  },

  passwordReset: (token: string, name: string) => {
    const resetUrl = `${APP_URL}/reset-password?token=${token}`;
    return {
      subject: ' Reset your CodEarn Password',
      html: `
        <div style="${commonStyles}">
          <h1 style="color: #0f172a; font-size: 24px; margin-bottom: 20px;">Password Reset Request</h1>
          <p style="font-size: 16px; line-height: 1.6;">Hello ${name}, we received a request to reset the password for your CodEarn account. Click the button below to set a new password:</p>
          
          <center>
            <a href="${resetUrl}" style="${buttonStyles}">Set New Password</a>
          </center>

          <p style="font-size: 14px; color: #64748b;">This link is valid for <strong>60 minutes</strong> only. If you didn't request a password reset, your account is safe and you can safely delete this email.</p>
          
          <div style="${footerStyles}">
            <p>For security, never share this link with anyone. Our support team will never ask for your password or reset link.</p>
            <p>© ${new Date().getFullYear()} CodEarn Tech Pakistan. <br> Building Future-Ready Developers.</p>
          </div>
        </div>
      `,
    };
  },
};
