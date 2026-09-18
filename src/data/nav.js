// The three links drawn in the Figma "nave - bar" frames.
export const NAV_LINKS = [
  { to: '/', label: 'الرئيسية', end: true },
  { to: '/majors', label: 'التخصصات' },
  { to: '/universities', label: 'الجامعات' },
];

// Footer groups from the Figma footer (Group 8 / Frame 1).
export const FOOTER_GROUPS = [
  {
    title: 'روابط سريعة',
    rows: 3,
    links: [
      { to: '/soon/decisions', label: 'قرارات وقوانين' },
      { to: '/soon/scholarships', label: 'منح تعليمية' },
      { to: '/soon/higher-education', label: 'التعليم العالي' },
      { to: '/universities#gov', label: 'الجامعات الحكومية' },
      { to: '/universities#private', label: 'الجامعات الخاصة' },
    ],
  },
  {
    title: 'معلومات',
    rows: 2,
    links: [
      { to: '/soon/privacy', label: 'سياسة الخصوصية' },
      { to: '/soon/about', label: 'من نحن' },
      { to: '/soon/team', label: 'فريق العمل' },
    ],
  },
];

// Social icon files are not in /assets yet — rendered as text links until they are.
export const SOCIAL_LINKS = [
  { href: '#', label: 'فيسبوك' },
  { href: '#', label: 'واتساب' },
  { href: '#', label: 'إنستغرام' },
];

export const SOON_TITLES = {
  decisions: 'قرارات وقوانين',
  scholarships: 'منح تعليمية',
  'higher-education': 'التعليم العالي',
  privacy: 'سياسة الخصوصية',
  about: 'من نحن',
  team: 'فريق العمل',
  reset: 'استعادة كلمة المرور',
};
