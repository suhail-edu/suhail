import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import Icon from './Icon.jsx';
import { NAV_LINKS } from '../data/nav.js';
import './AppBar.css';

export default function AppBar() {
  const [navOpen, setNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // close the mobile nav / search on every route change
  useEffect(() => {
    setNavOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  const submitSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (q) navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <header className="appbar">
      <div className="container appbar__row">
        <Link to="/" className="appbar__brand" aria-label="سهيل — الصفحة الرئيسية">
          <img src={logo} alt="" width="28" height="28" />
          <span>سهيل</span>
        </Link>

        <nav className="appbar__nav" aria-label="التنقل الرئيسي">
          {NAV_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className="navlink">
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="appbar__actions">
          <button
            type="button"
            className="iconbtn"
            aria-label="بحث"
            aria-expanded={searchOpen}
            aria-controls="site-search"
            onClick={() => { setSearchOpen((v) => !v); setNavOpen(false); }}
          >
            <Icon name="search" />
          </button>
          <Link to="/login" className="iconbtn" aria-label="تسجيل الدخول">
            <Icon name="user" />
          </Link>
          <button
            type="button"
            className="iconbtn appbar__burger"
            aria-label={navOpen ? 'إغلاق القائمة' : 'القائمة'}
            aria-expanded={navOpen}
            aria-controls="mobile-nav"
            onClick={() => { setNavOpen((v) => !v); setSearchOpen(false); }}
          >
            <Icon name={navOpen ? 'close' : 'menu'} />
          </button>
        </div>
      </div>

      {navOpen && (
        <nav id="mobile-nav" className="mobilenav" aria-label="التنقل الرئيسي">
          <ul className="container mobilenav__list">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.end} className="navlink">
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {searchOpen && (
        <div id="site-search" className="searchbar">
          <form className="container searchbar__form" role="search" onSubmit={submitSearch}>
            <label className="sr-only" htmlFor="site-search-input">ابحث عن جامعة أو تخصص</label>
            <input
              id="site-search-input"
              className="field__input"
              type="search"
              placeholder="ابحث عن جامعة أو تخصص"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            <button type="submit" className="btn tap">بحث</button>
          </form>
        </div>
      )}
    </header>
  );
}
