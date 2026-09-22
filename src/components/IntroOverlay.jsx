import { useEffect, useRef, useState } from 'react';
import './IntroOverlay.css';

/**
 * Suhail logo intro — scene 1 of the brand intro, ported as-is from the animation source
 * (same easings, same beat grid at 89 BPM, same 1920×1080 stage scaled to the viewport).
 * Calls onDone when the clip ends, or right away under reduced motion.
 */

// ---- timing: two bars of 89 BPM, scene-1 key moments remapped onto beats ----
const BAR = 2.694, BEAT = BAR / 4;
const DURATION = 2 * BAR;
const S1_FROM = [0, 1.20, 1.74, 3.28, 3.95, 4.70, 5.2];
const S1_TO = [0, 2 * BEAT, 3 * BEAT, 5 * BEAT, 6 * BEAT, 7 * BEAT, 8 * BEAT];
function warp1(t) {
  for (let i = 1; i < S1_TO.length; i++) {
    if (t <= S1_TO[i]) {
      const k = (t - S1_TO[i - 1]) / (S1_TO[i] - S1_TO[i - 1]);
      return S1_FROM[i - 1] + k * (S1_FROM[i] - S1_FROM[i - 1]);
    }
  }
  return 5.2;
}

// ---- easing ----
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const p = (t, t0, t1) => clamp((t - t0) / (t1 - t0));
const E = {
  inC: (x) => x * x * x,
  ioC: (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2),
  outX: (x) => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x)),
  outB: (x) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); },
};
const ez = (e, t, t0, t1) => e(p(t, t0, t1));

// ---- text measuring (for the SUHAIL lockup) ----
const ctx = typeof document !== 'undefined' ? document.createElement('canvas').getContext('2d') : null;
function measure(text, weight, size) {
  ctx.direction = 'rtl'; ctx.textAlign = 'center';
  ctx.font = `${weight} ${size}px Cairo, sans-serif`;
  const m = ctx.measureText(text);
  return {
    A: m.actualBoundingBoxAscent, D: m.actualBoundingBoxDescent, L: m.actualBoundingBoxLeft, R: m.actualBoundingBoxRight,
    fA: m.fontBoundingBoxAscent, fD: m.fontBoundingBoxDescent, w: m.actualBoundingBoxLeft + m.actualBoundingBoxRight,
  };
}
function placeWord(mask, el, text, weight, size, cx, cy, pad = 40) {
  const m = measure(text, weight, size);
  const boxW = m.w + 400;
  const top = cy - m.fA + (m.A - m.D) / 2;
  const left = cx - (m.R - m.L) / 2 - boxW / 2;
  const maskTop = cy - (m.A + m.D) / 2 - pad, maskH = m.A + m.D + pad * 2;
  Object.assign(mask.style, { left: `${left}px`, top: `${maskTop}px`, width: `${boxW}px`, height: `${maskH}px` });
  Object.assign(el.style, {
    left: '0px', top: `${top - maskTop}px`, width: `${boxW}px`,
    fontSize: `${size}px`, lineHeight: `${m.fA + m.fD}px`, height: `${m.fA + m.fD}px`, fontWeight: weight,
  });
  return { ...m, maskH };
}

const MARK_PATH = 'M59 0H76V37A5 5 0 0 0 81 42H118V59H76A17 17 0 0 1 59 42Z';

