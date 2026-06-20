import React from 'react';

const ManifestoPage = () => {
  return (
    <main className="section" style={{ paddingTop: '120px', minHeight: '80vh' }}>
      <div className="container">
        <h1 className="display-lg">Our Manifesto</h1>
        <div className="body-lg" style={{ marginTop: '24px', color: 'var(--neutral-text)', maxWidth: '800px' }}>
          <p>We believe democracy requires evolution. Trust in our institutions must be cryptographically verifiable, not just assumed.</p>
          <br/>
          <p>Vote Kinetic is built on the premise that a transparent, immutable, and accessible voting infrastructure is a fundamental human right in the digital age.</p>
        </div>
      </div>
    </main>
  );
};

export default ManifestoPage;
