import { createElement, useEffect, useRef, useState } from 'react';

// React replacement for WOW.js: plays an animate.css animation when the element
// scrolls into view. Renders the same element/classes the original markup used.
export default function Reveal({
  as = 'div',
  animation = 'fadeInUp',
  duration = 1000,
  className = '',
  style,
  children,
  ...rest
}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const merged = {
    ...style,
    ...(shown ? { visibility: 'visible', animationDuration: `${duration}ms` } : { visibility: 'hidden' }),
  };

  return createElement(
    as,
    {
      ref,
      className: `wow ${animation}${shown ? ' animated' : ''} ${className}`.trim(),
      style: merged,
      ...rest,
    },
    children
  );
}
