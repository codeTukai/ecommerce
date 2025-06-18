import { sendEmail } from "./sendEmail.js";
import { generateOtpEmailTemplate } from "./generateOtpEmailTemplate.js";

export const sendOtpEmail = async (userEmail) => {
  const otp = Math.floor(100000 + Math.random() * 900000); // ✅ 6-digit OTP

  const htmlContent = generateOtpEmailTemplate(otp);

  console.log("🔐 OTP being sent:", otp);

  const result = await sendEmail(
    userEmail,
    "Verify Your Email - EasyCart",
    `Your OTP is: ${otp}`,   // Plain text fallback
    htmlContent              // ✅ Actual HTML with OTP
  );

  return result;
};

