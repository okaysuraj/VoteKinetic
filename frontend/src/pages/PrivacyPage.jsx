import React from 'react';

const PrivacyPage = () => {
  return (
    <main className="section" style={{ paddingTop: '120px', minHeight: '80vh' }}>
      <div className="container">
        <h1 className="display-lg">Privacy Policy</h1>
        <div className="body-lg" style={{ marginTop: '24px', color: 'var(--neutral-text)', maxWidth: '800px' }}>
          <p>Your privacy is our priority. Vote Kinetic utilizes end-to-end encryption to ensure your voting data remains completely anonymous and secure.</p>
          <br/>
          <p>We do not track personal identifiers alongside ballot choices. All data is processed using cryptographic protocols designed to protect voter identity while proving the integrity of the election.</p>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPage;
