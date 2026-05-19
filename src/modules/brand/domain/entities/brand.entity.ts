export class BrandEntity {
  constructor(
    public readonly id: string,
    public readonly whatsapp: string,
    public readonly whatsappPhone: string,
    public readonly email: string,
    public readonly location: string,
  ) {}
}
