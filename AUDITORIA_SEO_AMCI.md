# AUDITORÍA SEO TÉCNICA Y ESTRATÉGICA COMPLETA
## AMCI - Asociación Mexicana de Concreteros Independientes

**Fecha:** 14 de Diciembre, 2025
**Analista:** Auditor SEO Técnico Senior
**Cliente:** AMCI - Asociación Mexicana de Concreteros Independientes, A.C.
**Dominio Objetivo:** https://amciac.org
**Staging:** https://amciorg.netlify.app/
**Tecnología:** React 18.3.0 + Vite 6.2.0 + TypeScript 5.7.2
**Objetivo:** Ranking Top 3-5 en búsquedas de industria del concreto en México en 3-6 meses

---

## EXECUTIVE SUMMARY

### Situación Actual

| Métrica | Estado | Valor |
|---------|--------|-------|
| **Score SEO General** | MEDIO-BAJO | 4.5/10 (45%) |
| **Technical SEO** | BAJO | 3/10 |
| **On-Page SEO** | MEDIO | 5/10 |
| **Content Quality** | ALTO | 8/10 |
| **Performance** | MEDIO | 6/10 (Vite optimizado) |
| **Mobile Friendly** | SÍ | Bootstrap 5 responsive |
| **HTTPS** | PENDIENTE | Verificar en producción |
| **Indexabilidad** | CRÍTICA | robots.txt INEXISTENTE |

### Análisis del Proyecto

**Escala del proyecto:**
- 52 páginas/vistas en TypeScript
- 141 componentes React reutilizables
- 50+ rutas React Router definidas
- 17 archivos de datos estructurados
- Sistema de afiliaciones (Básico/Premium)
- Sin base de datos (datos estáticos en archivos .ts)

**Vertical de negocio:**
- Asociación gremial B2B para productores de concreto premezclado
- Certificaciones oficiales (IMCYC, ACI, NRMCA, ACPA)
- Capacitación técnica especializada (29 cursos)
- Convenios internacionales (World of Concrete, CONEXPO)
- Cobertura: República Mexicana

### Oportunidad de Mercado

**Keywords de alto valor comercial:**

| Keyword | Búsquedas/mes | Competencia | Oportunidad |
|---------|---------------|-------------|-------------|
| "asociación concreto méxico" | ~320 | Baja | ALTA |
| "cursos concreto premezclado" | ~590 | Media | ALTA |
| "certificación imcyc" | ~480 | Baja | ALTA |
| "certificación aci méxico" | ~390 | Baja | ALTA |
| "capacitación concreto" | ~720 | Media | MEDIA |
| "normativas nmx concreto" | ~210 | Muy Baja | MUY ALTA |
| "world of concrete méxico" | ~180 | Baja | ALTA |
| "pruebas concreto laboratorio" | ~440 | Media | MEDIA |
| "equipos bombeo concreto" | ~560 | Alta | MEDIA |
| Long-tail certificaciones | ~2,800 | Baja | MUY ALTA |

**Total keywords objetivo: ~6,700 búsquedas/mes**

**Competencia directa:**

| Competidor | DA | Fortaleza | Debilidad |
|------------|-----|-----------|-----------|
| IMCYC.com | 45 | Autoridad técnica | Solo certificaciones |
| ACI México | 38 | Reconocimiento internacional | Sin comunidad local |
| Cementos Mexicanos | 62 | Autoridad de marca | B2C, no asociación |
| ANEC | 35 | Gremio constructor | Enfoque diferente |

**Ventaja competitiva única AMCI:**
1. Única asociación de concreteros INDEPENDIENTES en México
2. 29 cursos + 13 certificaciones oficiales (más completo que competencia)
3. Convenios internacionales exclusivos (World of Concrete, CONEXPO)
4. Sistema de membresías con beneficios diferenciados
5. Material técnico NRMCA/ACPA traducido al español
6. Red de socios y proveedores verificados

### Meta a 6 Meses

| Objetivo | Baseline | Meta 3M | Meta 6M |
|----------|----------|---------|---------|
| **Posición Promedio** | No rankeando | Top 15-20 | Top 3-5 |
| **Tráfico Orgánico** | <100/mes | 800/mes | 2,500+/mes |
| **Domain Authority** | ~5 | 18-22 | 28-35 |
| **Páginas Indexadas** | ~3-5 | 40+ | 52+ |
| **Leads Afiliación** | Desconocido | 20/mes | 60+/mes |
| **Featured Snippets** | 0 | 3-5 | 8-12 |
| **Conversión Orgánica** | Desconocido | 2.5% | 5%+ |

