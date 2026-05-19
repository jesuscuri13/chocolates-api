import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPagesQuery } from './get-pages.query';
import { PageRepository } from '../../../domain/repositories/page.repository';
import { PageMapper } from '../../mappers/page.mapper';
import { PageDto } from '../../dto/page.dto';

@QueryHandler(GetPagesQuery)
export class GetPagesHandler implements IQueryHandler<GetPagesQuery, PageDto[]> {
  constructor(private readonly repo: PageRepository) {}

  async execute(): Promise<PageDto[]> {
    const pages = await this.repo.findAll();
    return pages.map(PageMapper.toDto);
  }
}
