import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { EmailPort } from '../../domain/ports/email.port';
import { ContactoMessageEntity } from '../../domain/entities/contacto-message.entity';

@Injectable()
export class NodemailerEmailService implements EmailPort {
  private readonly transporter: nodemailer.Transporter;
  private readonly from: string;
  private readonly to: string;
  private readonly logger = new Logger(NodemailerEmailService.name);

  constructor(config: ConfigService) {
    const user = config.getOrThrow<string>('SMTP_USER');
    const pass = config.getOrThrow<string>('SMTP_PASS');
    const host = config.getOrThrow<string>('SMTP_HOST');
    const port = parseInt(config.get<string>('SMTP_PORT', '587'), 10);
    const secure = config.get<string>('SMTP_SECURE', 'false') === 'true';

    this.transporter = nodemailer.createTransport({ host, port, secure, auth: { user, pass } });
    this.from = config.get<string>('EMAIL_FROM', user);
    this.to = config.get<string>('EMAIL_TO', 'pedidos@chocolatestambopata.com');
  }

  async sendContacto(message: ContactoMessageEntity): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: this.from,
        to: this.to,
        replyTo: message.email,
        subject: message.subject,
        html: message.bodyHtml,
        text: message.bodyText,
      });
    } catch (err) {
      this.logger.error('SMTP send error', err);
      throw err;
    }
  }
}
