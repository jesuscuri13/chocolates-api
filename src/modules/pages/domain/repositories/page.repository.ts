import { PageEntity } from '../entities/page.entity';

export abstract class PageRepository {
  abstract findAll(): Promise<PageEntity[]>;
}
