import { useNavigate } from 'react-router-dom';

export const InstitutionalIntegritySystem = () => {
  const navigate = useNavigate();

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
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest hidden sm:block">SYSTEM.INTEGRITY</span>
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
            <a href="/super-admin/action-logs" onClick={(e) => { e.preventDefault(); navigate('/super-admin/action-logs'); }} className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-lg transition-colors">
              <span className="material-symbols-outlined">gavel</span>
              <span className="font-bold text-sm">Action Logs</span>
            </a>
            <a href="/super-admin/integrity" onClick={(e) => e.preventDefault()} className="flex items-center gap-3 px-3 py-2 bg-primary/10 text-primary font-bold rounded-lg transition-colors">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>policy</span>
              <span className="text-sm">Integrity System</span>
            </a>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow p-4 md:p-8 overflow-y-auto max-w-[900px] mx-auto w-full">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Institutional Integrity System</h1>
            <p className="text-sm text-on-surface-variant font-medium">Manage and enforce cryptographic integrity checks across the platform.</p>
          </div>

          <div className="space-y-8">
            
            {/* Status Card */}
            <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col sm:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-[#dcfce7] flex items-center justify-center text-[#166534] shrink-0 border-4 border-[#bbf7d0]">
                <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
              </div>
              <div className="text-center sm:text-left flex-grow">
                <h3 className="text-xl font-bold text-on-surface mb-1">Global Integrity Verified</h3>
                <p className="text-sm text-on-surface-variant">All cryptographic ledgers and audit nodes are synchronized and passing integrity checks.</p>
              </div>
              <button className="px-6 py-2 bg-surface border border-outline-variant text-on-surface font-bold text-sm rounded-lg hover:bg-surface-container-low transition-colors shadow-sm whitespace-nowrap">
                Run Diagnostics
              </button>
            </div>

            {/* Config Section */}
            <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-lowest">
                <h4 className="text-lg font-bold text-primary">System Configuration</h4>
              </div>
              <div className="p-6 space-y-6">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-outline-variant rounded-lg bg-surface-container-lowest hover:border-primary/30 transition-colors">
                  <div>
                    <h5 className="font-bold text-sm text-on-surface mb-1">Strict Consensus Requirements</h5>
                    <p className="text-sm font-medium text-on-surface-variant leading-relaxed">Require a supermajority (66%+) of nodes to validate block commits.</p>
                  </div>
                  <div className="relative inline-block w-12 h-6 transition duration-200 ease-in shrink-0">
                    <input defaultChecked className="absolute block w-0 h-0 opacity-0" type="checkbox"/>
                    <label className="block overflow-hidden h-6 rounded-full bg-primary cursor-pointer transition-colors">
                      <span className="absolute block w-4 h-4 mt-1 bg-white rounded-full shadow-md transition-transform duration-200 translate-x-7"></span>
                    </label>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-outline-variant rounded-lg bg-surface-container-lowest hover:border-primary/30 transition-colors">
                  <div>
                    <h5 className="font-bold text-sm text-on-surface mb-1">Zero-Knowledge Proofs</h5>
                    <p className="text-sm font-medium text-on-surface-variant leading-relaxed">Enforce ZK-SNARKs for voter anonymity during tabulation.</p>
                  </div>
                  <div className="relative inline-block w-12 h-6 transition duration-200 ease-in shrink-0">
                    <input defaultChecked className="absolute block w-0 h-0 opacity-0" type="checkbox"/>
                    <label className="block overflow-hidden h-6 rounded-full bg-primary cursor-pointer transition-colors">
                      <span className="absolute block w-4 h-4 mt-1 bg-white rounded-full shadow-md transition-transform duration-200 translate-x-7"></span>
                    </label>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-outline-variant rounded-lg bg-surface-container-lowest hover:border-primary/30 transition-colors">
                  <div>
                    <h5 className="font-bold text-sm text-on-surface mb-1">Continuous Tamper Detection</h5>
                    <p className="text-sm font-medium text-on-surface-variant leading-relaxed">Actively scan database rows against ledger hashes. May impact read latency.</p>
                  </div>
                  <div className="relative inline-block w-12 h-6 transition duration-200 ease-in shrink-0">
                    <input defaultChecked={false} className="absolute block w-0 h-0 opacity-0" type="checkbox"/>
                    <label className="block overflow-hidden h-6 rounded-full bg-outline-variant cursor-pointer transition-colors">
                      <span className="absolute block w-4 h-4 mt-1 bg-white rounded-full shadow-md transition-transform duration-200 translate-x-1"></span>
                    </label>
                  </div>
                </div>

              </div>
            </div>

            {/* Key Management */}
            <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-lowest flex justify-between items-center">
                <h4 className="text-lg font-bold text-primary">Cryptographic Key Management</h4>
                <button className="text-primary font-bold text-sm hover:underline">Rotate Master Key</button>
              </div>
              <div className="p-6">
                <div className="p-4 bg-[#0f172a] text-white rounded-lg border border-[#1e293b] flex items-center gap-4">
                  <span className="material-symbols-outlined text-[#3b82f6]">key</span>
                  <div className="flex-grow">
                    <p className="text-xs font-bold text-[#94a3b8] uppercase tracking-widest mb-1">Current Master Key Fingerprint</p>
                    <p className="font-mono text-sm break-all">SHA256: 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </main>
      </div>

      {/* Bottom NavBar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 border-t border-outline-variant bg-surface flex justify-around items-center h-16 pb-safe shadow-sm">
        <a href="/super-admin" onClick={(e) => { e.preventDefault(); navigate('/super-admin'); }} className="flex flex-col items-center justify-center text-on-surface-variant active:scale-95 transition-transform w-full h-full">
          <span className="material-symbols-outlined">home</span>
          <span className="text-[10px] font-bold mt-1">Home</span>
        </a>
        <a href="/super-admin/logs" onClick={(e) => { e.preventDefault(); navigate('/super-admin/logs'); }} className="flex flex-col items-center justify-center text-on-surface-variant active:scale-95 transition-transform w-full h-full">
          <span className="material-symbols-outlined">history</span>
          <span className="text-[10px] font-bold mt-1">Audit</span>
        </a>
        <a href="/super-admin/action-logs" onClick={(e) => { e.preventDefault(); navigate('/super-admin/action-logs'); }} className="flex flex-col items-center justify-center text-on-surface-variant active:scale-95 transition-transform w-full h-full">
          <span className="material-symbols-outlined">gavel</span>
          <span className="text-[10px] font-bold mt-1">Actions</span>
        </a>
        <a href="/super-admin/integrity" onClick={(e) => e.preventDefault()} className="flex flex-col items-center justify-center text-primary font-bold active:scale-95 transition-transform w-full h-full">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>policy</span>
          <span className="text-[10px] font-bold mt-1">Integrity</span>
        </a>
      </nav>

    </div>
  );
};
