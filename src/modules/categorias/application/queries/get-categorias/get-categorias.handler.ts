import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCategoriasQuery } from './get-categorias.query';
import { CategoriaRepository } from '../../../domain/repositories/categoria.repository';
import { CategoriaMapper } from '../../mappers/categoria.mapper';
import { CategoriaDto } from '../../dto/categoria.dto';

@QueryHandler(GetCategoriasQuery)
export class GetCategoriasHandler implements IQueryHandler<GetCategoriasQuery, CategoriaDto[]> {
  constructor(private readonly repo: CategoriaRepository) {}

  async execute(): Promise<CategoriaDto[]> {
    const categorias = await this.repo.findAll();
    return categorias.map(CategoriaMapper.toDto);
  }
}
