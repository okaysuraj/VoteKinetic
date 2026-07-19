import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const PlatformSystemHealth = () => {
  const navigate = useNavigate();
  const [logs, setLogs] = useState<string[]>([
    "INFO: Node NA-EAST-1 completed block validation.",
    "TRACE: API Request to /v1/ballot/verify success in 14ms.",
    "DEBUG: Synchronizing database mirror DC-ALPHA-02.",
    "INFO: Consensus reached for block #14292031."
  ]);

  const logEntries = [
    "INFO: Transaction broadcast to 12 clusters.",
    "DEBUG: Garbage collection finished for memory pool 0.",
    "TRACE: WebSocket handshake with HK-CORE-9.",
    "INFO: Vote integrity check completed: 0 errors.",
    "WARN: Latency surge detected in SA-WEST cluster.",
    "INFO: New block committed to distributed ledger."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const entry = logEntries[Math.floor(Math.random() * logEntries.length)];
      setLogs(prev => {
        const newLogs = [...prev, entry];
        if (newLogs.length > 6) {
          newLogs.shift();
        }
        return newLogs;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getTime = () => {
    return new Date().toLocaleTimeString('en-GB', { hour12: false });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] pb-20 md:pb-0">
      
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
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest hidden sm:block">SYSTEM.HEALTH</span>
            <div className="flex items-center gap-2 cursor-pointer hover:bg-surface-container p-1 pr-3 rounded-full transition-colors" onClick={() => navigate('/super-admin')}>
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-sm">shield_person</span>
              </div>
              <span className="text-sm font-bold text-on-surface hidden md:block">SysAdmin_01</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-grow max-w-[1440px] mx-auto w-full">
        
        {/* Side Nav for Desktop */}
        <aside className="hidden md:flex flex-col w-20 border-r border-outline-variant bg-surface py-6 items-center gap-6 shrink-0 h-[calc(100vh-64px)] sticky top-16">
          <a href="/super-admin" onClick={(e) => { e.preventDefault(); navigate('/super-admin'); }} className="p-3 text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-container rounded-xl" title="Dashboard">
            <span className="material-symbols-outlined text-[24px]">dashboard</span>
          </a>
          <a href="#" className="p-3 text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-container rounded-xl" title="Tenants">
            <span className="material-symbols-outlined text-[24px]">corporate_fare</span>
          </a>
          <a href="#" className="p-3 bg-secondary/10 text-secondary rounded-xl" title="System Health">
            <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>health_and_safety</span>
          </a>
          <a href="#" className="p-3 text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-container rounded-xl" title="Metrics">
            <span className="material-symbols-outlined text-[24px]">query_stats</span>
          </a>
          <div className="mt-auto">
            <a href="/super-admin/settings" onClick={(e) => { e.preventDefault(); navigate('/super-admin/settings'); }} className="p-3 text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-container rounded-xl" title="Settings">
              <span className="material-symbols-outlined text-[24px]">settings</span>
            </a>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow p-4 md:p-8 overflow-y-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-1">System Health & Telemetry</h1>
              <p className="text-sm text-on-surface-variant font-medium">Real-time status of global infrastructure and consensus nodes.</p>
            </div>
            <div className="flex gap-3 self-start md:self-auto">
              <span className="px-4 py-2 rounded-lg bg-[#dcfce7] border border-[#bbf7d0] text-[#166534] text-xs font-bold flex items-center gap-2 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse"></span>
                ALL SYSTEMS OPERATIONAL
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Core Consensus Network */}
            <div className="md:col-span-8 bg-surface border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-2xl">hub</span>
                  <h2 className="text-lg font-bold text-primary">Core Consensus Network</h2>
                </div>
                <button className="text-xs font-bold text-secondary uppercase hover:underline">View Topology</button>
              </div>
              
              <div className="flex-grow flex flex-col justify-center space-y-8">
                
                <div>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-on-surface-variant uppercase tracking-widest">Global Node Sync</span>
                    <span className="text-[#16a34a]">99.98%</span>
                  </div>
                  <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                    <div className="bg-[#16a34a] w-full h-full"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-on-surface-variant uppercase tracking-widest">Block Validation Time</span>
                    <span className="text-on-surface font-mono">1.24s</span>
                  </div>
                  <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                    <div className="bg-secondary w-full h-full"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-on-surface-variant uppercase tracking-widest">TPS (Transactions/Sec)</span>
                    <span className="text-on-surface font-mono">2,481</span>
                  </div>
                  <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                    <div className="bg-secondary w-[65%] h-full"></div>
                  </div>
                </div>
                
              </div>
            </div>

            {/* Database Clusters */}
            <div className="md:col-span-4 bg-surface border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-2xl">storage</span>
                  <h2 className="text-lg font-bold text-primary uppercase">Databases</h2>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] bg-[#dcfce7] text-[#166534] font-bold uppercase tracking-widest border border-[#bbf7d0]">Healthy</span>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-surface-container-lowest rounded-lg border border-outline-variant">
                  <span className="text-sm font-bold text-on-surface">Primary Cluster</span>
                  <span className="material-symbols-outlined text-[#16a34a] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-surface-container-lowest rounded-lg border border-outline-variant">
                  <span className="text-sm font-bold text-on-surface">Secondary Mirror</span>
                  <span className="material-symbols-outlined text-[#16a34a] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-surface-container-lowest rounded-lg border border-outline-variant">
                  <span className="text-sm font-bold text-on-surface">Archive Vault</span>
                  <span className="material-symbols-outlined text-[#16a34a] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
              </div>
            </div>

            {/* API Gateways (Horizontal Grid) */}
            <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-sm hover:border-primary transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1 group-hover:text-primary transition-colors">Gateway 01</div>
                    <div className="text-3xl font-bold text-primary">0.04ms</div>
                  </div>
                  <span className="material-symbols-outlined text-secondary text-3xl group-hover:scale-110 transition-transform">lan</span>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Response Latency (Global Avg)</div>
              </div>
              
              <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-sm hover:border-primary transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1 group-hover:text-primary transition-colors">Traffic Load</div>
                    <div className="text-3xl font-bold text-primary">18.4k</div>
                  </div>
                  <span className="material-symbols-outlined text-secondary text-3xl group-hover:scale-110 transition-transform">trending_up</span>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Requests Per Minute</div>
              </div>
              
              <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-sm hover:border-primary transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1 group-hover:text-primary transition-colors">Secure Pipes</div>
                    <div className="text-3xl font-bold text-primary">100%</div>
                  </div>
                  <span className="material-symbols-outlined text-secondary text-3xl group-hover:scale-110 transition-transform">encrypted</span>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">TLS 1.3 / E2E Encrypted</div>
              </div>
              
            </div>

            {/* System Logs/Console (Wide) */}
            <div className="md:col-span-12 bg-[#0f172a] text-[#f8fafc] rounded-xl overflow-hidden shadow-xl p-6 font-mono text-sm min-h-[250px] border border-[#1e293b]">
              <div className="flex items-center gap-2 mb-6 border-b border-[#334155] pb-3">
                <span className="w-3 h-3 rounded-full bg-[#ef4444]"></span>
                <span className="w-3 h-3 rounded-full bg-[#eab308]"></span>
                <span className="w-3 h-3 rounded-full bg-[#22c55e]"></span>
                <span className="ml-3 uppercase tracking-widest text-[10px] font-bold text-[#94a3b8]">Terminal Output - Live Audit Trail</span>
              </div>
              <div className="space-y-2 opacity-90">
                {logs.map((log, i) => (
                  <div key={i} className="animate-in fade-in duration-500">
                    <span className="text-[#64748b]">[{getTime()}]</span>{' '}
                    <span dangerouslySetInnerHTML={{ __html: log.replace(/(INFO|TRACE|DEBUG|WARN)/, match => {
                      if(match === 'INFO') return '<span class="text-[#3b82f6]">INFO</span>';
                      if(match === 'WARN') return '<span class="text-[#eab308]">WARN</span>';
                      return `<span class="text-[#a855f7]">${match}</span>`;
                    }) }}></span>
                  </div>
                ))}
                <div className="animate-pulse text-[#3b82f6] mt-2">_</div>
              </div>
            </div>

          </div>
        </main>
      </div>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 bg-surface border-t border-outline-variant md:hidden shadow-lg">
        <a href="/super-admin" onClick={(e) => { e.preventDefault(); navigate('/super-admin'); }} className="flex flex-col items-center justify-center text-on-surface-variant active:scale-95 transition-transform w-full h-full">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px] font-bold mt-1">Dashboard</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center text-on-surface-variant active:scale-95 transition-transform w-full h-full">
          <span className="material-symbols-outlined">corporate_fare</span>
          <span className="text-[10px] font-bold mt-1">Tenants</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center text-secondary font-bold bg-secondary/10 active:scale-95 transition-transform w-full h-full">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>health_and_safety</span>
          <span className="text-[10px] font-bold mt-1">Health</span>
        </a>
        <a href="/super-admin/settings" onClick={(e) => { e.preventDefault(); navigate('/super-admin/settings'); }} className="flex flex-col items-center justify-center text-on-surface-variant active:scale-95 transition-transform w-full h-full">
          <span className="material-symbols-outlined">settings</span>
          <span className="text-[10px] font-bold mt-1">Settings</span>
        </a>
      </nav>

    </div>
  );
};
