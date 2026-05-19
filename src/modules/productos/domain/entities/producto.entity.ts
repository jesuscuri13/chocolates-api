export interface ProductoTag {
  text: string;
  kind: 'yellow' | 'frozen' | 'line';
}

export class ProductoEntity {
  constructor(
    public readonly slug: string,
    public readonly name: string,
    public readonly subtitle: string,
    public readonly categoria: string,
    public readonly price: string,
    public readonly weight: string,
    public readonly image: string,
    public readonly images: string[],
    public readonly tag: ProductoTag | null,
    public readonly active: boolean,
    public readonly description: string,
    public readonly notes: string[],
    public readonly preparacion: string,
    public readonly conservacion: string,
    public readonly origen: string,
  ) {}
}
