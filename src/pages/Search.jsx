import { Link, useSearchParams } from 'react-router-dom';
import usePageTitle from '../components/usePageTitle.js';
import { allMajors } from '../data/majors.js';
import { UNIVERSITIES } from '../data/universities.js';
import './search.css';

const norm = (s) => s.replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').toLowerCase();

export default function Search() {
  const [params] = useSearchParams();
  const q = (params.get('q') || '').trim();
  usePageTitle(q ? `نتائج البحث: ${q}` : 'بحث');
  const n = norm(q);

  const unis = q ? UNIVERSITIES.filter((u) => norm(u.name).includes(n)) : [];
  const majors = q ? allMajors().filter((m) => norm(m.name).includes(n)) : [];
  const total = unis.length + majors.length;

  return (
    <div className="container page search">
      <h1 className="page__title">{q ? `نتائج البحث عن «${q}»` : 'بحث'}</h1>
      {!q && <p className="text-secondary search__hint">استخدم زر البحث في الشريط العلوي للبحث عن جامعة أو تخصص.</p>}
      {q && total === 0 && (
        <div className="panel empty"><p>لا توجد نتائج مطابقة.</p></div>
      )}
      {unis.length > 0 && (
        <section aria-labelledby="search-unis">
          <h2 id="search-unis" className="section__title">الجامعات</h2>
          <ul className="search__list">
            {unis.map((u) => (
              <li key={u.slug}><Link to={`/universities/${u.slug}`} className="tap row search__row">{u.name}</Link></li>
            ))}
          </ul>
        </section>
      )}
      {majors.length > 0 && (
        <section aria-labelledby="search-majors">
          <h2 id="search-majors" className="section__title">التخصصات</h2>
          <ul className="search__list">
            {majors.map((m) => (
              <li key={`${m.branch}-${m.id}`}>
                <Link to={`/majors/${m.branch}/${m.id}`} className="tap row search__row">
                  <span>{m.name}</span>
                  <span className="search__meta">{m.branchName} · {m.section}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
