import { useEffect, useState } from 'react';

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

// Keeps the original markup (#clock > .box > div > .time + span) so the theme CSS applies.
export default function Countdown({ target }) {
  const [t, setT] = useState(() => diff(target));

  useEffect(() => {
    setT(diff(target));
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const items = [['Days', t.days], ['Hours', t.hours], ['Mins', t.mins], ['Secs', t.secs]];

  return (
    <div id="clock" role="timer" aria-label="Countdown to the wedding">
      {items.map(([label, value]) => (
        <div className="box" key={label}>
          <div>
            <div className="time">{pad(value)}</div> <span>{label}</span>{' '}
          </div>
        </div>
      ))}
    </div>
  );
}
