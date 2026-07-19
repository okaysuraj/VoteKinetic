import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const BiometricUnlock = () => {
  const navigate = useNavigate();
    const [status, setStatus] = useState<'idle' | 'scanning' | 'verified'>('idle');

  const handleScan = () => {
    setStatus('scanning');
    
    // Simulate a success redirect after 2 seconds
    setTimeout(() => {
      setStatus('verified');
      
      // Final effect
      setTimeout(() => {
        navigate('/voter/dashboard');
      }, 800);
    }, 1800);
  };

  return (
    <div className="bg-[#f9f9fc] text-[#1a1c1e] min-h-screen flex flex-col items-center justify-between relative overflow-hidden">
      
      {/* Background Decorative Texture */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(at_0%_0%,_hsla(217,100%,95%,1)_0,_transparent_50%),_radial-gradient(at_100%_0%,_hsla(217,100%,98%,1)_0,_transparent_50%)]"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#001b44] blur-[120px] opacity-[0.03]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#115cb9] blur-[120px] opacity-[0.03]"></div>
      </div>

      {/* Top Bar */}
      <header className="w-full flex justify-center items-center px-4 md:px-8 h-16 transition-opacity duration-500 z-10">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[24px]">security</span>
          <h1 className="text-2xl tracking-tight font-bold text-primary">VOTEKINETIC</h1>
        </div>
      </header>

      {/* Main Biometric Canvas */}
      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-[800px] px-4 z-10">
        
        {/* Focused Unlock Section */}
        <div className="bg-white/70 backdrop-blur-md p-12 rounded-[64px] flex flex-col items-center gap-8 shadow-sm border border-outline-variant/50 w-full max-w-[400px]">
          
          {/* Icon Container with Pulse */}
          <div className="relative flex items-center justify-center">
            <div className={`absolute inset-0 bg-primary/10 rounded-full ${status === 'scanning' ? 'animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]' : 'animate-[pulse_3s_ease-in-out_infinite] scale-105 opacity-80'}`}></div>
            <div className="relative w-24 h-24 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[64px]" style={{ fontVariationSettings: "'wght' 200" }}>fingerprint</span>
            </div>
          </div>
          
          {/* Text Content */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-on-surface">Unlock with Biometrics</h2>
            <p className="text-base font-medium text-on-surface-variant max-w-xs leading-relaxed">
              Verify your identity to access your encrypted voting dashboard.
            </p>
          </div>
          
          {/* Interaction State */}
          <div className={`flex items-center gap-2 transition-opacity duration-300 ${status !== 'idle' ? 'opacity-100' : 'opacity-0'}`}>
            {status === 'scanning' ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[14px] text-primary">progress_activity</span>
                <span className="text-[14px] font-bold text-primary uppercase tracking-widest">Scanning...</span>
              </>
            ) : status === 'verified' ? (
              <>
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="text-[14px] font-bold text-secondary uppercase tracking-widest">Verified</span>
              </>
            ) : null}
          </div>
        </div>

        {/* Secondary Action */}
        <div className="mt-8 w-full flex flex-col items-center gap-4 max-w-[300px]">
          <button 
            className="w-full h-12 bg-primary text-white rounded-lg font-bold text-sm transition-all hover:bg-primary/90 active:scale-95 shadow-sm"
            onClick={handleScan}
          >
            Scan Biometrics
          </button>
          <button className="w-full h-12 border border-outline-variant text-primary rounded-lg font-bold text-sm transition-all hover:bg-surface-container-low active:opacity-80 bg-white/50 backdrop-blur-sm">
            Use Passcode
          </button>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="w-full h-24 flex flex-col items-center justify-center text-on-surface-variant pb-8 z-10">
        <div className="flex items-center gap-4 mb-2">
          <div className="flex items-center gap-1 opacity-60">
            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
            <span className="text-xs font-bold uppercase tracking-widest">End-to-End Encrypted</span>
          </div>
          <div className="w-1 h-1 bg-outline-variant rounded-full"></div>
          <div className="flex items-center gap-1 opacity-60">
            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            <span className="text-xs font-bold uppercase tracking-widest">State-Grade Security</span>
          </div>
        </div>
        <p className="text-[10px] font-mono opacity-40">Version 4.2.0-STABLE</p>
      </footer>

    </div>
  );
};
