import nodemailer from "nodemailer";

// Create a transporter for SMTP

const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS } = process.env;

if (!MAIL_HOST || !MAIL_PORT || !MAIL_USER || !MAIL_PASS) {
  throw new Error("Mail env variables missing");
}
const transporter = nodemailer.createTransport({
  host: MAIL_HOST!,
  port: +MAIL_PORT!,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});
export async function mailOnLogin({ clientMail }: { clientMail: string }) {
  try {
    const info = await transporter.sendMail({
      from: '"WhatsApp Clone" <noreply@whatsappclone.com>',
      to: clientMail,
      subject: "New Login Detected - WhatsApp Clone",
      text: "A new login was detected on your WhatsApp Clone account. If this wasn't you, please secure your account.",
      html: `
      <h2>New Login Detected</h2>
      <p>Hello,</p>
      <p>A new login was detected on your WhatsApp Clone account.</p>
      <p>If this wasn't you, please change your password immediately.</p>
      <p>Best regards,<br>WhatsApp Clone Team</p>
      `,
    });
    console.log("mail-send", info.messageId);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send mail on login");
  }
}
