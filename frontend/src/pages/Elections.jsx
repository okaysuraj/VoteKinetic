import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import StatusBadge from '../components/StatusBadge';

export default function Elections() {
  const [elections, setElections] = useState([]);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .getElections()
      .then(({ elections: data }) => setElections(data))
      .catch((err) => setError(err.message));
  }, []);

  const filtered =
    filter === 'all' ? elections : elections.filter((e) => e.live_status === filter);

  return (
    <div className="container">
      <header style={{ marginBottom: '2rem' }}>
        <h1>Elections</h1>
        <p style={{ color: 'var(--text-muted)' }}>Browse all elections and view results.</p>
      </header>

      {error && <div className="alert alert-error">{error}</div>}

      <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {['all', 'active', 'upcoming', 'completed'].map((f) => (
          <button
            key={f}
            type="button"
            className={`btn ${filter === f ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="election-grid">
        {filtered.map((e) => (
          <article key={e.id} className="card election-card">
            <div className="election-card-header">
              <h2 style={{ fontSize: '1.2rem', fontFamily: 'DM Sans', fontWeight: 600 }}>{e.title}</h2>
              <StatusBadge status={e.live_status} />
            </div>
            <p className="election-desc">{e.description || 'No description provided.'}</p>
            <dl className="election-meta">
              <div>
                <dt>Starts</dt>
                <dd>{new Date(e.start_date).toLocaleString()}</dd>
              </div>
              <div>
                <dt>Ends</dt>
                <dd>{new Date(e.end_date).toLocaleString()}</dd>
              </div>
              <div>
                <dt>Candidates</dt>
                <dd>{e.candidate_count}</dd>
              </div>
              <div>
                <dt>Votes</dt>
                <dd>{e.vote_count}</dd>
              </div>
            </dl>
            {e.has_voted && (
              <p className="voted-tag">✓ You have voted in this election</p>
            )}
            <div className="election-card-actions">
              <Link to={`/elections/${e.id}`} className="btn btn-outline">
                Details
              </Link>
              {e.can_vote && !e.has_voted && (
                <Link to={`/elections/${e.id}/vote`} className="btn btn-primary">
                  Vote
                </Link>
              )}
              <Link to={`/elections/${e.id}/results`} className="btn btn-outline">
                Results
              </Link>
            </div>
          </article>
        ))}
      </div>

      {!filtered.length && !error && (
        <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>No elections match this filter.</p>
      )}

      <style>{`
        .election-grid { display: grid; gap: 1.25rem; }
        @media (min-width: 700px) { .election-grid { grid-template-columns: repeat(2, 1fr); } }
        .election-card-header { display: flex; justify-content: space-between; gap: 1rem; align-items: flex-start; }
        .election-desc { color: var(--text-muted); font-size: 0.95rem; margin: 0.75rem 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .election-meta { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin: 0 0 1rem; font-size: 0.85rem; }
        .election-meta dt { color: var(--text-muted); margin: 0; }
        .election-meta dd { margin: 0.15rem 0 0; font-weight: 500; }
        .voted-tag { color: var(--success); font-size: 0.9rem; margin: 0 0 1rem; }
        .election-card-actions { display: flex; flex-wrap: wrap; gap: 0.5rem; }
      `}</style>
    </div>
  );
}
