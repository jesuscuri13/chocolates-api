import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CategoriasController } from './interface/controllers/categorias.controller';
import { GetCategoriasHandler } from './application/queries/get-categorias/get-categorias.handler';
import { CategoriaRepository } from './domain/repositories/categoria.repository';
import { PrismaCategoriaRepository } from './infrastructure/repositories/prisma-categoria.repository';

@Module({
  imports: [CqrsModule],
  controllers: [CategoriasController],
  providers: [
    GetCategoriasHandler,
    { provide: CategoriaRepository, useClass: PrismaCategoriaRepository },
  ],
})
export class CategoriasModule {}
