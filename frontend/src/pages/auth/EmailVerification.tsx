import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const EmailVerification = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const navigate = useNavigate();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    
    if (value && index < 5) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerify = () => {
    const fullCode = code.join('');
    if (fullCode.length === 6) {
      alert('Identity verified! Redirecting to login...');
      navigate('/login');
    } else {
      alert('Please enter the full 6-digit code.');
    }
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col">
      {/* TopAppBar */}
      <header className="bg-surface-container-lowest border-b border-outline-variant fixed top-0 left-0 right-0 z-50">
        <div className="flex justify-between items-center w-full px-4 md:px-10 py-4 max-w-[800px] mx-auto">
          <div className="font-headline-md text-headline-md font-bold tracking-tight text-primary">
            VOTEKINETIC
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="material-symbols-outlined text-primary hover:bg-surface-container-high p-2 rounded-full transition-colors">security</Link>
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow flex items-center justify-center pt-24 pb-12 px-4">
        <div className="max-w-[800px] w-full flex flex-col items-center">
          
          {/* Verification Module */}
          <div className="w-full max-w-md bg-surface-container-lowest border border-outline-variant p-6 md:p-10 rounded shadow-sm">
            {/* Icon Header */}
            <div className="flex justify-center mb-stack-lg">
              <div className="w-16 h-16 rounded-full bg-secondary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>mark_email_read</span>
              </div>
            </div>
            
            {/* Text Content */}
            <div className="text-center mb-stack-lg">
              <h1 className="font-headline-lg text-headline-lg text-primary mb-stack-sm">Check your inbox</h1>
              <p className="font-body-md text-body-md text-on-surface-variant">
                We've sent a 6-digit secure verification code to
              </p>
              <div className="mt-2 inline-flex items-center px-3 py-1 bg-surface-container rounded-full border border-outline-variant">
                <span className="material-symbols-outlined text-secondary text-sm mr-2">alternate_email</span>
                <span className="font-label-md text-label-md text-on-surface font-bold">m.********@voters.gov</span>
              </div>
            </div>
            
            {/* 6-Digit Code Entry */}
            <div className="flex justify-between gap-2 md:gap-3 mb-stack-lg">
              {code.map((digit, i) => (
                <input
                  key={i}
                  ref={inputRefs[i]}
                  aria-label={`Digit ${i + 1}`}
                  className="w-12 h-14 md:w-14 md:h-16 text-center font-headline-md text-headline-md border border-outline-variant rounded bg-surface focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                  maxLength={1}
                  type="text"
                  value={digit}
                  onChange={(e) => handleInput(e, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                />
              ))}
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col gap-stack-md">
              <button 
                onClick={handleVerify}
                className="w-full h-[48px] bg-secondary text-on-secondary font-label-md text-label-md rounded hover:bg-primary-container active:scale-[0.98] transition-all"
              >
                Verify Identity
              </button>
              <button className="w-full h-[48px] bg-transparent text-secondary border border-secondary font-label-md text-label-md rounded hover:bg-secondary-fixed transition-colors">
                Resend Code (45s)
              </button>
            </div>
            
            {/* Security Assurance */}
            <div className="mt-stack-lg flex items-start gap-3 p-4 bg-surface-container-low rounded border-l-4 border-secondary">
              <span className="material-symbols-outlined text-secondary mt-0.5">verified_user</span>
              <div>
                <p className="font-label-md text-label-md text-on-surface font-semibold">Secure Transmission</p>
                <p className="font-label-sm text-label-sm text-on-surface-variant">Your entry is encrypted end-to-end to ensure the integrity of the voting process.</p>
              </div>
            </div>
          </div>
          
          {/* Supporting Info */}
          <div className="mt-stack-lg text-center">
            <p className="font-body-md text-body-md text-on-surface-variant">
              Didn't receive an email? Check your spam folder or{' '}
              <a className="text-secondary hover:underline font-semibold" href="#">Contact Registrar</a>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low border-t border-outline-variant mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-4 md:px-10 py-6 gap-stack-md max-w-[800px] mx-auto">
          <div className="flex flex-col items-center md:items-start">
            <div className="font-label-md text-label-md font-semibold text-primary mb-1">VOTEKINETIC</div>
            <div className="font-label-sm text-label-sm text-on-surface-variant">© 2024 VOTEKINETIC Secure Systems. All rights reserved.</div>
          </div>
          <nav className="flex flex-wrap justify-center gap-4">
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Service</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Security Disclosure</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};
