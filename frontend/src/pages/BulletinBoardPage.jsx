import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api/client';

const BulletinBoardPage = () => {
  const { electionId } = useParams();
  const [bulletin, setBulletin] = useState([]);
  const [election, setElection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    Promise.all([
      api.getBulletin(electionId),
      api.getElection(electionId).catch(() => null)
    ])
    .then(([bulletinData, electionData]) => {
      setBulletin(bulletinData.bulletin || []);
      if (electionData) setElection(electionData.election);
    })
    .catch(err => console.error(err))
    .finally(() => setLoading(false));
  }, [electionId]);

  if (loading) {
    return (
      <main className="section" style={{ paddingTop: '120px', minHeight: '80vh' }}>
        <div className="container">
          <p className="body-lg" style={{ color: 'var(--cyan-accent)' }}>Accessing Public Ledger...</p>
        </div>
      </main>
    );
  }

  const filteredBulletin = bulletin.filter(entry => 
    entry.transaction_hash.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="section" style={{ paddingTop: '120px', minHeight: '80vh' }}>
      <div className="container grid-12">
        <div style={{ gridColumn: '1 / 13' }}>
          <Link to="/dashboard" className="btn-ghost" style={{ padding: '8px 16px', fontSize: '10px', display: 'inline-block', marginBottom: '32px' }}>
            &larr; BACK
          </Link>
          <h1 className="display-lg" style={{ fontSize: '48px', marginBottom: '16px' }}>Public Bulletin Board</h1>
          <div className="label-caps" style={{ color: 'var(--cyan-accent)', marginBottom: '32px' }}>
            ELECTION: {election ? election.title : `ID ${electionId}`}
          </div>
          <p className="body-lg" style={{ color: 'var(--neutral-text)', maxWidth: '800px', marginBottom: '32px' }}>
            This is the immutable public ledger for this election. You can verify that your vote was successfully recorded by searching for your unique Transaction Hash below. For privacy, candidate selections are encrypted and not displayed.
          </p>

          <input 
            type="text" 
            placeholder="Search your Transaction Hash..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', maxWidth: '600px', padding: '16px', background: 'var(--surface-container)', border: '1px solid var(--outline-variant)', color: 'var(--pure-white)', fontFamily: 'var(--font-jetbrains)', marginBottom: '32px', borderRadius: '4px' }}
          />

          <div style={{ background: 'var(--surface-container-low)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)' }}>
              <div className="label-caps" style={{ color: 'var(--pure-white)' }}>Transaction Hash (SHA-256)</div>
              <div className="label-caps" style={{ color: 'var(--pure-white)' }}>Timestamp</div>
            </div>
            
            {filteredBulletin.length === 0 ? (
              <div style={{ padding: '32px', textAlign: 'center', color: 'var(--neutral-text)' }} className="body-sm">
                No matching cryptographic entries found.
              </div>
            ) : (
              <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                {filteredBulletin.map((entry, idx) => (
                  <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 200px', padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="body-sm" style={{ fontFamily: 'var(--font-jetbrains)', color: entry.transaction_hash.toLowerCase() === searchTerm.toLowerCase() ? 'var(--cyan-accent)' : 'var(--neutral-text)', wordBreak: 'break-all', paddingRight: '16px' }}>
                      {entry.transaction_hash}
                    </div>
                    <div className="body-sm" style={{ color: 'var(--outline)' }}>
                      {new Date(entry.voted_at).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default BulletinBoardPage;
