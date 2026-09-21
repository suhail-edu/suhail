import { useParams } from 'react-router-dom';
import usePageTitle from '../components/usePageTitle.js';
import { coverFor, findUniversity } from '../data/universities.js';
import NotFound from './NotFound.jsx';
import './universities.css';

export default function University() {
  const { slug } = useParams();
  const u = findUniversity(slug);
  usePageTitle(u ? u.name : 'الجامعات');
  if (!u) return <NotFound />;
  const cover = coverFor(u.slug);

  return (
    <article className="container page uni">
      <header className="uni__header">
        <div className={`panel uni__banner ${cover ? 'has-cover' : ''}`}>
          {cover && <img className="uni__cover" src={cover} alt={`حرم ${u.name}`} />}
        </div>
        <div className="uni__logo"><img src={u.logo} alt={`شعار ${u.name}`} /></div>
        <h1 className="uni__name">{u.name}</h1>
      </header>

      <div className="uni__body">
        <div>
          <dl className="uni__facts">
            <div><dt>سنة التأسيس:</dt><dd>{u.founded}</dd></div>
            <div><dt>نوع التعليم:</dt><dd>{u.education}</dd></div>
            <div><dt>التبعية:</dt><dd>{u.affiliation}</dd></div>
          </dl>
          <p className="uni__about">{u.about}</p>
          {/* the one sand primary on this screen */}
          <a className="btn btn--primary uni__site" href={u.website} target="_blank" rel="noopener noreferrer">
            الموقع الإلكتروني: <span lang="en" dir="ltr">{u.websiteLabel}</span>
          </a>
        </div>

        <section aria-labelledby="faculties-title">
          <h2 id="faculties-title" className="section__title">اختصاصات {u.name} — الكليات</h2>
          {u.faculties.length ? (
            <ul className="uni__faculties">
              {u.faculties.map((f) => <li key={f} className="faculty">{f}</li>)}
            </ul>
          ) : (
            <div className="panel empty"><p>قائمة الكليات قيد الإعداد.</p></div>
          )}
        </section>
      </div>
    </article>
  );
}
