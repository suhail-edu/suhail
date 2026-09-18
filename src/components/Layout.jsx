import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AppBar from './AppBar.jsx';
import Footer from './Footer.jsx';

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
  return (
    <div className="app">
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
