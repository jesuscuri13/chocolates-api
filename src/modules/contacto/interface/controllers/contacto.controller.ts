import { Body, Controller, HttpCode, Post, UseFilters } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { SendContactoCommand } from '../../application/commands/send-contacto/send-contacto.command';
import { SendContactoDto } from '../dto/send-contacto.dto';
import { ContactoExceptionFilter } from '../filters/contacto-exception.filter';

@Controller('api/contacto')
@UseFilters(ContactoExceptionFilter)
export class ContactoController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @HttpCode(200)
  async send(@Body() dto: SendContactoDto): Promise<{ ok: true }> {
    await this.commandBus.execute(
      new SendContactoCommand(
        dto.tipo,
        dto.nombre,
        dto.email,
        dto.ciudad ?? null,
        dto.mensaje,
      ),
    );
    return { ok: true };
  }
}
