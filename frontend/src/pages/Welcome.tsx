import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const Welcome = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex-grow pt-24 pb-16 flex flex-col items-center justify-center relative min-h-[80vh]">
      {/* Background Imagery */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-10 pointer-events-none">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBqpUNT858c8CmB62tQoUk5zZo1alnHFh7Fw_YtYPeAqW-ItFUwgdJC_Dgzu0goDsU1RhDYhdR1YXKJgRvqOqg_OC55jCiAS9Z6rsUBDACY5_4H79c9lBXx27yXmiY9Nbb4YH55UdKElnfEoNuTGtiHuIWhjjbAWHfbHA8zQ_UN42VLoxON53DgbgBbX5GqfzlI2Tm3C_b5WGMCRF8kAyD4Bna88kaB4cPg8EiC-Jb8RChVb7NAS7OCDg')",
            transform: `translateY(${scrollY * 0.1}px)`
          }}
        />
      </div>

      <section className="relative z-10 w-full max-w-[800px] px-margin-mobile md:px-margin-desktop text-center">
        {/* Institutional Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full border border-outline-variant bg-surface-container-low">
          <span className="material-symbols-outlined text-[18px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
          <span className="font-label-md text-label-md text-on-surface-variant tracking-wider uppercase">Official State-Grade Voting Terminal</span>
        </div>

        {/* Hero Headline */}
        <h1 className="font-display-lg text-display-lg text-primary mb-stack-md leading-tight">
          THE STANDARD FOR <br/> DIGITAL SOVEREIGNTY
        </h1>
        
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[600px] mx-auto mb-stack-lg">
          Access your democratic rights through an end-to-end encrypted ecosystem. Secure, anonymous, and immutable infrastructure for the modern citizen.
        </p>

        {/* Action Paths */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter mt-stack-lg">
          {/* Path 1: Register */}
          <div 
            className="group p-stack-lg border border-outline-variant bg-surface-container-lowest hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer rounded-lg flex flex-col items-start text-left"
            onClick={() => navigate('/register')}
          >
            <div className="w-12 h-12 bg-primary-container text-on-primary-container flex items-center justify-center rounded-lg mb-4">
              <span className="material-symbols-outlined group-hover:-translate-y-0.5 transition-transform">person_add</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-primary mb-2">Register Identity</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6">
              Establish your secure voting credentials using decentralized biometric verification.
            </p>
            <button className="mt-auto w-full py-3 bg-primary text-on-primary font-label-md text-label-md rounded shadow-sm hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2">
              Get Started <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>

          {/* Path 2: Access */}
          <div 
            className="group p-stack-lg border-2 border-primary bg-secondary-fixed/10 hover:bg-secondary-fixed/20 transition-all duration-300 cursor-pointer rounded-lg flex flex-col items-start text-left"
            onClick={() => navigate('/login')}
          >
            <div className="w-12 h-12 bg-primary text-on-primary flex items-center justify-center rounded-lg mb-4">
              <span className="material-symbols-outlined group-hover:-translate-y-0.5 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>login</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-primary mb-2">Access Portal</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6">
              Authorized users can sign in here to manage ballots and view active election cycles.
            </p>
            <button className="mt-auto w-full py-3 bg-primary text-on-primary font-label-md text-label-md rounded shadow-sm hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2">
              Enter Portal <span className="material-symbols-outlined text-[18px]">lock_open</span>
            </button>
          </div>
        </div>

        {/* Trust Markers */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-stack-lg opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">encrypted</span>
            <span className="font-label-sm text-label-sm font-semibold tracking-widest uppercase">AES-256 Encrypted</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">account_balance</span>
            <span className="font-label-sm text-label-sm font-semibold tracking-widest uppercase">State Certified</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">history_edu</span>
            <span className="font-label-sm text-label-sm font-semibold tracking-widest uppercase">Immutable Ledger</span>
          </div>
        </div>
      </section>
    </div>
  );
};
