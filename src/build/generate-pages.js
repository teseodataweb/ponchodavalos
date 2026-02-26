const fs = require('fs-extra');
const path = require('path');
const Handlebars = require('handlebars');
const config = require('../config');

// Register Handlebars helpers
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

async function generatePages(properties) {
  console.log(`[pages] Generating ${properties.length} property pages`);

  await fs.ensureDir(config.outputDir);

  // Read and compile template
  const templatePath = path.join(config.templatesDir, 'property-page.html');
  const templateSrc = await fs.readFile(templatePath, 'utf-8');
  const template = Handlebars.compile(templateSrc);

  for (const prop of properties) {
    const html = template(prop);
    const outputPath = path.join(config.outputDir, prop.fileName);
    await fs.writeFile(outputPath, html, 'utf-8');
    console.log(`[pages]   -> ${prop.fileName}`);
  }

  // Write data.json
  const dataPath = path.join(config.outputDir, 'data.json');
  await fs.writeJson(dataPath, properties, { spaces: 2 });
  console.log(`[pages] Wrote data.json with ${properties.length} properties`);
}

module.exports = generatePages;
