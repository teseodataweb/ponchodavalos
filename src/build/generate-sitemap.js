const fs = require('fs-extra');
const config = require('../config');

async function generateSitemap(properties) {
  console.log(`[sitemap] Adding ${properties.length} MLS URLs to sitemap`);

  const today = new Date().toISOString().split('T')[0];

  // Generate XML entries for MLS properties
  const entries = properties.map(prop => `  <!-- MLS: ${prop.name} -->
  <url>
    <loc>${config.siteUrl}/mls/${prop.fileName}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${config.siteUrl}/mls/${prop.fileName}"/>
    <xhtml:link rel="alternate" hreflang="es" href="${config.siteUrl}/es/mls/${prop.fileName}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${config.siteUrl}/mls/${prop.fileName}"/>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n\n');

  const mlsBlock = `<!-- MLS-SITEMAP-START -->\n${entries}\n  <!-- MLS-SITEMAP-END -->`;

  let xml = await fs.readFile(config.sitemapPath, 'utf-8');

  const startMarker = '<!-- MLS-SITEMAP-START -->';
  const endMarker = '<!-- MLS-SITEMAP-END -->';

  if (xml.includes(startMarker) && xml.includes(endMarker)) {
    // Replace existing MLS block
    const startIdx = xml.indexOf(startMarker);
    const endIdx = xml.indexOf(endMarker) + endMarker.length;
    xml = xml.substring(0, startIdx) + mlsBlock + xml.substring(endIdx);
  } else {
    // Insert before </urlset>
    const closeTag = '</urlset>';
    const insertIdx = xml.indexOf(closeTag);
    if (insertIdx === -1) {
      throw new Error('Could not find </urlset> in sitemap.xml');
    }
    xml = xml.substring(0, insertIdx) + '\n  ' + mlsBlock + '\n\n' + xml.substring(insertIdx);
  }

  await fs.writeFile(config.sitemapPath, xml, 'utf-8');
  console.log('[sitemap] Sitemap updated successfully');
}

module.exports = generateSitemap;
