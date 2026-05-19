import { ContentPage, PageContentEntity } from '../entities/page-content.entity';

export abstract class PageContentRepository {
  abstract findByPage(page: ContentPage): Promise<PageContentEntity | null>;
}
