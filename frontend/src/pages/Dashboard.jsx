import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';

const Dashboard = () => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p className="body-lg" style={{ color: 'var(--cyan-accent)' }}>Initializing Secure Connection...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="dashboard-page" style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="container">
        <header style={{ marginBottom: '64px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '32px' }}>
          <h1 className="display-lg">Welcome, {user.full_name}</h1>
          <div className="label-caps" style={{ color: 'var(--cyan-accent)', marginTop: '16px' }}>
            STATUS: ACTIVE | CLEARANCE: {isAdmin ? 'ADMINISTRATOR' : 'VOTER'}
          </div>
        </header>

        {isAdmin ? <AdminDashboard /> : <VoterDashboard />}
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [stats, setStats] = useState({ total_voters: 0, active_elections: 0 });
  const [logs, setLogs] = useState([]);
  
  useEffect(() => {
    api.getDashboard().then(res => setStats(res)).catch(() => {});
    api.getLogs().then(res => setLogs(res.logs || [])).catch(() => {});
  }, []);

  return (
    <div className="grid-12">
      <div className="feature-card" style={{ gridColumn: '1 / 7' }}>
        <div className="feature-card-footer" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '16px', marginBottom: '16px' }}>
          <div className="feature-card-title">System Overview</div>
          <div className="chip">Admin</div>
        </div>
        <div className="body-lg" style={{ color: 'var(--neutral-text)' }}>
          <p>Total Registered Voters: <span style={{ color: 'var(--pure-white)' }}>{stats.total_voters}</span></p>
          <p>Active Elections: <span style={{ color: 'var(--pure-white)' }}>{stats.active_elections}</span></p>
          <p>System Integrity: <span style={{ color: 'var(--cyan-accent)' }}>CRYPTOGRAPHICALLY SECURE</span></p>
        </div>
        <div style={{ marginTop: '32px' }}>
          <Link to="/elections" className="btn-ghost" style={{ textDecoration: 'none' }}>Manage Elections</Link>
        </div>
      </div>

      <div className="feature-card" style={{ gridColumn: '7 / 13' }}>
        <div className="feature-card-footer" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '16px', marginBottom: '16px' }}>
          <div className="feature-card-title">Immutable Log Ledger</div>
          <div className="chip">Logs</div>
        </div>
        <div className="body-sm" style={{ color: 'var(--neutral-text)' }}>
          {logs.length === 0 ? <p>No events logged yet.</p> : logs.map(log => (
            <div key={log.id} style={{ marginBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px' }}>
              <div style={{ color: 'var(--cyan-accent)' }}>[{new Date(log.created_at).toLocaleTimeString()}] {log.action}</div>
              <div style={{ fontSize: '10px', fontFamily: 'var(--font-jetbrains)' }}>Hash: {log.current_hash.substring(0, 16)}...</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const VoterDashboard = () => {
  const { user } = useAuth();
  const [elections, setElections] = useState([]);
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [mfaSetupQR, setMfaSetupQR] = useState('');
  const [mfaCode, setMfaCode] = useState('');
  const [mfaError, setMfaError] = useState('');
  const [mfaSuccess, setMfaSuccess] = useState(false);

  useEffect(() => {
    Promise.all([api.getElections(), api.myVotes()])
      .then(([electionsData, votesData]) => {
        setElections(electionsData.elections || []);
        setVotes(votesData.votes || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleSetupMfa = async () => {
    try {
      const res = await api.generateMfa();
      setMfaSetupQR(res.qrCodeUrl);
      setMfaError('');
    } catch (err) {
      setMfaError(err.message || 'Failed to generate MFA');
    }
  };

  const handleVerifyMfa = async () => {
    try {
      await api.verifyMfa(mfaCode);
      setMfaSuccess(true);
      setMfaSetupQR('');
      setMfaError('');
      // In a real app, we'd update user context here
    } catch (err) {
      setMfaError(err.message || 'Invalid code');
    }
  };

  if (loading) {
    return <p className="body-sm" style={{ color: 'var(--neutral-text)' }}>Syncing secure nodes...</p>;
  }

  const activeElections = elections.filter(e => e.status === 'active');
  const votedElectionIds = votes.map(v => v.election_id);

  return (
    <div className="grid-12" style={{ rowGap: '32px' }}>
      <div className="feature-card" style={{ gridColumn: '1 / 8' }}>
        <div className="feature-card-footer" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '16px', marginBottom: '16px' }}>
          <div className="feature-card-title">Active Ballots</div>
          <div className="chip">Voting</div>
        </div>
        <div className="body-lg" style={{ color: 'var(--neutral-text)' }}>
          {activeElections.length === 0 ? (
            <p>There are currently no active elections requiring your vote.</p>
          ) : (
            activeElections.map(election => {
              const hasVoted = votedElectionIds.includes(election.id);
              return (
                <div key={election.id} style={{ marginBottom: '16px', padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                  <h3 className="headline-md" style={{ fontSize: '20px', marginBottom: '8px' }}>{election.title}</h3>
                  <p className="body-sm">{election.description}</p>
                  <div style={{ marginTop: '16px' }}>
                    {hasVoted ? (
                      <span className="label-caps" style={{ color: 'var(--cyan-accent)' }}>✓ VOTE SECURED</span>
                    ) : (
                      <Link to={`/elections/${election.id}/vote`} className="btn-ghost" style={{ padding: '8px 16px', fontSize: '10px', textDecoration: 'none', display: 'inline-block' }}>CAST VOTE &rarr;</Link>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="feature-card" style={{ gridColumn: '8 / 13' }}>
        <div className="feature-card-footer" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '16px', marginBottom: '16px' }}>
          <div className="feature-card-title">Voting History</div>
          <div className="chip">Records</div>
        </div>
        <div className="body-sm" style={{ color: 'var(--neutral-text)' }}>
          {votes.length === 0 ? (
            <p>No historical voting records found for this cryptographic identity.</p>
          ) : (
            votes.map(vote => (
              <div key={vote.id} style={{ marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '16px' }}>
                <div className="label-caps" style={{ color: 'var(--cyan-accent)', marginBottom: '8px' }}>Transaction Hash</div>
                <div style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '12px', wordBreak: 'break-all', marginBottom: '8px', color: 'var(--pure-white)' }}>
                  {vote.transaction_hash || 'Pending cryptographic sync...'}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px' }}>{vote.election_title} &bull; {new Date(vote.voted_at || vote.created_at).toLocaleDateString()}</span>
                  <Link to={`/bulletin/${vote.election_id}`} className="btn-ghost" style={{ padding: '4px 8px', fontSize: '10px', textDecoration: 'none' }}>Verify &rarr;</Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Additional Feature: Identity Verification */}
      <div className="feature-card" style={{ gridColumn: '1 / 13' }}>
        <div className="feature-card-footer" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '16px', marginBottom: '16px' }}>
          <div className="feature-card-title">Cryptographic Identity</div>
          <div className="chip">Security</div>
        </div>
        <div className="body-sm" style={{ color: 'var(--neutral-text)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <p className="label-caps" style={{ color: 'var(--pure-white)', marginBottom: '4px' }}>Entity ID</p>
            <p style={{ fontFamily: 'var(--font-jetbrains)' }}>{user.id}</p>
          </div>
          <div>
            <p className="label-caps" style={{ color: 'var(--pure-white)', marginBottom: '4px' }}>Registered Email</p>
            <p style={{ fontFamily: 'var(--font-jetbrains)' }}>{user.email}</p>
          </div>
          <div>
            <p className="label-caps" style={{ color: 'var(--pure-white)', marginBottom: '4px' }}>Clearance Level</p>
            <p style={{ fontFamily: 'var(--font-jetbrains)', textTransform: 'uppercase' }}>{user.role}</p>
          </div>
          <div>
            <p className="label-caps" style={{ color: 'var(--pure-white)', marginBottom: '4px' }}>Status</p>
            <p style={{ color: 'var(--cyan-accent)', fontFamily: 'var(--font-jetbrains)' }}>VERIFIED</p>
          </div>
        </div>
        
        {/* MFA Setup Section */}
        <div style={{ marginTop: '32px', paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <h4 className="headline-md" style={{ fontSize: '16px', marginBottom: '16px', color: 'var(--pure-white)' }}>Multi-Factor Authentication (MFA)</h4>
          {user.mfa_enabled || mfaSuccess ? (
            <div style={{ padding: '16px', background: 'rgba(0, 255, 255, 0.05)', border: '1px solid var(--cyan-accent)', borderRadius: '4px', display: 'inline-block' }}>
              <span style={{ color: 'var(--cyan-accent)', fontFamily: 'var(--font-jetbrains)' }}>✓ MFA is currently ENABLED. Your account is secured.</span>
            </div>
          ) : (
            <div>
              <p className="body-sm" style={{ color: 'var(--neutral-text)', marginBottom: '16px' }}>MFA is currently disabled. Protect your cryptographic identity by enabling it.</p>
              {!mfaSetupQR ? (
                <button className="btn-ghost" onClick={handleSetupMfa}>ENABLE MFA</button>
              ) : (
                <div style={{ background: 'var(--surface-container)', padding: '24px', borderRadius: '8px', maxWidth: '400px' }}>
                  <p className="body-sm" style={{ color: 'var(--pure-white)', marginBottom: '16px' }}>1. Scan this QR code with your Authenticator App (e.g. Google Authenticator)</p>
                  <img src={mfaSetupQR} alt="MFA QR Code" style={{ display: 'block', marginBottom: '16px', background: '#fff', padding: '8px', borderRadius: '4px' }} />
                  <p className="body-sm" style={{ color: 'var(--pure-white)', marginBottom: '8px' }}>2. Enter the 6-digit code below to verify:</p>
                  <input 
                    type="text" 
                    maxLength={6} 
                    value={mfaCode} 
                    onChange={e => setMfaCode(e.target.value)} 
                    style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--outline-variant)', color: 'var(--pure-white)', fontFamily: 'var(--font-jetbrains)', textAlign: 'center', letterSpacing: '8px', fontSize: '20px', marginBottom: '16px' }} 
                  />
                  {mfaError && <p style={{ color: 'var(--error-accent)', fontSize: '12px', marginBottom: '16px' }}>{mfaError}</p>}
                  <button className="btn-solid" style={{ width: '100%' }} onClick={handleVerifyMfa}>VERIFY & ENABLE</button>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
