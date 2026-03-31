# Estrategia PSEO — Poncho Davalos Real Estate

## 1. Arquitectura

### Estructura de URLs

Todas las paginas PSEO se publican bajo `/pseo/{slug}/index.html`, resultando en URLs limpias:

```
https://ponchodavalos.com.mx/pseo/{slug}/
```

### Tipos de pagina y plantillas

| Tipo | Plantilla                    | Proposito                                 | Ejemplo de slug                          |
|------|------------------------------|-------------------------------------------|------------------------------------------|
| A    | `pseo-zona.hbs`              | Pagina de zona/colonia especifica          | `zona-romantica-propiedades`             |
| B    | `pseo-tipo-propiedad.hbs`    | Pagina por tipo de propiedad              | `condominios-puerto-vallarta`            |
| C    | `pseo-editorial.hbs`         | Contenido editorial/guias                 | `guia-comprar-propiedad-puerto-vallarta` |

### Flujo de generacion

1. Se lee `pseo/data/pages.json` con todos los registros de pagina.
2. Cada registro tiene un campo `tipo` (A, B o C) que determina la plantilla.
3. El script `generate-pseo.js` compila la plantilla Handlebars con los datos del registro.
4. Se genera `pseo/{slug}/index.html`.
5. Se actualiza `sitemap.xml` con marcadores `<!-- PSEO-SITEMAP-START -->` / `<!-- PSEO-SITEMAP-END -->`.
6. Se actualizan los archivos de traduccion `en.json` y `es.json` con claves bajo el namespace `pseo`.

### Estructura de pages.json

Cada registro en `pseo/data/pages.json` debe incluir como minimo:

```json
{
  "slug": "zona-romantica-propiedades",
  "slugAlt": "zona-romantica-properties",
  "tipo": "A",
  "idioma": "es",
  "h1": "Propiedades en Zona Romantica",
  "title": "Propiedades en Venta en Zona Romantica | Poncho Davalos",
  "description": "Encuentra las mejores propiedades en venta en Zona Romantica...",
  "zona": "Zona Romantica",
  "municipio": "Puerto Vallarta",
  "faqItems": [
    {
      "pregunta": "Cual es el precio promedio...",
      "respuesta": "El precio promedio es...",
      "preguntaEn": "What is the average price...",
      "respuestaEn": "The average price is..."
    }
  ]
}
```

Campos opcionales por tipo:

- **Tipo A (zona):** `precioPromedio`, `numPropiedades`, `caracteristicas`, `colonias`
- **Tipo B (tipo propiedad):** `tipoPropiedad`, `rangoPrecio`, `amenidades`
- **Tipo C (editorial):** `fechaPublicacion`, `contenido`, `titleEn`, `descriptionEn`

---

## 2. Roadmap de priorizacion

### Fase 1 — Zona Centro (Semanas 1-3)

Paginas iniciales con mayor volumen de busqueda y relevancia local.

| Pagina (ES)                              | Pagina (EN)                              | Tipo |
|------------------------------------------|------------------------------------------|------|
| Propiedades en Zona Romantica            | Properties in Zona Romantica             | A    |
| Propiedades en Marina Vallarta           | Properties in Marina Vallarta            | A    |
| Propiedades en Versalles                 | Properties in Versalles                  | A    |
| Propiedades en Centro Puerto Vallarta    | Properties in Downtown Puerto Vallarta   | A    |
| Propiedades en Hotel Zone               | Properties in Hotel Zone                 | A    |
| Condominios en Puerto Vallarta           | Condos in Puerto Vallarta                | B    |

**Total:** 12 paginas (6 ES + 6 EN)

### Fase 2 — Zona Norte (Semanas 4-6)

Expansion hacia la Riviera Nayarit, zona de alto interes para compradores internacionales.

| Pagina (ES)                              | Pagina (EN)                              | Tipo |
|------------------------------------------|------------------------------------------|------|
| Propiedades en Nuevo Vallarta            | Properties in Nuevo Vallarta             | A    |
| Propiedades en Bucerias                  | Properties in Bucerias                   | A    |
| Propiedades en La Cruz de Huanacaxtle    | Properties in La Cruz de Huanacaxtle     | A    |
| Propiedades en Sayulita                  | Properties in Sayulita                   | A    |
| Propiedades en San Pancho               | Properties in San Pancho                 | A    |

**Total:** 10 paginas (5 ES + 5 EN)

### Fase 3 — Zona Sur y Premium (Semanas 7-9)

Zonas de lujo con alto ticket promedio.

| Pagina (ES)                              | Pagina (EN)                              | Tipo |
|------------------------------------------|------------------------------------------|------|
| Propiedades en Conchas Chinas            | Properties in Conchas Chinas             | A    |
| Propiedades en Garza Blanca              | Properties in Garza Blanca               | A    |
| Propiedades en Punta Mita                | Properties in Punta Mita                 | A    |
| Propiedades en Amapas                    | Properties in Amapas                     | A    |
| Propiedades de Lujo en Puerto Vallarta   | Luxury Properties in Puerto Vallarta     | B    |

