import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../api/client';
import StatusBadge from '../components/StatusBadge';

export default function Results() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .getResults(id)
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

  const { election, results, total_votes } = data;
  const winner = results[0]?.vote_count > 0 ? results[0] : null;

  return (
    <div className="container">
      <Link to={`/elections/${id}`} style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        ← Back to election
      </Link>
      <header style={{ margin: '1rem 0 2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <h1>Results: {election.title}</h1>
          <StatusBadge status={election.status} />
        </div>
        <p style={{ color: 'var(--text-muted)' }}>
          Total votes cast: <strong>{total_votes}</strong>
        </p>
        {winner && (
          <p className="winner-banner">
            Leading: {winner.full_name}
            {winner.party ? ` (${winner.party})` : ''} — {winner.percentage}%
          </p>
        )}
      </header>

      <div className="results-list">
        {results.map((r, index) => (
          <article key={r.id} className="card result-row">
            <div className="result-rank">#{index + 1}</div>
            <div className="result-info">
              <h3 style={{ fontFamily: 'DM Sans', fontWeight: 600, fontSize: '1.1rem', margin: 0 }}>
                {r.full_name}
              </h3>
              {r.party && <span style={{ color: 'var(--accent)', fontSize: '0.9rem' }}>{r.party}</span>}
              <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${r.percentage}%` }} />
              </div>
            </div>
            <div className="result-stats">
              <span className="result-votes">{r.vote_count} votes</span>
              <span className="result-pct">{r.percentage}%</span>
            </div>
          </article>
        ))}
      </div>

      {!results.length && (
        <p style={{ color: 'var(--text-muted)' }}>No candidates in this election yet.</p>
      )}

      <style>{`
        .winner-banner { background: rgba(52, 211, 153, 0.12); border: 1px solid var(--success); padding: 0.75rem 1rem; border-radius: 8px; color: #a7f3d0; }
        .results-list { display: flex; flex-direction: column; gap: 1rem; }
        .result-row { display: grid; grid-template-columns: auto 1fr auto; gap: 1.25rem; align-items: center; }
        .result-rank { font-size: 1.5rem; font-weight: 700; color: var(--text-muted); min-width: 2.5rem; }
        .result-stats { text-align: right; }
        .result-votes { display: block; font-weight: 600; }
        .result-pct { color: var(--accent); font-size: 1.25rem; font-weight: 700; }
        @media (max-width: 600px) {
          .result-row { grid-template-columns: 1fr; }
          .result-rank { display: none; }
          .result-stats { text-align: left; }
        }
      `}</style>
    </div>
  );
}
