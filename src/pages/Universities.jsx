import { Link } from 'react-router-dom';
import usePageTitle from '../components/usePageTitle.js';
import { UNIVERSITIES, UNIVERSITY_GROUPS } from '../data/universities.js';
import './universities.css';

export default function Universities() {
  usePageTitle('الجامعات السورية');
  return (
    <div className="container page">
      <h1 className="page__title">الجامعات السورية</h1>

      <div className="with-rail">
        <nav className="panel rail" aria-label="أقسام الصفحة">
          <p className="rail__title">الأقسام</p>
          <ul className="rail__list">
            {UNIVERSITY_GROUPS.map((g) => (
              <li key={g.id}><a href={`#${g.id}`} className="rail__link">{g.title}</a></li>
            ))}
          </ul>
        </nav>

        <div>
          {UNIVERSITY_GROUPS.map((g, i) => (
            <section key={g.id} id={g.id} aria-labelledby={`unis-${g.id}`}>
              {i > 0 && <hr className="divider" />}
              <h2 id={`unis-${g.id}`} className="section__title">{g.title}</h2>
              <ul className="unis__grid">
                {UNIVERSITIES.filter((u) => u.type === g.id).map((u) => (
                  <li key={u.slug}>
                    <Link to={`/universities/${u.slug}`} className="tap tile uni-tile">
                      <span className="uni-tile__logo"><img src={u.logo} alt="" loading="lazy" decoding="async" width="60" height="60" /></span>
                      <span className="uni-tile__name">{u.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
