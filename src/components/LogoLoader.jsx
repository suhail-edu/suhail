import { useEffect, useRef } from 'react';
import './LogoLoader.css';

const MARK_PATH = 'M59 0H76V37A5 5 0 0 0 81 42H118V59H76A17 17 0 0 1 59 42Z';

/** The Suhail mark turning on itself, inline — a small loader, not a takeover. */
export default function LogoLoader({ onDone, duration = 1500, label = 'نجهّز أسئلتك…', size = 56 }) {
  const doneRef = useRef(false);
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const id = window.setTimeout(() => { if (!doneRef.current) { doneRef.current = true; onDone(); } }, reduce ? 0 : duration);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="logo-loader" role="status">
      {/* the viewBox is padded so the turning mark is never clipped */}
      <svg className="logo-loader__mark" viewBox="-30 -30 178 178" width={size} height={size} aria-hidden="true">
        <g className="logo-loader__spin">
          <path d={MARK_PATH} />
          <path transform="rotate(180 59 59)" d={MARK_PATH} />
        </g>
      </svg>
      <span className="logo-loader__label">{label}</span>
    </div>
  );
}
