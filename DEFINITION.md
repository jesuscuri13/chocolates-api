# [Nombre del Proyecto] — CLAUDE.md

Guía de contexto para sesiones de Claude Code. Documenta arquitectura, decisiones de diseño y el contrato completo de la API.

---

## Proyecto

[Descripción breve: qué hace la app, a quién va dirigida, mercado objetivo.]

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | NestJS (Node.js) |
| ORM | Prisma |
| Base de datos | MariaDB (MySQL) |
| Arquitectura | DDD + CQRS + Hexagonal (puertos y adaptadores) |
| Autenticación | JWT (Bearer token) + Refresh Token |
| Validación | class-validator + ValidationPipe global |
| Email | Resend SDK |
| Archivos estáticos | `uploads/` servido en `/uploads` |

**Puerto:** `3000` (configurable con `PORT` env var)
**URL local:** `http://localhost:3000`

---

## Arquitectura

### Estructura de módulos

```
src/modules/{módulo}/
  domain/
    entities/          — Entidades de dominio (sin dependencias externas)
    value-objects/     — Value objects tipados
    exceptions/        — Excepciones de dominio
    repositories/      — Interfaces (contratos) de repositorios
    events/            — Eventos de dominio
  application/
    commands/          — Comandos CQRS (escritura)
    queries/           — Queries CQRS (lectura)
    dto/               — Data Transfer Objects de respuesta
    mappers/           — Conversión entity → DTO
  infrastructure/
    repositories/      — Implementaciones con Prisma
  interface/
    dto/               — DTOs de request (validados con class-validator)
    controllers/       — Controllers HTTP
    filters/           — Exception filters por módulo
    guards/            — Guards de autenticación/autorización
    decorators/        — Decoradores custom (@CurrentUser)
```

### Decisiones de diseño globales

**Soft-delete:** Ninguna tabla usa DELETE físico. Todas tienen `deleted_at` nullable. Los repositorios filtran `WHERE deleted_at IS NULL` por defecto.

**Montos como enteros:** Todos los montos viajan como enteros en la unidad mínima de la moneda (centavos). `100` = $1.00. Nunca floats.

**Balances guardados:** Los saldos se actualizan atómicamente con cada operación. No se recalculan sumando el historial en runtime.

**Transacciones inmutables (Ghost Edit):** No existe UPDATE de transacción. Corregir crea internamente una reversión oculta y una nueva transacción corregida. El frontend usa `PATCH` y recibe la nueva transacción con nuevo `id`.

### Checklist obligatorio para módulos nuevos

Antes de considerar un módulo completo, verificar:

- [ ] Entidad de dominio con value objects para campos críticos
- [ ] Interfaz de repositorio en `domain/repositories/`
- [ ] Implementación Prisma en `infrastructure/repositories/`
- [ ] Commands y Queries con sus Handlers registrados en el módulo
- [ ] DTOs de request con decoradores de class-validator
- [ ] DTO de respuesta y Mapper (entity → DTO)
- [ ] Controller registrado en el módulo
- [ ] Exception filter para excepciones de dominio del módulo
- [ ] Módulo registrado en `AppModule`
- [ ] Modelo Prisma con `deleted_at DateTime?` (soft-delete)
- [ ] Endpoints documentados en este CLAUDE.md

---

## Variables de entorno requeridas

```env
DATABASE_URL="mysql://user:pass@localhost:3306/db_name"
JWT_SECRET="secret-seguro"
FRONTEND_URL="http://localhost:4200"
RESEND_API_KEY="re_..."
# [Agregar las variables específicas del proyecto]
```

---

## Autenticación — flujos disponibles

El flujo **recomendado** es passwordless (OTP por email). La contraseña es opcional.

### Flujo principal: OTP por email (passwordless)
```
POST /auth/register   { email, name }   →  201 UserDto  ← envía OTP automáticamente al registrar
POST /auth/verify-otp { email, code }   →  201 SessionDto
```
> `send-otp` no es necesario en el registro — el OTP se envía solo. Úsalo solo para reenviar si el usuario no lo recibió.

### Flujo opcional: Password
```
POST /auth/register  { email, name, password }  →  201 UserDto
POST /auth/login     { email, password }         →  201 SessionDto
```

### Gestión de sesión
```
POST /auth/refresh  { refreshToken }  →  200 SessionDto  ← rota el token, invalida el anterior
POST /auth/logout   { refreshToken }  →  204
```

### Tipo `SessionDto`
```typescript
{
  accessToken: string;   // JWT, 24h — añadir a Authorization: Bearer
  refreshToken: string;  // Opaco, 30 días, rotar en cada uso
  userId: string;
  email: string;
  name: string;
}
```

