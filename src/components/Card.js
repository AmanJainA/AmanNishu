
import React from "react";
import "./Card.css";

const weddingEvents = [
  {
    date: "02 Dec, 2023",
    title: "Mayra",
    time: "At 6:00 pm",
    location:
      "Akshat Community Hall, Akshat Kanota Estate, Nayla Road Kanota, Jaipur.",
    image: "/assets/images/story/53.png",
    duration: "1000ms",
  },
  {
    date: "03 Dec, 2023",
    title: "Haldi & Mehendi",
    time: "At 11:00 am",
    location: "Heavens Garden, Lotus Lawn, Agra Jaipur Road, Jaipur.",
    image: "/assets/images/story/8.png",
    duration: "1200ms",
  },
  {
    date: "03 Dec, 2023",
    title: "Engagement & Sangeet",
    time: "At 6:00 pm",
    location: "Heavens Garden, Lotus Lawn, Agra Jaipur Road, Jaipur.",
    image: "/assets/images/story/4.png",
    duration: "1400ms",
  },
  {
    date: "04 Dec, 2023",
    title: "Baraat",
    time: "At 6:00 pm",
    location: "Chandra Mahal Marriage Garden, Agra Jaipur Road, Jaipur.",
    image: "/assets/images/story/7.png",
    duration: "1000ms",
  },
  {
    date: "04 Dec, 2023",
    title: "Reception Dinner",
    time: "At 7:30 pm",
    location: "Chandra Mahal Marriage Garden, Agra Jaipur Road, Jaipur.",
    image: "/assets/images/story/5.png",
    duration: "1200ms",
  },
  {
    date: "04 Dec, 2023",
    title: "Rituals",
    time: "At 10:45 pm",
    location: "Chandra Mahal Marriage Garden, Agra Jaipur Road, Jaipur.",
    image: "/assets/images/story/6.png",
    duration: "1400ms",
  },
];

const Card = () => {
  return (
    <main className="page-wrapper">

      {/* Preloader */}
      <div className="preloader">
        <div className="vertical-centered-box">
          <div className="content">
            <div className="loader-circle"></div>
            <div className="loader-line-mask">
              <div className="loader-line"></div>
            </div>
            <img src="/assets/images/preloader.gif" alt="" />
          </div>
        </div>
      </div>

      {/* Wedding Hero Section */}
      <section className="static-hero-s5">
        <div className="hero-container">
          <div className="hero-inner">
            <div className="container-fluid">
              <div className="hero-inner-wrap">
                <div className="row align-items-center">

                  <div className="col col-xl-6 col-lg-6 col-12">
                    <div className="wpo-static-hero-inner">

                      <div
                        className="slide-title wow fadeInUp"
                        data-wow-duration="1500ms"
                      >
                        <h2>Manasvi &amp; Spandan</h2>
                      </div>

                      <div
                        className="slide-text wow fadeInUp"
                        data-wow-duration="1600ms"
                        data-swiper-parallax="400"
                      >
                        <p>AT JAIPUR, ON 2nd - 4th, DECEMBER 2023.</p>
                      </div>

                      <span
                        className="shape wow fadeInUp"
                        data-wow-duration="1400ms"
                      >
                        <img
                          src="/assets/images/slider/date-shape.png"
                          alt=""
                        />
                      </span>

                      <div
                        className="wpo-wedding-date wow fadeInUp"
                        data-wow-duration="1700ms"
                      >
                        <div className="clock-grids">
                          <div id="clock"></div>
                        </div>
                      </div>

                      <div className="clearfix"></div>
                    </div>
                  </div>

                  <div className="col col-xl-6 col-lg-6 col-12">
                    <div className="wpo-hero-img text-center">
                      <img
                        src="/assets/images/slider/hero-6.png"
                        alt="Manasvi and Spandan"
                      />
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          <div className="shape-frame">
            <img src="/assets/images/slider/frame.png" alt="" />
          </div>
        </div>
      </section>

      {/* Wedding Events Section */}
      <section
        className="wpo-story-section-s6 section-padding"
        id="story"
      >
        <div className="container">

          <div className="wpo-section-title"></div>

          <div className="wpo-story-wrap">
            <div className="row">

              {weddingEvents.map((event, index) => (
                <div
                  className="col col-lg-4 col-md-12 col-12"
                  key={event.title}
                >
                  <div
                    className="wpo-story-item wow fadeInUp wedding-event-card"
                    data-wow-duration={event.duration}
                  >

                    <div className="wpo-story-img">
                      <div className="wpo-story-img-inner">
                        <img
                          src={event.image}
                          alt={event.title}
                        />
                      </div>

                      <div className="flower-shape">
                        <img
                          src="/assets/images/story/story-shape.png"
                          alt=""
                        />
                      </div>
                    </div>

                    <div className="wpo-story-content">
                      <span>{event.date}</span>
                      <h2>{event.title}</h2>
                      <p>{event.time}</p>
                      <p>{event.location}</p>
                    </div>

                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      </section>

      {/* Wedding Video Section */}
      <section className="wpo-video-section p-0">
        <h2 className="hidden">Wedding Video</h2>

        <div className="container">
          <div className="row wow fadeInUp">

            <div className="col col-lg-4 col-md-12 col-12">
              <div className="video-wrap">
                <div className="video-thumbnail">

                  <video
                    id="ForcePlay"
                    width="100%"
                    height="100%"
                    loop
                    playsInline
                    controls
                    preload="metadata"
                    poster="/assets/images/wedding.jpeg"
                  >
                    <source
                      src="/video/wedding.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support HTML video.
                  </video>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Wedding Footer */}
      <footer className="wpo-site-footer-s2">

        <div className="wpo-upper-footer">
          <div className="container">
            <div className="row align-items-center">

              <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="widget about-widget">
                  <p>
                    We can’t wait to see all of our beloved friends
                    and relatives at wedding.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="ft-shape-1">
          <img src="/assets/images/footer-shape-1.svg" alt="" />
        </div>

        <div className="ft-shape-2">
          <img src="/assets/images/footer-shape-2.svg" alt="" />
        </div>

      </footer>

    </main>
  );
};

export default Card;
