import { Link } from 'react-router-dom';
import Logo from '../components/Logo.jsx';
import usePageTitle from '../components/usePageTitle.js';
import './Home.css';

// The four service cards from the Figma "Home Screen" frame.
const SERVICES = [
  {
    to: '/quiz',
    title: 'اختبار تحديد ميول أكاديمي',
    text: 'تتيح للطالب معرفة ما هي التخصصات الدراسية الأنسب لشخصيته، واكتشاف شغفه الحقيقي',
  },
  {
    to: '/universities',
    title: 'دليل الجامعات السورية',
    text: 'دليل شامل للتعليم العالي في سوريا يشمل الجامعات الحكومية والخاصة والافتراضية والمعاهد العليا',
  },
  {
    to: '/majors',
    title: 'التخصصات الدراسية',
    text: 'نقدم لك المعلومات الكاملة عن التخصصات الدراسية في الجامعات السورية المعتمدة',
  },
  {
    to: '/graduates',
    title: 'تجارب الخريجين',
    text: 'منصة مفتوحة للتواصل بين الخريجين والطلاب الجدد لمشاركة الرأي والتجارب الأكاديمية',
  },
];

export default function Home() {
  usePageTitle('');
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero__inner">
          <div className="hero__brand">
            <Logo className="hero__mark" on="dark" size={58} title="شعار سهيل" />
            <h1 id="hero-title" className="hero__title">نجم المسار ... خير اختيار</h1>
          </div>
          <div className="hero__copy">
            <p>
              يتيح موقع سهيل تقديم العديد من الخدمات الإرشادية للطلاب الراغبين في دراسة التعليم العالي في سوريا،
              من خلال توفير امتحان لتحديد ميول الطالب الأكاديمي.
            </p>
            <p>وأيضاً تشمل خدمات الموقع توفير بيئة مناسبة للتواصل مع الخريجين المتخصصين للاستشارات الأكاديمية.</p>
            <Link to="/quiz" className="btn btn--primary hero__cta">ابدأ اختبار الميول</Link>
          </div>
        </div>
      </section>

      <section className="services" aria-labelledby="services-title">
        <div className="container">
          <h2 id="services-title" className="services__title">ماذا يقدم موقع سهيل ؟</h2>
          <ul className="services__grid">
            {SERVICES.map((s) => (
              <li key={s.to}>
                <Link to={s.to} className="tap service">
                  <h3 className="service__title">{s.title}</h3>
                  <p className="service__text">{s.text}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
