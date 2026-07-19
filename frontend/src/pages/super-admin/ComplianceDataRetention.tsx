import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ComplianceDataRetention = () => {
  const navigate = useNavigate();
  const [retentionYears, setRetentionYears] = useState(7);

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
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest hidden sm:block">SYSTEM.COMPLIANCE</span>
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
            <a href="/super-admin/integrity" onClick={(e) => { e.preventDefault(); navigate('/super-admin/integrity'); }} className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-lg transition-colors">
              <span className="material-symbols-outlined">policy</span>
              <span className="font-bold text-sm">Integrity System</span>
            </a>
            <a href="/super-admin/compliance" onClick={(e) => e.preventDefault()} className="flex items-center gap-3 px-3 py-2 bg-primary/10 text-primary font-bold rounded-lg transition-colors">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>gavel</span>
              <span className="text-sm">Compliance & Data</span>
            </a>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow p-4 md:p-8 overflow-y-auto max-w-[900px] mx-auto w-full">
          
          <div className="mb-8 border-b border-outline-variant pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">Compliance Data Retention</h1>
              <p className="text-sm text-on-surface-variant font-medium">Configure long-term storage limits, PII sanitization, and audit legalholds.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-error text-[20px]">warning</span>
              <span className="text-xs font-bold text-error uppercase tracking-widest">Legal Authority Required</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            
            {/* Primary Retention Slider */}
            <div className="md:col-span-6 bg-surface border border-outline-variant rounded-xl p-6 shadow-sm hover:-translate-y-0.5 transition-transform duration-200">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#dcfce7] flex items-center justify-center text-[#166534]">
                    <span className="material-symbols-outlined">database</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-on-surface">Base Retention Period</h3>
                    <p className="text-xs font-medium text-on-surface-variant mt-0.5">Duration for storing raw, non-anonymized election data before automated purging.</p>
                  </div>
                </div>
                <div className="flex items-baseline gap-1 text-primary">
                  <span className="text-5xl font-bold">{retentionYears.toString().padStart(2, '0')}</span>
                  <span className="text-xl font-medium opacity-80">Years</span>
                </div>
              </div>
              
              <div className="mt-8">
                <input 
                  type="range" 
                  min="1" 
                  max="25" 
                  value={retentionYears} 
                  onChange={(e) => setRetentionYears(parseInt(e.target.value))}
                  className="w-full h-2 bg-[#dbeafe] rounded-lg appearance-none cursor-pointer accent-[#2563eb]" 
                />
                <div className="flex justify-between text-[10px] font-bold mt-2 opacity-60 uppercase tracking-widest">
                  <span>1Y</span>
                  <span>Statutory Limit (7Y)</span>
                  <span>25Y</span>
                </div>
              </div>
            </div>

            {/* Audit Log Toggle */}
            <div className="md:col-span-3 bg-surface border border-outline-variant rounded-xl p-6 shadow-sm hover:-translate-y-0.5 transition-transform duration-200">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center text-error">
                    <span className="material-symbols-outlined">history_edu</span>
                  </div>
                  <h3 className="font-bold text-sm text-on-surface">Audit Log Immortality</h3>
                </div>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out shrink-0">
                  <input defaultChecked className="absolute block w-0 h-0 opacity-0" type="checkbox"/>
                  <label className="block overflow-hidden h-6 rounded-full bg-error cursor-pointer transition-colors">
                    <span className="absolute block w-4 h-4 mt-1 bg-white rounded-full shadow-md transition-transform duration-200 translate-x-7"></span>
                  </label>
                </div>
              </div>
              <p className="text-sm font-medium text-on-surface-variant leading-relaxed">
                Prevents any deletion or modification of logs, even by root administrators. Once enabled, this is legally binding and non-reversible.
              </p>
              <div className="mt-6 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-error rounded-full animate-pulse"></span>
                <span className="text-[10px] font-bold text-error uppercase tracking-widest">Active Protocol</span>
              </div>
            </div>

            {/* PII Anonymization */}
            <div className="md:col-span-3 bg-surface border border-outline-variant rounded-xl p-6 shadow-sm hover:-translate-y-0.5 transition-transform duration-200">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">enhanced_encryption</span>
                  </div>
                  <h3 className="font-bold text-sm text-on-surface">PII Anonymization Rules</h3>
                </div>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out shrink-0">
                  <input defaultChecked className="absolute block w-0 h-0 opacity-0" type="checkbox"/>
                  <label className="block overflow-hidden h-6 rounded-full bg-primary cursor-pointer transition-colors">
                    <span className="absolute block w-4 h-4 mt-1 bg-white rounded-full shadow-md transition-transform duration-200 translate-x-7"></span>
                  </label>
                </div>
              </div>
              <p className="text-sm font-medium text-on-surface-variant leading-relaxed">
                Automatically scrubs Personally Identifiable Information after ballot validation but before reporting to prevent deanonymization.
              </p>
              <button className="mt-6 text-xs font-bold text-primary flex items-center gap-1 hover:underline underline-offset-4">
                Configure Field Mappings <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>

            {/* Decorative Asset */}
            <div className="md:col-span-6 h-48 rounded-xl overflow-hidden relative border border-outline-variant shadow-sm group">
              <div className="absolute inset-0 bg-[#0f172a] flex items-center justify-center overflow-hidden">
                <div className="w-[120%] h-[120%] opacity-20 group-hover:opacity-40 transition-opacity duration-1000" style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, #3b82f6 0, #3b82f6 1px, transparent 1px, transparent 10px)'
                }}></div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] to-transparent flex flex-col justify-end p-6">
                <div className="max-w-lg">
                  <h4 className="font-bold text-white mb-1">Institutional Integrity Metrics</h4>
                  <p className="text-xs text-[#94a3b8] font-medium leading-relaxed">The visualization above represents the cryptographic entropy and chain-of-custody strength based on your current compliance settings.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Footer Controls */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-outline-variant">
            <button className="w-full sm:w-auto px-6 py-3 border border-outline-variant text-on-surface font-bold text-sm rounded-lg hover:bg-surface-container-low transition-colors shadow-sm">
              Reset to Defaults
            </button>
            <div className="flex w-full sm:w-auto items-center justify-end gap-6">
              <div className="text-right hidden sm:block">
                <div className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest mb-0.5">Authorized By</div>
                <div className="text-xs font-bold text-on-surface">Chief Election Commissioner</div>
              </div>
              <button className="w-full sm:w-auto px-8 py-3 bg-primary text-white font-bold text-sm rounded-lg flex items-center justify-center gap-2 shadow-sm hover:bg-primary/90 active:scale-95 transition-all">
                <span className="material-symbols-outlined text-[18px]">lock</span>
                Save Compliance Profile
              </button>
            </div>
          </div>

          {/* Contextual Help */}
          <div className="mt-12 p-8 bg-surface-container-lowest rounded-2xl border-2 border-dashed border-outline-variant flex flex-col md:flex-row gap-8 items-center shadow-sm">
            <div className="w-20 h-20 rounded-full bg-error/10 flex items-center justify-center shrink-0 border-4 border-white shadow-md">
              <span className="material-symbols-outlined text-error text-[40px]">gavel</span>
            </div>
            <div>
              <h4 className="text-xl font-bold text-on-surface mb-2">Legal Impact Disclaimer</h4>
              <p className="text-sm font-medium text-on-surface-variant leading-relaxed">
                Settings defined on this page are legally binding under Federal Election Statute 42-B. Any modification requires a two-factor cryptographic authorization from the State Election Board. These parameters define the evidentiary value of all data collected during the active voting window.
              </p>
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
        <a href="/super-admin/integrity" onClick={(e) => { e.preventDefault(); navigate('/super-admin/integrity'); }} className="flex flex-col items-center justify-center text-on-surface-variant active:scale-95 transition-transform w-full h-full">
          <span className="material-symbols-outlined">policy</span>
          <span className="text-[10px] font-bold mt-1">Integrity</span>
        </a>
        <a href="/super-admin/compliance" onClick={(e) => e.preventDefault()} className="flex flex-col items-center justify-center text-primary font-bold active:scale-95 transition-transform w-full h-full">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>gavel</span>
          <span className="text-[10px] font-bold mt-1">Compliance</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center text-on-surface-variant active:scale-95 transition-transform w-full h-full">
          <span className="material-symbols-outlined">more_horiz</span>
          <span className="text-[10px] font-bold mt-1">More</span>
        </a>
      </nav>

    </div>
  );
};