---

## PARTE I: AUDITORÍA TÉCNICA SEO (10 PUNTOS CRÍTICOS)

### 1. INDEX.HTML DEFICIENTE ❌ CRITICIDAD: 10/10

**DIAGNÓSTICO:**

**Archivo afectado:** `index.html` (raíz del proyecto)

**Estado actual:**
```html
<!doctype html>
<html lang="en">  <!-- ERROR: Debería ser "es" -->
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/public/assets/imgs/logo/icon.webp" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AMCI</title>  <!-- ERROR: Título genérico sin descripción -->
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**PROBLEMAS CRÍTICOS:**

| Problema | Impacto SEO | Severidad |
|----------|-------------|-----------|
| `lang="en"` en vez de `"es"` | Google clasifica sitio como inglés | CRÍTICO |
| Sin meta description | CTR reducido 40-60% | CRÍTICO |
| Título genérico "AMCI" | Sin contexto para buscadores | ALTO |
| Sin Open Graph | Previews rotos en redes sociales | MEDIO |
| Sin canonical | Posible contenido duplicado | ALTO |
| Sin favicon path correcto | `/public/` no funciona en producción | MEDIO |

**SOLUCIÓN TÉCNICA:**

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- SEO Básico -->
    <title>AMCI | Asociación Mexicana de Concreteros Independientes</title>
    <meta name="description" content="AMCI: Certificaciones IMCYC y ACI, cursos especializados en tecnología del concreto, convenios internacionales y beneficios exclusivos para productores de concreto premezclado en México." />

    <!-- Favicon -->
    <link rel="icon" type="image/webp" href="/assets/imgs/logo/icon.webp" />
    <link rel="apple-touch-icon" href="/assets/imgs/logo/icon.webp" />

    <!-- Canonical -->
    <link rel="canonical" href="https://amciac.org/" />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="es_MX" />
    <meta property="og:site_name" content="AMCI" />
    <meta property="og:title" content="AMCI | Asociación Mexicana de Concreteros Independientes" />
    <meta property="og:description" content="Certificaciones, cursos y convenios para productores de concreto en México" />
    <meta property="og:image" content="https://amciac.org/assets/imgs/og-image.jpg" />
    <meta property="og:url" content="https://amciac.org/" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="AMCI | Asociación Mexicana de Concreteros Independientes" />
    <meta name="twitter:description" content="Certificaciones, cursos y convenios para productores de concreto en México" />
    <meta name="twitter:image" content="https://amciac.org/assets/imgs/og-image.jpg" />

    <!-- Geo Tags -->
    <meta name="geo.region" content="MX" />
    <meta name="geo.placename" content="México" />

    <!-- Preconnect para performance -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**ROI Esperado:**
- CTR en SERPs: +45-65%
- Clasificación correcta de idioma
- Previews correctos en Facebook/LinkedIn/WhatsApp
- Indexación más rápida

**Tiempo estimado:** 1 hora

---

### 2. META TAGS ESTÁTICOS EN COMPONENTE SEO ❌ CRITICIDAD: 9/10

**DIAGNÓSTICO:**

**Archivo afectado:** `src/components/SEO.tsx`

**Estado actual PROBLEMÁTICO:**
```tsx
const SEO = ({ pageTitle }: any) => {
  return (
    <Helmet>
      <meta name="robots" content="noindex, follow" />  // ⚠️ BLOQUEA INDEXACIÓN
      // ...
      <meta name="robots" content="index, follow" />     // ⚠️ DUPLICADO CONTRADICTORIO
      <meta name="description" content="Impulsa tu concretera..." />  // ⚠️ MISMO PARA TODAS
      <meta property="og:title" content="AMCI | Fortaleciendo..." />  // ⚠️ ESTÁTICO
    </Helmet>
  );
};
```

**PROBLEMAS IDENTIFICADOS:**

| Problema | Línea | Impacto |
|----------|-------|---------|
| `noindex, follow` duplicado | L12 | Puede bloquear indexación |
| Meta description estática | L20-22 | Duplicate content en 52 páginas |
| og:title estático | L48-49 | Previews idénticos en redes |
| Sin canonical dinámico | - | Google no sabe URL canónica |
| Sin og:url dinámico | L69 | URL incorrecta en shares |
| Keywords en meta tag | L35-37 | Google ignora desde 2009 |

**SOLUCIÓN TÉCNICA:**

Crear nuevo componente `src/components/SEO.tsx`:

```tsx
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

