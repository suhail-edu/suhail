// Renders every major icon used on the majors pages to a 256px white-on-transparent PNG
// in assets/icons/majors/. Run: node scripts/export-major-icons.cjs  (needs playwright-core + Chromium)
const path = require('path');
const fs = require('fs');
const { chromium } = require(process.env.PW_CORE || 'playwright-core');

const root = path.join(__dirname, '..');
const out = path.join(root, 'assets', 'icons', 'majors');
fs.mkdirSync(out, { recursive: true });

// same boxes as src/components/MajorIcon.jsx
const SPRITES = {
  sculpture: { file: 'assets/majors.png', x: 41, y: 67, w: 114, h: 175 },
  print:     { file: 'assets/majors.png', x: 175, y: 77, w: 129, h: 167 },
  theatre:   { file: 'assets/majors.png', x: 351, y: 76, w: 156, h: 167 },
  interior:  { file: 'assets/majors.png', x: 552, y: 75, w: 153, h: 168 },
  fashion:   { file: 'assets/majors.png', x: 744, y: 62, w: 90, h: 187 },
  graphic:   { file: 'src/generated/majors2-mask.png', x: 0, y: 79, w: 970, h: 941 },
  music:     { file: 'src/generated/majors2-mask.png', x: 2503, y: 0, w: 955, h: 1108 },
  painting:  { file: 'src/generated/majors2-mask.png', x: 4955, y: 121, w: 1126, h: 948 },
};
const SVG_DIR = path.join(root, 'src', 'icons', 'majors');
const SIZE = 256;

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROME || undefined, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setContent('<canvas id="c"></canvas>');

  const render = async (src, box) => page.evaluate(async ({ src, box, SIZE }) => {
    const img = new Image();
    await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = src; });
    const c = document.getElementById('c'); c.width = SIZE; c.height = SIZE;
    const ctx = c.getContext('2d'); ctx.clearRect(0, 0, SIZE, SIZE);
    const sx = box ? box.x : 0, sy = box ? box.y : 0, sw = box ? box.w : img.width, sh = box ? box.h : img.height;
    const pad = SIZE * 0.08, scale = Math.min((SIZE - 2 * pad) / sw, (SIZE - 2 * pad) / sh);
    const dw = sw * scale, dh = sh * scale;
    ctx.drawImage(img, sx, sy, sw, sh, (SIZE - dw) / 2, (SIZE - dh) / 2, dw, dh);
    ctx.globalCompositeOperation = 'source-in';  // keep the shape, paint it white
    ctx.fillStyle = '#FFFFFF'; ctx.fillRect(0, 0, SIZE, SIZE);
    return c.toDataURL('image/png');
  }, { src, box, SIZE });

  const save = (name, dataUrl) => fs.writeFileSync(path.join(out, `${name}.png`), Buffer.from(dataUrl.split(',')[1], 'base64'));
  const toDataUrl = (file) => {
    if (file.endsWith('.svg')) {
      // a viewBox-only SVG has no intrinsic size in the browser (defaults to 300×150) — give it one
      const svg = fs.readFileSync(file, 'utf8').replace('<svg ', `<svg width="${SIZE}" height="${SIZE}" `);
      return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
    }
    return `data:image/png;base64,${fs.readFileSync(file).toString('base64')}`;
  };

  for (const [name, s] of Object.entries(SPRITES)) save(name, await render(toDataUrl(path.join(root, s.file)), s));
  for (const f of fs.readdirSync(SVG_DIR).filter((f) => f.endsWith('.svg'))) {
    save(path.basename(f, '.svg'), await render(toDataUrl(path.join(SVG_DIR, f)), null));
  }
  await browser.close();
  console.log(`wrote ${fs.readdirSync(out).length} PNGs to ${path.relative(root, out)}`);
})();
