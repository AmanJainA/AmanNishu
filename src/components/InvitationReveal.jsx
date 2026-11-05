import { useEffect, useRef, useState } from 'react';
import Card from '../pages/Card';
import { asset } from '../utils/asset';
import { coupleTitle, dateLine } from '../data/wedding';

export default function InvitationReveal() {
  const canvasRef = useRef(null);
  const drawingRef = useRef(false);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
      gradient.addColorStop(0, '#d9bd91');
      gradient.addColorStop(.48, '#f3e6cf');
      gradient.addColorStop(1, '#b98d5c');
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, rect.width, rect.height);
      ctx.fillStyle = 'rgba(93,61,37,.78)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '600 11px Georgia, serif';
      ctx.fillText('✦  SCRATCH TO REVEAL  ✦', rect.width / 2, rect.height / 2 - 4);
      ctx.font = '9px Georgia, serif';
      ctx.fillText('USE YOUR FINGER OR MOUSE', rect.width / 2, rect.height / 2 + 17);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const scratch = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 23, 0, Math.PI * 2);
    ctx.fill();
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let cleared = 0;
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] < 16) cleared++;
    }
    if (cleared / (pixels.length / 4) >= 0.28) setIsRevealed(true);
  };

  return (
    <main className="invitation-reveal-page">
      <div className="invitation-reveal-frame">
        <span className="invitation-reveal-kicker">A CELEBRATION OF LOVE & TOGETHERNESS</span>
        <div className="invitation-reveal-ornament">❧</div>
        <h1> {coupleTitle} </h1>
        <p className="invitation-reveal-intro">
          You are cordially invited to<br />
          attend the marriage celebration
        </p>
        <div className="invitation-reveal-divider"><span>✦</span></div>
        <div className="invitation-reveal-couple">
          <img src={asset('images/slider/hero-6.png')} alt="Aman and Nishu" />
        </div>
        <p className="invitation-reveal-blessing">With the blessings of our families</p>
        <div className="invitation-scratch-wrap">
          <div className="invitation-scratch-date">
            <span>THE WEDDING CELEBRATION</span>
            <strong>8th – 10th February 2027</strong>
            <small>Bijainagar, Ajmer, Rajasthan</small>
            <em>{dateLine}</em>
          </div>
          <canvas
            ref={canvasRef}
            className="invitation-scratch-canvas"
            onPointerDown={(event) => {
              drawingRef.current = true;
              event.currentTarget.setPointerCapture(event.pointerId);
              scratch(event);
            }}
            onPointerMove={(event) => {
              if (drawingRef.current) scratch(event);
            }}
            onPointerUp={() => { drawingRef.current = false; }}
            onPointerCancel={() => { drawingRef.current = false; }}
            aria-label="Scratch here to reveal the wedding date"
          />
        </div>
        <p className="invitation-reveal-footnote">A new chapter begins — we can’t wait to celebrate with you.</p>
      </div>
      {isRevealed && <div className="invitation-reveal-card-content"><Card embedded /></div>}
    </main>
  );
}
