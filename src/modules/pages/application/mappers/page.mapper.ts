import { PageEntity } from '../../domain/entities/page.entity';
import { PageDto } from '../dto/page.dto';

export class PageMapper {
  static toDto(entity: PageEntity): PageDto {
    return {
      route: entity.route,
      title: entity.title,
      description: entity.description,
      ogImage: entity.ogImage,
      keywords: entity.keywords,
    };
  }
}
