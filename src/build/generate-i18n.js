const fs = require('fs-extra');
const path = require('path');
const config = require('../config');

async function generateI18n(properties) {
  console.log(`[i18n] Generating translation keys for ${properties.length} MLS properties`);

  const enPath = path.join(config.translationsDir, 'en.json');
  const esPath = path.join(config.translationsDir, 'es.json');

  const en = await fs.readJson(enPath);
  const es = await fs.readJson(esPath);

  // Ensure property section exists
  if (!en.property) en.property = {};
  if (!es.property) es.property = {};

  // Remove stale MLS keys (keys starting with mls_ that are not in current properties)
  const currentSlugs = new Set(properties.map(p => `mls_${p.slug}`));
  for (const key of Object.keys(en.property)) {
    if (key.startsWith('mls_') && !currentSlugs.has(key)) {
      delete en.property[key];
      console.log(`[i18n]   Removed stale key: property.${key} (en)`);
    }
  }
  for (const key of Object.keys(es.property)) {
    if (key.startsWith('mls_') && !currentSlugs.has(key)) {
      delete es.property[key];
      console.log(`[i18n]   Removed stale key: property.${key} (es)`);
    }
  }

  // Add/update MLS property keys
  for (const prop of properties) {
    const mlsKey = `mls_${prop.slug}`;

    en.property[mlsKey] = {
      tagline: `${prop.propertyType} in ${prop.city} — ${prop.beds} bed, ${prop.baths} bath, ${prop.surface} m²`,
      description: prop.descriptionEn
    };

    es.property[mlsKey] = {
      tagline: `${prop.propertyType} en ${prop.city} — ${prop.beds} rec, ${prop.baths} baño${prop.baths !== 1 ? 's' : ''}, ${prop.surface} m²`,
      description: prop.descriptionEs
    };
  }

  await fs.writeJson(enPath, en, { spaces: 2 });
  await fs.writeJson(esPath, es, { spaces: 2 });

  console.log('[i18n] Translation files updated successfully');
}

module.exports = generateI18n;
