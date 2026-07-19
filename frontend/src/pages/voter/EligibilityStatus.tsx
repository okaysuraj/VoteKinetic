import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const EligibilityStatus = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleProceed = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/voter/ballot'); // Example navigation
    }, 2000);
  };

  return (
    <div className="bg-[#f9f9fc] text-[#1a1c1e] min-h-screen flex flex-col font-sans">
      
      {/* TopAppBar */}
      <header className="w-full top-0 sticky z-50 bg-white border-b border-outline-variant shadow-sm">
        <div className="flex justify-between items-center px-4 md:px-10 py-4 max-w-[1200px] mx-auto">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-[28px]" style={{ fontVariationSettings: "'FILL' 0" }}>account_balance</span>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-primary">VOTEKINETIC</h1>
          </div>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-8 items-center">
              <a href="#" className="text-sm font-bold text-on-surface-variant hover:text-primary transition-colors">Dashboard</a>
              <a href="#" className="text-sm font-bold text-primary border-b-2 border-primary py-1">Elections</a>
              <a href="#" className="text-sm font-bold text-on-surface-variant hover:text-primary transition-colors">Profile</a>
            </nav>
            <span className="material-symbols-outlined text-primary text-[24px]">security</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow w-full max-w-[800px] mx-auto px-4 py-8 md:py-12">
        
        {/* Progress Indicator */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Step 1 of 3: Verification</span>
            <span className="text-xs font-bold text-on-surface-variant">33% Complete</span>
          </div>
          <div className="w-full h-1.5 bg-[#e2e2e5] rounded-full overflow-hidden">
            <div className="w-1/3 h-full bg-secondary transition-all duration-700 ease-out"></div>
          </div>
        </div>

        {/* Status Hero Section */}
        <section className="bg-white border border-outline-variant p-8 md:p-12 text-center mb-10 rounded-xl shadow-sm">
          <div className="mb-6 flex justify-center">
            <div className="w-24 h-24 rounded-full bg-[#f0fdf4] flex items-center justify-center border-4 border-[#22c55e] shadow-sm">
              <span className="material-symbols-outlined text-[48px] text-[#16a34a]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3 tracking-tight">ELIGIBLE TO VOTE</h2>
          <p className="text-sm font-medium text-on-surface-variant max-w-md mx-auto leading-relaxed">
            Your identity and residency records have been successfully cross-referenced with the 2024 General Election database.
          </p>
        </section>

        {/* Criteria Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
          {/* Bento Item 1: Identity */}
          <div className="bg-white border border-outline-variant p-6 rounded-xl flex flex-col gap-5 hover:border-secondary transition-colors group shadow-sm">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-[#dbeafe] rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-[#1e40af] text-[20px]">fingerprint</span>
              </div>
              <span className="text-[#16a34a] text-sm font-bold flex items-center gap-1.5 uppercase tracking-widest">
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                Verified
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-primary mb-1.5">Verified Identity</h3>
              <p className="text-xs font-medium text-on-surface-variant leading-relaxed">Biometric and government ID match confirmed via secure node-encryption.</p>
            </div>
          </div>

          {/* Bento Item 2: Residency */}
          <div className="bg-white border border-outline-variant p-6 rounded-xl flex flex-col gap-5 hover:border-secondary transition-colors group shadow-sm">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-[#dbeafe] rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-[#1e40af] text-[20px]">location_on</span>
              </div>
              <span className="text-[#16a34a] text-sm font-bold flex items-center gap-1.5 uppercase tracking-widest">
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                Verified
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-primary mb-1.5">Residency Verified</h3>
              <p className="text-xs font-medium text-on-surface-variant leading-relaxed">Current address matches District 04 residential requirements.</p>
            </div>
          </div>

          {/* Bento Item 3: Registration */}
          <div className="bg-white border border-outline-variant p-6 rounded-xl flex flex-col gap-5 hover:border-secondary transition-colors group shadow-sm">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-[#dbeafe] rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-[#1e40af] text-[20px]">app_registration</span>
              </div>
              <span className="text-[#16a34a] text-sm font-bold flex items-center gap-1.5 uppercase tracking-widest">
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                Active
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-primary mb-1.5">Registration Active</h3>
              <p className="text-xs font-medium text-on-surface-variant leading-relaxed">Voter roll status is current. Last updated: Oct 22, 2024.</p>
            </div>
          </div>

          {/* Bento Item 4: Election specific */}
          <div className="bg-[#eff6ff] border-2 border-[#bfdbfe] p-6 rounded-xl flex flex-col gap-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-[#1e40af] rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-[20px]">event_available</span>
              </div>
              <span className="text-[#16a34a] text-sm font-bold flex items-center gap-1.5 uppercase tracking-widest">
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                Open
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-primary mb-1.5">2024 General Election</h3>
              <p className="text-xs font-medium text-[#1e40af] leading-relaxed">You are assigned to the Main Digital Ballot for your municipality.</p>
            </div>
          </div>

        </div>

        {/* Action Section */}
        <div className="flex flex-col gap-4 max-w-sm mx-auto mb-10">
          <button 
            className="w-full h-14 bg-primary text-white font-bold text-sm rounded-lg flex items-center justify-center gap-2 active:scale-95 transition-all hover:bg-primary/90 shadow-sm"
            onClick={handleProceed}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
                LOADING BALLOT...
              </>
            ) : (
              <>
                PROCEED TO BALLOT
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </>
            )}
          </button>
          <button className="w-full h-14 border border-outline-variant bg-white text-primary font-bold text-sm rounded-lg flex items-center justify-center hover:bg-[#f9f9fc] transition-colors shadow-sm">
            VIEW REGISTRATION DETAILS
          </button>
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 py-4 border-t border-outline-variant max-w-sm mx-auto">
          <span className="material-symbols-outlined text-on-surface-variant text-[20px]">verified_user</span>
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-80">End-to-End Verifiable Protocol</span>
        </div>

      </main>

      {/* BottomNavBar */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center h-16 px-4 bg-white border-t border-outline-variant z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pb-safe">
        <a href="#" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors w-full h-full active:scale-95">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px] font-bold mt-1">Dashboard</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center bg-[#dbeafe] text-[#1e40af] rounded-full px-5 py-1 w-full h-full max-w-[80px] font-bold transition-colors active:scale-95">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>how_to_vote</span>
          <span className="text-[10px] font-bold mt-1">Elections</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors w-full h-full active:scale-95">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-bold mt-1">Profile</span>
        </a>
      </nav>

    </div>
  );
};
