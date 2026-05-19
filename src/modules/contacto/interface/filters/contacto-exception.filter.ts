import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { EmailSendFailedException } from '../../domain/exceptions/email-send-failed.exception';

@Catch()
export class ContactoExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('ContactoExceptionFilter');

  catch(exception: unknown, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();

    if (exception instanceof BadRequestException) {
      return res.status(400).json({ ok: false, error: 'validation' });
    }

    if (exception instanceof EmailSendFailedException) {
      this.logger.error(exception.message, exception.stack);
      return res.status(500).json({ ok: false, error: 'send_failed' });
    }

    if (exception instanceof HttpException) {
      return res.status(exception.getStatus()).json({ ok: false, error: 'send_failed' });
    }

    this.logger.error('Unexpected contacto error', exception);
    return res.status(500).json({ ok: false, error: 'send_failed' });
  }
}
