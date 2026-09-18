import { useState } from 'react';
import { Link } from 'react-router-dom';
import usePageTitle from '../components/usePageTitle.js';
import './auth.css';

// Provider names are provisional — the Figma shows three unlabelled "Social Icons".
const PROVIDERS = ['Google', 'Facebook', 'Apple'];

export default function Login() {
  usePageTitle('تسجيل الدخول');
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true); // no backend yet
  };

  return (
    <div className="container auth">
      <form className="panel auth__card" onSubmit={onSubmit} noValidate>
        <h1 className="sr-only">تسجيل الدخول</h1>

        <label className="field">
          <span className="field__label">البريد الإلكتروني</span>
          <input className="field__input" type="email" name="email" autoComplete="email" placeholder="example@email.com" required />
        </label>

        <label className="field">
          <span className="field__label">كلمة المرور</span>
          <input className="field__input" type="password" name="password" autoComplete="current-password" placeholder="********" required />
        </label>

        <button type="submit" className="btn btn--primary btn--block auth__submit">تسجيل الدخول</button>
        {sent && <p role="status" className="text-secondary">لم يتم ربط الحساب بعد — هذه الواجهة فقط.</p>}

        <div className="or" aria-hidden="true"><span>أو عبر</span></div>

        <ul className="auth__social" aria-label="تسجيل الدخول عبر">
          {PROVIDERS.map((p) => (
            <li key={p}>
              <button type="button" className="btn tap" lang="en">{p}</button>
            </li>
          ))}
        </ul>
      </form>

      <div className="auth__links">
        <Link to="/soon/reset" className="link link--tap">هل نسيت كلمة المرور ؟</Link>
        <p>
          <span>ليس لديك حساب ؟</span>
          <Link to="/signup" className="link link--tap">إنشاء حساب</Link>
        </p>
      </div>
    </div>
  );
}
