import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetCategoriasQuery } from '../../application/queries/get-categorias/get-categorias.query';
import { CategoriaDto } from '../../application/dto/categoria.dto';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  getAll(): Promise<CategoriaDto[]> {
    return this.queryBus.execute(new GetCategoriasQuery());
  }
}
