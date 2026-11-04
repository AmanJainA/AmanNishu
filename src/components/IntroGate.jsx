import { useEffect, useState } from 'react';

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
        <clipPath id="gate-floral-circle-clip">
          <circle cx="382" cy="407" r="262" />
        </clipPath>
      </defs>
      <g className="gate-orbiting-art">
        {/* Blush-peach colour is clipped strictly to the circular wreath. */}
        <g clipPath="url(#gate-floral-circle-clip)">
          <circle cx="382" cy="407" r="262" fill="#f3d5cc" opacity=".82" />
          <circle cx="382" cy="407" r="250" fill="#f8e8df" opacity=".55" />
          <g fill="none" stroke="#b89c70" strokeWidth="1.8" opacity=".72">
            <path d="M382 145 A262 262 0 1 1 381.9 145" />
          </g>
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
          <Flower x={196} y={218} scale={1.42} />
          <Flower x={568} y={596} scale={1.42} />
          <Flower x={150} y={263} scale={0.66} />
          <Flower x={614} y={551} scale={0.66} />
          <g fill="#d9b889">
            {Array.from({length:8},(_,i)=><circle key={`bud-a-${i}`} cx={146+i*13} cy={174+i*8} r={i%3===0?2.8:1.8}/> )}
            {Array.from({length:8},(_,i)=><circle key={`bud-n-${i}`} cx={618-i*13} cy={640-i*8} r={i%3===0?2.8:1.8}/> )}
          </g>
        </g>
        {/* Fine paired gold lines define the exact outer edge of the blush circle. */}
        <g fill="none" strokeLinecap="round">
          <circle cx="382" cy="407" r="266" stroke="#c18b45" strokeWidth="3" />
          <circle cx="382" cy="407" r="258" stroke="#e4bd79" strokeWidth="2.5" />
        </g>
      </g>
    </svg>
  );
}

export default function IntroGate() {
  const [opening, setOpening] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    if (!opening) return undefined;
    const timer = window.setTimeout(() => setClosed(true), 1550);
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
          <FloralEmblem />
          <span className="gate-monogram-fixed" aria-hidden="true">
            <span className="gate-letter-a">A</span>
            <span className="gate-ampersand">&amp;</span>
            <span className="gate-letter-n">N</span>
          </span>
        </button>
      </div>
      <div className="gate-bottom-note">RAJASTHAN <i>✦</i> DELHI <i>✦</i> TOGETHER, FOREVER</div>
    </div>
  );
}
