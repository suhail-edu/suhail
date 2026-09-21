import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import Icon from './Icon.jsx';
import BrandIcon from './BrandIcon.jsx';
import { FOOTER_GROUPS, SOCIAL_LINKS } from '../data/nav.js';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__tagline">سهيل المرشد والمرجع الشامل للتعليم العالي والدراسة في سوريا</p>

        <div className="footer__groups">
          {FOOTER_GROUPS.map((g) => (
            <section key={g.title} className="footer__group" aria-labelledby={`footer-${g.title}`}>
              <h2 id={`footer-${g.title}`} className="footer__heading">{g.title}</h2>
              <ul className="footer__list" style={{ '--rows': g.rows }}>
                {g.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="footer__link">
                      <Icon name="chevron-end" size={16} className="icon--sm" />
                      <span>{l.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <section className="footer__group footer__social" aria-labelledby="footer-social">
            <h2 id="footer-social" className="footer__heading">تابعنا</h2>
            <ul className="footer__list footer__list--inline">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="iconbtn footer__socialbtn" aria-label={s.label} title={s.label}>
                    <BrandIcon name={s.icon} size={22} />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            <img src={logo} alt="" width="18" height="18" />
            <span>© {new Date().getFullYear()} سهيل — جميع الحقوق محفوظة</span>
          </p>
          <p className="footer__made">صُنع بحب لطلاب سوريا</p>
        </div>
      </div>
    </footer>
  );
}
