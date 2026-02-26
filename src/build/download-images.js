const fs = require('fs-extra');
const path = require('path');
const config = require('../config');

async function downloadImages(properties) {
  console.log(`[images] Processing images for ${properties.length} properties`);

  for (const prop of properties) {
    const dir = path.join(config.imagesOutputDir, prop.slug);
    await fs.ensureDir(dir);

    if (config.useMockData) {
      // In mock mode, create placeholder images using sharp
      await createPlaceholderImages(dir, prop);
    } else {
      // In live mode, download from URLs
      await downloadPropertyImages(dir, prop);
    }
  }

  console.log('[images] All images processed');
}

async function createPlaceholderImages(dir, prop) {
  const sharp = require('sharp');

  // Create header image placeholder
  const headerPath = path.join(dir, 'header.jpg');
  if (!await fileExistsWithSize(headerPath)) {
    const svg = createPlaceholderSvg(1024, 683, prop.name, '#2c3e50');
    await sharp(Buffer.from(svg)).jpeg({ quality: 80 }).toFile(headerPath);
  }

  // Create numbered images
  for (let i = 0; i < prop.images.length; i++) {
    const imgPath = path.join(dir, `${i + 1}.jpg`);
    if (!await fileExistsWithSize(imgPath)) {
      const colors = ['#2c3e50', '#e74c3c', '#27ae60', '#f39c12', '#9b59b6', '#3498db'];
      const color = colors[i % colors.length];
      const svg = createPlaceholderSvg(1024, 683, `${prop.name} #${i + 1}`, color);
      await sharp(Buffer.from(svg)).jpeg({ quality: 80 }).toFile(imgPath);
    }
  }

  // Create thumbnail
  const thumbPath = path.join(dir, 'thumb.jpg');
  if (!await fileExistsWithSize(thumbPath)) {
    const svg = createPlaceholderSvg(config.thumbWidth, config.thumbHeight, prop.name, '#34495e');
    await sharp(Buffer.from(svg))
      .resize(config.thumbWidth, config.thumbHeight)
      .jpeg({ quality: 75 })
      .toFile(thumbPath);
  }
}

function createPlaceholderSvg(width, height, text, bgColor) {
  // Escape XML special characters
  const escaped = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  // Truncate text to fit
  const displayText = escaped.length > 30 ? escaped.substring(0, 27) + '...' : escaped;
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${bgColor}"/>
    <text x="50%" y="45%" font-family="Arial,sans-serif" font-size="${Math.floor(width / 20)}" fill="white" text-anchor="middle" dominant-baseline="middle">${displayText}</text>
    <text x="50%" y="58%" font-family="Arial,sans-serif" font-size="${Math.floor(width / 35)}" fill="rgba(255,255,255,0.6)" text-anchor="middle" dominant-baseline="middle">MLS Property Photo</text>
  </svg>`;
}

async function downloadPropertyImages(dir, prop) {
  const fetch = require('node-fetch');

  // Download header
  const headerPath = path.join(dir, 'header.jpg');
  if (!await fileExistsWithSize(headerPath) && prop.primaryPhotoUrl) {
    await downloadFile(fetch, prop.primaryPhotoUrl, headerPath);
  }

  // Download all photos with concurrency limit
  const downloadQueue = prop.images
    .filter(img => img.remoteSrc)
    .map(img => ({
      url: img.remoteSrc,
      dest: path.join(dir, `${img.order}.jpg`)
    }))
    .filter(item => !fs.pathExistsSync(item.dest) || fs.statSync(item.dest).size === 0);

  // Process in batches
  for (let i = 0; i < downloadQueue.length; i += config.downloadConcurrency) {
    const batch = downloadQueue.slice(i, i + config.downloadConcurrency);
    await Promise.all(batch.map(item => downloadFile(fetch, item.url, item.dest)));
  }

  // Create thumbnail from header
  const thumbPath = path.join(dir, 'thumb.jpg');
  if (!await fileExistsWithSize(thumbPath) && await fileExistsWithSize(headerPath)) {
    const sharp = require('sharp');
    await sharp(headerPath)
      .resize(config.thumbWidth, config.thumbHeight, { fit: 'cover' })
      .jpeg({ quality: 75 })
      .toFile(thumbPath);
  }
}

async function downloadFile(fetch, url, dest) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`[images] Failed to download ${url}: ${res.status}`);
      return;
    }
    const buffer = await res.buffer();
    await fs.writeFile(dest, buffer);
  } catch (err) {
    console.warn(`[images] Error downloading ${url}: ${err.message}`);
  }
}

async function fileExistsWithSize(filePath) {
  try {
    const stat = await fs.stat(filePath);
    return stat.size > 0;
  } catch {
    return false;
  }
}

module.exports = downloadImages;
