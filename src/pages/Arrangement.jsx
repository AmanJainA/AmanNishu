import Preloader from '../components/Preloader';
import StayForm from '../components/StayForm';
import { asset } from '../utils/asset';

// Used for both /arrangement (mode="new") and /edit-arrangement (mode="edit").
export default function Arrangement({ mode = 'new' }) {
  return (
    <div className="page-wrapper">
      <Preloader />
      <section
        className="wpo-contact-section-s4 section-padding"
        id="rsvp"
        style={{ background: `url(${asset('images/rsvp/bg2.jpg')}) no-repeat`, backgroundSize: 'cover' }}
      >
        <div className="wpo-contact-section-inner">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col col-xl-5 col-lg-5 col-md-12 col-12">
                <div className="wpo-contact-section-wrapper">
                  <StayForm mode={mode} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
