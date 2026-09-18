import { Link, useParams } from 'react-router-dom';
import usePageTitle from '../components/usePageTitle.js';
import { SOON_TITLES } from '../data/nav.js';

export default function ComingSoon({ title }) {
  const { slug } = useParams();
  const heading = title || SOON_TITLES[slug] || 'قريباً';
  usePageTitle(heading);
  return (
    <div className="container page" style={{ maxInlineSize: 640 }}>
      <h1 className="page__title">{heading}</h1>
      <div className="panel empty">
        <p>هذه الصفحة قيد الإعداد وستتوفر قريباً.</p>
        <Link to="/" className="btn tap">العودة إلى الرئيسية</Link>
      </div>
    </div>
  );
}
