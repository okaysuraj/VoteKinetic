import { useEffect, useState } from 'react';
import { api } from '../api/client';

const emptyElection = {
  title: '',
  description: '',
  start_date: '',
  end_date: '',
  status: 'draft',
};

const emptyCandidate = {
  election_id: '',
  full_name: '',
  party: '',
  bio: '',
};

export default function Admin() {
  const [tab, setTab] = useState('elections');
  const [elections, setElections] = useState([]);
  const [users, setUsers] = useState([]);
  const [electionForm, setElectionForm] = useState(emptyElection);
  const [editingElectionId, setEditingElectionId] = useState(null);
  const [candidateForm, setCandidateForm] = useState(emptyCandidate);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function loadElections() {
    const { elections: data } = await api.getElections();
    setElections(data);
  }

  async function loadUsers() {
    const { users: data } = await api.getUsers();
    setUsers(data);
  }

  useEffect(() => {
    loadElections().catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    if (tab === 'users') {
      loadUsers().catch((err) => setError(err.message));
    }
  }, [tab]);

  function showMessage(text) {
    setMessage(text);
    setTimeout(() => setMessage(''), 4000);
  }

  function toLocalDatetimeValue(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    const offset = d.getTimezoneOffset();
    const local = new Date(d.getTime() - offset * 60000);
    return local.toISOString().slice(0, 16);
  }

  async function handleElectionSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      const payload = {
        ...electionForm,
        start_date: new Date(electionForm.start_date).toISOString(),
        end_date: new Date(electionForm.end_date).toISOString(),
      };
      if (editingElectionId) {
        await api.updateElection(editingElectionId, payload);
        showMessage('Election updated');
      } else {
        await api.createElection(payload);
        showMessage('Election created');
      }
      setElectionForm(emptyElection);
      setEditingElectionId(null);
      await loadElections();
    } catch (err) {
      setError(err.message);
    }
  }

  function startEditElection(election) {
    setEditingElectionId(election.id);
    setElectionForm({
      title: election.title,
      description: election.description || '',
      start_date: toLocalDatetimeValue(election.start_date),
      end_date: toLocalDatetimeValue(election.end_date),
      status: election.status,
    });
  }

  async function deleteElection(id) {
    if (!confirm('Delete this election and all related votes?')) return;
    try {
      await api.deleteElection(id);
      showMessage('Election deleted');
      await loadElections();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleCandidateSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await api.createCandidate({
        ...candidateForm,
        election_id: Number(candidateForm.election_id),
      });
      showMessage('Candidate added');
      setCandidateForm(emptyCandidate);
      await loadElections();
    } catch (err) {
      setError(err.message);
    }
  }

  async function toggleUser(id) {
    try {
      await api.toggleUserActive(id);
      await loadUsers();
      showMessage('User status updated');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="container">
      <h1>Admin panel</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        Create elections, manage candidates, and oversee registered voters.
      </p>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-error">{error}</div>}

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {['elections', 'candidates', 'users'].map((t) => (
          <button
            key={t}
            type="button"
            className={`btn ${tab === t ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setTab(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === 'elections' && (
        <div className="grid-2">
          <form className="card" onSubmit={handleElectionSubmit}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
              {editingElectionId ? 'Edit election' : 'New election'}
            </h2>
            <div className="form-group">
              <label>Title</label>
              <input
                value={electionForm.title}
                onChange={(e) => setElectionForm({ ...electionForm, title: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                rows={3}
                value={electionForm.description}
                onChange={(e) => setElectionForm({ ...electionForm, description: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Start date</label>
              <input
                type="datetime-local"
                value={electionForm.start_date}
                onChange={(e) => setElectionForm({ ...electionForm, start_date: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>End date</label>
              <input
                type="datetime-local"
                value={electionForm.end_date}
                onChange={(e) => setElectionForm({ ...electionForm, end_date: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                value={electionForm.status}
                onChange={(e) => setElectionForm({ ...electionForm, status: e.target.value })}
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button type="submit" className="btn btn-primary">
                {editingElectionId ? 'Update' : 'Create'}
              </button>
              {editingElectionId && (
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => {
                    setEditingElectionId(null);
                    setElectionForm(emptyElection);
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          <div className="table-wrap card">
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>All elections</h2>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Votes</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {elections.map((e) => (
                  <tr key={e.id}>
                    <td>{e.title}</td>
                    <td>{e.status}</td>
                    <td>{e.vote_count}</td>
                    <td>
                      <button type="button" className="btn btn-outline" onClick={() => startEditElection(e)}>
                        Edit
                      </button>{' '}
                      <button type="button" className="btn btn-danger" onClick={() => deleteElection(e.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'candidates' && (
        <div className="grid-2">
          <form className="card" onSubmit={handleCandidateSubmit}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Add candidate</h2>
            <div className="form-group">
              <label>Election</label>
              <select
                value={candidateForm.election_id}
                onChange={(e) => setCandidateForm({ ...candidateForm, election_id: e.target.value })}
                required
              >
                <option value="">Select election</option>
                {elections.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Full name</label>
              <input
                value={candidateForm.full_name}
                onChange={(e) => setCandidateForm({ ...candidateForm, full_name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Party / affiliation</label>
              <input
                value={candidateForm.party}
                onChange={(e) => setCandidateForm({ ...candidateForm, party: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Bio</label>
              <textarea
                rows={3}
                value={candidateForm.bio}
                onChange={(e) => setCandidateForm({ ...candidateForm, bio: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add candidate
            </button>
          </form>
          <div className="card">
            <p style={{ color: 'var(--text-muted)' }}>
              Select an election on the Elections page to view its candidates, or add new ones using the form.
            </p>
          </div>
        </div>
      )}

      {tab === 'users' && (
        <div className="card table-wrap">
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Registered users</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.full_name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>{u.is_active ? 'Active' : 'Inactive'}</td>
                  <td>
                    <button type="button" className="btn btn-outline" onClick={() => toggleUser(u.id)}>
                      {u.is_active ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
