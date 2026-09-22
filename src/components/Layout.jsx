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

export default function Layout() {
  // The logo intro plays on every full load of the home page (refresh included);
  // in-app navigation never triggers it.
  const [showIntro, setShowIntro] = useState(() => {
    const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
    const path = window.location.pathname.replace(/\/$/, '');
    return path === base || path === '';
  });
  const dismissIntro = () => setShowIntro(false);

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
