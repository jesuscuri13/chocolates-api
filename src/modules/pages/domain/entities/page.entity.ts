export class PageEntity {
  constructor(
    public readonly id: string,
    public readonly route: string,
    public readonly title: string,
    public readonly description: string,
    public readonly ogImage: string,
    public readonly keywords: string,
  ) {}
}
