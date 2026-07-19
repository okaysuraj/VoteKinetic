import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AdminActionLogs = () => {
  const navigate = useNavigate();
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const toggleRow = (index: number) => {
    setExpandedRows(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

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
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest hidden sm:block">SYSTEM.ACTION_LOGS</span>
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
            <a href="/super-admin/action-logs" onClick={(e) => e.preventDefault()} className="flex items-center gap-3 px-3 py-2 bg-primary/10 text-primary font-bold rounded-lg transition-colors">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>gavel</span>
              <span className="text-sm">Action Logs</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-lg transition-colors">
              <span className="material-symbols-outlined">policy</span>
              <span className="font-bold text-sm">Integrity System</span>
            </a>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow p-4 md:p-8 overflow-y-auto">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Administrative Actions</h1>
            <p className="text-sm text-on-surface-variant font-medium">Traceability of all configuration changes and user management actions.</p>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
                <input type="text" placeholder="Search admin, action, or context..." className="w-full lg:w-80 h-10 pl-10 pr-4 bg-surface border border-outline-variant rounded-lg text-sm font-medium focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all shadow-sm" />
              </div>
              <button className="h-10 px-4 bg-surface border border-outline-variant rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-surface-container shadow-sm transition-colors">
                <span className="material-symbols-outlined text-[18px]">filter_list</span>
                Filters
              </button>
            </div>
            <button className="h-10 px-4 bg-surface border border-outline-variant rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-surface-container shadow-sm transition-colors self-start lg:self-auto">
              <span className="material-symbols-outlined text-[18px]">download</span>
              Export CSV
            </button>
          </div>

          <div className="space-y-4">
            
            {/* Log Entry 1 - Error */}
            <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm transition-all hover:border-primary/30">
              <div 
                className="p-4 md:p-6 flex flex-wrap md:flex-nowrap items-center gap-4 cursor-pointer hover:bg-surface-container-lowest transition-colors"
                onClick={() => toggleRow(1)}
              >
                <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center text-error shrink-0">
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>block</span>
                </div>
                <div className="flex-grow min-w-[200px]">
                  <h3 className="font-bold text-sm text-on-surface mb-0.5">Voter Blocked</h3>
                  <p className="text-xs font-medium text-on-surface-variant">Entity: Voter ID 892-A-991</p>
                </div>
                <div className="w-full md:w-48 flex flex-col md:items-end">
                  <span className="font-bold text-sm text-on-surface mb-0.5">Admin User: John Doe</span>
                  <span className="text-xs font-medium text-on-surface-variant">jdoe.admin@election.gov</span>
                </div>
                <div className="w-full md:w-48 flex flex-col md:items-end">
                  <span className="font-bold text-sm text-on-surface mb-0.5">Oct 24, 2023 • 14:22:05</span>
                  <span className="text-xs font-medium text-on-surface-variant">IP: 192.168.1.45</span>
                </div>
                <span className={`material-symbols-outlined text-on-surface-variant transition-transform duration-300 ml-auto md:ml-4 ${expandedRows.includes(1) ? 'rotate-180' : ''}`}>expand_more</span>
              </div>
              
              {expandedRows.includes(1) && (
                <div className="px-6 py-4 bg-surface-container-lowest border-t border-outline-variant animate-in slide-in-from-top-2 duration-200">
                  <h4 className="font-bold text-sm text-primary mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">history</span> Data Change Diff
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-surface p-4 rounded-lg border border-outline-variant shadow-inner">
                      <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block mb-2">Previous State</span>
                      <pre className="text-xs font-mono text-[#166534] whitespace-pre-wrap">{`{
  "status": "ACTIVE",
  "reason_code": null,
  "can_vote": true
}`}</pre>
                    </div>
                    <div className="bg-surface p-4 rounded-lg border border-[#fca5a5] shadow-inner">
                      <span className="text-[10px] font-bold text-error uppercase tracking-widest block mb-2">Current State</span>
                      <pre className="text-xs font-mono text-error whitespace-pre-wrap">{`{
  "status": "BLOCKED",
  "reason_code": "SUSPICIOUS_ACTIVITY",
  "can_vote": false
}`}</pre>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Log Entry 2 - Settings */}
            <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm transition-all hover:border-primary/30">
              <div 
                className="p-4 md:p-6 flex flex-wrap md:flex-nowrap items-center gap-4 cursor-pointer hover:bg-surface-container-lowest transition-colors"
                onClick={() => toggleRow(2)}
              >
                <div className="w-10 h-10 rounded-full bg-[#fef9c3] flex items-center justify-center text-[#a16207] shrink-0">
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>settings</span>
                </div>
                <div className="flex-grow min-w-[200px]">
                  <h3 className="font-bold text-sm text-on-surface mb-0.5">Election Configuration Updated</h3>
                  <p className="text-xs font-medium text-on-surface-variant">Module: Authentication Parameters</p>
                </div>
                <div className="w-full md:w-48 flex flex-col md:items-end">
                  <span className="font-bold text-sm text-on-surface mb-0.5">Admin User: System Root</span>
                  <span className="text-xs font-medium text-on-surface-variant">sys.admin@internal</span>
                </div>
                <div className="w-full md:w-48 flex flex-col md:items-end">
                  <span className="font-bold text-sm text-on-surface mb-0.5">Oct 23, 2023 • 11:05:44</span>
                  <span className="text-xs font-medium text-on-surface-variant">IP: 10.0.4.122</span>
                </div>
                <span className={`material-symbols-outlined text-on-surface-variant transition-transform duration-300 ml-auto md:ml-4 ${expandedRows.includes(2) ? 'rotate-180' : ''}`}>expand_more</span>
              </div>
              
              {expandedRows.includes(2) && (
                <div className="px-6 py-4 bg-surface-container-lowest border-t border-outline-variant animate-in slide-in-from-top-2 duration-200">
                  <h4 className="font-bold text-sm text-primary mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">history</span> Data Change Diff
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-surface p-4 rounded-lg border border-outline-variant shadow-inner">
                      <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block mb-2">Previous State</span>
                      <pre className="text-xs font-mono text-error whitespace-pre-wrap">{`{
  "verification_threshold": 0.85,
  "manual_override": false
}`}</pre>
                    </div>
                    <div className="bg-surface p-4 rounded-lg border border-secondary/30 shadow-inner">
                      <span className="text-[10px] font-bold text-secondary uppercase tracking-widest block mb-2">Current State</span>
                      <pre className="text-xs font-mono text-on-surface whitespace-pre-wrap">{`{
  "verification_threshold": 0.90,
  "manual_override": true
}`}</pre>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Log Entry 3 - Automation */}
            <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm transition-all hover:border-primary/30">
              <div 
                className="p-4 md:p-6 flex flex-wrap md:flex-nowrap items-center gap-4 cursor-pointer hover:bg-surface-container-lowest transition-colors"
                onClick={() => toggleRow(3)}
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-[20px]">sort</span>
                </div>
                <div className="flex-grow min-w-[200px]">
                  <h3 className="font-bold text-sm text-on-surface mb-0.5">Ballot Order Randomized</h3>
                  <p className="text-xs font-medium text-on-surface-variant">District 4 Presidential Primaries</p>
                </div>
                <div className="w-full md:w-48 flex flex-col md:items-end">
                  <span className="font-bold text-sm text-on-surface mb-0.5">Admin User: System (Automated)</span>
                  <span className="text-xs font-medium text-on-surface-variant">cron.job@internal.sys</span>
                </div>
                <div className="w-full md:w-48 flex flex-col md:items-end">
                  <span className="font-bold text-sm text-on-surface mb-0.5">Oct 23, 2023 • 00:00:05</span>
                  <span className="text-xs font-medium text-on-surface-variant">Session: SEC-AUD-8831</span>
                </div>
                <span className={`material-symbols-outlined text-on-surface-variant transition-transform duration-300 ml-auto md:ml-4 ${expandedRows.includes(3) ? 'rotate-180' : ''}`}>expand_more</span>
              </div>
              
              {expandedRows.includes(3) && (
                <div className="px-6 py-4 bg-surface-container-lowest border-t border-outline-variant animate-in slide-in-from-top-2 duration-200">
                  <h4 className="font-bold text-sm text-primary mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">history</span> Action Context
                  </h4>
                  <div className="p-4 bg-surface rounded-lg border border-outline-variant flex items-center gap-6 shadow-sm">
                    <div className="text-center px-4 border-r border-outline-variant">
                      <span className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Entropy Score</span>
                      <span className="text-2xl font-bold text-primary">0.998</span>
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-medium text-on-surface-variant leading-relaxed">
                        Automated shuffling protocol executed using Cryptographically Secure Pseudo-Random Number Generator (CSPRNG). Seed hash verified against district timestamp.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Log Entry 4 - Info */}
            <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm transition-all hover:border-primary/30">
              <div 
                className="p-4 md:p-6 flex flex-wrap md:flex-nowrap items-center gap-4 cursor-pointer hover:bg-surface-container-lowest transition-colors"
                onClick={() => toggleRow(4)}
              >
                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant shrink-0">
                  <span className="material-symbols-outlined text-[20px]">login</span>
                </div>
                <div className="flex-grow min-w-[200px]">
                  <h3 className="font-bold text-sm text-on-surface mb-0.5">Login Successful</h3>
                  <p className="text-xs font-medium text-on-surface-variant">MFA Authenticated via Hardware Token</p>
                </div>
                <div className="w-full md:w-48 flex flex-col md:items-end">
                  <span className="font-bold text-sm text-on-surface mb-0.5">Admin User: Sarah Miller</span>
                  <span className="text-xs font-medium text-on-surface-variant">smiller.admin@election.gov</span>
                </div>
                <div className="w-full md:w-48 flex flex-col md:items-end">
                  <span className="font-bold text-sm text-on-surface mb-0.5">Oct 23, 2023 • 08:55:12</span>
                  <span className="text-xs font-medium text-on-surface-variant">IP: 192.168.1.45</span>
                </div>
                <span className={`material-symbols-outlined text-on-surface-variant transition-transform duration-300 ml-auto md:ml-4 ${expandedRows.includes(4) ? 'rotate-180' : ''}`}>expand_more</span>
              </div>
              
              {expandedRows.includes(4) && (
                <div className="px-6 py-4 bg-surface-container-lowest border-t border-outline-variant animate-in slide-in-from-top-2 duration-200">
                  <div className="bg-surface p-4 rounded-lg border border-outline-variant flex gap-4 items-center shadow-sm">
                    <span className="material-symbols-outlined text-primary text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
                    <div>
                      <p className="text-sm font-bold text-on-surface mb-1">Security Audit Passed</p>
                      <p className="text-sm font-medium text-on-surface-variant">User logged in from authorized static IP. Hardware key #E0045-88-90 verified successfully.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

          <div className="mt-8 flex items-center justify-between border-t border-outline-variant pt-6">
            <span className="text-xs font-bold text-on-surface-variant">Showing 1 to 25 of 1,842 entries</span>
            <div className="flex gap-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-surface-container text-on-surface-variant disabled:opacity-50 transition-colors" disabled>
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold text-sm shadow-sm">1</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant bg-surface hover:bg-surface-container text-on-surface font-bold text-sm transition-colors shadow-sm">2</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant bg-surface hover:bg-surface-container text-on-surface font-bold text-sm transition-colors shadow-sm">3</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container transition-colors shadow-sm">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
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
        <a href="#" className="flex flex-col items-center justify-center text-primary font-bold active:scale-95 transition-transform w-full h-full">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>gavel</span>
          <span className="text-[10px] font-bold mt-1">Actions</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center text-on-surface-variant active:scale-95 transition-transform w-full h-full">
          <span className="material-symbols-outlined">policy</span>
          <span className="text-[10px] font-bold mt-1">Integrity</span>
        </a>
      </nav>

    </div>
  );
};
