# Guía de Implementación i18n para Otras Páginas

## 🎯 Objetivo

Esta guía te ayudará a implementar el sistema de internacionalización en las demás páginas del sitio web.

## 📋 Lista de Verificación por Página

Para cada página HTML que quieras traducir, sigue estos pasos:

### ✅ Paso 1: Agregar Enlaces CSS y JS

En el `<head>` de cada página, después de `style.css`:

```html
<link rel="stylesheet" href="style.css" />
<link rel="stylesheet" href="css/i18n.css" />
```

Antes del cierre de `</body>`:

```html
<!-- i18n SCRIPT -->
<script src="js/i18n.js"></script>
```

### ✅ Paso 2: Agregar Botón Selector de Idioma

Justo después de `<body class="royal_preloader">`:

```html
<body class="royal_preloader">
    <!-- Language Switcher -->
    <div class="lang-switcher">
        <button class="lang-btn active" data-lang="en" aria-label="Switch to English">
            <span class="sr-only">Switch to</span>EN
        </button>
        <button class="lang-btn" data-lang="es" aria-label="Cambiar a Español">
            <span class="sr-only">Cambiar a</span>ES
        </button>
    </div>

    <!-- Resto del contenido -->
```

### ✅ Paso 3: Agregar Etiquetas Meta y Hreflang

En el `<head>`:

```html
<meta name="description" content="Tu descripción aquí">
<meta name="keywords" content="tus, palabras, clave">

<!-- Alternate Language Links -->
<link rel="alternate" hreflang="en" href="https://ponchodavalos.com.mx/tu-pagina.html" />
<link rel="alternate" hreflang="es" href="https://ponchodavalos.com.mx/es/tu-pagina.html" />
<link rel="alternate" hreflang="x-default" href="https://ponchodavalos.com.mx/tu-pagina.html" />
```

### ✅ Paso 4: Identificar Contenido Traducible

Identifica todo el texto visible que necesita traducción:

#### Elementos a Traducir:
- ✓ Títulos (`<h1>`, `<h2>`, etc.)
- ✓ Párrafos (`<p>`)
- ✓ Enlaces (`<a>`)
- ✓ Botones (`<button>`, `<input type="submit">`)
- ✓ Placeholders de inputs
- ✓ Textos de navegación
- ✓ Labels de formularios

#### Elementos que NO se Traducen:
- ✗ Nombres propios (Poncho Dávalos)
- ✗ Direcciones de email
- ✗ Números de teléfono
- ✗ URLs

### ✅ Paso 5: Agregar Atributos data-i18n

Para cada elemento identificado, agrega el atributo `data-i18n`:

**Antes:**
```html
<h1>About Us</h1>
<p>We are a real estate company...</p>
<a href="contact.html">Contact Us</a>
```

**Después:**
```html
<h1 data-i18n="aboutPage.title">About Us</h1>
<p data-i18n="aboutPage.description">We are a real estate company...</p>
<a href="contact.html" data-i18n="aboutPage.contactLink">Contact Us</a>
```

### ✅ Paso 6: Actualizar Archivos JSON

Agrega las nuevas claves de traducción a los archivos JSON.

**En `translations/en.json`:**
```json
{
  "nav": { ... },
  "hero": { ... },
  "aboutPage": {
    "title": "About Us",
    "description": "We are a real estate company...",
    "contactLink": "Contact Us"
  }
}
```

**En `translations/es.json`:**
```json
{
  "nav": { ... },
  "hero": { ... },
  "aboutPage": {
    "title": "Nosotros",
    "description": "Somos una empresa inmobiliaria...",
    "contactLink": "Contáctanos"
  }
}
```

## 📄 Ejemplos por Tipo de Página

### 🏠 Página "About Us" (about-us.html)

```html
<section class="about-section">
    <h1 data-i18n="aboutPage.mainTitle">About Poncho Dávalos Real Estate</h1>
    <p data-i18n="aboutPage.intro">Founded in 2015, we specialize in...</p>

    <div class="mission">
        <h2 data-i18n="aboutPage.missionTitle">Our Mission</h2>
        <p data-i18n="aboutPage.missionText">To provide exceptional...</p>
    </div>

    <div class="values">
        <h2 data-i18n="aboutPage.valuesTitle">Our Values</h2>
        <ul>
            <li data-i18n="aboutPage.value1">Integrity</li>
            <li data-i18n="aboutPage.value2">Excellence</li>
            <li data-i18n="aboutPage.value3">Trust</li>
        </ul>
    </div>
</section>
```

**Agregar a JSON:**
```json
{
  "aboutPage": {
    "mainTitle": "About Poncho Dávalos Real Estate",
    "intro": "Founded in 2015, we specialize in...",
    "missionTitle": "Our Mission",
    "missionText": "To provide exceptional...",
    "valuesTitle": "Our Values",
    "value1": "Integrity",
    "value2": "Excellence",
    "value3": "Trust"
  }
}
```

### 📞 Página de Contacto (contact.html)

```html
<section class="contact-section">
    <h1 data-i18n="contactPage.title">Contact Us</h1>
    <p data-i18n="contactPage.subtitle">Get in touch with our team</p>

    <form>
        <label data-i18n="contactPage.nameLabel">Your Name</label>
        <input type="text"
               placeholder="John Doe"
               data-i18n-placeholder
               data-i18n="contactPage.namePlaceholder">

        <label data-i18n="contactPage.emailLabel">Your Email</label>
        <input type="email"
               placeholder="john@example.com"
               data-i18n-placeholder
               data-i18n="contactPage.emailPlaceholder">

        <label data-i18n="contactPage.messageLabel">Message</label>
        <textarea placeholder="Your message here..."
                  data-i18n-placeholder
                  data-i18n="contactPage.messagePlaceholder"></textarea>

        <button type="submit" data-i18n="contactPage.submitButton">Send Message</button>
    </form>
</section>
```

