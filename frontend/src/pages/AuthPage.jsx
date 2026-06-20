import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

const AuthPage = ({ mode }) => {
  const isLogin = mode === 'login';
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [role, setRole] = useState('voter');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (isLogin) {
        const data = await api.login({ email, password });
        login(data.token, data.user);
        navigate('/dashboard');
      } else {
        const data = await api.register({ full_name: fullName, email, password });
        login(data.token, data.user);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2 className="display-lg auth-title">{isLogin ? 'Log In' : 'Sign Up'}</h2>
        
        {error && (
          <div style={{ color: 'var(--error)', border: '1px solid var(--error-container)', padding: '12px', background: 'rgba(147, 0, 10, 0.2)' }} className="body-sm">
            {error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Role Toggle - cosmetic for signup based on backend constraints, but keeping UI as requested */}
          <div className="role-toggle-container">
            <button 
              type="button" 
              className={`role-toggle-btn label-caps ${role === 'voter' ? 'active' : ''}`}
              onClick={() => setRole('voter')}
            >
              Voter
            </button>
            <button 
              type="button" 
              className={`role-toggle-btn label-caps ${role === 'admin' ? 'active' : ''}`}
              onClick={() => setRole('admin')}
            >
              Admin
            </button>
          </div>

          {/* Form Fields */}
          {!isLogin && (
            <div className="input-group">
              <label className="label-caps">Full Name</label>
              <input 
                type="text" 
                className="auth-input body-sm" 
                placeholder="Enter your name" 
                required 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          )}

          <div className="input-group">
            <label className="label-caps">Email Address</label>
            <input 
              type="email" 
              className="auth-input body-sm" 
              placeholder="Enter your email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label className="label-caps">Password</label>
            <input 
              type="password" 
              className="auth-input body-sm" 
              placeholder="Enter your password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {isLogin && (
              <div style={{ textAlign: 'right', marginTop: '4px' }}>
                <Link to="/forgot-password" style={{ color: 'var(--neutral-text)', fontSize: '12px' }}>Forgot Password?</Link>
              </div>
            )}
          </div>

          <button type="submit" className="btn-ghost auth-submit-btn" disabled={isLoading}>
            {isLoading ? 'Processing...' : (isLogin ? 'Access Portal' : 'Create Account')}
          </button>
        </form>

        <div className="auth-footer label-caps">
          {isLogin ? (
            <span>Don't have an account? <Link to="/signup" className="auth-link">Sign Up</Link></span>
          ) : (
            <span>Already have an account? <Link to="/login" className="auth-link">Log In</Link></span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
