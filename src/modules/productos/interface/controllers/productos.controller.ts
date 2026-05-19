import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetProductosQuery } from '../../application/queries/get-productos/get-productos.query';
import { GetProductoBySlugQuery } from '../../application/queries/get-producto-by-slug/get-producto-by-slug.query';
import { ProductoListDto, ProductoDetailDto } from '../../application/dto/producto.dto';

@Controller('productos')
export class ProductosController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  getAll(): Promise<ProductoListDto[]> {
    return this.queryBus.execute(new GetProductosQuery());
  }

  @Get(':slug')
  getBySlug(@Param('slug') slug: string): Promise<ProductoDetailDto> {
    return this.queryBus.execute(new GetProductoBySlugQuery(slug));
  }
}
