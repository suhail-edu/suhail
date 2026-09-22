import { useEffect, useRef } from 'react';
import './LogoLoader.css';

const MARK_PATH = 'M59 0H76V37A5 5 0 0 0 81 42H118V59H76A17 17 0 0 1 59 42Z';

/** The Suhail mark turning on itself like a loader — the intro's half-turn, looped. Short by design. */
export default function LogoLoader({ onDone, duration = 1800 }) {
  const doneRef = useRef(false);
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const id = window.setTimeout(() => { if (!doneRef.current) { doneRef.current = true; onDone(); } }, reduce ? 0 : duration);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="logo-loader" role="status" aria-label="جارٍ التجهيز">
      <svg className="logo-loader__mark" viewBox="0 0 118 118" aria-hidden="true">
        <g className="logo-loader__a"><path d={MARK_PATH} /></g>
        <g className="logo-loader__b"><path transform="rotate(180 59 59)" d={MARK_PATH} /></g>
      </svg>
    </div>
  );
}
