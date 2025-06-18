import nodemailer from "nodemailer";

// Gmail-based transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL, // Corrected from EMAIL_USER
      pass: process.env.EMAIL_PASS, // Corrected from EMAIL_APP_PASSWORD
    },
    debug: true,
    logger: true,
  });
};

// Custom SMTP transporter
const createCustomTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

export const sendEmail = async (to, subject, text = "", html = "") => {
  try {
    console.log("Attempting to send email to:", to);

    // You can switch between createTransporter() and createCustomTransporter()
    const transporter = createTransporter();

    await transporter.verify();
    console.log("✅ SMTP connection verified");

    const mailOptions = {
      from: {
        name: "EasyCart Support",
        address: process.env.EMAIL,
      },
      to,
      subject,
      text,
      html,
    };

    console.log("📧 Sending email with:", {
      to,
      subject,
      preview: html.substring(0, 100) + "...",
    });

    const result = await transporter.sendMail(mailOptions);

    console.log("✅ Email sent:", result.messageId);

    return {
      success: true,
      messageId: result.messageId,
      accepted: result.accepted,
    };
  } catch (error) {
    console.error("❌ Email failed:", {
      message: error.message,
      code: error.code,
    });

    return {
      success: false,
      error: error.message,
    };
  }
};
