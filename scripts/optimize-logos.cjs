// Downscales the university logos in assets/ to 160px (2× their 60–80px display size) into
// src/generated/logos/, so the list page doesn't pull ~250 KB of 600px originals.
// Run: node scripts/optimize-logos.cjs   (needs playwright-core + Chromium)
const path = require('path');
const fs = require('fs');
const { chromium } = require(process.env.PW_CORE || 'playwright-core');
const root = path.join(__dirname, '..');
const out = path.join(root, 'src', 'generated', 'logos');
fs.mkdirSync(out, { recursive: true });
const LOGOS = { damauni: 'damauni.png', svu: 'svu.png', iust: 'iust.png', aiu: 'aiu.jpg' };
const SIZE = 160;
(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROME || undefined, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setContent('<canvas id="c"></canvas>');
  for (const [name, file] of Object.entries(LOGOS)) {
    const src = path.join(root, 'assets', file);
    const mime = file.endsWith('.jpg') ? 'image/jpeg' : 'image/png';
    const dataUrl = `data:${mime};base64,${fs.readFileSync(src).toString('base64')}`;
    const png = await page.evaluate(async ({ src, SIZE }) => {
      const img = new Image(); await new Promise((r, j) => { img.onload = r; img.onerror = j; img.src = src; });
      const s = Math.min(SIZE / img.width, SIZE / img.height, 1);
      const c = document.getElementById('c'); c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
      const ctx = c.getContext('2d'); ctx.imageSmoothingQuality = 'high';
      ctx.fillStyle = '#FFFFFF'; ctx.fillRect(0, 0, c.width, c.height);   // they sit on a white disc anyway
      ctx.drawImage(img, 0, 0, c.width, c.height);
      return c.toDataURL('image/jpeg', 0.86);
    }, { src: dataUrl, SIZE });
    fs.writeFileSync(path.join(out, `${name}.jpg`), Buffer.from(png.split(',')[1], 'base64'));
  }
  await browser.close();
  console.log('wrote', fs.readdirSync(out).join(', '));
})();
