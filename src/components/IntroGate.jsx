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
      <g className="gate-orbiting-art">
        <circle cx="382" cy="407" r="270" fill="none" stroke="#c98739" strokeWidth="2.5" />
        <circle cx="382" cy="407" r="273" fill="none" stroke="#e9bd78" strokeWidth="2" />
        <g fill="none" stroke="#b9a17b" strokeWidth="2" strokeLinecap="round">
          <path d="M118 300 C80 225 115 174 181 155 C222 143 259 153 290 174" />
          <path d="M646 520 C682 587 645 650 584 675 C535 694 481 680 444 652" />
        </g>
        <g fill="#9b9b7b" stroke="#81866c" strokeWidth="1.2">
          <path d="M75 310 C34 283 23 260 20 237 C59 245 80 268 75 310Z" />
          <path d="M100 353 C54 347 35 329 23 305 C65 303 91 321 100 353Z" />
          <path d="M135 390 C104 424 78 426 51 415 C74 382 105 376 135 390Z" />
          <path d="M677 552 C718 526 740 531 757 547 C724 574 696 575 677 552Z" />
          <path d="M650 608 C697 610 719 628 730 653 C686 660 660 640 650 608Z" />
          <path d="M609 647 C634 687 627 711 608 732 C581 695 585 667 609 647Z" />
        </g>
        <g fill="none" stroke="#b6a17e" strokeWidth="2" strokeLinecap="round">
          <path d="M65 430 C83 465 82 500 71 531 M89 421 C105 466 108 489 102 515 M121 410 C137 450 137 480 130 503" />
          <path d="M690 430 C675 468 681 495 696 525 M661 448 C645 483 646 510 656 536 M630 467 C613 500 615 527 626 550" />
        </g>
        <Flower x={133} y={292} scale={1.18} />
        <Flower x={188} y={218} scale={0.68} />
        <Flower x={630} y={574} scale={1.12} />
        <Flower x={574} y={632} scale={0.68} />
        <g fill="#d9b889">
          <circle cx="54" cy="195" r="4"/><circle cx="75" cy="178" r="3"/><circle cx="98" cy="164" r="3"/>
          <circle cx="708" cy="390" r="4"/><circle cx="725" cy="413" r="3"/><circle cx="738" cy="438" r="3"/>
        </g>
      </g>
    </svg>
  );
}

function RajasthanArt() {
  return (
    <svg viewBox="0 0 420 420" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="2.2" opacity=".72">
        <path d="M54 330V178h32v-48h24v48h28v-75h28v75h26v-48h24v48h34v152M38 330h250M68 178h194M106 130h24m50-27h24" />
        <path d="M72 330v-65h34v65m34 0v-88h42v88m38 0v-65h34v65" />
        <path d="M88 130q34-42 68 0m-20-42q20-32 40 0m34 42q25-37 50 0" />
        <path d="M300 330q-15-50 18-78q18-14 35 0q28 28 11 78m-48-42h42m-35-18q20 16 39 0" />
        <path d="M300 252l-12-30m63 30l16-30m-58 108l-10 20m43-20l12 20" />
      </g>
      <g fill="currentColor" opacity=".7"><circle cx="102" cy="208" r="5"/><circle cx="205" cy="208" r="5"/><circle cx="151" cy="154" r="5"/></g>
    </svg>
  );
}

function DelhiArt() {
  return (
    <svg viewBox="0 0 420 420" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="2.2" opacity=".72" strokeLinecap="round" strokeLinejoin="round">
        <path d="M65 330h290M90 330V220q0-96 120-150q120 54 120 150v110M118 330V224q0-72 92-116q92 44 92 116v106" />
        <path d="M164 330v-75q0-46 46-46t46 46v75M180 330v-72q0-30 30-30t30 30v72" />
        <path d="M120 222h184M140 180h160M170 145h100M190 104h60" />
        <path d="M210 54V25m-12 18h24M50 330V220m-10 110h30m-20-110h10M370 330V220m-10 110h30m-20-110h10" />
        <path d="M35 350h350M85 365h250" />
      </g>
      <g fill="currentColor" opacity=".7"><circle cx="210" cy="92" r="5"/><circle cx="145" cy="198" r="4"/><circle cx="275" cy="198" r="4"/></g>
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
        <div className="gate-rajasthan-collage" aria-label="Rajasthan landmarks collage">
          <img className="rajasthan-tile tile-amer" src="https://rajasthanstourism.com/images/tour-images/jaipur/amer-fort-jaipur.webp" alt="Amer Fort, Jaipur" />
          <img className="rajasthan-tile tile-hawa" src="https://rajasthanstourism.com/images/tour-images/jaipur/hawa-mahal-jaipur.webp" alt="Hawa Mahal, Jaipur" />
          <img className="rajasthan-tile tile-jal" src="https://rajasthanstourism.com/images/tour-images/jaipur/Jpr-jalmahal1.webp" alt="Jal Mahal, Jaipur" />
          <img className="rajasthan-tile tile-udaipur" src="https://rajasthanstourism.com/images/tour-images/udaipur/city-palace-udaipur.webp" alt="City Palace, Udaipur" />
          <img className="rajasthan-tile tile-jaisalmer" src="https://rajasthanstourism.com/images/tour-images/Jaisalmer/Jaisalmer-Sonar-Fort-Day-View.webp" alt="Jaisalmer Fort" />
          <img className="rajasthan-tile tile-ajmer" src="https://commons.wikimedia.org/wiki/Special:FilePath/Ajmer_dargah_sharif.jpg" alt="Ajmer Sharif Dargah" />
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
          <span className="gate-stamp-rim" aria-hidden="true" />
          <span className="gate-stamp-inner" aria-hidden="true" />
          <FloralEmblem />
          <span className="gate-monogram-fixed" aria-hidden="true">
            <span className="gate-letter-a">A</span>
            <span className="gate-ampersand">&amp;</span>
            <span className="gate-letter-n">N</span>
          </span>
          <span className="gate-stamp-caption">TWO PLACES, ONE STORY</span>
        </button>
      </div>
      <div className="gate-bottom-note">RAJASTHAN <i>✦</i> DELHI <i>✦</i> TOGETHER, FOREVER</div>
    </div>
  );
}