---

## Módulos y endpoints

> **Convención:** Todos los endpoints requieren `Authorization: Bearer {accessToken}` salvo que se indique `— público`.

---

### AUTH `/auth`

#### `POST /auth/register` — público
```typescript
// Request
{ email: string; name: string; password?: string }
// Response 201: UserDto
//
// Comportamiento interno (el frontend no puede distinguirlos por HTTP):
//   • Email nuevo       → crea la cuenta, envía OTP
//   • Email activo      → envía OTP nuevo (resend implícito)
//   • Email suspendido  → envía email "contacta soporte", devuelve UserDto ficticio
//
// El frontend siempre debe redirigir a verify-otp tras recibir 201.
```

#### `POST /auth/login` — público
```typescript
// Request
{ email: string; password: string }
// Response 201: SessionDto
```

#### `GET /auth/me`
```typescript
// Response 200: UserDto
```

#### `POST /auth/refresh` — público
```typescript
// Request
{ refreshToken: string }
// Response 200: SessionDto (nuevo par de tokens — el anterior queda invalidado)
```

#### `POST /auth/logout`
```typescript
// Request
{ refreshToken: string }
// Response 204
```

#### `POST /auth/send-otp` — público
```typescript
// Request
{ email: string }
// Response 200: { message: string }  ← SIEMPRE 200, nunca 404
```

#### `POST /auth/verify-otp` — público
```typescript
// Request
{ email: string; code: string }
// Response 200: SessionDto
```

### Tipo `UserDto`
```typescript
{
  id: string; email: string; name: string;
  avatarUrl: string | null; avatarColor: string | null;
  isActive: boolean; createdAt: Date;
}
```

---

### PROFILE `/profile`

#### `GET /profile`
Retorna `UserDto`.

#### `PATCH /profile`
```typescript
// Request (todos opcionales)
{ name?: string; avatarColor?: string | null }
// Response: UserDto
```

#### `POST /profile/avatar` — multipart/form-data
```typescript
// Form field: file (image/jpeg | image/png | image/webp, max 5 MB)
// Response: UserDto
// Imagen disponible en: GET /uploads/{filename}
```

#### `DELETE /profile/avatar`
```typescript
// Response: UserDto
```

#### `PATCH /profile/password` — 204
```typescript
// Request
{ currentPassword: string; newPassword: string }
```

---

### [MÓDULO] `/[ruta-base]`

> Copiar esta sección para cada módulo del proyecto y completar los detalles.

#### `POST /[ruta-base]`
```typescript
// Request
{ /* campos requeridos */ }
// Response 201: [Entidad]Dto
```

#### `GET /[ruta-base]`
```typescript
// Response: [Entidad]Dto[]
```

#### `GET /[ruta-base]/:id`
```typescript
// Response: [Entidad]Dto
```

#### `PATCH /[ruta-base]/:id`
```typescript
// Request (todos opcionales)
{ /* campos */ }
// Response: [Entidad]Dto
```

#### `DELETE /[ruta-base]/:id` — 204

### Tipo `[Entidad]Dto`
```typescript
{
  id: string;
  // campos del recurso...
  createdAt: Date; updatedAt: Date;
}
```

---

## Enums de referencia

```typescript
// [Agregar los enums específicos del proyecto]
```

---

## Códigos de error comunes

| Código | Significado |
|--------|-------------|
| `400` | Validación fallida (class-validator) o argumento inválido de dominio |
| `401` | Token JWT ausente, inválido o expirado |
| `403` | Sin permisos (rol insuficiente o feature no disponible en el plan) |
| `404` | Recurso no encontrado |
| `409` | Conflicto (recurso ya existe, límite alcanzado) |

---

## Flujo de onboarding

1. `POST /auth/register` → usuario creado + OTP enviado al email, devuelve `UserDto`
2. `POST /auth/verify-otp` → `SessionDto` con `accessToken` y `refreshToken`
3. [Pasos específicos del negocio...]

---

## Convenciones para el frontend

- **Tokens:** Guardar `accessToken` en memoria (store) y `refreshToken` en `localStorage`. Renovar automáticamente con `POST /auth/refresh` cuando el servidor devuelva `401`.
- **Montos:** Siempre enteros en centavos. Dividir entre `100` para mostrar.
- **Fechas:** La API devuelve ISO strings.
- **Archivos estáticos:** `GET http://localhost:3000/uploads/{filename}` devuelve la imagen.
- **Ghost Edit:** Al editar una transacción, el `id` devuelto es diferente al original. Actualizar la referencia local.
