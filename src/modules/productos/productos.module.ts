import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductosController } from './interface/controllers/productos.controller';
import { GetProductosHandler } from './application/queries/get-productos/get-productos.handler';
import { GetProductoBySlugHandler } from './application/queries/get-producto-by-slug/get-producto-by-slug.handler';
import { ProductoRepository } from './domain/repositories/producto.repository';
import { PrismaProductoRepository } from './infrastructure/repositories/prisma-producto.repository';

@Module({
  imports: [CqrsModule],
  controllers: [ProductosController],
  providers: [
    GetProductosHandler,
    GetProductoBySlugHandler,
    { provide: ProductoRepository, useClass: PrismaProductoRepository },
  ],
})
export class ProductosModule {}
