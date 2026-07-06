import nodemailer from 'nodemailer';

export class NotificationService {
  private static transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: process.env.SMTP_USER || 'mock_user@ethereal.email',
      pass: process.env.SMTP_PASS || 'mock_password'
    }
  });

  static async sendEmail(to: string, subject: string, body: string) {
    try {
      const info = await this.transporter.sendMail({
        from: '"VoteKinetic Admin" <admin@votekinetic.com>',
        to,
        subject,
        text: body,
      });
      console.log(`[NOTIFICATION] Email sent to ${to}: ${info.messageId}`);
    } catch (error) {
      console.error('[NOTIFICATION ERROR] Failed to send email:', error);
    }
  }

  static async sendPushNotification(pushToken: string, title: string, body: string) {
    // This is a stub for expo-server-sdk integration.
    // In production, we use the Expo Push API.
    console.log(`[PUSH NOTIFICATION] Sent to token ${pushToken} - Title: ${title}`);
  }
}
