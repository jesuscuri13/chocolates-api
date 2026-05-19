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
    const ciudadRow = this.ciudad
      ? `<tr>
          <td style="padding:6px 0;color:#8a6a50;font-size:13px;font-family:Georgia,serif;width:90px">Ciudad</td>
          <td style="padding:6px 0;color:#2c1a0e;font-size:14px;font-family:Arial,sans-serif">${this.ciudad}</td>
        </tr>`
      : '';

    return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5ede4;font-family:Arial,sans-serif">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5ede4;padding:32px 16px">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px">

        <!-- Header -->
        <tr>
          <td style="background:#2c1a0e;border-radius:12px 12px 0 0;padding:32px 40px;text-align:center">
            <p style="margin:0 0 4px;font-family:Georgia,serif;font-size:11px;letter-spacing:3px;color:#c8956a;text-transform:uppercase">Chocolates</p>
            <h1 style="margin:0;font-family:Georgia,serif;font-size:26px;color:#f5ede4;font-weight:normal;letter-spacing:1px">Tambopata</h1>
            <p style="margin:10px 0 0;font-size:11px;color:#8a6a50;letter-spacing:1px">Madre de Dios · Perú</p>
          </td>
        </tr>

        <!-- Tag tipo -->
        <tr>
          <td style="background:#6b3a2a;padding:10px 40px;text-align:center">
            <span style="font-size:11px;letter-spacing:2px;color:#f5c89a;text-transform:uppercase;font-family:Arial,sans-serif">${this.tipo}</span>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#ffffff;padding:36px 40px;border-radius:0 0 12px 12px">

            <h2 style="margin:0 0 24px;font-family:Georgia,serif;font-size:18px;color:#2c1a0e;font-weight:normal">
              Nuevo mensaje de <strong>${this.nombre}</strong>
            </h2>

            <!-- Datos -->
            <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #f0e4d8;margin-bottom:24px">
              <tr>
                <td style="padding:6px 0;color:#8a6a50;font-size:13px;font-family:Georgia,serif;width:90px">Nombre</td>
                <td style="padding:6px 0;color:#2c1a0e;font-size:14px;font-family:Arial,sans-serif;border-bottom:1px solid #f0e4d8">${this.nombre}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;color:#8a6a50;font-size:13px;font-family:Georgia,serif">Correo</td>
                <td style="padding:6px 0;font-size:14px;font-family:Arial,sans-serif;border-bottom:1px solid #f0e4d8">
                  <a href="mailto:${this.email}" style="color:#6b3a2a;text-decoration:none">${this.email}</a>
                </td>
              </tr>
              ${ciudadRow}
            </table>

            <!-- Mensaje -->
            <p style="margin:0 0 8px;font-size:11px;letter-spacing:2px;color:#8a6a50;text-transform:uppercase;font-family:Georgia,serif">Mensaje</p>
            <div style="background:#fdf6f0;border-left:3px solid #c8956a;border-radius:0 6px 6px 0;padding:16px 20px">
              <p style="margin:0;font-size:15px;color:#2c1a0e;line-height:1.7;white-space:pre-wrap;font-family:Arial,sans-serif">${this.mensaje}</p>
            </div>

            <!-- Reply CTA -->
            <div style="margin-top:28px;text-align:center">
              <a href="mailto:${this.email}"
                 style="display:inline-block;background:#2c1a0e;color:#f5ede4;font-family:Arial,sans-serif;font-size:13px;letter-spacing:1px;padding:12px 28px;border-radius:6px;text-decoration:none">
                Responder a ${this.nombre}
              </a>
            </div>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 40px;text-align:center">
            <p style="margin:0;font-size:11px;color:#a08070;font-family:Arial,sans-serif">
              Chocolates Tambopata · Puerto Maldonado, Madre de Dios, Perú
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>

</body>
</html>`;
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
