// Generic UI glyphs drawn inline (menu, search, user, chevrons, check).
// Brand / illustration assets are never drawn here — they come from /assets.
const isRtl = () => typeof document !== 'undefined' && document.documentElement.dir === 'rtl';

const PATHS = {
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6 6l12 12M18 6L6 18',
  search: 'M20 20l-3.5-3.5M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z',
  user: 'M16 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4 20c0-4 3.6-6 8-6s8 2 8 6',
  check: 'M5 12l5 5L19 7',
  'chevron-right': 'M9 6l6 6-6 6',
  'chevron-left': 'M15 6l-6 6 6 6',
};

/**
 * name: one of PATHS, or the logical "chevron-start" / "chevron-end"
 * which resolve to a physical direction from the document's `dir`.
 */
export default function Icon({ name, size = 24, className = '', ...rest }) {
  let key = name;
  if (name === 'chevron-start') key = isRtl() ? 'chevron-right' : 'chevron-left';
  if (name === 'chevron-end') key = isRtl() ? 'chevron-left' : 'chevron-right';
  const d = PATHS[key];
  if (!d) return null;
  return (
    <svg
      className={`icon ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      style={size !== 24 ? { inlineSize: size, blockSize: size } : undefined}
      {...rest}
    >
      <path d={d} />
    </svg>
  );
}
