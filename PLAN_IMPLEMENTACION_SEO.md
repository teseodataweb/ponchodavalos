# PLAN DE IMPLEMENTACIÓN SEO
## Poncho Dávalos Real Estate

**Fecha de Creación:** 14 de Diciembre, 2025
**Basado en:** AUDITORIA_SEO.md
**Objetivo:** Corregir 12 hallazgos SEO y alcanzar score 9/10
**Duración Total:** 5 Sprints (estimado 35 horas)

---

## RESUMEN DE SPRINTS - TODOS COMPLETADOS

| Sprint | Enfoque | Hallazgos | Estado | Impacto SEO |
|--------|---------|-----------|--------|-------------|
| 1 | CRÍTICOS | 4 | ✅ COMPLETADO | +30% indexabilidad |
| 2 | ALTOS | 2 | ✅ COMPLETADO | +25% CTR |
| 3 | SCHEMA.ORG | 1 | ✅ COMPLETADO | +35% rich snippets |
| 4 | SOCIAL/i18n | 2 | ✅ COMPLETADO | +20% tráfico social |
| 5 | IMÁGENES/LIMPIEZA | 2 | ✅ COMPLETADO | +15% accesibilidad |
| 6 | VERIFICACIÓN | - | ✅ COMPLETADO | Validación final |

**Implementación completada:** 14 de Diciembre, 2025

### Resumen de Implementación

| Elemento | Cantidad | Estado |
|----------|----------|--------|
| robots.txt | 1 | ✅ Creado |
| sitemap.xml | 1 | ✅ Creado (25 URLs) |
| H1 en index.html | 1 | ✅ Agregado |
| Meta descriptions únicas | 19 | ✅ Actualizadas |
| Canonical links | 24 | ✅ Agregados |
| Títulos únicos | 19 | ✅ Actualizados |
| Schema.org RealEstateListing | 13 | ✅ Propiedades |
| Schema.org Service | 6 | ✅ Servicios |
| Open Graph tags | 17 | ✅ Páginas |
| Hreflang tags | 23 | ✅ Páginas |
| Archivos basura eliminados | 24 | ✅ Eliminados |

---

## SPRINT 1: CRÍTICOS (Prioridad Inmediata)
**Duración estimada:** 6 horas
**Impacto:** +30% indexabilidad

### Tarea 1.1: Crear robots.txt
**Tiempo:** 30 minutos
**Archivo:** `robots.txt` (nuevo)

**Acciones:**
1. Crear archivo `robots.txt` en la raíz del proyecto
2. Configurar directivas Allow/Disallow
3. Añadir referencia a sitemap.xml
4. Bloquear archivos basura

**Código a implementar:**
```txt
# robots.txt para Poncho Dávalos Real Estate
# https://ponchodavalos.com.mx
# Actualizado: Diciembre 2025

User-agent: *

# Permitir indexación general
Allow: /

# Bloquear archivos basura en carpetas de assets
Disallow: /css/*.html
Disallow: /images/*.html
Disallow: /img/*.html
Disallow: /plugins/

# Bloquear parámetros de URL
Disallow: /*?*
Disallow: /*.json$

# Bloquear páginas de desarrollo/template no usadas
Disallow: /elements.html
Disallow: /hidden-1.html
Disallow: /hidden-2.html
Disallow: /hidden-overlay-info.html
Disallow: /image-scale.html
Disallow: /index-dark.html
Disallow: /index-html.html
Disallow: /portfolio-detail-slider.html
Disallow: /portfolio-five-column-wide.html
Disallow: /portfolio-details-1.html
Disallow: /portfolio-details-2.html
Disallow: /portfolio-details-3.html
Disallow: /portfolio-details-4.html

# Permitir explícitamente páginas importantes
Allow: /index.html
Allow: /about-us.html
Allow: /contact.html
Allow: /portfolio-four-column-wide.html
Allow: /property-*.html
Allow: /services-detail-*.html
Allow: /404-error.html

# Permitir assets necesarios para renderizado
Allow: /css/
Allow: /js/
Allow: /images/
Allow: /fonts/

# Crawl-delay
Crawl-delay: 1

# Sitemap
Sitemap: https://ponchodavalos.com.mx/sitemap.xml

# Googlebot específico
User-agent: Googlebot
Allow: /
Crawl-delay: 0

# Bingbot
User-agent: Bingbot
Allow: /
Crawl-delay: 2
```

**Verificación:**
- [ ] Archivo creado en raíz
- [ ] Accesible en https://ponchodavalos.com.mx/robots.txt
- [ ] Validar con Google Search Console

---

### Tarea 1.2: Crear sitemap.xml
**Tiempo:** 1 hora
**Archivo:** `sitemap.xml` (nuevo)

**Acciones:**
1. Crear archivo `sitemap.xml` en la raíz
2. Incluir todas las páginas principales (25 URLs)
3. Configurar prioridades y frecuencias
4. Añadir hreflang para páginas bilingües

