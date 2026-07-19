import { useState } from 'react';

export const AppUpdateRequired = () => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      alert('Mandatory Update Initialized. Please do not close the window.');
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface-container-lowest text-on-surface">
      
      {/* Top App Bar */}
      <header className="bg-surface border-b border-outline-variant flex justify-between items-center px-4 md:px-8 h-16 w-full sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
          <h1 className="font-headline-md text-primary font-bold tracking-tight">VOTEKINETIC</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-on-surface-variant bg-surface-container px-2.5 py-1 rounded">V 2.4.1 (STABLE)</span>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4 md:p-8">
        <div className="max-w-[1000px] w-full flex flex-col items-center gap-8">
          
          {/* Hero Update Card */}
          <div className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden relative group shadow-sm">
            {/* Decorative Security Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] overflow-hidden">
              <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-[#115cb9] to-transparent animate-[scan_3s_linear_infinite]"></div>
            </div>
            
            <div className="p-8 md:p-12 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-[40px] text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>system_update</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Critical Security Update Required</h2>
              <p className="text-base font-medium text-on-surface-variant max-w-2xl leading-relaxed">
                To maintain electoral integrity and secure your digital ballot, VOTEKINETIC requires a mandatory update to version 2.5.0. This version includes essential encryption protocols required for the upcoming cycle.
              </p>
              
              <div className="mt-10 flex flex-col md:flex-row gap-4 w-full justify-center">
                <button 
                  className={`bg-primary text-white font-bold text-sm h-12 px-10 rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-all active:scale-95 shadow-sm ${isUpdating ? 'opacity-70 pointer-events-none' : ''}`}
                  onClick={handleUpdate}
                >
                  <span className={`material-symbols-outlined text-[20px] ${isUpdating ? 'animate-spin' : ''}`}>
                    {isUpdating ? 'sync' : 'download'}
                  </span>
                  {isUpdating ? 'PREPARING...' : 'UPDATE NOW'}
                </button>
                <button className="border border-primary text-primary font-bold text-sm h-12 px-10 rounded-lg flex items-center justify-center gap-2 hover:bg-surface-container-low transition-all active:scale-95">
                  LEARN MORE
                </button>
              </div>
            </div>
          </div>

          {/* Detailed Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            
            {/* Patch Notes Card */}
            <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-secondary text-[24px]">assignment_turned_in</span>
                <h3 className="text-lg font-bold text-primary">Security Patch Notes</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">check_circle</span>
                  <span className="text-sm font-medium text-on-surface-variant leading-relaxed">SHA-256 integrity verification for local ballot storage.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">check_circle</span>
                  <span className="text-sm font-medium text-on-surface-variant leading-relaxed">Mandatory Multi-Factor Authentication (MFA) handshake update.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">check_circle</span>
                  <span className="text-sm font-medium text-on-surface-variant leading-relaxed">Patch for CVE-2023-VOTE kernel-level data isolation.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">check_circle</span>
                  <span className="text-sm font-medium text-on-surface-variant leading-relaxed">Enhanced Anti-Tamper detection for biometric scanners.</span>
                </li>
              </ul>
            </div>

            {/* Integrity Image Card */}
            <div className="relative rounded-xl overflow-hidden border border-outline-variant group shadow-sm bg-[#0f172a]">
              <div className="absolute inset-0 bg-primary/40 z-10 transition-opacity group-hover:bg-primary/50"></div>
              <div className="w-full h-full min-h-[250px] bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-50"></div>
              <div className="absolute bottom-0 left-0 p-6 z-20 text-white w-full bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-1">Status</p>
                <h4 className="text-xl font-bold mb-1">System Integrity: Critical</h4>
                <p className="text-sm font-medium opacity-90">Please update to restore full verification status.</p>
              </div>
            </div>

          </div>

          {/* Verification Footer info */}
          <div className="w-full text-center mt-8 pt-8 border-t border-outline-variant">
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 text-on-surface-variant">
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                <span className="text-[10px] font-bold uppercase tracking-widest">DIGITALLY SIGNED BY VOTEKINETIC SECURITY OPERATIONS CENTER</span>
              </div>
              <p className="text-xs font-mono text-outline-variant mt-2">Build Identifier: VK-OS-2.5.0-RELEASE-BETA-SECURE</p>
            </div>
          </div>

        </div>
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}} />

    </div>
  );
};