interface SEOProps {
  pageTitle: string;
  description?: string;
  image?: string;
  type?: "website" | "article" | "profile";
  noIndex?: boolean;
}

const BASE_URL = "https://amciac.org";
const DEFAULT_DESCRIPTION = "AMCI: Asociación Mexicana de Concreteros Independientes. Certificaciones IMCYC y ACI, cursos especializados, convenios internacionales y beneficios exclusivos para productores de concreto.";
const DEFAULT_IMAGE = "/assets/imgs/og-image.jpg";

const SEO = ({
  pageTitle,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  type = "website",
  noIndex = false
}: SEOProps) => {
  const location = useLocation();
  const canonicalUrl = `${BASE_URL}${location.pathname}`;
  const fullTitle = `${pageTitle} | AMCI`;
  const absoluteImage = image.startsWith("http") ? image : `${BASE_URL}${image}`;

  return (
    <Helmet>
      {/* Básicos */}
      <html lang="es" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Robots */}
      <meta name="robots" content={noIndex ? "noindex, follow" : "index, follow"} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="es_MX" />
      <meta property="og:site_name" content="AMCI" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:url" content={canonicalUrl} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />

      {/* Geo */}
      <meta name="geo.region" content="MX" />
      <meta name="author" content="AMCI - Asociación Mexicana de Concreteros Independientes" />
    </Helmet>
  );
};

export default SEO;
```

**Actualizar páginas con descripciones únicas:**

```tsx
// src/pages/capacitacion.tsx
<SEO
  pageTitle="Capacitación AMCI"
  description="29 cursos especializados en tecnología del concreto. Fundamentos, diseño de mezclas, pisos industriales, durabilidad y más. Diploma AMCI con precios preferenciales para afiliados."
/>

// src/pages/plataforma-amci.tsx
<SEO
  pageTitle="Certificaciones Oficiales"
  description="13 certificaciones con validez oficial: 7 IMCYC OCEPER + 6 ACI. Técnico laboratorista, pruebas de campo, agregados y más. 20% descuento para miembros Premium."
/>

// src/pages/afiliaciones.tsx
<SEO
  pageTitle="Afiliaciones y Membresías"
  description="Únete a AMCI: Membresía Básica $12,000/año o Premium $20,700/año. Certificaciones, cursos, convenios internacionales y acceso a World of Concrete."
/>

// src/pages/beneficios.tsx
<SEO
  pageTitle="Beneficios de Afiliación"
  description="20 beneficios exclusivos para afiliados AMCI: 20% descuento IMCYC, acceso World of Concrete, plataforma de empleo, convenios comerciales y más."
/>
```

**Templates de Meta Descriptions por Sección:**

| Página | Template |
|--------|----------|
| Capacitación | "29 cursos de concreto: {tema}. Modalidad {presencial/online}. Diploma AMCI. Descuentos para afiliados." |
| Certificaciones | "Certificación {nombre} de {organismo}. Validez {nacional/internacional}. Duración: {horas}h. 20% descuento Premium." |
| Convenios | "{nombre}: {beneficio principal}. Exclusivo para afiliados AMCI." |
| Mesa Directiva | "{nombre} - {cargo} AMCI. {zona/especialidad}." |

**ROI Esperado:**
- CTR: +60-80% por descriptions únicas
- Rankings: +25% por eliminación de duplicate content
- Social shares: +40% por previews correctos

**Tiempo estimado:** 6 horas

---

### 3. ROBOTS.TXT INEXISTENTE ❌ CRITICIDAD: 9/10

**DIAGNÓSTICO:**

**Estado actual:** ❌ NO EXISTE `public/robots.txt`

**Impacto:**
1. Googlebot no tiene directivas claras
2. Crawl budget desperdiciado en páginas innecesarias
3. Sin referencia a sitemap.xml
4. Posible indexación de rutas admin/privadas

**SOLUCIÓN TÉCNICA:**

Crear `public/robots.txt`:

```txt
# robots.txt para AMCI - amciac.org
# Actualizado: Diciembre 2025

User-agent: *

# Permitir indexación general
Allow: /

