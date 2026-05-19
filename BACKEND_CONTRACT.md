# Contrato de datos — Backend Chocolates Tambopata

> Este documento define exactamente qué datos necesita el frontend para funcionar.
> No prescribe tecnología, base de datos ni arquitectura del backend.
> Cada recurso indica el shape del JSON que debe devolver.

---

## 1. Marca (`/brand`)

Datos globales del negocio. Se carga una vez al iniciar la app.

```json
{
  "whatsapp":      "51980758367",
  "whatsappPhone": "+51 980 758 367",
  "email":         "hola@tambopata.pe",
  "location":      "Puerto Maldonado, Madre de Dios, Perú"
}
```

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `whatsapp` | `string` | Número sin espacios ni `+`, usado para construir links `wa.me/` |
| `whatsappPhone` | `string` | Número formateado para mostrar al usuario |
| `email` | `string` | Correo de contacto |
| `location` | `string` | Texto de ubicación para footer y contacto |

---

## 2. Categorías (`/categorias`)

Lista de categorías que se muestran en el home y se usan como filtros en el catálogo.

```json
[
  {
    "id":    "cacao",
    "name":  "Cacao",
    "sub":   "El producto de autoridad",
    "desc":  "Pasta de cacao puro. Sin azúcar añadida, sin atajos.",
    "image": "/assets/images/categoria-cacao.jpg"
  }
]
```

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | `string` | Identificador usado como filtro en `/catalogo?categoria={id}` |
| `name` | `string` | Nombre visible |
| `sub` | `string` | Subtítulo de la tarjeta |
| `desc` | `string` | Descripción de la tarjeta |
| `image` | `string` | URL de la imagen (4:5, 600×750 px) |

**Categorías actuales:** `cacao` · `copoazu` · `cafe`

---

## 3. Listado de productos (`/productos`)

Lista completa de productos. El frontend filtra por `active` y por `categoria` en el cliente.

```json
[
  {
    "slug":      "pasta-cacao",
    "name":      "Pasta de Cacao",
    "subtitle":  "100% Puro · Sin azúcar",
    "categoria": "cacao",
    "price":     "S/ 12.00",
    "weight":    "100 g",
    "image":     "/assets/images/pasta-cacao-puro-tambopata-amazonia.jpg",
    "tag":       { "text": "Rinde 12 tazas", "kind": "yellow" },
    "active":    true
  }
]
```

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `slug` | `string` | Identificador único · URL del detalle: `/catalogo/{slug}` |
| `name` | `string` | Nombre del producto |
| `subtitle` | `string` | Línea descriptiva corta bajo el nombre |
| `categoria` | `string` | Debe coincidir con un `id` de categorías |
| `price` | `string` | Precio formateado, ej. `"S/ 12.00"`. Vacío `""` si no está definido |
| `weight` | `string` | Presentación, ej. `"100 g"`. Vacío `""` si no está definido |
| `image` | `string` | URL de imagen principal (1:1, 600×600 px) |
| `tag` | `Tag \| null` | Etiqueta opcional sobre la imagen (ver tipo abajo) |
| `active` | `boolean` | `false` = no aparece en catálogo ni nav |

**Tipo `Tag`:**
```json
{ "text": "string", "kind": "yellow | frozen | line" }
```

**Productos actuales:**

| slug | active | price | weight |
|------|--------|-------|--------|
| `pasta-cacao` | ✅ | S/ 12.00 | 100 g |
| `flan-copoazu` | ✅ | — | — |
| `cafe` | ✅ | S/ 8.00 | 100 g |
| `copoazu-pulpa` | ❌ | S/ 20.00 | 500 g |

---

## 4. Detalle de producto (`/productos/{slug}`)

Datos completos de un producto individual.

```json
{
  "slug":         "pasta-cacao",
  "name":         "Pasta de Cacao",
  "subtitle":     "100% Puro · Sin azúcar",
  "categoria":    "cacao",
  "price":        "S/ 12.00",
  "weight":       "100 g",
  "image":        "/assets/images/pasta-cacao-puro-tambopata-amazonia.jpg",
  "images":       ["/assets/images/pasta-cacao-puro-tambopata-amazonia.jpg"],
  "tag":          { "text": "Rinde 12 tazas", "kind": "yellow" },
  "description":  "Pasta de cacao puro. Sin aditivos, sin conservantes.",
  "notes":        ["Origen único · Madre de Dios", "Comercio justo"],
  "preparacion":  "Ralla 20 g por taza, calienta 250 ml de leche o agua, disuelve y endulza al gusto.",
  "conservacion": "Lugar fresco y seco, alejado de la luz directa. Una vez abierta, dura hasta 6 meses.",
  "origen":       "Tambopata · Madre de Dios"
}
```

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `slug` · `name` · `subtitle` · `categoria` · `price` · `weight` · `image` · `tag` | — | Igual que en el listado |
| `images` | `string[]` | Galería completa. El primero es la imagen principal |
| `description` | `string` | Párrafo descriptivo del producto |
| `notes` | `string[]` | Bullet points de características (máx. 3 recomendado) |
| `preparacion` | `string` | Instrucciones de uso |
| `conservacion` | `string` | Instrucciones de conservación |
| `origen` | `string` | Procedencia del producto |

---

## 5. SEO por ruta (`/pages`)

Metadatos para cada ruta pública. El frontend los aplica en `<head>` al navegar.

