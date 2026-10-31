import { Link } from 'react-router-dom';
import Preloader from '../components/Preloader';
import { asset } from '../utils/asset';
import { coupleTitle, dateLine } from '../data/wedding';

export default function Home() {
  return (
    <div className="page-wrapper">
      <Preloader />
      <section
        className="wpo-invitation-area-s2"
        style={{
          background: `url(${asset('images/slider/invitation-bg2.jpg')}) no-repeat center center`,
          backgroundSize: 'cover',
        }}
      >
        <div className="hero-container">
          <div className="hero-inner">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-12">
                  <div className="wpo-event-wrap">
                    <div className="wpo-event-item">
                      <div className="wpo-event-text">
                        <h2>{coupleTitle}</h2>
                        <p>{dateLine}</p>
                        <div className="inner-shape">
                          <img src={asset('images/slider/shape15.svg')} alt="" />
                        </div>
                        <ul>
                          <li>
                            You are cordially invited to <br />
                            attend the marriage celebration
                          </li>
                          <li>
                            To ensure a comfortable stay during the celebrations, please provide us
                            with your itinerary details.
                          </li>
                          <li>
                            <Link to="/arrangement" className="blink-style">Stay Arrangement</Link>
                            &nbsp;&nbsp;&nbsp;
                            <Link to="/card" className="blink-style">View Invitation Card</Link>
                          </li>
                        </ul>
                      </div>
                      {[1, 2, 3, 4].map((n) => (
                        <div className={`shape-${n}`} key={n}>
                          <img src={asset(`images/slider/corner${n}.svg`)} alt="" />
                        </div>
                      ))}
                    </div>
                    <div className="frame-shape-1"><img src={asset('images/slider/shape13.svg')} alt="" /></div>
                    <div className="frame-shape-2"><img src={asset('images/slider/shape14.svg')} alt="" /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
