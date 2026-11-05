import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Flower({ x, y, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <g fill="#e9aa98" stroke="#d58b7c" strokeWidth="1.1">
        {Array.from({ length: 12 }, (_, i) => <ellipse key={`outer-${i}`} cx="0" cy="-23" rx="10" ry="22" transform={`rotate(${i * 30})`} />)}
      </g>
      <g fill="#f5c1ad" stroke="#df9b88" strokeWidth=".9">
        {Array.from({ length: 9 }, (_, i) => <ellipse key={`mid-${i}`} cx="0" cy="-14" rx="7.5" ry="16" transform={`rotate(${i * 40})`} />)}
      </g>
      <g fill="#f8d2bd" stroke="#df9b88" strokeWidth=".7">
        {Array.from({ length: 6 }, (_, i) => <ellipse key={`inner-${i}`} cx="0" cy="-7" rx="5" ry="10" transform={`rotate(${i * 60})`} />)}
      </g>
      <circle r="5.5" fill="#bd7562" />
      <path d="M-4 0 C-3 -6 4 -6 4 -1 C5 4 -3 6 -4 1 C-5 -3 2 -4 2 -1" fill="none" stroke="#f8ddc8" strokeWidth="1.5" />
    </g>
  );
}

function FloralEmblem() {
  return (
    <svg className="gate-floral-art" viewBox="0 0 764 814" role="presentation" aria-hidden="true">
      <defs>
        <radialGradient id="gate-wax-base" cx="32%" cy="24%" r="78%">
          <stop offset="0%" stopColor="#fff5e9" />
          <stop offset="38%" stopColor="#f4e1cb" />
          <stop offset="72%" stopColor="#f1cfc5" />
          <stop offset="100%" stopColor="#e9b9b8" />
        </radialGradient>
        <radialGradient id="gate-wax-highlight" cx="28%" cy="18%" r="72%">
          <stop offset="0%" stopColor="#fffaf2" stopOpacity=".82" />
          <stop offset="48%" stopColor="#f9e8df" stopOpacity=".32" />
          <stop offset="100%" stopColor="#f9e8df" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="gate-wax-edge" x1="0" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#fff3e6" stopOpacity=".48" />
          <stop offset="55%" stopColor="#eabfc0" stopOpacity=".04" />
          <stop offset="100%" stopColor="#c98f9a" stopOpacity=".2" />
        </linearGradient>
        <clipPath id="gate-floral-circle-clip">
          <circle cx="382" cy="407" r="350" />
        </clipPath>
      </defs>
      <g className="gate-orbiting-art">
        {/* Raised wax seal is confined to this rotating circular artwork only. */}
        <circle cx="382" cy="407" r="228" fill="url(#gate-wax-base)" />
        <circle cx="382" cy="407" r="228" fill="url(#gate-wax-highlight)" />
        <circle cx="382" cy="407" r="228" fill="url(#gate-wax-edge)" />
        <circle cx="382" cy="407" r="223" fill="none" stroke="#f6c6b5" strokeOpacity=".28" strokeWidth="2" />
        {/* Blush-peach colour is clipped strictly to the circular wreath. */}
        <g clipPath="url(#gate-floral-circle-clip)">
          {/* Sage leaves follow the ring and remain inside its edge. */}
          <g fill="#9a9a7a" stroke="#7f866b" strokeWidth="1.2">
            <path d="M183 218 Q139 182 137 145 Q183 164 195 205Z" />
            <path d="M207 198 Q184 151 199 119 Q228 159 220 193Z" />
            <path d="M229 183 Q223 137 246 111 Q260 153 244 185Z" />
            <path d="M581 596 Q625 632 627 669 Q581 650 569 609Z" />
            <path d="M557 616 Q580 663 565 695 Q536 655 544 621Z" />
            <path d="M535 631 Q541 677 518 703 Q504 661 520 629Z" />
            <path d="M156 269 Q119 252 104 221 Q148 225 166 253Z" />
            <path d="M608 545 Q645 562 660 593 Q616 589 598 561Z" />
          </g>
          <g fill="none" stroke="#b89c70" strokeWidth="1.6" strokeLinecap="round">
            <path d="M154 254 Q176 235 193 217 M176 237 Q196 217 214 202 M193 220 Q213 201 230 187" />
            <path d="M610 560 Q588 579 571 597 M588 577 Q568 597 550 612 M571 594 Q551 613 534 628" />
          </g>
          {/* Main roses sit directly on the circular path, diagonally opposite. */}
          <g fill="#d9b889">
            {Array.from({length:8},(_,i)=><circle key={`bud-a-${i}`} cx={146+i*13} cy={174+i*8} r={i%3===0?2.8:1.8}/> )}
            {Array.from({length:8},(_,i)=><circle key={`bud-n-${i}`} cx={618-i*13} cy={640-i*8} r={i%3===0?2.8:1.8}/> )}
          </g>
        </g>
        {/* Roses sit over the ring so each bloom remains whole and follows its curve. */}
        {/* Fine paired gold lines define the exact outer edge of the blush circle. */}
        <g fill="none" strokeLinecap="round">
          <circle cx="382" cy="407" r="236" stroke="#c18b45" strokeWidth="3" />
          <circle cx="382" cy="407" r="228" stroke="#e4bd79" strokeWidth="2.5" />
        </g>
        <Flower x={213} y={232} scale={1.42} />
        <Flower x={551} y={582} scale={1.42} />
        <Flower x={168} y={275} scale={0.66} />
        <Flower x={596} y={539} scale={0.66} />
      </g>
    </svg>
  );
}


