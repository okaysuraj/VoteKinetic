import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const FeatureFlagsSuperAdmin = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [flags, setFlags] = useState({
    blockchain: true,
    biometric: false,
    audit: false,
    beta: true,
    analytics: false
  });

  const handleToggle = (key: keyof typeof flags) => {
    if (key === 'audit' && !flags.audit) {
      setShowModal(true);
    } else {
      setFlags(prev => ({ ...prev, [key]: !prev[key] }));
    }
  };

  const confirmModal = () => {
    setFlags(prev => ({ ...prev, audit: true }));
    setShowModal(false);
  };

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
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest hidden sm:block">SYSTEM.FLAGS</span>
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
            <a href="/super-admin/settings" onClick={(e) => { e.preventDefault(); navigate('/super-admin/settings'); }} className="flex items-center gap-3 px-3 py-2 bg-primary/10 text-primary font-bold rounded-lg transition-colors">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>toggle_on</span>
              <span className="text-sm">Feature Flags</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-lg transition-colors">
              <span className="material-symbols-outlined">api</span>
              <span className="font-bold text-sm">Integrations</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-lg transition-colors">
              <span className="material-symbols-outlined">policy</span>
              <span className="font-bold text-sm">Platform Policies</span>
            </a>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow p-4 md:p-8 overflow-y-auto max-w-[900px] mx-auto w-full">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Feature Flags</h1>
            <p className="text-sm text-on-surface-variant font-medium">Globally enable or restrict experimental modules across the infrastructure.</p>
          </div>

          <section className="space-y-8">
            
            {/* Flags List */}
            <div className="space-y-4">
              
              {/* Flag Item: Distributed Ledger */}
              <div className={`group p-6 bg-surface border ${flags.blockchain ? 'border-primary/50' : 'border-outline-variant'} rounded-xl shadow-sm transition-all flex items-start justify-between gap-6`}>
                <div className="flex gap-4">
                  <span className="material-symbols-outlined text-primary mt-1 text-[24px]">link</span>
                  <div className="space-y-1">
                    <h5 className="text-lg text-on-surface font-bold">Distributed Ledger Anchoring</h5>
                    <p className="text-sm text-on-surface-variant font-medium leading-relaxed">Cryptographically seal ballot results on a public blockchain architecture to ensure immutability.</p>
                  </div>
                </div>
                <div className="flex items-center shrink-0">
                  <div className="relative inline-block w-12 h-6 transition duration-200 ease-in">
                    <input checked={flags.blockchain} onChange={() => handleToggle('blockchain')} className="absolute block w-0 h-0 opacity-0" type="checkbox"/>
                    <label className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors ${flags.blockchain ? 'bg-primary' : 'bg-outline-variant'}`} onClick={() => handleToggle('blockchain')}>
                      <span className={`absolute block w-4 h-4 mt-1 bg-white rounded-full shadow-md transition-transform duration-200 ${flags.blockchain ? 'translate-x-7' : 'translate-x-1'}`}></span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Flag Item: Biometric Proxy */}
              <div className={`group p-6 bg-surface border ${flags.biometric ? 'border-primary/50' : 'border-outline-variant'} rounded-xl shadow-sm transition-all flex items-start justify-between gap-6`}>
                <div className="flex gap-4">
                  <span className="material-symbols-outlined text-primary mt-1 text-[24px]">fingerprint</span>
                  <div className="space-y-1">
                    <h5 className="text-lg text-on-surface font-bold">Biometric Proxy Delegation</h5>
                    <p className="text-sm text-on-surface-variant font-medium leading-relaxed">Allow organizations to mandate device-level biometric auth for proxy assignments.</p>
                  </div>
                </div>
                <div className="flex items-center shrink-0">
                  <div className="relative inline-block w-12 h-6 transition duration-200 ease-in">
                    <input checked={flags.biometric} onChange={() => handleToggle('biometric')} className="absolute block w-0 h-0 opacity-0" type="checkbox"/>
                    <label className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors ${flags.biometric ? 'bg-primary' : 'bg-outline-variant'}`} onClick={() => handleToggle('biometric')}>
                      <span className={`absolute block w-4 h-4 mt-1 bg-white rounded-full shadow-md transition-transform duration-200 ${flags.biometric ? 'translate-x-7' : 'translate-x-1'}`}></span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Flag Item: Audit Trail Export (High Sensitivity) */}
              <div className={`group p-6 bg-surface border ${flags.audit ? 'border-error/50 bg-error/5' : 'border-outline-variant'} rounded-xl shadow-sm transition-all flex items-start justify-between gap-6`}>
                <div className="flex gap-4">
                  <span className={`material-symbols-outlined mt-1 text-[24px] ${flags.audit ? 'text-error' : 'text-primary'}`}>gavel</span>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h5 className="text-lg text-on-surface font-bold">Raw Audit Trail Export</h5>
                      <span className="px-2 py-0.5 bg-error/10 text-error text-[10px] font-bold uppercase rounded border border-error/20">Critical</span>
                    </div>
                    <p className="text-sm text-on-surface-variant font-medium leading-relaxed">Enable CSV/JSON dumping of the entire event ledger. Required for legal compliance audits.</p>
                  </div>
                </div>
                <div className="flex items-center shrink-0">
                  <div className="relative inline-block w-12 h-6 transition duration-200 ease-in">
                    <input checked={flags.audit} onChange={() => handleToggle('audit')} className="absolute block w-0 h-0 opacity-0" type="checkbox"/>
                    <label className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors ${flags.audit ? 'bg-error' : 'bg-outline-variant'}`} onClick={() => handleToggle('audit')}>
                      <span className={`absolute block w-4 h-4 mt-1 bg-white rounded-full shadow-md transition-transform duration-200 ${flags.audit ? 'translate-x-7' : 'translate-x-1'}`}></span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Flag Item: Beta Ballot Templates */}
              <div className={`group p-6 bg-surface border ${flags.beta ? 'border-primary/50' : 'border-outline-variant'} rounded-xl shadow-sm transition-all flex items-start justify-between gap-6`}>
                <div className="flex gap-4">
                  <span className="material-symbols-outlined text-primary mt-1 text-[24px]">science</span>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h5 className="text-lg text-on-surface font-bold">Beta Ballot Templates</h5>
                      <span className="px-2 py-0.5 bg-[#dcfce7] text-[#166534] border border-[#bbf7d0] text-[10px] font-bold uppercase rounded">Beta</span>
                    </div>
                    <p className="text-sm text-on-surface-variant font-medium leading-relaxed">Expose experimental layout engine for accessibility-first ballot designs to early-adopter regions.</p>
                  </div>
                </div>
                <div className="flex items-center shrink-0">
                  <div className="relative inline-block w-12 h-6 transition duration-200 ease-in">
                    <input checked={flags.beta} onChange={() => handleToggle('beta')} className="absolute block w-0 h-0 opacity-0" type="checkbox"/>
                    <label className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors ${flags.beta ? 'bg-primary' : 'bg-outline-variant'}`} onClick={() => handleToggle('beta')}>
                      <span className={`absolute block w-4 h-4 mt-1 bg-white rounded-full shadow-md transition-transform duration-200 ${flags.beta ? 'translate-x-7' : 'translate-x-1'}`}></span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Flag Item: Real-time Analytics */}
              <div className={`group p-6 bg-surface border ${flags.analytics ? 'border-primary/50' : 'border-outline-variant'} rounded-xl shadow-sm transition-all flex items-start justify-between gap-6`}>
                <div className="flex gap-4">
                  <span className="material-symbols-outlined text-primary mt-1 text-[24px]">analytics</span>
                  <div className="space-y-1">
                    <h5 className="text-lg text-on-surface font-bold">Real-time Analytics</h5>
                    <p className="text-sm text-on-surface-variant font-medium leading-relaxed">Stream live participation data to the national dashboard. May increase server load by 15%.</p>
                  </div>
                </div>
                <div className="flex items-center shrink-0">
                  <div className="relative inline-block w-12 h-6 transition duration-200 ease-in">
                    <input checked={flags.analytics} onChange={() => handleToggle('analytics')} className="absolute block w-0 h-0 opacity-0" type="checkbox"/>
                    <label className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors ${flags.analytics ? 'bg-primary' : 'bg-outline-variant'}`} onClick={() => handleToggle('analytics')}>
                      <span className={`absolute block w-4 h-4 mt-1 bg-white rounded-full shadow-md transition-transform duration-200 ${flags.analytics ? 'translate-x-7' : 'translate-x-1'}`}></span>
                    </label>
                  </div>
                </div>
              </div>

            </div>

            {/* Audit Trail Preview (Institutional Minimalist Section) */}
            <div className="bg-surface rounded-xl border border-outline-variant overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest">
                <h4 className="text-sm font-bold text-on-surface">Recent Configuration Activity</h4>
                <button className="text-primary font-bold text-sm hover:underline flex items-center gap-1">
                  View Full Log <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface">
                      <th className="px-6 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest border-b border-outline-variant">Timestamp</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest border-b border-outline-variant">Admin</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest border-b border-outline-variant">Flag</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest border-b border-outline-variant">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant">
                    <tr className="hover:bg-surface-container-lowest transition-colors">
                      <td className="px-6 py-4 text-xs font-mono text-on-surface-variant">2023-11-24 14:22:01</td>
                      <td className="px-6 py-4 text-sm font-bold text-on-surface">j_carter_adm</td>
                      <td className="px-6 py-4 text-sm font-medium text-on-surface">Biometric Login</td>
                      <td className="px-6 py-4 text-xs font-bold text-secondary">ENABLED</td>
                    </tr>
                    <tr className="hover:bg-surface-container-lowest transition-colors">
                      <td className="px-6 py-4 text-xs font-mono text-on-surface-variant">2023-11-24 11:05:44</td>
                      <td className="px-6 py-4 text-sm font-bold text-on-surface">sys_root</td>
                      <td className="px-6 py-4 text-sm font-medium text-on-surface">Audit Trail Export</td>
                      <td className="px-6 py-4 text-xs font-bold text-on-surface-variant">DISABLED</td>
                    </tr>
                    <tr className="hover:bg-surface-container-lowest transition-colors">
                      <td className="px-6 py-4 text-xs font-mono text-on-surface-variant">2023-11-23 09:12:15</td>
                      <td className="px-6 py-4 text-sm font-bold text-on-surface">a_nguyen_ops</td>
                      <td className="px-6 py-4 text-sm font-medium text-on-surface">Beta Ballot Templates</td>
                      <td className="px-6 py-4 text-xs font-bold text-secondary">ENABLED</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Footer Message */}
            <div className="flex items-center justify-center gap-3 p-6 bg-surface-container-lowest border border-outline-variant border-dashed rounded-xl opacity-80">
              <span className="material-symbols-outlined text-primary text-[20px]">lock</span>
              <p className="text-sm font-medium text-on-surface-variant">Changes are cryptographically signed and distributed via SHA-512 encrypted heartbeat.</p>
            </div>
            
          </section>

        </main>
      </div>

      {/* Bottom Navigation Bar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 flex justify-around items-center h-16 pb-safe bg-surface border-t border-outline-variant shadow-lg">
        <a href="/super-admin" onClick={(e) => { e.preventDefault(); navigate('/super-admin'); }} className="flex flex-col items-center justify-center text-on-surface-variant w-full h-full">
          <span className="material-symbols-outlined">home</span>
          <span className="text-[10px] font-bold mt-1">Home</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center text-on-surface-variant w-full h-full">
          <span className="material-symbols-outlined">corporate_fare</span>
          <span className="text-[10px] font-bold mt-1">Orgs</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center text-on-surface-variant w-full h-full">
          <span className="material-symbols-outlined">people</span>
          <span className="text-[10px] font-bold mt-1">Users</span>
        </a>
        <a href="/super-admin/settings" onClick={(e) => { e.preventDefault(); navigate('/super-admin/settings'); }} className="flex flex-col items-center justify-center text-primary font-bold w-full h-full">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>shield_person</span>
          <span className="text-[10px] font-bold mt-1">Admin</span>
        </a>
      </nav>

      {/* Modal Implementation for Sensitive Changes */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-surface/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={() => setShowModal(false)}></div>
          <div className="bg-surface max-w-md w-full rounded-xl border border-outline-variant shadow-2xl p-8 text-center relative z-10 animate-in zoom-in duration-200">
            <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center text-error mx-auto mb-6">
              <span className="material-symbols-outlined text-4xl">lock_reset</span>
            </div>
            <h3 className="text-2xl font-bold text-on-surface mb-3">Confirm Change</h3>
            <p className="text-sm font-medium text-on-surface-variant mb-8 leading-relaxed">
              You are about to modify a high-sensitivity feature. This action will be logged and attributed to your security clearance.
            </p>
            <div className="flex flex-col gap-3">
              <button 
                className="w-full h-12 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-sm active:scale-95" 
                onClick={confirmModal}
              >
                Authorize with MFA
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
