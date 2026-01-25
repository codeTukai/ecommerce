import { sendEmail } from "./emailService.js";

const sendEmailFun = async (email, otp, name = "User") => {
  const subject = "Verify your email - EasyCart OTP";

  const html = `
    <div style="font-family: Arial; padding: 20px;">
      <h2>Email Verification</h2>
      <p>Hello ${name},</p>
      <p>Your OTP is:</p>
      <div style="font-size: 28px; font-weight: bold; margin: 10px 0; color: #007bff;">${otp}</div>
      <p>This OTP is valid for 10 minutes.</p>
    </div>
  `;

  const text = `Your OTP for EasyCart is: ${otp}`;

  return await sendEmail(email, subject, text, html);
};

export default sendEmailFun;