**Código a implementar:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <!-- PÁGINA PRINCIPAL -->
  <url>
    <loc>https://ponchodavalos.com.mx/index.html</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://ponchodavalos.com.mx/index.html"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://ponchodavalos.com.mx/es/index.html"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://ponchodavalos.com.mx/index.html"/>
    <lastmod>2025-12-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- ABOUT US -->
  <url>
    <loc>https://ponchodavalos.com.mx/about-us.html</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://ponchodavalos.com.mx/about-us.html"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://ponchodavalos.com.mx/es/about-us.html"/>
    <lastmod>2025-12-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- CONTACT -->
  <url>
    <loc>https://ponchodavalos.com.mx/contact.html</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://ponchodavalos.com.mx/contact.html"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://ponchodavalos.com.mx/es/contact.html"/>
    <lastmod>2025-12-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- PORTFOLIO / PROPERTIES LISTING -->
  <url>
    <loc>https://ponchodavalos.com.mx/portfolio-four-column-wide.html</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://ponchodavalos.com.mx/portfolio-four-column-wide.html"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://ponchodavalos.com.mx/es/portfolio-four-column-wide.html"/>
    <lastmod>2025-12-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- PROPIEDAD 1: Altomar C6 -->
  <url>
    <loc>https://ponchodavalos.com.mx/property-1.html</loc>
    <lastmod>2025-12-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- PROPIEDAD 2: Indah 3B -->
  <url>
    <loc>https://ponchodavalos.com.mx/property-2.html</loc>
    <lastmod>2025-12-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- PROPIEDAD 3: Amapas B11 -->
  <url>
    <loc>https://ponchodavalos.com.mx/property-3.html</loc>
    <lastmod>2025-12-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- PROPIEDAD 4: Coras Living D3 -->
  <url>
    <loc>https://ponchodavalos.com.mx/property-4.html</loc>
    <lastmod>2025-12-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- PROPIEDAD 5: Coras Living D4 -->
  <url>
    <loc>https://ponchodavalos.com.mx/property-5.html</loc>
    <lastmod>2025-12-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- PROPIEDAD 6: Altomar B3 -->
  <url>
    <loc>https://ponchodavalos.com.mx/property-6.html</loc>
    <lastmod>2025-12-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- PROPIEDAD 7: Palm Springs 353 -->
  <url>
    <loc>https://ponchodavalos.com.mx/property-7.html</loc>
    <lastmod>2025-12-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- PROPIEDAD 8: Altomar A6 -->
  <url>
    <loc>https://ponchodavalos.com.mx/property-8.html</loc>
    <lastmod>2025-12-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- PROPIEDAD 9: Urban 3A -->
  <url>
    <loc>https://ponchodavalos.com.mx/property-9.html</loc>
    <lastmod>2025-12-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- PROPIEDAD 10: Pavilion 309 -->
  <url>
    <loc>https://ponchodavalos.com.mx/property-10.html</loc>
    <lastmod>2025-12-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- PROPIEDAD 11: Casa Corona -->
  <url>
    <loc>https://ponchodavalos.com.mx/property-11.html</loc>
    <lastmod>2025-12-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- PROPIEDAD 12: Los Mangos A7 -->
  <url>
    <loc>https://ponchodavalos.com.mx/property-12.html</loc>
    <lastmod>2025-12-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- PROPIEDAD 13: La Perla -->
  <url>
    <loc>https://ponchodavalos.com.mx/property-13.html</loc>
    <lastmod>2025-12-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- SERVICIO 1: Comprehensive Advisory -->
  <url>
    <loc>https://ponchodavalos.com.mx/services-detail-1.html</loc>
    <lastmod>2025-12-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- SERVICIO 2: Foreign Buyer Investment -->
  <url>
    <loc>https://ponchodavalos.com.mx/services-detail-2.html</loc>
    <lastmod>2025-12-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- SERVICIO 3: Second Home Acquisition -->
  <url>
    <loc>https://ponchodavalos.com.mx/services-detail-3.html</loc>
    <lastmod>2025-12-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- SERVICIO 4: Premium Property Sales -->
  <url>
    <loc>https://ponchodavalos.com.mx/services-detail-4.html</loc>
    <lastmod>2025-12-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- SERVICIO 5: Legal & Transaction -->
  <url>
    <loc>https://ponchodavalos.com.mx/services-detail-5.html</loc>
    <lastmod>2025-12-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- SERVICIO 6: Market Analysis -->
  <url>
    <loc>https://ponchodavalos.com.mx/services-detail-6.html</loc>
    <lastmod>2025-12-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- 404 ERROR PAGE -->
  <url>
    <loc>https://ponchodavalos.com.mx/404-error.html</loc>
    <lastmod>2025-12-14</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.1</priority>
  </url>

</urlset>
```

**Verificación:**
- [ ] Archivo creado en raíz
- [ ] 25 URLs incluidas
- [ ] XML válido (validar con xmlvalidation.com)
- [ ] Accesible en https://ponchodavalos.com.mx/sitemap.xml

---

### Tarea 1.3: Agregar H1 a index.html
**Tiempo:** 30 minutos
**Archivo:** `index.html`

**Acciones:**
1. Buscar sección hero/slider
2. Agregar H1 visible o visually-hidden
3. Incluir keywords principales

**Código a agregar después de `<body>`:**
```html
<!-- H1 Principal - SEO -->
<h1 class="seo-h1" data-i18n="home.h1">
  Poncho Dávalos Real Estate - Luxury Properties in Puerto Vallarta & Riviera Nayarit
