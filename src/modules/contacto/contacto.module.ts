import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigService } from '@nestjs/config';
import { ContactoController } from './interface/controllers/contacto.controller';
import { SendContactoHandler } from './application/commands/send-contacto/send-contacto.handler';
import { EmailPort } from './domain/ports/email.port';
import { NodemailerEmailService } from './infrastructure/services/nodemailer-email.service';
import { ResendEmailService } from './infrastructure/services/resend-email.service';

@Module({
  imports: [CqrsModule],
  controllers: [ContactoController],
  providers: [
    SendContactoHandler,
    {
      provide: EmailPort,
      useFactory: (config: ConfigService): EmailPort => {
        if (config.get('SMTP_HOST')) {
          return new NodemailerEmailService(config);
        }
        return new ResendEmailService(config);
      },
      inject: [ConfigService],
    },
  ],
})
export class ContactoModule {}