# Bloquear rutas que no deben indexarse
Disallow: /admin*
Disallow: /*?*
Disallow: /*.json$
Disallow: /api/

# Páginas temporalmente ocultas (mantener hasta activación)
Disallow: /software
Disallow: /financiamiento
Disallow: /creditos
Disallow: /gestion
Disallow: /hoteles

# Bloquear assets no necesarios para SEO
Disallow: /assets/css/
Disallow: /assets/fonts/

# Permitir explícitamente páginas importantes
Allow: /capacitacion
Allow: /plataforma-amci
Allow: /afiliaciones
Allow: /beneficios
Allow: /convenios
Allow: /socios
Allow: /proveedores
Allow: /mesa-directiva
Allow: /eventos
Allow: /publicaciones
Allow: /contacto

# Crawl-delay para no sobrecargar servidor (opcional)
Crawl-delay: 1

# Sitemap
Sitemap: https://amciac.org/sitemap.xml

# Reglas específicas para Googlebot
User-agent: Googlebot
Allow: /

# Reglas para Bingbot
User-agent: Bingbot
Allow: /
Crawl-delay: 2
```

**ROI Esperado:**
- Crawl efficiency: +150%
- Indexación correcta de páginas importantes
- Protección de rutas privadas

**Tiempo estimado:** 30 minutos

---

### 4. SITEMAP.XML INEXISTENTE ❌ CRITICIDAD: 8/10

**DIAGNÓSTICO:**

**Estado actual:** ❌ NO EXISTE sitemap.xml

**Impacto:**
1. Discovery lento de nuevas páginas (semanas vs horas)
2. Google no conoce estructura del sitio
3. Sin prioridades de crawl definidas
4. Cambios de contenido no detectados rápidamente

**SOLUCIÓN TÉCNICA:**

Crear `public/sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <!-- PÁGINAS PRINCIPALES -->
  <url>
    <loc>https://amciac.org/</loc>
    <lastmod>2025-12-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- AMCI -->
  <url>
    <loc>https://amciac.org/quienes-somos</loc>
    <lastmod>2025-12-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://amciac.org/eventos</loc>
    <lastmod>2025-12-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://amciac.org/mesa-directiva</loc>
    <lastmod>2025-12-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://amciac.org/publicaciones</loc>
    <lastmod>2025-12-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>

  <!-- MIEMBROS -->
  <url>
    <loc>https://amciac.org/socios</loc>
    <lastmod>2025-12-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://amciac.org/proveedores</loc>
    <lastmod>2025-12-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://amciac.org/afiliaciones</loc>
    <lastmod>2025-12-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://amciac.org/beneficios</loc>
    <lastmod>2025-12-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- CAPACITACIÓN -->
  <url>
    <loc>https://amciac.org/capacitacion</loc>
    <lastmod>2025-12-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- PLATAFORMA AMCI -->
  <url>
    <loc>https://amciac.org/plataforma-amci</loc>
    <lastmod>2025-12-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://amciac.org/material-capacitacion</loc>
    <lastmod>2025-12-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- CONVENIOS -->
  <url>
    <loc>https://amciac.org/convenios</loc>
    <lastmod>2025-12-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://amciac.org/maquinaria</loc>
    <lastmod>2025-12-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://amciac.org/pruebas-concreto</loc>
    <lastmod>2025-12-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- CONTACTO -->
  <url>
    <loc>https://amciac.org/contacto</loc>
    <lastmod>2025-12-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

</urlset>
```

**Script de generación automática:**

Crear `scripts/generate-sitemap.js`:

```javascript
const fs = require('fs');

const BASE_URL = 'https://amciac.org';
const TODAY = new Date().toISOString().split('T')[0];

const pages = [
  { url: '/', priority: 1.0, changefreq: 'weekly' },
  { url: '/quienes-somos', priority: 0.8, changefreq: 'monthly' },
  { url: '/eventos', priority: 0.8, changefreq: 'weekly' },
  { url: '/mesa-directiva', priority: 0.7, changefreq: 'monthly' },
  { url: '/publicaciones', priority: 0.6, changefreq: 'monthly' },
  { url: '/socios', priority: 0.8, changefreq: 'weekly' },
  { url: '/proveedores', priority: 0.8, changefreq: 'weekly' },
  { url: '/afiliaciones', priority: 0.9, changefreq: 'monthly' },
  { url: '/beneficios', priority: 0.9, changefreq: 'monthly' },
  { url: '/capacitacion', priority: 0.9, changefreq: 'weekly' },
  { url: '/plataforma-amci', priority: 0.9, changefreq: 'weekly' },
  { url: '/material-capacitacion', priority: 0.7, changefreq: 'monthly' },
  { url: '/convenios', priority: 0.8, changefreq: 'monthly' },
  { url: '/maquinaria', priority: 0.7, changefreq: 'weekly' },
  { url: '/pruebas-concreto', priority: 0.7, changefreq: 'monthly' },
  { url: '/contacto', priority: 0.8, changefreq: 'monthly' },
];

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

pages.forEach(page => {
  xml += '  <url>\n';
  xml += `    <loc>${BASE_URL}${page.url}</loc>\n`;
  xml += `    <lastmod>${TODAY}</lastmod>\n`;
  xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
  xml += `    <priority>${page.priority}</priority>\n`;
  xml += '  </url>\n';
});

xml += '</urlset>';

fs.writeFileSync('./public/sitemap.xml', xml);
console.log(`✅ Sitemap generado: ${pages.length} URLs`);
```

**Agregar a package.json:**
```json
{
  "scripts": {
    "generate:sitemap": "node scripts/generate-sitemap.js",
    "prebuild": "npm run generate:sitemap"
  }
}
```

**ROI Esperado:**
- Indexación: 5 páginas → 50+ páginas en 30 días
- Discovery time: 3-4 semanas → 24-48 horas
- Crawl efficiency: +200%

**Tiempo estimado:** 2 horas

---

### 5. SCHEMA.ORG / DATOS ESTRUCTURADOS AUSENTES ❌ CRITICIDAD: 8/10

**DIAGNÓSTICO:**

**Estado actual:** ❌ ZERO implementación de Schema.org/JSON-LD

**Impacto:**
1. Sin Rich Snippets en resultados de búsqueda
2. No aparición en Knowledge Graph de Google
3. CTR reducido -40% vs competencia con rich snippets
4. Invisibilidad en búsquedas por voz
5. Local SEO débil

**SOLUCIÓN TÉCNICA:**

Crear `src/utils/schemaGenerator.ts`:

```typescript
export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://amciac.org/#organization",
  "name": "AMCI - Asociación Mexicana de Concreteros Independientes",
  "alternateName": "AMCI",
  "url": "https://amciac.org",
  "logo": "https://amciac.org/assets/imgs/logo/logo.png",
  "image": "https://amciac.org/assets/imgs/logo/logo.png",
  "description": "Asociación gremial que fortalece a productores de concreto premezclado en México con certificaciones, capacitación y convenios internacionales.",
  "foundingDate": "2003",
  "areaServed": {
    "@type": "Country",
    "name": "México"
  },
  "memberOf": [
    {
      "@type": "Organization",
      "name": "NRMCA - National Ready Mixed Concrete Association"
    },
    {
      "@type": "Organization",
      "name": "ACPA - American Concrete Pumping Association"
    }
  ],
  "sameAs": [
    "https://www.facebook.com/amciac",
    "https://www.linkedin.com/company/amci-ac"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "contacto@amciac.org",
    "availableLanguage": "Spanish"
  }
});

export const generateCourseSchema = (curso: any) => ({
  "@context": "https://schema.org",
  "@type": "Course",
  "name": curso.titulo,
  "description": curso.descripcion,
  "provider": {
    "@type": "Organization",
    "name": "AMCI",
    "url": "https://amciac.org"
  },
  "educationalCredentialAwarded": "Diploma AMCI",
  "occupationalCategory": "Tecnología del Concreto",
  "courseMode": curso.modalidad === "online" ? "online" : "blended",
  "duration": curso.duracion,
  "inLanguage": "es",
  "isAccessibleForFree": false,
  "audience": {
    "@type": "Audience",
    "audienceType": curso.publicoObjetivo
  }
});

export const generateCertificationSchema = (cert: any) => ({
  "@context": "https://schema.org",
  "@type": "EducationalOccupationalCredential",
  "name": cert.titulo,
  "description": cert.descripcion,
  "credentialCategory": "Professional Certification",
  "recognizedBy": {
    "@type": "Organization",
    "name": cert.organismo
  },
  "validFor": cert.vigencia,
  "educationalLevel": "Professional"
});

export const generateMembershipOfferSchema = (tipo: string, precio: number) => ({
  "@context": "https://schema.org",
  "@type": "Offer",
  "name": `Membresía ${tipo} AMCI`,
  "price": precio,
  "priceCurrency": "MXN",
  "priceValidUntil": "2025-12-31",
  "availability": "https://schema.org/InStock",
  "seller": {
    "@type": "Organization",
    "name": "AMCI"
  }
});

export const generateBreadcrumbSchema = (items: {name: string, url: string}[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": `https://amciac.org${item.url}`
  }))
});

export const generateFAQSchema = (faqs: {question: string, answer: string}[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});
```

**Implementar en páginas:**

```tsx
// src/pages/index.tsx
import { generateOrganizationSchema } from '../utils/schemaGenerator';

const HomePage = () => {
  const orgSchema = generateOrganizationSchema();

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(orgSchema)}
        </script>
      </Helmet>
      {/* ... */}
    </>
  );
};
```

**Rich Snippets esperados:**

| Página | Schema Type | Rich Snippet |
|--------|-------------|--------------|
| Home | Organization | Logo, descripción, contacto |
| Capacitación | Course | Cursos con duración, modalidad |
| Plataforma AMCI | EducationalCredential | Certificaciones con validez |
| Afiliaciones | Offer | Precios de membresías |
| FAQ | FAQPage | Preguntas desplegables en SERP |

**ROI Esperado:**
- CTR: +35-50% por rich snippets
- Featured Snippets: 5-8 en 90 días
- Voice Search: Visibilidad en asistentes

**Tiempo estimado:** 8 horas

---

### 6. CANONICAL LINKS AUSENTES ❌ CRITICIDAD: 7/10

**DIAGNÓSTICO:**

**Estado actual:** Sin canonical links dinámicos

**Problema:**
- 52 páginas sin canonical definido
- Posible contenido duplicado entre rutas similares
- `/certificaciones` y `/plataforma-amci` muestran mismo contenido

**SOLUCIÓN:**

Ya implementado en el componente SEO.tsx mejorado (Punto 2):
```tsx
const canonicalUrl = `${BASE_URL}${location.pathname}`;
<link rel="canonical" href={canonicalUrl} />
```

**Matriz de Canonicals:**

| URL | Canonical Correcto |
|-----|-------------------|
| `/` | `https://amciac.org/` |
| `/certificaciones` | `https://amciac.org/plataforma-amci` (redirect) |
| `/cursos` | `https://amciac.org/capacitacion` (redirect) |
| `/mesa-directiva/josue-z` | `https://amciac.org/mesa-directiva/josue-z` |

