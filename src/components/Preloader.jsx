import { useEffect, useState } from 'react';

// Same markup/CSS as the original theme loader. Fades out once the page has loaded.
export default function Preloader() {
  const [phase, setPhase] = useState('show'); // show -> hide -> gone

  useEffect(() => {
    let t1, t2;
    const finish = () => {
      setPhase('hide');
      t2 = setTimeout(() => setPhase('gone'), 400);
    };
    if (document.readyState === 'complete') {
      t1 = setTimeout(finish, 350);
    } else {
      window.addEventListener('load', finish, { once: true });
    }
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('load', finish);
    };
  }, []);

  if (phase === 'gone') return null;

  return (
    <div
      className="preloader"
      style={{ opacity: phase === 'hide' ? 0 : 1, transition: 'opacity 400ms ease' }}
      aria-hidden="true"
    >
      <div className="vertical-centered-box">
        <div className="content">
          <div className="loader-circle"></div>
          <div className="loader-line-mask">
            <div className="loader-line"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
