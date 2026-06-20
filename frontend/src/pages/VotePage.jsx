import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../api/client';

export default function VotePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api
      .getElection(id)
      .then((res) => {
        setData(res);
        if (res.has_voted) {
          setSelected(res.voted_candidate_id);
        }
      })
      .catch((err) => setError(err.message));
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!selected) {
      setError('Please select a candidate');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      await api.castVote({ election_id: Number(id), candidate_id: selected });
      setSuccess('Your vote has been recorded. Thank you for participating!');
      setTimeout(() => navigate(`/elections/${id}/results`), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (!data) {
    return <div className="container">Loading…</div>;
  }

  const { election, candidates, has_voted } = data;

  if (!election.can_vote) {
    return (
      <div className="container">
        <div className="alert alert-error">Voting is not currently open for this election.</div>
        <Link to={`/elections/${id}`} className="btn btn-outline">
          Back to election
        </Link>
      </div>
    );
  }

  if (has_voted) {
    return (
      <div className="container">
        <div className="alert alert-success">You have already voted in this election.</div>
        <Link to={`/elections/${id}/results`} className="btn btn-primary">
          View results
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: '720px' }}>
      <Link to={`/elections/${id}`} style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        ← Back
      </Link>
      <h1 style={{ marginTop: '1rem' }}>Cast your vote</h1>
      <p style={{ color: 'var(--text-muted)' }}>{election.title}</p>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="candidate-select">
          {candidates.map((c) => (
            <label
              key={c.id}
              className={`card candidate-option ${selected === c.id ? 'selected' : ''}`}
            >
              <input
                type="radio"
                name="candidate"
                value={c.id}
                checked={selected === c.id}
                onChange={() => setSelected(c.id)}
              />
              <div>
                <strong>{c.full_name}</strong>
                {c.party && <span className="party">{c.party}</span>}
                <p>{c.bio}</p>
              </div>
            </label>
          ))}
        </div>
        {!candidates.length && (
          <p style={{ color: 'var(--text-muted)' }}>No candidates available for this election.</p>
        )}
        <button
          type="submit"
          className="btn btn-primary"
          style={{ marginTop: '1.5rem', width: '100%' }}
          disabled={submitting || !candidates.length}
        >
          {submitting ? 'Submitting…' : 'Submit vote'}
        </button>
      </form>

      <style>{`
        .candidate-select { display: flex; flex-direction: column; gap: 1rem; margin-top: 1.5rem; }
        .candidate-option { display: flex; gap: 1rem; cursor: pointer; border: 2px solid transparent; transition: border-color 0.2s; }
        .candidate-option.selected { border-color: var(--primary); }
        .candidate-option input { margin-top: 0.35rem; accent-color: var(--primary); }
        .candidate-option strong { display: block; font-size: 1.1rem; }
        .candidate-option .party { display: block; color: var(--accent); font-size: 0.9rem; margin-top: 0.15rem; }
        .candidate-option p { color: var(--text-muted); margin: 0.5rem 0 0; font-size: 0.95rem; }
      `}</style>
    </div>
  );
}