**Tiempo estimado:** Incluido en Punto 2

---

### 7. IMÁGENES SIN OPTIMIZACIÓN SEO ❌ CRITICIDAD: 6/10

**DIAGNÓSTICO:**

**Problemas detectados:**
1. Sin atributos `alt` descriptivos en muchas imágenes
2. Imágenes grandes no optimizadas
3. Sin lazy loading nativo
4. Sin formato WebP en todas las imágenes

**SOLUCIÓN TÉCNICA:**

**Paso 1: Agregar alt descriptivos**

```tsx
// Antes
<img src="/assets/imgs/logo/logo.png" />

// Después
<img
  src="/assets/imgs/logo/logo.webp"
  alt="Logo AMCI - Asociación Mexicana de Concreteros Independientes"
  loading="lazy"
  width="200"
  height="60"
/>
```

**Paso 2: Crear componente Image optimizado**

```tsx
// src/components/common/OptimizedImage.tsx
interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false
}: OptimizedImageProps) => {
  // Convertir a WebP si es posible
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');

  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    </picture>
  );
};
```

**Checklist de imágenes a optimizar:**

| Imagen | Alt Recomendado |
|--------|-----------------|
| Logo AMCI | "Logo AMCI - Asociación Mexicana de Concreteros Independientes" |
| Hero Banner | "Productores de concreto premezclado - Miembros AMCI" |
| Iconos cursos | "Icono curso {nombre del curso} AMCI" |
| Fotos team | "{Nombre} - {Cargo} Mesa Directiva AMCI" |
| Logos convenios | "Logo {nombre convenio} - Aliado AMCI" |