**Agregar a JSON:**
```json
{
  "contactPage": {
    "title": "Contact Us",
    "subtitle": "Get in touch with our team",
    "nameLabel": "Your Name",
    "namePlaceholder": "John Doe",
    "emailLabel": "Your Email",
    "emailPlaceholder": "john@example.com",
    "messageLabel": "Message",
    "messagePlaceholder": "Your message here...",
    "submitButton": "Send Message"
  }
}
```

### 🏘️ Página de Propiedades (portfolio-four-column-wide.html)

```html
<section class="properties-section">
    <h1 data-i18n="propertiesPage.title">Featured Properties</h1>
    <p data-i18n="propertiesPage.subtitle">Explore our exclusive listings</p>

    <!-- Filtros -->
    <div class="filters">
        <button data-i18n="propertiesPage.filterAll">All</button>
        <button data-i18n="propertiesPage.filterSale">For Sale</button>
        <button data-i18n="propertiesPage.filterRent">For Rent</button>
    </div>

    <!-- Property Card -->
    <div class="property-card">
        <h3>Casa Moderna en Marina Vallarta</h3>  <!-- NO traducir (nombre específico) -->
        <div class="property-details">
            <span data-i18n="propertiesPage.bedrooms">Bedrooms</span>: 3<br>
            <span data-i18n="propertiesPage.bathrooms">Bathrooms</span>: 2<br>
            <span data-i18n="propertiesPage.area">Area</span>: 150m²
        </div>
        <a href="#" data-i18n="propertiesPage.viewDetails">View Details</a>
    </div>
</section>
```

## 🔄 Estructura JSON Recomendada

Para mantener organizadas las traducciones, usa esta estructura:

```json
{
  "nav": {
    "home": "...",
    "properties": "...",
    "aboutUs": "...",
    "services": "...",
    "blog": "...",
    "contacts": "..."
  },
  "hero": { ... },
  "aboutPage": { ... },
  "contactPage": { ... },
  "propertiesPage": { ... },
  "servicesPage": { ... },
  "footer": { ... },
  "common": {
    "readMore": "Read More",
    "learnMore": "Learn More",
    "seeAll": "See All",
    "contactUs": "Contact Us"
  }
}
```

## 🚀 Automatización con Find & Replace

Para acelerar el proceso, usa estas expresiones de búsqueda y reemplazo en tu editor:

### VSCode / Editor de Texto

**Buscar títulos:**
```regex
<h1>(.*?)</h1>
```

**Reemplazar con:**
```html
<h1 data-i18n="page.title">$1</h1>
```

## ✅ Lista de Páginas a Implementar

Marca las páginas conforme las vayas completando:

- [ ] about-us.html
- [ ] contact.html
- [ ] portfolio-four-column-wide.html
- [ ] servcies-detail-1.html
- [ ] servcies-detail-2.html
- [ ] servcies-detail-3.html
- [ ] servcies-detail-4.html
- [ ] servcies-detail-5.html
- [ ] servcies-detail-6.html
- [ ] property-1.html
- [ ] property-2.html
- [ ] property-3.html
- [ ] (agregar más según sea necesario)

## 🧪 Pruebas

Para cada página implementada:

1. ✓ Abre la página en el navegador
2. ✓ Haz clic en el botón de idioma (EN/ES)
3. ✓ Verifica que todo el texto cambie correctamente
4. ✓ Prueba el atajo `Alt + L`
5. ✓ Recarga la página y verifica que el idioma persista
6. ✓ Prueba en modo móvil (responsive)

## 💡 Consejos y Mejores Prácticas

### ✅ Buenas Prácticas

- **Usa nombres descriptivos** para las claves JSON
  ```json
  "hero.slide1.title"  ✓ Bueno
  "h1text"             ✗ Malo
  ```

- **Agrupa traducciones relacionadas**
  ```json
  "contactPage": {
    "title": "...",
    "subtitle": "...",
    "form": {
      "name": "...",
      "email": "..."
    }
  }
  ```

- **Reutiliza traducciones comunes**
  ```json
  "common": {
    "readMore": "Read More",
    "contactUs": "Contact Us"
  }
  ```

### ❌ Evita

- **No traduzcas nombres propios**: Poncho Dávalos, Puerto Vallarta
- **No traduzcas datos técnicos**: URLs, códigos, IDs
- **No uses HTML dentro del JSON** a menos que uses `data-i18n-html`

## 📞 Preguntas Frecuentes

**P: ¿Puedo tener diferentes traducciones para la misma palabra?**
R: Sí, usa contextos diferentes:
```json
{
  "nav.home": "Home",
  "breadcrumb.home": "Homepage"
}
```

**P: ¿Qué pasa si falta una traducción?**
R: El sistema mostrará el texto original del HTML.

**P: ¿Cómo agrego un tercer idioma (francés, alemán)?**
R:
1. Crea `translations/fr.json`
2. Agrega un tercer botón: `<button data-lang="fr">FR</button>`
3. Traduce todo el contenido del JSON

---

¡Con esta guía podrás implementar el sistema i18n en todas las páginas de tu sitio! 🌍✨
