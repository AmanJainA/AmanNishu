import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function IntroGate() {
  const [opening, setOpening] = useState(false);
  const [closed, setClosed] = useState(false);
  const [imagesReady, setImagesReady] = useState(false);
  const navigate = useNavigate();

  const imageBase = `${process.env.PUBLIC_URL}/assets/images/`;
  const leftImage = `${imageBase}aman-nishu-gate-left.jpg`;
  const rightImage = `${imageBase}aman-nishu-gate-right.jpg`;

  useEffect(() => {
    let mounted = true;
    const left = new Image();
    const right = new Image();
    let loaded = 0;
    const markLoaded = () => {
      loaded += 1;
      if (loaded === 2 && mounted) setImagesReady(true);
    };
    left.onload = markLoaded;
    right.onload = markLoaded;
    left.onerror = markLoaded;
    right.onerror = markLoaded;
    left.src = leftImage;
    right.src = rightImage;
    return () => { mounted = false; };
  }, [leftImage, rightImage]);

  useEffect(() => {
    if (!opening) return undefined;
    const timer = window.setTimeout(() => {
      setClosed(true);
      navigate('/card');
    }, 1550);
    return () => window.clearTimeout(timer);
  }, [opening, navigate]);

  if (closed) return null;

  return (
    <main className={`wedding-gate royal-door-gate ${opening ? 'is-opening' : ''}`} aria-label="Aman and Nishu wedding invitation">
      <div className={`royal-door-card ${imagesReady ? 'artwork-ready' : ''}`}>
        <div className="royal-door-panel royal-door-left">
          <img
            src={leftImage}
            alt=""
            className="royal-door-image"
            draggable="false"
            fetchPriority="high"
          />
        </div>
        <div className="royal-door-panel royal-door-right">
          <img
            src={rightImage}
            alt=""
            className="royal-door-image"
            draggable="false"
            fetchPriority="high"
          />
        </div>
        <button
          className="royal-door-open"
          type="button"
          onClick={() => setOpening(true)}
          disabled={opening || !imagesReady}
          aria-label="Open Aman and Nishu wedding invitation"
        >
          <span>OPEN INVITATION</span>
          <small>Aman &amp; Nishu · Tap to enter</small>
        </button>
      </div>
    </main>
  );
}
