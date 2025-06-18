import { sendEmail } from "./emailService.js"

const sendEmailFun = async (email, otp) => {
  try {
    console.log(`Preparing to send OTP ${otp} to ${email}`)

    // Validate inputs
    if (!email || !otp) {
      throw new Error("Email and OTP are required")
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format")
    }

    const subject = "Verify your email - OTP Code"

    // Enhanced HTML template
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #007bff; color: white; padding: 20px; text-align: center; }
          .content { padding: 30px; background: #f9f9f9; }
          .otp-code { 
            font-size: 32px; 
            font-weight: bold; 
            color: #007bff; 
            text-align: center; 
            padding: 20px; 
            background: white; 
            border: 2px dashed #007bff; 
            margin: 20px 0; 
            letter-spacing: 5px;
          }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Email Verification</h1>
          </div>
          <div class="content">
            <h2>Hello!</h2>
            <p>Thank you for signing up. Please use the following One-Time Password (OTP) to verify your email address:</p>
            <div class="otp-code">${otp}</div>
            <p><strong>Important:</strong></p>
            <ul>
              <li>This OTP is valid for 10 minutes only</li>
              <li>Do not share this code with anyone</li>
              <li>If you didn't request this, please ignore this email</li>
            </ul>
          </div>
          <div class="footer">
            <p>This is an automated message, please do not reply.</p>
          </div>
        </div>
      </body>
      </html>
    `

    // Plain text version for email clients that don't support HTML
    const text = `
      Hello!
      
      Your OTP for email verification is: ${otp}
      
      This code is valid for 10 minutes only.
      Do not share this code with anyone.
      
      If you didn't request this, please ignore this email.
    `

    const result = await sendEmail(email, subject, text, html)

    if (result.success) {
      console.log("OTP email sent successfully to:", email)
      console.log("Generated OTP:", otp);
      console.log("HTML Preview:", htmlContent.substring(0, 300));

      return {
        success: true,
        message: "OTP sent successfully",
        messageId: result.messageId,
      }
    } else {
      console.error("Failed to send OTP email:", result.error)
      return {
        success: false,
        error: result.error || "Failed to send email",
      }
    }
  } catch (error) {
    console.error("Error in sendEmailFun:", error.message)
    return {
      success: false,
      error: error.message,
    }
  }
}

export default sendEmailFun




