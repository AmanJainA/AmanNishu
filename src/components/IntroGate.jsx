import { useEffect, useState } from 'react';

export default function IntroGate() {
  const [opening, setOpening] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    if (!opening) return undefined;
    const timer = window.setTimeout(() => setClosed(true), 1500);
    return () => window.clearTimeout(timer);
  }, [opening]);

  if (closed) return null;

  return (
    <div className={`wedding-gate ${opening ? 'is-opening' : ''}`} aria-label="Wedding invitation entrance">
      <div className="gate-panel gate-panel-left" />
      <div className="gate-panel gate-panel-right" />
      <div className="gate-center">
        <button
          type="button"
          className="gate-seal"
          onClick={() => setOpening(true)}
          disabled={opening}
          aria-label="Open Aman and Nishu's wedding invitation"
        >
          <span className="gate-floral-ring" aria-hidden="true">
            {Array.from({ length: 12 }, (_, index) => (
              <span className="gate-flower-petal" key={index} style={{ '--petal': index }} />
            ))}
            <span className="gate-ring-inner" />
          </span>
          <span className="gate-monogram-fixed">A <i>&amp;</i> N</span>
        </button>
        <p className="gate-caption">A celebration of love</p>
      </div>
    </div>
  );
}
