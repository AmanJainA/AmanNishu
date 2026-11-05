import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PalaceScene() {
  const flowers = Array.from({ length: 18 }, (_, i) => i);
  return (
    <svg className="royal-door-art" viewBox="0 0 1080 1080" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <defs>
        <linearGradient id="door-paper" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f9f0df"/><stop offset=".5" stopColor="#eee0c9"/><stop offset="1" stopColor="#e3d0b1"/></linearGradient>
        <linearGradient id="door-gold" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f7e7b8"/><stop offset=".35" stopColor="#9b7540"/><stop offset=".6" stopColor="#e6c987"/><stop offset="1" stopColor="#75542e"/></linearGradient>
        <linearGradient id="door-peacock" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#36a6a0"/><stop offset=".55" stopColor="#176a6d"/><stop offset="1" stopColor="#153e48"/></linearGradient>
        <pattern id="door-damask" width="58" height="58" patternUnits="userSpaceOnUse"><path d="M29 3 C10 18 9 35 29 53 C49 35 48 18 29 3Z M29 12 C20 23 20 32 29 42 C38 32 38 23 29 12Z" fill="none" stroke="#b89c70" strokeWidth="1" opacity=".35"/></pattern>
        <pattern id="door-border" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M0 14 Q7 0 14 14 Q21 28 28 14 M14 0 V28" fill="none" stroke="#a17d49" strokeWidth="2"/></pattern>
      </defs>
      <rect width="1080" height="1080" fill="#f1e7df"/>
      <rect x="119" y="122" width="842" height="838" rx="5" fill="#b5a184" opacity=".2"/>
      <rect x="125" y="122" width="830" height="836" fill="url(#door-paper)" stroke="url(#door-gold)" strokeWidth="9"/>
      <rect x="140" y="138" width="800" height="805" fill="url(#door-damask)" stroke="#b28e58" strokeWidth="2"/>
      <rect x="157" y="153" width="766" height="774" fill="none" stroke="#8f7146" strokeWidth="3"/>
      <rect x="164" y="160" width="752" height="760" fill="url(#door-border)" opacity=".42"/>
      <path d="M177 472 V400 C177 238 325 157 540 157 C755 157 903 238 903 400 V472" fill="none" stroke="url(#door-gold)" strokeWidth="12"/>
      <path d="M193 470 V403 C193 259 339 177 540 177 C741 177 887 259 887 403 V470" fill="none" stroke="#8b6c42" strokeWidth="4"/>
      <path d="M219 449 C230 279 365 207 540 207 C715 207 850 279 861 449" fill="none" stroke="#d2b987" strokeWidth="2"/>
      <rect x="323" y="255" width="434" height="485" fill="url(#door-paper)" opacity=".55" stroke="#c4a978" strokeWidth="3"/>
      <rect x="343" y="275" width="394" height="445" fill="url(#door-damask)" opacity=".6"/>
      <circle cx="540" cy="490" r="177" fill="#f2e7d5" opacity=".72" stroke="#d0b98d" strokeWidth="4"/>
      <circle cx="540" cy="490" r="156" fill="none" stroke="#bda071" strokeWidth="2" strokeDasharray="4 8"/>
      <g fill="none" stroke="#b79b6c" strokeWidth="2" opacity=".6">
        {Array.from({length:24},(_,i)=><ellipse key={i} cx="540" cy="335" rx="15" ry="46" transform={`rotate(${i*15} 540 490)`}/>)}
      </g>
      <g stroke="#94794f" strokeWidth="3" fill="none" opacity=".85">
        <path d="M164 340 Q230 300 295 340 Q230 390 164 340Z M785 340 Q850 300 916 340 Q850 390 785 340Z"/>
        <path d="M166 352 Q225 410 292 352 M788 352 Q855 410 914 352"/>
      </g>
      {/* Botanical arrangements */}
      <g fill="none" stroke="#788365" strokeWidth="5" strokeLinecap="round">
        <path d="M178 775 Q205 630 300 520 Q330 470 360 450 M180 820 Q235 710 315 650 M900 775 Q875 630 780 520 Q750 470 720 450 M900 820 Q845 710 765 650"/>
      </g>
      <g fill="#8c9876" stroke="#6e795f" strokeWidth="2">
        <path d="M205 672 Q140 625 151 570 Q214 589 224 648Z M250 590 Q190 530 211 480 Q266 518 270 570Z M291 540 Q260 475 294 437 Q332 489 310 533Z"/>
        <path d="M875 672 Q940 625 929 570 Q866 589 856 648Z M830 590 Q890 530 869 480 Q814 518 810 570Z M789 540 Q820 475 786 437 Q748 489 770 533Z"/>
        <path d="M220 790 Q153 776 145 724 Q209 729 239 771Z M860 790 Q927 776 935 724 Q871 729 841 771Z"/>
      </g>
      <g fill="#d59a8d" stroke="#a96f63" strokeWidth="2">
        {flowers.map(i=><g key={i} transform={`translate(${190+(i%6)*20} ${520+Math.floor(i/6)*95}) scale(.48)`}><circle r="8" fill="#b97c69"/>{Array.from({length:8},(_,k)=><ellipse key={k} cy="-17" rx="7" ry="18" transform={`rotate(${k*45})`}/>)}</g>)}
        {flowers.map(i=><g key={i} transform={`translate(${890-(i%6)*20} ${520+Math.floor(i/6)*95}) scale(.48)`}><circle r="8" fill="#b97c69"/>{Array.from({length:8},(_,k)=><ellipse key={k} cy="-17" rx="7" ry="18" transform={`rotate(${k*45})`}/>)}</g>)}
      </g>
      {/* Symmetrical palace pavilions */}
      <g fill="#b99a6c" stroke="#6f5738" strokeWidth="4">
        <path d="M174 760 V692 Q174 655 205 637 Q236 655 236 692 V760Z M145 637 L205 596 L265 637Z M157 624 Q205 560 253 624Z"/>
        <path d="M844 760 V692 Q844 655 875 637 Q906 655 906 692 V760Z M815 637 L875 596 L935 637Z M827 624 Q875 560 923 624Z"/>
        <path d="M264 780 V728 Q264 696 293 681 Q322 696 322 728 V780Z M239 681 L293 648 L347 681Z"/>
        <path d="M758 780 V728 Q758 696 787 681 Q816 696 816 728 V780Z M733 681 L787 648 L841 681Z"/>
      </g>
      <g fill="none" stroke="#e7d3a7" strokeWidth="3">
        <path d="M185 760 V698 Q185 666 205 655 Q225 666 225 698 V760 M855 760 V698 Q855 666 875 655 Q895 666 895 698 V760"/>
        <path d="M275 780 V734 Q275 707 293 699 Q311 707 311 734 V780 M769 780 V734 Q769 707 787 699 Q805 707 805 734 V780"/>
      </g>
      {/* Paired peacocks */}
      <g transform="translate(370 800)">
        <path d="M-20 12 Q-80 -12 -74 -95 Q-68 -165 -18 -170 Q27 -172 34 -125 Q39 -93 10 -74 Q-4 -61 10 -34 L24 12Z" fill="url(#door-peacock)" stroke="#9b814b" strokeWidth="3"/>
        <path d="M-5 -150 Q8 -205 42 -188 Q60 -175 42 -154 L21 -147" fill="#247e83" stroke="#997b48" strokeWidth="3"/>
        <circle cx="37" cy="-174" r="4" fill="#f2d99a"/><path d="M41 -190 l17 -8 -9 16" fill="#b78b42"/>
        {Array.from({length:7},(_,i)=><g key={i} transform={`translate(${-68+i*17} ${-5+Math.abs(3-i)*6}) rotate(${-26+i*9})`}><ellipse rx="8" ry="38" fill="#247d77"/><ellipse cy="-17" rx="4" ry="11" fill="#d8b55e"/><circle cy="-18" r="3" fill="#194c50"/></g>)}
        <path d="M-4 5 l-14 35 M14 5 l12 35" stroke="#80653c" strokeWidth="4" fill="none"/>
      </g>
      <g transform="translate(710 800) scale(-1 1)">
        <path d="M-20 12 Q-80 -12 -74 -95 Q-68 -165 -18 -170 Q27 -172 34 -125 Q39 -93 10 -74 Q-4 -61 10 -34 L24 12Z" fill="url(#door-peacock)" stroke="#9b814b" strokeWidth="3"/>
        <path d="M-5 -150 Q8 -205 42 -188 Q60 -175 42 -154 L21 -147" fill="#247e83" stroke="#997b48" strokeWidth="3"/>
        <circle cx="37" cy="-174" r="4" fill="#f2d99a"/><path d="M41 -190 l17 -8 -9 16" fill="#b78b42"/>
        {Array.from({length:7},(_,i)=><g key={i} transform={`translate(${-68+i*17} ${-5+Math.abs(3-i)*6}) rotate(${-26+i*9})`}><ellipse rx="8" ry="38" fill="#247d77"/><ellipse cy="-17" rx="4" ry="11" fill="#d8b55e"/><circle cy="-18" r="3" fill="#194c50"/></g>)}
        <path d="M-4 5 l-14 35 M14 5 l12 35" stroke="#80653c" strokeWidth="4" fill="none"/>
      </g>
      {/* Central hanging ornamental name plaque */}
      <path d="M540 123 V420" stroke="#76532b" strokeWidth="8"/>
      <path d="M540 123 V420" stroke="#e7c982" strokeWidth="2"/>
      <path d="M540 399 C518 420 481 425 469 458 L451 482 L465 506 L456 548 L476 574 L470 625 L496 647 L540 662 L584 647 L610 625 L604 574 L624 548 L615 506 L629 482 L611 458 C599 425 562 420 540 399Z" fill="#2f211b" stroke="url(#door-gold)" strokeWidth="9"/>
      <path d="M540 424 C521 443 490 444 482 470 L470 489 L484 508 L476 543 L495 565 L491 610 L540 634 L589 610 L585 565 L604 543 L596 508 L610 489 L598 470 C590 444 559 443 540 424Z" fill="#6f321f" stroke="#d7b66f" strokeWidth="4"/>
      <path d="M489 476 Q540 447 591 476 M486 585 Q540 616 594 585" fill="none" stroke="#e4c77e" strokeWidth="3"/>
      <text x="540" y="520" textAnchor="middle" fill="#f8e8c6" fontFamily="Georgia,serif" fontSize="22" letterSpacing="3">AMAN</text>
      <text x="540" y="550" textAnchor="middle" fill="#f8e8c6" fontFamily="Georgia,serif" fontSize="16" letterSpacing="4">&amp;</text>
      <text x="540" y="580" textAnchor="middle" fill="#f8e8c6" fontFamily="Georgia,serif" fontSize="22" letterSpacing="3">NISHU</text>
      <path d="M516 463 Q540 440 564 463 M516 601 Q540 623 564 601" fill="none" stroke="#e9d39c" strokeWidth="2"/>
      {/* Bottom floral border */}
      <path d="M158 904 H922" stroke="#8d5352" strokeWidth="5"/>
      <path d="M158 913 H922" stroke="#c3a16a" strokeWidth="2"/>
      <rect x="158" y="919" width="764" height="13" fill="url(#door-border)" opacity=".9"/>
      <g fill="#b08c55"><path d="M540 894 Q514 916 488 894 Q514 874 540 894 Q566 874 592 894 Q566 916 540 894Z"/><circle cx="540" cy="894" r="7" fill="#7f5550"/></g>
      {/* Door seam and handle */}
      <path d="M540 123 V958" stroke="#5b4025" strokeWidth="3" opacity=".85"/>
      <path d="M535 125 V958 M545 125 V958" stroke="#d8b978" strokeWidth="1" opacity=".9"/>
    </svg>
  );
}

export default function IntroGate() {
  const [opening, setOpening] = useState(false);
  const [closed, setClosed] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!opening) return undefined;
    const timer = window.setTimeout(() => { setClosed(true); navigate('/card'); }, 1550);
    return () => window.clearTimeout(timer);
  }, [opening, navigate]);
  if (closed) return null;
  return (
    <div className={`wedding-gate royal-door-gate ${opening ? 'is-opening' : ''}`} aria-label="Wedding invitation entrance">
      <div className="royal-door-card">
        <div className="royal-door-panel royal-door-left"><PalaceScene /></div>
        <div className="royal-door-panel royal-door-right"><PalaceScene /></div>
        <button className="royal-door-open" type="button" onClick={() => setOpening(true)} disabled={opening} aria-label="Open wedding invitation">
          <span>OPEN INVITATION</span><small>Tap to enter</small>
        </button>
      </div>
    </div>
  );
}
