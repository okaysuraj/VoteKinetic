import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuditLogsOverview = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-surface-container-lowest pb-20 md:pb-0 relative">
      
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
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest hidden sm:block">SYSTEM.AUDIT</span>
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
            <a href="/super-admin/logs" onClick={(e) => { e.preventDefault(); navigate('/super-admin/logs'); }} className="flex items-center gap-3 px-3 py-2 bg-primary/10 text-primary font-bold rounded-lg transition-colors">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>history</span>
              <span className="text-sm">Audit Logs</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-lg transition-colors">
              <span className="material-symbols-outlined">gavel</span>
              <span className="font-bold text-sm">Action Logs</span>
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
            <h1 className="text-3xl font-bold text-primary mb-2">Immutable Audit Ledger</h1>
            <p className="text-sm text-on-surface-variant font-medium">Cryptographically verifiable log of all system activities.</p>
          </div>

          <section className="space-y-6">
            
            {/* Filter and Action Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
                  <input type="text" placeholder="Search hash, entity, or event..." className="w-full lg:w-72 h-10 pl-10 pr-4 bg-surface border border-outline-variant rounded-lg text-sm font-medium focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all shadow-sm" />
                </div>
                <button className="h-10 px-4 bg-surface border border-outline-variant rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-surface-container shadow-sm transition-colors">
                  <span className="material-symbols-outlined text-[18px]">filter_list</span>
                  Filter
                </button>
                <button className="h-10 px-4 bg-surface border border-outline-variant rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-surface-container shadow-sm transition-colors">
                  <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                  Date Range
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button className="h-10 px-4 bg-primary text-white rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-primary/90 shadow-sm active:scale-95 transition-all">
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  Export Logs
                </button>
              </div>
              
            </div>

            {/* Logs Table */}
            <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[900px]">
                  <thead>
                    <tr className="bg-surface-container-lowest border-b border-outline-variant">
                      <th className="p-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest w-40">Timestamp</th>
                      <th className="p-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest w-24">Type</th>
                      <th className="p-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest w-32">Module</th>
                      <th className="p-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Detail</th>
                      <th className="p-4 w-20 text-right"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant">
                    
                    {/* Error Log */}
                    <tr className="hover:bg-surface-container-lowest transition-colors">
                      <td className="p-4 text-xs font-mono text-on-surface-variant whitespace-nowrap">14:22:05 10/12/24</td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1.5 bg-error/10 text-error px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border border-error/20">
                          <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>error</span> Auth
                        </span>
                      </td>
                      <td className="p-4 text-sm font-bold text-on-surface">Admin Portal</td>
                      <td className="p-4 text-sm text-on-surface-variant font-medium">Failed login attempt from unrecognized IP address (192.168.1.1).</td>
                      <td className="p-4 text-right">
                        <button className="text-secondary font-bold text-xs uppercase hover:underline" onClick={() => setShowModal(true)}>Verify</button>
                      </td>
                    </tr>
                    
                    {/* Warning Log */}
                    <tr className="hover:bg-surface-container-lowest transition-colors">
                      <td className="p-4 text-xs font-mono text-on-surface-variant whitespace-nowrap">14:15:33 10/12/24</td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1.5 bg-[#fef9c3] text-[#a16207] px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border border-[#fef08a]">
                          <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span> Perf
                        </span>
                      </td>
                      <td className="p-4 text-sm font-bold text-on-surface">Core Ledger</td>
                      <td className="p-4 text-sm text-on-surface-variant font-medium">Sudden latency spike in vote encryption module. Performance monitored at 850ms.</td>
                      <td className="p-4 text-right">
                        <button className="text-secondary font-bold text-xs uppercase hover:underline" onClick={() => setShowModal(true)}>Verify</button>
                      </td>
                    </tr>
                    
                    {/* Info Log */}
                    <tr className="hover:bg-surface-container-lowest transition-colors">
                      <td className="p-4 text-xs font-mono text-on-surface-variant whitespace-nowrap">14:10:12 10/12/24</td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1.5 bg-surface-container text-on-surface-variant px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border border-outline-variant">
                          <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>info</span> Info
                        </span>
                      </td>
                      <td className="p-4 text-sm font-bold text-on-surface">Chain Sync</td>
                      <td className="p-4 text-sm text-on-surface-variant font-medium">New block successfully committed to the election ledger (Hash: 0x9a2f...11b2).</td>
                      <td className="p-4 text-right">
                        <button className="text-secondary font-bold text-xs uppercase hover:underline" onClick={() => setShowModal(true)}>Verify</button>
                      </td>
                    </tr>
                    
                    {/* Info Log */}
                    <tr className="hover:bg-surface-container-lowest transition-colors">
                      <td className="p-4 text-xs font-mono text-on-surface-variant whitespace-nowrap">14:05:58 10/12/24</td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1.5 bg-surface-container text-on-surface-variant px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border border-outline-variant">
                          <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>info</span> Info
                        </span>
                      </td>
                      <td className="p-4 text-sm font-bold text-on-surface">Voter App</td>
                      <td className="p-4 text-sm text-on-surface-variant font-medium">Identity verified for Session ID 992-B. Cryptographic token issued.</td>
                      <td className="p-4 text-right">
                        <button className="text-secondary font-bold text-xs uppercase hover:underline" onClick={() => setShowModal(true)}>Verify</button>
                      </td>
                    </tr>
                    
                    {/* Crypto Log */}
                    <tr className="hover:bg-surface-container-lowest transition-colors">
                      <td className="p-4 text-xs font-mono text-on-surface-variant whitespace-nowrap">13:58:22 10/12/24</td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1.5 bg-surface-container text-on-surface-variant px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border border-outline-variant">
                          <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span> Crypto
                        </span>
                      </td>
                      <td className="p-4 text-sm font-bold text-on-surface">Proof Gen</td>
                      <td className="p-4 text-sm text-on-surface-variant font-medium">Zero-knowledge proof generated for eligible voter inclusion. Audit trail updated.</td>
                      <td className="p-4 text-right">
                        <button className="text-secondary font-bold text-xs uppercase hover:underline" onClick={() => setShowModal(true)}>Verify</button>
                      </td>
                    </tr>
                    
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="p-4 flex items-center justify-between border-t border-outline-variant bg-surface-container-lowest">
                <span className="text-xs font-bold text-on-surface-variant">Showing 5 of 142,520 entries</span>
                <div className="flex gap-2">
                  <button className="w-8 h-8 flex items-center justify-center border border-outline-variant rounded-lg text-on-surface-variant hover:bg-surface-container disabled:opacity-50 transition-colors" disabled>
                    <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center border border-primary rounded-lg bg-primary text-white font-bold text-xs shadow-sm">1</button>
                  <button className="w-8 h-8 flex items-center justify-center border border-outline-variant rounded-lg bg-surface text-on-surface font-bold text-xs hover:bg-surface-container transition-colors shadow-sm">2</button>
                  <button className="w-8 h-8 flex items-center justify-center border border-outline-variant rounded-lg bg-surface text-on-surface font-bold text-xs hover:bg-surface-container transition-colors shadow-sm">3</button>
                  <button className="w-8 h-8 flex items-center justify-center border border-outline-variant rounded-lg text-on-surface hover:bg-surface-container transition-colors shadow-sm">
                    <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                  </button>
                </div>
              </div>
              
            </div>

            {/* Institutional Footnote */}
            <footer className="pt-8 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-2 text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px]">shield</span>
                <span className="text-xs font-medium">Secured by AES-256 & SHA-512 Blockchain Ledger</span>
              </div>
              <div className="flex gap-6">
                <a href="#" className="text-xs font-bold text-on-surface-variant hover:text-primary transition-colors hover:underline underline-offset-4">Download Full Report (PDF)</a>
                <a href="#" className="text-xs font-bold text-on-surface-variant hover:text-primary transition-colors hover:underline underline-offset-4">Export JSON Metadata</a>
              </div>
            </footer>
            
          </section>

        </main>
      </div>

      {/* Bottom NavBar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 border-t border-outline-variant bg-surface flex justify-around items-center h-16 pb-safe shadow-sm">
        <a href="/super-admin" onClick={(e) => { e.preventDefault(); navigate('/super-admin'); }} className="flex flex-col items-center justify-center text-on-surface-variant active:scale-95 transition-transform">
          <span className="material-symbols-outlined">home</span>
          <span className="text-[10px] font-bold mt-1">Home</span>
        </a>
        <a href="/super-admin/logs" onClick={(e) => e.preventDefault()} className="flex flex-col items-center justify-center text-primary font-bold active:scale-95 transition-transform">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>history</span>
          <span className="text-[10px] font-bold mt-1">Logs</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center text-on-surface-variant active:scale-95 transition-transform">
          <span className="material-symbols-outlined">gavel</span>
          <span className="text-[10px] font-bold mt-1">Action</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center text-on-surface-variant active:scale-95 transition-transform">
          <span className="material-symbols-outlined">policy</span>
          <span className="text-[10px] font-bold mt-1">Integrity</span>
        </a>
      </nav>

      {/* Log Entry Detail Overlay */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-surface/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={() => setShowModal(false)}></div>
          <div className="bg-surface max-w-lg w-full rounded-xl shadow-2xl border border-outline-variant overflow-hidden relative z-10 animate-in zoom-in duration-200">
            <div className="p-6 bg-primary text-white flex justify-between items-center">
              <h3 className="text-xl font-bold">Entry Proof Details</h3>
              <button 
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                onClick={() => setShowModal(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="bg-[#0f172a] text-[#f8fafc] p-4 rounded-lg border border-[#1e293b] font-mono text-xs overflow-x-auto shadow-inner">
                <pre>
{`{
  "block_id": 49202,
  "prev_hash": "e3b0c44298fc...",
  "merkle_root": "7f83b1657ff1...",
  "signature": "RSA-PSS:3072",
  "integrity_status": "VALIDATED"
}`}
                </pre>
              </div>
              
              <div className="flex items-start gap-4 p-4 border border-outline-variant rounded-lg bg-surface-container-lowest">
                <span className="material-symbols-outlined text-secondary text-[24px]">lock</span>
                <p className="text-sm text-on-surface font-medium leading-relaxed">
                  This log entry is signed with a district-level master key and cannot be altered or deleted.
                </p>
              </div>
            </div>
            
            <div className="p-4 border-t border-outline-variant flex justify-end gap-3 bg-surface-container-lowest">
              <button 
                className="px-6 py-2 border border-outline-variant text-on-surface font-bold text-sm rounded-lg hover:bg-surface-container transition-colors"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button 
                className="px-6 py-2 bg-primary text-white font-bold text-sm rounded-lg flex items-center gap-2 hover:bg-primary/90 shadow-sm active:scale-95 transition-all"
                onClick={() => setShowModal(false)}
              >
                <span className="material-symbols-outlined text-[18px]">download</span> Download Receipt
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
