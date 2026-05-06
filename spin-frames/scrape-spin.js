const { chromium } = require('playwright');
const https = require('https');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname);
const VDP_URL = 'https://www.clutch.ca/vehicles/93214';

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, res => {
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', err => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Track spin frame URLs in order, deduped
  const seen = new Set();
  const frames = [];

  page.on('request', req => {
    const url = req.url();
    if (url.includes('fastly.clutch.ca') && url.includes('class=high')) {
      const uuid = url.match(/fastly\.clutch\.ca\/([^.]+)\.jpg/)?.[1];
      if (uuid && !seen.has(uuid)) {
        seen.add(uuid);
        frames.push(uuid);
        process.stdout.write(`\rCaptured ${frames.length} unique frames`);
      }
    }
  });

  console.log('Loading page...');
  await page.goto(VDP_URL, { waitUntil: 'networkidle' });

  // Find the spin carousel element
  await page.waitForTimeout(2000);

  // Look for the 360 spin container — try common selectors
  const spinSelectors = [
    '[class*="spin"]',
    '[class*="360"]',
    '[class*="turntable"]',
    '[class*="carousel"]',
    '[data-testid*="spin"]',
  ];

  let spinEl = null;
  for (const sel of spinSelectors) {
    try {
      spinEl = await page.$(sel);
      if (spinEl) {
        console.log(`\nFound spin element with selector: ${sel}`);
        break;
      }
    } catch {}
  }

  if (!spinEl) {
    // Fall back to the first large image container
    spinEl = await page.$('img[src*="fastly.clutch.ca"]');
    if (spinEl) {
      // Get the parent container
      spinEl = await spinEl.evaluateHandle(el => el.closest('div'));
    }
  }

  if (!spinEl) {
    console.log('\nCould not find spin element. Taking screenshot for debugging...');
    await page.screenshot({ path: path.join(OUTPUT_DIR, 'debug.png') });
    await browser.close();
    return;
  }

  const box = await spinEl.boundingBox();
  console.log(`\nSpin element box: ${JSON.stringify(box)}`);

  // Slowly drag across the carousel multiple times to trigger all frames
  const cx = box.x + box.width / 2;
  const cy = box.y + box.height / 2;
  const startX = box.x + 20;
  const endX = box.x + box.width - 20;

  console.log('Scrubbing carousel...');

  for (let pass = 0; pass < 4; pass++) {
    const from = pass % 2 === 0 ? startX : endX;
    const to = pass % 2 === 0 ? endX : startX;

    await page.mouse.move(from, cy);
    await page.mouse.down();

    const steps = 80;
    for (let s = 0; s <= steps; s++) {
      const x = from + ((to - from) * s) / steps;
      await page.mouse.move(x, cy);
      await page.waitForTimeout(60);
    }

    await page.mouse.up();
    await page.waitForTimeout(500);
    process.stdout.write(`\rPass ${pass + 1}/4 — ${frames.length} unique frames captured`);
  }

  console.log(`\n\nDone scrubbing. ${frames.length} unique frames found.`);

  if (frames.length === 0) {
    console.log('No frames captured. The carousel may use a different image class. Taking screenshot...');
    await page.screenshot({ path: path.join(OUTPUT_DIR, 'debug.png'), fullPage: false });
    await browser.close();
    return;
  }

  await browser.close();

  // Download all frames
  console.log('Downloading high-res frames...');
  for (let i = 0; i < frames.length; i++) {
    const uuid = frames[i];
    const filename = `frame-${String(i + 1).padStart(3, '0')}.jpg`;
    const url = `https://fastly.clutch.ca/${uuid}.jpg?class=high`;
    const dest = path.join(OUTPUT_DIR, filename);
    await download(url, dest);
    process.stdout.write(`\r  ${i + 1}/${frames.length} — ${filename}`);
  }

  console.log(`\n\nAll done! ${frames.length} frames saved to ${OUTPUT_DIR}`);

  // Save a manifest
  const manifest = frames.map((uuid, i) => ({
    frame: i + 1,
    file: `frame-${String(i + 1).padStart(3, '0')}.jpg`,
    uuid,
  }));
  fs.writeFileSync(path.join(OUTPUT_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2));
  console.log('manifest.json written.');
})();
