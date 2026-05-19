import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProductoBySlugQuery } from './get-producto-by-slug.query';
import { ProductoRepository } from '../../../domain/repositories/producto.repository';
import { ProductoNotFoundException } from '../../../domain/exceptions/producto-not-found.exception';
import { ProductoMapper } from '../../mappers/producto.mapper';
import { ProductoDetailDto } from '../../dto/producto.dto';

@QueryHandler(GetProductoBySlugQuery)
export class GetProductoBySlugHandler
  implements IQueryHandler<GetProductoBySlugQuery, ProductoDetailDto>
{
  constructor(private readonly repo: ProductoRepository) {}

  async execute(query: GetProductoBySlugQuery): Promise<ProductoDetailDto> {
    const producto = await this.repo.findBySlug(query.slug);
    if (!producto) throw new ProductoNotFoundException(query.slug);
    return ProductoMapper.toDetailDto(producto);
  }
}
