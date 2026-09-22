import { useEffect, useRef, useState } from 'react';
import introVideo from '../../assets/intro/suhail-intro.mp4';
import './IntroOverlay.css';

/**
 * Full-screen logo animation (the intro video, as delivered) over a ground backdrop.
 * Calls onDone when the clip ends, when it can't play, when the viewer skips it,
 * or if it hasn't started within `startTimeout` ms (slow connection).
 */
export default function IntroOverlay({ onDone, startTimeout = 3000 }) {
  const videoRef = useRef(null);
  const doneRef = useRef(false);
  const [leaving, setLeaving] = useState(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setLeaving(true);
    window.setTimeout(onDone, 350); // let the fade-out play
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { finish(); return undefined; }

    let started = false;
    const onPlaying = () => { started = true; };
    v.addEventListener('playing', onPlaying);
    v.addEventListener('ended', finish);
    v.addEventListener('error', finish);
    v.play().catch(finish);

    const guard = window.setTimeout(() => { if (!started) finish(); }, startTimeout);
    const hardStop = window.setTimeout(finish, 15000); // never trap the viewer
    return () => {
      window.clearTimeout(guard);
      window.clearTimeout(hardStop);
      v.removeEventListener('playing', onPlaying);
      v.removeEventListener('ended', finish);
      v.removeEventListener('error', finish);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`intro-overlay ${leaving ? 'is-leaving' : ''}`} role="presentation">
      <video
        ref={videoRef}
        className="intro-overlay__video"
        src={introVideo}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <button type="button" className="intro-overlay__skip" onClick={finish}>تخطي</button>
    </div>
  );
}
