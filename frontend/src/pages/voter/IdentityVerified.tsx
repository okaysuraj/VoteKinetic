import { useNavigate } from 'react-router-dom';

export const IdentityVerified = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f9f9fc] text-[#1a1c1e] min-h-screen flex flex-col font-sans relative overflow-hidden">
      
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#115cb9]/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-[#1e40af]/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
      </div>

      {/* TopAppBar - Suppressing Navigation for Transactional Focus */}
      <header className="w-full top-0 sticky z-50 bg-white/80 backdrop-blur-md border-b border-outline-variant transition-all">
        <div className="flex justify-between items-center px-4 md:px-10 py-4 max-w-[800px] mx-auto">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[28px]">verified_user</span>
            <span className="text-xl font-bold tracking-tight text-primary">VOTEKINETIC</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:bg-surface-container-low transition-colors p-2 rounded-full">account_circle</span>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 py-12 relative z-10 w-full">
        <div className="w-full max-w-[800px] flex flex-col items-center text-center">
          
          {/* Institutional Integrity Aesthetic: Step Tracker */}
          <div className="w-full mb-12 flex justify-center items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#16a34a] flex items-center justify-center text-white shadow-sm">
                <span className="material-symbols-outlined text-[18px]">check</span>
              </div>
              <span className="text-sm font-bold text-[#16a34a] hidden sm:block uppercase tracking-widest">Verify</span>
            </div>
            <div className="h-0.5 w-8 sm:w-12 bg-[#16a34a]"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-white shadow-sm">
                <span className="text-sm font-bold">2</span>
              </div>
              <span className="text-sm font-bold text-secondary uppercase tracking-widest">Authorized</span>
            </div>
            <div className="h-0.5 w-8 sm:w-12 bg-outline-variant"></div>
            <div className="flex items-center gap-2 opacity-40">
              <div className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center bg-white">
                <span className="text-sm font-bold text-on-surface-variant">3</span>
              </div>
              <span className="text-sm font-bold text-on-surface-variant hidden sm:block uppercase tracking-widest">Ballot</span>
            </div>
          </div>

          {/* Confirmation Core */}
          <div className="bg-white border border-outline-variant rounded-xl p-8 md:p-16 w-full flex flex-col items-center shadow-sm relative overflow-hidden">
            
            {/* Subtle Grid Background */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#115cb9 1px, transparent 1px), linear-gradient(90deg, #115cb9 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
            
            {/* Large Success Icon */}
            <div className="relative mb-8 z-10">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#f0fdf4] flex items-center justify-center animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite] border border-[#dcfce7] shadow-sm">
                <span className="material-symbols-outlined text-[48px] md:text-[64px] text-[#16a34a]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 tracking-tight z-10">
              Identity Verified
            </h1>
            <p className="text-lg font-medium text-on-surface-variant max-w-[500px] mb-10 leading-relaxed z-10">
              Your cryptographic handshake is complete. You are authorized to proceed to the secure voting terminal.
            </p>
            
            {/* Status Badge */}
            <div className="flex items-center gap-3 bg-[#eff6ff] px-4 py-2 rounded-full border border-[#bfdbfe] mb-10 z-10 shadow-sm">
              <span className="material-symbols-outlined text-[#1d4ed8] text-[18px]">lock_open</span>
              <span className="text-[10px] font-bold text-[#1e40af] tracking-widest uppercase">Session Secure: RSA-4096 / AES-256</span>
            </div>
            
            {/* Action Group */}
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto z-10">
              <button 
                className="bg-primary text-white font-bold text-sm px-10 h-14 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-3 shadow-sm active:scale-95"
                onClick={() => navigate('/voter/ballot')}
              >
                <span>Enter Voting Terminal</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
              <button className="border border-outline-variant bg-white text-primary font-bold text-sm px-10 h-14 rounded-lg hover:bg-[#f9f9fc] transition-colors flex items-center justify-center gap-3 shadow-sm active:scale-95">
                <span className="material-symbols-outlined text-[20px]">shield_with_heart</span>
                <span>View Security Audit</span>
              </button>
            </div>
            
          </div>

          {/* Footer Compliance Info */}
          <div className="mt-12 flex flex-col items-center gap-3 opacity-70">
            <div className="flex items-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px]">info</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">This session will expire in 05:00 minutes of inactivity.</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-on-surface-variant">
              <span className="text-[10px] font-bold uppercase tracking-widest">Privacy Protocol V4.2</span>
              <span className="text-[10px] font-bold opacity-50">•</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">Zero-Knowledge Proof Enabled</span>
            </div>
          </div>
          
        </div>
      </main>

    </div>
  );
};
