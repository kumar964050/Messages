import nodemailer, { Transporter } from "nodemailer";
import { convert } from "html-to-text";

import { EMAIL_MESSAGES } from "../constants/messages";

interface SendEmailProps {
  to: string;
  subject: string;
  html: string;
}

class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST as string,
      port: parseInt(process.env.SMTP_PORT || "587", 10),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER as string,
        pass: process.env.SMTP_PASS as string,
      },
      tls: { rejectUnauthorized: false },
    });
  }

  // Sending an email
  async sendEmail({ to, subject, html }: SendEmailProps): Promise<void> {
    try {
      const text: string = convert(html);

      const info = await this.transporter.sendMail({
        from: process.env.SMTP_USER as string,
        to,
        subject,
        text,
        html,
      });
      console.log(`✅ Email sent successfully: ${info.messageId}`);
    } catch (error) {
      console.error("❌ Error sending email:", error);
      throw error;
    }
  }

  // Sending a Welcome email
  async sendWelcomeEmail(to: string, name: string): Promise<void> {
    const subject = EMAIL_MESSAGES.WELCOME_SUBJECT;
    const html = EMAIL_MESSAGES.WELCOME_BODY(name);
    await this.sendEmail({ to, subject, html });
  }

  // sending a verification link to user email id
  async sendTemporaryPassword(to: string, tempPassword: string) {
    const subject = EMAIL_MESSAGES.TEMPORARY_PASSWORD_SUBJECT;
    const html = EMAIL_MESSAGES.TEMPORARY_PASSWORD_BODY(tempPassword);
    await this.sendEmail({ to, subject, html });
  }

  // send password update mail
  async sendUpdatePasswordEmail(to: string): Promise<void> {
    await this.sendEmail({
      to,
      subject: EMAIL_MESSAGES.UPDATE_PASSWORD_SUBJECT,
      html: EMAIL_MESSAGES.UPDATE_PASSWORD_BODY(),
    });
  }

  // Update Username Confirmation
  async sendUpdateUsernameEmail(to: string, username: string): Promise<void> {
    await this.sendEmail({
      to,
      subject: EMAIL_MESSAGES.UPDATE_USERNAME_SUBJECT,
      html: EMAIL_MESSAGES.UPDATE_USERNAME_BODY(username),
    });
  }

  // Account Deletion Confirmation
  async sendAccountDeletionEmail(to: string): Promise<void> {
    await this.sendEmail({
      to,
      subject: EMAIL_MESSAGES.ACCOUNT_DELETION_SUBJECT,
      html: EMAIL_MESSAGES.ACCOUNT_DELETION_BODY(),
    });
  }
}

export default EmailService;
