import { Controller, Get, Param, BadRequestException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetContentQuery } from '../../application/queries/get-content/get-content.query';
import { ContentPage } from '../../domain/entities/page-content.entity';

const VALID_PAGES: ContentPage[] = ['home', 'nosotros', 'preparacion', 'contacto'];

@Controller('content')
export class ContentController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(':page')
  getByPage(@Param('page') page: string): Promise<Record<string, unknown>> {
    if (!VALID_PAGES.includes(page as ContentPage)) {
      throw new BadRequestException(`Invalid page. Valid values: ${VALID_PAGES.join(', ')}`);
    }
    return this.queryBus.execute(new GetContentQuery(page as ContentPage));
  }
}
