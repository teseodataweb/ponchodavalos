const fs = require('fs-extra');
const path = require('path');
const Handlebars = require('handlebars');
const config = require('../config');

// --- Register Handlebars helpers (same as generate-pages.js) ---

Handlebars.registerHelper('json', function(context) {
  return new Handlebars.SafeString(JSON.stringify(context));
});

Handlebars.registerHelper('eq', function(a, b) {
  return a === b;
});

Handlebars.registerHelper('gt', function(a, b) {
  return a > b;
});

Handlebars.registerHelper('ifCond', function(v1, operator, v2, options) {
  switch (operator) {
    case '>': return (v1 > v2) ? options.fn(this) : options.inverse(this);
    case '<': return (v1 < v2) ? options.fn(this) : options.inverse(this);
    case '==': return (v1 == v2) ? options.fn(this) : options.inverse(this);
    default: return options.inverse(this);
  }
});

// --- Additional PSEO helpers ---

Handlebars.registerHelper('formatNumber', function(num) {
  if (num === null || num === undefined) return '';
  return Number(num).toLocaleString('en-US');
});

Handlebars.registerHelper('upper', function(str) {
  if (!str) return '';
  return String(str).toUpperCase();
});

Handlebars.registerHelper('ifEq', function(a, b, options) {
  return (a === b) ? options.fn(this) : options.inverse(this);
});

// --- Template map by page type ---
const TEMPLATE_MAP = {
  A: 'pseo-zona.hbs',
  B: 'pseo-tipo-propiedad.hbs',
  C: 'pseo-editorial.hbs'
};

// --- Schema builder ---

function buildSchemaOrg(page) {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        'name': 'Poncho Dávalos',
        'jobTitle': 'Asesor Inmobiliario',
        'memberOf': { '@type': 'Organization', 'name': 'AMPI Riviera Nayarit' },
        'telephone': '+52-322-292-2312',
        'email': 'hello@ponchodavalos.com.mx',
        'url': 'https://ponchodavalos.com.mx'
      },
      {
        '@type': 'RealEstateAgent',
        'name': 'Poncho Davalos Real Estate',
        'telephone': '+52 (322) 292-2312',
        'email': 'hello@ponchodavalos.com.mx',
        'url': 'https://ponchodavalos.com.mx',
        'areaServed': page.zona
          ? { '@type': 'Place', 'name': `${page.zona}, ${page.municipio}` }
          : 'Puerto Vallarta'
      }
    ]
  };

  // FAQPage schema from faqItems
  if (page.faqItems && page.faqItems.length > 0) {
    schema['@graph'].push({
      '@type': 'FAQPage',
      'mainEntity': page.faqItems.map(faq => ({
        '@type': 'Question',
        'name': page.idioma === 'en' ? faq.preguntaEn : faq.pregunta,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': page.idioma === 'en' ? faq.respuestaEn : faq.respuesta
        }
      }))
    });
  }

  // For Type C pages, add Article schema
  if (page.tipo === 'C') {
    schema['@graph'].push({
      '@type': 'Article',
      'headline': page.h1,
      'author': { '@type': 'Person', 'name': 'Poncho Dávalos' },
      'datePublished': page.fechaPublicacion || new Date().toISOString().split('T')[0],
      'dateModified': new Date().toISOString().split('T')[0],
      'publisher': { '@type': 'Organization', 'name': 'Poncho Davalos Real Estate' }
    });
  }

  return JSON.stringify(schema);
}

// --- Sitemap update ---

