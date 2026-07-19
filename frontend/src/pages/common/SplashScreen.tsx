import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const SplashScreen = () => {
  const navigate = useNavigate();
  const [loadingStep, setLoadingStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const loadingSteps = [
    "Verifying biometric handshake",
    "Establishing quantum-safe tunnel",
    "Fetching distributed ledger state",
    "Syncing electoral certificates",
    "Ready for authorization"
  ];

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const nextStep = (step: number) => {
      if (step < loadingSteps.length) {
        setLoadingStep(step);
        setProgress(((step + 1) / loadingSteps.length) * 100);
        
        const nextTime = Math.random() * 800 + 400; // Faster for better UX
        timeoutId = setTimeout(() => nextStep(step + 1), nextTime);
      } else {
        setIsReady(true);
      }
    };

    timeoutId = setTimeout(() => nextStep(0), 500);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="bg-[#f9f9fc] text-[#1a1c1e] min-h-screen flex flex-col font-sans overflow-hidden">
      
      {/* Brand Header */}
      <header className="w-full top-0 sticky flex items-center justify-between px-4 md:px-10 py-4 max-w-[1200px] mx-auto z-50">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[28px]">verified_user</span>
          <span className="text-xl font-bold tracking-tight text-primary">VOTEKINETIC</span>
        </div>
      </header>

      {/* Main Splash Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 relative">
        
        {/* Abstract Background Element (Atmospheric) */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] aspect-square rounded-full border border-outline-variant/30"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-[1200px] aspect-square rounded-full border border-outline-variant/20"></div>
        </div>

        <div className="z-10 flex flex-col items-center max-w-md w-full space-y-10 animate-[fade-in_0.8s_ease-out_forwards]">
          
          {/* Hero Icon */}
          <div className="p-6 bg-[#dbeafe] rounded-full mb-6 shadow-sm">
            <span className="material-symbols-outlined text-[#1d4ed8] text-[64px]">security</span>
          </div>
          
          {/* Logo Title */}
          <h1 className="text-5xl md:text-7xl font-black text-primary tracking-tighter text-center uppercase">VOTEKINETIC</h1>
          
          {/* Status Messaging */}
          <div className="flex flex-col items-center space-y-4 text-center h-20">
            <p className="text-xl md:text-2xl font-bold text-on-surface-variant">
              Initializing Secure Tunnel
            </p>
            <div className="flex items-center gap-2 text-primary font-bold text-sm h-6">
              {isReady ? (
                <span className="text-[#16a34a] animate-[fade-in_0.3s_ease-out]">SECURE CONNECTION ESTABLISHED</span>
              ) : (
                <div className="flex items-center gap-2 transition-opacity duration-300">
                  <span>{loadingSteps[loadingStep] || ""}</span>
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Secure Progress Bar */}
          <div className="w-full h-1.5 bg-[#f0f0f3] rounded-full overflow-hidden mt-8 shadow-inner">
            <div 
              className={`h-full transition-all duration-500 ease-out ${isReady ? 'bg-[#16a34a]' : 'bg-primary'}`} 
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Action Button */}
          <div className="h-16 mt-4 flex items-center justify-center">
            {isReady && (
              <button 
                onClick={() => navigate('/login')}
                className="px-8 h-12 bg-primary text-white font-bold text-sm rounded-lg shadow-sm hover:bg-primary/90 active:scale-95 transition-all animate-[fade-in_0.5s_ease-out]"
              >
                AUTHENTICATE TO VOTE
              </button>
            )}
          </div>
          
          {/* Compliance Badge */}
          <div className="pt-12 flex items-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all">
            <div className="flex flex-col items-center">
              <span className="material-symbols-outlined text-on-surface-variant text-[24px]">lock</span>
              <span className="text-xs font-bold mt-1">AES-256</span>
            </div>
            <div className="w-px h-8 bg-outline-variant"></div>
            <div className="flex flex-col items-center">
              <span className="material-symbols-outlined text-on-surface-variant text-[24px]">gavel</span>
              <span className="text-xs font-bold mt-1">FIPS 140-2</span>
            </div>
            <div className="w-px h-8 bg-outline-variant"></div>
            <div className="flex flex-col items-center">
              <span className="material-symbols-outlined text-on-surface-variant text-[24px]">fingerprint</span>
              <span className="text-xs font-bold mt-1">SFA+</span>
            </div>
          </div>

        </div>
      </main>

      {/* Footer Component */}
      <footer className="w-full py-8 border-t border-outline-variant bg-white mt-auto z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-4 max-w-[1200px] mx-auto text-center md:text-left">
          <div className="flex flex-col md:items-start space-y-1">
            <span className="text-sm font-bold text-[#1a1c1e]">VOTEKINETIC</span>
            <span className="text-xs font-medium text-on-surface-variant">© 2024 VOTEKINETIC - Secured by State-Grade Encryption</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-xs font-medium text-on-surface-variant hover:underline underline-offset-4 hover:text-primary transition-colors">Security Audit</a>
            <a href="#" className="text-xs font-medium text-on-surface-variant hover:underline underline-offset-4 hover:text-primary transition-colors">Privacy Policy</a>
          </div>
        </div>
      </footer>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
};
