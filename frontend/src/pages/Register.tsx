import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Assuming "Security Phrase" is password
  const [confirmId, setConfirmId] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!confirmId) {
      setError('Please confirm your identity by checking the declaration box.');
      return;
    }

    setIsLoading(true);
    try {
      await register(email, password);
      // Wait for 1.5s to show verified state as per mockup then navigate
      setTimeout(() => {
        navigate('/verification'); // Assuming there is a verification status page next
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'An error occurred during registration.');
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col">
      {/* TopAppBar */}
      <header className="bg-surface-container-lowest dark:bg-on-surface border-b border-outline-variant dark:border-outline fixed top-0 left-0 right-0 z-50">
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-[800px] mx-auto">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <span className="font-headline-md text-headline-md font-bold tracking-tight text-primary dark:text-primary-fixed-dim">VOTEKINETIC</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="material-symbols-outlined p-2 rounded-full hover:bg-surface-container-high dark:hover:bg-surface-container transition-colors text-on-surface-variant">security</button>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-margin-mobile md:px-margin-desktop pt-24 pb-12">
        <div className="w-full max-w-[800px] flex flex-col items-center">
          
          {/* Multi-step Indicator */}
          <div className="w-full flex justify-between items-center mb-stack-lg relative px-4">
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-outline-variant -translate-y-1/2 z-0"></div>
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-surface-container-lowest border-2 border-secondary flex items-center justify-center text-secondary font-bold shadow-sm">1</div>
              <span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider">Start</span>
            </div>
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-surface-container-lowest border-2 border-outline-variant flex items-center justify-center text-on-surface-variant font-medium">2</div>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Confirm</span>
            </div>
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-surface-container-lowest border-2 border-outline-variant flex items-center justify-center text-on-surface-variant font-medium">3</div>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Cast</span>
            </div>
          </div>

          {/* Verification Card */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg w-full max-w-[600px] overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
            <div className="p-stack-lg border-b border-outline-variant">
              <h1 className="font-headline-lg text-headline-lg text-primary mb-2 text-center">Begin Verification</h1>
              <p className="font-body-md text-body-md text-on-surface-variant text-center">Establish your identity within the secure kinetic voting perimeter.</p>
            </div>
            
            <form className="p-stack-lg flex flex-col gap-stack-md" onSubmit={handleSubmit}>
              {/* Official Email */}
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="email">Official Email Address</label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-secondary transition-colors">mail</span>
                  <input 
                    className="w-full h-12 pl-12 pr-4 bg-surface-container-low border border-outline-variant rounded-lg focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all font-body-md text-on-surface" 
                    id="email" 
                    name="email" 
                    placeholder="e.g. j.doe@institutional.gov" 
                    required 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <p className="font-label-sm text-label-sm text-on-surface-variant">Use the address registered with your governing body.</p>
              </div>

              {/* Security Phrase */}
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="phrase">Security Phrase</label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-secondary transition-colors">lock_open</span>
                  <input 
                    className="w-full h-12 pl-12 pr-4 bg-surface-container-low border border-outline-variant rounded-lg focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all font-body-md text-on-surface" 
                    id="phrase" 
                    name="phrase" 
                    placeholder="••••••••••••••••" 
                    required 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <p className="font-label-sm text-label-sm text-on-surface-variant">A phrase known only to you and the registrar.</p>
              </div>

              {/* Identity Verification Checkbox */}
              <div className="mt-stack-sm p-4 bg-surface-container-low rounded-lg border border-outline-variant group hover:border-secondary transition-colors">
                <label className="flex items-start gap-4 cursor-pointer">
                  <div className="relative flex items-center justify-center mt-1">
                    <input 
                      className="peer appearance-none w-5 h-5 border-2 border-outline rounded-sm checked:bg-secondary checked:border-secondary transition-all cursor-pointer" 
                      id="verify_id" 
                      type="checkbox"
                      checked={confirmId}
                      onChange={(e) => setConfirmId(e.target.checked)}
                    />
                    <span className="material-symbols-outlined absolute text-white scale-0 peer-checked:scale-100 transition-transform pointer-events-none text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-on-surface">I confirm this identity is my own</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant leading-relaxed">By checking this, I declare under penalty of perjury that I am the authorized user of the provided credentials.</span>
                  </div>
                </label>
              </div>

              {error && <p className="text-error text-label-sm font-label-sm">{error}</p>}

              {/* Action Button */}
              <button 
                className={`w-full h-12 ${isLoading ? 'bg-secondary opacity-80' : 'bg-primary hover:bg-primary-container'} text-on-primary font-label-md text-label-md rounded-lg mt-stack-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-md`} 
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Validating Credentials...
                  </span>
                ) : (
                  <>
                    <span>Continue to Identity Sync</span>
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </>
                )}
              </button>
              
              <div className="flex items-center justify-center gap-2 mt-4">
                <span className="material-symbols-outlined text-outline text-sm">verified_user</span>
                <span className="font-label-sm text-label-sm text-outline">End-to-end Encrypted Session</span>
              </div>
            </form>
          </div>

          {/* Supporting Information */}
          <div className="mt-stack-lg grid grid-cols-1 md:grid-cols-2 gap-gutter w-full max-w-[800px]">
            <div className="bg-surface-container-low p-stack-md rounded-xl border border-outline-variant flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-secondary">help</span>
              </div>
              <div>
                <h3 className="font-label-md text-label-md text-on-surface mb-1">Already registered?</h3>
                <Link to="/login" className="font-label-sm text-label-sm text-secondary hover:underline">Log in to the secure portal</Link>
              </div>
            </div>
            <div className="bg-surface-container-low p-stack-md rounded-xl border border-outline-variant flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-secondary">shield</span>
              </div>
              <div>
                <h3 className="font-label-md text-label-md text-on-surface mb-1">Privacy Guarantee</h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant">No biometric data is stored on VOTEKINETIC servers during the verification process.</p>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low dark:bg-surface-dim border-t border-outline-variant dark:border-outline mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center w-full p-margin-mobile md:p-margin-desktop gap-stack-md max-w-[800px] mx-auto">
          <div className="flex flex-col gap-1 items-center md:items-start">
            <span className="font-label-md text-label-md font-semibold text-primary">VOTEKINETIC</span>
            <span className="font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant opacity-70">© 2024 VOTEKINETIC Secure Systems. All rights reserved.</span>
          </div>
          <nav className="flex gap-4">
            <a className="font-label-sm text-label-sm text-on-surface-variant dark:text-on-tertiary-fixed-variant hover:text-primary dark:hover:text-primary-fixed transition-colors" href="#">Privacy Policy</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant dark:text-on-tertiary-fixed-variant hover:text-primary dark:hover:text-primary-fixed transition-colors" href="#">Terms of Service</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant dark:text-on-tertiary-fixed-variant hover:text-primary dark:hover:text-primary-fixed transition-colors" href="#">Security Disclosure</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};
