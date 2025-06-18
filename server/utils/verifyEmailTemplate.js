export default function verificationEmail(name, code) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #f9f9f9; border-radius: 8px;">
      <h2 style="color: #333;">Hello ${name},</h2>
      <p style="font-size: 16px; color: #555;">
        Thank you for registering with <strong>Ecommerce App</strong>.
      </p>
      <p style="font-size: 18px; color: #000;">
        Your One-Time Password (OTP) is:
      </p>
      <p style="font-size: 24px; font-weight: bold; background: #fff3cd; padding: 10px 15px; border-radius: 5px; display: inline-block; color: #856404;">
        ${code}
      </p>
      <p style="font-size: 14px; color: #999; margin-top: 20px;">
        This code will expire in 10 minutes. If you didn't request this, please ignore this email.
      </p>
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
      <p style="font-size: 12px; color: #aaa;">
        © ${new Date().getFullYear()} Ecommerce App. All rights reserved.
      </p>
    </div>
  `;
}

