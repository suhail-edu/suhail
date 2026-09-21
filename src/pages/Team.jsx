import usePageTitle from '../components/usePageTitle.js';
import './team.css';

// The people behind Suhail, then the tools that helped build it — kept apart on purpose.
const PEOPLE = [
  { name: 'ماريا بيان الشتيوي', role: 'تصميم واجهة وتجربة المستخدم (UI/UX)' },
  { name: 'عمر تقي الدين', role: 'البرمجة والتطوير' },
];

const TOOLS = [
  { name: 'Claude', by: 'Anthropic', note: 'مساعد ذكاء اصطناعي ساهم في كتابة الكود وبناء الواجهة.' },
  { name: 'FLORA', by: 'FLORA AI', note: 'منصة ذكاء اصطناعي للصور والتصميم البصري.' },
];

export default function Team() {
  usePageTitle('فريق العمل');
  return (
    <div className="container page team">
      <h1 className="page__title">فريق العمل</h1>
      <p className="team__lead">
        سهيل مشروع تخرج يهدف إلى مساعدة طلاب سوريا على اختيار مسارهم الجامعي بثقة.
      </p>

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
          {TOOLS.map((t) => (
            <li key={t.name} className="tool">
              <div className="tool__head">
                <span className="tool__name" lang="en">{t.name}</span>
                <span className="tool__by" lang="en">{t.by}</span>
              </div>
              <p className="tool__note">{t.note}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
