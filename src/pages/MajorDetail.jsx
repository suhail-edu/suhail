import { Link, useParams } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import MajorIcon from '../components/MajorIcon.jsx';
import usePageTitle from '../components/usePageTitle.js';
import { findBranch, findMajor } from '../data/majors.js';
import NotFound from './NotFound.jsx';
import './majors.css';

// The Figma frame for a major page ("غرافيك ديزاين") is empty, so this is a holding page.
export default function MajorDetail() {
  const { branch: branchSlug, major: majorId } = useParams();
  const branch = findBranch(branchSlug);
  const major = findMajor(branchSlug, majorId);
  usePageTitle(major ? major.name : 'التخصصات');
  if (!branch || !major) return <NotFound />;

  return (
    <div className="container page major-detail">
      <p className="major-detail__crumb text-secondary">
        <Link to={`/majors/${branch.slug}`} className="link">{branch.title}</Link>
        <Icon name="chevron-end" size={16} className="icon--sm" />
        <span>{major.section}</span>
      </p>
      <h1 className="page__title">{major.name}</h1>
      <div className="panel empty">
        {major.icon && <MajorIcon name={major.icon} size={56} />}
        <p>المعلومات الكاملة عن هذا التخصص قيد الإعداد.</p>
        <Link to={`/majors/${branch.slug}`} className="btn tap">العودة إلى {branch.title}</Link>
      </div>
    </div>
  );
}