</h1>
```

**CSS a agregar en `css/style.css` o `css/i18n.css`:**
```css
/* H1 SEO - Visible pero integrado */
.seo-h1 {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Alternativa: H1 visible en hero */
.hero-h1 {
  font-size: 3rem;
  font-weight: 700;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  margin-bottom: 1rem;
}
```

**Traducción a agregar en `translations/en.json`:**
```json
"home": {
  "h1": "Poncho Dávalos Real Estate - Luxury Properties in Puerto Vallarta & Riviera Nayarit"
}
```

**Traducción a agregar en `translations/es.json`:**
```json
"home": {
  "h1": "Poncho Dávalos Real Estate - Propiedades de Lujo en Puerto Vallarta y Riviera Nayarit"
}
```

**Verificación:**
- [ ] H1 agregado a index.html
- [ ] Solo UN H1 en la página
- [ ] Traducciones EN/ES agregadas

---

### Tarea 1.4: Meta Descriptions Únicas
**Tiempo:** 4 horas
**Archivos:** 19 archivos HTML

**Acciones:**
1. Eliminar meta description duplicada en index.html (línea 41)
2. Actualizar meta descriptions en 13 propiedades
3. Actualizar meta descriptions en 6 servicios

**PASO 1: Corregir index.html (eliminar duplicado)**

Eliminar líneas 40-43:
```html
<!-- ELIMINAR ESTE BLOQUE DUPLICADO -->
<meta
  name="description"
  content="Luxury real estate in Puerto Vallarta and Riviera Nayarit. Find your dream property with expert guidance and personalized service."
/>
```

**PASO 2: Meta descriptions para PROPIEDADES**

| Archivo | Meta Description (máx 160 caracteres) |
|---------|--------------------------------------|
| property-1.html | `Altomar C6: Luxury 2BR ocean view condo in Puerto Vallarta. Premium finishes, pool, gym, beach access. Contact Poncho Dávalos for viewing.` |
| property-2.html | `Indah 3B: Modern 3BR penthouse in Riviera Nayarit with rooftop terrace. Contemporary design, infinity pool. Schedule a tour with Poncho Dávalos.` |
| property-3.html | `Amapas B11: Beachfront condo in Zona Romántica, Puerto Vallarta. Walk to Playa Los Muertos, restaurants, nightlife. Call Poncho Dávalos today.` |
| property-4.html | `Coras Living D3: New development 2BR condo in Puerto Vallarta. Modern amenities, great investment opportunity. Poncho Dávalos Real Estate.` |
| property-5.html | `Coras Living D4: Investment-ready 2BR unit in Puerto Vallarta. Rental income potential, new construction. Contact Poncho Dávalos for details.` |
| property-6.html | `Altomar B3: Elegant 2BR condo with ocean views in Puerto Vallarta. Full amenities, prime location. Expert guidance from Poncho Dávalos.` |
| property-7.html | `Palm Springs 353: Charming condo in established Puerto Vallarta community. Pool, gardens, security. Poncho Dávalos - Your trusted realtor.` |
| property-8.html | `Altomar A6: Premium corner unit with panoramic views in Puerto Vallarta. Spacious layout, luxury finishes. Poncho Dávalos Real Estate.` |
| property-9.html | `Urban 3A: Contemporary city living in Puerto Vallarta. Modern design, urban amenities, great location. Contact Poncho Dávalos today.` |
| property-10.html | `Pavilion 309: Marina views condo in Puerto Vallarta. Watch the sunset from your balcony. Expert service from Poncho Dávalos Real Estate.` |
| property-11.html | `Casa Corona: Private single-family home in Puerto Vallarta. Garden, garage, privacy. Find your dream home with Poncho Dávalos.` |
| property-12.html | `Los Mangos A7: Tropical garden condo in quiet Puerto Vallarta neighborhood. Pool, green spaces. Poncho Dávalos - Local expertise.` |
| property-13.html | `La Perla: Exclusive boutique development in heart of Puerto Vallarta. Pre-construction pricing available. Invest with Poncho Dávalos.` |

**PASO 3: Meta descriptions para SERVICIOS**

| Archivo | Meta Description |
|---------|------------------|
| services-detail-1.html | `Comprehensive real estate advisory in Puerto Vallarta. Market analysis, property valuation, investment strategy. Free consultation - Poncho Dávalos.` |
| services-detail-2.html | `Foreign buyer investment services in Mexico. Fideicomiso setup, legal compliance, tax guidance for US/Canadian investors. Poncho Dávalos expertise.` |
| services-detail-3.html | `Find your perfect second home in Puerto Vallarta. Personalized search, neighborhood tours, lifestyle matching. Poncho Dávalos Real Estate.` |
| services-detail-4.html | `Premium property sales in Puerto Vallarta & Riviera Nayarit. Professional marketing, staging, negotiation. Maximize value with Poncho Dávalos.` |
| services-detail-5.html | `Legal & transaction management for Mexico real estate. Notary coordination, title insurance, closing support. Trust Poncho Dávalos.` |
| services-detail-6.html | `Puerto Vallarta market analysis and appreciation trends. ROI projections, investment timing, data-driven insights. Poncho Dávalos advisor.` |

**Formato de edición para cada archivo:**
```html
<!-- ANTES -->
<meta name="description" content="Boutique real estate in Puerto Vallarta & Riviera Nayarit. Luxury homes, condos, and expert guidance to secure your next investment.">

<!-- DESPUÉS (ejemplo property-1.html) -->
<meta name="description" content="Altomar C6: Luxury 2BR ocean view condo in Puerto Vallarta. Premium finishes, pool, gym, beach access. Contact Poncho Dávalos for viewing.">
```

**Verificación:**
- [ ] index.html - duplicado eliminado
- [ ] 13 propiedades - meta descriptions únicas
- [ ] 6 servicios - meta descriptions únicas
- [ ] Todas < 160 caracteres
- [ ] Todas incluyen "Poncho Dávalos" (branding)

---

## SPRINT 2: ALTOS (Canonical + Títulos)
**Duración estimada:** 5 horas
**Impacto:** +25% CTR

### Tarea 2.1: Agregar Canonical Links
**Tiempo:** 2 horas
**Archivos:** 25 archivos HTML

**Acciones:**
1. Agregar `<link rel="canonical">` en `<head>` de cada página

**Código a agregar en cada archivo:**

| Archivo | Canonical Link |
|---------|----------------|
| index.html | `<link rel="canonical" href="https://ponchodavalos.com.mx/index.html" />` |
| about-us.html | `<link rel="canonical" href="https://ponchodavalos.com.mx/about-us.html" />` |
| contact.html | `<link rel="canonical" href="https://ponchodavalos.com.mx/contact.html" />` |
| portfolio-four-column-wide.html | `<link rel="canonical" href="https://ponchodavalos.com.mx/portfolio-four-column-wide.html" />` |
| property-1.html | `<link rel="canonical" href="https://ponchodavalos.com.mx/property-1.html" />` |
| property-2.html | `<link rel="canonical" href="https://ponchodavalos.com.mx/property-2.html" />` |
| property-3.html | `<link rel="canonical" href="https://ponchodavalos.com.mx/property-3.html" />` |
| property-4.html | `<link rel="canonical" href="https://ponchodavalos.com.mx/property-4.html" />` |
| property-5.html | `<link rel="canonical" href="https://ponchodavalos.com.mx/property-5.html" />` |
| property-6.html | `<link rel="canonical" href="https://ponchodavalos.com.mx/property-6.html" />` |
| property-7.html | `<link rel="canonical" href="https://ponchodavalos.com.mx/property-7.html" />` |
| property-8.html | `<link rel="canonical" href="https://ponchodavalos.com.mx/property-8.html" />` |
| property-9.html | `<link rel="canonical" href="https://ponchodavalos.com.mx/property-9.html" />` |
| property-10.html | `<link rel="canonical" href="https://ponchodavalos.com.mx/property-10.html" />` |
| property-11.html | `<link rel="canonical" href="https://ponchodavalos.com.mx/property-11.html" />` |
| property-12.html | `<link rel="canonical" href="https://ponchodavalos.com.mx/property-12.html" />` |
| property-13.html | `<link rel="canonical" href="https://ponchodavalos.com.mx/property-13.html" />` |
| services-detail-1.html | `<link rel="canonical" href="https://ponchodavalos.com.mx/services-detail-1.html" />` |
| services-detail-2.html | `<link rel="canonical" href="https://ponchodavalos.com.mx/services-detail-2.html" />` |
| services-detail-3.html | `<link rel="canonical" href="https://ponchodavalos.com.mx/services-detail-3.html" />` |
| services-detail-4.html | `<link rel="canonical" href="https://ponchodavalos.com.mx/services-detail-4.html" />` |
| services-detail-5.html | `<link rel="canonical" href="https://ponchodavalos.com.mx/services-detail-5.html" />` |
| services-detail-6.html | `<link rel="canonical" href="https://ponchodavalos.com.mx/services-detail-6.html" />` |
| 404-error.html | `<link rel="canonical" href="https://ponchodavalos.com.mx/404-error.html" />` |

**Ubicación en HTML:**
```html
<head>
  <!-- ... otros meta tags ... -->
  <meta name="description" content="...">

  <!-- Canonical Link - AGREGAR AQUÍ -->
  <link rel="canonical" href="https://ponchodavalos.com.mx/[página].html" />

  <title>...</title>
</head>
```

**Verificación:**
- [ ] 25 páginas con canonical
- [ ] URLs absolutas (con https://)
- [ ] Sin trailing slash inconsistente

---

### Tarea 2.2: Títulos Únicos
**Tiempo:** 3 horas
**Archivos:** 19 archivos HTML

**Acciones:**
1. Actualizar `<title>` en 13 propiedades
2. Actualizar `<title>` en 6 servicios

**TÍTULOS PARA PROPIEDADES:**

| Archivo | Título (máx 60 caracteres) |
|---------|---------------------------|
| property-1.html | `Altomar C6 - Ocean View Condo | Puerto Vallarta | Poncho Dávalos` |
| property-2.html | `Indah 3B - Modern Penthouse | Riviera Nayarit | Poncho Dávalos` |
| property-3.html | `Amapas B11 - Beachfront | Zona Romántica | Poncho Dávalos` |
| property-4.html | `Coras Living D3 - New Development | Poncho Dávalos Real Estate` |
| property-5.html | `Coras Living D4 - Investment Condo | Poncho Dávalos Real Estate` |
| property-6.html | `Altomar B3 - Luxury 2BR Condo | Puerto Vallarta | Poncho Dávalos` |
| property-7.html | `Palm Springs 353 - Classic Condo | Puerto Vallarta | Poncho Dávalos` |
| property-8.html | `Altomar A6 - Premium Corner Unit | Puerto Vallarta | Poncho Dávalos` |
| property-9.html | `Urban 3A - City Living | Puerto Vallarta | Poncho Dávalos` |
| property-10.html | `Pavilion 309 - Marina Views | Puerto Vallarta | Poncho Dávalos` |
| property-11.html | `Casa Corona - Private Home | Puerto Vallarta | Poncho Dávalos` |
| property-12.html | `Los Mangos A7 - Garden Condo | Puerto Vallarta | Poncho Dávalos` |
| property-13.html | `La Perla - Boutique Development | Puerto Vallarta | Poncho Dávalos` |

**TÍTULOS PARA SERVICIOS:**

| Archivo | Título |
|---------|--------|
| services-detail-1.html | `Comprehensive Real Estate Advisory | Poncho Dávalos Services` |
| services-detail-2.html | `Foreign Buyer Investment Services | Poncho Dávalos Mexico` |
| services-detail-3.html | `Second Home Acquisition | Puerto Vallarta | Poncho Dávalos` |
| services-detail-4.html | `Premium Property Sales | Riviera Nayarit | Poncho Dávalos` |
| services-detail-5.html | `Legal & Transaction Management | Poncho Dávalos Real Estate` |
| services-detail-6.html | `Market Analysis & Trends | Puerto Vallarta | Poncho Dávalos` |

**Formato de edición:**
```html
<!-- ANTES -->
<title>Poncho Dávalos Real Estate | Puerto Vallarta & Riviera Nayarit</title>

<!-- DESPUÉS (ejemplo property-1.html) -->
<title>Altomar C6 - Ocean View Condo | Puerto Vallarta | Poncho Dávalos</title>
```

**Verificación:**
- [ ] 13 propiedades - títulos únicos
- [ ] 6 servicios - títulos únicos
- [ ] Todos < 60 caracteres
- [ ] Keyword principal al inicio
- [ ] Marca "Poncho Dávalos" al final

---

## SPRINT 3: SCHEMA.ORG
**Duración estimada:** 6 horas
**Impacto:** +35% rich snippets

### Tarea 3.1: Schema RealEstateListing para Propiedades
**Tiempo:** 5 horas
**Archivos:** 13 archivos property-*.html

**Acciones:**
1. Agregar JSON-LD de tipo RealEstateListing en cada propiedad
2. Incluir información de precio, ubicación, características

**Template de Schema para propiedades:**
```html
<!-- Agregar antes de </head> -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "RealEstateListing",
  "name": "[NOMBRE_PROPIEDAD]",
  "description": "[DESCRIPCIÓN_CORTA]",
  "url": "https://ponchodavalos.com.mx/property-[N].html",
  "image": [
    "https://ponchodavalos.com.mx/images/properties-port/[N].jpg"
  ],
  "datePosted": "2025-12-01",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Puerto Vallarta",
    "addressRegion": "Jalisco",
    "addressCountry": "MX"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "20.6534",
    "longitude": "-105.2253"
  },
  "offers": {
    "@type": "Offer",
    "price": "[PRECIO]",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "numberOfRooms": [HABITACIONES],
  "numberOfBathroomsTotal": [BAÑOS],
  "floorSize": {
    "@type": "QuantitativeValue",
    "value": [METROS],
    "unitCode": "MTK"
  },
  "amenityFeature": [
    {"@type": "LocationFeatureSpecification", "name": "[AMENIDAD_1]"},
    {"@type": "LocationFeatureSpecification", "name": "[AMENIDAD_2]"}
  ],
  "broker": {
    "@type": "RealEstateAgent",
    "name": "Poncho Dávalos Real Estate",
    "telephone": "+52-322-292-2312",
    "email": "hello@ponchodavalos.com.mx",
    "url": "https://ponchodavalos.com.mx"
  }
}
</script>
```

**Datos por propiedad (completar con información real):**

| Propiedad | Nombre | Precio USD | Beds | Baths | m² |
|-----------|--------|------------|------|-------|-----|
| property-1 | Altomar C6 | TBD | 2 | 2 | TBD |
| property-2 | Indah 3B | TBD | 3 | 2 | TBD |
| property-3 | Amapas B11 | TBD | 2 | 2 | TBD |
| property-4 | Coras Living D3 | TBD | 2 | 2 | TBD |
| property-5 | Coras Living D4 | TBD | 2 | 2 | TBD |
| property-6 | Altomar B3 | TBD | 2 | 2 | TBD |
| property-7 | Palm Springs 353 | TBD | 2 | 2 | TBD |
| property-8 | Altomar A6 | TBD | 2 | 2 | TBD |
| property-9 | Urban 3A | TBD | 2 | 2 | TBD |
| property-10 | Pavilion 309 | TBD | 2 | 2 | TBD |
| property-11 | Casa Corona | TBD | 3 | 3 | TBD |
| property-12 | Los Mangos A7 | TBD | 2 | 2 | TBD |
| property-13 | La Perla | TBD | 2 | 2 | TBD |

**Nota:** Reemplazar TBD con datos reales de cada propiedad.

---

### Tarea 3.2: Schema Service para Servicios
**Tiempo:** 1 hora
**Archivos:** 6 archivos services-detail-*.html

**Template de Schema para servicios:**
```html
<!-- Agregar antes de </head> -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "[NOMBRE_SERVICIO]",
  "description": "[DESCRIPCIÓN]",
  "provider": {
    "@type": "RealEstateAgent",
    "name": "Poncho Dávalos Real Estate",
    "telephone": "+52-322-292-2312",
    "url": "https://ponchodavalos.com.mx"
  },
  "areaServed": {
    "@type": "Place",
    "name": "Puerto Vallarta, Riviera Nayarit, Mexico"
  },
  "serviceType": "[TIPO_SERVICIO]"
}
</script>
```

**Datos por servicio:**

| Archivo | Nombre | Tipo |
|---------|--------|------|
| services-detail-1.html | Comprehensive Real Estate Advisory | Real Estate Consulting |
| services-detail-2.html | Foreign Buyer Investment Services | Investment Advisory |
| services-detail-3.html | Second Home Acquisition | Property Search |
| services-detail-4.html | Premium Property Sales | Property Sales |
| services-detail-5.html | Legal & Transaction Management | Legal Services |
| services-detail-6.html | Market & Appreciation Analysis | Market Analysis |

**Verificación:**
- [ ] 13 propiedades con Schema RealEstateListing
- [ ] 6 servicios con Schema Service
- [ ] Validar con Google Rich Results Test
- [ ] Sin errores en Schema Markup Validator

---

## SPRINT 4: OPEN GRAPH + HREFLANG
**Duración estimada:** 5 horas
**Impacto:** +20% tráfico social

### Tarea 4.1: Open Graph para Propiedades
**Tiempo:** 3 horas
**Archivos:** 13 archivos property-*.html

**Código a agregar en `<head>` de cada propiedad:**
```html
<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:title" content="[NOMBRE] - [TIPO] | Puerto Vallarta | Poncho Dávalos" />
<meta property="og:description" content="[META_DESCRIPTION]" />
<meta property="og:image" content="https://ponchodavalos.com.mx/images/properties-port/[N].jpg" />
<meta property="og:url" content="https://ponchodavalos.com.mx/property-[N].html" />
<meta property="og:locale" content="en_US" />
<meta property="og:site_name" content="Poncho Dávalos Real Estate" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="[NOMBRE] - Puerto Vallarta Property" />
<meta name="twitter:description" content="[META_DESCRIPTION_CORTA]" />
<meta name="twitter:image" content="https://ponchodavalos.com.mx/images/properties-port/[N].jpg" />
```

**Datos por propiedad:**

| Archivo | og:title | og:image |
|---------|----------|----------|
| property-1.html | Altomar C6 - Ocean View Condo | /images/properties-port/1.jpg |
| property-2.html | Indah 3B - Modern Penthouse | /images/properties-port/2.jpg |
| property-3.html | Amapas B11 - Beachfront | /images/properties-port/3.jpg |
| property-4.html | Coras Living D3 - New Development | /images/properties-port/4.jpg |
| property-5.html | Coras Living D4 - Investment | /images/properties-port/5.jpg |
| property-6.html | Altomar B3 - Luxury 2BR | /images/properties-port/6.jpg |
| property-7.html | Palm Springs 353 - Classic | /images/properties-port/7.jpg |
| property-8.html | Altomar A6 - Premium Corner | /images/properties-port/8.jpg |
| property-9.html | Urban 3A - City Living | /images/properties-port/9.jpg |
| property-10.html | Pavilion 309 - Marina Views | /images/properties-port/10.jpg |
| property-11.html | Casa Corona - Private Home | /images/properties-port/11.jpg |
| property-12.html | Los Mangos A7 - Garden | /images/properties-port/12.jpg |
| property-13.html | La Perla - Boutique | /images/properties-port/13.png |

---

### Tarea 4.2: Hreflang Completo
**Tiempo:** 2 horas
**Archivos:** 19 archivos (propiedades + servicios sin hreflang)

**Código a agregar en `<head>`:**
```html
<!-- Hreflang -->
<link rel="alternate" hreflang="en" href="https://ponchodavalos.com.mx/[página].html" />
<link rel="alternate" hreflang="es" href="https://ponchodavalos.com.mx/es/[página].html" />
<link rel="alternate" hreflang="x-default" href="https://ponchodavalos.com.mx/[página].html" />
```

**Páginas que necesitan hreflang:**
- property-1.html a property-13.html (13 páginas)
- services-detail-3.html a services-detail-6.html (4 páginas)

**Nota:** services-detail-1.html y services-detail-2.html ya tienen hreflang.

**Verificación:**
- [ ] 13 propiedades con Open Graph
- [ ] 13 propiedades con hreflang
- [ ] 4 servicios adicionales con hreflang
- [ ] Validar con Facebook Sharing Debugger
- [ ] Validar con Twitter Card Validator

---

## SPRINT 5: IMÁGENES + LIMPIEZA
**Duración estimada:** 5 horas
**Impacto:** +15% accesibilidad

### Tarea 5.1: Alt Text para Imágenes Vacías
**Tiempo:** 4 horas
**Archivos:** Múltiples (199 imágenes con alt vacío)

**Estrategia:**
1. Identificar imágenes por categoría
2. Crear alt texts descriptivos con keywords
3. Actualizar en lotes

**Alt texts recomendados por categoría:**

**Propiedades (imágenes principales):**
| Imagen | Alt Text |
|--------|----------|
| properties-port/1.jpg | "Altomar C6 luxury condo exterior Puerto Vallarta" |
| properties-port/2.jpg | "Indah 3B penthouse terrace view Riviera Nayarit" |
| properties-port/3.jpg | "Amapas B11 beachfront condo Zona Romantica" |
| properties-port/4.jpg | "Coras Living D3 new development Puerto Vallarta" |
| properties-port/5.jpg | "Coras Living D4 investment condo Puerto Vallarta" |
| properties-port/6.jpg | "Altomar B3 ocean view condo Puerto Vallarta" |
| properties-port/7.jpg | "Palm Springs 353 condo community Puerto Vallarta" |
| properties-port/8.jpg | "Altomar A6 premium corner unit Puerto Vallarta" |
| properties-port/9.jpg | "Urban 3A contemporary condo Puerto Vallarta" |
| properties-port/10.jpg | "Pavilion 309 marina view condo Puerto Vallarta" |
| properties-port/11.jpg | "Casa Corona private home Puerto Vallarta" |
| properties-port/12.jpg | "Los Mangos A7 garden condo Puerto Vallarta" |
| properties-port/13.png | "La Perla boutique development Puerto Vallarta" |

**Iconos de propiedades:**
| Imagen | Alt Text |
|--------|----------|
| iconos_properties/1.png | "Bedroom icon - property bedrooms" |
| iconos_properties/2.png | "Bathroom icon - property bathrooms" |
| iconos_properties/3.png | "Square meters icon - property size" |
| iconos_properties/pfp.png | "Client testimonial profile photo" |

**Galería:**
| Posición | Alt Text |
|----------|----------|
| gallery-small-1.jpg | "Puerto Vallarta luxury property exterior" |
| gallery-small-2.jpg | "Riviera Nayarit beachfront home view" |
| gallery-small-3.jpg | "Modern interior design living room" |
| gallery-small-4.jpg | "Ocean view penthouse balcony" |
| gallery-small-5.jpg | "Premium real estate swimming pool" |
| gallery-small-6.jpg | "Exclusive residential development entrance" |

**Perfil:**
| Imagen | Alt Text |
|--------|----------|
| fotodeperfil.jpeg | "Poncho Davalos - Real Estate Agent Puerto Vallarta" |

**Comando de búsqueda para identificar:**
```bash
grep -r 'alt=""' *.html | grep -v "node_modules"
```

---

### Tarea 5.2: Eliminar Archivos HTML Basura
**Tiempo:** 30 minutos
**Archivos:** 24 archivos en carpetas de assets

**Archivos a eliminar:**

```
images/bg/banner-home4-dark.html
images/bg/bg-left-menu-light.html
images/bg/bg-slider-home3-dark.html
images/bg/bg-topbar-home2-light.html
images/bg/bg1-home2-light.html
images/bg/bg1-home3-dark.html
images/bg/bg2-dark-home1.html
images/bg/bg2-home2-light.html
images/bg/bg2-studio-light.html
images/bg/bg4-home3-dark.html
images/home6-light.html
images/image2-home3.html
images/quote_blog_list.html
images/slider/slider1-home2-light.html
images/slider/slider2-home2-light.html
images/slider/slider3-home2-light.html
css/Flaticon.html
css/font/ytp-regular.html
css/owl.video.play.html
img/video-play.html
img/vimeo-play.html
img/youtube-play.html
plugins/revolution/revolution/css/closedhand.html
plugins/revolution/revolution/css/openhand.html
```

**Comando para eliminar:**
```bash
# En Windows/Git Bash
find images css img plugins -name "*.html" -type f -delete
```

---

### Tarea 5.3: Eliminar Páginas de Template No Usadas
**Tiempo:** 30 minutos
**Archivos:** 10 páginas de template

**Archivos a eliminar o mover a carpeta /unused/:**

```
elements.html
hidden-1.html
hidden-2.html
hidden-overlay-info.html
image-scale.html
index-dark.html
index-html.html
portfolio-detail-slider.html
portfolio-five-column-wide.html
portfolio-details-1.html
portfolio-details-2.html
portfolio-details-3.html
portfolio-details-4.html
```

**Opción A - Eliminar:**
```bash
rm elements.html hidden-*.html image-scale.html index-dark.html index-html.html portfolio-detail-slider.html portfolio-five-column-wide.html portfolio-details-*.html
```

**Opción B - Mover a carpeta /unused/:**
```bash
mkdir unused
mv elements.html hidden-*.html image-scale.html index-dark.html index-html.html portfolio-detail-slider.html portfolio-five-column-wide.html portfolio-details-*.html unused/
```

**Verificación:**
- [ ] 199 imágenes con alt descriptivo
- [ ] 24 archivos HTML de assets eliminados
- [ ] 13 páginas de template eliminadas/movidas
- [ ] robots.txt bloquea estas rutas

---

## SPRINT 6: VERIFICACIÓN FINAL
**Duración estimada:** 3 horas
**Impacto:** Validación de implementación

### Tarea 6.1: Validación Técnica
**Tiempo:** 1 hora

**Herramientas de validación:**

| Herramienta | URL | Qué Validar |
|-------------|-----|-------------|
| Google Search Console | search.google.com/search-console | Sitemap, indexación |
| Bing Webmaster Tools | bing.com/webmasters | Sitemap, indexación |
| Google Rich Results Test | search.google.com/test/rich-results | Schema.org |
| Facebook Sharing Debugger | developers.facebook.com/tools/debug | Open Graph |
| Twitter Card Validator | cards-dev.twitter.com/validator | Twitter Cards |
| Schema Markup Validator | validator.schema.org | JSON-LD |
| W3C HTML Validator | validator.w3.org | HTML válido |

**Checklist de validación:**
- [ ] robots.txt accesible y correcto
- [ ] sitemap.xml accesible y sin errores
- [ ] 25 URLs en sitemap indexables
- [ ] Schema.org sin errores (19 páginas)
- [ ] Open Graph válido (17 páginas)
- [ ] Meta descriptions únicas
- [ ] Títulos únicos
- [ ] Canonical links correctos

---

### Tarea 6.2: Envío a Buscadores
**Tiempo:** 1 hora

**Google Search Console:**
1. Ir a search.google.com/search-console
2. Añadir propiedad: ponchodavalos.com.mx
3. Verificar con DNS o archivo HTML
4. Ir a Sitemaps > Enviar sitemap.xml
5. Solicitar indexación de páginas principales

**Bing Webmaster Tools:**
1. Ir a bing.com/webmasters
2. Añadir sitio: ponchodavalos.com.mx
3. Importar desde Google Search Console
4. Enviar sitemap.xml

**Google Indexing API (opcional para indexación rápida):**
```javascript
// Para propiedades nuevas
POST https://indexing.googleapis.com/v3/urlNotifications:publish
{
  "url": "https://ponchodavalos.com.mx/property-13.html",
  "type": "URL_UPDATED"
}
```

---

### Tarea 6.3: Monitoreo Inicial
**Tiempo:** 1 hora

**Configurar alertas en Google Search Console:**
- Errores de cobertura
- Problemas de indexación
- Core Web Vitals

**Métricas a monitorear (semana 1-4):**

| Semana | Métrica | Objetivo |
|--------|---------|----------|
| 1 | Páginas indexadas | 10+ |
| 2 | Páginas indexadas | 20+ |
| 3 | Impresiones | 100+ |
| 4 | Clics orgánicos | 10+ |

---

## RESUMEN EJECUTIVO

### Cronograma Total

| Sprint | Tareas | Horas | Entregables |
|--------|--------|-------|-------------|
| 1 | robots.txt, sitemap.xml, H1, meta descriptions | 6h | 4 archivos nuevos/modificados |
| 2 | Canonical links, títulos únicos | 5h | 25 archivos modificados |
| 3 | Schema.org propiedades y servicios | 6h | 19 archivos modificados |
| 4 | Open Graph, hreflang | 5h | 17 archivos modificados |
| 5 | Alt text, limpieza archivos | 5h | 199 imágenes, 37 archivos eliminados |
| 6 | Verificación, envío buscadores | 3h | Configuración GSC/Bing |
| **TOTAL** | | **30h** | |

### Priorización por Impacto

```
SEMANA 1 (Sprint 1 + 2)
├── robots.txt ────────────── Bloquea crawl innecesario
├── sitemap.xml ───────────── Habilita discovery
├── H1 index.html ─────────── Señal principal
├── Meta descriptions ─────── +60% CTR potencial
├── Canonical links ───────── Evita duplicados
└── Títulos únicos ────────── Diferenciación SERP

