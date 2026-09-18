import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import Meter from '../components/Meter.jsx';
import usePageTitle from '../components/usePageTitle.js';
import { QUESTIONS, TRACKS, scoreAnswers } from '../data/quiz.js';
import './quiz.css';

const TOTAL = QUESTIONS.length;

export default function Quiz() {
  usePageTitle('اختبار تحديد الميول');
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(() => Array(TOTAL).fill(null));
  const [done, setDone] = useState(false);
  const headingRef = useRef(null);

  // move focus to the question when it changes (screen readers + keyboard)
  useEffect(() => {
    headingRef.current?.focus();
  }, [step, done]);

  const choose = (i) => {
    setAnswers((a) => a.map((v, qi) => (qi === step ? i : v)));
  };

  const next = () => {
    if (answers[step] === null) return;
    if (step === TOTAL - 1) setDone(true);
    else setStep((s) => s + 1);
  };

  const back = () => {
    if (done) { setDone(false); return; }
    if (step > 0) setStep((s) => s - 1);
  };

  const restart = () => {
    setAnswers(Array(TOTAL).fill(null));
    setStep(0);
    setDone(false);
  };

  if (done) {
    const track = TRACKS[scoreAnswers(answers)];
    const branchPath = `/majors/${track.branch}`;
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

  const q = QUESTIONS[step];
  const selected = answers[step];

  return (
    <section className="container quiz" aria-labelledby="quiz-question">
      <Meter className="quiz__meter" value={step + 1} max={TOTAL} label="تقدم الاختبار" fromEnd />
      <p className="quiz__count">السؤال {step + 1} من {TOTAL}</p>
      <h1 id="quiz-question" className="quiz__question" ref={headingRef} tabIndex={-1}>{q.text}</h1>

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
              onClick={() => choose(i)}
            >
              {isSel && <Icon name="check" className="option__check" />}
              <span>{opt.text}</span>
            </button>
          );
        })}
      </div>

      <div className="quiz__nav">
        <button type="button" className="btn tap" onClick={back} disabled={step === 0}>
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
