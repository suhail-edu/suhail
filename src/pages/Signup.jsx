import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import usePageTitle from '../components/usePageTitle.js';
import BrandIcon, { PROVIDERS } from '../components/BrandIcon.jsx';
import './auth.css';


export default function Signup() {
  usePageTitle('إنشاء حساب');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    if (form.get('password') !== form.get('confirm')) {
      setError('كلمتا المرور غير متطابقتين.');
      return;
    }
    setError('');
    setSent(true);
  };

  return (
    <div className="container auth">
      <form className="panel auth__card" onSubmit={onSubmit} noValidate>
        <div className="auth__head">
          <h1 className="auth__title">انشئ حسابك</h1>
          {/* Figma places the back chevron at the card's top inline-end */}
          <Link to="/login" className="iconbtn auth__back" aria-label="رجوع إلى تسجيل الدخول">
            <Icon name="chevron-end" />
          </Link>
        </div>

        <label className="field">
          <span className="sr-only">البريد الإلكتروني</span>
          <input className="field__input" type="email" name="email" autoComplete="email" placeholder="example@email.com" required />
        </label>

        <label className="field">
          <span className="field__label">كلمة المرور</span>
          <input className="field__input" type="password" name="password" autoComplete="new-password" placeholder="********" required />
        </label>

        <label className="field">
          <span className="field__label">تأكيد كلمة المرور</span>
          <input className="field__input" type="password" name="confirm" autoComplete="new-password" placeholder="********" required />
        </label>

        {error && <p role="alert">{error}</p>}
        {sent && <p role="status" className="text-secondary">لم يتم ربط الحساب بعد — هذه الواجهة فقط.</p>}

        <button type="submit" className="btn btn--primary btn--block auth__submit">إنشاء حساب</button>

        <div className="or" aria-hidden="true"><span>أو عبر</span></div>

        <ul className="auth__social" aria-label="إنشاء حساب عبر">
          {PROVIDERS.map((p) => (
            <li key={p.id}>
              <button type="button" className="btn tap auth__provider" aria-label={p.label}>
                <BrandIcon name={p.id} />
              </button>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}
