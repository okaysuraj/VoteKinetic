import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const CreateOrganizationSuperAdmin = () => {
  const navigate = useNavigate();
  const [seatCount, setSeatCount] = useState<number | string>(500);

  const handleSeatCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeatCount(e.target.value);
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Entity Created successfully!');
    navigate('/super-admin/organizations');
  };

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
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest hidden sm:block">SYSTEM.ORG_PROVISIONING</span>
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
        
        {/* Desktop Sidebar (hidden on mobile) */}
        <aside className="hidden md:flex flex-col w-64 border-r border-outline-variant bg-surface py-6 px-4 shrink-0">
          <nav className="space-y-1">
            <a href="/super-admin" onClick={(e) => { e.preventDefault(); navigate('/super-admin'); }} className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-lg transition-colors">
              <span className="material-symbols-outlined">dashboard</span>
              <span className="font-bold text-sm">Global Dashboard</span>
            </a>
            <a href="/super-admin/organizations" onClick={(e) => { e.preventDefault(); navigate('/super-admin/organizations'); }} className="flex items-center gap-3 px-3 py-2 bg-primary/10 text-primary font-bold rounded-lg transition-colors">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>corporate_fare</span>
              <span className="text-sm">Organizations</span>
            </a>
            <a href="/super-admin/users" className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-lg transition-colors">
              <span className="material-symbols-outlined">people</span>
              <span className="font-bold text-sm">System Users</span>
            </a>
            <a href="/super-admin/settings" className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-lg transition-colors">
              <span className="material-symbols-outlined">settings</span>
              <span className="font-bold text-sm">Platform Settings</span>
            </a>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow p-4 md:p-8 overflow-y-auto">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Register New Entity</h1>
            <p className="text-sm text-on-surface-variant font-medium">Configure the foundational parameters for a new institutional voting environment.</p>
          </div>

          {/* Registration Form */}
          <form className="space-y-6" id="create-org-form" onSubmit={handleNext}>
            
            {/* Section 1: Identity */}
            <div className="p-6 border border-outline-variant bg-surface rounded-xl shadow-sm">
              <div className="flex items-center gap-3 mb-6 text-primary">
                <span className="material-symbols-outlined text-2xl">domain</span>
                <h2 className="text-xl font-bold">Entity Identity</h2>
              </div>
              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <label className="font-bold text-sm text-on-surface" htmlFor="legal-name">Legal Entity Name</label>
                  <input 
                    className="h-12 border border-outline-variant px-4 rounded-lg bg-surface-container-lowest focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none text-sm font-medium" 
                    id="legal-name" 
                    name="legal-name" 
                    placeholder="e.g. Global Democracies Foundation" 
                    type="text"
                    required
                  />
                  <p className="text-xs text-on-surface-variant">Official name as it should appear on all formal reports and ballots.</p>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-bold text-sm text-on-surface" htmlFor="contact-email">Primary Administrative Email</label>
                  <input 
                    className="h-12 border border-outline-variant px-4 rounded-lg bg-surface-container-lowest focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none text-sm font-medium" 
                    id="contact-email" 
                    name="contact-email" 
                    placeholder="admin@organization.org" 
                    type="email"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Scale & Security */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Seat Count */}
              <div className="p-6 border border-outline-variant bg-surface rounded-xl shadow-sm flex flex-col">
                <div className="flex items-center gap-3 mb-4 text-primary">
                  <span className="material-symbols-outlined text-2xl">groups</span>
                  <h2 className="font-bold text-lg">Seat Capacity</h2>
                </div>
                <div className="flex flex-col gap-6 mt-auto">
                  <div className="relative">
                    <input 
                      className="w-full h-14 border border-outline-variant px-4 rounded-lg bg-surface-container-lowest focus:ring-1 focus:ring-primary focus:border-primary outline-none pr-16 font-bold text-2xl" 
                      id="seat-count" 
                      name="seat-count" 
                      type="number" 
                      value={seatCount}
                      onChange={handleSeatCountChange}
                      required
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold text-xs uppercase tracking-widest">SEATS</span>
                  </div>
                  <input 
                    className="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary" 
                    max="5000" 
                    min="10" 
                    step="10" 
                    type="range" 
                    value={seatCount}
                    onChange={handleSeatCountChange}
                  />
                </div>
              </div>

              {/* Security Tier */}
              <div className="p-6 border border-outline-variant bg-surface rounded-xl shadow-sm flex flex-col">
                <div className="flex items-center gap-3 mb-4 text-primary">
                  <span className="material-symbols-outlined text-2xl">verified_user</span>
                  <h2 className="font-bold text-lg">Security Tier</h2>
                </div>
                <div className="relative mt-auto">
                  <select 
                    className="w-full h-12 border border-outline-variant pl-4 pr-10 rounded-lg bg-surface-container-lowest focus:ring-1 focus:ring-primary focus:border-primary outline-none text-sm font-medium appearance-none cursor-pointer" 
                    name="security-tier"
                    defaultValue="high"
                  >
                    <option value="standard">Standard Institutional</option>
                    <option value="high">High Assurance (MFA Required)</option>
                    <option value="sovereign">Sovereign Grade (Hardware Keys)</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
                </div>
                <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">High Assurance is recommended for organizations with over 100 seats.</p>
              </div>
              
            </div>

            {/* Visual Callout */}
            <div className="relative h-48 w-full rounded-xl overflow-hidden group border border-outline-variant">
              <div className="absolute inset-0 bg-primary/90 flex items-center justify-center">
                <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm text-center flex flex-col items-center">
                  <span className="material-symbols-outlined text-white text-4xl mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>lock_person</span>
                  <p className="font-bold text-white text-lg">Secure Infrastructure Ready</p>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-outline-variant">
              <button 
                className="w-full md:w-auto h-12 px-8 border border-primary text-primary font-bold rounded-lg hover:bg-primary/5 transition-colors active:scale-95" 
                type="button"
                onClick={() => navigate('/super-admin/organizations')}
              >
                Cancel
              </button>
              <div className="flex w-full md:w-auto gap-4">
                <button 
                  className="w-full md:w-auto h-12 px-10 bg-primary text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 shadow-sm active:scale-95 transition-all" 
                  type="submit"
                >
                  Proceed to Identity Setup
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
              </div>
            </div>

          </form>

          {/* Info Box */}
          <div className="mt-8 p-4 bg-[#eff6ff] rounded-xl flex gap-4 items-start border border-[#bfdbfe]">
            <span className="material-symbols-outlined text-[#1d4ed8] mt-0.5">info</span>
            <p className="text-sm text-[#1e40af] leading-relaxed">
              Once created, the organization will receive a cryptographic handshake key via the primary administrative email. This key is required for initial boot-strapping.
            </p>
          </div>

        </main>
      </div>

      {/* BottomNavBar Shell (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 border-t border-outline-variant bg-surface shadow-sm">
        <div className="flex justify-around items-center w-full h-16 pb-safe">
          <a href="/super-admin" onClick={(e) => { e.preventDefault(); navigate('/super-admin'); }} className="flex flex-col items-center justify-center text-on-surface-variant">
            <span className="material-symbols-outlined">home</span>
            <span className="text-[10px] font-bold mt-1">Home</span>
          </a>
          <a href="/super-admin/organizations" onClick={(e) => e.preventDefault()} className="flex flex-col items-center justify-center text-primary font-bold">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>corporate_fare</span>
            <span className="text-[10px] font-bold mt-1">Orgs</span>
          </a>
          <a href="/super-admin/users" onClick={(e) => { e.preventDefault(); navigate('/super-admin/users'); }} className="flex flex-col items-center justify-center text-on-surface-variant">
            <span className="material-symbols-outlined">people</span>
            <span className="text-[10px] font-bold mt-1">Users</span>
          </a>
          <a href="/super-admin/settings" onClick={(e) => { e.preventDefault(); navigate('/super-admin/settings'); }} className="flex flex-col items-center justify-center text-on-surface-variant">
            <span className="material-symbols-outlined">shield_person</span>
            <span className="text-[10px] font-bold mt-1">Admin</span>
          </a>
        </div>
      </nav>

    </div>
  );
};
