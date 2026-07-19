import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard'); 
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      {/* TopAppBar */}
      <header className="bg-surface-container-lowest dark:bg-on-surface border-b border-outline-variant dark:border-outline fixed top-0 w-full z-50">
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-[800px] mx-auto">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <span className="material-symbols-outlined text-primary font-bold text-3xl">account_balance</span>
            <span className="font-headline-md text-headline-md font-bold tracking-tight text-primary dark:text-primary-fixed-dim">VOTEKINETIC</span>
          </div>
          <div className="flex items-center gap-stack-md">
            <span className="material-symbols-outlined text-primary dark:text-primary-fixed">security</span>
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow flex flex-col items-center justify-center pt-24 pb-12 px-margin-mobile">
        {/* Instructional Heading */}
        <div className="w-full max-w-[440px] text-center mb-stack-lg">
          <h1 className="font-display-lg text-display-lg text-primary mb-2">Secure Access</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Please authenticate to access your digital ballot.</p>
        </div>

        {/* Login Card */}
        <div className="bg-surface-container-lowest w-full max-w-[440px] p-stack-lg rounded-lg border border-outline-variant shadow-sm relative overflow-hidden" style={{ borderLeft: '4px solid #001b44' }}>
          
          {/* Security Badge */}
          <div className="flex items-center justify-center gap-2 mb-stack-lg bg-surface-container-low py-2 rounded-full border border-outline-variant/30">
            <span className="material-symbols-outlined text-[18px] text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">End-to-End Encrypted</span>
          </div>

          <form className="space-y-gutter" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="space-y-unit">
              <label className="font-label-md text-label-md text-on-surface block" htmlFor="email">Email Address</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">mail</span>
                <input 
                  className="w-full h-12 pl-10 pr-4 border border-outline-variant rounded-lg bg-surface focus:ring-2 focus:ring-secondary focus:border-secondary transition-all font-body-md text-body-md focus:outline-none" 
                  id="email" 
                  name="email" 
                  placeholder="e.g. citizen@domain.gov" 
                  required 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-unit">
              <div className="flex justify-between items-center">
                <label className="font-label-md text-label-md text-on-surface block" htmlFor="password">Password</label>
                <Link to="/forgot-password" className="font-label-sm text-label-sm text-secondary hover:underline transition-all">Forgot Password?</Link>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">key</span>
                <input 
                  className="w-full h-12 pl-10 pr-4 border border-outline-variant rounded-lg bg-surface focus:ring-2 focus:ring-secondary focus:border-secondary transition-all font-body-md text-body-md focus:outline-none" 
                  id="password" 
                  name="password" 
                  placeholder="••••••••••••" 
                  required 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            
            {error && <p className="text-error text-label-sm font-label-sm">{error}</p>}

            {/* Secure Login Button */}
            <button 
              className="w-full h-[48px] bg-primary text-on-primary font-label-md text-label-md rounded-lg flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-md mt-4 disabled:opacity-70" 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Authenticating...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">verified_user</span>
                  Secure Login
                </>
              )}
            </button>
            <div className="text-center mt-4">
               <span className="font-label-sm text-on-surface-variant">Don't have an account? </span>
               <Link to="/register" className="font-label-sm text-secondary hover:underline transition-all">Register Identity</Link>
            </div>
          </form>

          {/* Verification Info */}
          <div className="mt-stack-lg pt-stack-md border-t border-outline-variant flex gap-stack-sm items-start opacity-70">
            <span className="material-symbols-outlined text-on-surface-variant text-[20px]">info</span>
            <p className="font-label-sm text-label-sm text-on-surface-variant leading-relaxed">
              By logging in, you acknowledge that this is a restricted government system. Unauthorized access is subject to monitoring and legal action.
            </p>
          </div>
        </div>

        {/* System Status Component */}
        <div className="mt-stack-lg flex items-center gap-4 py-3 px-6 bg-surface-container-low rounded-full border border-outline-variant/20">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">System Online</span>
          </div>
          <div className="h-4 w-[1px] bg-outline-variant"></div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant">public</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">Global Sync: Active</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low dark:bg-surface-dim border-t border-outline-variant dark:border-outline w-full mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center w-full p-margin-mobile md:p-margin-desktop gap-stack-md max-w-[800px] mx-auto">
          <div className="flex flex-col items-center md:items-start">
            <span className="font-label-md text-label-md font-semibold text-primary">VOTEKINETIC</span>
            <p className="font-label-sm text-label-sm text-on-surface-variant">© 2024 VOTEKINETIC Secure Systems. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-gutter">
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Service</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Security Disclosure</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Help Center</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
