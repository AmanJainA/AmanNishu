import { useEffect, useState } from 'react';

function Flower({ x, y, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <g fill="#e9a18e" stroke="#d58a79" strokeWidth="1.4">
        {Array.from({ length: 10 }, (_, i) => <ellipse key={i} cx="0" cy="-29" rx="15" ry="29" transform={`rotate(${i * 36})`} />)}
      </g>
      <g fill="#f3b6a2" stroke="#d98d7b" strokeWidth="1">
        {Array.from({ length: 8 }, (_, i) => <ellipse key={i} cx="0" cy="-17" rx="10" ry="19" transform={`rotate(${i * 45})`} />)}
      </g>
      <circle r="12" fill="#c87565" />
      <path d="M-8 0 C-5 -10 7 -10 9 -1 C10 7 -4 11 -7 3 C-10 -4 2 -8 5 -2" fill="none" stroke="#f8d1bd" strokeWidth="2.5" />
    </g>
  );
}

function FloralEmblem() {
  return (
    <svg className="gate-floral-art" viewBox="0 0 764 814" role="presentation" aria-hidden="true">
      {/* The two close circular guide lines stay fixed behind the moving flowers. */}
      <g fill="none" stroke="#b99a70" strokeWidth="2" opacity="0.88">
        <circle cx="382" cy="407" r="258" />
        <circle cx="382" cy="407" r="266" />
      </g>
      <g className="gate-orbiting-art">
        <Flower x={382} y={141} scale={0.88} />
        <Flower x={570} y={219} scale={0.72} />
        <Flower x={648} y={407} scale={0.9} />
        <Flower x={570} y={595} scale={0.72} />
        <Flower x={382} y={673} scale={0.88} />
        <Flower x={194} y={595} scale={0.72} />
        <Flower x={116} y={407} scale={0.9} />
        <Flower x={194} y={219} scale={0.72} />
        <g fill="#9b9b7b" stroke="#81866c" strokeWidth="1.2">
          <path d="M270 177 C250 150 250 132 260 112 C286 136 288 157 270 177Z" />
          <path d="M494 637 C514 664 514 682 504 702 C478 678 476 657 494 637Z" />
          <path d="M612 300 C642 284 659 288 674 302 C648 323 627 320 612 300Z" />
          <path d="M152 514 C122 530 105 526 90 512 C116 491 137 494 152 514Z" />
          <path d="M489 177 C509 150 509 132 499 112 C473 136 471 157 489 177Z" />
          <path d="M275 637 C255 664 255 682 265 702 C291 678 293 657 275 637Z" />
        </g>
        <g fill="#d9b889">
          <circle cx="306" cy="154" r="4"/><circle cx="326" cy="145" r="3"/>
          <circle cx="458" cy="154" r="4"/><circle cx="438" cy="145" r="3"/>
          <circle cx="635" cy="333" r="4"/><circle cx="644" cy="353" r="3"/>
          <circle cx="635" cy="481" r="4"/><circle cx="644" cy="461" r="3"/>
          <circle cx="458" cy="660" r="4"/><circle cx="438" cy="669" r="3"/>
          <circle cx="306" cy="660" r="4"/><circle cx="326" cy="669" r="3"/>
          <circle cx="129" cy="481" r="4"/><circle cx="120" cy="461" r="3"/>
          <circle cx="129" cy="333" r="4"/><circle cx="120" cy="353" r="3"/>
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
