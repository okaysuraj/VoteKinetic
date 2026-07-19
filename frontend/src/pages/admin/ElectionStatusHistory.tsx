import { useNavigate } from 'react-router-dom';

export const ElectionStatusHistory = () => {
  const navigate = useNavigate();

  return (
    <div className="flex bg-[#f9f9fc] text-[#1a1c1e] min-h-screen font-sans">
      
      {/* NavigationDrawer (Desktop Only) */}
      <aside className="hidden md:flex fixed inset-y-0 left-0 z-50 flex-col w-[280px] bg-white border-r border-outline-variant shadow-sm h-full">
        <div className="p-6 border-b border-outline-variant">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary text-[28px]">how_to_vote</span>
            <h2 className="text-xl font-bold text-primary tracking-tight">VOTEKINETIC</h2>
          </div>
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Admin Workspace</p>
        </div>
        
        <nav className="flex-grow overflow-y-auto py-4 px-2 space-y-1">
          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-full hover:bg-[#f0f0f3] text-on-surface-variant transition-colors group">
            <span className="material-symbols-outlined text-[20px] group-hover:text-primary">groups</span>
            <span className="text-sm font-bold group-hover:text-primary transition-colors">Candidates</span>
          </button>
          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-full hover:bg-[#f0f0f3] text-on-surface-variant transition-colors group">
            <span className="material-symbols-outlined text-[20px] group-hover:text-primary">person_add</span>
            <span className="text-sm font-bold group-hover:text-primary transition-colors">Registration</span>
          </button>
          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-full hover:bg-[#f0f0f3] text-on-surface-variant transition-colors group">
            <span className="material-symbols-outlined text-[20px] group-hover:text-primary">sort</span>
            <span className="text-sm font-bold group-hover:text-primary transition-colors">Ordering</span>
          </button>
          
          <div className="my-2 border-t border-outline-variant mx-4"></div>
          
          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-full bg-[#dbeafe] text-[#1e40af] transition-colors">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>history</span>
            <span className="text-sm font-bold">Status History</span>
          </button>
          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-full hover:bg-[#f0f0f3] text-on-surface-variant transition-colors group">
            <span className="material-symbols-outlined text-[20px] group-hover:text-primary">visibility</span>
            <span className="text-sm font-bold group-hover:text-primary transition-colors">Preview</span>
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-[280px] w-full max-w-[1000px] mx-auto p-4 md:p-8 pb-24 md:pb-8">
        
        {/* Header */}
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-outline-variant pb-6 pt-4 md:pt-0">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <button 
                className="w-8 h-8 rounded-full bg-white border border-outline-variant flex items-center justify-center hover:bg-[#f0f0f3] transition-colors shadow-sm active:scale-95"
                onClick={() => navigate(-1)}
              >
                <span className="material-symbols-outlined text-[20px] text-on-surface-variant">arrow_back</span>
              </button>
              <span className="text-sm font-bold text-on-surface-variant">Back to Setup</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2 tracking-tight">Audit Trail: 2024 General Election</h1>
            <p className="text-sm font-medium text-on-surface-variant max-w-2xl leading-relaxed">
              Cryptographically secured log of all state transitions and critical administrative actions.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-outline-variant shadow-sm">
            <span className="material-symbols-outlined text-[#16a34a] text-[18px]">verified_user</span>
            <span className="text-[10px] font-bold text-[#16a34a] uppercase tracking-widest">Integrity Verified</span>
          </div>
        </header>

        {/* Timeline Container */}
        <div className="bg-white border border-outline-variant rounded-xl p-6 md:p-10 shadow-sm">
          
          <div className="relative pl-3 md:pl-6 border-l-2 border-[#e2e2e5] space-y-10">
            
            {/* Timeline Item: Paused */}
            <div className="relative group">
              <div className="absolute -left-[35px] md:-left-[47px] top-0 w-8 h-8 rounded-full bg-[#fef2f2] border border-[#fecaca] flex items-center justify-center z-10 shadow-sm">
                <span className="material-symbols-outlined text-[16px] text-[#dc2626]" style={{ fontVariationSettings: "'FILL' 1" }}>pause</span>
              </div>
              <div className="bg-[#fef2f2]/50 p-6 rounded-xl border border-[#fecaca]/50 shadow-sm group-hover:translate-x-1 transition-transform">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2">
                  <h3 className="text-base font-bold text-[#b91c1c]">Paused</h3>
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Nov 05, 2024 • 02:30 PM</span>
                </div>
                <p className="text-sm font-medium text-[#1a1c1e] mb-5 leading-relaxed">
                  Mandatory pause triggered for non-critical infrastructure update. Voting sessions cached for recovery.
                </p>
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[18px]">warning</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Admin ID: ADM-TECH-SUP</span>
                </div>
              </div>
            </div>

            {/* Timeline Item: Live */}
            <div className="relative group">
              <div className="absolute -left-[35px] md:-left-[47px] top-0 w-8 h-8 rounded-full bg-[#eff6ff] border border-[#bfdbfe] flex items-center justify-center z-10 shadow-sm">
                <span className="material-symbols-outlined text-[16px] text-[#1d4ed8]" style={{ fontVariationSettings: "'FILL' 1" }}>online_prediction</span>
              </div>
              <div className="bg-[#f9f9fc] p-6 rounded-xl border border-outline-variant shadow-sm group-hover:translate-x-1 transition-transform">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2">
                  <h3 className="text-base font-bold text-primary">Live</h3>
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Nov 05, 2024 • 06:00 AM</span>
                </div>
                <p className="text-sm font-medium text-[#1a1c1e] mb-5 leading-relaxed">
                  Polls officially opened. Real-time traffic monitoring active. DDoS mitigation protocols at Level 2.
                </p>
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[18px]">public</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Admin ID: ADM-SYSTEM-AUTO</span>
                </div>
              </div>
            </div>

            {/* Timeline Item: Scheduled */}
            <div className="relative group">
              <div className="absolute -left-[35px] md:-left-[47px] top-0 w-8 h-8 rounded-full bg-white border border-[#e2e2e5] flex items-center justify-center z-10 shadow-sm">
                <span className="material-symbols-outlined text-[16px] text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>event</span>
              </div>
              <div className="bg-[#f9f9fc] p-6 rounded-xl border border-outline-variant shadow-sm group-hover:translate-x-1 transition-transform">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2">
                  <h3 className="text-base font-bold text-primary">Scheduled</h3>
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Oct 28, 2024 • 10:15 AM</span>
                </div>
                <p className="text-sm font-medium text-[#1a1c1e] mb-5 leading-relaxed">
                  Election dates finalized and synchronized with regional servers. Public notice distributed.
                </p>
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[18px]">person</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Admin ID: ADM-LDAVIS-04</span>
                </div>
              </div>
            </div>

            {/* Timeline Item: Draft */}
            <div className="relative group">
              <div className="absolute -left-[35px] md:-left-[47px] top-0 w-8 h-8 rounded-full bg-[#f3f4f6] border border-[#d1d5db] flex items-center justify-center z-10 shadow-sm">
                <span className="material-symbols-outlined text-[16px] text-[#4b5563]" style={{ fontVariationSettings: "'FILL' 1" }}>edit_note</span>
              </div>
              <div className="bg-[#f9f9fc] p-6 rounded-xl border border-outline-variant shadow-sm group-hover:translate-x-1 transition-transform">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2">
                  <h3 className="text-base font-bold text-primary">Draft</h3>
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Oct 15, 2024 • 09:30 AM</span>
                </div>
                <p className="text-sm font-medium text-[#1a1c1e] mb-5 leading-relaxed">
                  Initial ballot structure configured. Candidate lists imported for internal verification.
                </p>
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[18px]">person</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Admin ID: ADM-LDAVIS-04</span>
                </div>
              </div>
            </div>

            {/* Timeline Item: Created */}
            <div className="relative group">
              <div className="absolute -left-[35px] md:-left-[47px] top-0 w-8 h-8 rounded-full bg-white border border-[#e2e2e5] flex items-center justify-center z-10 shadow-sm">
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant" style={{ fontVariationSettings: "'FILL' 1" }}>add_circle</span>
              </div>
              <div className="bg-[#f9f9fc] p-6 rounded-xl border border-outline-variant shadow-sm group-hover:translate-x-1 transition-transform">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2">
                  <h3 className="text-base font-bold text-primary">Created</h3>
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Oct 12, 2024 • 04:20 PM</span>
                </div>
                <p className="text-sm font-medium text-[#1a1c1e] mb-5 leading-relaxed">
                  Election instance initialized in the secure ledger. Genesis block generated for audit trail.
                </p>
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[18px]">token</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Admin ID: ADM-X920-SYS</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Disclaimer/Actions */}
          <div className="mt-12 p-6 bg-[#f9f9fc] border border-outline-variant rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary text-[24px]">info</span>
              <p className="text-sm font-medium text-on-surface-variant leading-relaxed">
                This log is an immutable record of system actions and cannot be altered.
              </p>
            </div>
            <button className="w-full md:w-auto px-6 h-12 bg-primary text-white rounded-lg font-bold text-sm hover:bg-primary/90 transition-colors shadow-sm active:scale-95 shrink-0">
              Export Audit Report
            </button>
          </div>

        </div>

      </main>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center h-16 px-4 bg-white border-t border-outline-variant z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pb-safe">
        <button className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors w-full h-full active:scale-95">
          <span className="material-symbols-outlined">groups</span>
          <span className="text-[10px] font-bold mt-1">Candidates</span>
        </button>
        <button className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors w-full h-full active:scale-95">
          <span className="material-symbols-outlined">person_add</span>
          <span className="text-[10px] font-bold mt-1">Registration</span>
        </button>
        <button className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors w-full h-full active:scale-95">
          <span className="material-symbols-outlined">sort</span>
          <span className="text-[10px] font-bold mt-1">Ordering</span>
        </button>
        <button className="flex flex-col items-center justify-center bg-[#dbeafe] text-[#1e40af] rounded-full px-4 py-1 w-full h-full max-w-[80px] font-bold active:scale-95 transition-transform">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>history</span>
          <span className="text-[10px] font-bold mt-1">History</span>
        </button>
      </nav>

    </div>
  );
};