**Total:** 10 paginas (5 ES + 5 EN)

### Fase 4 — Paginas por tipo de propiedad (Semanas 10-11)

Captura de busquedas transaccionales por tipo de inmueble.

| Pagina (ES)                              | Pagina (EN)                              | Tipo |
|------------------------------------------|------------------------------------------|------|
| Casas en Venta en Puerto Vallarta        | Houses for Sale in Puerto Vallarta       | B    |
| Terrenos en Venta en Puerto Vallarta     | Land for Sale in Puerto Vallarta         | B    |
| Penthouses en Puerto Vallarta            | Penthouses in Puerto Vallarta            | B    |
| Departamentos en Renta Vacacional        | Vacation Rentals in Puerto Vallarta      | B    |

**Total:** 8 paginas (4 ES + 4 EN)

### Fase 5 — Contenido Editorial (Semanas 12-13)

Guias informativas que capturan trafico informacional y sirven como top-of-funnel.

| Pagina (ES)                                         | Pagina (EN)                                          | Tipo |
|------------------------------------------------------|------------------------------------------------------|------|
| Guia para Comprar Propiedad en Puerto Vallarta       | Guide to Buying Property in Puerto Vallarta          | C    |
| Costo de Vida en Puerto Vallarta                     | Cost of Living in Puerto Vallarta                    | C    |
| Proceso Legal para Extranjeros Comprando en Mexico   | Legal Process for Foreigners Buying in Mexico        | C    |
| Mejores Colonias para Invertir en Puerto Vallarta    | Best Neighborhoods to Invest in Puerto Vallarta      | C    |
| ROI de Rentas Vacacionales en Bahia de Banderas      | Vacation Rental ROI in Bahia de Banderas             | C    |

**Total:** 10 paginas (5 ES + 5 EN)

### Resumen del roadmap

| Fase | Paginas | Acumulado | Plazo      |
|------|---------|-----------|------------|
| 1    | 12      | 12        | Semana 3   |
| 2    | 10      | 22        | Semana 6   |
| 3    | 10      | 32        | Semana 9   |
| 4    | 8       | 40        | Semana 11  |
| 5    | 10      | 50        | Semana 13  |

**Meta: 50+ paginas indexadas en 90 dias.**

---

## 3. KPIs y metricas de exito

### Posicionamiento organico

| Keyword                                    | Meta posicion | Plazo   |
|--------------------------------------------|---------------|---------|
| "asesor inmobiliario Puerto Vallarta"      | Top 10        | 90 dias |
| "propiedades zona romantica"               | Top 5         | 60 dias |
| "condominios Puerto Vallarta"              | Top 10        | 90 dias |
| "real estate agent Puerto Vallarta"        | Top 10        | 90 dias |
| "properties for sale Nuevo Vallarta"       | Top 15        | 90 dias |

### Leads y conversiones

- **Leads via WhatsApp:** medibles con parametros UTM (`?utm_source=pseo&utm_medium=organic&utm_campaign={slug}`)
- **Meta mensual:** 15+ leads organicos via paginas PSEO
- **CTR en WhatsApp CTA:** >3% de visitantes unicos por pagina

### Indexacion

- **Meta:** 55 paginas indexadas en Google Search Console en 90 dias
- **Monitoreo:** Verificar cobertura semanal en GSC
- **Criterio de salud:** <5% paginas con errores de indexacion

### Trafico organico

- **Meta mes 1:** 500 sesiones organicas desde paginas PSEO
- **Meta mes 3:** 2,000 sesiones organicas mensuales
- **Meta mes 6:** 5,000 sesiones organicas mensuales

---

## 4. Guia de mantenimiento

### Agregar una nueva pagina de zona

1. Abrir `pseo/data/pages.json`.
2. Agregar un nuevo registro con los campos requeridos:

```json
{
  "slug": "propiedades-en-nuevo-vallarta",
  "slugAlt": "properties-in-nuevo-vallarta",
  "tipo": "A",
  "idioma": "es",
  "h1": "Propiedades en Nuevo Vallarta",
  "title": "Propiedades en Venta en Nuevo Vallarta | Poncho Davalos",
  "description": "Descubre las mejores propiedades en venta en Nuevo Vallarta...",
  "zona": "Nuevo Vallarta",
  "municipio": "Bahia de Banderas",
  "precioPromedio": 4500000,
  "numPropiedades": 120,
  "faqItems": [
    {
      "pregunta": "Cual es el precio promedio en Nuevo Vallarta?",
      "respuesta": "El precio promedio de una propiedad en Nuevo Vallarta es de $4,500,000 MXN.",
      "preguntaEn": "What is the average price in Nuevo Vallarta?",
      "respuestaEn": "The average property price in Nuevo Vallarta is $4,500,000 MXN."
    }
  ]
}
```

