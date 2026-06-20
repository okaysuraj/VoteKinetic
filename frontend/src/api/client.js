const API_BASE = import.meta.env.VITE_API_URL || '/api';

function getToken() {
  return localStorage.getItem('token');
}

async function request(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = data.message || data.errors?.[0]?.msg || 'Request failed';
    throw new Error(message);
  }

  return data;
}

export const api = {
  login: (data) => request('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  register: (data) => request('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  me: () => request('/auth/me'),
  generateMfa: () => request('/auth/mfa/generate', { method: 'POST' }),
  verifyMfa: (code) => request('/auth/mfa/verify', { method: 'POST', body: JSON.stringify({ code }) }),
  getElections: () => request('/elections'),
  getElection: (id) => request(`/elections/${id}`),
  createElection: (body) =>
    request('/elections', { method: 'POST', body: JSON.stringify(body) }),
  updateElection: (id, body) =>
    request(`/elections/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteElection: (id) => request(`/elections/${id}`, { method: 'DELETE' }),
  getCandidates: (electionId) => request(`/candidates/election/${electionId}`),
  createCandidate: (body) =>
    request('/candidates', { method: 'POST', body: JSON.stringify(body) }),
  deleteCandidate: (id) => request(`/candidates/${id}`, { method: 'DELETE' }),
  castVote: (body) => request('/votes', { method: 'POST', body: JSON.stringify(body) }),
  myVotes: () => request('/votes/my'),
  getResults: (electionId) => request(`/stats/election/${electionId}/results`),
  getDashboard: () => request('/stats/dashboard'),
  getLogs: () => request('/stats/logs'),
  getUsers: () => request('/users'),
  toggleUserActive: (id) => request(`/users/${id}/toggle-active`, { method: 'PATCH' }),
  getBulletin: (electionId) => request(`/votes/bulletin/${electionId}`),
};
