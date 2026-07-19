import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const VoteSubmittedSuccess = () => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animation shortly after mount
    setTimeout(() => {
      setAnimate(true);
    }, 100);
  }, []);

  return (
    <div className="bg-[#f9f9fc] text-[#1a1c1e] min-h-screen flex flex-col font-sans">
      
      {/* Top Navigation Shell */}
      <header className="w-full top-0 sticky bg-white border-b border-outline-variant z-50 shadow-sm">
        <div className="flex justify-between items-center px-4 md:px-10 py-4 max-w-[1200px] mx-auto">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[28px]">verified_user</span>
            <span className="text-xl font-bold tracking-tight text-primary">VOTEKINETIC</span>
          </div>
          <div className="flex items-center">
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:bg-[#f0f0f3] transition-colors p-2 rounded-full text-[28px]">account_circle</span>
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12 max-w-[800px] mx-auto w-full relative">
        
        {/* Decorative Subtle Pattern */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-[-1]" style={{ backgroundImage: "radial-gradient(#0f172a 1px, transparent 0)", backgroundSize: "40px 40px" }}></div>
        
        <div className={`w-full flex flex-col items-center text-center space-y-8 transition-all duration-700 ease-out ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Success Visual: Ballot Box */}
          <div className="relative w-48 h-48 mb-6 flex items-center justify-center">
            <div className="absolute inset-0 bg-[#dbeafe] rounded-full opacity-50 scale-110 animate-[pulse_3s_infinite]"></div>
            <div className={`z-10 bg-white rounded-2xl border border-outline-variant p-8 shadow-sm transition-transform duration-500 ${animate ? 'scale-105' : 'scale-100'}`}>
              <span className="material-symbols-outlined text-primary text-[80px]" style={{ fontVariationSettings: "'FILL' 1" }}>how_to_vote</span>
            </div>
            {/* Success Badge Overlay */}
            <div className="absolute bottom-4 right-4 bg-secondary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
              <span className="material-symbols-outlined text-[24px]">check</span>
            </div>
          </div>
          
          {/* Header Section */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
              Vote Cast Successfully
            </h1>
            <p className="text-base md:text-lg font-medium text-on-surface-variant max-w-[600px] mx-auto leading-relaxed">
              Your vote has been cryptographically recorded on the <span className="font-bold text-primary">VOTEKINETIC</span> ledger. This ensures your selection is tamper-proof and verifiable.
            </p>
          </div>

          {/* Receipt Info Card */}
          <div className="w-full bg-white border border-outline-variant p-6 rounded-xl flex flex-col md:flex-row items-center gap-6 text-left mt-8 shadow-sm">
            <div className="bg-[#f0f0f3] p-4 rounded-xl shrink-0">
              <span className="material-symbols-outlined text-primary text-[32px]">receipt_long</span>
            </div>
            <div className="flex-grow space-y-2 text-center md:text-left">
              <h3 className="text-sm font-bold text-primary uppercase tracking-widest">Voter Receipt Generated</h3>
              <p className="text-base font-medium text-[#1a1c1e]">
                Receipt ID: <code className="bg-[#f9f9fc] px-2.5 py-1 rounded-md text-primary font-mono text-sm border border-outline-variant ml-2 font-bold">VK-7729-BX-104</code>
              </p>
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mt-2">
                Recorded: October 24, 2024 • 14:32:01 UTC
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 w-full pt-8">
            <button className="flex-1 h-14 bg-primary text-white font-bold text-sm px-8 rounded-xl hover:bg-primary/90 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-sm">
              <span className="material-symbols-outlined text-[20px]">description</span>
              View Receipt
            </button>
            <button 
              onClick={() => navigate('/voter/dashboard')}
              className="flex-1 h-14 border border-outline-variant bg-white text-[#1a1c1e] font-bold text-sm px-8 rounded-xl hover:bg-[#f9f9fc] transition-all active:scale-95 flex items-center justify-center gap-2 shadow-sm"
            >
              <span className="material-symbols-outlined text-[20px]">dashboard</span>
              Return to Dashboard
            </button>
          </div>

          {/* Security Footer */}
          <div className="pt-10 flex items-center justify-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
            <span className="text-xs font-bold uppercase tracking-widest">End-to-End Encrypted Session</span>
          </div>

        </div>
      </main>

      {/* Bottom Navigation Shell - Mobile Optimized (Hidden on Desktop) */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 flex justify-around items-center bg-white border-t border-outline-variant shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] h-16 pb-safe">
        <div className="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:text-primary transition-all flex-1 h-full active:scale-95">
          <span className="material-symbols-outlined">ballot</span>
          <span className="text-[10px] font-bold mt-1">Election</span>
        </div>
        <div className="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:text-primary transition-all flex-1 h-full active:scale-95">
          <span className="material-symbols-outlined">fingerprint</span>
          <span className="text-[10px] font-bold mt-1">Identity</span>
        </div>
        {/* Active History Tab */}
        <div className="flex flex-col items-center justify-center bg-[#dbeafe] text-[#1e40af] rounded-full px-5 py-1 flex-1 h-full max-w-[80px] active:scale-95 font-bold">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>receipt_long</span>
          <span className="text-[10px] font-bold mt-1">History</span>
        </div>
        <div className="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:text-primary transition-all flex-1 h-full active:scale-95">
          <span className="material-symbols-outlined">help_outline</span>
          <span className="text-[10px] font-bold mt-1">Support</span>
        </div>
      </nav>

    </div>
  );
};
