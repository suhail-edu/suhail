export default function Meter({ value, max, label, fromEnd = false, className = '' }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div
      className={`meter ${fromEnd ? 'meter--from-end' : ''} ${className}`.trim()}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
    >
      <div className="meter__fill" style={{ inlineSize: `${pct}%` }} />
    </div>
  );
}
