import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { adminApi, organizationApi } from '../../api/client';

export const SuperAdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState<any>(null);

  const [organizations, setOrganizations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      adminApi.getDashboard(user),
      organizationApi.list(user),
    ])
      .then(([dashRes, orgsRes]) => {
        setMetrics(dashRes.metrics);

        setOrganizations(orgsRes.organizations || []);
      })
      .catch(err => console.error('Failed to load super admin dashboard', err))
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return (
      <div className="bg-background text-on-background min-h-screen flex items-center justify-center">
        <div className="text-xl font-medium animate-pulse text-on-surface-variant">Initializing System Command Centre...</div>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-background min-h-screen">
      {/* TopNavBar */}
      <header className="w-full top-0 sticky z-50 bg-surface border-b border-outline-variant">
        <div className="flex justify-between items-center h-16 px-margin-desktop max-w-container-max mx-auto">
          <div className="flex items-center gap-stack-lg">
            <span className="font-display-lg text-headline-md font-bold text-primary">VOTEKINETIC</span>
            <nav className="hidden md:flex items-center gap-6 h-full">
              <Link to="/superadmin" className="text-secondary border-b-2 border-secondary font-bold pb-1 font-body-md text-body-md">Dashboard</Link>
              <Link to="/superadmin/organizations" className="text-on-surface-variant font-medium hover:text-primary transition-colors font-body-md text-body-md">Governance</Link>
              <Link to="/superadmin/security" className="text-on-surface-variant font-medium hover:text-primary transition-colors font-body-md text-body-md">Security</Link>
              <Link to="/superadmin/settings" className="text-on-surface-variant font-medium hover:text-primary transition-colors font-body-md text-body-md">Infrastructure</Link>
              <a className="text-on-surface-variant font-medium hover:text-primary transition-colors font-body-md text-body-md" href="#">Logs</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input className="bg-surface-container-low border border-outline rounded-lg pl-10 pr-4 py-2 text-label-md focus:ring-2 focus:ring-secondary focus:outline-none w-48 lg:w-64" placeholder="Global search..." type="text" />
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-all">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-all">
                <span className="material-symbols-outlined">settings</span>
              </button>
              <div className="h-8 w-8 rounded-full bg-secondary-container flex items-center justify-center overflow-hidden ml-2 border border-outline-variant">
                <img className="w-full h-full object-cover" alt="Super Admin Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA--13CnXjg2YmgNc0-U_aeECTy5pjKUOzbr2MQr_8V7tgCiT9AmmNWW64YMUk414NlGHpT6r1UtGB2xyLCs1UNZ_q6gZsOvNMZxeXFynkbEMUU_MXjKMszy8Xse6vzExqXZ7677fPh4JrhEZnq1e_9V7MHA1NWnzsl7wOUCh3r7TeBterFi3Puvz1xKqqjWjpx1oJQgolqNUhnMNqQX7Rx7jeo5awK1p9O_VjWzgutHxC51TxZ6qtegw" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-container-max mx-auto px-margin-desktop py-stack-lg">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-stack-lg border-b border-surface-container-high pb-stack-md">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-primary">System Command Centre</h1>
            <p className="text-on-surface-variant font-body-md text-body-md mt-1">Real-time oversight of global democratic integrity.</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <button className="bg-surface-container-high text-primary px-4 py-2 font-label-md text-label-md rounded-lg flex items-center gap-2 hover:bg-outline-variant transition-colors">
              <span className="material-symbols-outlined text-[18px]">download</span> Export Report
            </button>
            <button className="bg-primary text-on-primary px-4 py-2 font-label-md text-label-md rounded-lg flex items-center gap-2 hover:opacity-90 transition-all shadow-sm">
              <span className="material-symbols-outlined text-[18px]">refresh</span> Force Sync All Nodes
            </button>
          </div>
        </div>

        {/* Global Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-stack-lg">
          {/* Total Voters */}
          <div className="bg-surface border border-outline-variant p-6 rounded-lg active-glow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-on-surface-variant font-label-md text-label-md mb-2">Total Voters</p>
                <h2 className="font-display-lg text-[40px] text-primary">{metrics?.totalUsers?.toLocaleString() || '—'}</h2>
              </div>
              <div className="bg-primary-container p-2 rounded-lg">
                <span className="material-symbols-outlined text-on-primary-container">groups</span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className="flex items-center text-secondary font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[14px]">trending_up</span> +4.2%
              </span>
              <span className="text-on-surface-variant font-label-sm text-label-sm">vs last month</span>
            </div>
          </div>
          {/* Total Organizations */}
          <div className="bg-surface border border-outline-variant p-6 rounded-lg active-glow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-on-surface-variant font-label-md text-label-md mb-2">Total Organizations</p>
                <h2 className="font-display-lg text-[40px] text-primary">{metrics?.totalOrganizations?.toLocaleString() || '—'}</h2>
              </div>
              <div className="bg-secondary-container p-2 rounded-lg">
                <span className="material-symbols-outlined text-on-secondary-container">apartment</span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className="flex items-center text-secondary font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[14px]">trending_up</span> +12 new
              </span>
              <span className="text-on-surface-variant font-label-sm text-label-sm">this week</span>
            </div>
          </div>
          {/* Total Votes Cast */}
          <div className="bg-surface border border-outline-variant p-6 rounded-lg active-glow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-on-surface-variant font-label-md text-label-md mb-2">Total Votes Cast</p>
                <h2 className="font-display-lg text-[40px] text-primary">{metrics?.totalVotes?.toLocaleString() || '—'}</h2>
              </div>
              <div className="bg-tertiary-fixed p-2 rounded-lg">
                <span className="material-symbols-outlined text-on-tertiary-fixed">how_to_vote</span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className="flex items-center text-secondary font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[14px]">trending_up</span> +812k
              </span>
              <span className="text-on-surface-variant font-label-sm text-label-sm">in active periods</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Left Column: Health & Security */}
          <div className="lg:col-span-8 flex flex-col gap-gutter">
            {/* System Health */}
            <section className="bg-surface border border-outline-variant rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-surface-container-high bg-surface-container-low flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">dns</span>
                  <h3 className="font-headline-md text-label-md uppercase tracking-wider text-primary">Global Node Infrastructure</h3>
                </div>
                <span className="text-label-sm font-medium text-secondary flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-secondary inline-block animate-pulse"></span> SYSTEM NOMINAL
                </span>
              </div>
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Node 1 */}
                <div className="p-4 bg-surface-container rounded border border-outline-variant flex items-center justify-between">
                  <div>
                    <h4 className="font-label-md text-on-surface">US-East (Virginia)</h4>
                    <p className="text-label-sm text-on-surface-variant">Uptime: 99.998%</p>
                  </div>
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-green-50 text-green-700">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </div>
                </div>
                {/* Node 2 */}
                <div className="p-4 bg-surface-container rounded border border-outline-variant flex items-center justify-between">
                  <div>
                    <h4 className="font-label-md text-on-surface">EU-Central (Frankfurt)</h4>
                    <p className="text-label-sm text-on-surface-variant">Uptime: 99.991%</p>
                  </div>
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-green-50 text-green-700">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </div>
                </div>
                {/* Node 3 */}
                <div className="p-4 bg-surface-container rounded border border-outline-variant flex items-center justify-between">
                  <div>
                    <h4 className="font-label-md text-on-surface">AP-South (Singapore)</h4>
                    <p className="text-label-sm text-on-surface-variant">Uptime: 99.875%</p>
                  </div>
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-green-50 text-green-700">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </div>
                </div>
                {/* Node 4 */}
                <div className="p-4 bg-surface-container rounded border border-outline-variant flex items-center justify-between">
                  <div>
                    <h4 className="font-label-md text-on-surface">SA-East (São Paulo)</h4>
                    <p className="text-label-sm text-on-surface-variant">Uptime: 99.999%</p>
                  </div>
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-green-50 text-green-700">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Abuse Detection Feed */}
            <section className="bg-surface border border-outline-variant rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-surface-container-high bg-error-container/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-error">security</span>
                  <h3 className="font-headline-md text-label-md uppercase tracking-wider text-error">Active Security Alerts</h3>
                </div>
                <span className="bg-error text-on-error text-[10px] font-bold px-2 py-0.5 rounded-full">3 CRITICAL</span>
              </div>
              <div className="divide-y divide-surface-container-high">
                {/* Alert 1 */}
                <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="mt-1">
                      <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                    </div>
                    <div>
                      <h4 className="font-label-md text-error font-bold">BRUTE FORCE DETECTED</h4>
                      <p className="text-label-sm text-on-surface-variant max-w-md">Tenant ID: ORG_9921. Originating IP: 192.168.1.1. Multiple failed credential attempts on administrative endpoint.</p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-[10px] border border-outline-variant px-2 py-0.5 rounded text-on-surface-variant">TIMESTAMP: 14:22:01 UTC</span>
                        <span className="text-[10px] border border-outline-variant px-2 py-0.5 rounded text-on-surface-variant">SEVERITY: HIGH</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-primary text-on-primary px-4 py-2 font-label-md text-label-md rounded-lg hover:opacity-90">Block IP</button>
                    <button className="bg-surface-container-high text-primary px-4 py-2 font-label-md text-label-md rounded-lg hover:bg-outline-variant">Dismiss</button>
                  </div>
                </div>
                {/* Alert 2 */}
                <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="mt-1">
                      <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>analytics</span>
                    </div>
                    <div>
                      <h4 className="font-label-md text-error font-bold">PATTERN DEVIATION</h4>
                      <p className="text-label-sm text-on-surface-variant max-w-md">Sub-second voting spikes detected in District 12 region. AI models suggest non-human interaction patterns.</p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-[10px] border border-outline-variant px-2 py-0.5 rounded text-on-surface-variant">TIMESTAMP: 14:18:44 UTC</span>
                        <span className="text-[10px] border border-outline-variant px-2 py-0.5 rounded text-on-surface-variant">SEVERITY: CRITICAL</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-primary text-on-primary px-4 py-2 font-label-md text-label-md rounded-lg hover:opacity-90">Quarantine</button>
                    <button className="bg-surface-container-high text-primary px-4 py-2 font-label-md text-label-md rounded-lg hover:bg-outline-variant">Analyze</button>
                  </div>
                </div>
                {/* Alert 3 */}
                <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="mt-1 text-on-tertiary-container">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>vpn_lock</span>
                    </div>
                    <div>
                      <h4 className="font-label-md text-on-surface font-bold">PROXY DETECTED</h4>
                      <p className="text-label-sm text-on-surface-variant max-w-md">15% of inbound traffic from EU-West node utilizing known transparent proxies. Verification required.</p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-[10px] border border-outline-variant px-2 py-0.5 rounded text-on-surface-variant">TIMESTAMP: 13:55:10 UTC</span>
                        <span className="text-[10px] border border-outline-variant px-2 py-0.5 rounded text-on-surface-variant">SEVERITY: MED</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-primary text-on-primary px-4 py-2 font-label-md text-label-md rounded-lg hover:opacity-90">Verify All</button>
                    <button className="bg-surface-container-high text-primary px-4 py-2 font-label-md text-label-md rounded-lg hover:bg-outline-variant">Log</button>
                  </div>
                </div>
              </div>
            </section>
          </div>
          
          {/* Right Column: Active Tenants & Health */}
          <div className="lg:col-span-4 flex flex-col gap-gutter">
            <section className="bg-surface border border-outline-variant rounded-lg overflow-hidden flex-1">
              <div className="px-6 py-4 border-b border-surface-container-high bg-surface-container-low">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">hub</span>
                  <h3 className="font-headline-md text-label-md uppercase tracking-wider text-primary">Active Tenants</h3>
                </div>
              </div>
              <div className="p-4 overflow-y-auto max-h-[600px]">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-label-sm text-on-surface-variant border-b border-outline-variant">
                      <th className="pb-2 font-semibold">TENANT</th>
                      <th className="pb-2 font-semibold text-right">ELECTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container-high">
                    {organizations.map(org => (
                      <tr key={org.id} className="hover:bg-surface-container-low transition-colors">
                        <td className="py-3">
                          <p className="text-label-md font-bold text-primary">{org.name}</p>
                          <p className="text-[10px] text-on-surface-variant">{org.domain || 'No domain'} · {org.timezone}</p>
                        </td>
                        <td className="py-3 text-right">
                          <span className="text-label-sm font-medium text-green-600">{org._count?.elections ?? 0}</span>
                        </td>
                      </tr>
                    ))}
                    {organizations.length === 0 && (
                      <tr><td colSpan={2} className="py-6 text-center text-on-surface-variant">No organizations found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-surface-container-low border-t border-outline-variant">
                <button className="w-full text-center text-label-md font-bold text-secondary hover:underline">
                  <Link to="/superadmin/organizations">View All {organizations.length} Tenants</Link>
                </button>
              </div>
            </section>
            
            {/* System Logs Preview (Micro Bento) */}
            <section className="bg-surface border border-outline-variant rounded-lg p-6 flex flex-col gap-4">
              <h3 className="font-label-md uppercase tracking-wider text-on-surface-variant">Cryptographic Pulse</h3>
              <div className="h-32 w-full relative bg-primary-container/20 rounded overflow-hidden flex items-end">
                {/* Simple visual "wave" representation */}
                <div className="flex items-end h-full w-full gap-1 p-2">
                  <div className="bg-primary flex-1 animate-[pulse_2s_infinite]" style={{ height: '40%' }}></div>
                  <div className="bg-secondary flex-1 animate-[pulse_2.5s_infinite]" style={{ height: '60%' }}></div>
                  <div className="bg-primary flex-1 animate-[pulse_3s_infinite]" style={{ height: '30%' }}></div>
                  <div className="bg-secondary flex-1 animate-[pulse_1.8s_infinite]" style={{ height: '80%' }}></div>
                  <div className="bg-primary flex-1 animate-[pulse_2.2s_infinite]" style={{ height: '50%' }}></div>
                  <div className="bg-secondary flex-1 animate-[pulse_2.8s_infinite]" style={{ height: '70%' }}></div>
                  <div className="bg-primary flex-1 animate-[pulse_2.4s_infinite]" style={{ height: '45%' }}></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <p className="text-[10px] font-mono text-primary font-bold bg-white/80 px-2 py-1 rounded">BLOCK_ID: 0x82A..FF1</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-label-sm text-on-surface-variant">
                <span>Hash Integrity</span>
                <span className="font-mono">VALIDATED</span>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bottom-0 mt-stack-lg border-t border-outline-variant bg-surface-container-lowest">
        <div className="flex flex-col md:flex-row justify-between items-center py-stack-md px-margin-desktop max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <span className="font-label-md text-label-md font-bold text-primary">VOTEKINETIC</span>
            <p className="text-on-surface-variant font-label-sm text-label-sm text-center md:text-left">© 2024 VOTEKINETIC Institutional Grade Voting Systems. All rights reserved.</p>
          </div>
          <nav className="flex gap-6 mt-4 md:mt-0">
            <a className="text-on-surface-variant font-label-sm text-label-sm hover:text-secondary transition-colors" href="#">Security Policy</a>
            <a className="text-on-surface-variant font-label-sm text-label-sm hover:text-secondary transition-colors" href="#">Terms of Governance</a>
            <a className="text-on-surface-variant font-label-sm text-label-sm hover:text-secondary transition-colors" href="#">System Health Status</a>
            <a className="text-on-surface-variant font-label-sm text-label-sm hover:text-secondary transition-colors" href="#">Contact Support</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};
