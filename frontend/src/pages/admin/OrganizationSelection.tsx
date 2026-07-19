import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const OrganizationSelection = () => {
  const navigate = useNavigate();
  const [activeOrg, setActiveOrg] = useState<number | null>(1); // Default to first

  return (
    <div className="bg-[#f9f9fc] text-[#1a1c1e] min-h-screen font-sans flex flex-col md:flex-row pb-16 md:pb-0">
      
      {/* Side Navigation (Desktop) */}
      <aside className="hidden md:flex flex-col w-[260px] border-r border-outline-variant bg-white min-h-screen sticky top-0">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary text-[28px]">verified_user</span>
            <span className="font-bold text-xl tracking-tight text-primary">VOTEKINETIC</span>
          </div>
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Global Admin</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-[#f0f0f3] rounded-lg transition-colors group">
            <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">home</span>
            <span className="text-sm font-bold group-hover:text-primary transition-colors">Overview</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-[#dbeafe] text-[#1e40af] rounded-lg transition-colors">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>corporate_fare</span>
            <span className="text-sm font-bold">Organizations</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-[#f0f0f3] rounded-lg transition-colors group">
            <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">people</span>
            <span className="text-sm font-bold group-hover:text-primary transition-colors">Members</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-[#f0f0f3] rounded-lg transition-colors group">
            <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">shield_person</span>
            <span className="text-sm font-bold group-hover:text-primary transition-colors">Roles & Security</span>
          </a>
        </nav>
        
        <div className="p-4 border-t border-outline-variant">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#f0f0f3] border border-outline-variant flex items-center justify-center">
              <span className="material-symbols-outlined text-[#4b5563]">person</span>
            </div>
            <div>
              <p className="text-sm font-bold text-[#1a1c1e]">Admin_Node_01</p>
              <p className="text-xs text-on-surface-variant">System Administrator</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header (Mobile) */}
        <header className="md:hidden flex items-center justify-between px-4 py-4 bg-white border-b border-outline-variant sticky top-0 z-40">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">verified_user</span>
            <span className="font-bold text-lg text-primary">VOTEKINETIC</span>
          </div>
          <button className="p-2 rounded-full hover:bg-[#f0f0f3] transition-colors">
            <span className="material-symbols-outlined text-on-surface-variant">account_circle</span>
          </button>
        </header>

        <div className="p-4 md:p-8 max-w-[800px] w-full mx-auto md:ml-0 pt-4 md:pt-8">
          
          <h1 className="text-3xl font-bold text-[#1a1c1e] mb-2 tracking-tight">Organization Access</h1>
          <p className="text-sm font-medium text-on-surface-variant mb-8 leading-relaxed max-w-xl">
            Select an administrative zone to manage elections, verify tally protocols, or configure security parameters.
          </p>
          
          <div className="space-y-4">
            
            {/* Org Item 1 */}
            <div 
              className={`p-4 md:p-5 flex items-center justify-between rounded-xl cursor-pointer transition-all group shadow-sm ${activeOrg === 1 ? 'bg-[#eff6ff] border-2 border-[#1d4ed8]' : 'bg-white border border-outline-variant hover:border-primary/30'}`}
              onClick={() => { setActiveOrg(1); navigate('/admin/organization-overview'); }}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center shadow-sm ${activeOrg === 1 ? 'bg-[#1d4ed8] text-white' : 'bg-[#f9f9fc] text-primary'}`}>
                  <span className="material-symbols-outlined text-[24px]">account_balance</span>
                </div>
                <div className="flex flex-col">
                  <span className={`text-base font-bold ${activeOrg === 1 ? 'text-[#1d4ed8]' : 'text-[#1a1c1e]'}`}>District 04 Central Election Board</span>
                  <span className="text-xs font-medium text-on-surface-variant mt-0.5">Role: System Administrator</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {activeOrg === 1 ? (
                  <>
                    <span className="bg-[#1d4ed8] text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest hidden sm:block">Active</span>
                    <span className="material-symbols-outlined text-[#1d4ed8] text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </>
                ) : (
                  <span className="material-symbols-outlined text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward_ios</span>
                )}
              </div>
            </div>

            {/* Org Item 2 */}
            <div 
              className={`p-4 md:p-5 flex items-center justify-between rounded-xl cursor-pointer transition-all group shadow-sm ${activeOrg === 2 ? 'bg-[#eff6ff] border-2 border-[#1d4ed8]' : 'bg-white border border-outline-variant hover:border-primary/30'}`}
              onClick={() => { setActiveOrg(2); navigate('/admin/organization-overview'); }}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center shadow-sm ${activeOrg === 2 ? 'bg-[#1d4ed8] text-white' : 'bg-[#f9f9fc] text-primary'}`}>
                  <span className="material-symbols-outlined text-[24px]">corporate_fare</span>
                </div>
                <div className="flex flex-col">
                  <span className={`text-base font-bold ${activeOrg === 2 ? 'text-[#1d4ed8]' : 'text-[#1a1c1e]'}`}>State Voting Bureau</span>
                  <span className="text-xs font-medium text-on-surface-variant mt-0.5">Role: Officer</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {activeOrg === 2 ? (
                  <>
                    <span className="bg-[#1d4ed8] text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest hidden sm:block">Active</span>
                    <span className="material-symbols-outlined text-[#1d4ed8] text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </>
                ) : (
                  <span className="material-symbols-outlined text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward_ios</span>
                )}
              </div>
            </div>

            {/* Org Item 3 */}
            <div 
              className={`p-4 md:p-5 flex items-center justify-between rounded-xl cursor-pointer transition-all group shadow-sm ${activeOrg === 3 ? 'bg-[#eff6ff] border-2 border-[#1d4ed8]' : 'bg-white border border-outline-variant hover:border-primary/30'}`}
              onClick={() => { setActiveOrg(3); navigate('/admin/organization-overview'); }}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center shadow-sm ${activeOrg === 3 ? 'bg-[#1d4ed8] text-white' : 'bg-[#f9f9fc] text-primary'}`}>
                  <span className="material-symbols-outlined text-[24px]">domain</span>
                </div>
                <div className="flex flex-col">
                  <span className={`text-base font-bold ${activeOrg === 3 ? 'text-[#1d4ed8]' : 'text-[#1a1c1e]'}`}>Municipal Oversight Committee</span>
                  <span className="text-xs font-medium text-on-surface-variant mt-0.5">Role: Auditor</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {activeOrg === 3 ? (
                  <>
                    <span className="bg-[#1d4ed8] text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest hidden sm:block">Active</span>
                    <span className="material-symbols-outlined text-[#1d4ed8] text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </>
                ) : (
                  <span className="material-symbols-outlined text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward_ios</span>
                )}
              </div>
            </div>

            {/* Org Item 4 */}
            <div 
              className={`p-4 md:p-5 flex items-center justify-between rounded-xl cursor-pointer transition-all group shadow-sm ${activeOrg === 4 ? 'bg-[#eff6ff] border-2 border-[#1d4ed8]' : 'bg-white border border-outline-variant hover:border-primary/30'}`}
              onClick={() => { setActiveOrg(4); navigate('/admin/organization-overview'); }}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center shadow-sm ${activeOrg === 4 ? 'bg-[#1d4ed8] text-white' : 'bg-[#f9f9fc] text-primary'}`}>
                  <span className="material-symbols-outlined text-[24px]">gavel</span>
                </div>
                <div className="flex flex-col">
                  <span className={`text-base font-bold ${activeOrg === 4 ? 'text-[#1d4ed8]' : 'text-[#1a1c1e]'}`}>Judicial Review Council</span>
                  <span className="text-xs font-medium text-on-surface-variant mt-0.5">Role: Member</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {activeOrg === 4 ? (
                  <>
                    <span className="bg-[#1d4ed8] text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest hidden sm:block">Active</span>
                    <span className="material-symbols-outlined text-[#1d4ed8] text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </>
                ) : (
                  <span className="material-symbols-outlined text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward_ios</span>
                )}
              </div>
            </div>

          </div>

          {/* Additional Actions */}
          <div className="mt-8 flex flex-col gap-5 border-t border-outline-variant pt-8">
            <button className="w-full h-14 flex items-center justify-center gap-2 bg-primary text-white font-bold text-sm rounded-lg hover:bg-primary/90 transition-all shadow-sm active:scale-95">
              <span className="material-symbols-outlined text-[20px]">add</span>
              Request Access to Organization
            </button>
            <p className="text-center text-xs font-medium text-on-surface-variant">
              Don't see your organization? Contact your regional administrator for credentials.
            </p>
          </div>

          {/* Visualization / Institutional Context */}
          <div className="mt-10 relative overflow-hidden rounded-xl h-48 border border-outline-variant shadow-sm group">
            <div className="absolute inset-0 bg-cover bg-center grayscale opacity-80 group-hover:scale-105 transition-transform duration-1000" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')" }}></div>
            <div className="absolute inset-0 bg-[#0f172a]/50"></div>
            <div className="absolute inset-0 flex items-center justify-center p-6 backdrop-blur-[1px]">
              <div className="text-center">
                <span className="material-symbols-outlined text-white text-[32px] mb-3" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Trusted Electoral Systems</h3>
                <p className="text-sm font-medium text-white/90">Managed by VOTEKINETIC Core Security Protocols</p>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 border-t border-outline-variant bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] flex justify-around items-center h-16 pb-safe">
        <a href="#" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors flex-1 h-full active:scale-95">
          <span className="material-symbols-outlined">home</span>
          <span className="text-[10px] font-bold mt-1">Home</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center text-primary font-bold flex-1 h-full active:scale-95">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>corporate_fare</span>
          <span className="text-[10px] font-bold mt-1">Orgs</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors flex-1 h-full active:scale-95">
          <span className="material-symbols-outlined">people</span>
          <span className="text-[10px] font-bold mt-1">Users</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors flex-1 h-full active:scale-95">
          <span className="material-symbols-outlined">shield_person</span>
          <span className="text-[10px] font-bold mt-1">Admin</span>
        </a>
      </nav>

    </div>
  );
};
