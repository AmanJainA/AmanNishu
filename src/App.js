import React, { useState } from "react";
import "./App.css";

const navigation = [
  { label: "Home", href: "#home" },
  { label: "Our story", href: "#couple" },
  { label: "The celebration", href: "#celebration" },
];

function FloralMark({ className = "" }) {
  return (
    <span className={`floral-mark ${className}`} aria-hidden="true">
      <span>✳</span>
      <i />
      <span>✳</span>
    </span>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#home" onClick={closeMenu} aria-label="Aman and Nishu, home">
          <span className="brand-monogram">A<span>&</span>N</span>
          <span className="brand-caption">A celebration of love</span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>

        <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Main navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>{item.label}</a>
          ))}
          <a className="nav-cta" href="#celebration" onClick={closeMenu}>Wedding details <span>↗</span></a>
        </nav>
      </header>

      <section className="hero" id="home">
        <div className="hero-grain" aria-hidden="true" />
        <div className="hero-inner">
          <p className="eyebrow"><span /> A new chapter begins <span /></p>
          <h1>
            Two hearts.<br />
            <em>One beautiful</em><br />
            forever.
          </h1>
          <div className="hero-names">
            <span>Aman</span>
            <span className="ampersand">&</span>
            <span>Nishu</span>
          </div>
          <p className="hero-description">
            With the love of our families, we invite you to be part of our
            wedding celebration.
          </p>
          <a className="primary-button" href="#couple">Discover our celebration <span>↓</span></a>
        </div>
        <div className="hero-side-note">MADE WITH LOVE · SHARED WITH JOY</div>
        <div className="hero-bottom">
          <span>THE GROOM <b>AMAN</b></span>
          <FloralMark />
          <span>THE BRIDE <b>NISHU</b></span>
        </div>
      </section>

      <section className="welcome-section section-pad" id="couple">
        <div className="section-kicker">A little about us</div>
        <FloralMark className="welcome-flower" />
        <h2>And so, our <em>forever</em> begins.</h2>
        <p className="welcome-copy">
          Some moments become memories. Some people become home.
          We found both in each other, and now we can’t wait to begin
          this beautiful journey together.
        </p>
        <div className="couple-grid">
          <article className="person-card groom-card">
            <span className="person-role">THE GROOM</span>
            <h3>Aman</h3>
            <p>With a heart full of dreams, stepping into a lifetime of togetherness.</p>
            <span className="person-initial">A</span>
          </article>
          <div className="couple-heart" aria-label="Together">♥</div>
          <article className="person-card bride-card">
            <span className="person-role">THE BRIDE</span>
            <h3>Nishu</h3>
            <p>With love, laughter and a little magic, ready for the next chapter.</p>
            <span className="person-initial">N</span>
          </article>
        </div>
      </section>

      <section className="invitation-band">
        <div className="invitation-inner">
          <span className="invitation-ornament">❧</span>
          <p className="section-kicker">Together with our families</p>
          <h2>We joyfully invite you<br />to celebrate our wedding.</h2>
          <p>Your presence and blessings will make our special moments even more meaningful.</p>
          <a href="#celebration" className="text-link">View wedding details <span>→</span></a>
        </div>
      </section>

      <section className="celebration-section section-pad" id="celebration">
        <div className="section-kicker">The celebration</div>
        <h2>Save a little <em>space</em> for joy.</h2>
        <p className="celebration-intro">
          We are looking forward to celebrating this special beginning with
          the people who mean the most to us.
        </p>
        <div className="details-card">
          <div className="details-icon" aria-hidden="true">✧</div>
          <div>
            <span className="details-label">WEDDING DATE & VENUE</span>
            <h3>Details coming soon</h3>
            <p>We’ll share the celebration schedule and venue information here. Please visit again for updates.</p>
          </div>
          <span className="details-sparkle" aria-hidden="true">✳</span>
        </div>
      </section>

      <footer className="site-footer">
        <FloralMark />
        <p>With love,</p>
        <div className="footer-names">Aman <span>&</span> Nishu</div>
        <span className="footer-note">A JOURNEY OF LOVE · A LIFETIME OF TOGETHERNESS</span>
        <a href="#home" className="back-top" aria-label="Back to top">↑</a>
      </footer>
    </main>
  );
}

export default App;