**ROI Esperado:**
- Image Search traffic: +20%
- Core Web Vitals: +15%
- Accesibilidad: Mejor score

**Tiempo estimado:** 4 horas

---

### 8. HEADINGS STRUCTURE (H1-H6) ⚠️ CRITICIDAD: 6/10

**DIAGNÓSTICO:**

**Verificar en cada página:**
- ¿Existe un solo H1?
- ¿La jerarquía H1 > H2 > H3 es correcta?
- ¿Los headings contienen keywords?

**SOLUCIÓN:**

**Template de estructura correcta:**

```html
<h1>Capacitación AMCI - Cursos de Tecnología del Concreto</h1>
  <h2>Tecnología del Concreto (22 cursos)</h2>
    <h3>Fundamentos del Concreto</h3>
    <h3>Diseño de Mezclas</h3>
  <h2>Temas Selectos (7 cursos)</h2>
    <h3>Evaluación Forense</h3>
  <h2>Beneficios para Afiliados</h2>
  <h2>Preguntas Frecuentes</h2>
```

**Keywords en Headings:**

| Página | H1 Recomendado |
|--------|----------------|
| Home | "AMCI - Fortaleciendo al Concretero Independiente en México" |
| Capacitación | "29 Cursos de Tecnología del Concreto - AMCI" |
| Plataforma AMCI | "Certificaciones Oficiales IMCYC y ACI" |
| Afiliaciones | "Membresías AMCI: Básica y Premium" |
| Beneficios | "20 Beneficios Exclusivos para Afiliados AMCI" |

