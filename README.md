# Poncho Davalos Real Estate

Sitio web de bienes raices para **Poncho Davalos Real Estate**, especializado en propiedades en Puerto Vallarta y Riviera Nayarit, Mexico. Incluye un sistema de generacion automatica de paginas de propiedades desde el MLS (Spark API), soporte bilingue (ES/EN), conversion de moneda (MXN/USD), modo oscuro y optimizacion SEO completa.

**URL de produccion:** [https://ponchodavalos.com.mx](https://ponchodavalos.com.mx)

---

## Tabla de Contenidos

- [Stack Tecnologico](#stack-tecnologico)
- [Arquitectura del Proyecto](#arquitectura-del-proyecto)
- [Estructura de Archivos](#estructura-de-archivos)
- [Paginas del Sitio](#paginas-del-sitio)
- [Sistema de Build (MLS)](#sistema-de-build-mls)
- [Integraciones Externas](#integraciones-externas)
- [Funcionalidades Principales](#funcionalidades-principales)
- [Navegacion y Layout](#navegacion-y-layout)
- [Estilos y Diseno](#estilos-y-diseno)
- [SEO y Datos Estructurados](#seo-y-datos-estructurados)
- [Instalacion y Uso](#instalacion-y-uso)
- [CI/CD](#cicd)
- [Contacto](#contacto)

---

## Stack Tecnologico

### Frontend
| Tecnologia | Uso |
|---|---|
| **HTML5** | Paginas estaticas con datos estructurados Schema.org |
| **CSS3 + Bootstrap 5** | Framework responsivo con CSS custom modular |
| **jQuery** | Manipulacion DOM, AJAX, plugins UI |
| **Handlebars** | Motor de plantillas para generacion de paginas MLS |

### Build System
| Tecnologia | Uso |
|---|---|
| **Node.js** (>=18) | Runtime del sistema de build |
| **Sharp** | Procesamiento y redimensionado de imagenes |
| **Terser** | Minificacion de JavaScript |
| **clean-css-cli** | Minificacion de CSS |
| **node-fetch** | Cliente HTTP para Spark API |

### Plugins y Librerias UI
| Libreria | Funcion |
|---|---|
| **Owl Carousel** | Carruseles de imagenes responsivos |
| **Light Gallery** | Galeria lightbox para fotos de propiedades |
| **Magnific Popup** | Modales y popups |
| **Revolution Slider** | Slider avanzado del hero |
| **jQuery Isotope** | Grilla filtrable del portafolio |
| **Font Awesome + Flaticon** | Iconografia |
| **Royal Preloader** | Animacion de carga de pagina |
| **Vegas.js** | Fondos de imagen/video fullscreen |
| **jQuery YTPlayer** | Integracion de video YouTube |

---

## Arquitectura del Proyecto

El proyecto es un **sitio web estatico multi-pagina** (no SPA) con un sistema de build en Node.js que genera paginas de propiedades automaticamente desde la API de MLS.

```
┌─────────────────────────────────────────────────────────┐
│                    SPARK API (MLS)                       │
│              sparkapi.com/v1 (OAuth2)                    │
└────────────────────┬────────────────────────────────────┘
                     │ Fetch cada 6 horas (GitHub Actions)
                     ▼
┌─────────────────────────────────────────────────────────┐
│               BUILD SYSTEM (Node.js)                     │
│                                                          │
│  1. fetch-listings.js    → Obtener datos MLS             │
│  2. transform-data.js   → Normalizar y enriquecer datos  │
│  3. download-images.js  → Descargar/generar imagenes     │
│  4. generate-pages.js   → Renderizar HTML (Handlebars)   │
│  5. generate-portfolio.js → Inyectar cards en portafolio │
│  6. generate-sitemap.js → Actualizar sitemap.xml         │
│  7. generate-i18n.js    → Generar traducciones           │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              SITIO ESTATICO (HTML/CSS/JS)                 │
│                                                          │
│  Paginas manuales: index, about, contact, services       │
│  Paginas generadas: /mls/property-mlv-*.html             │
│  Assets: /images/mls/*, /css/*, /js/*                    │
│  Traducciones: /translations/en.json, es.json            │
└─────────────────────────────────────────────────────────┘
```

---

## Estructura de Archivos

```
ponchodavalos/
├── .github/workflows/
│   └── update-listings.yml      # CI/CD: actualiza propiedades cada 6h
├── css/                          # ~53 archivos CSS (full + minificados)
│   ├── bootstrap.min.css
│   ├── dark-mode.css / .min.css
│   ├── i18n.css / .min.css
│   ├── cards.css / cards-propertys.css
│   ├── carousel.css / currency-switcher.css
│   ├── lead-form.css / header_principal.css
│   ├── testimonials_new.css / services.css
│   └── ...
├── fonts/                        # Web fonts (Font Awesome, Flaticon)
├── images/                       # Assets estaticos (~585 archivos, 84 MB)
│   ├── bg/                       # Fondos de secciones
│   ├── mls/                      # Fotos de propiedades MLS (generadas)
│   │   └── mlv-XXXXX/           # Album por propiedad
│   ├── iconos_properties/        # Iconos SVG de amenidades
│   ├── porpied/                  # Propiedades manuales
│   ├── slider/                   # Imagenes del slider
│   └── team/                     # Fotos del equipo
├── js/                           # Scripts (full + minificados)
│   ├── i18n.js                   # Sistema de internacionalizacion
│   ├── currency-switcher.js      # Conversion MXN/USD
│   ├── dark-mode.js              # Toggle tema oscuro
│   ├── lead-form.js              # Formulario de captura de leads
│   ├── contact.js                # Formulario de contacto
│   ├── scripts.js                # Navegacion, menus, efectos
│   └── ...
├── mls/                          # Paginas generadas automaticamente
│   ├── property-mlv-*.html       # Una pagina por propiedad
│   └── data.json                 # Datos estructurados de propiedades
├── plugins/revolution/           # Revolution Slider plugin
├── source/                       # PDFs descargables (guias)
├── src/                          # Codigo fuente del build system
│   ├── config.js                 # Configuracion (API keys, rutas, metadata)
│   ├── build/
│   │   ├── index.js              # Orquestador principal (7 pasos)
│   │   ├── fetch-listings.js     # Obtiene listados de Spark API
│   │   ├── transform-data.js     # Transforma y enriquece datos
│   │   ├── download-images.js    # Descarga/genera imagenes
│   │   ├── generate-pages.js     # Genera HTML desde templates
│   │   ├── generate-portfolio.js # Inyecta cards en portafolio
│   │   ├── generate-sitemap.js   # Actualiza sitemap.xml
│   │   └── generate-i18n.js      # Genera claves de traduccion
│   ├── mock/
│   │   └── listings.json         # Datos de prueba (12 propiedades)
│   └── templates/
│       ├── property-page.html    # Template completo de propiedad
│       └── property-card.html    # Template de card para portafolio
├── translations/
│   ├── en.json                   # Traducciones ingles (~36 KB)
│   └── es.json                   # Traducciones espanol (~40 KB)
├── index.html                    # Homepage
├── about-us.html                 # Pagina About / Equipo
├── contact.html                  # Formulario de contacto
├── portfolio-four-column-wide.html # Listado de propiedades
├── services-detail-[1-6].html    # 6 paginas de servicios
├── property-[1-20].html          # Propiedades manuales
├── 404-error.html                # Pagina de error
├── style.css                     # Hoja de estilos principal (10,441 lineas)
├── sitemap.xml                   # Sitemap XML con hreflang
├── robots.txt                    # Reglas de crawling
├── send_email.php                # Backend de correo (contacto)
└── package.json                  # Dependencias y scripts
```

---

## Paginas del Sitio

### Paginas Principales
| Pagina | Archivo | Descripcion |
|---|---|---|
| **Homepage** | `index.html` | Hero slider, propiedades destacadas, servicios, testimonios, CTAs |
| **Propiedades** | `portfolio-four-column-wide.html` | Grilla filtrable (Isotope) con cards de propiedades |
| **Nosotros** | `about-us.html` | Historia, equipo, valores |
| **Contacto** | `contact.html` | Formulario, mapa Google Maps, datos de contacto |
| **Error 404** | `404-error.html` | Pagina de error personalizada |

### Paginas de Servicios (6)
| Servicio | Archivo |
|---|---|
| Asesoria Integral | `services-detail-1.html` |
| Inversion para Compradores Extranjeros | `services-detail-2.html` |
| Adquisicion de Segunda Residencia | `services-detail-3.html` |
| Venta de Propiedades Premium | `services-detail-4.html` |
| Gestion Legal y Transaccional | `services-detail-5.html` |
| Analisis de Mercado y Plusvalia | `services-detail-6.html` |

### Paginas de Propiedades
- **Manuales:** `property-1.html` a `property-20.html` (propiedades curadas manualmente)
- **Generadas (MLS):** `mls/property-mlv-*.html` (generadas automaticamente desde Spark API)

### Blog
- Enlace externo a WordPress: `https://ponchodavalosrealty.com/blog/`

---

## Sistema de Build (MLS)

El build system automatiza la generacion de paginas de propiedades desde la API de Spark (MLS).

### Pipeline de 7 Pasos

```
npm run build
```

1. **fetch-listings.js** — Autentica con Spark API (OAuth2) y descarga listados activos del agente. En modo desarrollo usa datos mock (`src/mock/listings.json`).

2. **transform-data.js** — Normaliza datos: slugifica IDs, calcula precios USD/MXN, genera URLs de Google Maps, crea Schema.org JSON-LD, mapea amenidades, construye navegacion prev/next.

3. **download-images.js** — Descarga fotos desde Spark API con concurrencia configurable (5 simultaneas). Genera thumbnails (600x400) via Sharp. En modo mock genera placeholders SVG.

4. **generate-pages.js** — Compila template Handlebars (`property-page.html`) con datos de cada propiedad. Escribe HTML individual y `data.json`.

5. **generate-portfolio.js** — Inyecta cards de propiedades en `portfolio-four-column-wide.html` usando marcadores idem potentes (`<!-- MLS-INJECT-START/END -->`).

6. **generate-sitemap.js** — Agrega URLs de propiedades MLS al `sitemap.xml` con enlaces hreflang (en/es/x-default).

7. **generate-i18n.js** — Genera claves de traduccion `property.mls_*` en `en.json` y `es.json` con descripciones y taglines.

### Scripts NPM

```bash
npm run build        # Build con datos mock (desarrollo)
npm run build:live   # Build con datos reales de Spark API
npm run clean        # Limpia /mls/ e /images/mls/
```

### Configuracion (`src/config.js`)

```javascript
sparkApiKey       // Variable de entorno: SPARK_API_KEY
sparkApiSecret    // Variable de entorno: SPARK_API_SECRET
sparkAgentId      // Variable de entorno: SPARK_AGENT_ID
sparkApiUrl       // https://sparkapi.com/v1
useMockData       // true (dev) / false (prod)
exchangeRate      // 18.5 (fallback MXN/USD)
siteUrl           // https://ponchodavalos.com.mx
thumbWidth/Height // 600x400
downloadConcurrency // 5
```

### Templates Handlebars

- **`property-page.html`** (~1000 lineas) — Pagina completa de propiedad con meta tags, Schema.org, galeria, detalles, amenidades, mapa, informacion del agente, CTAs, navegacion prev/next.
- **`property-card.html`** — Card compacta para la grilla del portafolio con thumbnail, precio, ubicacion.

---

## Integraciones Externas

| Servicio | Proposito | Configuracion |
|---|---|---|
| **Spark API** (sparkapi.com) | Datos MLS de propiedades | OAuth2 con API Key/Secret (env vars) |
| **Google Analytics** (GA4) | Tracking de visitas y eventos | ID: `G-4EQE7MV2F7` |
| **Google Maps Embed** | Mapas en contacto y propiedades | Embed iframe |
| **Exchange Rate API** | Tipo de cambio USD/MXN en tiempo real | `api.exchangerate-api.com` (cache 24h) |
| **Google Apps Script** | Backend para formulario de leads | POST `no-cors` a Apps Script |
| **PHP Mail** (`send_email.php`) | Backend del formulario de contacto | Servidor PHP |
| **WhatsApp Business** | CTA de contacto directo | `wa.me/523222922312` |
| **Google Fonts** | Tipografias (Raleway, Titillium Web, Josefin Sans) | CDN Google |
| **WordPress Blog** | Blog externo | `ponchodavalosrealty.com/blog/` |

### Redes Sociales
- Facebook: [ponchodavalosre](https://www.facebook.com/ponchodavalosre)
- Instagram: [ponchodavalos_re](https://www.instagram.com/ponchodavalos_re/)
- YouTube: [ponchodavalos_re](https://www.youtube.com/@ponchodavalos_re)
- WhatsApp: [+52 322 292 2312](https://wa.me/523222922312)

---

## Funcionalidades Principales

### Internacionalizacion (i18n)
- **Idiomas:** Espanol (ES) e Ingles (EN)
- **Implementacion:** Sistema custom con `js/i18n.js`
- **Traducciones:** Archivos JSON en `/translations/`
- **Atributos HTML:** `data-i18n`, `data-i18n-html`, `data-i18n-placeholder`
- **Persistencia:** `localStorage` para preferencia de idioma
- **Switcher:** Toggle EN/ES visible en todas las paginas

### Conversion de Moneda
- **Monedas:** MXN (default) y USD
- **Tasa de cambio:** API en tiempo real con cache de 24h en `localStorage`
- **Fallback:** 18.5 MXN por USD
- **Switcher:** Toggle MXN/USD en paginas de propiedades

### Modo Oscuro
- **Toggle:** Boton en el side panel del header
- **CSS:** `dark-mode.css` con clase `.dark-mode` en `<body>`
- **Persistencia:** `localStorage`

### Captura de Leads
- **Formulario modal** con descarga de PDFs (Buyer's Guide, Seller's Guide, Pre-Sale Guide)
- **Campos:** Nombre, email, telefono, interes
- **Backend:** Google Apps Script que registra en Google Sheets
- **PDFs:** Almacenados en `/source/`

### Formulario de Contacto
- **Pagina:** `contact.html`
- **Validacion:** Client-side con regex de email
- **Backend:** `send_email.php` via AJAX
- **Campos:** Nombre, email, mensaje

### Galeria de Propiedades
- **Grilla filtrable** con jQuery Isotope (condos vs casas)
- **Lightbox** con Light Gallery para fotos
- **Navegacion prev/next** entre propiedades
- **Cards con efecto** grayscale → color en hover

---

## Navegacion y Layout

### Estructura de Navegacion

```
Header
├── Logo (enlace a index.html)
├── Menu Principal
│   ├── Inicio
│   ├── Propiedades
│   ├── Nosotros
│   ├── Servicios (submenu con 6 items)
│   ├── Blog (enlace externo WordPress)
│   └── Contacto
├── Language Switcher (EN/ES)
├── Side Panel (galeria preview + dark mode toggle)
└── Menu Movil (hamburger → slide-out)

Footer
├── Descripcion de la empresa
├── Links de redes sociales
├── Informacion de contacto
└── Menu secundario
```

### Layout Principal
```html
<div id="page" class="site">
  <header class="site-header header-transparent">
    <!-- Header fijo con efecto sticky (is-stuck) -->
  </header>
  <main>
    <!-- Contenido de pagina -->
  </main>
  <footer class="site-footer">
    <!-- Footer -->
  </footer>
</div>
```

### Responsive Breakpoints
| Breakpoint | Dispositivo |
|---|---|
| 1440px+ | Desktop ultra-wide |
| 1200px | Desktop estandar |
| 992px | Tablet landscape / desktop pequeno |
| 768px | Tablet portrait (breakpoint principal) |
| 576px | Movil |

---

## Estilos y Diseno

### Arquitectura CSS
- **Framework:** Bootstrap 5 como base
- **Estilos custom:** `style.css` (10,441 lineas) + modulos en `/css/`
- **Modularidad:** Un archivo CSS por funcionalidad (dark-mode, i18n, carousel, cards, etc.)
- **Minificacion:** Cada archivo tiene su version `.min.css`
- **Variables CSS:** Usadas en `info-cards.css` para sizing responsivo

### Tipografia
| Fuente | Uso |
|---|---|
| **Raleway** | Titulos y headings (300-900 weights) |
| **Titillium Web** | Texto de cuerpo (200-900 weights) |
| **Josefin Sans** | Texto secundario/acentos (300-700 weights) |
| **Muli** | Texto alternativo |

### Paleta de Colores
- **Dorado/Accent:** `#C9A227`, `#B8860B`
- **Modo oscuro:** `#1A1A1A` (fondo)
- **Modo claro:** Variantes de blanco/gris

### Animaciones
- **100% CSS nativo** — No usa librerias de animacion externas
- Transiciones: hover effects, scale, translate, opacity
- Keyframes: spinner de carga, fade-in del language switcher, efectos de galeria
- Efectos de cards: grayscale → color, lift en hover (`translateY(-3px)`)

### Iconografia
- **Font Awesome 5** — Iconos generales (1000+ glyphs)
- **Flaticon** — Iconos custom de propiedades y amenidades
- **SVGs** — Iconos de amenidades en `/images/iconos_properties/`

---

## SEO y Datos Estructurados

### Schema.org (JSON-LD)
- **Homepage:** `RealEstateAgent` con nombre, contacto, area de servicio, redes sociales
- **Propiedades MLS:** `RealEstateListing` con precio, direccion, coordenadas, amenidades, fotos
- **Breadcrumbs:** `BreadcrumbList` en paginas de propiedades

### Meta Tags
- Open Graph (Facebook/social sharing)
- Twitter Cards (`summary_large_image`)
- Canonical URLs en todas las paginas
- hreflang alternates (`en`, `es`, `x-default`)
- Meta description y keywords

### Sitemap y Robots
- **`sitemap.xml`** — Actualizado automaticamente con URLs MLS + hreflang
- **`robots.txt`** — Permite crawlers principales + LLM bots (GPTBot, ClaudeBot, PerplexityBot)
- Crawl-delay: 1s general, 0s Googlebot, 2s Bingbot

### Prioridades del Sitemap
| Pagina | Prioridad | Frecuencia |
|---|---|---|
| Homepage | 1.0 | weekly |
| Propiedades | 0.9 | weekly |
| About/Contact | 0.8 | monthly |
| Servicios | 0.7 | monthly |
| MLS Properties | 0.8 | weekly |

---

## Instalacion y Uso

### Requisitos
- **Node.js** >= 18
- **npm**

### Setup

```bash
# Clonar el repositorio
git clone <repo-url>
cd ponchodavalos

# Instalar dependencias
npm install
```

### Desarrollo (datos mock)

```bash
npm run build
```

Genera paginas de propiedades usando datos de prueba de `src/mock/listings.json`.

### Produccion (datos reales)

```bash
# Configurar variables de entorno
export SPARK_API_KEY=tu_api_key
export SPARK_API_SECRET=tu_api_secret
export SPARK_AGENT_ID=tu_agent_id

# Build con datos reales
npm run build:live
```

### Limpiar archivos generados

```bash
npm run clean
```

Elimina `/mls/` e `/images/mls/`.

### Servir localmente

El sitio es estatico — se puede servir con cualquier servidor HTTP:

```bash
npx serve .
# o
python -m http.server 8000
```

---

## CI/CD

### GitHub Actions (`update-listings.yml`)

El workflow se ejecuta automaticamente **cada 6 horas** y tambien puede dispararse manualmente.

**Pipeline:**
1. Checkout del repositorio
2. Setup Node.js 20 con cache de npm
3. `npm ci` — Instalar dependencias
4. `npm run build:live` — Build con datos reales de Spark API
5. Detectar cambios en archivos generados
6. Auto-commit y push si hay cambios

**Secretos requeridos en GitHub:**
- `SPARK_API_KEY`
- `SPARK_API_SECRET`
- `SPARK_AGENT_ID`

---

## Contacto

- **Agente:** Poncho Davalos Real Estate
- **Telefono:** +52 (322) 292-2312
- **Email:** hello@ponchodavalos.com.mx
- **WhatsApp:** [+52 322 292 2312](https://wa.me/523222922312)
- **Ubicacion:** Puerto Vallarta, Jalisco, Mexico
- **Web:** [ponchodavalos.com.mx](https://ponchodavalos.com.mx)
