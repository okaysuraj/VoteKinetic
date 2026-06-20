import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import StatusBadge from '../components/StatusBadge';

export default function ElectionDetail() {
  const { id } = useParams();
  const { isAdmin } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .getElection(id)
      .then(setData)
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) {
    return (
      <div className="container">
        <div className="alert alert-error">{error}</div>
      </div>
    );
  }

  if (!data) {
    return <div className="container">Loading…</div>;
  }

  const { election, candidates, has_voted } = data;

  return (
    <div className="container">
      <Link to="/elections" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        ← Back to elections
      </Link>
      <header style={{ margin: '1rem 0 2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <h1>{election.title}</h1>
          <StatusBadge status={election.live_status} />
        </div>
        <p style={{ color: 'var(--text-muted)', maxWidth: '640px' }}>{election.description}</p>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          {new Date(election.start_date).toLocaleString()} — {new Date(election.end_date).toLocaleString()}
        </p>
      </header>

      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {election.can_vote && !has_voted && (
          <Link to={`/elections/${id}/vote`} className="btn btn-primary">
            Cast your vote
          </Link>
        )}
        <Link to={`/elections/${id}/results`} className="btn btn-outline">
          View results
        </Link>
        {isAdmin && (
          <Link to="/admin" className="btn btn-outline">
            Manage in admin
          </Link>
        )}
      </div>

      <h2 style={{ fontSize: '1.35rem', marginBottom: '1rem' }}>Candidates</h2>
      <div className="grid-2">
        {candidates.map((c) => (
          <article key={c.id} className="card">
            <h3 style={{ fontFamily: 'DM Sans', fontWeight: 600, fontSize: '1.1rem' }}>{c.full_name}</h3>
            {c.party && <p style={{ color: 'var(--accent)', margin: '0.25rem 0', fontSize: '0.9rem' }}>{c.party}</p>}
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{c.bio || 'No bio provided.'}</p>
          </article>
        ))}
      </div>
      {!candidates.length && <p style={{ color: 'var(--text-muted)' }}>No candidates registered yet.</p>}
    </div>
  );
}
