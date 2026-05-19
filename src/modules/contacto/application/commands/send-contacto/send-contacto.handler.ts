import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SendContactoCommand } from './send-contacto.command';
import { EmailPort } from '../../../domain/ports/email.port';
import { ContactoMessageEntity } from '../../../domain/entities/contacto-message.entity';
import { EmailSendFailedException } from '../../../domain/exceptions/email-send-failed.exception';

@CommandHandler(SendContactoCommand)
export class SendContactoHandler implements ICommandHandler<SendContactoCommand> {
  constructor(private readonly email: EmailPort) {}

  async execute(command: SendContactoCommand): Promise<void> {
    const message = new ContactoMessageEntity(
      command.tipo,
      command.nombre,
      command.email,
      command.ciudad || null,
      command.mensaje,
    );
    try {
      await this.email.sendContacto(message);
    } catch (err) {
      throw new EmailSendFailedException(err);
    }
  }
}
