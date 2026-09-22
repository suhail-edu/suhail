// The Suhail mark, in the colour versions from the brand guide:
//   on ground / surface  → sand   (primary version)
//   on blue              → white
//   on light (white / mist / sand) → ground
const MARK_PATH = 'M59 0H76V37A5 5 0 0 0 81 42H118V59H76A17 17 0 0 1 59 42Z';
const TONES = { sand: 'var(--c-sand)', white: 'var(--c-white)', ground: 'var(--c-ground)' };

export default function Logo({ on = 'dark', size = 28, className = '', title }) {
  const tone = on === 'blue' ? 'white' : on === 'light' ? 'ground' : 'sand';
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 118 118"
      fill={TONES[tone]}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : 'true'}
      focusable="false"
    >
      {title && <title>{title}</title>}
      <path d={MARK_PATH} />
      <path transform="rotate(180 59 59)" d={MARK_PATH} />
    </svg>
  );
}
