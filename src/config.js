const path = require('path');

const ROOT = path.resolve(__dirname, '..');

module.exports = {
  // Spark API config (via env vars)
  sparkApiKey: process.env.SPARK_API_KEY || '',
  sparkApiSecret: process.env.SPARK_API_SECRET || '',
  sparkAgentId: process.env.SPARK_AGENT_ID || '',
  sparkApiUrl: 'https://sparkapi.com/v1',

  // Build mode
  useMockData: process.env.USE_MOCK_DATA !== 'false',

  // Exchange rate fallback
  exchangeRate: parseFloat(process.env.EXCHANGE_RATE) || 18.5,

  // Paths
  root: ROOT,
  mockDataPath: path.join(__dirname, 'mock', 'listings.json'),
  templatesDir: path.join(__dirname, 'templates'),
  outputDir: path.join(ROOT, 'mls'),
  imagesOutputDir: path.join(ROOT, 'images', 'mls'),
  portfolioPath: path.join(ROOT, 'portfolio-four-column-wide.html'),
  sitemapPath: path.join(ROOT, 'sitemap.xml'),
  translationsDir: path.join(ROOT, 'translations'),

  // Site config
  siteUrl: 'https://ponchodavalos.com.mx',
  agentName: 'Poncho Davalos Real Estate',
  agentPhone: '+52-322-292-2312',
  agentEmail: 'hello@ponchodavalos.com.mx',
  whatsappUrl: 'https://wa.me/523222922312',

  // Image settings
  thumbWidth: 600,
  thumbHeight: 400,
  downloadConcurrency: 5
};
