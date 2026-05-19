import { ContactoMessageEntity } from '../entities/contacto-message.entity';

export abstract class EmailPort {
  abstract sendContacto(message: ContactoMessageEntity): Promise<void>;
}
