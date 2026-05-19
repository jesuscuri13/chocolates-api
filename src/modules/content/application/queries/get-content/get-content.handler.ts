import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetContentQuery } from './get-content.query';
import { PageContentRepository } from '../../../domain/repositories/page-content.repository';
import { ContentNotFoundException } from '../../../domain/exceptions/content-not-found.exception';

@QueryHandler(GetContentQuery)
export class GetContentHandler implements IQueryHandler<GetContentQuery, Record<string, unknown>> {
  constructor(private readonly repo: PageContentRepository) {}

  async execute(query: GetContentQuery): Promise<Record<string, unknown>> {
    const result = await this.repo.findByPage(query.page);
    if (!result) throw new ContentNotFoundException(query.page);
    return result.content;
  }
}
