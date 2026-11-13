import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ANALOG_SITES } from '../src/data/mockData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const earthDir = path.join(rootDir, 'public', 'images', 'earth');
const planetaryDir = path.join(rootDir, 'public', 'images', 'planetary');

fs.mkdirSync(earthDir, { recursive: true });
fs.mkdirSync(planetaryDir, { recursive: true });

const USER_AGENT = 'TerraMatchApp/1.0 (NASA Space Apps)';

async function fetchBufferWithTimeout(url, headers = {}, timeoutMs = 12000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { headers, signal: controller.signal });
    clearTimeout(id);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const arrayBuffer = await res.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

async function fetchWikiImage(query) {
  try {
    const cleanQuery = encodeURIComponent(query.replace(/[\(\)\/]/g, ' ').replace(/\s+/g, ' ').trim());
    const apiUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${cleanQuery}&gsrnamespace=6&gsrlimit=4&prop=imageinfo&iiprop=url&iiurlwidth=800&format=json`;
    const res = await fetch(apiUrl, { headers: { 'User-Agent': USER_AGENT } });
    if (!res.ok) return null;
    const data = await res.json();
    const pages = data.query?.pages || {};
    for (const pageId in pages) {
      const info = pages[pageId]?.imageinfo?.[0];
      const imgUrl = info?.thumburl || info?.url;
      if (imgUrl && !imgUrl.endsWith('.svg') && !imgUrl.endsWith('.tif')) {
        return imgUrl;
      }
    }
  } catch (err) {
    console.warn(`Wiki query error for "${query}":`, err.message);
  }
  return null;
}

async function fetchNasaImage(query) {
  try {
    const cleanQuery = encodeURIComponent(query.replace(/[\(\)\/]/g, ' ').replace(/\s+/g, ' ').trim());
    const apiUrl = `https://images-api.nasa.gov/search?q=${cleanQuery}&media_type=image`;
    const res = await fetch(apiUrl);
    if (!res.ok) return null;
    const data = await res.json();
    const items = data.collection?.items || [];
    for (const item of items.slice(0, 5)) {
      const preview = item?.links?.find(l => l.rel === 'preview')?.href || item?.links?.[0]?.href;
      if (preview && !preview.endsWith('.tif')) {
        return preview;
      }
    }
  } catch (err) {
    console.warn(`NASA query error for "${query}":`, err.message);
  }
  return null;
}

// 1x1 neutral fallback JPEG buffer (valid JPEG header)
const FALLBACK_JPEG = Buffer.from([
  0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46, 0x49, 0x46, 0x00, 0x01, 0x01, 0x01, 0x00, 0x48,
  0x00, 0x48, 0x00, 0x00, 0xFF, 0xDB, 0x00, 0x43, 0x00, 0x08, 0x06, 0x06, 0x07, 0x06, 0x05, 0x08,
  0x07, 0x07, 0x07, 0x09, 0x09, 0x08, 0x0A, 0x0C, 0x14, 0x0D, 0x0C, 0x0B, 0x0B, 0x0C, 0x19, 0x12,
  0x13, 0x0F, 0x14, 0x1D, 0x1A, 0x1F, 0x1E, 0x1D, 0x1A, 0x1C, 0x1C, 0x20, 0x24, 0x2E, 0x27, 0x20,
  0x22, 0x2C, 0x23, 0x1C, 0x1C, 0x28, 0x37, 0x29, 0x2C, 0x30, 0x31, 0x34, 0x34, 0x34, 0x1F, 0x27,
  0x39, 0x3D, 0x38, 0x32, 0x3C, 0x2E, 0x33, 0x34, 0x32, 0xFF, 0xC0, 0x00, 0x0B, 0x08, 0x00, 0x01,
  0x00, 0x01, 0x01, 0x01, 0x11, 0x00, 0xFF, 0xC4, 0x00, 0x1F, 0x00, 0x00, 0x01, 0x05, 0x01, 0x01,
  0x01, 0x01, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x02, 0x03, 0x04,
  0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0xFF, 0xDA, 0x00, 0x08, 0x01, 0x01, 0x00, 0x00, 0x3F,
  0x00, 0x7F, 0x00, 0xFF, 0xD9
]);