async function updateSitemap(pages) {
  console.log(`[pseo-sitemap] Adding ${pages.length} PSEO URLs to sitemap`);

  const today = new Date().toISOString().split('T')[0];

  // Build a lookup for slugAlt pairs
  const slugAltMap = {};
  for (const page of pages) {
    if (page.slugAlt) {
      slugAltMap[page.slug] = page.slugAlt;
    }
  }

  // Hub page entry (highest priority among PSEO pages)
  const hubEntry = `  <!-- PSEO: Hub Page -->
  <url>
    <loc>${config.siteUrl}/pseo/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;

  const entries = [hubEntry].concat(pages.map(page => {
    const priority = (page.tipo === 'A' || page.tipo === 'B') ? '0.8' : '0.7';
    const loc = `${config.siteUrl}/pseo/${page.slug}/`;

    // Build hreflang links
    let hreflangs = '';
    if (page.slugAlt) {
      const altUrl = `${config.siteUrl}/pseo/${page.slugAlt}/`;
      if (page.idioma === 'es') {
        hreflangs = `    <xhtml:link rel="alternate" hreflang="es" href="${loc}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${altUrl}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${loc}"/>`;
      } else {
        hreflangs = `    <xhtml:link rel="alternate" hreflang="en" href="${loc}"/>
    <xhtml:link rel="alternate" hreflang="es" href="${altUrl}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${altUrl}"/>`;
      }
    } else {
      hreflangs = `    <xhtml:link rel="alternate" hreflang="es" href="${loc}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${loc}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${loc}"/>`;
    }

    return `  <!-- PSEO: ${page.h1 || page.slug} -->
  <url>
    <loc>${loc}</loc>
${hreflangs}
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })).join('\n\n');

  const pseoBlock = `<!-- PSEO-SITEMAP-START -->\n${entries}\n  <!-- PSEO-SITEMAP-END -->`;

  let xml = await fs.readFile(config.sitemapPath, 'utf-8');

  const startMarker = '<!-- PSEO-SITEMAP-START -->';
  const endMarker = '<!-- PSEO-SITEMAP-END -->';

  if (xml.includes(startMarker) && xml.includes(endMarker)) {
    // Replace existing PSEO block (idempotent)
    const startIdx = xml.indexOf(startMarker);
    const endIdx = xml.indexOf(endMarker) + endMarker.length;
    xml = xml.substring(0, startIdx) + pseoBlock + xml.substring(endIdx);
  } else {
    // Insert before </urlset>
    const closeTag = '</urlset>';
    const insertIdx = xml.indexOf(closeTag);
    if (insertIdx === -1) {
      throw new Error('Could not find </urlset> in sitemap.xml');
    }
    xml = xml.substring(0, insertIdx) + '\n  ' + pseoBlock + '\n\n' + xml.substring(insertIdx);
  }

  await fs.writeFile(config.sitemapPath, xml, 'utf-8');
  console.log('[pseo-sitemap] Sitemap updated successfully');
}

// --- i18n update ---

async function updateI18n(pages) {
  console.log(`[pseo-i18n] Generating translation keys for ${pages.length} PSEO pages`);

  const enPath = path.join(config.translationsDir, 'en.json');
  const esPath = path.join(config.translationsDir, 'es.json');

  const en = await fs.readJson(enPath);
  const es = await fs.readJson(esPath);

  // Ensure pseo section exists
  if (!en.pseo) en.pseo = {};
  if (!es.pseo) es.pseo = {};

  // Remove stale PSEO keys not present in current dataset
  const currentSlugs = new Set(pages.map(p => p.slug));
  for (const key of Object.keys(en.pseo)) {
    if (!currentSlugs.has(key)) {
      delete en.pseo[key];
      console.log(`[pseo-i18n]   Removed stale key: pseo.${key} (en)`);
    }
  }
  for (const key of Object.keys(es.pseo)) {
    if (!currentSlugs.has(key)) {
      delete es.pseo[key];
      console.log(`[pseo-i18n]   Removed stale key: pseo.${key} (es)`);
    }
  }

  // Add/update PSEO page keys
  for (const page of pages) {
    en.pseo[page.slug] = {
      title: page.titleEn || page.title || page.h1,
      description: page.descriptionEn || page.description || ''
    };

    es.pseo[page.slug] = {
      title: page.titleEs || page.title || page.h1,
      description: page.descriptionEs || page.description || ''
    };
  }

  await fs.writeJson(enPath, en, { spaces: 2 });
  await fs.writeJson(esPath, es, { spaces: 2 });

  console.log('[pseo-i18n] Translation files updated successfully');
}

// --- Main generator ---

