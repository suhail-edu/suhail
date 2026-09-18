import { useEffect } from 'react';

export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — سهيل` : 'سهيل — المرشد الشامل للتعليم العالي في سوريا';
  }, [title]);
}
