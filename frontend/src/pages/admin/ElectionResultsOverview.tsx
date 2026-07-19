import { useEffect } from 'react';
import { useState } from 'react';

export const ElectionResultsOverview = () => {
    const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  return (
    <div className="flex bg-[#f9f9fc] text-[#1a1c1e] min-h-screen font-sans">
      
      {/* NavigationDrawer (Desktop Only) */}
      <aside className="hidden md:flex fixed inset-y-0 left-0 z-50 flex-col p-4 h-full w-[280px] bg-white border-r border-outline-variant shadow-sm">
        <div className="mb-8 px-2 flex items-center gap-2 mt-2">
          <span className="material-symbols-outlined text-primary text-[28px]">account_balance</span>
          <h2 className="text-xl font-bold text-primary tracking-tight">Election Portal</h2>
        </div>
        <nav className="flex flex-col gap-1">
          <button className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-[#f0f0f3] rounded-full transition-all duration-200 text-sm font-bold w-full text-left">
            <span className="material-symbols-outlined text-[20px]">analytics</span> Live Turnout
          </button>
          <button className="flex items-center gap-3 px-4 py-3 bg-[#dbeafe] text-[#1e40af] rounded-full transition-all duration-200 text-sm font-bold w-full text-left">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>equalizer</span> Election Results
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-[#f0f0f3] rounded-full transition-all duration-200 text-sm font-bold w-full text-left">
            <span className="material-symbols-outlined text-[20px]">list_alt</span> Detailed Breakdown
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-[#f0f0f3] rounded-full transition-all duration-200 text-sm font-bold w-full text-left">
            <span className="material-symbols-outlined text-[20px]">pie_chart</span> Charts & Graphs
          </button>
          
          <div className="my-4 border-t border-outline-variant mx-2"></div>
          
          <button className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-[#f0f0f3] rounded-full transition-all duration-200 text-sm font-bold w-full text-left">
            <span className="material-symbols-outlined text-[20px]">verified</span> Verification Info
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-[#f0f0f3] rounded-full transition-all duration-200 text-sm font-bold w-full text-left">
            <span className="material-symbols-outlined text-[20px]">security</span> Integrity Check
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-[#f0f0f3] rounded-full transition-all duration-200 text-sm font-bold w-full text-left">
            <span className="material-symbols-outlined text-[20px]">fact_check</span> Tally Audit
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-[#f0f0f3] rounded-full transition-all duration-200 text-sm font-bold w-full text-left">
            <span className="material-symbols-outlined text-[20px]">download</span> Export Results
          </button>
        </nav>
        <div className="mt-auto p-4 bg-[#f9f9fc] rounded-xl border border-outline-variant">
          <p className="text-[10px] font-bold text-on-surface-variant mb-1 uppercase tracking-widest">Authenticated as</p>
          <p className="text-sm font-bold text-[#1a1c1e]">Admin_Node_04</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-[280px] w-full max-w-[1200px] mx-auto p-4 md:p-8 pb-24 md:pb-8">
        
        {/* Header section */}
        <header className="mb-10 pt-4 md:pt-0">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-outline-variant pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#dcfce7] text-[#166534] border border-[#bbf7d0] mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]"></span>
                <span className="text-[10px] font-bold uppercase tracking-widest">Election Certified</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2 tracking-tight">2024 Final Tally Overview</h1>
              <p className="text-sm font-medium text-on-surface-variant max-w-2xl">
                Cryptographically verified results for the 2024 election. All votes have been tallied and certified via multi-node consensus.
              </p>
            </div>
            <div className="flex gap-3">
              <button className="h-10 px-4 border border-outline-variant bg-white text-on-surface-variant font-bold text-sm rounded-lg hover:bg-surface-container-lowest transition-colors flex items-center gap-2 shadow-sm">
                <span className="material-symbols-outlined text-[18px]">share</span> Share
              </button>
              <button className="h-10 px-4 bg-primary text-white font-bold text-sm rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-sm">
                <span className="material-symbols-outlined text-[18px]">print</span> Print Report
              </button>
            </div>
          </div>
        </header>

        {/* Global Summary Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          
          <div className="p-6 rounded-xl border border-outline-variant bg-white shadow-sm hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-secondary text-[24px]">group</span>
              <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-widest">Total Turnout</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-primary">1,248,302</p>
              <span className="text-sm font-bold text-[#16a34a]">+4.2%</span>
            </div>
          </div>
          
          <div className="p-6 rounded-xl border border-outline-variant bg-white shadow-sm hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-secondary text-[24px]">how_to_vote</span>
              <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-widest">Valid Ballots</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-primary">1,245,991</p>
              <span className="text-sm font-medium text-on-surface-variant">99.8% Accept Rate</span>
            </div>
          </div>
          
          <div className="p-6 rounded-xl border border-[#bfdbfe] bg-[#eff6ff] shadow-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-primary/5 transition-opacity group-hover:bg-primary/10 z-0"></div>
            <div className="relative z-10 flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-primary text-[24px]">security</span>
              <h3 className="text-sm font-bold text-[#1e40af] uppercase tracking-widest">Ledger Status</h3>
            </div>
            <div className="relative z-10">
              <p className="text-3xl font-bold text-primary mb-1">Locked</p>
              <span className="text-xs font-bold text-[#1e40af] uppercase tracking-widest">Immutable Chain Achieved</span>
            </div>
          </div>
          
        </section>

        {/* Detailed Results (Candidates) */}
        <section className="mb-10">
          <h3 className="text-xl font-bold text-[#1a1c1e] mb-6">Candidate Standings</h3>
          <div className="space-y-4">
            
            {/* Candidate 1 (Winner) */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 p-6 rounded-xl border border-primary/30 bg-[#eff6ff] shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-lg z-10">
                Elected
              </div>
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full sm:rounded-lg overflow-hidden bg-[#e2e2e5] flex-shrink-0 border-2 border-primary">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80" alt="Candidate" className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow">
                <h4 className="text-xl font-bold text-[#1a1c1e] mb-1">Elena Rostova</h4>
                <p className="text-sm font-medium text-on-surface-variant">Constitutional Council Delegate</p>
              </div>
              <div className="text-left sm:text-right">
                <div className="text-3xl font-bold text-primary mb-1">54.2%</div>
                <p className="text-sm font-bold text-on-surface-variant">676,580 votes</p>
              </div>
              
              {/* Visual Bar */}
              <div className="absolute bottom-0 left-0 h-1.5 bg-primary transition-all duration-1000 ease-out z-0" style={{ width: animate ? '54.2%' : '0%' }}></div>
            </div>

            {/* Candidate 2 */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 p-6 rounded-xl border border-outline-variant bg-white shadow-sm hover:bg-[#f9f9fc] transition-colors relative overflow-hidden">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full sm:rounded-lg overflow-hidden bg-[#e2e2e5] flex-shrink-0 grayscale opacity-80">
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80" alt="Candidate" className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow">
                <h4 className="text-xl font-bold text-[#1a1c1e] mb-1">Marcus Thorne</h4>
                <p className="text-sm font-medium text-on-surface-variant">Constitutional Council Delegate</p>
              </div>
              <div className="text-left sm:text-right">
                <div className="text-3xl font-bold text-[#74777f] mb-1">45.8%</div>
                <p className="text-sm font-bold text-on-surface-variant">571,722 votes</p>
              </div>
              
              {/* Visual Bar */}
              <div className="absolute bottom-0 left-0 h-1.5 bg-[#e2e2e5] transition-all duration-1000 ease-out z-0" style={{ width: animate ? '45.8%' : '0%' }}></div>
            </div>
            
          </div>
        </section>

        {/* Integrity & Audit Log */}
        <section className="p-6 md:p-8 rounded-xl border border-outline-variant bg-white shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <h3 className="text-xl font-bold text-[#1a1c1e]">Audit Transparency</h3>
            <button className="flex items-center gap-2 text-secondary font-bold text-sm hover:underline underline-offset-4">
              <span className="material-symbols-outlined text-[18px]">download</span>
              Export Full Audit Log
            </button>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4 pb-6 border-b border-outline-variant last:border-0 last:pb-0">
              <div className="w-8 h-8 rounded-full bg-[#f9f9fc] border border-outline-variant flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary text-[16px]">history</span>
              </div>
              <div className="flex-grow">
                <p className="text-sm font-bold text-[#1a1c1e] mb-1">Block #9,482 verified by node cluster Alpha</p>
                <p className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">Oct 24, 14:28:12 • Hash: 0x82f...a12c</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 pb-6 border-b border-outline-variant last:border-0 last:pb-0">
              <div className="w-8 h-8 rounded-full bg-[#f9f9fc] border border-outline-variant flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary text-[16px]">fact_check</span>
              </div>
              <div className="flex-grow">
                <p className="text-sm font-bold text-[#1a1c1e] mb-1">Zero-Knowledge Proof validation complete</p>
                <p className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">Oct 24, 14:15:05 • Identity integrity confirmed</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 pb-6 border-b border-outline-variant last:border-0 last:pb-0">
              <div className="w-8 h-8 rounded-full bg-[#f9f9fc] border border-outline-variant flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary text-[16px]">hub</span>
              </div>
              <div className="flex-grow">
                <p className="text-sm font-bold text-[#1a1c1e] mb-1">Consensus reached across 12 distributed ledgers</p>
                <p className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">Oct 24, 14:02:44 • Decentralized audit synchronization</p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 bg-white border-t border-outline-variant md:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pb-safe h-16">
        <a href="#" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors w-full h-full active:scale-95">
          <span className="material-symbols-outlined">sensors</span>
          <span className="text-[10px] font-bold mt-1">Live</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center bg-[#dbeafe] text-[#1e40af] rounded-full px-4 py-1 w-full h-full max-w-[80px] font-bold active:scale-95 transition-transform">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>assignment_turned_in</span>
          <span className="text-[10px] font-bold mt-1">Results</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors w-full h-full active:scale-95">
          <span className="material-symbols-outlined">verified_user</span>
          <span className="text-[10px] font-bold mt-1">Audit</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors w-full h-full active:scale-95">
          <span className="material-symbols-outlined">ios_share</span>
          <span className="text-[10px] font-bold mt-1">Export</span>
        </a>
      </nav>

    </div>
  );
};
