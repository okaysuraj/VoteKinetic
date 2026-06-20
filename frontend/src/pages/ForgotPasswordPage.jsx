import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate backend request
    console.log('Password reset requested for:', email);
    setSubmitted(true);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2 className="display-lg auth-title" style={{ fontSize: '32px' }}>Reset Password</h2>
        
        {submitted ? (
          <div style={{ textAlign: 'center', color: 'var(--pure-white)' }}>
            <p className="body-lg" style={{ marginBottom: '24px' }}>
              If an account exists for <strong style={{ color: 'var(--cyan-accent)' }}>{email}</strong>, you will receive password reset instructions.
            </p>
            <Link to="/login" className="btn-ghost" style={{ textDecoration: 'none', display: 'inline-block' }}>
              Return to Login
            </Link>
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit}>
            <p className="body-sm" style={{ color: 'var(--neutral-text)', textAlign: 'center' }}>
              Enter your email address and we'll send you instructions to reset your password.
            </p>
            
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

            <button type="submit" className="btn-ghost auth-submit-btn">
              Send Reset Link
            </button>
          </form>
        )}

        {!submitted && (
          <div className="auth-footer label-caps" style={{ marginTop: '16px' }}>
            <Link to="/login" className="auth-link">Back to Login</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
