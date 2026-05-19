export class CategoriaEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly sub: string,
    public readonly desc: string,
    public readonly image: string,
    public readonly order: number,
  ) {}
}
