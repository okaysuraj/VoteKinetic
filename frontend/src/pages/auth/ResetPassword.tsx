import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const requirements = {
    length: password.length >= 12,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password)
  };

  const allMet = Object.values(requirements).every(Boolean);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (allMet && password === confirmPassword) {
      alert('Password successfully reset (mock).');
      // Navigate to login or show success modal
    } else {
      alert('Please ensure all requirements are met and passwords match.');
    }
  };

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col">
      {/* TopAppBar */}
      <header className="bg-surface-container-lowest border-b border-outline-variant sticky top-0 z-50">
        <div className="flex justify-between items-center w-full px-4 md:px-10 py-4 max-w-[800px] mx-auto">
          <div className="font-headline-md text-headline-md font-bold tracking-tight text-primary">
            VOTEKINETIC
          </div>
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-primary">security</span>
          </div>
        </div>
      </header>
      
      <main className="flex-grow flex items-center justify-center py-stack-lg px-4 md:px-10">
        <div className="w-full max-w-[800px] flex flex-col gap-stack-lg">
          {/* Page Header */}
          <div className="text-center space-y-stack-sm">
            <h1 className="font-headline-lg text-headline-lg text-primary">Reset Your Password</h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto">
              Ensure your account remains secure by choosing a password that meets our institution-grade security standards.
            </p>
          </div>
          
          {/* Main Layout (Card-based) */}
          <form className="grid grid-cols-1 md:grid-cols-5 gap-gutter items-start" onSubmit={handleSubmit}>
            {/* Reset Form Card */}
            <div className="md:col-span-3 bg-surface-container-lowest border border-outline-variant p-6 md:p-10 shadow-sm rounded-lg flex flex-col gap-stack-md">
              <div className="space-y-stack-sm">
                <label className="block font-label-md text-label-md text-on-surface" htmlFor="new-password">New Password</label>
                <div className="relative focus-within:ring-2 focus-within:ring-secondary rounded-lg">
                  <input 
                    className="w-full h-12 px-4 border border-outline-variant bg-surface-bright rounded-lg font-body-md text-body-md focus:outline-none transition-all" 
                    id="new-password" 
                    placeholder="Enter new password" 
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors" 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>
              <div className="space-y-stack-sm">
                <label className="block font-label-md text-label-md text-on-surface" htmlFor="confirm-password">Confirm New Password</label>
                <div className="relative focus-within:ring-2 focus-within:ring-secondary rounded-lg">
                  <input 
                    className="w-full h-12 px-4 border border-outline-variant bg-surface-bright rounded-lg font-body-md text-body-md focus:outline-none transition-all" 
                    id="confirm-password" 
                    placeholder="Confirm new password" 
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors" 
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <span className="material-symbols-outlined">{showConfirmPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>
              <button 
                className="mt-4 w-full h-12 bg-primary text-on-primary font-label-md text-label-md rounded-lg flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all disabled:opacity-50"
                type="submit"
                disabled={!allMet || password !== confirmPassword}
              >
                Update Security Credentials
              </button>
              <Link className="text-center font-label-md text-label-md text-secondary hover:underline transition-all mt-2" to="/login">
                Back to Login
              </Link>
            </div>
            
            {/* Security Checklist Card */}
            <div className="md:col-span-2 bg-surface-container-low border border-outline-variant p-stack-md rounded-lg flex flex-col gap-stack-md">
              <h3 className="font-label-md text-label-md text-primary uppercase tracking-wider">Security Requirements</h3>
              <ul className="space-y-stack-sm">
                <li className={`flex items-start gap-3 ${requirements.length ? 'text-secondary' : 'text-on-surface-variant'}`}>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: requirements.length ? "'FILL' 1" : "'FILL' 0" }}>
                    {requirements.length ? 'check_circle' : 'circle'}
                  </span>
                  <span className="font-label-md text-label-md leading-tight">Minimum 12 characters length</span>
                </li>
                <li className={`flex items-start gap-3 ${requirements.upper ? 'text-secondary' : 'text-on-surface-variant'}`}>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: requirements.upper ? "'FILL' 1" : "'FILL' 0" }}>
                    {requirements.upper ? 'check_circle' : 'circle'}
                  </span>
                  <span className="font-label-md text-label-md leading-tight">Include at least one uppercase letter</span>
                </li>
                <li className={`flex items-start gap-3 ${requirements.lower ? 'text-secondary' : 'text-on-surface-variant'}`}>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: requirements.lower ? "'FILL' 1" : "'FILL' 0" }}>
                    {requirements.lower ? 'check_circle' : 'circle'}
                  </span>
                  <span className="font-label-md text-label-md leading-tight">Include at least one lowercase letter</span>
                </li>
                <li className={`flex items-start gap-3 ${requirements.number ? 'text-secondary' : 'text-on-surface-variant'}`}>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: requirements.number ? "'FILL' 1" : "'FILL' 0" }}>
                    {requirements.number ? 'check_circle' : 'circle'}
                  </span>
                  <span className="font-label-md text-label-md leading-tight">Include at least one numerical digit</span>
                </li>
                <li className={`flex items-start gap-3 ${requirements.special ? 'text-secondary' : 'text-on-surface-variant'}`}>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: requirements.special ? "'FILL' 1" : "'FILL' 0" }}>
                    {requirements.special ? 'check_circle' : 'circle'}
                  </span>
                  <span className="font-label-md text-label-md leading-tight">Include one special symbol (#, $, %, etc.)</span>
                </li>
              </ul>
              <div className="mt-stack-sm p-4 bg-surface-container-high rounded-lg border border-outline-variant">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">Your password is encrypted locally before being transmitted to our secure servers.</p>
                </div>
              </div>
            </div>
          </form>
          
          {/* Footer Branding Section */}
          <div className="mt-stack-lg border-t border-outline-variant pt-stack-md flex flex-col md:flex-row justify-between items-center opacity-70">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <span className="material-symbols-outlined text-primary">verified_user</span>
              <span className="font-label-md text-label-md text-primary font-semibold">Institutional Grade Encryption</span>
            </div>
            <div className="text-right">
              <p className="font-label-sm text-label-sm text-on-surface-variant">System Status: <span className="text-secondary font-bold">OPTIMAL</span></p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low border-t border-outline-variant mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-4 md:px-10 py-6 gap-stack-md max-w-[800px] mx-auto">
          <div className="font-label-md text-label-md font-semibold text-primary">VOTEKINETIC</div>
          <div className="flex flex-wrap justify-center gap-4">
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Service</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Security Disclosure</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Help Center</a>
          </div>
          <div className="font-label-sm text-label-sm text-on-surface-variant text-center md:text-left">
            © 2024 VOTEKINETIC Secure Systems. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
