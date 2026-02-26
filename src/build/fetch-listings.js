const fs = require('fs-extra');
const config = require('../config');

async function fetchListings() {
  if (config.useMockData) {
    console.log('[fetch] Using mock data');
    const data = await fs.readJson(config.mockDataPath);
    console.log(`[fetch] Loaded ${data.length} mock listings`);
    return data;
  }

  console.log('[fetch] Fetching from Spark API...');
  const fetch = require('node-fetch');

  // Spark API OAuth2 token
  const tokenRes = await fetch(`${config.sparkApiUrl}/session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ApiKey: config.sparkApiKey,
      ApiSecret: config.sparkApiSecret
    })
  });

  if (!tokenRes.ok) {
    throw new Error(`Spark API auth failed: ${tokenRes.status}`);
  }

  const tokenData = await tokenRes.json();
  const token = tokenData.D.Results[0].AuthToken;

  // Fetch active listings for agent
  const listingsRes = await fetch(
    `${config.sparkApiUrl}/listings?_filter=ListAgentKey Eq '${config.sparkAgentId}' And StandardStatus Eq 'Active'&_expand=Photos&_limit=50`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    }
  );

  if (!listingsRes.ok) {
    throw new Error(`Spark API listings fetch failed: ${listingsRes.status}`);
  }

  const listingsData = await listingsRes.json();
  const listings = listingsData.D.Results;
  console.log(`[fetch] Fetched ${listings.length} listings from Spark API`);
  return listings;
}

module.exports = fetchListings;
