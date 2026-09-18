import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import MajorIcon from '../components/MajorIcon.jsx';
import usePageTitle from '../components/usePageTitle.js';
import { findBranch } from '../data/majors.js';
import NotFound from './NotFound.jsx';
import './majors.css';

function MajorSection({ branch, section, isPrimary }) {
  const [expanded, setExpanded] = useState(false);
  const items = expanded ? [...section.majors, ...(section.more || [])] : section.majors;
  return (
    <section id={section.id} aria-labelledby={`sec-${section.id}`}>
      <h2 id={`sec-${section.id}`} className="section__title">{section.title}</h2>
      <ul className="majors__grid">
        {items.map((m) => (
          <li key={m.id}>
            <Link to={`/majors/${branch.slug}/${m.id}`} className="tap tile major-tile">
              {m.icon && <MajorIcon name={m.icon} size={32} />}
              <span className="major-tile__name">{m.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      {section.more?.length > 0 && !expanded && (
        <div className="majors__more">
          {/* one sand primary per screen (§2): "رؤية المزيد" as drawn in Figma */}
          <button
            type="button"
            className={isPrimary ? 'btn btn--primary' : 'btn tap'}
            onClick={() => setExpanded(true)}
            aria-controls={section.id}
          >
            رؤية المزيد
          </button>
        </div>
      )}
    </section>
  );
}

export default function MajorsBranch() {
  const { branch: slug } = useParams();
  const branch = findBranch(slug);
  usePageTitle(branch ? branch.title : 'التخصصات');
  if (!branch) return <NotFound />;

  const primaryIndex = branch.sections.findIndex((s) => s.more?.length);

  return (
    <div className="container page">
      <h1 className="page__title">{branch.title}</h1>

      {branch.sections.length === 0 ? (
        <div className="panel empty" style={{ maxInlineSize: 480, marginInline: 'auto' }}>
          <p>لم تُضف تخصصات مجال «{branch.name}» بعد.</p>
          <Link to="/majors" className="btn tap">العودة إلى المجالات</Link>
        </div>
      ) : (
        <div className="with-rail">
          {/* §8: sticky side rail with the section links (desktop) */}
          <nav className="panel rail" aria-label="أقسام الصفحة">
            <p className="rail__title">الأقسام</p>
            <ul className="rail__list">
              {branch.sections.map((s) => (
                <li key={s.id}><a href={`#${s.id}`} className="rail__link">{s.title}</a></li>
              ))}
              <li><Link to="/majors" className="rail__link">كل المجالات</Link></li>
            </ul>
          </nav>

          <div>
            {branch.sections.map((s, i) => (
              <div key={s.id}>
                {i > 0 && <hr className="divider" />}
                <MajorSection branch={branch} section={s} isPrimary={i === primaryIndex} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
