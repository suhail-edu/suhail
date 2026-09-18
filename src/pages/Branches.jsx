import { Link } from 'react-router-dom';
import usePageTitle from '../components/usePageTitle.js';
import { BRANCHES } from '../data/majors.js';
import './majors.css';

export default function Branches() {
  usePageTitle('التخصصات');
  return (
    <div className="container page">
      <h1 className="page__title">اختر المجال الذي تود التحقق منه</h1>
      <ul className="branches__list">
        {BRANCHES.map((b) => (
          <li key={b.slug}>
            <Link to={`/majors/${b.slug}`} className="tap row branch">{b.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
