import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [totpCode, setTotpCode] = useState('');
  const [requiresMfa, setRequiresMfa] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const payload = requiresMfa ? { email, password, totp_code: totpCode } : { email, password };
      const { token, user } = await api.login(payload);
      login(token, user);
      navigate(from, { replace: true });
    } catch (err) {
      if (err.requires_mfa) {
        setRequiresMfa(true);
        setError('Two-Factor Authentication required.');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container auth-page">
      <div className="card auth-card">
        <h1>Welcome back</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          Sign in to cast your vote or manage elections.
        </p>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={requiresMfa}
              autoComplete="current-password"
            />
          </div>
          
          {requiresMfa && (
            <div className="form-group" style={{ padding: '16px', background: 'rgba(0, 255, 255, 0.05)', border: '1px solid var(--cyan-accent)', borderRadius: '4px' }}>
              <label htmlFor="totpCode" style={{ color: 'var(--cyan-accent)' }}>Authenticator Code (MFA)</label>
              <input
                id="totpCode"
                type="text"
                value={totpCode}
                onChange={(e) => setTotpCode(e.target.value)}
                required
                maxLength={6}
                style={{ textAlign: 'center', letterSpacing: '4px', fontSize: '20px' }}
                placeholder="123456"
              />
            </div>
          )}

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Signing in…' : requiresMfa ? 'Verify MFA' : 'Sign in'}
          </button>
        </form>
        <p style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          No account? <Link to="/register">Register</Link>
        </p>
        <div className="demo-credentials">
          <p><strong>Demo accounts</strong></p>
          <p>Admin: admin@voting.com / Admin@123</p>
          <p>Voter: voter@voting.com / Voter@123</p>
        </div>
      </div>
    </div>
  );
}
