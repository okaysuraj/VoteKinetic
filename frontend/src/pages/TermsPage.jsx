import React from 'react';

const TermsPage = () => {
  return (
    <main className="section" style={{ paddingTop: '120px', minHeight: '80vh' }}>
      <div className="container">
        <h1 className="display-lg">Terms of Service</h1>
        <div className="body-lg" style={{ marginTop: '24px', color: 'var(--neutral-text)', maxWidth: '800px' }}>
          <p>By using Vote Kinetic, you agree to participate in a secure and transparent voting process.</p>
          <br/>
          <p>Users are responsible for maintaining the confidentiality of their authentication credentials. Any attempt to compromise the integrity of the voting system will result in immediate termination of access and potential legal action.</p>
        </div>
      </div>
    </main>
  );
};

export default TermsPage;
