// 160px copies of the logos in assets/ (scripts/optimize-logos.cjs) — the originals are up to 600px.
import damascusLogo from '../generated/logos/damauni.jpg';
import svuLogo from '../generated/logos/svu.jpg';
import iustLogo from '../generated/logos/iust.jpg';
import aiuLogo from '../generated/logos/aiu.jpg';

// Campus photos: drop a JPG named after the university slug into assets/universities/
// (e.g. assets/universities/damascus.jpg, ≥1600px wide). Missing files simply mean no photo.
const COVERS = import.meta.glob('../../assets/universities/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default', query: '?url' });
export const coverFor = (slug) => {
  const hit = Object.entries(COVERS).find(([path]) => path.replace(/^.*\//, '').replace(/\.[^.]+$/, '') === slug);
  return hit ? hit[1] : null;
};

// Damascus University content is from the Figma frame "iPhone 17 - 17".
// The other three entries carry only basic facts and need editorial review.
export const UNIVERSITIES = [
  {
    slug: 'damascus',
    name: 'جامعة دمشق',
    type: 'gov',
    logo: damascusLogo,
    founded: '1923',
    education: 'عام، تعليم مفتوح',
    affiliation: 'حكومية',
    website: 'https://damascusuniversity.edu.sy',
    websiteLabel: 'damascusuniversity.edu.sy',
    about:
      'جامعة دمشق هي إحدى الجامعات السورية الحكومية، وهي كبرى الجامعات الخمس القائمة في القطر العربي السوري وأقدمها، وهي الجامعة الأم التي ترجع نشأتها الأولى إلى مستهل القرن العشرين. يقع المقر الرئيسي للجامعة في محافظة دمشق. جامعة دمشق مؤسسة تعليم عالٍ حكومية، أنظمتها وخططها الدراسية معتمدة ومصدقة من قبل وزارة التعليم العالي في الجمهورية العربية السورية، كذلك الأمر بالنسبة لشهادات تخرج الطلاب.',
    faculties: [
      'الطب البشري', 'طب الأسنان', 'الصيدلة', 'الهندسة المدنية', 'الهندسة المعمارية',
      'الهندسة الميكانيكية والكهربائية', 'الهندسة المعلوماتية', 'العلوم', 'الآداب والعلوم الإنسانية',
      'الحقوق', 'الاقتصاد', 'التربية', 'الشريعة', 'الزراعة', 'الفنون الجميلة', 'الإعلام', 'السياحة',
    ],
  },
  {
    slug: 'svu',
    name: 'الجامعة الافتراضية السورية',
    type: 'gov',
    logo: svuLogo,
    founded: '2002',
    education: 'تعليم افتراضي (عن بعد)',
    affiliation: 'حكومية',
    website: 'https://svuonline.org',
    websiteLabel: 'svuonline.org',
    about:
      'الجامعة الافتراضية السورية جامعة حكومية تأسست عام 2002، وتقدم برامجها بنظام التعليم الافتراضي عن بعد، وشهاداتها معتمدة من وزارة التعليم العالي في الجمهورية العربية السورية.',
    faculties: [],
  },
  {
    slug: 'iust',
    name: 'الجامعة الدولية الخاصة للعلوم والتكنولوجيا',
    type: 'private',
    logo: iustLogo,
    founded: '2005',
    education: 'عام',
    affiliation: 'خاصة',
    website: 'https://iust.edu.sy',
    websiteLabel: 'iust.edu.sy',
    about:
      'الجامعة الدولية الخاصة للعلوم والتكنولوجيا جامعة خاصة مرخصة من وزارة التعليم العالي، تأسست عام 2005، ويقع حرمها الجامعي في منطقة غباغب بمحافظة درعا على طريق دمشق – درعا.',
    faculties: [],
  },
  {
    slug: 'aiu',
    name: 'الجامعة العربية الدولية',
    type: 'private',
    logo: aiuLogo,
    founded: '2005',
    education: 'عام',
    affiliation: 'خاصة',
    website: 'https://aiu.edu.sy',
    websiteLabel: 'aiu.edu.sy',
    about:
      'الجامعة العربية الدولية جامعة خاصة مرخصة من وزارة التعليم العالي، تأسست عام 2005، ويقع حرمها الجامعي في منطقة غباغب بمحافظة درعا.',
    faculties: [],
  },
];

export const UNIVERSITY_GROUPS = [
  { id: 'gov', title: 'الجامعات الحكومية' },
  { id: 'private', title: 'الجامعات الخاصة' },
];

export function findUniversity(slug) {
  return UNIVERSITIES.find((u) => u.slug === slug);
}