async function downloadImageToFile(url, destPath, fallbackBuffer = FALLBACK_JPEG) {
  if (url) {
    try {
      const buf = await fetchBufferWithTimeout(url, { 'User-Agent': USER_AGENT });
      if (buf && buf.length > 500) {
        fs.writeFileSync(destPath, buf);
        return true;
      }
    } catch (err) {
      console.warn(`Download failed for ${url}:`, err.message);
    }
  }
  if (!fs.existsSync(destPath) || fs.statSync(destPath).size < 100) {
    fs.writeFileSync(destPath, fallbackBuffer);
  }
  return false;
}

async function run() {
  console.log(`🚀 Starting TerraMatch image fetch for ${ANALOG_SITES.length} analog sites...`);

  for (let i = 0; i < ANALOG_SITES.length; i++) {
    const site = ANALOG_SITES[i];
    console.log(`\n[${i + 1}/${ANALOG_SITES.length}] Processing ${site.name} (${site.country})...`);

    // 1. Earth Site Image
    const earthDest = path.join(earthDir, `${site.id}.jpg`);
    const earthQueries = [
      `${site.name} ${site.country}`,
      site.name,
      `${site.category} ${site.country}`
    ];
    let earthUrl = null;
    for (const q of earthQueries) {
      earthUrl = await fetchWikiImage(q);
      if (earthUrl) break;
    }
    const earthSaved = await downloadImageToFile(earthUrl, earthDest);
    console.log(`  ✓ Earth: ${earthSaved ? 'Downloaded from Wikimedia' : 'Default fallback'} -> public/images/earth/${site.id}.jpg`);

    // 2. Mars Target Image
    const marsDest = path.join(planetaryDir, `${site.id}-mars.jpg`);
    const marsTargetName = site.targetAnalogSite?.Mars || 'Jezero Crater';
    const marsQueries = [
      `${marsTargetName.split('&')[0].trim()} Mars`,
      `${site.targetSiteDetails?.title?.replace(/^Mars:\s*/i, '') || ''} Mars`,
      'Mars surface crater',
      'Mars rover terrain'
    ];
    let marsUrl = null;
    for (const q of marsQueries) {
      if (!q.trim()) continue;
      marsUrl = await fetchNasaImage(q);
      if (marsUrl) break;
    }
    const marsSaved = await downloadImageToFile(marsUrl, marsDest);
    console.log(`  ✓ Mars: ${marsSaved ? 'Downloaded from NASA API' : 'Default fallback'} -> public/images/planetary/${site.id}-mars.jpg`);

    // 3. Moon Target Image
    const moonDest = path.join(planetaryDir, `${site.id}-moon.jpg`);
    const moonTargetName = site.targetAnalogSite?.Moon || 'Mare Tranquillitatis';
    const moonQueries = [
      `${moonTargetName.split('&')[0].trim()} Moon`,
      `${site.targetSiteDetails?.title?.replace(/^Moon:\s*/i, '') || ''} Moon`,
      'Moon crater surface Apollo',
      'Lunar mare surface'
    ];
    let moonUrl = null;
    for (const q of moonQueries) {
      if (!q.trim()) continue;
      moonUrl = await fetchNasaImage(q);
      if (moonUrl) break;
    }
    const moonSaved = await downloadImageToFile(moonUrl, moonDest);
    console.log(`  ✓ Moon: ${moonSaved ? 'Downloaded from NASA API' : 'Default fallback'} -> public/images/planetary/${site.id}-moon.jpg`);
  }

  console.log('\n✨ All 20 sites processed successfully! Photos downloaded to public/images/earth and public/images/planetary.');
}

run().catch(err => {
  console.error('Fatal fetch error:', err);
  process.exit(1);
});
