import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// For Android emulator, use 10.0.2.2. For iOS emulator, use localhost.
// For physical devices, you must use your computer's local IP address.
const API_URL = Platform.OS === 'android' ? 'http://10.0.2.2:5000/api' : 'http://localhost:5000/api';

async function request(endpoint, options = {}) {
  const token = await SecureStore.getItemAsync('token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, config);

  let data;
  try {
    data = await response.json();
  } catch (err) {
    data = { message: 'Failed to parse response from server' };
  }

  if (!response.ok) {
    throw data;
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
  createElection: (data) => request('/elections', { method: 'POST', body: JSON.stringify(data) }),
  updateElection: (id, data) => request(`/elections/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteElection: (id) => request(`/elections/${id}`, { method: 'DELETE' }),
  castVote: (data) => request('/votes', { method: 'POST', body: JSON.stringify(data) }),
  myVotes: () => request('/votes/my'),
  getResults: (electionId) => request(`/stats/election/${electionId}/results`),
  getDashboard: () => request('/stats/dashboard'),
  getLogs: () => request('/stats/logs'),
  getUsers: () => request('/users'),
  toggleUserActive: (id) => request(`/users/${id}/toggle-active`, { method: 'PATCH' }),
  getBulletin: (electionId) => request(`/votes/bulletin/${electionId}`),
};
