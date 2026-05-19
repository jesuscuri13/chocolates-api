export class ContactoMessageEntity {
  constructor(
    public readonly tipo: string,
    public readonly nombre: string,
    public readonly email: string,
    public readonly ciudad: string | null,
    public readonly mensaje: string,
  ) {}

  get subject(): string {
    return `[${this.tipo}] Mensaje de ${this.nombre} — Chocolates Tambopata`;
  }

  get bodyHtml(): string {
    const ciudadLine = this.ciudad
      ? `<p><strong>Ciudad:</strong> ${this.ciudad}</p>`
      : '';
    return `
      <p><strong>Tipo:</strong> ${this.tipo}</p>
      <p><strong>Nombre:</strong> ${this.nombre}</p>
      <p><strong>Correo:</strong> ${this.email}</p>
      ${ciudadLine}
      <hr/>
      <p style="white-space:pre-wrap">${this.mensaje}</p>
    `;
  }

  get bodyText(): string {
    const lines = [
      `Tipo: ${this.tipo}`,
      `Nombre: ${this.nombre}`,
      `Correo: ${this.email}`,
    ];
    if (this.ciudad) lines.push(`Ciudad: ${this.ciudad}`);
    lines.push('', this.mensaje);
    return lines.join('\n');
  }
}