export default function IntroOverlay({ onDone }) {
  const stageRef = useRef(null);
  const camRef = useRef(null);
  const markRef = useRef(null);
  const paRef = useRef(null);
  const pbRef = useRef(null);
  const maskRef = useRef(null);
  const wordRef = useRef(null);
  const doneRef = useRef(false);
  const [leaving, setLeaving] = useState(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setLeaving(true);
    window.setTimeout(onDone, 350);
  };

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { finish(); return undefined; }
    let raf = 0;
    let cancelled = false;
    document.documentElement.classList.add('intro-open'); // no selection anywhere while the intro plays

    const setMark = (cx, cy, size, ra, rb, base = 240) => {
      markRef.current.style.transform = `translate(${cx - base / 2}px,${cy - base / 2}px) scale(${size / base})`;
      paRef.current.setAttribute('transform', `rotate(${ra} 59 59)`);
      pbRef.current.setAttribute('transform', `rotate(${rb} 59 59)`);
    };

    // fit the 1920×1080 stage into the viewport
    const stage = stageRef.current;
    const fit = () => {
      const s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
      stage.style.transform = `scale(${s})`;
      stage.style.left = `${(window.innerWidth - 1920 * s) / 2}px`;
      stage.style.top = `${(window.innerHeight - 1080 * s) / 2}px`;
    };
    window.addEventListener('resize', fit); fit();
    // first frame right away (mark at rest), so nothing is blank while the font loads
    setMark(960, 540, 120, 0, 0);
    stage.style.visibility = 'visible';

    // lockup proportions from the brand lockup: mark 150px, wordmark to its right
    const MARK_L = 150, GAP = MARK_L * (35 / 55), textW = MARK_L * (162 / 55);
    let markLx = 960, w1 = { maskH: 0 };
    const layout = () => {
      const size = 100 * textW / measure('SUHAIL', 700, 100).w;
      const capH = measure('H', 700, size).A;
      const total = MARK_L + GAP + textW, left = 960 - total / 2;
      markLx = left + MARK_L / 2;
      w1 = placeWord(maskRef.current, wordRef.current, 'SUHAIL', 700, size, left + MARK_L + GAP + textW / 2, 540 + MARK_L / 2 - capH / 2);
    };

    // scene 1 — verbatim
    const scene1 = (tt) => {
      const t = warp1(tt);
      camRef.current.style.transform = `scale(${1 + 0.06 * (t / 5.2)})`;
      const pop = ez(E.outB, t, 0, 0.42);
      const k = ez(E.ioC, t, 1.55, 2.05) * (1 - ez(E.ioC, t, 3.45, 3.95));
      const fin = ez(E.inC, t, 4.70, 5.2);
      const size = (240 + (150 - 240) * k) * pop * (1 - 0.8 * fin);
      const ra = 180 * ez(E.ioC, t, 1.20, 1.75) - 180 * ez(E.ioC, t, 3.45, 4.00) + 180 * ez(E.ioC, t, 4.70, 5.12);
      const rb = 180 * ez(E.ioC, t, 1.29, 1.86) - 180 * ez(E.ioC, t, 3.54, 4.10) + 180 * ez(E.ioC, t, 4.79, 5.20);
      setMark(960 + (markLx - 960) * k, 540, Math.max(size, 0.001), ra, rb);
      const wy = (1 - ez(E.outX, t, 1.74, 2.30)) + ez(E.inC, t, 3.28, 3.62);
      wordRef.current.style.transform = `translateY(${wy * w1.maskH}px)`;
    };

    const start = () => {
      if (cancelled) return;
      layout(); scene1(0);
      stage.style.visibility = 'visible';
      const t0 = performance.now();
      const loop = (now) => {
        const t = (now - t0) / 1000;
        if (t >= DURATION) { scene1(DURATION); finish(); return; }
        scene1(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    };

    // start right away with whatever font is available; when Cairo arrives, re-measure the wordmark
    start();
    if (document.fonts?.load) {
      document.fonts.load('700 100px Cairo', 'SUHAIL').then(() => { if (!cancelled && !doneRef.current) layout(); }).catch(() => {});
    }

    return () => {
      cancelled = true;
      document.documentElement.classList.remove('intro-open');
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', fit);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`intro-overlay ${leaving ? 'is-leaving' : ''}`} role="presentation">
      <div className="intro-stage" ref={stageRef} aria-hidden="true">
        <div className="intro-cam" ref={camRef}>
          <svg className="intro-mark" ref={markRef} viewBox="0 0 118 118">
            <g ref={paRef}><path d={MARK_PATH} /></g>
            <g ref={pbRef}><path transform="rotate(180 59 59)" d={MARK_PATH} /></g>
          </svg>
          <div className="intro-mask" ref={maskRef}><div className="intro-word" ref={wordRef}>SUHAIL</div></div>
        </div>
      </div>
    </div>
  );
}
