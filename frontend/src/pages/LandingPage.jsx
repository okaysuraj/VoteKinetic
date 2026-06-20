import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="section hero-section">
        <div className="hero-bg-gradient"></div>
        <div className="container grid-12">
          <div className="hero-title">
            <h1 className="display-2xl">
              Secure<br />Voting
            </h1>
          </div>
          <div className="hero-meta label-caps" style={{ color: 'var(--neutral-text)' }}>
            <div>ARCHITECTURE: END-TO-END ENCRYPTED.</div>
            <div>PURPOSE: TRANSPARENT DIGITAL BALLOT.</div>
            <div>STATUS: <span style={{ color: 'var(--cyan-accent)' }}>SECURE.</span></div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="about" className="section">
        <div className="container grid-12">
          <img src="/images/mission_fluid.png" alt="Abstract fluid shape" className="mission-image" />
          <div className="mission-content">
            <h2 className="headline-md mission-title">The Mission</h2>
            <p className="body-sm mission-text">
              We redefine democratic participation through cryptographic excellence. By leveraging blockchain-grade security and intuitive design, Vote Kinetic ensures every voice is heard and every ballot is immutable. It is not just a platform; it is the foundation of modern trust.
            </p>
            <Link to="/manifesto" className="explore-link label-caps">
              Explore Manifesto &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section id="engineering" className="section">
        <div className="container">
          <div className="grid-12">
            <h2 className="display-lg features-title">Core Features</h2>
            
            <div className="feature-card feature-1">
              <div className="feature-card-img-container">
                <img src="/images/encryption_sphere.png" alt="Encryption Sphere" />
              </div>
              <div className="feature-card-footer">
                <div className="feature-card-title">Encryption</div>
                <div className="chip">Tech</div>
              </div>
            </div>

            <div className="feature-card feature-2">
              <div className="feature-card-img-container">
                <img src="/images/integrity_crystal.png" alt="Integrity Crystal" />
              </div>
              <div className="feature-card-footer">
                <div className="feature-card-title">Integrity</div>
                <div className="chip">System</div>
              </div>
            </div>

            <div className="feature-card feature-3">
              <div className="feature-card-img-container">
                <img src="/images/accessibility_tree.png" alt="Accessibility Tree" />
              </div>
              <div className="feature-card-footer">
                <div className="feature-card-title">Accessibility</div>
                <div className="chip">Public</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Democracy Evolved Section */}
      <section className="section impact-section">
        <div className="container">
          <h2 className="display-2xl" style={{ textAlign: 'center' }}>
            Democracy<br />Evolved.
          </h2>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
