const config = require('../config');

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function mapIsotopeCategory(subType) {
  if (!subType) return 'category-14';
  const lower = subType.toLowerCase();
  if (lower.includes('condominium') || lower.includes('condo') || lower.includes('apartment')) {
    return 'category-19';
  }
  if (lower.includes('single family') || lower.includes('house') || lower.includes('villa')) {
    return 'category-20';
  }
  return 'category-14';
}

function formatPrice(num) {
  return num.toLocaleString('en-US');
}

function transformListings(rawListings) {
  console.log(`[transform] Processing ${rawListings.length} listings`);

  const properties = rawListings.map((listing, index) => {
    const listingId = listing.ListingId || listing.ListingKey;
    const slug = slugify(listingId);

    // Derive property name from street + unit
    const streetParts = [listing.StreetNumber, listing.StreetName].filter(Boolean).join(' ');
    const name = listing.UnitNumber
      ? `${streetParts} ${listing.UnitNumber}`
      : streetParts;

    const priceUsd = listing.ListPrice;
    const priceMxn = Math.round(priceUsd * config.exchangeRate);

    // Photos
    const photos = (listing.Photos || [])
      .sort((a, b) => (a.Order || 0) - (b.Order || 0));
    const primaryPhoto = photos.find(p => p.Primary) || photos[0];

    // Map images to local paths
    const images = photos.map((photo, i) => ({
      src: `../images/mls/${slug}/${i + 1}.jpg`,
      alt: `${name} - Image ${i + 1}`,
      remoteSrc: photo.Uri1024 || photo.UriLarge,
      order: i + 1
    }));

    const headerImage = `../images/mls/${slug}/header.jpg`;
    const thumbImage = `images/mls/${slug}/thumb.jpg`; // relative from root for portfolio cards

    // Google Maps embed URL
    const lat = listing.Latitude;
    const lng = listing.Longitude;
    const mapEmbedUrl = lat && lng
      ? `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d500!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1ses-419!2smx`
      : '';

    // Address
    const fullAddress = listing.UnparsedAddress ||
      [listing.StreetNumber, listing.StreetName, listing.UnitNumber, listing.City, listing.StateOrProvince].filter(Boolean).join(', ');
    const shortLocation = [listing.StateOrProvince ? listing.StateOrProvince.substring(0, 2).toUpperCase() : '', listing.City].filter(Boolean).join(', ');

    // Schema.org JSON-LD
    const schemaOrg = {
      '@context': 'https://schema.org',
      '@type': 'RealEstateListing',
      name: name,
      description: listing.PublicRemarks || '',
      url: `${config.siteUrl}/mls/property-${slug}.html`,
      image: [`${config.siteUrl}/images/mls/${slug}/header.jpg`],
      datePosted: listing.ModificationTimestamp ? listing.ModificationTimestamp.split('T')[0] : new Date().toISOString().split('T')[0],
      address: {
        '@type': 'PostalAddress',
        addressLocality: listing.City || 'Puerto Vallarta',
        addressRegion: listing.StateOrProvince || 'Jalisco',
        addressCountry: 'MX'
      },
      geo: lat && lng ? {
        '@type': 'GeoCoordinates',
        latitude: String(lat),
        longitude: String(lng)
      } : undefined,
      offers: {
        '@type': 'Offer',
        price: String(priceUsd),
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock'
      },
      numberOfRooms: listing.BedsTotal || 0,
      numberOfBathroomsTotal: listing.BathsTotal || 0,
      floorSize: {
        '@type': 'QuantitativeValue',
        value: listing.BuildingAreaTotal || 0,
        unitCode: 'MTK'
      },
      amenityFeature: (listing.Amenities || []).map(a => ({
        '@type': 'LocationFeatureSpecification',
        name: a
      })),
      broker: {
        '@type': 'RealEstateAgent',
        name: config.agentName,
        telephone: config.agentPhone,
        email: config.agentEmail,
        url: config.siteUrl
      }
    };

    // i18n key prefix
    const i18nKey = `property.mls_${slug}`;

    return {
      // Identity
      listingId: listingId,
      slug: slug,
      name: name,
      fileName: `property-${slug}.html`,
      url: `mls/property-${slug}.html`,
      fullUrl: `${config.siteUrl}/mls/property-${slug}.html`,

      // Pricing
      priceUsd: priceUsd,
      priceMxn: priceMxn,
      priceUsdFormatted: `$${formatPrice(priceUsd)} USD`,
      priceMxnFormatted: `$${formatPrice(priceMxn)} MXN`,

      // Details
      beds: listing.BedsTotal || 0,
      baths: listing.BathsTotal || 0,
      surface: listing.BuildingAreaTotal || 0,
      parking: listing.ParkingTotal || 0,
      yearBuilt: listing.YearBuilt || '',
      furnished: listing.Furnished || '',
      view: listing.View || '',
      propertyType: listing.PropertySubType || listing.PropertyType || '',

      // Location
      city: listing.City || 'Puerto Vallarta',
      state: listing.StateOrProvince || 'Jalisco',
      address: fullAddress,
      shortLocation: shortLocation,
      lat: lat,
      lng: lng,
      mapEmbedUrl: mapEmbedUrl,

      // Descriptions
      descriptionEn: listing.PublicRemarks || '',
      descriptionEs: listing.PublicRemarksEs || listing.PublicRemarks || '',

      // Features
      amenities: listing.Amenities || [],
      appliances: listing.Appliances || [],
      utilities: listing.Utilities || [],
      locationFeatures: listing.LocationFeatures || [],

      // Images
      headerImage: headerImage,
      thumbImage: thumbImage,
      images: images,
      primaryPhotoUrl: primaryPhoto ? (primaryPhoto.Uri1024 || primaryPhoto.UriLarge) : '',
      allPhotoUrls: photos.map(p => p.Uri1024 || p.UriLarge),

      // Isotope
      isotopeCategory: mapIsotopeCategory(listing.PropertySubType),

      // SEO
      schemaOrg: JSON.stringify(schemaOrg, null, 6),
      metaDescription: (listing.PublicRemarks || '').substring(0, 160),
      ogImage: `${config.siteUrl}/images/mls/${slug}/header.jpg`,

      // i18n
      i18nKey: i18nKey,

      // Navigation (set after all properties are mapped)
      prevProperty: null,
      nextProperty: null,

      // Parking text
      parkingText: listing.ParkingTotal > 0 ? `${listing.ParkingTotal} space${listing.ParkingTotal > 1 ? 's' : ''}` : 'None'
    };
  });

  // Set next/prev navigation
  for (let i = 0; i < properties.length; i++) {
    if (i > 0) {
      properties[i].prevProperty = {
        name: properties[i - 1].name,
        url: `property-${properties[i - 1].slug}.html`,
        thumb: `../images/mls/${properties[i - 1].slug}/thumb.jpg`
      };
    }
    if (i < properties.length - 1) {
      properties[i].nextProperty = {
        name: properties[i + 1].name,
        url: `property-${properties[i + 1].slug}.html`,
        thumb: `../images/mls/${properties[i + 1].slug}/thumb.jpg`
      };
    }
  }

  console.log(`[transform] Processed ${properties.length} properties`);
  return properties;
}

module.exports = transformListings;