```json
[
  {
    "route":       "/",
    "title":       "Chocolates Tambopata · Sabores auténticos de la Amazonía peruana",
    "description": "Cacao puro, copoazú y café de Madre de Dios. Comercio justo, sabor sin atajos.",
    "ogImage":     "/assets/images/pasta-cacao-puro-chocolates-tambopata-madre-de-dios.jpg",
    "keywords":    "chocolate, cacao puro, Tambopata, Madre de Dios, copoazú, café"
  }
]
```

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `route` | `string` | Ruta exacta del frontend, ej. `/catalogo/pasta-cacao` |
| `title` | `string` | `<title>` de la página |
| `description` | `string` | `<meta name="description">` |
| `ogImage` | `string` | URL de imagen para Open Graph |
| `keywords` | `string` | `<meta name="keywords">` |

**Rutas actuales:** `/` · `/catalogo` · `/catalogo/pasta-cacao` · `/catalogo/flan-copoazu` · `/catalogo/cafe` · `/nosotros` · `/preparacion` · `/contacto`

---

## 6. Contenido de páginas (`/content/{page}`)

Textos de cada página. Permiten editar el contenido sin tocar el código.
`{page}` es: `home` · `nosotros` · `preparacion` · `contacto`

### 6.1 Home (`/content/home`)

```json
{
  "hero": {
    "eyebrow": "string",
    "tagline": "string",
    "cta":     "string"
  },
  "categorias": {
    "eyebrow": "string",
    "title":   "string"
  },
  "favoritos": {
    "eyebrow":     "string",
    "title":       "string",
    "titleScript": "string",
    "body":        "string",
    "cta":         "string",
    "pasos": [
      { "n": "string", "title": "string", "desc": "string" }
    ]
  },
  "testimonios": {
    "eyebrow":    "string",
    "socialText": "string",
    "items": [
      { "quote": "string", "author": "string", "role": "string" }
    ]
  }
}
```

> `testimonios.items` vacío (`[]`) oculta la sección completa.

### 6.2 Nosotros (`/content/nosotros`)

```json
{
  "hero": {
    "eyebrow":     "string",
    "title":       "string",
    "titleScript": "string",
    "sub":         "string"
  },
  "esencia": {
    "eyebrow": "string",
    "title":   "string",
    "body":    ["string", "string"]
  },
  "cita": {
    "text": "string",
    "attr": "string"
  },
  "cta": {
    "eyebrow":      "string",
    "title":        "string",
    "sub":          "string",
    "ctaPrimary":   "string",
    "ctaSecondary": "string"
  }
}
```

### 6.3 Preparación (`/content/preparacion`)

```json
{
  "hero": {
    "eyebrow":     "string",
    "title":       "string",
    "titleScript": "string",
    "sub":         "string"
  },
  "pasos": [
    { "n": "string", "title": "string", "desc": "string" }
  ],
  "conservacion": {
    "eyebrow": "string",
    "title":   "string",
    "items": [
      { "title": "string", "desc": "string" }
    ]
  },
  "recetario": {
    "eyebrow": "string",
    "title":   "string",
    "items": [
      { "title": "string", "desc": "string" }
    ]
  },
  "faqs": {
    "eyebrow": "string",
    "title":   "string",
    "items": [
      { "q": "string", "a": "string" }
    ]
  }
}
```

### 6.4 Contacto (`/content/contacto`)

```json
{
  "header": {
    "eyebrow":   "string",
    "title":     "string",
    "titleLine2":"string",
    "sub":       "string"
  },
  "canales": {
    "whatsappLabel": "string",
    "emailLabel":    "string"
  },
  "social":   { "label": "string" },
  "ubicacion":{ "label": "string" },
  "form": {
    "tipoLabel":               "string",
    "tipos":                   ["string"],
    "nombreLabel":             "string",
    "emailLabel":              "string",
    "ciudadLabel":             "string",
    "ciudadOpcional":          "string",
    "ciudadPlaceholder":       "string",
    "mensajeLabel":            "string",
    "mensajeLabelMayorista":   "string",
    "mensajePlaceholder":      "string",
    "mensajePlaceholderMayorista": "string",
    "cta":                     "string",
    "ctaSent":                 "string",
    "altPrefix":               "string"
  },
  "favBanner": {
    "prefix":           "string",
    "productoSingular": "string",
    "productoPlural":   "string",
    "suffix":           "string"
  },
  "sentSocial": { "prefix": "string" },
  "errores": {
    "nombre":  "string",
    "email":   "string",
    "mensaje": "string"
  }
}
```

---

## 7. Modo API (cómo conecta el frontend)

En `app.config.ts` hay un token `API_MODE`:

| Valor | Comportamiento |
|-------|----------------|
| `'mock'` | Lee los JSON de `public/assets/data/` directamente |
| `'live'` | Llama a rutas relativas (`/productos`, `/productos/{slug}`, etc.) |

En modo `live`, el frontend espera las mismas shapes definidas arriba en las siguientes rutas:

| Recurso | Ruta |
|---------|------|
| Listado de productos | `GET /productos` |
| Detalle de producto | `GET /productos/{slug}` |
| Categorías | `GET /categorias` |
| Marca | `GET /brand` |
| SEO | `GET /pages` |
| Contenido de página | `GET /content/{page}` |

> Cambiar `API_MODE` de `'mock'` a `'live'` en `src/app/app.config.ts` activa el backend real.