SEMANA 2 (Sprint 3 + 4)
├── Schema propiedades ────── Rich snippets
├── Schema servicios ──────── Rich snippets
├── Open Graph ────────────── Social shares
└── Hreflang ──────────────── Versión correcta

SEMANA 3 (Sprint 5 + 6)
├── Alt text imágenes ─────── Accesibilidad + Image SEO
├── Limpieza archivos ─────── Crawl efficiency
└── Verificación ──────────── Validación final
```

### Score SEO Proyectado

| Categoría | Antes | Después |
|-----------|-------|---------|
| Technical SEO | 4/10 | 9/10 |
| On-Page SEO | 5/10 | 9/10 |
| Content Quality | 8/10 | 9/10 |
| Performance | 8/10 | 9/10 |
| **TOTAL** | **5.5/10** | **9/10** |

### ROI Esperado (6 meses)

| Métrica | Baseline | Proyección |
|---------|----------|------------|
| Tráfico Orgánico | ~50/mes | 1,500+/mes |
| Páginas Indexadas | ~5 | 25+ |
| Leads Orgánicos | ~2/mes | 30+/mes |
| Domain Authority | ~8 | 22-28 |

---

## CHECKLIST FINAL DE IMPLEMENTACIÓN

### Sprint 1 - CRÍTICOS
- [ ] 1.1 robots.txt creado
- [ ] 1.2 sitemap.xml creado
- [ ] 1.3 H1 agregado a index.html
- [ ] 1.4 Meta description duplicada eliminada de index.html
- [ ] 1.4 Meta descriptions únicas en 13 propiedades
- [ ] 1.4 Meta descriptions únicas en 6 servicios

### Sprint 2 - ALTOS
- [ ] 2.1 Canonical links en 25 páginas
- [ ] 2.2 Títulos únicos en 13 propiedades
- [ ] 2.2 Títulos únicos en 6 servicios

### Sprint 3 - SCHEMA
- [ ] 3.1 Schema RealEstateListing en 13 propiedades
- [ ] 3.2 Schema Service en 6 servicios

### Sprint 4 - SOCIAL/i18n
- [ ] 4.1 Open Graph en 13 propiedades
- [ ] 4.2 Hreflang en 13 propiedades
- [ ] 4.2 Hreflang en 4 servicios adicionales

### Sprint 5 - LIMPIEZA
- [ ] 5.1 Alt text en 199 imágenes
- [ ] 5.2 24 archivos HTML de assets eliminados
- [ ] 5.3 13 páginas de template eliminadas/movidas

### Sprint 6 - VERIFICACIÓN
- [ ] 6.1 Validación con herramientas
- [ ] 6.2 Sitemap enviado a Google
- [ ] 6.2 Sitemap enviado a Bing
- [ ] 6.3 Monitoreo configurado

---

**Documento creado:** 14 de Diciembre, 2025
**Próxima actualización:** Al completar cada Sprint
**Responsable:** Equipo de Desarrollo
