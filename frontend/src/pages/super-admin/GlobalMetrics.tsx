import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const GlobalMetrics = () => {
  const navigate = useNavigate();
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const bars = [40, 65, 30, 85, 45, 75, 55, 90, 60, 48, 80, 58, 75, 82, 95, 100];

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
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest hidden sm:block">SYSTEM.METRICS</span>
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
          <a href="/super-admin/health" onClick={(e) => { e.preventDefault(); navigate('/super-admin/health'); }} className="p-3 text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-container rounded-xl" title="System Health">
            <span className="material-symbols-outlined text-[24px]">health_and_safety</span>
          </a>
          <a href="#" className="p-3 bg-secondary/10 text-secondary rounded-xl" title="Metrics">
            <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>query_stats</span>
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
              <h1 className="text-3xl font-bold text-primary mb-1">Global Metrics & Analytics</h1>
              <p className="text-sm text-on-surface-variant font-medium">Aggregated data across all active tenants and elections.</p>
            </div>
            <div className="flex gap-2 self-start md:self-auto">
              <button className="px-4 py-2 bg-surface border border-outline-variant rounded-lg text-sm font-bold text-on-surface hover:bg-surface-container flex items-center gap-2 transition-colors shadow-sm">
                <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                Last 30 Days
              </button>
              <button className="px-4 py-2 bg-surface border border-outline-variant rounded-lg text-sm font-bold text-on-surface hover:bg-surface-container flex items-center gap-2 transition-colors shadow-sm">
                <span className="material-symbols-outlined text-[18px]">download</span>
                Export Report
              </button>
            </div>
          </div>

          {/* Top Level KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-surface border border-outline-variant p-5 rounded-xl shadow-sm flex flex-col hover:border-primary transition-colors cursor-pointer group">
              <span className="material-symbols-outlined text-secondary mb-2 group-hover:scale-110 transition-transform text-3xl">how_to_vote</span>
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mt-1">Total Ballots Cast</p>
              <p className="text-3xl font-bold text-primary">12.4M</p>
              <p className="text-xs text-[#16a34a] font-bold mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">trending_up</span> +18% (YoY)
              </p>
            </div>
            
            <div className="bg-surface border border-outline-variant p-5 rounded-xl shadow-sm flex flex-col hover:border-primary transition-colors cursor-pointer group">
              <span className="material-symbols-outlined text-secondary mb-2 group-hover:scale-110 transition-transform text-3xl">verified_user</span>
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mt-1">Verified Voters</p>
              <p className="text-3xl font-bold text-primary">4.2M</p>
              <p className="text-xs text-[#16a34a] font-bold mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">trending_up</span> +5% (MoM)
              </p>
            </div>
            
            <div className="bg-surface border border-outline-variant p-5 rounded-xl shadow-sm flex flex-col hover:border-primary transition-colors cursor-pointer group">
              <span className="material-symbols-outlined text-secondary mb-2 group-hover:scale-110 transition-transform text-3xl">query_stats</span>
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mt-1">Avg Turnout</p>
              <p className="text-3xl font-bold text-primary">68.2%</p>
              <p className="text-xs text-on-surface-variant font-bold mt-1 flex items-center gap-1">
                Across all orgs
              </p>
            </div>
            
            <div className="bg-surface border border-outline-variant p-5 rounded-xl shadow-sm flex flex-col hover:border-primary transition-colors cursor-pointer group">
              <span className="material-symbols-outlined text-secondary mb-2 group-hover:scale-110 transition-transform text-3xl">gavel</span>
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mt-1">Completed Elections</p>
              <p className="text-3xl font-bold text-primary">8,902</p>
              <p className="text-xs text-on-surface-variant font-bold mt-1 flex items-center gap-1">
                Historical total
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Primary Chart Area */}
            <div className="md:col-span-2 bg-surface border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col min-h-[400px]">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-xl font-bold text-primary mb-1">Platform Adoption Trend</h4>
                  <p className="text-sm font-medium text-on-surface-variant">Monthly active voters across global infrastructure</p>
                </div>
                <select className="bg-surface border border-outline-variant rounded-lg px-3 py-1.5 text-sm font-bold text-on-surface outline-none">
                  <option>Voter Volume</option>
                  <option>Election Count</option>
                  <option>API Usage</option>
                </select>
              </div>
              
              {/* Bar Chart Visualization */}
              <div className="flex-grow flex flex-col mt-4">
                <div className="flex-grow flex items-end justify-between gap-1 sm:gap-2">
                  {bars.map((height, i) => (
                    <div 
                      key={i} 
                      className={`w-full rounded-t transition-colors cursor-pointer ${
                        hoveredBar === i || height === 100 ? 'bg-secondary' : 'bg-secondary/20 hover:bg-secondary/40'
                      }`}
                      style={{ height: `${height}%` }}
                      onMouseEnter={() => setHoveredBar(i)}
                      onMouseLeave={() => setHoveredBar(null)}
                    ></div>
                  ))}
                </div>
                <div className="flex justify-between mt-4 text-xs font-bold text-on-surface-variant px-1 border-t border-outline-variant pt-2">
                  <span>JAN 23</span>
                  <span>JUL 23</span>
                  <span>JAN 24</span>
                  <span>PRESENT</span>
                </div>
              </div>
            </div>

            {/* Organization Activity Distribution */}
            <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col">
              <h4 className="text-xl font-bold text-primary mb-1">Activity Mix</h4>
              <p className="text-sm font-medium text-on-surface-variant mb-6">Traffic distribution by client type</p>
              
              <div className="flex-grow flex items-center justify-center relative">
                {/* Circular Chart Visual */}
                <div className="w-48 h-48 rounded-full border-[16px] border-primary flex items-center justify-center relative shadow-inner">
                  <div className="absolute inset-[-16px] w-48 h-48 rounded-full border-[16px] border-secondary border-l-transparent border-b-transparent border-r-transparent rotate-45"></div>
                  <div className="absolute inset-[-16px] w-48 h-48 rounded-full border-[16px] border-outline-variant border-t-transparent border-b-transparent border-r-transparent rotate-[-15deg]"></div>
                  <div className="text-center">
                    <span className="text-4xl font-bold text-primary">842</span>
                    <p className="text-[10px] font-bold text-on-surface-variant mt-1 uppercase tracking-widest">TOTAL ORGS</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 space-y-4">
                <div className="flex justify-between items-center bg-surface-container-lowest p-2 rounded border border-outline-variant/50">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 bg-primary rounded-full"></span>
                    <span className="text-sm font-bold">Government</span>
                  </div>
                  <span className="text-sm font-bold">62%</span>
                </div>
                <div className="flex justify-between items-center bg-surface-container-lowest p-2 rounded border border-outline-variant/50">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 bg-secondary rounded-full"></span>
                    <span className="text-sm font-bold">Non-Profit</span>
                  </div>
                  <span className="text-sm font-bold">24%</span>
                </div>
                <div className="flex justify-between items-center bg-surface-container-lowest p-2 rounded border border-outline-variant/50">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 bg-outline-variant rounded-full"></span>
                    <span className="text-sm font-bold">Private</span>
                  </div>
                  <span className="text-sm font-bold">14%</span>
                </div>
              </div>
            </div>

            {/* Security Audit Summaries */}
            <div className="md:col-span-3 bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-outline-variant flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-surface-container-lowest">
                <div>
                  <h4 className="text-xl font-bold text-primary mb-1">Platform Security Audit Log</h4>
                  <p className="text-sm font-medium text-on-surface-variant">Real-time status of cryptographic ledger health</p>
                </div>
                <button className="flex items-center justify-center gap-2 text-primary font-bold text-sm hover:bg-primary/5 px-4 py-2 rounded-lg transition-colors border border-transparent hover:border-primary/20">
                  <span className="material-symbols-outlined text-[20px]">download</span>
                  Full Audit Export
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-surface">
                      <th className="px-6 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest border-b border-outline-variant">NODE ID</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest border-b border-outline-variant">LOCATION</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest border-b border-outline-variant">LAST HEARTBEAT</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest border-b border-outline-variant">CONSENSUS STATE</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest border-b border-outline-variant">UPTIME</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant">
                    <tr className="hover:bg-surface-container-lowest transition-colors">
                      <td className="px-6 py-4 font-mono text-sm font-bold text-primary">vk-0x921a...f21</td>
                      <td className="px-6 py-4 text-sm font-medium text-on-surface">US-EAST-1 (Virginia)</td>
                      <td className="px-6 py-4 text-sm text-on-surface-variant">2.1s ago</td>
                      <td className="px-6 py-4">
                        <span className="bg-[#dcfce7] text-[#166534] border border-[#bbf7d0] px-2.5 py-1 rounded-md text-[10px] font-bold flex items-center gap-1.5 w-fit uppercase tracking-widest">
                          <span className="w-1.5 h-1.5 bg-[#16a34a] rounded-full"></span> SYNCHRONIZED
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-on-surface">99.998%</td>
                    </tr>
                    <tr className="hover:bg-surface-container-lowest transition-colors">
                      <td className="px-6 py-4 font-mono text-sm font-bold text-primary">vk-0x312b...e4a</td>
                      <td className="px-6 py-4 text-sm font-medium text-on-surface">EU-CENTRAL-1 (Frankfurt)</td>
                      <td className="px-6 py-4 text-sm text-on-surface-variant">1.4s ago</td>
                      <td className="px-6 py-4">
                        <span className="bg-[#dcfce7] text-[#166534] border border-[#bbf7d0] px-2.5 py-1 rounded-md text-[10px] font-bold flex items-center gap-1.5 w-fit uppercase tracking-widest">
                          <span className="w-1.5 h-1.5 bg-[#16a34a] rounded-full"></span> SYNCHRONIZED
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-on-surface">99.999%</td>
                    </tr>
                    <tr className="hover:bg-surface-container-lowest transition-colors">
                      <td className="px-6 py-4 font-mono text-sm font-bold text-primary">vk-0x77c4...b99</td>
                      <td className="px-6 py-4 text-sm font-medium text-on-surface">AP-SOUTHEAST-1 (Singapore)</td>
                      <td className="px-6 py-4 text-sm text-on-surface-variant">0.8s ago</td>
                      <td className="px-6 py-4">
                        <span className="bg-[#dbeafe] text-[#1e40af] border border-[#bfdbfe] px-2.5 py-1 rounded-md text-[10px] font-bold flex items-center gap-1.5 w-fit uppercase tracking-widest">
                          <span className="w-1.5 h-1.5 bg-[#2563eb] rounded-full animate-pulse"></span> RE-INDEXING
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-on-surface">99.942%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Advanced Monitoring Visual */}
            <div className="md:col-span-3 h-[300px] rounded-xl overflow-hidden relative border border-outline-variant shadow-sm group">
              <div className="absolute inset-0 bg-[#0f172a] flex items-center justify-center">
                {/* Simulated Data visualization background */}
                <div className="w-full h-full opacity-30 group-hover:opacity-50 transition-opacity duration-700" style={{
                  backgroundImage: 'radial-gradient(circle at center, #3b82f6 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}></div>
                <span className="material-symbols-outlined text-[#3b82f6] text-[120px] opacity-20 absolute animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>public</span>
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent flex flex-col justify-end p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center backdrop-blur-md border border-primary/30">
                    <span className="material-symbols-outlined text-primary text-2xl">monitoring</span>
                  </div>
                  <div>
                    <h5 className="text-white font-bold text-lg mb-0.5">Global Ledger Health Signal</h5>
                    <p className="text-[#94a3b8] text-sm">Visualizing live traffic encrypted flow across 18 edge locations.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>

      {/* BottomNavBar (Mobile only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 bg-surface border-t border-outline-variant shadow-lg">
        <a href="/super-admin" onClick={(e) => { e.preventDefault(); navigate('/super-admin'); }} className="flex flex-col items-center justify-center text-on-surface-variant active:scale-95 transition-transform w-full h-full">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px] font-bold mt-1">Dashboard</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center text-on-surface-variant active:scale-95 transition-transform w-full h-full">
          <span className="material-symbols-outlined">how_to_vote</span>
          <span className="text-[10px] font-bold mt-1">Ballots</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center text-on-surface-variant active:scale-95 transition-transform w-full h-full">
          <span className="material-symbols-outlined">verified_user</span>
          <span className="text-[10px] font-bold mt-1">Security</span>
        </a>
        <a href="/super-admin/settings" onClick={(e) => { e.preventDefault(); navigate('/super-admin/settings'); }} className="flex flex-col items-center justify-center text-on-surface-variant active:scale-95 transition-transform w-full h-full">
          <span className="material-symbols-outlined">settings</span>
          <span className="text-[10px] font-bold mt-1">Settings</span>
        </a>
      </nav>

    </div>
  );
};
