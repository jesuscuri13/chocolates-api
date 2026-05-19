export type ContentPage = 'home' | 'nosotros' | 'preparacion' | 'contacto';

export class PageContentEntity {
  constructor(
    public readonly id: string,
    public readonly page: ContentPage,
    public readonly content: Record<string, unknown>,
  ) {}
}
