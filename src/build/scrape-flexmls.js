const fetch = require('node-fetch');
const config = require('../config');

const FLEXMLS_URL = config.flexmlsUrl || 'https://my.flexmls.com/alfonso_davalos';

/**
 * Scrapes the public FlexMLS agent page to extract property listings.
 * Returns data in the same format that transform-data.js expects.
 */
async function scrapeFlexMLS() {
  console.log(`[flexmls] Fetching ${FLEXMLS_URL}`);
  const res = await fetch(FLEXMLS_URL, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
    }
  });

  if (!res.ok) {
    throw new Error(`FlexMLS fetch failed: ${res.status} ${res.statusText}`);
  }

  const html = await res.text();
  const listings = parseListings(html);
  console.log(`[flexmls] Scraped ${listings.length} listings`);
  return listings;
}

/**
 * Parses FlexMLS HTML listing-group blocks.
 *
 * Each listing is wrapped in:
 *   <div class="listing-group">
 *     <div id="KEY" data-standard-status="Active" data-current-price="168000.0" ...>
 *       <div class="carousel" data-image-carousel-images="[...]"> ... </div>
 *       <div class="info-wrapper">
 *         <div class="line-one">ADDRESS, NAME</div>
 *         <div class="line-two">CITY, STATE ZIP</div>
 *         <div class="mls-nbr">#12345</div>
 *         <div class="data-row"> title + value pairs </div>
 *       </div>
 *     </div>
 *   </div>
 */
function parseListings(html) {
  const listings = [];

  // Split HTML by listing-group blocks
  const blocks = html.split('<div class="listing-group">').slice(1);

  for (const block of blocks) {
    // Listing ID from the div id attribute
    const idMatch = block.match(/<div\s+id="(\d{20,})"/);
    if (!idMatch) continue;
    const listingKey = idMatch[1];

    // Status
    const statusMatch = block.match(/data-standard-status="([^"]+)"/);
    const status = statusMatch ? statusMatch[1] : 'Active';
    if (status !== 'Active') continue;

    // Price
    const priceMatch = block.match(/data-current-price="([^"]+)"/);
    const price = priceMatch ? parseFloat(priceMatch[1]) : 0;

    // Address line-one: "7 Batallon de San Blas 1, Condo San Blas"
    const lineOneMatch = block.match(/<div\s+class="line-one">([^<]+)<\/div>/);
    const lineOne = lineOneMatch ? decodeHtml(lineOneMatch[1].trim()) : '';

    // City/State line-two: "Puerto Vallarta, JA ********"
    const lineTwoMatch = block.match(/<div\s+class="line-two">([^<]+)<\/div>/);
    const lineTwo = lineTwoMatch ? decodeHtml(lineTwoMatch[1].trim()) : '';

    // MLS number: "#41264"
    const mlsMatch = block.match(/<div\s+class="mls-nbr">#?(\d+)<\/div>/);
    const mlsNumber = mlsMatch ? mlsMatch[1] : listingKey.substring(0, 8);

    // Extract data rows (Property Type, Total SqFt, Total Bedrooms, Total Baths)
    const dataRows = {};
    const rowPattern = /<div\s+class="title"\s+title="([^"]+)">.*?<\/div>\s*<div\s+class="value"\s+title="([^"]+)">/gs;
    let rowMatch;
    while ((rowMatch = rowPattern.exec(block)) !== null) {
      dataRows[rowMatch[1].trim()] = rowMatch[2].trim();
    }

    const propertyType = dataRows['Property Type'] || '';
    const sqft = parseFloat((dataRows['Total SqFt'] || '0').replace(/,/g, ''));
    const beds = parseFloat(dataRows['Total Bedrooms'] || '0');
    const baths = parseFloat(dataRows['Total Baths'] || '0');

    // Image carousel JSON
    const carouselMatch = block.match(/data-image-carousel-images="(\[.*?\])"/s);
    let photos = [];
    if (carouselMatch) {
      try {
        const decoded = carouselMatch[1].replace(/&quot;/g, '"').replace(/&amp;/g, '&');
        const urls = JSON.parse(decoded);
        photos = urls.map((url, idx) => ({
          Uri1024: url.replace(/\/640x480\//, '/1024x768/'),
          UriLarge: url,
          Order: idx,
          Primary: idx === 0
        }));
      } catch { /* ignore parse errors */ }
    }

    // Parse address components
    // lineOne: "7 Batallon de San Blas 1, Condo San Blas" or "147 P.º De Las Palmas, Casa Frida"
    const addressParts = lineOne.split(',').map(s => s.trim());
    const streetAddress = addressParts[0] || '';
    const propertyName = addressParts.length > 1 ? addressParts.slice(1).join(', ') : streetAddress;

    // Parse street number and name
    const streetMatch = streetAddress.match(/^(\d+)\s+(.+)/);
    const streetNumber = streetMatch ? streetMatch[1] : '';
    const streetName = streetMatch ? streetMatch[2] : streetAddress;

    // Parse city and state from lineTwo: "Puerto Vallarta, JA ********"
    const cityStateMatch = lineTwo.match(/^([^,]+),\s*(\w{2})/);
    const rawCity = cityStateMatch ? cityStateMatch[1].trim() : 'Puerto Vallarta';
    const city = rawCity === 'Other' ? 'Puerto Vallarta' : rawCity;
    const stateAbbr = cityStateMatch ? cityStateMatch[2] : 'JA';
    const stateMap = { 'JA': 'Jalisco', 'NA': 'Nayarit' };
    const state = stateMap[stateAbbr] || stateAbbr;

    // Convert sqft to m2
    const surfaceM2 = sqft ? Math.round(sqft * 0.092903 * 100) / 100 : 0;

    listings.push({
      ListingId: `FLX-${mlsNumber}`,
      ListingKey: listingKey,
      StandardStatus: status,
      ListPrice: price,
      PropertyType: propertyType.includes('House') ? 'Single Family' : 'Condominium',
      PropertySubType: propertyType.includes('House') ? 'Single Family' : 'Condominium',
      StreetNumber: streetNumber,
      StreetName: streetName,
      UnitNumber: '',
      City: city,
      StateOrProvince: state,
      UnparsedAddress: `${lineOne}, ${lineTwo}`.replace(/\s*\*+\s*$/, ''),
      BedsTotal: beds,
      BathsTotal: baths,
      BuildingAreaTotal: surfaceM2,
      ParkingTotal: 0,
      YearBuilt: '',
      Furnished: '',
      View: '',
      Latitude: null,
      Longitude: null,
      PublicRemarks: `${propertyName} — ${beds} bed, ${baths} bath, ${sqft.toLocaleString('en-US')} sqft ${propertyType.toLowerCase()} in ${city}.`,
      PublicRemarksEs: `${propertyName} — ${beds} rec, ${baths} baños, ${sqft.toLocaleString('en-US')} pies² ${propertyType === 'Houses' ? 'casa' : 'condominio'} en ${city}.`,
      Photos: photos,
      Amenities: [],
      Appliances: [],
      Utilities: [],
      LocationFeatures: [],
      ModificationTimestamp: new Date().toISOString(),
      _flexmlsUrl: `https://my.flexmls.com/alfonso_davalos/search/office_listing_categories/Active/listings/${listingKey}`,
      _mlsNumber: mlsNumber,
      _source: 'flexmls-scrape'
    });
  }

  return listings;
}

function decodeHtml(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&middot;/g, '·')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(n));
}

module.exports = scrapeFlexMLS;