function RoyalMonogramArt() {
  return (
    <svg className="royal-gate-art" viewBox="0 0 420 570" aria-hidden="true">
      <defs>
        <linearGradient id="royal-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8b561b"/><stop offset=".45" stopColor="#d4a34e"/><stop offset="1" stopColor="#9c6726"/>
        </linearGradient>
        <linearGradient id="royal-peacock" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1a7890"/><stop offset=".5" stopColor="#176276"/><stop offset="1" stopColor="#164a55"/>
        </linearGradient>
      </defs>
      <path className="royal-arch-line" d="M28 548V180 Q28 150 55 139 L83 127 Q105 116 112 88 Q120 47 210 22 Q300 47 308 88 Q315 116 337 127 L365 139 Q392 150 392 180 V548Z"/>
      <path className="royal-arch-inner" d="M39 540V183 Q39 158 62 149 L88 138 Q115 126 123 91 Q132 57 210 36 Q288 57 297 91 Q305 126 332 138 L358 149 Q381 158 381 183 V540Z"/>
      <g className="royal-mandala" fill="none" stroke="#d9b98b" strokeWidth="1" opacity=".28">
        <circle cx="210" cy="250" r="102"/><circle cx="210" cy="250" r="88"/>
        {Array.from({length:16},(_,i)=><ellipse key={i} cx="210" cy="164" rx="12" ry="38" transform={`rotate(${i*22.5} 210 250)`}/>)}
      </g>
      <g fill="none" stroke="#a7a77e" strokeWidth="1.5" opacity=".75" strokeLinecap="round">
        <path d="M38 365 Q75 325 83 270 Q95 230 124 209 M48 407 Q82 374 92 331 M66 447 Q108 410 112 366"/>
        <path d="M382 350 Q344 316 337 265 Q327 229 297 207 M372 402 Q338 365 328 324 M354 446 Q312 408 308 366"/>
      </g>
      <g fill="#8e9b78" opacity=".78">
        <path d="M72 333 Q35 299 38 274 Q76 286 82 321Z"/><path d="M91 296 Q57 259 66 236 Q101 259 101 286Z"/>
        <path d="M100 390 Q58 370 52 342 Q94 349 108 377Z"/><path d="M347 326 Q385 291 382 265 Q344 279 338 314Z"/>
        <path d="M329 294 Q363 256 354 233 Q319 257 319 284Z"/><path d="M320 390 Q362 368 368 340 Q326 348 312 377Z"/>
      </g>
      <g fill="#d78d9d" stroke="#c77d8d" strokeWidth="1">
        <g transform="translate(73 420)"><circle r="9"/>{Array.from({length:7},(_,i)=><ellipse key={i} cy="-15" rx="5" ry="13" transform={`rotate(${i*51.4})`}/>)}</g>
        <g transform="translate(350 405)"><circle r="8"/>{Array.from({length:7},(_,i)=><ellipse key={i} cy="-14" rx="5" ry="12" transform={`rotate(${i*51.4})`}/>)}</g>
        <g transform="translate(323 455) scale(.7)"><circle r="8"/>{Array.from({length:7},(_,i)=><ellipse key={i} cy="-14" rx="5" ry="12" transform={`rotate(${i*51.4})`}/>)}</g>
      </g>
      <g className="royal-peacock" transform="translate(255 455)">
        <path d="M-10 40 Q-54 12 -69 -40 Q-75 -79 -45 -99 Q-15 -111 3 -82 Q18 -56 2 -27 Q-5 -10 8 4" fill="none" stroke="#176276" strokeWidth="3"/>
        <path d="M-5 27 Q-34 -8 -24 -43 Q-16 -69 2 -73 Q23 -72 29 -48 Q36 -22 14 -4 L28 25Z" fill="url(#royal-peacock)"/>
        <path d="M8 -65 Q21 -96 42 -84 Q52 -77 43 -65 Q35 -58 24 -67" fill="url(#royal-peacock)"/>
        <path d="M43 -83 L52 -99 L56 -81Z" fill="#b88b3d"/>
        <circle cx="39" cy="-76" r="2.5" fill="#f8e5b7"/>
        <path d="M-7 25 Q-45 57 -68 67 M4 27 Q-20 61 -36 77" fill="none" stroke="#8a6c3c" strokeWidth="2"/>
        {Array.from({length:7},(_,i)=><g key={i} transform={`translate(${-10+i*10} ${18+Math.abs(3-i)*5}) rotate(${-30+i*10})`}><ellipse rx="7" ry="19" fill="#176276"/><ellipse cy="-5" rx="3" ry="8" fill="#d4a34e"/><circle cy="-6" r="2.5" fill="#286c58"/></g>)}
      </g>
      <path d="M45 516 H375" stroke="#9c555c" strokeWidth="2"/>
      <path d="M45 522 H375" stroke="#c39a5d" strokeWidth="1"/>
      <g fill="#a0525c">
        {Array.from({length:15},(_,i)=><path key={i} d={`M${54+i*22} 527 l5 6 -5 6 -5 -6Z`}/>)}
      </g>
    </svg>
  );
}

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
  }, [opening]);

  if (closed) return null;

  return (
    <div className={`wedding-gate ${opening ? 'is-opening' : ''}`} aria-label="Wedding invitation entrance">
      <div className="gate-culture gate-culture-rajasthan">
        <div className="gate-rajasthan-collage" aria-label="Rajasthan heritage collage">
          <img className="rajasthan-tile tile-amer" src="https://rajasthanstourism.com/images/tour-images/jaipur/amer-fort-jaipur.webp" alt="Amer Fort, Jaipur" loading="eager" />
          <img className="rajasthan-tile tile-hawa" src="https://rajasthanstourism.com/images/tour-images/jaipur/hawa-mahal-jaipur.webp" alt="Hawa Mahal, Jaipur" loading="eager" />
          <img className="rajasthan-tile tile-jal" src="https://rajasthanstourism.com/images/tour-images/jaipur/Jpr-jalmahal1.webp" alt="Jal Mahal, Jaipur" loading="eager" />
          <img className="rajasthan-tile tile-ajmer" src="https://commons.wikimedia.org/wiki/Special:FilePath/Ajmer_dargah_sharif.jpg" alt="Ajmer Sharif Dargah, Ajmer" loading="eager" />
          <img className="rajasthan-tile tile-udaipur" src="https://rajasthanstourism.com/images/tour-images/udaipur/city-palace-udaipur.webp" alt="City Palace, Udaipur" loading="eager" />
          <img className="rajasthan-tile tile-badnore" src="https://pbs.twimg.com/media/E6_G3lvVkAUgI1f.jpg" alt="Badnore Fort, Bhilwara" loading="eager" />
          <img className="rajasthan-tile tile-mandalgarh" src="https://rajras.in/wp-content/uploads/2016/09/Mandalgarh-fort.jpg" alt="Mandalgarh Fort, Bhilwara" loading="eager" />
          <img className="rajasthan-tile tile-menal" src="https://images.bhaskarassets.com/thumb/730x0/web2images/521/2021/09/26/untitled-29_1632641919.jpg" alt="Menal temple ruins and waterfall, Bhilwara" loading="eager" />
        </div>
        <div className="gate-culture-copy"><span>THE LAND OF ROYALS</span><strong>RAJASTHAN</strong><small>Heritage · Tradition · Grandeur</small></div>
      </div>
      <div className="gate-culture gate-culture-delhi">
        <img className="gate-culture-photo" src="https://ak-d.tripcdn.com/images/1mi0x224x9a8d8mez06C2_W_200_0_R5_Q50.jpg?proc=source%2Ftrip" alt="" aria-hidden="true" />
        <div className="gate-culture-copy"><span>THE CITY OF HEARTS</span><strong>DELHI</strong><small>History · Dreams · New Beginnings</small></div>
      </div>
      <div className="gate-center">
        <button
          type="button"
          className="gate-seal"
          onClick={() => setOpening(true)}
          disabled={opening}
          aria-label="Open Aman and Nishu's wedding invitation"
        >
          <div className="royal-gate-card" aria-hidden="true">
            <RoyalMonogramArt />
            <div className="royal-gate-monogram">A<span>N</span></div>
            <div className="royal-gate-names">Aman <i>&amp;</i> Nishu</div>
            <div className="royal-gate-tagline">TWO HEARTS · ONE JOURNEY</div>
          </div>
        </button>
      </div>
      <div className="gate-bottom-note">RAJASTHAN <i>✦</i> DELHI <i>✦</i> TOGETHER, FOREVER</div>
    </div>
  );
}
