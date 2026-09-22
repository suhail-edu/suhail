import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import Icon from '../components/Icon.jsx';
import Meter from '../components/Meter.jsx';
import LogoLoader from '../components/LogoLoader.jsx';
import usePageTitle from '../components/usePageTitle.js';
import { QUESTIONS, TRACKS, scoreAnswers } from '../data/quiz.js';
import { BRANCHES } from '../data/majors.js';
import './quiz.css';

const TOTAL = QUESTIONS.length;

const STEPS = [
  { n: '١', text: 'اختر مجالك الدراسي' },
  { n: '٢', text: `أجب عن ${TOTAL} أسئلة قصيرة` },
  { n: '٣', text: 'اكتشف التخصصات الأنسب لك' },
];

export default function Quiz() {
  usePageTitle('اختبار تحديد الميول');
  const [phase, setPhase] = useState('intro'); // intro → branch → questions → result
  const [playingIntro, setPlayingIntro] = useState(false); // logo animation after "أنا جاهز"
  const [branch, setBranch] = useState(null);
  const [picked, setPicked] = useState(null); // branch tapped, while its animation plays
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(() => Array(TOTAL).fill(null));
  const headingRef = useRef(null);

  // move focus to the heading whenever the screen changes (screen readers + keyboard)
  useEffect(() => {
    headingRef.current?.focus();
  }, [phase, step]);

  const choose = (i) => setAnswers((a) => a.map((v, qi) => (qi === step ? i : v)));

  const next = () => {
    if (answers[step] === null) return;
    if (step === TOTAL - 1) setPhase('result');
    else setStep((s) => s + 1);
  };

  const back = () => {
    if (step > 0) setStep((s) => s - 1);
    else setPhase('branch');
  };

  const restart = () => {
    setAnswers(Array(TOTAL).fill(null));
    setStep(0);
    setBranch(null);
    setPicked(null);
    setPhase('intro');
  };

  const startQuestions = (b) => {
    setBranch(b);
    setStep(0);
    setPicked(null);
    setPhase('questions');
  };

  // show the "you picked this" state; the student starts the questions with the button
  const pickBranch = (b) => {
    if (picked) return;
    setPicked(b);
  };

  /* ---------- 1. ready? ---------- */
  if (phase === 'intro') {
    return (
      <section className="container intro" aria-labelledby="intro-title">
        {playingIntro && <LogoLoader onDone={() => { setPlayingIntro(false); setPhase('branch'); }} />}
        <div className="panel intro__card">
          <img className="intro__mark" src={logo} alt="" width="64" height="64" />
          <h1 id="intro-title" className="intro__title" ref={headingRef} tabIndex={-1}>هل أنت جاهز؟</h1>
          <p className="intro__lead">
            لتأدية اختبار تحديد ميولك الأكاديمي واكتشاف شغفك الحقيقي
          </p>
          <ol className="intro__steps">
            {STEPS.map((s) => (
              <li key={s.n} className="intro__step">
                <span className="intro__num" aria-hidden="true">{s.n}</span>
                <span>{s.text}</span>
              </li>
            ))}
          </ol>
          <p className="intro__note text-secondary">لا توجد إجابات صحيحة أو خاطئة — اختر ما يشبهك فعلاً. يستغرق الاختبار نحو دقيقتين.</p>
          <div className="intro__actions">
            <button type="button" className="btn btn--primary intro__cta" onClick={() => setPlayingIntro(true)}>
              أنا جاهز، لنبدأ
            </button>
            <Link to="/" className="btn tap">ليس الآن</Link>
          </div>
        </div>
      </section>
    );
  }

  /* ---------- 2. choose a branch (Figma "مجال") ---------- */
  if (phase === 'branch') {
    return (
      <section className="container page branch-pick" aria-labelledby="branch-title" aria-live="polite">
        <h1 id="branch-title" className="page__title" ref={headingRef} tabIndex={-1}>اختر المجال الذي تود التحقق منه</h1>
        <ul className={`branches__list ${picked ? 'is-picking' : ''}`}>
          {BRANCHES.map((b) => {
            const isPicked = picked?.slug === b.slug;
            return (
              <li key={b.slug} className={isPicked ? 'is-picked-item' : ''}>
                <button
                  type="button"
                  className={`tap row branch ${isPicked ? 'is-picked' : ''}`}
                  aria-pressed={isPicked}
                  disabled={picked && !isPicked}
                  onClick={() => pickBranch(b)}
                >
                  {isPicked && <Icon name="check" className="branch__check" />}
                  <span>{b.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
        {picked && (
          <div className="pick-wait">
            <p className="pick-msg" role="status">
              اخترت مجال «{picked.name}» — جاهز؟
            </p>
            <div className="pick-actions">
              {/* the one sand primary on this screen */}
              <button type="button" className="btn btn--primary pick-start" onClick={() => startQuestions(picked)}>
                ابدأ الاختبار
              </button>
              <button type="button" className="btn tap" onClick={() => setPicked(null)}>
                غيّر المجال
              </button>
            </div>
          </div>
        )}
      </section>
    );
  }

  /* ---------- 4. result (Figma "ex 9") ---------- */
  if (phase === 'result') {
    const track = TRACKS[scoreAnswers(answers)];
    const branchPath = `/majors/${branch?.slug || track.branch}`;
    return (
      <section className="container result" aria-labelledby="result-title">
        <div className="panel result__card">
          <h1 id="result-title" className="result__title" ref={headingRef} tabIndex={-1}>
            ميولك تتجه بقوة نحو “{track.name}”
          </h1>
          <p className="result__desc">{track.desc}</p>
          <h2 className="result__sub">التخصصات المقترحة لك:</h2>
          <ul className="result__majors">
            {track.majors.map((m) => (
              <li key={m}>
                <Link to={branchPath} className="tap row result__major">{m}</Link>
              </li>
            ))}
          </ul>
          <div className="result__actions">
            <Link to={branchPath} className="btn btn--primary">استكشف التخصصات</Link>
            <button type="button" className="btn tap" onClick={restart}>إعادة الاختبار</button>
          </div>
        </div>
      </section>
    );
  }

  /* ---------- 3. questions (Figma ex 1 → ex 8) ---------- */
  const q = QUESTIONS[step];
  const selected = answers[step];

  return (
    <section className="container quiz" aria-labelledby="quiz-question" key={step}>
      <Meter className="quiz__meter" value={step + 1} max={TOTAL} label="تقدم الاختبار" fromEnd />
      <p className="quiz__count">
        السؤال {step + 1} من {TOTAL}{branch && <>، مجال {branch.name}</>}
      </p>
      <h1 id="quiz-question" className="quiz__question quiz__enter" ref={headingRef} tabIndex={-1}>{q.text}</h1>

      <div className="quiz__options" role="radiogroup" aria-labelledby="quiz-question">
        {q.options.map((opt, i) => {
          const isSel = selected === i;
          return (
            <button
              key={opt.text}
              type="button"
              role="radio"
              aria-checked={isSel}
              className={`tap option ${isSel ? 'is-selected' : ''}`}
              style={{ '--i': i }}
              onClick={() => choose(i)}
            >
              {isSel && <Icon name="check" className="option__check" />}
              <span>{opt.text}</span>
            </button>
          );
        })}
      </div>

      <div className="quiz__nav quiz__enter quiz__enter--last">
        <button type="button" className="btn tap" onClick={back}>
          <Icon name="chevron-end" size={16} className="icon--sm" />
          <span>رجوع</span>
        </button>
        <button type="button" className="btn btn--primary" onClick={next} disabled={selected === null}>
          <span>{step === TOTAL - 1 ? 'النتيجة' : 'التالي'}</span>
          <Icon name="chevron-start" size={16} className="icon--sm" />
        </button>
      </div>
    </section>
  );
}
