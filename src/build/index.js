const fetchListings = require('./fetch-listings');
const transformListings = require('./transform-data');
const downloadImages = require('./download-images');
const generatePages = require('./generate-pages');
const generatePortfolio = require('./generate-portfolio');
const generateSitemap = require('./generate-sitemap');
const generateI18n = require('./generate-i18n');

async function build() {
  const startTime = Date.now();
  console.log('=== MLS Build System ===');
  console.log(`Mode: ${require('../config').useMockData ? 'MOCK' : 'LIVE'}`);
  console.log('');

  try {
    // Step 1: Fetch listings
    console.log('--- Step 1: Fetch Listings ---');
    const rawListings = await fetchListings();

    // Step 2: Transform data
    console.log('\n--- Step 2: Transform Data ---');
    const properties = transformListings(rawListings);

    // Step 3: Download/generate images
    console.log('\n--- Step 3: Process Images ---');
    await downloadImages(properties);

    // Step 4: Generate property pages
    console.log('\n--- Step 4: Generate Property Pages ---');
    await generatePages(properties);

    // Step 5: Update portfolio
    console.log('\n--- Step 5: Update Portfolio ---');
    await generatePortfolio(properties);

    // Step 6: Update sitemap
    console.log('\n--- Step 6: Update Sitemap ---');
    await generateSitemap(properties);

    // Step 7: Update translations
    console.log('\n--- Step 7: Update Translations ---');
    await generateI18n(properties);

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`\n=== Build complete in ${elapsed}s ===`);
    console.log(`Generated ${properties.length} property pages in mls/`);
  } catch (err) {
    console.error('\n!!! Build failed !!!');
    console.error(err);
    process.exit(1);
  }
}

build();
