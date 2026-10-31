import { useEffect, useState } from 'react';

export default function Preloader() {
  const [phase, setPhase] = useState('show');

  useEffect(() => {
    let hideTimer;
    let removeTimer;

    const finish = () => {
      hideTimer = window.setTimeout(() => {
        setPhase('hide');
        removeTimer = window.setTimeout(() => setPhase('gone'), 350);
      }, 250);
    };

    if (document.readyState === 'complete') {
      finish();
    } else {
      window.addEventListener('load', finish, { once: true });
    }

    return () => {
      window.clearTimeout(hideTimer);
      window.clearTimeout(removeTimer);
      window.removeEventListener('load', finish);
    };
  }, []);

  if (phase === 'gone') return null;

  return (
    <>
      <style>{`
        @keyframes wedding-preloader-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <div
        role="status"
        aria-label="Loading"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999999,
          display: 'grid',
          placeItems: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: '#657150',
          opacity: phase === 'hide' ? 0 : 1,
          visibility: phase === 'hide' ? 'hidden' : 'visible',
          transition: 'opacity 350ms ease, visibility 350ms ease',
          pointerEvents: phase === 'hide' ? 'none' : 'auto',
        }}
      >
        <span
          aria-hidden="true"
          style={{
            display: 'block',
            width: 54,
            height: 54,
            border: '4px solid rgba(255,255,255,.25)',
            borderTopColor: '#fff',
            borderRadius: '50%',
            animation: 'wedding-preloader-spin .8s linear infinite',
          }}
        />
      </div>
    </>
  );
}