async function generatePseo() {
  const ROOT = path.resolve(__dirname, '..', '..');
  const dataPath = path.join(ROOT, 'pseo', 'data', 'pages.json');

  // Gracefully skip if dataset does not exist yet
  if (!await fs.pathExists(dataPath)) {
    console.log('[pseo] No pseo/data/pages.json found — skipping PSEO generation');
    return;
  }

  const pages = await fs.readJson(dataPath);

  if (!Array.isArray(pages) || pages.length === 0) {
    console.log('[pseo] pages.json is empty — skipping PSEO generation');
    return;
  }

  console.log(`[pseo] Generating ${pages.length} PSEO pages`);

  const today = new Date().toISOString().split('T')[0];
  const currentYear = new Date().getFullYear();

  // Pre-compile templates (only those needed)
  const compiledTemplates = {};
  const usedTypes = new Set(pages.map(p => p.tipo));
  for (const tipo of usedTypes) {
    const templateFile = TEMPLATE_MAP[tipo];
    if (!templateFile) {
      console.warn(`[pseo] Unknown page tipo "${tipo}" — skipping`);
      continue;
    }
    const templatePath = path.join(config.templatesDir, templateFile);
    if (!await fs.pathExists(templatePath)) {
      console.warn(`[pseo] Template not found: ${templatePath} — pages with tipo "${tipo}" will be skipped`);
      continue;
    }
    const templateSrc = await fs.readFile(templatePath, 'utf-8');
    compiledTemplates[tipo] = Handlebars.compile(templateSrc);
  }

  // Generate each page
  for (const page of pages) {
    const template = compiledTemplates[page.tipo];
    if (!template) {
      console.warn(`[pseo]   Skipping "${page.slug}" — no template for tipo "${page.tipo}"`);
      continue;
    }

    // Build context
    const context = {
      ...page,
      fullUrl: `${config.siteUrl}/pseo/${page.slug}/`,
      ogImage: `${config.siteUrl}/images/bg/puerto-vallarta-hero.jpg`,
      isEnglish: page.idioma === 'en',
      currentYear: currentYear,
      fechaActualizacion: today,
      schemaOrg: buildSchemaOrg(page),
      // Pass site config for templates
      siteUrl: config.siteUrl,
      agentName: config.agentName,
      agentPhone: config.agentPhone,
      agentEmail: config.agentEmail,
      whatsappUrl: config.whatsappUrl
    };

    const html = template(context);

    // Write to pseo/{slug}/index.html
    const outputDir = path.join(ROOT, 'pseo', page.slug);
    await fs.ensureDir(outputDir);
    const outputPath = path.join(outputDir, 'index.html');
    await fs.writeFile(outputPath, html, 'utf-8');
    console.log(`[pseo]   -> pseo/${page.slug}/index.html`);
  }

  // Generate hub page
  const hubTemplatePath = path.join(config.templatesDir, 'pseo-hub.hbs');
  if (await fs.pathExists(hubTemplatePath)) {
    const hubTemplateSrc = await fs.readFile(hubTemplatePath, 'utf-8');
    const hubTemplate = Handlebars.compile(hubTemplateSrc);

    // Group pages by type and region
    const esPages = pages.filter(p => p.idioma === 'es');
    const enPages = pages.filter(p => p.idioma === 'en');

    const hubContext = {
      metaTitle: 'Mercado Inmobiliario Puerto Vallarta | Poncho Dávalos',
      metaDesc: 'Análisis del mercado inmobiliario de Puerto Vallarta y Riviera Nayarit. Zonas, precios, ROI y guías de inversión por Poncho Dávalos, Asociado AMPI.',
      fullUrl: `${config.siteUrl}/pseo/`,
      ogImage: `${config.siteUrl}/images/bg/puerto-vallarta-hero.jpg`,
      currentYear,
      fechaActualizacion: today,
      schemaOrg: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Mercado Inmobiliario Puerto Vallarta y Riviera Nayarit',
        description: 'Análisis completo del mercado inmobiliario de Puerto Vallarta y Riviera Nayarit. Zonas, precios, ROI y guías de inversión.',
        author: { '@type': 'Person', name: 'Poncho Dávalos' },
        publisher: { '@type': 'Organization', name: 'Poncho Davalos Real Estate' }
      }),
      zonaCentro: esPages.filter(p => p.tipo === 'A' && p.region === 'Centro'),
      zonaNorte: esPages.filter(p => p.tipo === 'A' && p.region === 'Norte'),
      zonaSur: esPages.filter(p => p.tipo === 'A' && p.region === 'Sur'),
      tipoPropiedad: esPages.filter(p => p.tipo === 'B'),
      editorial: esPages.filter(p => p.tipo === 'C'),
      zonaCentroEn: enPages.filter(p => p.tipo === 'A' && p.region === 'Centro'),
      zonaNorteEn: enPages.filter(p => p.tipo === 'A' && p.region === 'Norte'),
      tipoPropiedadEn: enPages.filter(p => p.tipo === 'B'),
      editorialEn: enPages.filter(p => p.tipo === 'C'),
      siteUrl: config.siteUrl,
      agentName: config.agentName,
      agentPhone: config.agentPhone,
      agentEmail: config.agentEmail,
      whatsappUrl: config.whatsappUrl
    };

    const hubHtml = hubTemplate(hubContext);
    await fs.writeFile(path.join(ROOT, 'pseo', 'index.html'), hubHtml, 'utf-8');
    console.log('[pseo]   -> pseo/index.html (hub page)');
  }

  // Update sitemap
  await updateSitemap(pages);

  // Update i18n
  await updateI18n(pages);

  console.log(`[pseo] Done — ${pages.length} PSEO pages generated`);
}

module.exports = generatePseo;
