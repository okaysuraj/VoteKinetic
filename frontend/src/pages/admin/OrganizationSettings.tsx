import { useState } from 'react';

export const OrganizationSettings = () => {
  const [isSavingIdentity, setIsSavingIdentity] = useState(false);
  const [isSavingSecurity, setIsSavingSecurity] = useState(false);
  const [isSavingRegion, setIsSavingRegion] = useState(false);
  const [mfaEnabled, setMfaEnabled] = useState(true);

  const simulateSave = (setSaving: React.Dispatch<React.SetStateAction<boolean>>) => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
    }, 1500);
  };

  return (
    <div className="bg-[#f9f9fc] text-[#1a1c1e] min-h-screen flex flex-col font-sans md:flex-row pb-16 md:pb-0">
      
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
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-[#f0f0f3] rounded-lg transition-colors group">
            <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">corporate_fare</span>
            <span className="text-sm font-bold group-hover:text-primary transition-colors">Organizations</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-[#f0f0f3] rounded-lg transition-colors group">
            <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">people</span>
            <span className="text-sm font-bold group-hover:text-primary transition-colors">Members</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-[#dbeafe] text-[#1e40af] rounded-lg transition-colors">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>shield_person</span>
            <span className="text-sm font-bold">Roles & Security</span>
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
            <span className="material-symbols-outlined text-on-surface-variant">menu</span>
          </button>
        </header>

        <div className="p-4 md:p-8 max-w-[900px] w-full mx-auto md:ml-0 pt-4 md:pt-8">
          
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-bold text-on-surface-variant uppercase tracking-widest">Organization</span>
              <span className="material-symbols-outlined text-on-surface-variant text-[16px]">chevron_right</span>
              <span className="text-sm font-bold text-primary uppercase tracking-widest">District 04 Settings</span>
            </div>
            <h1 className="text-3xl font-bold text-[#1a1c1e] mb-2 tracking-tight">Configuration & Policies</h1>
            <p className="text-sm font-medium text-on-surface-variant max-w-2xl leading-relaxed">
              Manage core identity parameters, security thresholds, and regional adaptations for this organization.
            </p>
          </div>

          <div className="space-y-8">
            
            {/* Section 1: Identity & Branding */}
            <section className="bg-white border border-outline-variant rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-outline-variant bg-[#f9f9fc]">
                <h2 className="text-xl font-bold text-[#1a1c1e] mb-1">Identity & Branding</h2>
                <p className="text-sm font-medium text-on-surface-variant">Primary organizational details visible to voters and auditors.</p>
              </div>
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  
                  <div className="flex-shrink-0 flex flex-col items-center gap-4 w-full md:w-auto">
                    <div className="w-24 h-24 bg-[#f9f9fc] rounded-xl border border-outline-variant flex items-center justify-center shadow-sm">
                      <span className="material-symbols-outlined text-[#4b5563] text-[40px]">account_balance</span>
                    </div>
                    <button className="text-secondary text-sm font-bold hover:underline underline-offset-4">Change Logo</button>
                  </div>
                  
                  <div className="flex-grow space-y-5 w-full">
                    <div>
                      <label className="block text-sm font-bold text-on-surface-variant mb-1.5">Official Organization Name</label>
                      <input 
                        type="text" 
                        defaultValue="District 04 Central Election Board" 
                        className="w-full p-3 bg-white border border-outline-variant rounded-lg text-sm font-medium focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-on-surface-variant mb-1.5">Administrative Contact Email</label>
                      <input 
                        type="email" 
                        defaultValue="admin@district04.gov" 
                        className="w-full p-3 bg-white border border-outline-variant rounded-lg text-sm font-medium focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-on-surface-variant mb-1.5">Public Support Phone</label>
                      <input 
                        type="tel" 
                        defaultValue="+1 (800) 555-0199" 
                        className="w-full p-3 bg-white border border-outline-variant rounded-lg text-sm font-medium focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow" 
                      />
                    </div>
                  </div>
                  
                </div>
              </div>
              <div className="px-6 py-4 bg-[#f9f9fc] border-t border-outline-variant flex justify-end">
                <button 
                  className="bg-primary text-white font-bold text-sm px-6 h-12 rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 active:scale-95 min-w-[160px] shadow-sm"
                  onClick={() => simulateSave(setIsSavingIdentity)}
                  disabled={isSavingIdentity}
                >
                  {isSavingIdentity ? (
                    <><span className="material-symbols-outlined animate-spin text-[18px]">refresh</span> Processing...</>
                  ) : (
                    <><span className="material-symbols-outlined text-[18px]">save</span> Save Changes</>
                  )}
                </button>
              </div>
            </section>

            {/* Section 2: Security Policies */}
            <section className="bg-white border border-outline-variant rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-outline-variant bg-[#f9f9fc]">
                <h2 className="text-xl font-bold text-[#1a1c1e] mb-1">Security Policies</h2>
                <p className="text-sm font-medium text-on-surface-variant">Define how users and admins access the secure environment.</p>
              </div>
              <div className="p-6 space-y-8">
                
                {/* Policy Toggle 1 */}
                <div className="flex items-start justify-between gap-4 p-5 rounded-xl bg-[#f9f9fc] border border-outline-variant shadow-sm">
                  <div>
                    <p className="text-sm font-bold text-[#1a1c1e] mb-1">Mandatory Two-Factor Authentication</p>
                    <p className="text-sm font-medium text-on-surface-variant leading-relaxed">Require all administrative accounts to use hardware keys or TOTP apps.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                    <input type="checkbox" className="sr-only peer" checked={mfaEnabled} onChange={() => setMfaEnabled(!mfaEnabled)} />
                    <div className="w-11 h-6 bg-[#e2e2e5] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16a34a]"></div>
                  </label>
                </div>
                
                {/* Session Timeout */}
                <div className="w-full">
                  <label className="block text-sm font-bold text-on-surface-variant mb-2">Administrative Session Timeout (Minutes)</label>
                  <div className="relative">
                    <select className="w-full p-3 bg-white border border-outline-variant rounded-lg text-sm font-medium appearance-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm cursor-pointer pr-10">
                      <option>15 Minutes</option>
                      <option defaultValue="30 Minutes">30 Minutes</option>
                      <option>60 Minutes</option>
                      <option>4 Hours (Not recommended)</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
                  </div>
                </div>
                
                {/* IP Restriction */}
                <div className="w-full">
                  <label className="block text-sm font-bold text-on-surface-variant mb-2">Allowed Management IP Ranges</label>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input type="text" defaultValue="192.168.1.0/24" className="flex-1 p-3 bg-white border border-outline-variant rounded-lg text-sm font-medium focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm" />
                      <button className="w-12 h-12 text-[#dc2626] border border-outline-variant bg-white hover:bg-[#fef2f2] hover:border-[#fca5a5] rounded-lg transition-colors flex items-center justify-center shadow-sm">
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                    <button className="text-secondary font-bold text-sm flex items-center gap-1 hover:underline underline-offset-4 w-fit p-1">
                      <span className="material-symbols-outlined text-[18px]">add</span> Add IP Range
                    </button>
                  </div>
                </div>
                
              </div>
              <div className="px-6 py-4 bg-[#f9f9fc] border-t border-outline-variant flex justify-end">
                <button 
                  className="bg-primary text-white font-bold text-sm px-6 h-12 rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 active:scale-95 min-w-[180px] shadow-sm"
                  onClick={() => simulateSave(setIsSavingSecurity)}
                  disabled={isSavingSecurity}
                >
                  {isSavingSecurity ? (
                    <><span className="material-symbols-outlined animate-spin text-[18px]">refresh</span> Processing...</>
                  ) : (
                    <><span className="material-symbols-outlined text-[18px]">lock</span> Update Policies</>
                  )}
                </button>
              </div>
            </section>

            {/* Section 3: Regional Preferences */}
            <section className="bg-white border border-outline-variant rounded-xl shadow-sm overflow-hidden mb-8">
              <div className="p-6 border-b border-outline-variant bg-[#f9f9fc]">
                <h2 className="text-xl font-bold text-[#1a1c1e] mb-1">Regional Preferences</h2>
                <p className="text-sm font-medium text-on-surface-variant">Localization settings for voter experience and timestamping.</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-2">Default Language</label>
                    <div className="relative">
                      <select className="w-full p-3 bg-white border border-outline-variant rounded-lg text-sm font-medium appearance-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm cursor-pointer pr-10">
                        <option defaultValue="English (United States)">English (United States)</option>
                        <option>Spanish (Mexico)</option>
                        <option>French (Canada)</option>
                        <option>German (Germany)</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-2">System Timezone</label>
                    <div className="relative">
                      <select className="w-full p-3 bg-white border border-outline-variant rounded-lg text-sm font-medium appearance-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm cursor-pointer pr-10">
                        <option defaultValue="(GMT-05:00) Eastern Time">(GMT-05:00) Eastern Time</option>
                        <option>(GMT-06:00) Central Time</option>
                        <option>(GMT-08:00) Pacific Time</option>
                        <option>(GMT+00:00) UTC</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-2">Date Format</label>
                    <div className="relative">
                      <select className="w-full p-3 bg-white border border-outline-variant rounded-lg text-sm font-medium appearance-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm cursor-pointer pr-10">
                        <option defaultValue="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option>DD/MM/YYYY</option>
                        <option>YYYY-MM-DD</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-2">Currency Unit</label>
                    <div className="relative">
                      <select className="w-full p-3 bg-white border border-outline-variant rounded-lg text-sm font-medium appearance-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm cursor-pointer pr-10">
                        <option defaultValue="USD ($)">USD ($)</option>
                        <option>EUR (€)</option>
                        <option>GBP (£)</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
                    </div>
                  </div>
                  
                </div>
              </div>
              <div className="px-6 py-4 bg-[#f9f9fc] border-t border-outline-variant flex justify-end">
                <button 
                  className="bg-primary text-white font-bold text-sm px-6 h-12 rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 active:scale-95 min-w-[210px] shadow-sm"
                  onClick={() => simulateSave(setIsSavingRegion)}
                  disabled={isSavingRegion}
                >
                  {isSavingRegion ? (
                    <><span className="material-symbols-outlined animate-spin text-[18px]">refresh</span> Processing...</>
                  ) : (
                    <><span className="material-symbols-outlined text-[18px]">public</span> Save Regional Settings</>
                  )}
                </button>
              </div>
            </section>

          </div>

        </div>
      </main>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 bg-white border-t border-outline-variant shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] flex justify-around items-center h-16 pb-safe">
        <a href="#" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors flex-1 h-full active:scale-95">
          <span className="material-symbols-outlined">home</span>
          <span className="text-[10px] font-bold mt-1">Home</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors flex-1 h-full active:scale-95">
          <span className="material-symbols-outlined">corporate_fare</span>
          <span className="text-[10px] font-bold mt-1">Orgs</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors flex-1 h-full active:scale-95">
          <span className="material-symbols-outlined">people</span>
          <span className="text-[10px] font-bold mt-1">Users</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center text-primary font-bold flex-1 h-full active:scale-95">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>shield_person</span>
          <span className="text-[10px] font-bold mt-1">Admin</span>
        </a>
      </nav>

    </div>
  );
};
