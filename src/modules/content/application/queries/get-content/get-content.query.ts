import { ContentPage } from '../../../domain/entities/page-content.entity';

export class GetContentQuery {
  constructor(public readonly page: ContentPage) {}
}
