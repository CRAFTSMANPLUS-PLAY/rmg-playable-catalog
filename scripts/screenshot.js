/**
 * CRAFTSMAN+ RMG Playable Catalog — Screenshot Automation
 *
 * Usage:
 *   npm install puppeteer
 *   node scripts/screenshot.js
 *
 * Loops through all playables in playables.js, loads each preview URL
 * in a mobile-sized viewport, waits for the playable to render,
 * captures a screenshot, and saves it to /images/{slug}.jpg
 *
 * Run this locally or via GitHub Actions (see .github/workflows/screenshots.yml)
 */

const puppeteer = require('puppeteer');
const path      = require('path');
const fs        = require('fs');

// ─── Inline the playable data so the script is standalone ───────
const PLAYABLES = require('../playables.js'); // Won't work directly — see note below

// ─── Config ─────────────────────────────────────────────────────
const VIEWPORT_WIDTH  = 390;
const VIEWPORT_HEIGHT = 844;  // iPhone 14-ish
const WAIT_MS         = 3500; // Time to wait for playable to fully render
const IMAGES_DIR      = path.join(__dirname, '..', 'images');
const QUALITY         = 88;

// ─── Helpers ────────────────────────────────────────────────────
function slugFromName(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// ─── Main ────────────────────────────────────────────────────────
async function run() {
  ensureDir(IMAGES_DIR);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-web-security',   // Allow cross-origin iframes
      '--allow-running-insecure-content',
    ],
  });

  // Read playables from the JS file (eval it since it's not a module)
  const playablesSource = fs.readFileSync(path.join(__dirname, '..', 'playables.js'), 'utf8');
  const PLAYABLES = eval(playablesSource + '; PLAYABLES;');

  const results = { success: [], failed: [], skipped: [] };

  for (const playable of PLAYABLES) {
    const slug     = slugFromName(playable.name);
    const filename = `${slug}.jpg`;
    const filepath = path.join(IMAGES_DIR, filename);

    // Skip if already exists (use --force flag to regenerate)
    if (fs.existsSync(filepath) && !process.argv.includes('--force')) {
      console.log(`⏭  Skipping: ${playable.name} (already exists)`);
      results.skipped.push(playable.name);
      continue;
    }

    console.log(`📸 Capturing: ${playable.name}`);
    console.log(`   URL: ${playable.previewUrl}`);

    const page = await browser.newPage();

    try {
      await page.setViewport({
        width:             VIEWPORT_WIDTH,
        height:            VIEWPORT_HEIGHT,
        deviceScaleFactor: 2,  // Retina quality
        isMobile:          true,
        hasTouch:          true,
      });

      // Block analytics and tracking to speed up loads
      await page.setRequestInterception(true);
      page.on('request', req => {
        const url = req.url();
        if (['analytics', 'tracking', 'facebook', 'doubleclick'].some(s => url.includes(s))) {
          req.abort();
        } else {
          req.continue();
        }
      });

      await page.goto(playable.previewUrl, {
        waitUntil: 'networkidle2',
        timeout:   20000,
      });

      // Wait extra for JS-heavy playables to animate in
      await new Promise(r => setTimeout(r, WAIT_MS));

      // If the preview page embeds an iframe, try to screenshot just the iframe content
      // Otherwise fall back to full page
      const frameHandle = await page.$('iframe');
      let screenshotTarget = page;

      if (frameHandle) {
        const frame = await frameHandle.contentFrame();
        if (frame) {
          // Create a new page and navigate to the raw playable URL for a cleaner shot
          const rawUrl = new URL(playable.previewUrl);
          const playableParam = rawUrl.searchParams.get('playable');
          
          if (playableParam && playableParam.startsWith('http')) {
            console.log(`   → Navigating to raw playable for cleaner capture`);
            const rawPage = await browser.newPage();
            await rawPage.setViewport({
              width: 390, height: 844, deviceScaleFactor: 2,
              isMobile: true, hasTouch: true
            });
            await rawPage.goto(playableParam, { waitUntil: 'networkidle2', timeout: 20000 });
            await new Promise(r => setTimeout(r, WAIT_MS));
            await rawPage.screenshot({ path: filepath, type: 'jpeg', quality: QUALITY });
            await rawPage.close();
            console.log(`   ✅ Saved: images/${filename}`);
            results.success.push(playable.name);

            // Update the thumbnail path in playables.js reference
            playable.thumbnail = `images/${filename}`;
            await page.close();
            continue;
          }
        }
      }

      await screenshotTarget.screenshot({ path: filepath, type: 'jpeg', quality: QUALITY });
      console.log(`   ✅ Saved: images/${filename}`);
      results.success.push(playable.name);

    } catch (err) {
      console.error(`   ❌ Failed: ${playable.name}`);
      console.error(`      ${err.message}`);
      results.failed.push({ name: playable.name, error: err.message });
    } finally {
      await page.close();
    }

    // Small delay between requests to be courteous
    await new Promise(r => setTimeout(r, 500));
  }

  await browser.close();

  // ─── Summary ───────────────────────────────────────────────────
  console.log('\n── Screenshot Summary ──────────────────────────');
  console.log(`✅ Success:  ${results.success.length}`);
  console.log(`⏭  Skipped:  ${results.skipped.length}`);
  console.log(`❌ Failed:   ${results.failed.length}`);
  if (results.failed.length > 0) {
    console.log('\nFailed playables:');
    results.failed.forEach(f => console.log(`  • ${f.name}: ${f.error}`));
  }
  console.log('────────────────────────────────────────────────');

  // Exit with error code if any failed (useful for CI)
  process.exit(results.failed.length > 0 ? 1 : 0);
}

run().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
