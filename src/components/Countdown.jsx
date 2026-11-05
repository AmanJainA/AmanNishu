import { useEffect, useRef, useState } from 'react';

const pad = (n) => String(Math.max(0, n)).padStart(2, '0');

function diff(target) {
  const ms = Math.max(0, new Date(target).getTime() - Date.now());
  const s = Math.floor(ms / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    mins: Math.floor((s % 3600) / 60),
    secs: s % 60,
  };
}

function ScratchCover({ onReveal }) {
  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const revealed = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    ctx.scale(dpr, dpr);
    const g = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    g.addColorStop(0, '#f8e8d2');
    g.addColorStop(.48, '#e9cba5');
    g.addColorStop(1, '#f5dfc5');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.strokeStyle = 'rgba(139,91,48,.48)';
    ctx.lineWidth = 1;
    ctx.strokeRect(8, 8, rect.width - 16, rect.height - 16);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#805638';
    ctx.font = '600 9px Georgia';
    ctx.fillText('A  ✦  N', rect.width / 2, 34);
    ctx.font = '11px Georgia';
    ctx.fillText('SCRATCH TO REVEAL', rect.width / 2, rect.height / 2 + 4);
    ctx.font = '8px Georgia';
    ctx.fillText('A little surprise awaits', rect.width / 2, rect.height / 2 + 22);
    ctx.globalCompositeOperation = 'destination-out';
  }, []);

  const scratch = (event) => {
    if (revealed.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    ctx.beginPath();
    ctx.arc(x, y, 19, 0, Math.PI * 2);
    ctx.fill();
    if (drawing.current) {
      const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let cleared = 0;
      const total = pixels.length / 4;
      for (let n = 3; n < pixels.length; n += 4) if (pixels[n] < 40) cleared++;
      if (cleared / total > .34) {
        revealed.current = true;
        onReveal();
      }
    }
  };

  return (
    <canvas
      ref={canvasRef}
      className="countdown-scratch-cover"
      aria-label="Scratch to reveal the wedding countdown"
      onPointerDown={(e) => { drawing.current = true; e.currentTarget.setPointerCapture(e.pointerId); scratch(e); }}
      onPointerMove={(e) => { if (drawing.current) scratch(e); }}
      onPointerUp={() => { drawing.current = false; }}
      onPointerCancel={() => { drawing.current = false; }}
    />
  );
}

export default function Countdown({ target }) {
  const [t, setT] = useState(() => diff(target));
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setT(diff(target));
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const items = [['Days', t.days], ['Hours', t.hours], ['Mins', t.mins], ['Secs', t.secs]];

  return (
    <div className={`countdown-scratch-stage ${revealed ? 'is-revealed' : ''}`}>
      <div id="clock" role="timer" aria-label="Countdown to the wedding">
        {items.map(([label, value]) => (
          <div className="box" key={label}>
            <div>
              <div className="time">{pad(value)}</div> <span>{label}</span>{' '}
            </div>
          </div>
        ))}
      </div>
      {!revealed && <ScratchCover onReveal={() => setRevealed(true)} />}
    </div>
  );
}
