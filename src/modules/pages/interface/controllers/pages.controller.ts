import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetPagesQuery } from '../../application/queries/get-pages/get-pages.query';
import { PageDto } from '../../application/dto/page.dto';

@Controller('pages')
export class PagesController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  getAll(): Promise<PageDto[]> {
    return this.queryBus.execute(new GetPagesQuery());
  }
}
