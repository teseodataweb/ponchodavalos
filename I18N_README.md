# Sistema de Internacionalización (i18n) - Poncho Dávalos Real Estate

## 📋 Descripción

Este sitio web ahora cuenta con un sistema completo de internacionalización que permite cambiar entre **Inglés (EN)** y **Español (ES)** de forma dinámica, sin recargar la página.

## 🚀 Características

- ✅ Cambio de idioma instantáneo (EN ↔ ES)
- ✅ Persistencia del idioma seleccionado (LocalStorage)
- ✅ Botón flotante con diseño moderno
- ✅ Atajo de teclado: `Alt + L` para cambiar idioma
- ✅ Optimización SEO con etiquetas `hreflang`
- ✅ Accesibilidad completa (ARIA labels)
- ✅ Animaciones suaves al cambiar contenido
- ✅ Compatible con modo oscuro

## 📁 Estructura de Archivos

```
ponchodavalos/
├── translations/
│   ├── en.json          # Traducciones en inglés
│   └── es.json          # Traducciones en español
├── js/
│   └── i18n.js          # Sistema de internacionalización
├── css/
│   └── i18n.css         # Estilos del selector de idioma
└── index.html           # Página principal con atributos data-i18n
```

## 🎯 Cómo Funciona

### 1. Archivos JSON de Traducciones

Las traducciones se almacenan en archivos JSON estructurados:

**Ejemplo de `translations/en.json`:**
```json
{
  "nav": {
    "home": "Home",
    "properties": "Properties",
    "aboutUs": "About Us"
  },
  "hero": {
    "slide1": {
      "title": "A New Level of Living in Puerto Vallarta",
      "description": "Discover residences that elevate your lifestyle..."
    }
  }
}
```

### 2. Atributos HTML `data-i18n`

Cada elemento traducible tiene un atributo `data-i18n` que apunta a una clave en el JSON:

```html
<h1 data-i18n="hero.slide1.title">A New Level of Living in Puerto Vallarta</h1>
<p data-i18n="hero.slide1.description">Discover residences...</p>
```

### 3. Botón Selector de Idioma

Un botón flotante en la esquina superior derecha permite cambiar entre idiomas:

```html
<div class="lang-switcher">
    <button class="lang-btn active" data-lang="en">EN</button>
    <button class="lang-btn" data-lang="es">ES</button>
</div>
```

## 🛠️ Cómo Agregar Nuevas Traducciones

### Paso 1: Agregar la traducción en los archivos JSON

**En `translations/en.json`:**
```json
{
  "nuevaSeccion": {
    "titulo": "My New Section Title"
  }
}
```

**En `translations/es.json`:**
```json
{
  "nuevaSeccion": {
    "titulo": "Mi Nuevo Título de Sección"
  }
}
```

### Paso 2: Agregar el atributo `data-i18n` en el HTML

```html
<h2 data-i18n="nuevaSeccion.titulo">My New Section Title</h2>
```

### Paso 3: El sistema actualizará automáticamente el contenido

No se requiere código JavaScript adicional. El sistema i18n detectará automáticamente todos los elementos con `data-i18n`.

## 📝 Casos Especiales

### Traducir Placeholders

Para traducir placeholders de inputs:

```html
<input type="text"
       placeholder="SEARCH..."
       data-i18n-placeholder
       data-i18n="search.placeholder">
```

### Traducir Contenido HTML

Si necesitas traducir HTML (no solo texto):

```html
<div data-i18n-html="seccion.contenido">
    Default <strong>HTML</strong> content
</div>
```

## 🎨 Personalización del Selector de Idioma

### Cambiar Posición

Edita `css/i18n.css`:

```css
.lang-switcher {
    position: fixed;
    top: 20px;        /* Cambia esto */
    right: 80px;      /* Cambia esto */
}
```

### Cambiar Colores

```css
.lang-btn.active {
    background: #c0b596;  /* Color activo */
    color: #1a1a1a;
}
```

## 🔧 API JavaScript

El sistema expone una API global `window.i18n`:

```javascript
// Cambiar idioma programáticamente
window.i18n.changeLanguage('es');

// Obtener idioma actual
const currentLang = window.i18n.getCurrentLanguage();
console.log(currentLang); // 'en' o 'es'

// Obtener una traducción específica
const texto = window.i18n.t('nav.home');
console.log(texto); // 'Home' o 'Inicio'
```

### Escuchar Cambios de Idioma

```javascript
window.addEventListener('languageChanged', (event) => {
    console.log('Nuevo idioma:', event.detail.language);
    // Ejecutar código personalizado aquí
});
```

## 🌐 Optimización SEO

El sistema incluye optimización SEO automática:

### Etiquetas Hreflang

```html
<link rel="alternate" hreflang="en" href="https://ponchodavalos.com.mx/index.html" />
<link rel="alternate" hreflang="es" href="https://ponchodavalos.com.mx/es/index.html" />
<link rel="alternate" hreflang="x-default" href="https://ponchodavalos.com.mx/index.html" />
```

### Atributo lang Dinámico

El atributo `lang` del elemento `<html>` se actualiza automáticamente:

```html
<html lang="en">  <!-- Cambia a "es" cuando se selecciona español -->
```

## ⌨️ Atajos de Teclado

- **Alt + L**: Alterna entre inglés y español

## 📱 Responsive Design

El selector de idioma es completamente responsive:

- **Desktop**: Botones grandes en la esquina superior derecha
- **Mobile**: Botones más pequeños y compactos
- **Dark Mode**: Se adapta automáticamente al modo oscuro

## 🔍 Troubleshooting

### El idioma no cambia

1. Verifica que los archivos `translations/en.json` y `translations/es.json` existen
2. Abre la consola del navegador (F12) y busca errores
3. Asegúrate de que el archivo `js/i18n.js` está cargado

### Algunos textos no se traducen

1. Verifica que el elemento tiene el atributo `data-i18n`
2. Confirma que la clave existe en ambos archivos JSON
3. Revisa que la ruta de la clave es correcta (ej: `nav.home`)

### El selector de idioma no aparece

1. Verifica que `css/i18n.css` está incluido en el `<head>`
2. Revisa que el HTML del selector está presente en el `<body>`

## 🎯 Próximos Pasos

Para expandir el sistema a otras páginas:

1. **Copia el botón selector** del `index.html` a las demás páginas
2. **Agrega los atributos `data-i18n`** al contenido traducible
3. **Incluye los archivos CSS y JS** en el `<head>`:
   ```html
   <link rel="stylesheet" href="css/i18n.css" />
   <script src="js/i18n.js"></script>
   ```
4. **Actualiza las traducciones** en `translations/en.json` y `translations/es.json`

## 📞 Soporte

Para agregar más páginas o idiomas, sigue esta estructura:

```javascript
// Agregar francés (ejemplo)
// 1. Crear translations/fr.json
// 2. Agregar botón en HTML
<button class="lang-btn" data-lang="fr">FR</button>
```

---

## ✨ Resumen de Implementación

Este sistema i18n es:
- **Ligero**: ~5KB total (CSS + JS)
- **Rápido**: Sin recargas de página
- **Mantenible**: Traducciones centralizadas en JSON
- **Escalable**: Fácil agregar nuevos idiomas
- **Accesible**: Compatible con lectores de pantalla
- **SEO-friendly**: Etiquetas hreflang y lang dinámico

¡Tu sitio web ahora está completamente internacionalizado! 🌍🎉
