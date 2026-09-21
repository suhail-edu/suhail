import './StarrySky.css';

// A painted night sky: swirling strokes in the navy/blue tokens, a field of small stars,
// and one bright star (Suhail) in sand. Pure SVG/CSS — no image assets.
function rng(seedText) {
  let seed = 7;
  for (const ch of seedText) seed = (seed * 31 + ch.charCodeAt(0)) >>> 0;
  return () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 2 ** 32; };
}

export default function StarrySky({ seed = 'suhail', stars = 140 }) {
  const rnd = rng(seed);
  const field = Array.from({ length: stars }, (_, i) => ({
    x: rnd() * 100, y: rnd() * 100,
    r: 0.06 + rnd() * 0.3,
    o: 0.35 + rnd() * 0.65,
    twinkle: i % 4 === 0, delay: rnd() * 6, dur: 3 + rnd() * 4,
  }));
  const id = `sky-${seed.replace(/[^a-z0-9]/gi, '')}`;
  return (
    <svg className="sky" viewBox="0 0 100 60" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs>
        {/* brush-stroke swirl: turbulence pushed through a displacement map */}
        <filter id={`${id}-paint`} x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.03" numOctaves="3" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="18" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id={`${id}-soft`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.6" />
        </filter>
        <radialGradient id={`${id}-glow`}>
          <stop offset="0" stopColor="var(--c-sand)" stopOpacity=".9" />
          <stop offset=".35" stopColor="var(--c-sand)" stopOpacity=".28" />
          <stop offset="1" stopColor="var(--c-sand)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* swirls */}
      <g className="sky__swirls" filter={`url(#${id}-paint)`} fill="none" strokeLinecap="round">
        <path d="M-5 18 C 15 4, 30 30, 48 16 S 80 2, 106 20" stroke="var(--c-blue)" strokeOpacity=".28" strokeWidth="7" />
        <path d="M-5 30 C 20 14, 36 44, 58 28 S 88 10, 106 34" stroke="var(--c-blue)" strokeOpacity=".18" strokeWidth="10" />
        <path d="M-5 44 C 18 36, 34 60, 56 46 S 84 34, 106 52" stroke="var(--c-mist)" strokeOpacity=".07" strokeWidth="6" />
        <path d="M60 22 c 6 -10, 20 -8, 20 4 c 0 9, -12 12, -16 4 c -3 -6, 4 -11, 8 -7" stroke="var(--c-mist)" strokeOpacity=".16" strokeWidth="2.2" />
        <path d="M14 40 c 5 -8, 16 -6, 16 3 c 0 7, -10 9, -13 3 c -2 -5, 3 -9, 7 -6" stroke="var(--c-blue)" strokeOpacity=".35" strokeWidth="2" />
      </g>

      {/* the field of stars */}
      <g className="sky__stars" fill="var(--c-mist)">
        {field.map((s, i) => (
          <circle
            key={i} cx={s.x} cy={s.y * 0.6} r={s.r} opacity={s.o}
            className={s.twinkle ? 'sky__twinkle' : undefined}
            style={s.twinkle ? { animationDelay: `${s.delay}s`, animationDuration: `${s.dur}s` } : undefined}
          />
        ))}
      </g>

      {/* Suhail: the one bright star, in the mark's colour */}
      <g className="sky__suhail" transform="translate(74 18)">
        <circle r="9" fill={`url(#${id}-glow)`} />
        <circle r="3.2" fill="var(--c-sand)" filter={`url(#${id}-soft)`} opacity=".6" />
        <path d="M0 -3.6 L0.8 -0.8 L3.6 0 L0.8 0.8 L0 3.6 L-0.8 0.8 L-3.6 0 L-0.8 -0.8 Z" fill="var(--c-sand)" />
      </g>
    </svg>
  );
}
