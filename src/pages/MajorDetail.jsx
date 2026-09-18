import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import MajorIcon from '../components/MajorIcon.jsx';
import usePageTitle from '../components/usePageTitle.js';
import { MAJOR_DETAILS, findBranch, findMajor } from '../data/majors.js';
import { findUniversity } from '../data/universities.js';
import NotFound from './NotFound.jsx';
import './majors.css';

const storageKey = (branch, id) => `suhail-comments-${branch}-${id}`;

// Tiny seeded generator so the scattered icons land in the same places every render.
function scatter(seedText, count) {
  let seed = 0;
  for (const ch of seedText) seed = (seed * 31 + ch.charCodeAt(0)) >>> 0;
  const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 2 ** 32; };
  return Array.from({ length: count }, () => ({
    x: rnd() * 100, y: rnd() * 100, r: rnd() * 60 - 30, s: 26 + rnd() * 34, o: 0.5 + rnd() * 0.5,
  }));
}

// Seed comments shown on every major until real ones exist.
const SEED_COMMENTS = [
  { id: 'seed-1', name: 'ماريا شتيوي', text: 'أنا بالسنة الثالثة، أكتر شي حبيته مواد التصميم الرقمي والطباعة. الفحص بالبداية بيخوّف بس بالتدريب على الرسم بيمشي الحال.', at: '2026-05-02T10:00:00Z' },
  { id: 'seed-2', name: 'عمر', text: 'نصيحتي لأي حدا بيفكر بهالاختصاص: ابدأ تعلّم برامج التصميم من هلق، بيوفّر عليك كتير بأول سنة.', at: '2026-06-14T18:30:00Z' },
  { id: 'seed-3', name: 'نضال', text: 'تخرجت من سنتين وعم اشتغل فريلانس مع عملاء برا. السوق طالب كتير، خصوصاً الموشن غرافيك.', at: '2026-08-21T14:15:00Z' },
];

function loadComments(key) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function Comments({ branch, major }) {
  const key = storageKey(branch.slug, major.id);
  const [comments, setComments] = useState(() => loadComments(key));
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  useEffect(() => { setComments(loadComments(key)); }, [key]);

  const submit = (e) => {
    e.preventDefault();
    const body = text.trim();
    if (!body) return;
    const next = [{ id: Date.now(), name: name.trim() || 'طالب', text: body, at: new Date().toISOString() }, ...comments];
    setComments(next);
    try { window.localStorage.setItem(key, JSON.stringify(next)); } catch { /* storage unavailable — keep in memory */ }
    setText('');
  };

  // the box's backdrop: the major's own icon scattered across it (seeded, so it doesn't jump between renders)
  const tiles = major.icon ? scatter(major.id, 34).map((t, i) => (
    <span key={i} className="comments__tile" style={{ insetInlineStart: `${t.x}%`, insetBlockStart: `${t.y}%`, transform: `rotate(${t.r}deg)`, opacity: t.o }}>
      <MajorIcon name={major.icon} size={t.s} />
    </span>
  )) : null;

  return (
    <section className="panel comments" aria-labelledby="comments-title">
      {tiles && <div className="comments__pattern" aria-hidden="true">{tiles}</div>}
      <div className="comments__inner">
        <h2 id="comments-title" className="comments__title">تعليقات</h2>
        <p className="comments__lead">شارك تجربتك أو اسأل من درسوا هذا التخصص.</p>

        <form className="comments__form" onSubmit={submit}>
          <label className="field">
            <span className="field__label">اسمك (اختياري)</span>
            <input className="field__input" value={name} onChange={(e) => setName(e.target.value)} maxLength={40} />
          </label>
          <label className="field">
            <span className="field__label">تعليقك</span>
            <textarea className="field__input comments__textarea" value={text} onChange={(e) => setText(e.target.value)} rows={3} maxLength={600} required />
          </label>
          <button type="submit" className="btn btn--primary comments__submit" disabled={!text.trim()}>أضف تعليقك</button>
        </form>

        {(() => {
          const all = [...comments, ...SEED_COMMENTS];
          return all.length === 0 ? (
          <p className="comments__empty">لا تعليقات بعد — كن أول من يشارك تجربته.</p>
        ) : (
          <ul className="comments__list">
            {all.map((c) => (
              <li key={c.id} className="comment">
                <div className="comment__head">
                  <span className="comment__name">{c.name}</span>
                  <time className="comment__time" dateTime={c.at}>{new Date(c.at).toLocaleDateString('ar-SY')}</time>
                </div>
                <p className="comment__text">{c.text}</p>
              </li>
            ))}
          </ul>
        );
        })()}
      </div>
    </section>
  );
}

export default function MajorDetail() {
  const { branch: branchSlug, major: majorId } = useParams();
  const branch = findBranch(branchSlug);
  const major = findMajor(branchSlug, majorId);
  usePageTitle(major ? major.name : 'التخصصات');
  if (!branch || !major) return <NotFound />;
  const d = MAJOR_DETAILS[major.id];

  return (
    <article className="container page major-detail">
      <p className="major-detail__crumb text-secondary">
        <Link to={`/majors/${branch.slug}`} className="link">{branch.title}</Link>
        <Icon name="chevron-end" size={16} className="icon--sm" />
        <span>{major.section}</span>
      </p>
      <header className="major-detail__head">
        {major.icon && <MajorIcon name={major.icon} size={56} />}
        <h1 className="page__title">{major.name}</h1>
      </header>

      {d ? (
        <>
          <section aria-labelledby="about-title" className="major-detail__section">
            <h2 id="about-title" className="section__title">تعريف الاختصاص</h2>
            <p className="major-detail__about">{d.about}</p>
          </section>

          <div className="major-detail__pair">
            <section aria-labelledby="req-title" className="panel major-detail__block">
              <h2 id="req-title" className="major-detail__h">المؤهلات اللازمة لدراسة التخصص</h2>
              <ul className="major-detail__list">
                {d.requirements.map((r) => <li key={r}>{r}</li>)}
              </ul>
            </section>
            <section aria-labelledby="jobs-title" className="panel major-detail__block">
              <h2 id="jobs-title" className="major-detail__h">فرص العمل</h2>
              <ul className="major-detail__list">
                {d.careers.map((c) => <li key={c}>{c}</li>)}
              </ul>
            </section>
          </div>

          <section aria-labelledby="unis-title" className="major-detail__section">
            <h2 id="unis-title" className="section__title">الجامعات التي تدرّس هذا الاختصاص</h2>
            <ul className="major-detail__unis">
              {d.universities.map((u) => {
                const uni = findUniversity(u.slug);
                if (!uni) return null;
                return (
                  <li key={u.slug}>
                    <Link to={`/universities/${uni.slug}`} className="tap uni-row">
                      <span className="uni-row__logo"><img src={uni.logo} alt="" /></span>
                      <span className="uni-row__text">
                        <span className="uni-row__name">{uni.name}</span>
                        <span className="uni-row__faculty">{u.faculty}</span>
                      </span>
                      <Icon name="chevron-end" size={18} className="icon--sm" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>

          <Comments branch={branch} major={major} />
        </>
      ) : (
        <div className="panel empty">
          <p>المعلومات الكاملة عن هذا التخصص قيد الإعداد.</p>
          <Link to={`/majors/${branch.slug}`} className="btn tap">العودة إلى {branch.title}</Link>
        </div>
      )}
    </article>
  );
}
