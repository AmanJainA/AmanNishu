import { useEffect, useState } from 'react';
import StayForm from '../components/StayForm';
import Preloader from '../components/Preloader';
import Reveal from '../components/Reveal';
import Countdown from '../components/Countdown';
import { asset, publicUrl } from '../utils/asset';
import { COUNTDOWN_TARGET, coupleTitle, dateLine } from '../data/wedding';
import { adminRequest } from '../services/adminApi';

const DURATIONS = [1000, 1200, 1400];

const formatEventDate = (value) => {
  if (!value) return '';
  const [year, month, day] = String(value).slice(0, 10).split('-').map(Number);
  if (!year || !month || !day) return value;
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(year, month - 1, day));
};

const resolveEventImage = (value) => {
  if (!value) return '';
  if (/^(https?:)?\/\//i.test(value) || value.startsWith('data:')) return value;
  return publicUrl(value.replace(/^\/+/, ''));
};

export default function Card() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const fetchCards = async () => {
      try {
        setLoading(true);
        setError('');
        // This is a public read action; do not send the Admin session token.
        const data = await adminRequest('public-cards', {}, false);
        const cards = (data.rows || []).map((card) => ({
          id: card.id,
          title: card.function_name,
          date: formatEventDate(card.date),
          time: card.timing || '',
          venue: card.venue_name || '',
          image: resolveEventImage(card.url),
        }));

        if (isMounted) setEvents(cards);
      } catch (err) {
        if (isMounted) setError(err.message || 'Unable to load wedding events.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCards();
    return () => {
      isMounted = false;
    };
  }, []);

  const rows = Array.from(
    { length: Math.ceil(events.length / 3) },
    (_, index) => events.slice(index * 3, index * 3 + 3)
  );

  return (
    <div className="page-wrapper">
      <Preloader />

      <section className="static-hero-s5">
        <div className="hero-container">
          <div className="hero-inner">
            <div className="container-fluid">
              <div className="hero-inner-wrap">
                <div className="row align-items-center">
                  <div className="col col-xl-6 col-lg-6 col-12">
                    <div className="wpo-static-hero-inner">
                      <Reveal className="slide-title" duration={1500}>
                        <h2>{coupleTitle}</h2>
                      </Reveal>
                      <Reveal className="slide-text" duration={1600}>
                        <p>{dateLine}</p>
                      </Reveal>
                      <Reveal as="span" className="shape" duration={1400}>
                        <img src={asset('images/slider/date-shape.png')} alt="" />
                      </Reveal>
                      <Reveal className="wpo-wedding-date" duration={1700}>
                        <div className="clock-grids">
                          <Countdown target={COUNTDOWN_TARGET} />
                        </div>
                      </Reveal>
                      <div className="clearfix"></div>
                    </div>
                  </div>
                  <div className="col col-xl-6 col-lg-6 col-12">
                    <div className="wpo-hero-img text-center">
                      <img src={asset('images/slider/hero-6.png')} alt="The couple, Aman and Nishu" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="shape-frame">
            <img src={asset('images/slider/frame.png')} alt="" />
          </div>
        </div>
      </section>

      <section className="wpo-story-section-s6 section-padding" id="story">
        <div className="container">
          <div className="wpo-section-title"></div>
          <div className="wpo-story-wrap">
            {loading && <p className="text-center">Loading wedding events...</p>}
            {!loading && error && <p className="text-center" role="alert">{error}</p>}
            {!loading && !error && events.length === 0 && (
              <p className="text-center">Wedding event details will be updated soon.</p>
            )}
            {rows.map((row, r) => (
              <div className="row" key={r}>
                {row.map((ev, i) => (
                  <div className="col col-lg-4 col-md-12 col-12 mb-3" key={ev.id}>
                    <Reveal
                      className="wpo-story-item"
                      duration={DURATIONS[i % DURATIONS.length]}
                      style={{ boxShadow: '5px 5px 15px rgba(0,0,0,.3)', padding: '15px 0px' }}
                    >
                      <div className="wpo-story-img">
                        <div className="wpo-story-img-inner">
                          {ev.image && <img src={ev.image} alt={ev.title} />}
                        </div>
                        <div className="flower-shape">
                          <img src={asset('images/story/story-shape.png')} alt="" />
                        </div>
                      </div>
                      <div className="wpo-story-content">
                        <span>{ev.date}</span>
                        <h2>{ev.title}</h2>
                        <p>{ev.time}</p>
                        <p>{ev.venue}</p>
                      </div>
                    </Reveal>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="our-beginning-section" id="our-beginning">
        <div className="our-beginning-inner">
          <header className="our-beginning-cover">
            <span className="our-beginning-kicker">A STORY WRITTEN IN THE STARS</span>
            <div className="story-cover-monogram"><span>A</span><i>&amp;</i><span>N</span></div>
            <h2>Together, Forever</h2>
            <p>A journey of two hearts</p>
            <span className="story-cover-rule"></span>
          </header>

          <article className="story-slide story-slide-origin">
            <div className="story-slide-copy">
              <span className="story-slide-number">01 / OUR BEGINNING</span>
              <h3>Two Homes,<br/><em>Two Cultures</em></h3>
              <p>Across states and traditions<br/>Our journey begins<br/>One love connects it all</p>
              <div className="story-city-list"><span>Jaipur, Rajasthan</span><span>Bijainagar</span><span>Delhi</span></div>
            </div>
            <div className="story-slide-art story-origin-art">
              <img src={asset('images/story/4.png')} alt="A memory from our beginning" loading="lazy"/>
              <span className="story-art-caption">Different roots. One beautiful story.</span>
            </div>
          </article>

          <article className="story-slide story-slide-meeting">
            <div className="story-slide-art story-meeting-art">
              <img src={asset('images/story/5.png')} alt="The wedding where our story began" loading="lazy"/>
            </div>
            <div className="story-slide-copy">
              <span className="story-slide-number">02 / THE FIRST CHAPTER</span>
              <h3>Our story began<br/><em>at a wedding...</em></h3>
              <p>One celebration, one special meeting, and the beginning of a forever we never knew was waiting for us.</p>
            </div>
          </article>

          <article className="story-slide story-slide-journey">
            <div className="story-slide-copy">
              <span className="story-slide-number">03 / MILES &amp; MEMORIES</span>
              <h3>Our first journey together —<br/><em>Delhi to Banaras</em></h3>
              <p>Different places, same heartbeat<br/>Miles that brought us closer<br/>A chapter that began on the same track<br/>To many more journeys ahead</p>
              <div className="story-route"><span>DELHI</span><i></i><span>BANARAS</span></div>
            </div>
            <div className="story-slide-art story-travel-art">
              <img src={asset('images/story/53.png')} alt="A memory from our Delhi to Banaras journey" loading="lazy"/>
            </div>
          </article>

          <article className="story-slide story-slide-cafe">
            <div className="story-slide-art story-cafe-art">
              <img src={asset('images/story/6.png')} alt="Our first café memory" loading="lazy"/>
            </div>
            <div className="story-slide-copy">
              <span className="story-slide-number">04 / LITTLE THINGS, BIG MEMORIES</span>
              <h3>Our first café,<br/><em>a thousand little memories</em></h3>
              <p>Small moments that became our favourite memories. And a thousand more still waiting to be made.</p>
            </div>
          </article>

          <footer className="story-slide-ending">
            <span className="story-slide-number">05 / THE NEXT CHAPTER</span>
            <div className="story-ending-monogram">A <i>&amp;</i> N</div>
            <h3>Aman <em>&amp;</em> Nishu</h3>
            <p>Are getting married</p>
            <span className="story-ending-rule"></span>
            <span className="story-ending-save">Save the date</span>
            <strong>Aman &amp; Nishu</strong>
            <span className="story-ending-date">{dateLine}</span>
            <span className="story-ending-note">We can’t wait to celebrate with you</span>
          </footer>
        </div>
      </section>

      <section className="wpo-video-section p-0 invitation-video-section" aria-label="Wedding video">
        <div className="container-fluid p-0">
          <div className="invitation-video-frame">
            <video controls playsInline preload="metadata" poster={asset('images/wedding.jpeg')}>
              <source src={publicUrl('video/wedding.mp4')} type="video/mp4" />
              Your browser does not support the wedding video.
            </video>
          </div>
        </div>
      </section>

      <section className="invitation-stay-section section-padding" id="stay-arrangement">
        <div className="container">
          <div className="invitation-stay-heading text-center">
            <span>YOUR COMFORT IS OUR PRIORITY</span>
            <h2>Stay Arrangement</h2>
            <p>We would be delighted to help arrange your stay during the wedding celebrations.</p>
          </div>
          <div className="invitation-stay-form">
            <StayForm mode="new" />
          </div>
        </div>
      </section>

      <footer className="wpo-site-footer-s2 invitation-card-footer">
        <div className="container text-center">
          <div className="invitation-footer-monogram">A <span>&amp;</span> N</div>
          <p>With love and blessings,</p>
          <h3>Aman &amp; Nishu</h3>
          <span>We look forward to celebrating with you</span>
        </div>
      </footer>

    </div>
  );
}
