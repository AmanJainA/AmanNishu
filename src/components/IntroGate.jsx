import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function IntroGate() {
  const [opening, setOpening] = useState(false);
  const [closed, setClosed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!opening) return undefined;
    const timer = window.setTimeout(() => {
      setClosed(true);
      navigate('/card');
    }, 1550);
    return () => window.clearTimeout(timer);
  }, [opening, navigate]);

  if (closed) return null;

  const artwork = `${process.env.PUBLIC_URL}/assets/images/aman-nishu-gate.jpg`;

  return (
    <main className={`wedding-gate royal-door-gate ${opening ? 'is-opening' : ''}`} aria-label="Aman and Nishu wedding invitation">
      <div className="royal-door-card">
        <div className="royal-door-panel royal-door-left" style={{ backgroundImage: `url("${artwork}")` }} />
        <div className="royal-door-panel royal-door-right" style={{ backgroundImage: `url("${artwork}")` }} />
        <button
          className="royal-door-open"
          type="button"
          onClick={() => setOpening(true)}
          disabled={opening}
          aria-label="Open Aman and Nishu wedding invitation"
        >
          <span>OPEN INVITATION</span>
          <small>Aman &amp; Nishu · Tap to enter</small>
        </button>
      </div>
    </main>
  );
}
