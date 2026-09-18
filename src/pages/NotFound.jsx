import { Link } from 'react-router-dom';
import usePageTitle from '../components/usePageTitle.js';

export default function NotFound() {
  usePageTitle('الصفحة غير موجودة');
  return (
    <div className="container page" style={{ maxInlineSize: 640 }}>
      <h1 className="page__title">الصفحة غير موجودة</h1>
      <div className="panel empty">
        <p>لم نعثر على الصفحة التي تبحث عنها.</p>
        <Link to="/" className="btn tap">العودة إلى الرئيسية</Link>
      </div>
    </div>
  );
}
