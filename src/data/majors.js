// Branches from the Figma "مجال" frame; majors from "علمي" and "أدبي".
// Only the scientific and literary branches have designed content.
export const BRANCHES = [
  {
    slug: 'scientific',
    name: 'علمي',
    title: 'التخصصات الدراسية في مجال العلمي',
    sections: [
      {
        id: 'medical',
        title: 'التخصصات الطبية',
        majors: [
          { id: 'anesthesia', icon: 'anesthesia', name: 'التخدير' },
          { id: 'pharmacy', icon: 'pharmacy', name: 'الصيدلة' },
          { id: 'medicine', icon: 'medicine', name: 'الطب البشري' },
          { id: 'dentistry', icon: 'dentistry', name: 'طب الأسنان' },
        ],
        // revealed by "رؤية المزيد" (Figma shows the button; these entries are provisional)
        more: [
          { id: 'nursing', icon: 'nursing', name: 'التمريض' },
          { id: 'physiotherapy', icon: 'physiotherapy', name: 'العلاج الفيزيائي' },
          { id: 'medical-labs', icon: 'medical-labs', name: 'المخابر الطبية' },
          { id: 'radiology', icon: 'radiology', name: 'التصوير الشعاعي' },
        ],
      },
      {
        id: 'engineering',
        title: 'التخصصات الهندسية',
        majors: [
          { id: 'civil', icon: 'civil', name: 'هندسة مدنية' },
          { id: 'architecture', icon: 'architecture', name: 'هندسة العمارة' },
          // the Figma frame is cut at two tiles; these two are provisional
          { id: 'informatics', icon: 'informatics', name: 'الهندسة المعلوماتية' },
          { id: 'mechanical-electrical', icon: 'mechanical-electrical', name: 'الهندسة الميكانيكية والكهربائية' },
        ],
      },
    ],
  },
  {
    slug: 'literary',
    name: 'أدبي',
    title: 'التخصصات الدراسية في مجال الأدبي',
    sections: [
      {
        id: 'arts',
        title: 'التخصصات الفنية',
        majors: [
          { id: 'graphic-design', name: 'غرافيك ديزاين وملتيميديا', icon: 'graphic' },
          { id: 'painting', name: 'تصوير', icon: 'painting' },
          { id: 'interior-design', name: 'تصميم داخلي', icon: 'interior' },
          { id: 'sculpture', name: 'نحت', icon: 'sculpture' },
          { id: 'printmaking', name: 'حفر وطباعة', icon: 'print' },
          { id: 'theatre', name: 'فنون مسرحية', icon: 'theatre' },
          { id: 'music', name: 'موسيقى', icon: 'music' },
          { id: 'fashion', name: 'الأزياء', icon: 'fashion' },
        ],
      },
    ],
  },
  { slug: 'industrial', name: 'صناعي', title: 'التخصصات الدراسية في مجال الصناعي', sections: [] },
  { slug: 'commercial', name: 'التجاري والنسوي', title: 'التخصصات الدراسية في مجال التجاري والنسوي', sections: [] },
  { slug: 'arts', name: 'فني', title: 'التخصصات الدراسية في مجال الفني', sections: [] },
];

export function findBranch(slug) {
  return BRANCHES.find((b) => b.slug === slug);
}

export function allMajors() {
  const out = [];
  for (const b of BRANCHES) {
    for (const s of b.sections) {
      for (const m of [...s.majors, ...(s.more || [])]) out.push({ ...m, branch: b.slug, branchName: b.name, section: s.title });
    }
  }
  return out;
}

export function findMajor(branchSlug, majorId) {
  return allMajors().find((m) => m.branch === branchSlug && m.id === majorId);
}

// Detail content per major id. Only graphic design is written so far; other majors fall back
// to a holding state until their copy is supplied.
export const MAJOR_DETAILS = {
  'graphic-design': {
    about:
      'الغرافيك ديزاين والملتيميديا تخصص يجمع بين الفن والتقنية؛ يتعلم فيه الطالب أسس الاتصال البصري وتصميم الهويات البصرية والملصقات والمطبوعات، وواجهات المواقع والتطبيقات، والرسوم المتحركة والمحتوى الرقمي، باستخدام برامج التصميم الحديثة وبأسلوب يوازن بين الفكرة والجمال والوظيفة.',
    requirements: [
      'شهادة الثانوية العامة (الفرع الأدبي أو العلمي)',
      'اجتياز امتحان القبول في كلية الفنون الجميلة (فحص الرسم والقدرات الفنية)',
      'حس بصري وقدرة على الرسم والملاحظة والتخيل',
      'إلمام أساسي بالحاسوب وبرامج التصميم يُعدّ ميزة إضافية',
    ],
    careers: [
      'مصمم غرافيك في وكالات الإعلان ودور النشر والمطابع',
      'مصمم واجهات وتجربة مستخدم (UI/UX) للمواقع والتطبيقات',
      'مصمم موشن غرافيك ورسوم متحركة',
      'مدير فني في المؤسسات الإعلامية والقنوات والصحف',
      'عمل حر مع عملاء محليين ودوليين',
    ],
    universities: [{ slug: 'damascus', faculty: 'كلية الفنون الجميلة' }],
  },
};
