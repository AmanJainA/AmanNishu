import { Link } from 'react-router-dom';
import Preloader from '../components/Preloader';
import { asset } from '../utils/asset';
import { coupleTitle, dateLine } from '../data/wedding';

const memories = [
  {
    number: '01',
    eyebrow: 'THE BEGINNING',
    title: 'Our First Meeting',
    copy: 'A glance that started it all, amid laughter, music and moments we will always remember. Two paths crossed, and everything changed.',
    note: 'The beginning of us.',
  },
  {
    number: '02',
    eyebrow: 'A JOURNEY TO REMEMBER',
    title: 'Our First Trip — Varanasi',
    copy: 'A journey that turned miles into memories. Sunrise at the ghats, stories by the river, and the feeling that every road was bringing us closer.',
    note: 'Delhi to Varanasi · A lifetime of memories',
  },
  {
    number: '03',
    eyebrow: 'A LITTLE PLACE, A BIG MEMORY',
    title: 'Our First Café Date',
    copy: 'Two strangers, one table, and an easy conversation that felt like home. Steam, smiles and little silences that said everything.',
    note: 'The Tea Room',
  },
];

export default function Home() {
  return (
    <div className="page-wrapper royal-home">
      <Preloader />

      <header className="story-nav">
        <a className="story-brand" href="#top" aria-label="Aman and Nishu home">A <span>&</span> N</a>
        <nav aria-label="Wedding story navigation">
          <a href="#journey">Our Journey</a>
          <a href="#cultures">Our Cultures</a>
          <a href="#memories">Our Story</a>
          <a href="#save-date">Save the Date</a>
        </nav>
        <Link className="nav-invite" to="/card">The Invitation <span>↗</span></Link>
      </header>

      <main id="top">
        <section className="story-hero">
          <div className="hero-arch hero-arch-one" />
          <div className="hero-arch hero-arch-two" />
          <div className="hero-spark hero-spark-one">✦</div>
          <div className="hero-spark hero-spark-two">✧</div>
          <div className="story-hero-copy">
            <p className="story-kicker">A WEDDING STORY · 2027</p>
            <h1>Two Places,<br /><em>One Story.</em></h1>
            <p className="hero-subtitle">Rajasthan to Delhi — a journey of love, heritage<br className="desktop-break" /> and two hearts finding their way home.</p>
            <a className="gold-link" href="#journey">Discover our story <span>↓</span></a>
          </div>
          <div className="hero-couple-frame">
            <div className="hero-couple-halo" />
            <img src={asset('images/slider/hero-6.png')} alt="Aman and Nishu wedding illustration" />
            <span className="frame-caption">Aman <i>&</i> Nishu</span>
          </div>
          <div className="hero-bottom-note"><span>EST. IN LOVE</span><span>SCROLL TO EXPLORE ↓</span><span>FOREVER BEGINS HERE</span></div>
        </section>

        <section className="journey-section" id="journey">
          <div className="section-heading">
            <span className="section-eyebrow">A STORY THAT BRINGS US TOGETHER</span>
            <h2>From two beautiful worlds<br /><em>to one forever.</em></h2>
            <p>Different beginnings, shared dreams, and a journey that led us to each other.</p>
          </div>
          <div className="journey-route">
            <article className="place-card place-rajasthan">
              <div className="place-art place-art-rajasthan"><span className="place-sun" /><span className="place-dome">♜</span><span className="place-line" /></div>
              <div className="place-copy"><span>THE LAND OF ROYALTY</span><h3>Rajasthan</h3><p>Royal heritage, timeless traditions and a land of vibrant stories.</p><small>BIJAINAGAR · OUR ROOTS</small></div>
            </article>
            <div className="route-connector"><span className="route-line" /><span className="route-plane">✈</span><span className="route-label">A JOURNEY OF LOVE</span></div>
            <article className="place-card place-delhi">
              <div className="place-art place-art-delhi"><span className="place-sun" /><span className="place-gate">⌂</span><span className="place-line" /></div>
              <div className="place-copy"><span>THE CITY OF CONNECTIONS</span><h3>Delhi</h3><p>Modern energy, diverse spirit and a city that connects stories.</p><small>DELHI · OUR OTHER HALF</small></div>
            </article>
          </div>
        </section>

        <section className="culture-section" id="cultures">
          <div className="culture-ornament">✧</div>
          <span className="section-eyebrow">TWO CULTURES, ONE HEART</span>
          <h2>Rooted in tradition.<br /><em>United by love.</em></h2>
          <p>Two families, two cultures, countless traditions — coming together to celebrate one beautiful beginning.</p>
          <div className="culture-stats"><span><b>01</b> Rajasthan</span><i>✦</i><span><b>02</b> Delhi</span><i>✦</i><span><b>∞</b> Together</span></div>
        </section>

        <section className="couple-section">
          <div className="couple-image-wrap"><img src={asset('images/slider/hero-6.png')} alt="Aman and Nishu" /></div>
          <div className="couple-copy"><span className="section-eyebrow">THE NEXT CHAPTER</span><h2>{coupleTitle}<br /><em>Are Getting Married</em></h2><div className="tiny-divider">✦</div><p>Two hearts. One promise. A new chapter begins. We’re so happy to celebrate this journey with you.</p><Link to="/card" className="outline-link">Explore the celebrations <span>↗</span></Link></div>
        </section>

        <section className="memories-section" id="memories">
          <div className="section-heading">
            <span className="section-eyebrow">LITTLE MOMENTS, BIG MEMORIES</span>
            <h2>The story of <em>us.</em></h2>
            <p>Every love story is made of moments. These are a few of our favourites.</p>
          </div>
          <div className="memory-list">
            {memories.map((memory, index) => (
              <article className={`memory-card memory-card-${index + 1}`} key={memory.number}>
                <div className="memory-art"><span className="memory-number">{memory.number}</span><span className="memory-symbol">{index === 0 ? '♡' : index === 1 ? '✈' : '☕'}</span><span className="memory-orbit" /></div>
                <div className="memory-copy"><span className="section-eyebrow">{memory.eyebrow}</span><h3>{memory.title}</h3><p>{memory.copy}</p><small>{memory.note}</small></div>
              </article>
            ))}
          </div>
        </section>

        <section className="save-date-section" id="save-date">
          <div className="save-date-frame">
            <span className="save-date-flower">✿</span>
            <span className="section-eyebrow">WITH THE BLESSINGS OF OUR FAMILIES</span>
            <h2>Save <em>the Date</em></h2>
            <p className="save-date-names">{coupleTitle}</p>
            <div className="save-date-rule"><span>✦</span></div>
            <p className="save-date-detail">8 — 10 FEBRUARY 2027</p>
            <p className="save-date-place">Bijainagar · Rajasthan</p>
            <p className="save-date-note">We can’t wait to celebrate with you.</p>
            <div className="save-date-actions"><Link to="/card">View Invitation Card</Link><Link to="/arrangement">Stay Arrangement</Link></div>
          </div>
        </section>
      </main>

      <footer className="story-footer"><a className="story-brand" href="#top">A <span>&</span> N</a><p>Made with love, for a lifetime of memories.</p><span>AMAN & NISHU · 2027</span></footer>
    </div>
  );
}