3. Agregar tambien el registro EN correspondiente (con `slugAlt` apuntando de vuelta).
4. Ejecutar el build: `npm run build` o `node src/build/index.js`.
5. Verificar que se genero `pseo/propiedades-en-nuevo-vallarta/index.html`.
6. Verificar que `sitemap.xml` se actualizo con la nueva URL.
7. Hacer deploy y solicitar indexacion en Google Search Console.

### Actualizar datos de mercado

1. Editar los campos numericos en el registro correspondiente de `pages.json`:
   - `precioPromedio`, `numPropiedades`, `rangoPrecio`, etc.
2. Ejecutar el build para regenerar las paginas.
3. El campo `fechaActualizacion` se actualiza automaticamente con la fecha actual.

### Agregar nuevos FAQ items

1. Abrir `pseo/data/pages.json`.
2. Localizar el registro de la pagina deseada.
3. Agregar un nuevo objeto al array `faqItems`:

```json
{
  "pregunta": "Es seguro comprar en esta zona?",
  "respuesta": "Si, esta zona cuenta con...",
  "preguntaEn": "Is it safe to buy in this area?",
  "respuestaEn": "Yes, this area has..."
}
```

4. Ejecutar el build. El schema FAQPage se actualiza automaticamente.

### Eliminar una pagina

1. Eliminar el registro de `pages.json`.
2. Ejecutar el build — el sitemap se regenera sin la URL eliminada.
3. Eliminar manualmente el directorio `pseo/{slug}/` si se desea.
4. Las claves i18n huerfanas se eliminan automaticamente en el siguiente build.

---

## 5. Estrategia bilingue

### Principios

- **Todas las paginas Tipo A y B tienen version EN.** Los compradores internacionales (principalmente estadounidenses y canadienses) representan >60% del mercado de Puerto Vallarta.
- **Paginas Tipo C selectivas en EN.** Solo contenido editorial relevante para extranjeros (guias legales, costo de vida, ROI) se traduce.
- Las versiones ES y EN se vinculan mediante `slugAlt` y hreflang en el sitemap.

### Vinculacion hreflang

Cada par de paginas ES/EN se conecta asi:

```
pagina ES: slug = "zona-romantica-propiedades", slugAlt = "zona-romantica-properties"
pagina EN: slug = "zona-romantica-properties", slugAlt = "zona-romantica-propiedades"
```

En el sitemap, cada URL incluye:

```xml
<xhtml:link rel="alternate" hreflang="es" href="...version-es..."/>
<xhtml:link rel="alternate" hreflang="en" href="...version-en..."/>
<xhtml:link rel="alternate" hreflang="x-default" href="...version-es..."/>
```

`x-default` siempre apunta a la version en espanol (mercado principal).

### Contenido que NO se traduce

- Paginas editoriales muy especificas del mercado mexicano (ej. tramites notariales detallados).
- Paginas con keywords de cola larga exclusivamente en espanol sin volumen en ingles.

---

## 6. Plan de internal linking

### Estructura de enlaces internos

```
Homepage
  |
  +-- /pseo/zona-romantica-propiedades/
  |     +-- Link a propiedades MLS en Zona Romantica
  |     +-- Link a guia de compra (Tipo C)
  |     +-- Link a condominios PV (Tipo B)
  |
  +-- /pseo/condominios-puerto-vallarta/
  |     +-- Links a paginas de zona con condominios
  |     +-- Link a guia de compra (Tipo C)
  |
  +-- /pseo/guia-comprar-propiedad-puerto-vallarta/
  |     +-- Links a todas las zonas principales
  |     +-- Link a proceso legal (Tipo C)
  |     +-- Link a WhatsApp CTA
  |
  +-- /blog/ (WordPress)
        +-- Links desde posts relevantes a paginas PSEO
```

### Reglas de enlazado

1. **Cada pagina Tipo A enlaza a:**
   - 2-3 paginas Tipo A de zonas cercanas
   - 1 pagina Tipo B relevante
   - 1 pagina Tipo C (guia general)
   - Propiedades MLS activas en esa zona (via data dinamica)

2. **Cada pagina Tipo B enlaza a:**
   - 3-5 paginas Tipo A de las zonas con ese tipo de propiedad
   - 1 pagina Tipo C relevante

3. **Cada pagina Tipo C enlaza a:**
   - 3-5 paginas Tipo A mas relevantes al tema
   - 1-2 paginas Tipo B
   - Posts del blog WordPress relacionados

4. **Desde el blog WordPress:**
   - Cada post sobre una zona incluye link a la pagina PSEO Tipo A correspondiente
   - Posts generales enlazan a paginas Tipo B y C

### Anchor text

- Usar variaciones naturales del keyword principal de la pagina destino.
- No repetir el mismo anchor text mas de 2 veces en todo el sitio.
- Incluir el nombre de la zona en los anchors para paginas Tipo A.

### Breadcrumbs

Todas las paginas PSEO incluyen breadcrumbs con schema:

```
Inicio > Propiedades > {Zona/Tipo} > {Pagina actual}
```

Esto refuerza la jerarquia tematica y facilita la navegacion.
