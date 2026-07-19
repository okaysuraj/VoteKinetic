import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In a real app, send API request to trigger password reset email here
      setShowModal(true);
    }
  };

  return (
    <div className="bg-background text-on-surface flex flex-col min-h-screen">
      {/* TopAppBar */}
      <header className="bg-surface-container-lowest border-b border-outline-variant sticky top-0 z-50">
        <div className="flex justify-between items-center w-full px-4 md:px-10 py-4 max-w-[800px] mx-auto">
          <div className="flex items-center gap-2">
            <span className="font-headline-md text-headline-md font-bold tracking-tight text-primary">VOTEKINETIC</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="material-symbols-outlined text-primary hover:bg-surface-container-high p-2 rounded-full transition-colors">security</Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-10 py-stack-lg">
        {/* Focused Recovery Card */}
        <div className="w-full max-w-[480px] bg-white border border-outline-variant rounded-lg p-8 md:p-12 shadow-sm animate-fade-in">
          
          {/* Header Section */}
          <div className="text-center mb-stack-lg">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary-fixed text-on-secondary-fixed mb-stack-md">
              <span className="material-symbols-outlined text-[32px]">lock_reset</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-primary mb-2">Recover Access</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Enter your verified institutional credentials to receive a secure recovery link.
            </p>
          </div>

          {/* Form Section */}
          <form className="space-y-stack-md" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="block font-label-md text-label-md text-on-surface" htmlFor="email">Institutional Email Address</label>
              <div className="relative group focus-within:ring-2 focus-within:ring-secondary rounded-lg overflow-hidden border border-outline-variant transition-all">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant">mail</span>
                <input 
                  className="w-full pl-12 pr-4 py-3 bg-surface text-on-surface border-none focus:ring-0 font-body-md outline-none" 
                  id="email" 
                  name="email" 
                  placeholder="e.g. j.doe@institution.gov" 
                  required 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">Recovery links expire after 15 minutes of inactivity.</p>
            </div>
            <button className="w-full h-[48px] bg-secondary text-on-secondary font-label-md rounded-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2" type="submit">
              <span className="material-symbols-outlined">send</span>
              Send Recovery Link
            </button>
          </form>

          {/* Support & Back Links */}
          <div className="mt-stack-lg pt-stack-lg border-t border-outline-variant flex flex-col gap-4 items-center">
            <Link className="font-label-md text-secondary hover:underline flex items-center gap-1 group" to="/login">
              <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
              Back to Secure Login
            </Link>
            
            <div className="bg-surface-container-low p-4 rounded-lg w-full flex items-start gap-3">
              <span className="material-symbols-outlined text-secondary">info</span>
              <div>
                <h4 className="font-label-md text-on-surface">Need immediate assistance?</h4>
                <p className="font-label-sm text-on-surface-variant">Contact the 24/7 Election Security Desk at <a className="text-secondary underline" href="mailto:support@votekenetic.gov">support@votekenetic.gov</a> or call your local administrator.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Security Notice */}
        <div className="max-w-[480px] mt-stack-md flex items-center gap-2 px-4">
          <span className="material-symbols-outlined text-on-surface-variant text-[16px]">verified_user</span>
          <p className="font-label-sm text-label-sm text-on-surface-variant text-center">
            This session is encrypted with SHA-256 protocols. Your IP address and biometric hash are logged for audit purposes.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low border-t border-outline-variant mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-4 md:px-10 py-6 gap-stack-md max-w-[800px] mx-auto">
          <div className="flex flex-col md:items-start items-center">
            <span className="font-label-md text-label-md font-semibold text-primary">VOTEKINETIC</span>
            <p className="font-label-sm text-label-sm text-on-surface-variant mt-1 text-center md:text-left">© 2024 VOTEKINETIC Secure Systems. All rights reserved.</p>
          </div>
          <nav className="flex flex-wrap justify-center gap-4">
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Service</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Security Disclosure</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Help Center</a>
          </nav>
        </div>
      </footer>

      {/* Simple Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-primary/20 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white border border-outline-variant rounded-xl p-8 max-w-[400px] w-full text-center shadow-lg transform transition-all scale-100 opacity-100">
            <div className="w-16 h-16 bg-secondary-container rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-on-secondary-container text-[32px]">check_circle</span>
            </div>
            <h2 className="font-headline-md text-headline-md text-primary mb-2">Request Processed</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-stack-lg">
              If the email provided is associated with an active voting account, a secure recovery link has been dispatched.
            </p>
            <button 
              className="w-full py-3 bg-primary text-on-primary font-label-md rounded-lg hover:brightness-125 transition-all" 
              onClick={() => setShowModal(false)}
            >
              Return to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
