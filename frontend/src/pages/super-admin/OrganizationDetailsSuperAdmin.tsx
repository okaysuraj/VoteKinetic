import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const OrganizationDetailsSuperAdmin = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [barHeights, setBarHeights] = useState(Array(10).fill(100));

  useEffect(() => {
    const interval = setInterval(() => {
      setBarHeights(prev => prev.map(() => Math.floor(Math.random() * (100 - 80 + 1) + 80)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest hidden sm:block">SYSTEM.TENANT_OVERSIGHT</span>
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
          <button 
            onClick={() => navigate('/super-admin/organizations')} 
            className="flex items-center gap-2 text-on-surface-variant hover:text-primary mb-8 font-bold text-sm transition-colors w-fit"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            Back to Orgs
          </button>
          
          <nav className="space-y-1">
            <a href="#" className="flex items-center gap-3 px-3 py-2 bg-primary/10 text-primary font-bold rounded-lg transition-colors">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>monitoring</span>
              <span className="text-sm">Overview</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-lg transition-colors">
              <span className="material-symbols-outlined">api</span>
              <span className="font-bold text-sm">API Integration</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-lg transition-colors">
              <span className="material-symbols-outlined">receipt_long</span>
              <span className="font-bold text-sm">Billing & Usage</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-lg transition-colors">
              <span className="material-symbols-outlined">policy</span>
              <span className="font-bold text-sm">Security Policies</span>
            </a>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow p-4 md:p-8 overflow-y-auto">
          
          {/* Top Banner / Hero */}
          <div className="bg-surface border border-outline-variant rounded-xl p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-primary/10 flex items-center justify-center rounded-xl shrink-0">
                <span className="material-symbols-outlined text-primary text-3xl">corporate_fare</span>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl font-bold text-primary">State Electoral Board</h1>
                  <span className="px-2 py-0.5 bg-[#dcfce7] text-[#166534] text-[10px] font-bold uppercase rounded border border-[#bbf7d0]">Active Tenant</span>
                </div>
                <p className="text-sm text-on-surface-variant font-medium">Tenant ID: SEB-01 • Region: US-EAST-1</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="h-10 px-4 border border-outline-variant text-on-surface font-bold text-sm rounded-lg hover:bg-surface-container transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[18px]">lock_person</span>
                Impersonate
              </button>
              <button className="h-10 px-4 border border-error text-error font-bold text-sm rounded-lg hover:bg-error/10 transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[18px]">block</span>
                Suspend
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* KPI Cards */}
            <div className="bg-surface border border-outline-variant p-5 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Total Users</p>
                <span className="material-symbols-outlined text-secondary text-[20px]">group</span>
              </div>
              <p className="text-2xl font-bold text-primary">45,102</p>
              <p className="text-xs text-on-surface-variant font-medium mt-1">98% verified</p>
            </div>
            
            <div className="bg-surface border border-outline-variant p-5 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Active Elections</p>
                <span className="material-symbols-outlined text-secondary text-[20px]">how_to_vote</span>
              </div>
              <p className="text-2xl font-bold text-primary">3</p>
              <p className="text-xs text-on-surface-variant font-medium mt-1">2 upcoming</p>
            </div>
            
            <div className="bg-surface border border-outline-variant p-5 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">API Usage (MTD)</p>
                <span className="material-symbols-outlined text-secondary text-[20px]">api</span>
              </div>
              <p className="text-2xl font-bold text-primary">1.2M <span className="text-sm font-medium text-on-surface-variant">reqs</span></p>
              <p className="text-xs text-secondary font-bold mt-1">24% of quota</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-2 space-y-8">
              
              {/* System Health / Connectivity */}
              <section className="space-y-4">
                <h4 className="text-[10px] font-bold text-on-surface uppercase tracking-widest">Connectivity Status</h4>
                <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm">
                  <div className="p-6 flex items-center justify-between border-b border-outline-variant">
                    <div className="flex items-center gap-4">
                      <span className="material-symbols-outlined text-[#16a34a] text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>cloud_done</span>
                      <div>
                        <p className="font-bold text-on-surface text-lg mb-1">Secure Tunnel Active</p>
                        <p className="text-xs text-on-surface-variant font-medium">Latency: 12ms • Encryption: TLS 1.3</p>
                      </div>
                    </div>
                    {/* Sync Bar Graph */}
                    <div className="hidden sm:flex items-end h-10 gap-1 overflow-hidden opacity-80">
                      {barHeights.map((height, i) => (
                        <div key={i} className="w-1.5 bg-secondary rounded-t-sm transition-all duration-300" style={{ height: `${height}%` }}></div>
                      ))}
                    </div>
                  </div>
                  <div className="px-6 py-4 bg-surface-container-lowest flex justify-between items-center">
                    <span className="text-xs font-bold text-on-surface-variant">Last Full Sync: 2 mins ago</span>
                    <button className="text-xs font-bold text-secondary uppercase tracking-widest hover:underline">Force Sync</button>
                  </div>
                </div>
              </section>

              {/* API & Webhooks */}
              <section className="space-y-4">
                <h4 className="text-[10px] font-bold text-on-surface uppercase tracking-widest">Security Credentials</h4>
                <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm">
                  <div className="p-4 border-b border-outline-variant flex justify-between items-center hover:bg-surface-container-lowest transition-colors">
                    <div>
                      <p className="text-sm font-bold text-on-surface mb-0.5">Primary API Key (Live)</p>
                      <p className="text-xs text-on-surface-variant font-mono">pk_live_8f7d92****************</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="w-8 h-8 rounded border border-outline-variant text-on-surface-variant flex items-center justify-center hover:bg-surface-container transition-colors">
                        <span className="material-symbols-outlined text-[18px]">content_copy</span>
                      </button>
                      <button 
                        className="w-8 h-8 rounded border border-error text-error flex items-center justify-center hover:bg-error/10 transition-colors"
                        onClick={() => setShowModal(true)}
                        title="Rotate Secret"
                      >
                        <span className="material-symbols-outlined text-[18px]">autorenew</span>
                      </button>
                    </div>
                  </div>
                  <div className="p-4 flex justify-between items-center hover:bg-surface-container-lowest transition-colors">
                    <div>
                      <p className="text-sm font-bold text-on-surface mb-0.5">Webhook Endpoint</p>
                      <p className="text-xs text-on-surface-variant font-mono">https://api.votekinetic.com/v1/webhook/seb01</p>
                    </div>
                    <span className="px-2 py-0.5 bg-surface-container text-on-surface-variant text-[10px] font-bold uppercase rounded border border-outline-variant">Verified</span>
                  </div>
                </div>
              </section>

              {/* Audit Highlights */}
              <section className="space-y-4">
                <h4 className="text-[10px] font-bold text-on-surface uppercase tracking-widest">Recent Administrative Actions</h4>
                <div className="bg-surface border border-outline-variant rounded-xl p-6 space-y-6 shadow-sm">
                  
                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded bg-surface-container-high flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[18px] text-primary">key</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-on-surface">Root Key Ceremony Completed</p>
                      <p className="text-xs text-on-surface-variant mt-0.5">By Admin-442 • 2h ago</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded bg-surface-container-high flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[18px] text-primary">person_add</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-on-surface">New Registrar Added</p>
                      <p className="text-xs text-on-surface-variant mt-0.5">Entity: District-7 • 5h ago</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded bg-surface-container-high flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[18px] text-primary">policy</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-on-surface">Security Policy Updated</p>
                      <p className="text-xs text-on-surface-variant mt-0.5">IP Whitelist modification • Yesterday</p>
                    </div>
                  </div>
                  
                </div>
              </section>

            </div>

            <div className="lg:col-span-1 space-y-8">
              
              {/* Administrative Contacts */}
              <section className="space-y-4">
                <h4 className="text-[10px] font-bold text-on-surface uppercase tracking-widest">Administrative Contacts</h4>
                <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm">
                  <div className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-outline-variant bg-surface-container-high flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">person</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-on-surface mb-0.5">Sarah J. Miller</p>
                      <p className="text-xs text-on-surface-variant">Primary Security Liaison</p>
                    </div>
                    <button className="w-8 h-8 text-secondary hover:bg-secondary/10 rounded flex items-center justify-center transition-colors">
                      <span className="material-symbols-outlined text-[20px]">mail</span>
                    </button>
                  </div>
                  <div className="px-4 py-3 bg-surface-container-lowest border-t border-outline-variant flex justify-between items-center">
                    <span className="text-xs font-medium text-on-surface-variant italic">24/7 Priority Support Enabled</span>
                    <span className="material-symbols-outlined text-[#16a34a] text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                  </div>
                </div>
              </section>

              {/* Strategic Map/Location Section */}
              <section className="space-y-4">
                <h4 className="text-[10px] font-bold text-on-surface uppercase tracking-widest">Registry Deployment Region</h4>
                <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden h-64 relative shadow-sm">
                  <div className="absolute inset-0 bg-primary/5"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <span className="material-symbols-outlined" style={{ fontSize: '150px' }}>map</span>
                  </div>
                  <div className="absolute bottom-6 left-6 z-10 bg-white/90 backdrop-blur-sm p-4 border border-outline-variant rounded-lg shadow-sm">
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Data Sovereignty Zone</p>
                    <p className="text-lg font-bold text-primary mb-1">US-EAST-1 (GovCloud)</p>
                    <p className="text-xs text-on-surface-variant font-medium">Compliance: FISMA High / FedRAMP</p>
                  </div>
                </div>
              </section>

            </div>

          </div>

        </main>
      </div>

      {/* Bottom NavBar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 border-t border-outline-variant bg-surface flex justify-around items-center h-16 pb-safe shadow-sm">
        <a href="/super-admin" onClick={(e) => { e.preventDefault(); navigate('/super-admin'); }} className="flex flex-col items-center justify-center text-on-surface-variant active:scale-95 transition-transform">
          <span className="material-symbols-outlined">home</span>
          <span className="text-[10px] font-bold mt-1">Home</span>
        </a>
        <a href="/super-admin/organizations" onClick={(e) => { e.preventDefault(); navigate('/super-admin/organizations'); }} className="flex flex-col items-center justify-center text-primary font-bold active:scale-95 transition-transform">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>corporate_fare</span>
          <span className="text-[10px] font-bold mt-1">Orgs</span>
        </a>
        <a href="/super-admin/users" onClick={(e) => { e.preventDefault(); navigate('/super-admin/users'); }} className="flex flex-col items-center justify-center text-on-surface-variant active:scale-95 transition-transform">
          <span className="material-symbols-outlined">people</span>
          <span className="text-[10px] font-bold mt-1">Users</span>
        </a>
        <a href="/super-admin/settings" onClick={(e) => { e.preventDefault(); navigate('/super-admin/settings'); }} className="flex flex-col items-center justify-center text-on-surface-variant active:scale-95 transition-transform">
          <span className="material-symbols-outlined">shield_person</span>
          <span className="text-[10px] font-bold mt-1">Admin</span>
        </a>
      </nav>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-surface/80 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={() => setShowModal(false)}></div>
          <div className="bg-surface max-w-sm w-full p-8 rounded-xl shadow-2xl border border-outline-variant text-center relative z-10 animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-error text-3xl">lock_reset</span>
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">Confirm Key Rotation?</h3>
            <p className="text-sm text-on-surface-variant mb-8 leading-relaxed">
              This action will invalidate all current API sessions for SEB-01. This process is irreversible.
            </p>
            <div className="flex flex-col gap-3">
              <button 
                className="w-full h-12 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-sm active:scale-95"
                onClick={() => {
                  setShowModal(false);
                  alert('Keys rotated successfully.');
                }}
              >
                Rotate Keys Now
              </button>
              <button 
                className="w-full h-12 border border-outline-variant text-on-surface font-bold rounded-lg hover:bg-surface-container-low transition-colors"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