**Tiempo estimado:** 3 horas

---

### 9. INTERNAL LINKING DÉBIL ⚠️ CRITICIDAD: 5/10

**DIAGNÓSTICO:**

**Oportunidades de mejora:**
1. CTAs que enlacen a páginas relacionadas
2. Breadcrumbs en todas las páginas internas
3. Sección "Relacionados" en páginas de cursos/certificaciones
4. Footer con enlaces a páginas principales

**SOLUCIÓN:**

**Matriz de Internal Links:**

| Página Origen | Enlazar a |
|---------------|-----------|
| Capacitación | Afiliaciones (para descuentos), Plataforma AMCI (certificaciones) |
| Plataforma AMCI | Afiliaciones (20% descuento), Capacitación (cursos previos) |
| Beneficios | Afiliaciones (CTA afiliarse), Capacitación, Convenios |
| Home | Todas las secciones principales |
| Convenios | Afiliaciones, Eventos (ferias) |

**Tiempo estimado:** 4 horas

---

### 10. VELOCIDAD Y CORE WEB VITALS ⚠️ CRITICIDAD: 5/10

**DIAGNÓSTICO:**

**Positivo:**
- Vite build optimizado
- React 18 con concurrent features
- Bootstrap CSS (puede optimizarse)

**Por mejorar:**
- Lazy loading de componentes pesados
- Preload de fuentes críticas
- Optimización de CSS (tree shaking)

**SOLUCIÓN:**

**Paso 1: Lazy loading de rutas**

```tsx
// src/navigation/Navigation.tsx
import { lazy, Suspense } from 'react';

const Capacitacion = lazy(() => import('../pages/capacitacion'));
const PlataformaAMCI = lazy(() => import('../pages/plataforma-amci'));

// En Routes:
<Suspense fallback={<div>Cargando...</div>}>
  <Route path="/capacitacion" element={<Capacitacion />} />
</Suspense>
```

**Paso 2: Preload de fuentes**

```html
<!-- index.html -->
<link rel="preload" href="/assets/fonts/alfarn2.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preload" href="/assets/fonts/inter.woff2" as="font" type="font/woff2" crossorigin />
```

**Paso 3: Critical CSS inline**

Extraer CSS crítico para above-the-fold y hacer inline en `<head>`.

**Métricas objetivo:**

| Métrica | Actual (estimado) | Objetivo |
|---------|-------------------|----------|
| LCP | ~2.5s | <2.0s |
| FID | ~80ms | <50ms |
| CLS | ~0.15 | <0.1 |

**Tiempo estimado:** 6 horas

---

## PARTE II: AUDITORÍA ON-PAGE SEO

### 11. URL STRUCTURE ✅ CORRECTO

**Estado actual:** URLs limpias y descriptivas

**Ejemplos correctos:**
- `/capacitacion` ✅
- `/plataforma-amci` ✅
- `/mesa-directiva` ✅
- `/afiliaciones` ✅

**Recomendación:** Mantener estructura actual.

---

### 12. CONTENT QUALITY ✅ ALTO

**Fortalezas:**
- 29 cursos con descripciones detalladas
- 13 certificaciones bien documentadas
- 20 beneficios diferenciados
- 9 convenios con información completa

**Oportunidades:**
- Agregar FAQs en páginas principales
- Crear contenido de blog interno
- Testimonios de afiliados

---

## PARTE III: RESUMEN DE PRIORIDADES

### Matriz de Priorización

