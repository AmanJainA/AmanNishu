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
      <g className="gate-orbiting-art">
        {/* Fine double gold wreath, following the reference artwork. */}
        <g fill="none" strokeLinecap="round">
          <circle cx="382" cy="407" r="266" stroke="#c18b45" strokeWidth="3" />
          <circle cx="382" cy="407" r="258" stroke="#e4bd79" strokeWidth="2.5" />
        </g>
        {/* Soft sage foliage behind the two diagonal rose clusters. */}
        <g fill="#9a9a7a" stroke="#7f866b" strokeWidth="1.5">
          <path d="M88 254 C39 225 29 192 31 165 C79 183 101 213 88 254Z" />
          <path d="M111 301 C58 292 37 267 27 238 C78 243 106 265 111 301Z" />
          <path d="M130 354 C86 386 54 382 28 366 C65 332 99 331 130 354Z" />
          <path d="M169 196 C139 147 149 114 170 91 C198 137 194 170 169 196Z" />
          <path d="M209 178 C193 126 211 97 237 80 C252 132 237 164 209 178Z" />
          <path d="M676 560 C725 589 735 622 733 649 C685 631 663 601 676 560Z" />
          <path d="M653 513 C706 522 727 547 737 576 C686 571 658 549 653 513Z" />
          <path d="M634 460 C678 428 710 432 736 448 C699 482 665 483 634 460Z" />
          <path d="M595 618 C625 667 615 700 594 723 C566 677 570 644 595 618Z" />
          <path d="M555 636 C571 688 553 717 527 734 C512 682 527 650 555 636Z" />
        </g>
        <g fill="none" stroke="#b89c70" strokeWidth="2" strokeLinecap="round">
          <path d="M51 391 C75 437 76 473 67 509 M78 381 C104 428 106 463 98 493 M108 367 C135 410 139 447 132 478" />
          <path d="M713 423 C689 377 688 341 697 305 M686 433 C660 386 658 351 666 321 M656 447 C629 404 625 367 632 336" />
          <path d="M134 177 C167 151 200 143 235 148 M535 666 C568 692 601 700 636 695" />
        </g>
        {/* Upper-left and lower-right bouquets frame the initials, as in the reference. */}
        <Flower x={126} y={285} scale={1.75} />
        <Flower x={192} y={211} scale={1.02} />
        <Flower x={630} y={568} scale={1.72} />
        <Flower x={565} y={630} scale={1.02} />
        <g fill="#d9b889">
          {Array.from({length:18},(_,i)=><circle key={i} cx={70+(i%6)*22} cy={145+Math.floor(i/6)*18} r={i%3===0?3:2}/>)}
          {Array.from({length:18},(_,i)=><circle key={i} cx={575+(i%6)*22} cy={660+Math.floor(i/6)*16} r={i%3===0?3:2}/>)}
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
