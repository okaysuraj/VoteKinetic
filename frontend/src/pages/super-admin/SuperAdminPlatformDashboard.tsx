import { useNavigate } from 'react-router-dom';

export const SuperAdminPlatformDashboard = () => {
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
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest hidden sm:block">SYSTEM.GLOBAL_VIEW</span>
            <div className="flex items-center gap-2 cursor-pointer hover:bg-surface-container p-1 pr-3 rounded-full transition-colors" onClick={() => navigate('/')}>
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-sm">shield_person</span>
              </div>
              <span className="text-sm font-bold text-on-surface hidden md:block">SysAdmin_01</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto w-full px-4 py-6 md:py-8 flex-grow">
        
        {/* Title & Status */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-1 tracking-tight">Platform Overview</h1>
            <p className="text-sm text-on-surface-variant uppercase tracking-widest font-bold">Global Multi-Tenant Instance</p>
          </div>
          <div className="flex items-center gap-3 bg-surface border border-outline-variant px-4 py-2 rounded-lg self-start md:self-auto">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16a34a] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#22c55e]"></span>
            </div>
            <span className="text-xs font-bold text-on-surface tracking-widest uppercase">System Optimal</span>
          </div>
        </div>

        {/* Top KPI Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          
          <div className="bg-surface border border-outline-variant p-5 flex flex-col gap-1 cursor-pointer hover:border-primary transition-colors group">
            <span className="material-symbols-outlined text-secondary mb-2 group-hover:scale-110 transition-transform">corporate_fare</span>
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Active Tenants</p>
            <p className="text-2xl font-bold text-primary">842</p>
            <p className="text-[10px] text-secondary font-bold mt-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px]">arrow_upward</span> +12 this week
            </p>
          </div>
          
          <div className="bg-surface border border-outline-variant p-5 flex flex-col gap-1 cursor-pointer hover:border-primary transition-colors group">
            <span className="material-symbols-outlined text-secondary mb-2 group-hover:scale-110 transition-transform">how_to_vote</span>
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Live Elections</p>
            <p className="text-2xl font-bold text-primary">3,104</p>
            <p className="text-[10px] text-secondary font-bold mt-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px]">arrow_upward</span> High Activity Period
            </p>
          </div>
          
          <div className="bg-surface border border-outline-variant p-5 flex flex-col gap-1 cursor-pointer hover:border-primary transition-colors group">
            <span className="material-symbols-outlined text-secondary mb-2 group-hover:scale-110 transition-transform">group</span>
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Global Voters</p>
            <p className="text-2xl font-bold text-primary">4.2M</p>
            <p className="text-[10px] text-on-surface-variant font-bold mt-2">Registered identities</p>
          </div>
          
          <div className="bg-surface border border-error border-l-4 p-5 flex flex-col gap-1 cursor-pointer bg-error-container/5 hover:bg-error-container/10 transition-colors group">
            <span className="material-symbols-outlined text-error mb-2 group-hover:scale-110 transition-transform">warning</span>
            <p className="text-[10px] font-bold text-error uppercase tracking-widest">Security Flags</p>
            <p className="text-2xl font-bold text-error">7</p>
            <p className="text-[10px] text-error font-bold mt-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px]">priority_high</span> Action Required
            </p>
          </div>
          
        </div>

        {/* Main Grid area */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Main Chart/Map Area (Col-Span 8) */}
          <div className="md:col-span-8 bg-surface border border-outline-variant flex flex-col min-h-[400px]">
            <div className="p-4 border-b border-outline-variant bg-surface-container-lowest flex items-center justify-between">
              <h3 className="text-sm font-bold text-primary tracking-widest uppercase">Global Node Distribution & Load</h3>
              <div className="flex gap-2">
                <button className="text-[10px] font-bold bg-surface-container-high px-2 py-1 rounded">24H</button>
                <button className="text-[10px] font-bold text-on-surface-variant px-2 py-1">7D</button>
              </div>
            </div>
            
            <div className="flex-grow p-4 relative flex flex-col">
              {/* Map Placeholder */}
              <div className="flex-grow bg-[#f8fafc] flex items-center justify-center relative overflow-hidden mb-4 border border-outline-variant border-dashed">
                <span className="material-symbols-outlined text-outline-variant" style={{ fontSize: '180px' }}>public</span>
                <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-secondary rounded-full shadow-[0_0_15px_rgba(var(--color-secondary),0.8)] animate-pulse"></div>
                <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-error rounded-full shadow-[0_0_15px_rgba(var(--color-error),0.8)] animate-pulse"></div>
                <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-secondary rounded-full shadow-[0_0_15px_rgba(var(--color-secondary),0.8)]"></div>
              </div>
              
              <div className="flex justify-between items-center px-2">
                <div className="flex flex-col items-center bg-surface border border-outline-variant p-3 w-32 hover:bg-surface-container-high transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-secondary">dns</span>
                  <p className="text-xs font-bold text-on-surface mt-1">US-EAST-1</p>
                  <p className="text-[10px] font-bold text-[#16a34a]">99.99% UP</p>
                </div>
                <div className="flex flex-col items-center bg-surface border border-outline-variant p-3 w-32 hover:bg-surface-container-high transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-secondary">dns</span>
                  <p className="text-xs font-bold text-on-surface mt-1">EU-CENT-1</p>
                  <p className="text-[10px] font-bold text-[#16a34a]">99.98% UP</p>
                </div>
                <div className="flex flex-col items-center bg-surface border border-outline-variant p-3 w-32 hover:bg-surface-container-high transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-secondary">dns</span>
                  <p className="text-xs font-bold text-on-surface mt-1">AP-SOUTH-1</p>
                  <p className="text-[10px] font-bold text-[#ea580c]">LATENCY (42ms)</p>
                </div>
                <div className="flex flex-col items-center bg-surface border border-outline-variant p-3 w-32 hover:bg-surface-container-high transition-colors cursor-pointer hidden lg:flex">
                  <span className="material-symbols-outlined text-secondary">dns</span>
                  <p className="text-xs font-bold text-on-surface mt-1">SA-EAST-1</p>
                  <p className="text-[10px] font-bold text-[#16a34a]">99.99% UP</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Side Column: Abuse Detection (Col-Span 4) */}
          <div className="md:col-span-4 bg-surface border border-outline-variant flex flex-col h-[400px]">
            <div className="p-4 border-b border-outline-variant bg-surface-container-low flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-error">report</span>
                <h3 className="text-sm font-bold text-primary tracking-widest uppercase">Abuse Detection</h3>
              </div>
              <span className="bg-error text-white text-[10px] font-bold px-2 py-0.5 rounded-full">3 CRITICAL</span>
            </div>
            
            <div className="flex-grow overflow-y-auto">
              
              <div className="p-4 border-b border-outline-variant hover:bg-surface-container-lowest transition-colors cursor-pointer">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs font-bold text-error uppercase">Brute Force Attempt</span>
                  <span className="text-[10px] text-on-surface-variant">2m ago</span>
                </div>
                <p className="text-sm text-on-surface leading-tight">IP 192.168.1.104 flagged for 45+ login attempts on Org #421.</p>
                <div className="mt-3 flex gap-2">
                  <button className="text-[10px] font-bold border border-error text-error px-2 py-1 uppercase tracking-tighter hover:bg-error/10">Block IP</button>
                  <button className="text-[10px] font-bold border border-outline-variant text-on-surface-variant px-2 py-1 uppercase tracking-tighter hover:bg-surface-container">View Org</button>
                </div>
              </div>
              
              <div className="p-4 border-b border-outline-variant hover:bg-surface-container-lowest transition-colors cursor-pointer">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs font-bold text-secondary uppercase">Pattern Deviation</span>
                  <span className="text-[10px] text-on-surface-variant">14m ago</span>
                </div>
                <p className="text-sm text-on-surface leading-tight">High-frequency ballot submission detected from non-standard API client in Region 7.</p>
                <div className="mt-3 flex gap-2">
                  <button className="text-[10px] font-bold border border-secondary text-secondary px-2 py-1 uppercase tracking-tighter hover:bg-secondary/10">Audit Log</button>
                </div>
              </div>
              
              <div className="p-4 hover:bg-surface-container-lowest transition-colors cursor-pointer">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs font-bold text-on-surface-variant uppercase">Proxy Detected</span>
                  <span className="text-[10px] text-on-surface-variant">45m ago</span>
                </div>
                <p className="text-sm text-on-surface leading-tight">8 active sessions identified behind a known commercial VPN node.</p>
              </div>
              
            </div>
            
            <div className="p-4 mt-auto bg-surface-container-low border-t border-outline-variant">
              <button 
                className="w-full bg-surface border border-outline-variant text-on-surface text-sm font-bold py-2 flex items-center justify-center gap-2 hover:bg-surface-container-high transition-colors"
                onClick={() => navigate('/super-admin/abuse-detection')}
              >
                All Security Flags
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>
          
        </div>

        {/* Secondary Row: Organization Distribution */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-surface border border-outline-variant p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[24px]">corporate_fare</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter">Active Tenants</p>
              <p className="text-2xl font-bold text-primary leading-none mt-1">712 / 842</p>
            </div>
          </div>
          
          <div className="bg-surface border border-outline-variant p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[24px]">timer</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter">Avg Latency</p>
              <p className="text-2xl font-bold text-primary leading-none mt-1">18.4ms</p>
            </div>
          </div>
          
          <div className="bg-surface border border-outline-variant p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-error/10 rounded-lg flex items-center justify-center text-error">
              <span className="material-symbols-outlined text-[24px]">sync_problem</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter">Sync Errors</p>
              <p className="text-2xl font-bold text-primary leading-none mt-1">0.02%</p>
            </div>
          </div>
        </div>

      </main>

      {/* Bottom Nav (Mobile Only) */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 bg-surface border-t border-outline-variant px-2 md:hidden">
        <div className="flex flex-col items-center justify-center text-secondary font-bold bg-secondary/10 rounded-full px-4 py-1 cursor-pointer">
          <span className="material-symbols-outlined text-[20px]">dashboard</span>
          <span className="text-[10px]">Dashboard</span>
        </div>
        <div className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
          <span className="material-symbols-outlined text-[20px]">corporate_fare</span>
          <span className="text-[10px]">Tenants</span>
        </div>
        <div className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
          <span className="material-symbols-outlined text-[20px]">verified_user</span>
          <span className="text-[10px]">Security</span>
        </div>
        <div className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-pointer" onClick={() => navigate('/settings')}>
          <span className="material-symbols-outlined text-[20px]">settings</span>
          <span className="text-[10px]">Settings</span>
        </div>
      </nav>

    </div>
  );
};
