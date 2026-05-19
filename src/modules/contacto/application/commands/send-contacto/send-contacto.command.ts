export class SendContactoCommand {
  constructor(
    public readonly tipo: string,
    public readonly nombre: string,
    public readonly email: string,
    public readonly ciudad: string | null,
    public readonly mensaje: string,
  ) {}
}
