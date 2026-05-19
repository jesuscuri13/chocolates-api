import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { EmailPort } from '../../domain/ports/email.port';
import { ContactoMessageEntity } from '../../domain/entities/contacto-message.entity';

@Injectable()
export class ResendEmailService implements EmailPort {
  private readonly resend: Resend;
  private readonly from: string;
  private readonly to: string;
  private readonly logger = new Logger(ResendEmailService.name);

  constructor(config: ConfigService) {
    this.resend = new Resend(config.getOrThrow('RESEND_API_KEY'));
    this.from = config.get<string>('EMAIL_FROM', 'admin@chocolatestambopata.com');
    this.to = config.get<string>('EMAIL_TO', 'pedidos@chocolatestambopata.com');
  }

  async sendContacto(message: ContactoMessageEntity): Promise<void> {
    const { error } = await this.resend.emails.send({
      from: this.from,
      to: this.to,
      replyTo: message.email,
      subject: message.subject,
      html: message.bodyHtml,
      text: message.bodyText,
    });

    if (error) {
      this.logger.error('Resend error', error);
      throw new Error(error.message);
    }
  }
}
