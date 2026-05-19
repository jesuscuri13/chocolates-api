# API Chocolates Tambopata — CLAUDE.md

## Proyecto

Backend API para [chocolatestambopata.com](https://chocolatestambopata.com). Marca de chocolates artesanales de Puerto Maldonado, Madre de Dios, Perú.

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | NestJS 10 (Node.js 20) |
| Arquitectura | DDD + CQRS + Hexagonal |
| ORM | Prisma 5 + MariaDB _(módulos de catálogo, deshabilitados)_ |
| Email | Resend SDK / Nodemailer (SMTP) — selección automática por env |
| Validación | class-validator + ValidationPipe global |
| Proceso | PM2 en `/var/www/api`, puerto **3000** |
| Proxy | Nginx → `chocolatestambopata.com/api` → `localhost:3000` |

---

## Estado actual

Solo el módulo `contacto` está activo. Los módulos de catálogo (brand, categorias, productos, pages, content) están implementados pero **comentados en `AppModule`** hasta configurar la base de datos.

---

## Endpoints activos

### `POST /api/contacto` — público

Envía un email de contacto desde el formulario de la web.

**Request:**
```typescript
{
  tipo:    string   // requerido — "Pedido general" | "Mayorista" | "Otra"
  nombre:  string   // requerido
  email:   string   // requerido, formato email válido
  ciudad?: string   // opcional
  mensaje: string   // requerido
}
```

**Responses:**
```typescript
200  { ok: true }
400  { ok: false, error: "validation" }   // campos inválidos o faltantes
500  { ok: false, error: "send_failed" }  // fallo al enviar el email
```

**Email generado:**
- **From:** `EMAIL_FROM` env (ej. `"Chocolates Tambopata <admin@chocolatestambopata.com>"`)
- **To:** `EMAIL_TO` env (ej. `pedidos@chocolatestambopata.com`)
- **Reply-To:** el email que ingresó el usuario
- **Subject:** `[{tipo}] Mensaje de {nombre} — Chocolates Tambopata`
- **HTML:** plantilla con branding Tambopata (colores chocolate, tabla de datos, botón de reply)

---

## Variables de entorno

```env
PORT=3000
FRONTEND_URL=https://chocolatestambopata.com

# Email — si SMTP_HOST está presente usa SMTP; si no, usa Resend
RESEND_API_KEY=re_...
EMAIL_FROM="Chocolates Tambopata <admin@chocolatestambopata.com>"
EMAIL_TO=pedidos@chocolatestambopata.com

# SMTP (alternativa a Resend)
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_SECURE=false
# SMTP_USER=...
# SMTP_PASS=...

# DB — comentado hasta habilitar módulos de catálogo
# DATABASE_URL="mysql://user:pass@localhost:3306/chocolates_tambopata"
```

---

## CORS permitido

- `https://chocolatestambopata.com`
- `https://www.chocolatestambopata.com`
- `FRONTEND_URL` env (localhost en desarrollo)

---

## Estructura del módulo contacto

```
src/modules/contacto/
  domain/
    entities/contacto-message.entity.ts   — subject, bodyHtml, bodyText
    ports/email.port.ts                   — interfaz abstracta EmailPort
    exceptions/email-send-failed.exception.ts
  application/
    commands/send-contacto/               — SendContactoCommand + Handler
  infrastructure/
    services/resend-email.service.ts      — implementación Resend
    services/nodemailer-email.service.ts  — implementación SMTP
  interface/
    dto/send-contacto.dto.ts              — validación class-validator
    controllers/contacto.controller.ts   — POST /api/contacto
    filters/contacto-exception.filter.ts  — maneja 400/500 con formato {ok, error}
```

**Selección de proveedor** (en `contacto.module.ts`):
- `SMTP_HOST` presente → `NodemailerEmailService`
- Sin `SMTP_HOST` → `ResendEmailService`

---

## Servidor de producción

```bash
# Ver logs
pm2 logs chocolates-api

# Desplegar cambios
cd /var/www/api && git pull && ./node_modules/.bin/nest build && pm2 restart chocolates-api

# Reiniciar con nuevas variables de entorno
pm2 restart chocolates-api --update-env
```

---

## Módulos de catálogo (pendientes)

Implementados en `src/modules/` pero deshabilitados. Para activarlos:
1. Configurar `DATABASE_URL` en `.env`
2. Descomentar imports en `src/app.module.ts`
3. Correr `npx prisma migrate dev` y `ts-node prisma/seed.ts`

| Módulo | Endpoint |
|--------|----------|
| brand | `GET /brand` |
| categorias | `GET /categorias` |
| productos | `GET /productos`, `GET /productos/:slug` |
| pages | `GET /pages` |
| content | `GET /content/:page` |
