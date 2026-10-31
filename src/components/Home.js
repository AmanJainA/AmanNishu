
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="page-wrapper">
      <section
        className="wpo-invitation-area-s2"
        aria-label="Wedding invitation"
        style={{
          backgroundImage: "url('/assets/images/slider/invitation-bg2.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
      >
        <div className="hero-container">
          <div className="hero-inner">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-12">

                  <div className="wpo-event-wrap">

                    {/* Invitation Content */}
                    <div className="wpo-event-item">
                      <div className="wpo-event-text">

                        <h1>Manasvi &amp; Spandan</h1>

                        <p>
                          AT JAIPUR, ON 2nd - 4th, DECEMBER 2023.
                        </p>

                        {/* Decorative Shape */}
                        <div className="inner-shape">
                          <img
                            src="/assets/images/slider/shape15.svg"
                            alt=""
                            aria-hidden="true"
                          />
                        </div>

                        {/* Invitation Details */}
                        <ul>
                          <li>
                            You are cordially invited to
                            <br />
                            attend the marriage celebration.
                          </li>

                          <li>
                            To ensure a comfortable stay during the
                            celebrations, please provide us with your
                            itinerary details.
                          </li>

                          <li className="invitation-links">
                            <Link
                              to="/arrangement"
                              className="blink-style"
                            >
                              Stay Arrangement
                            </Link>

                            <Link to="/card" className="blink-style">
  View Invitation Card
</Link>
                          </li>
                        </ul>

                      </div>

                      {/* Corner Decorations */}
                      <div className="shape-1">
                        <img
                          src="/assets/images/slider/corner1.svg"
                          alt=""
                          aria-hidden="true"
                        />
                      </div>

                      <div className="shape-2">
                        <img
                          src="/assets/images/slider/corner2.svg"
                          alt=""
                          aria-hidden="true"
                        />
                      </div>

                      <div className="shape-3">
                        <img
                          src="/assets/images/slider/corner3.svg"
                          alt=""
                          aria-hidden="true"
                        />
                      </div>

                      <div className="shape-4">
                        <img
                          src="/assets/images/slider/corner4.svg"
                          alt=""
                          aria-hidden="true"
                        />
                      </div>

                    </div>

                    {/* Frame Decorations */}
                    <div className="frame-shape-1">
                      <img
                        src="/assets/images/slider/shape13.svg"
                        alt=""
                        aria-hidden="true"
                      />
                    </div>

                    <div className="frame-shape-2">
                      <img
                        src="/assets/images/slider/shape14.svg"
                        alt=""
                        aria-hidden="true"
                      />
                    </div>

                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
