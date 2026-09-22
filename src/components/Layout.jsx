import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AppBar from './AppBar.jsx';
import Footer from './Footer.jsx';
import IntroOverlay from './IntroOverlay.jsx';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) { el.scrollIntoView(); return; }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

const INTRO_KEY = 'suhail-intro-v2-seen';

export default function Layout() {
  const [showIntro, setShowIntro] = useState(() => {
    try { return !window.sessionStorage.getItem(INTRO_KEY); } catch { return true; }
  });
  const dismissIntro = () => {
    try { window.sessionStorage.setItem(INTRO_KEY, '1'); } catch { /* private mode */ }
    setShowIntro(false);
  };

  return (
    <div className="app">
      {showIntro && <IntroOverlay onDone={dismissIntro} />}
      <a href="#main" className="skip">تخطي إلى المحتوى</a>
      <ScrollToTop />
      <AppBar />
      <main id="main" className="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