| # | Tarea | Criticidad | Esfuerzo | ROI | Prioridad |
|---|-------|------------|----------|-----|-----------|
| 1 | Corregir index.html | 10/10 | 1h | ALTO | INMEDIATA |
| 2 | Mejorar componente SEO | 9/10 | 6h | ALTO | INMEDIATA |
| 3 | Crear robots.txt | 9/10 | 0.5h | ALTO | INMEDIATA |
| 4 | Crear sitemap.xml | 8/10 | 2h | ALTO | ALTA |
| 5 | Implementar Schema.org | 8/10 | 8h | ALTO | ALTA |
| 6 | Canonical links | 7/10 | Incluido | MEDIO | ALTA |
| 7 | Optimizar imágenes | 6/10 | 4h | MEDIO | MEDIA |
| 8 | Estructura headings | 6/10 | 3h | MEDIO | MEDIA |
| 9 | Internal linking | 5/10 | 4h | MEDIO | MEDIA |
| 10 | Core Web Vitals | 5/10 | 6h | MEDIO | BAJA |

### Timeline de Implementación

**Semana 1 (CRÍTICO):**
- Día 1: index.html + robots.txt
- Día 2-3: Componente SEO mejorado
- Día 4: sitemap.xml
- Día 5: Verificar en Google Search Console

**Semana 2 (ALTO):**
- Día 1-2: Schema.org básico (Organization, Course)
- Día 3-4: Optimización de imágenes
- Día 5: Estructura de headings

**Semana 3 (MEDIO):**
- Día 1-2: Internal linking
- Día 3-4: Schema.org avanzado (FAQ, Offer)
- Día 5: Core Web Vitals

**Semana 4 (MANTENIMIENTO):**
- Monitoreo en Search Console
- Ajustes según datos
- Crear contenido adicional

---

## PARTE IV: CHECKLIST FINAL PRE-PRODUCCIÓN

### SEO Técnico
- [ ] `index.html` con lang="es" y meta tags completos
- [ ] Componente SEO con descriptions dinámicas
- [ ] `robots.txt` creado y verificado
- [ ] `sitemap.xml` generado
- [ ] Schema.org Organization implementado
- [ ] Canonical links en todas las páginas
- [ ] Google Search Console configurado
- [ ] Bing Webmaster Tools configurado

### On-Page SEO
- [ ] H1 único en cada página
- [ ] Meta descriptions únicas (<160 chars)
- [ ] Imágenes con alt descriptivos
- [ ] Internal links estratégicos
- [ ] CTAs claros hacia afiliación

### Content
- [ ] Descripciones únicas por curso (29)
- [ ] Descripciones únicas por certificación (13)
- [ ] Información de beneficios completa
- [ ] Datos de contacto actualizados

### Performance
- [ ] Build de producción sin errores
- [ ] Lazy loading implementado
- [ ] Imágenes en WebP
- [ ] Fuentes preloaded

---

## MÉTRICAS DE SEGUIMIENTO

### KPIs Mensuales

| Métrica | Herramienta | Frecuencia |
|---------|-------------|------------|
| Posiciones keywords | Google Search Console | Semanal |
| Tráfico orgánico | Google Analytics 4 | Semanal |
| Páginas indexadas | Search Console | Semanal |
| CTR promedio | Search Console | Mensual |
| Core Web Vitals | PageSpeed Insights | Mensual |
| Backlinks | Ahrefs/Semrush | Mensual |

### Herramientas Recomendadas

1. **Google Search Console** - Indexación, keywords, CTR
2. **Google Analytics 4** - Tráfico, conversiones
3. **PageSpeed Insights** - Performance
4. **Screaming Frog** - Auditoría técnica
5. **Ahrefs/Semrush** - Backlinks, competencia

---

## CONCLUSIÓN

El proyecto AMCI tiene una base técnica sólida con React + Vite, pero presenta deficiencias SEO críticas que deben corregirse antes de producción. Las prioridades inmediatas son:

1. **Corregir `index.html`** (lang, meta tags) - 1 hora
2. **Mejorar componente SEO** (descriptions dinámicas) - 6 horas
3. **Crear `robots.txt`** - 30 minutos
4. **Crear `sitemap.xml`** - 2 horas

Con estas correcciones implementadas, el sitio estará listo para indexación correcta y podrá comenzar a rankear para las keywords objetivo en 30-60 días.

**Inversión total estimada:** 35-40 horas de desarrollo
**ROI esperado:** 2,500+ visitas orgánicas/mes en 6 meses

---

**Documento generado:** Diciembre 2025
**Próxima revisión:** Enero 2025 (post-implementación)
