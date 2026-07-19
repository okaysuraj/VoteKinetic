import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const MyElectionsList = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'active' | 'upcoming' | 'past'>('active');

  return (
    <div className="bg-[#f9f9fc] text-[#1a1c1e] min-h-screen flex flex-col font-sans">
      
      {/* TopAppBar */}
      <header className="w-full top-0 sticky z-50 bg-white border-b border-outline-variant shadow-sm transition-all">
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
      <main className="flex-grow w-full max-w-[1000px] mx-auto px-4 py-8 md:py-12 pb-24 md:pb-8">
        
        {/* Header Section */}
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3 tracking-tight">Voter Dashboard</h2>
          <p className="text-base font-medium text-on-surface-variant max-w-xl leading-relaxed">
            Manage your electoral participation. All active instances are cryptographically secured.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 sm:gap-6 border-b border-outline-variant mb-8 overflow-x-auto no-scrollbar">
          <button 
            className={`pb-4 font-bold text-sm tracking-wide transition-colors whitespace-nowrap px-2 ${activeTab === 'active' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'}`}
            onClick={() => setActiveTab('active')}
          >
            ACTIVE (2)
          </button>
          <button 
            className={`pb-4 font-bold text-sm tracking-wide transition-colors whitespace-nowrap px-2 ${activeTab === 'upcoming' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'}`}
            onClick={() => setActiveTab('upcoming')}
          >
            UPCOMING (1)
          </button>
          <button 
            className={`pb-4 font-bold text-sm tracking-wide transition-colors whitespace-nowrap px-2 ${activeTab === 'past' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'}`}
            onClick={() => setActiveTab('past')}
          >
            PAST (1)
          </button>
        </div>

        {/* Tab Content Container */}
        <div className="min-h-[400px]">
          
          {/* Active Section */}
          {activeTab === 'active' && (
            <div className="animate-[fade-in_0.3s_ease-out]">
              <div className="flex items-center gap-2 mb-4 text-[#16a34a]">
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>how_to_vote</span>
                <span className="text-sm font-bold uppercase tracking-widest">Available Now</span>
              </div>
              
              <div className="space-y-6">
                
                {/* Active Election Card 1 */}
                <div className="bg-white border border-outline-variant p-6 md:p-8 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-primary/30 shadow-sm transition-colors group cursor-pointer" onClick={() => navigate('/voter/election-pre-start')}>
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#dcfce7] text-[#166534] rounded border border-[#bbf7d0] mb-4">
                      <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse"></span>
                      <span className="text-[10px] font-bold uppercase tracking-widest">Voting Open</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-[#1a1c1e] mb-2 group-hover:text-primary transition-colors">2024 General Municipal Election</h3>
                    <p className="text-sm font-medium text-on-surface-variant flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                      Ends: Nov 05, 2024 • 8:00 PM EST
                    </p>
                  </div>
                  <button className="bg-primary text-white px-8 h-12 md:h-14 font-bold text-sm rounded-lg flex items-center justify-center gap-3 active:scale-95 transition-transform hover:bg-primary/90 shadow-sm shrink-0">
                    CAST VOTE
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </button>
                </div>

                {/* Active Election Card 2 */}
                <div className="bg-white border border-outline-variant p-6 md:p-8 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-primary/30 shadow-sm transition-colors group cursor-pointer" onClick={() => navigate('/voter/election-pre-start')}>
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#dbeafe] text-[#1e40af] rounded border border-[#bfdbfe] mb-4">
                      <span className="material-symbols-outlined text-[14px]">how_to_vote</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest">Voting Open</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-primary mb-2 group-hover:text-primary-dark transition-colors">City Council Special Election</h3>
                    <p className="text-sm font-medium text-on-surface-variant flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                      Ends: Tomorrow • 6:00 PM EST
                    </p>
                  </div>
                  <button className="bg-primary text-white px-8 h-12 md:h-14 font-bold text-sm rounded-lg flex items-center justify-center gap-3 active:scale-95 transition-transform hover:bg-primary/90 shadow-sm shrink-0">
                    CAST VOTE
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </button>
                </div>
                
              </div>
            </div>
          )}

          {/* Upcoming Section */}
          {activeTab === 'upcoming' && (
            <div className="animate-[fade-in_0.3s_ease-out]">
              <div className="flex items-center gap-2 mb-4 text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px]">schedule</span>
                <span className="text-sm font-bold uppercase tracking-widest">Upcoming Ballots</span>
              </div>
              
              <div className="space-y-6">
                <div className="bg-[#f9f9fc] border border-outline-variant p-6 md:p-8 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-6 opacity-80">
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-on-surface-variant rounded border border-outline-variant mb-4 shadow-sm">
                      <span className="material-symbols-outlined text-[14px]">lock</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest">Starting Soon</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-primary mb-2">School Board General Election</h3>
                    <p className="text-sm font-medium text-on-surface-variant flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                      Opens: Jan 12, 2025 • 9:00 AM EST
                    </p>
                  </div>
                  <button className="border border-outline-variant bg-white text-on-surface-variant px-8 h-12 md:h-14 font-bold text-sm rounded-lg flex items-center justify-center gap-3 cursor-not-allowed shadow-sm shrink-0">
                    NOT YET OPEN
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Past Section */}
          {activeTab === 'past' && (
            <div className="animate-[fade-in_0.3s_ease-out]">
              <div className="flex items-center gap-2 mb-4 text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px]">history</span>
                <span className="text-sm font-bold uppercase tracking-widest">Closed Records</span>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white border border-outline-variant p-6 md:p-8 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#f3f4f6] text-[#4b5563] rounded border border-[#d1d5db] mb-4">
                      <span className="material-symbols-outlined text-[14px]">verified</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest">Closed</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-[#1a1c1e] mb-2">2023 Municipal Referendum</h3>
                    <p className="text-sm font-medium text-on-surface-variant flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-[#16a34a]">check_circle</span>
                      Vote Confirmed: Nov 14, 2023
                    </p>
                  </div>
                  <button className="text-primary font-bold text-sm flex items-center gap-2 hover:underline underline-offset-4 p-2">
                    VIEW RECEIPT
                    <span className="material-symbols-outlined text-[20px]">open_in_new</span>
                  </button>
                </div>
              </div>
            </div>
          )}
          
        </div>

        {/* Information Card */}
        <div className="mt-12 p-6 md:p-8 bg-[#eff6ff] border border-[#bfdbfe] text-[#1e3a8a] rounded-xl flex gap-4 items-start shadow-sm">
          <span className="material-symbols-outlined text-[#1d4ed8] text-[28px] shrink-0">info</span>
          <div>
            <p className="text-sm font-bold uppercase tracking-widest mb-2">Institutional Verification</p>
            <p className="text-sm font-medium leading-relaxed opacity-90">
              All listed elections are verified by the State Election Commission. Your cryptographic proof of vote will be generated upon completion.
            </p>
          </div>
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
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
};
