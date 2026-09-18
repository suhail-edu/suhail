// Derives a mask-only copy of assets/majors2.png for the CSS-mask icons:
// dark pixels (the palette's paint dots) become transparent so they read as holes
// instead of being filled with the icon colour. Run: npm run icons
const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const src = path.join(__dirname, '..', 'assets', 'majors2.png');
const out = path.join(__dirname, '..', 'src', 'generated', 'majors2-mask.png');
const png = PNG.sync.read(fs.readFileSync(src));
const { width, height, data } = png;
let holes = 0;
for (let i = 0; i < width * height * 4; i += 4) {
  const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
  if (a === 0) continue;
  const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  if (lum < 0.35) { data[i + 3] = 0; holes++; } // black dots → transparent
  else { data[i] = data[i + 1] = data[i + 2] = 255; } // only alpha matters for a mask
}
fs.writeFileSync(out, PNG.sync.write(png));
console.log(`wrote ${path.relative(process.cwd(), out)} — ${holes} dark pixels made transparent`);
