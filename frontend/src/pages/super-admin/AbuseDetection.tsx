import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AbuseDetection = () => {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [activeRow, setActiveRow] = useState<number | null>(null);

  const handleMitigate = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const rows = [0, 1, 2];
      const randomRow = rows[Math.floor(Math.random() * rows.length)];
      setActiveRow(randomRow);
      setTimeout(() => setActiveRow(null), 1000);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-surface-container-lowest pb-20 md:pb-0 relative overflow-hidden">
      
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
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest hidden sm:block">SYSTEM.ABUSE</span>
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
            <a href="/super-admin/sync" onClick={(e) => { e.preventDefault(); navigate('/super-admin/sync'); }} className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-lg transition-colors">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>cloud_sync</span>
              <span className="font-bold text-sm">Sync Status</span>
            </a>
            <a href="/super-admin/abuse" onClick={(e) => e.preventDefault()} className="flex items-center gap-3 px-3 py-2 bg-primary/10 text-primary font-bold rounded-lg transition-colors">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
              <span className="text-sm">Abuse Detection</span>
            </a>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow p-4 md:p-8 overflow-y-auto max-w-[1000px] mx-auto w-full">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">Abuse Detection Center</h1>
              <p className="text-sm text-on-surface-variant font-medium">Real-time monitoring and mitigation of anomalous network behavior.</p>
            </div>
            <div className="flex gap-2 self-start md:self-auto">
              <button className="h-10 px-4 bg-surface border border-outline-variant text-on-surface font-bold text-sm rounded-lg hover:bg-surface-container shadow-sm flex items-center gap-2 transition-colors">
                <span className="material-symbols-outlined text-[18px]">download</span>
                Export Report
              </button>
            </div>
          </div>

          {/* Core Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
            
            {/* Global Threat Level */}
            <div className="col-span-12 md:col-span-4 bg-surface border border-outline-variant p-6 rounded-xl shadow-sm hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-error text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                <h4 className="text-sm font-bold text-on-surface uppercase tracking-widest">Global Threat Level</h4>
              </div>
              <div className="flex items-end gap-3 mb-2">
                <span className="text-5xl font-bold text-error">Elevated</span>
              </div>
              <p className="text-xs font-medium text-on-surface-variant leading-relaxed">
                Automated throttling engaged across 3 regions due to sustained anomalous traffic spikes.
              </p>
            </div>

            {/* DDOS Card */}
            <div className="col-span-12 md:col-span-4 bg-surface border border-outline-variant p-6 rounded-xl shadow-sm hover:border-primary/30 transition-colors">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-primary text-[20px]">router</span>
              </div>
              <h4 className="text-lg font-bold text-on-surface mb-2">DDoS Mitigation</h4>
              <p className="text-sm font-medium text-on-surface-variant mb-6 leading-relaxed">
                Layer 7 attack signature detected on public API endpoints.
              </p>
              <div className="flex gap-3">
                <button 
                  className="flex-1 h-10 bg-primary text-white font-bold text-sm rounded-lg active:scale-95 transition-all hover:bg-primary/90 shadow-sm"
                  onClick={handleMitigate}
                >
                  Engage Scrubber
                </button>
                <button className="w-10 h-10 border border-outline-variant text-on-surface-variant rounded-lg flex items-center justify-center hover:bg-surface-container-low transition-colors shadow-sm">
                  <span className="material-symbols-outlined text-[18px]">settings_ethernet</span>
                </button>
              </div>
            </div>

            {/* Credential Stuffing Card */}
            <div className="col-span-12 md:col-span-4 bg-surface border border-outline-variant p-6 rounded-xl shadow-sm hover:border-primary/30 transition-colors">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-secondary text-[20px]">fingerprint</span>
              </div>
              <h4 className="text-lg font-bold text-on-surface mb-2">Credential Stuffing</h4>
              <p className="text-sm font-medium text-on-surface-variant mb-6 leading-relaxed">
                Brute force attempt on Regional Node B. MFA triggers high.
              </p>
              <div className="flex gap-3">
                <button 
                  className="flex-1 h-10 bg-primary text-white font-bold text-sm rounded-lg active:scale-95 transition-all hover:bg-primary/90 shadow-sm"
                  onClick={handleMitigate}
                >
                  Block IPs
                </button>
                <button className="w-10 h-10 border border-outline-variant text-on-surface-variant rounded-lg flex items-center justify-center hover:bg-surface-container-low transition-colors shadow-sm">
                  <span className="material-symbols-outlined text-[18px]">settings_ethernet</span>
                </button>
              </div>
            </div>

          </div>

          {/* Detailed Event Log Section */}
          <section className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest">
              <h3 className="text-lg font-bold text-primary">High-Priority Security Events</h3>
              <button className="text-primary font-bold text-sm flex items-center gap-1 hover:underline underline-offset-4">
                View Full Archive <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-surface-container-lowest border-b border-outline-variant">
                    <th className="p-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Timestamp</th>
                    <th className="p-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Event Type</th>
                    <th className="p-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Origin</th>
                    <th className="p-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest w-40">Threat Index</th>
                    <th className="p-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Status</th>
                    <th className="p-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  
                  {/* Row 1 */}
                  <tr className={`transition-colors ${activeRow === 0 ? 'bg-primary/5' : 'hover:bg-surface-container-lowest'}`}>
                    <td className="p-4 text-xs font-mono text-on-surface-variant whitespace-nowrap">14:22:01 UTC</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-secondary text-[20px]">shield</span>
                        <span className="text-sm font-bold text-on-surface">SQL Injection Attempt</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm font-medium text-on-surface-variant">192.168.4.12 [RU]</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-1.5 bg-surface-container rounded-full overflow-hidden">
                          <div className="w-3/4 h-full bg-error"></div>
                        </div>
                        <span className="text-[10px] font-bold text-error uppercase tracking-widest">High</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 bg-surface-container text-on-surface font-bold text-[10px] rounded-md uppercase tracking-widest border border-outline-variant">Mitigated</span>
                    </td>
                    <td className="p-4 text-right">
                      <button className="px-4 py-2 bg-surface border border-outline-variant text-on-surface font-bold text-xs rounded-lg hover:bg-surface-container-low transition-colors shadow-sm">
                        Details
                      </button>
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr className={`transition-colors ${activeRow === 1 ? 'bg-primary/5' : 'hover:bg-surface-container-lowest'}`}>
                    <td className="p-4 text-xs font-mono text-on-surface-variant whitespace-nowrap">14:21:44 UTC</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-secondary text-[20px]">key</span>
                        <span className="text-sm font-bold text-on-surface">Password Spraying</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm font-medium text-on-surface-variant">45.23.101.4 [US]</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-1.5 bg-surface-container rounded-full overflow-hidden">
                          <div className="w-1/4 h-full bg-secondary"></div>
                        </div>
                        <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Low</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 bg-secondary/10 text-secondary border border-secondary/20 font-bold text-[10px] rounded-md uppercase tracking-widest">Challenging</span>
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        className="px-4 py-2 bg-primary text-white font-bold text-xs rounded-lg active:scale-95 transition-all shadow-sm hover:bg-primary/90"
                        onClick={handleMitigate}
                      >
                        Mitigate
                      </button>
                    </td>
                  </tr>

                  {/* Row 3 */}
                  <tr className={`transition-colors ${activeRow === 2 ? 'bg-primary/5' : 'hover:bg-surface-container-lowest'}`}>
                    <td className="p-4 text-xs font-mono text-on-surface-variant whitespace-nowrap">14:19:12 UTC</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-secondary text-[20px]">how_to_vote</span>
                        <span className="text-sm font-bold text-on-surface">Rapid Re-Vote Pattern</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm font-medium text-on-surface-variant">Internal Node #8</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-1.5 bg-surface-container rounded-full overflow-hidden">
                          <div className="w-full h-full bg-error"></div>
                        </div>
                        <span className="text-[10px] font-bold text-error uppercase tracking-widest">Critical</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 bg-error/10 text-error border border-error/20 font-bold text-[10px] rounded-md uppercase tracking-widest flex items-center gap-1.5 w-fit">
                        <span className="w-1.5 h-1.5 bg-error rounded-full animate-pulse"></span> Active Review
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button className="px-4 py-2 bg-error text-white font-bold text-xs rounded-lg active:scale-95 transition-all shadow-sm hover:bg-error/90">
                        Audit Now
                      </button>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 border-t border-outline-variant bg-surface flex justify-around items-center h-16 pb-safe shadow-sm">
        <a href="/super-admin" onClick={(e) => { e.preventDefault(); navigate('/super-admin'); }} className="flex flex-col items-center justify-center text-on-surface-variant active:scale-95 transition-transform w-full h-full">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px] font-bold mt-1">Dashboard</span>
        </a>
        <a href="/super-admin/abuse" onClick={(e) => e.preventDefault()} className="flex flex-col items-center justify-center text-primary font-bold active:scale-95 transition-transform w-full h-full">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
          <span className="text-[10px] font-bold mt-1">Abuse</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center text-on-surface-variant active:scale-95 transition-transform w-full h-full">
          <span className="material-symbols-outlined">how_to_vote</span>
          <span className="text-[10px] font-bold mt-1">Ballots</span>
        </a>
        <a href="/super-admin/settings" onClick={(e) => { e.preventDefault(); navigate('/super-admin/settings'); }} className="flex flex-col items-center justify-center text-on-surface-variant active:scale-95 transition-transform w-full h-full">
          <span className="material-symbols-outlined">settings</span>
          <span className="text-[10px] font-bold mt-1">Settings</span>
        </a>
      </nav>

      {/* Success Toast */}
      <div 
        className={`fixed bottom-24 right-4 md:right-8 bg-[#0f172a] text-[#f8fafc] px-6 py-4 rounded-xl shadow-xl flex items-center gap-4 border border-[#1e293b] z-[100] transition-all duration-300 ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}
      >
        <span className="material-symbols-outlined text-[#22c55e] text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
        <div className="flex flex-col">
          <span className="text-sm font-bold">Mitigation Protocol Engaged</span>
          <span className="text-xs font-medium text-[#94a3b8] mt-0.5">Traffic from 192.168.4.12 is being redirected to scrubbers.</span>
        </div>
      </div>

    </div>
  );
};
