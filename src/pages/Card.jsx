import { useEffect, useState } from 'react';
import Preloader from '../components/Preloader';
import { adminRequest } from '../services/adminApi';
import Reveal from '../components/Reveal';
import Countdown from '../components/Countdown';
import { asset, publicUrl } from '../utils/asset';
import { COUNTDOWN_TARGET, coupleTitle, dateLine, events } from '../data/wedding';

const DURATIONS = [1000, 1200, 1400];

const dateKey = (value) => {
  if (!value) return '9999-12-31';
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? String(value) : parsed.toISOString().slice(0, 10);
};

const timeKey = (value) => {
  if (!value) return Number.MAX_SAFE_INTEGER;
  const match = String(value).toLowerCase().match(/(\\d{1,2})(?:[:.](\\d{2}))?\\s*(am|pm)?/);
  if (!match) return Number.MAX_SAFE_INTEGER;
  let hours = Number(match[1]) % 12;
  const minutes = Number(match[2] || 0);
  if (match[3] === 'pm') hours += 12;
  return hours * 60 + minutes;
};

const formatDate = (value) => {
  if (!value) return 'Date to be announced';
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime())
    ? value
    : parsed.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
};

export default function Card() {
  const [cardEvents, setCardEvents] = useState(events);
  useEffect(() => {
    adminRequest('public-cards', {}, false)
      .then(({ rows = [] }) => setCardEvents(rows.map((row) => ({
        title: row.function_name,
        time: row.timing || '',
        venue: row.venue_name || '',
        date: row.date ? new Date(row.date + 'T00:00:00').toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '',
        image: row.url || '',
      }))))
      .catch(() => setCardEvents(events));
  }, []);
  const sortedEvents = [...cardEvents].sort((a, b) =>
    dateKey(a.date).localeCompare(dateKey(b.date)) || timeKey(a.time) - timeKey(b.time)
  );
  const groupedEvents = sortedEvents.reduce((groups, event) => {
    const key = dateKey(event.date);
    const existing = groups.find((group) => group.key === key);
    if (existing) existing.events.push(event);
    else groups.push({ key, label: formatDate(event.date), events: [event] });
    return groups;
  }, []);
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
            {groupedEvents.map((group) => (
              <div className="wpo-event-date-group" key={group.key} style={{ marginBottom: '42px' }}>
                <div className="wpo-section-title" style={{ marginBottom: '24px' }}>
                  <span style={{ color: '#a17b49', letterSpacing: '2px', fontSize: '12px' }}>WEDDING CELEBRATIONS</span>
                  <h2 style={{ marginTop: '8px' }}>{group.label}</h2>
                </div>
                <div className="row">
                  {group.events.map((ev, i) => (
                    <div className="col col-lg-4 col-md-6 col-12" key={ev.id || `${ev.title}-${ev.time}-${i}`}>
                      <Reveal
                        className="wpo-story-item"
                        duration={DURATIONS[i % DURATIONS.length]}
                        style={{ boxShadow: '5px 5px 15px rgba(0,0,0,.3)', padding: '15px 0px' }}
                      >
                        <div className="wpo-story-img">
                          <div className="wpo-story-img-inner">
                            <img src={ev.image} alt={ev.title} />
                          </div>
                          <div className="flower-shape">
                            <img src={asset('images/story/story-shape.png')} alt="" />
                          </div>
                        </div>
                        <div className="wpo-story-content">
                          <span>{ev.date || group.label}</span>
                          <h2>{ev.title}</h2>
                          <p>{ev.time}</p>
                          <p>{ev.venue}</p>
                        </div>
                      </Reveal>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wpo-video-section p-0">
        <h2 className="hidden">Wedding video</h2>
        <div className="container">
          <Reveal className="row" animation="fadeInUp">
            <div className="col col-lg-4 col-md-12 col-12">
              <div className="video-wrap">
                <div className="video-thumbnail">
                  <video
                    width="100%" height="100%" loop playsInline controls preload="metadata"
                    poster={asset('images/wedding.jpeg')}
                  >
                    <source src={publicUrl('video/wedding.mp4')} type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="wpo-site-footer-s2">
        <div className="wpo-upper-footer">
          <div className="container">
            <div className="row align-items-center">
              <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="widget about-widget">
                  <p>We can’t wait to see all of our beloved friends and relatives at wedding.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ft-shape-1"><img src={asset('images/footer-shape-1.svg')} alt="" /></div>
        <div className="ft-shape-2"><img src={asset('images/footer-shape-2.svg')} alt="" /></div>
      </footer>
    </div>
  );
}
