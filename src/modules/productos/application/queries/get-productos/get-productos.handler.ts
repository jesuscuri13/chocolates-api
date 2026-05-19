import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProductosQuery } from './get-productos.query';
import { ProductoRepository } from '../../../domain/repositories/producto.repository';
import { ProductoMapper } from '../../mappers/producto.mapper';
import { ProductoListDto } from '../../dto/producto.dto';

@QueryHandler(GetProductosQuery)
export class GetProductosHandler implements IQueryHandler<GetProductosQuery, ProductoListDto[]> {
  constructor(private readonly repo: ProductoRepository) {}

  async execute(): Promise<ProductoListDto[]> {
    const productos = await this.repo.findAll();
    return productos.map(ProductoMapper.toListDto);
  }
}
