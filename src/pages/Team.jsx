import usePageTitle from '../components/usePageTitle.js';
import './team.css';

// The people behind Suhail, then the tools that helped build it — kept apart on purpose.
const PEOPLE = [
  { name: 'ماريا بيان الشتيوي', role: 'تصميم واجهة وتجربة المستخدم (UI/UX)' },
  { name: 'عمر تقي الدين', role: 'البرمجة والتطوير' },
];

// Logos: drop claude.png / flora.png (or .svg) into assets/tools/ and they show up automatically.
const LOGOS = import.meta.glob('../../assets/tools/*.{png,svg,jpg,webp}', { eager: true, import: 'default', query: '?url' });
const logoFor = (id) => {
  const hit = Object.entries(LOGOS).find(([path]) => path.replace(/^.*\//, '').replace(/\.[^.]+$/, '') === id);
  return hit ? hit[1] : null;
};

const TOOLS = [
  { id: 'claude', name: 'Claude', by: 'Anthropic', href: 'https://claude.ai', note: 'مساعد ذكاء اصطناعي ساهم في كتابة الكود وبناء الواجهة.' },
  { id: 'flora', name: 'FLORA', by: 'FLORA AI', href: 'https://flora.ai', note: 'منصة ذكاء اصطناعي للصور والتصميم البصري.' },
];

export default function Team() {
  usePageTitle('فريق العمل');
  return (
    <div className="container page team">
      <h1 className="page__title">فريق العمل</h1>
      <p className="team__lead">سهيل يساعد طلاب سوريا على اختيار مسارهم الجامعي بثقة.</p>

      <section aria-labelledby="team-people">
        <h2 id="team-people" className="section__title">أعضاء الفريق</h2>
        <ul className="team__grid">
          {PEOPLE.map((p) => (
            <li key={p.name} className="panel member">
              <span className="member__name">{p.name}</span>
              <span className="member__role">{p.role}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="team-tools">
        <h2 id="team-tools" className="section__title">بُني بمساعدة</h2>
        <ul className="team__tools">
          {TOOLS.map((t) => {
            const logo = logoFor(t.id);
            return (
              <li key={t.id} className="tool">
                <a className="tool__logo" href={t.href} target="_blank" rel="noopener noreferrer" aria-label={t.name}>
                  {logo ? <img src={logo} alt="" loading="lazy" decoding="async" /> : <span className="tool__mark" lang="en" aria-hidden="true">{t.name.charAt(0)}</span>}
                </a>
                <div className="tool__body">
                  <div className="tool__head">
                    <a className="link tool__name" href={t.href} target="_blank" rel="noopener noreferrer" lang="en">{t.name}</a>
                    <span className="tool__by" lang="en">{t.by}</span>
                  </div>
                  <p className="tool__note">{t.note}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
