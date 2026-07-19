import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const SyncStatus = () => {
  const navigate = useNavigate();
  const [syncFlicker, setSyncFlicker] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSyncFlicker(true);
      setTimeout(() => setSyncFlicker(false), 150);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-surface-container-lowest pb-20 md:pb-0">
      
      {/* Global Super Admin Header */}
      <header className="bg-surface border-b border-outline-variant sticky top-0 z-40">
        <div className="max-w-[1440px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-error rounded flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>admin_panel_settings</span>
            </div>
            <span className="font-headline-md text-primary font-bold tracking-tight">VOTEKINETIC <span className="text-error font-normal text-sm ml-1 uppercase tracking-widest hidden md:inline">Super Admin</span></span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest hidden sm:block">SYSTEM.SYNC</span>
            <div className="flex items-center gap-2 cursor-pointer hover:bg-surface-container p-1 pr-3 rounded-full transition-colors" onClick={() => navigate('/super-admin')}>
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-sm">shield_person</span>
              </div>
              <span className="text-sm font-bold text-on-surface hidden md:block">SysAdmin_01</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row flex-grow max-w-[1440px] mx-auto w-full">
        
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-64 border-r border-outline-variant bg-surface py-6 px-4 shrink-0">
          <nav className="space-y-1">
            <a href="/super-admin" onClick={(e) => { e.preventDefault(); navigate('/super-admin'); }} className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-lg transition-colors">
              <span className="material-symbols-outlined">dashboard</span>
              <span className="font-bold text-sm">Global Dashboard</span>
            </a>
            <a href="/super-admin/logs" onClick={(e) => { e.preventDefault(); navigate('/super-admin/logs'); }} className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-lg transition-colors">
              <span className="material-symbols-outlined">history</span>
              <span className="font-bold text-sm">Audit Logs</span>
            </a>
            <a href="/super-admin/sync" onClick={(e) => e.preventDefault()} className="flex items-center gap-3 px-3 py-2 bg-primary/10 text-primary font-bold rounded-lg transition-colors">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>cloud_sync</span>
              <span className="text-sm">Sync Status</span>
            </a>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow p-4 md:p-8 overflow-y-auto max-w-[900px] mx-auto w-full">
          
          <div className="flex justify-between items-center mb-8">
            <button className="flex items-center gap-2 text-primary font-bold hover:underline" onClick={() => navigate(-1)}>
              <span className="material-symbols-outlined">arrow_back</span>
              Back to Operations
            </button>
            <div className="px-3 py-1 bg-surface border border-outline-variant text-[10px] font-bold text-on-surface-variant uppercase tracking-widest rounded shadow-sm">
              Node: ALPHA-01
            </div>
          </div>

          <div className="space-y-6">
            
            {/* Sync Progress Hero */}
            <section className="bg-surface border border-outline-variant rounded-xl p-8 text-center flex flex-col items-center shadow-sm">
              <div className="relative w-32 h-32 mb-6">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e2e5" strokeWidth="8" />
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#115cb9" strokeWidth="8" strokeDasharray="282.7" strokeDashoffset="70.6" className="transition-all duration-1000 ease-in-out" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-primary">75%</span>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-primary mb-2">Blockchain Commitment in Progress</h2>
                <p className="text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
                  Verifying and encrypting 1,240 locally stored ballots. Do not disconnect from the network until the cycle completes.
                </p>
              </div>
            </section>

            {/* Status Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Sync Summary */}
              <div className="p-6 bg-surface border border-outline-variant rounded-xl flex flex-col shadow-sm">
                <div className="flex items-center gap-2 text-primary mb-6">
                  <span className="material-symbols-outlined">cloud_sync</span>
                  <span className="font-bold text-sm uppercase tracking-widest">Session Metrics</span>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-on-surface-variant font-medium">Total Ballots</span>
                    <span className="text-primary font-bold text-lg">1,240</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-on-surface-variant font-medium">Verified on Chain</span>
                    <span className="text-secondary font-bold text-lg">930</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-on-surface-variant font-medium">Awaiting Transit</span>
                    <span className="text-on-surface font-bold text-lg">310</span>
                  </div>
                </div>
              </div>

              {/* Network Integrity */}
              <div className="p-6 bg-surface border border-outline-variant rounded-xl flex flex-col shadow-sm">
                <div className="flex items-center gap-2 text-primary mb-6">
                  <span className="material-symbols-outlined">lan</span>
                  <span className="font-bold text-sm uppercase tracking-widest">Node Connectivity</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 bg-[#16a34a] rounded-full animate-pulse shadow-[0_0_8px_#16a34a]"></div>
                    <span className="text-sm font-medium text-on-surface-variant">Primary: Validator-Alpha-01</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 bg-[#16a34a] rounded-full shadow-[0_0_8px_#16a34a]"></div>
                    <span className="text-sm font-medium text-on-surface-variant">Secondary: Ledger-Beta-Node</span>
                  </div>
                  <div className="mt-6 pt-4 border-t border-outline-variant">
                    <span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-widest block mb-1">Encryption Standard</span>
                    <p className="text-sm font-bold text-primary">AES-256 / RSA-4096 Multi-Layer</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Audit Log / Sync List */}
            <section className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm">
              <div className="p-4 border-b border-outline-variant bg-surface-container-lowest flex justify-between items-center">
                <h3 className="font-bold text-primary text-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">list_alt</span>
                  Transaction Audit Stream
                </h3>
                <span className="text-xs text-on-surface-variant font-medium italic flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-error rounded-full animate-pulse"></span> Live Update
                </span>
              </div>
              <div className="divide-y divide-outline-variant max-h-96 overflow-y-auto">
                
                {/* Pending Item */}
                <div className={`p-4 flex items-center justify-between transition-opacity duration-150 ${syncFlicker ? 'opacity-70' : 'opacity-100'}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-on-surface-variant animate-spin text-[20px]">sync</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-primary font-mono uppercase tracking-widest mb-0.5">TX-8902-XJ7</p>
                      <p className="text-xs font-medium text-on-surface-variant">Voter Segment: District 04-A</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-2.5 py-1 bg-surface-container text-on-surface-variant text-[10px] font-bold rounded-md uppercase tracking-widest border border-outline-variant">Queued</span>
                    <p className="text-[10px] font-medium text-on-surface-variant mt-1.5">Estimating: 4s</p>
                  </div>
                </div>

                {/* Success Item 1 */}
                <div className="p-4 flex items-center justify-between hover:bg-surface-container-lowest transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#dcfce7] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[#166534] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-primary font-mono uppercase tracking-widest mb-0.5">TX-8901-Y9B</p>
                      <p className="text-xs font-medium text-on-surface-variant">Voter Segment: District 02-C</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-2.5 py-1 bg-[#dcfce7] text-[#166534] border border-[#bbf7d0] text-[10px] font-bold rounded-md uppercase tracking-widest">Committed</span>
                    <p className="text-[10px] font-medium text-on-surface-variant mt-1.5">Block: #4,209,122</p>
                  </div>
                </div>

                {/* Success Item 2 */}
                <div className="p-4 flex items-center justify-between hover:bg-surface-container-lowest transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#dcfce7] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[#166534] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-primary font-mono uppercase tracking-widest mb-0.5">TX-8899-W3D</p>
                      <p className="text-xs font-medium text-on-surface-variant">Voter Segment: District 01-B</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-2.5 py-1 bg-[#dcfce7] text-[#166534] border border-[#bbf7d0] text-[10px] font-bold rounded-md uppercase tracking-widest">Committed</span>
                    <p className="text-[10px] font-medium text-on-surface-variant mt-1.5">Block: #4,209,121</p>
                  </div>
                </div>

              </div>
            </section>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-outline-variant">
              <button className="w-full h-12 bg-primary text-white font-bold text-sm rounded-lg flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm hover:bg-primary/90">
                <span className="material-symbols-outlined text-[18px]">history</span>
                View Full Audit Chain
              </button>
              <button className="w-full h-12 border border-outline-variant text-on-surface font-bold text-sm rounded-lg flex items-center justify-center gap-2 hover:bg-surface-container-low transition-colors shadow-sm">
                <span className="material-symbols-outlined text-[18px]">download</span>
                Export Local Manifest (.CSV)
              </button>
            </div>

          </div>
        </main>
      </div>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 border-t border-outline-variant bg-surface flex justify-around items-center h-16 pb-safe shadow-sm">
        <a href="/super-admin" onClick={(e) => { e.preventDefault(); navigate('/super-admin'); }} className="flex flex-col items-center justify-center text-on-surface-variant active:scale-95 transition-transform w-full h-full">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px] font-bold mt-1">Dashboard</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center text-on-surface-variant active:scale-95 transition-transform w-full h-full">
          <span className="material-symbols-outlined">how_to_vote</span>
          <span className="text-[10px] font-bold mt-1">Ballots</span>
        </a>
        <a href="/super-admin/sync" onClick={(e) => e.preventDefault()} className="flex flex-col items-center justify-center text-primary font-bold active:scale-95 transition-transform w-full h-full">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>cloud_sync</span>
          <span className="text-[10px] font-bold mt-1">Sync</span>
        </a>
        <a href="/super-admin/settings" onClick={(e) => { e.preventDefault(); navigate('/super-admin/settings'); }} className="flex flex-col items-center justify-center text-on-surface-variant active:scale-95 transition-transform w-full h-full">
          <span className="material-symbols-outlined">settings</span>
          <span className="text-[10px] font-bold mt-1">Settings</span>
        </a>
      </nav>

    </div>
  );
};
