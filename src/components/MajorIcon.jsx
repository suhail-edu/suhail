import majorsSheet from '../../assets/majors.png';
import majors2Sheet from '../generated/majors2-mask.png'; // assets/majors2.png with the dark dots cut out (npm run icons)
import './MajorIcon.css';

// The two sprite sheets in /assets. Boxes were measured from the PNG alpha channel.
// Icons are rendered through a CSS mask so the artwork is used as-is while the
// colour comes from a token (majors2.png is green, which is outside the palette).
const SHEETS = {
  a: { url: majorsSheet, W: 865, H: 288 },
  b: { url: majors2Sheet, W: 6081, H: 1108 },
};

const ICONS = {
  sculpture: { sheet: 'a', x: 41, y: 67, w: 114, h: 175 },   // نحت
  print:     { sheet: 'a', x: 175, y: 77, w: 129, h: 167 },  // حفر وطباعة
  theatre:   { sheet: 'a', x: 351, y: 76, w: 156, h: 167 },  // فنون مسرحية
  interior:  { sheet: 'a', x: 552, y: 75, w: 153, h: 168 },  // تصميم داخلي
  fashion:   { sheet: 'a', x: 744, y: 62, w: 90, h: 187 },   // الأزياء
  graphic:   { sheet: 'b', x: 0, y: 79, w: 970, h: 941 },    // غرافيك ديزاين
  music:     { sheet: 'b', x: 2503, y: 0, w: 955, h: 1108 }, // موسيقى
  painting:  { sheet: 'b', x: 4955, y: 121, w: 1126, h: 948 }, // تصوير
};

export default function MajorIcon({ name, size = 32 }) {
  const ic = ICONS[name];
  if (!ic) return null;
  const s = SHEETS[ic.sheet];
  // CSS percentage positioning: offset = (box − image) × p  ⇒  p = x / (W − w)
  const px = s.W === ic.w ? 0 : (ic.x / (s.W - ic.w)) * 100;
  const py = s.H === ic.h ? 0 : (ic.y / (s.H - ic.h)) * 100;
  const style = {
    '--icon-url': `url(${s.url})`,
    '--icon-size': `${(s.W / ic.w) * 100}%`,
    '--icon-pos': `${px}% ${py}%`,
    blockSize: `${size}px`,
    inlineSize: `${(size * ic.w) / ic.h}px`,
  };
  return <span className="major-icon" style={style} aria-hidden="true" />;
}
