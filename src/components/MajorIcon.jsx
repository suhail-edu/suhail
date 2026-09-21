import './MajorIcon.css';

// One small PNG per major (256px, white on transparent) from assets/icons/majors/ — exported by
// scripts/export-major-icons.cjs from the original sheets and the Phosphor SVGs. Rendered through
// a CSS mask so the colour is always a token.
const ICONS = import.meta.glob('../../assets/icons/majors/*.png', { eager: true, import: 'default', query: '?url' });
const urlFor = (name) => ICONS[`../../assets/icons/majors/${name}.png`];

export default function MajorIcon({ name, size = 32 }) {
  const url = urlFor(name);
  if (!url) return null;
  const style = {
    '--icon-url': `url("${url}")`,
    '--icon-size': 'contain',
    '--icon-pos': 'center',
    blockSize: `${size}px`,
    inlineSize: `${size}px`,
  };
  return <span className="major-icon" style={style} aria-hidden="true" />;
}
