const fs = require('fs-extra');
const path = require('path');
const Handlebars = require('handlebars');
const config = require('../config');

async function generatePortfolio(properties) {
  console.log(`[portfolio] Injecting ${properties.length} MLS cards into portfolio`);

  // Read card template
  const cardTemplatePath = path.join(config.templatesDir, 'property-card.html');
  const cardTemplateSrc = await fs.readFile(cardTemplatePath, 'utf-8');
  const cardTemplate = Handlebars.compile(cardTemplateSrc);

  // Render all cards
  const cards = properties.map(prop => cardTemplate(prop)).join('\n');

  const mlsBlock = `<!-- MLS-INJECT-START -->\n${cards}\n                        <!-- MLS-INJECT-END -->`;

  // Read portfolio file
  let html = await fs.readFile(config.portfolioPath, 'utf-8');

  // Check if markers already exist (idempotent)
  const startMarker = '<!-- MLS-INJECT-START -->';
  const endMarker = '<!-- MLS-INJECT-END -->';

  if (html.includes(startMarker) && html.includes(endMarker)) {
    // Replace existing MLS block
    const startIdx = html.indexOf(startMarker);
    const endIdx = html.indexOf(endMarker) + endMarker.length;
    html = html.substring(0, startIdx) + mlsBlock + html.substring(endIdx);
  } else {
    // Insert before closing </div> of projects-grid
    const gridEndMarker = '</div> <!-- end projects-grid -->';
    const insertIdx = html.indexOf(gridEndMarker);
    if (insertIdx === -1) {
      console.warn('[portfolio] Could not find projects-grid end marker, looking for alternative...');
      // Fallback: find the last project-item closing and insert after
      const lastProjectIdx = html.lastIndexOf('</div>\n\n                    </div> <!-- end projects-grid');
      if (lastProjectIdx !== -1) {
        html = html.substring(0, lastProjectIdx) + '</div>\n\n                        ' + mlsBlock + '\n\n                    </div> <!-- end projects-grid' + html.substring(lastProjectIdx + '</div>\n\n                    </div> <!-- end projects-grid'.length);
      }
    } else {
      html = html.substring(0, insertIdx) + '\n                        ' + mlsBlock + '\n\n                    ' + html.substring(insertIdx);
    }
  }

  await fs.writeFile(config.portfolioPath, html, 'utf-8');
  console.log('[portfolio] Portfolio updated successfully');
}

module.exports = generatePortfolio;
