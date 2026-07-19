import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const BiometricSetup = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);

  const handleEnableBiometrics = () => {
    setIsModalOpen(true);
    setProgress(0);
    setIsSuccess(false);

    // Simulate scanning
    setTimeout(() => {
      setProgress(100);
    }, 100);

    // Success Transition
    setTimeout(() => {
      setIsSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setIsConfigured(true);
      }, 1500);
    }, 2100);
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface-container-lowest pb-20 md:pb-0">
      
      {/* Top App Bar */}
      <header className="bg-surface border-b border-outline-variant flex justify-between items-center px-4 md:px-8 h-16 w-full sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button className="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center p-2 rounded-full hover:bg-surface-container-low" onClick={() => navigate(-1)}>
            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
          </button>
          <h1 className="font-headline-md text-primary font-bold tracking-tight">Security Configuration</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-outline">help_outline</span>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4 md:p-8">
        <div className="max-w-[600px] w-full flex flex-col items-center gap-8">
          
          <div className="text-center w-full max-w-sm mb-4">
            <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-[48px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>fingerprint</span>
            </div>
            <h2 className="text-3xl font-bold text-on-surface mb-3">Hardware Security</h2>
            <p className="text-base font-medium text-on-surface-variant leading-relaxed">
              Link your device's biometric authentication (Face ID or Touch ID) to establish an immutable, zero-knowledge proof for ballot casting.
            </p>
          </div>

          <div className="w-full bg-surface border border-outline-variant rounded-xl p-6 shadow-sm">
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4 p-4 rounded-lg border border-outline-variant hover:border-secondary transition-colors group">
                <div className="bg-secondary/10 p-2 rounded shrink-0">
                  <span className="material-symbols-outlined text-secondary text-[24px]">vpn_key</span>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-on-surface group-hover:text-secondary transition-colors">Zero-Knowledge Storage</h4>
                  <p className="text-xs font-medium text-on-surface-variant leading-relaxed">
                    Your biometric data never leaves your device's Secure Enclave. Only a cryptographic proof is sent to our servers.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 rounded-lg border border-outline-variant hover:border-secondary transition-colors group">
                <div className="bg-secondary/10 p-2 rounded shrink-0">
                  <span className="material-symbols-outlined text-secondary text-[24px]">shield_person</span>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-on-surface group-hover:text-secondary transition-colors">Identity Integrity</h4>
                  <p className="text-xs font-medium text-on-surface-variant leading-relaxed">
                    Biometrics ensure that only the verified account owner can authorize a final ballot submission.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 rounded-lg border border-outline-variant hover:border-secondary transition-colors group">
                <div className="bg-secondary/10 p-2 rounded shrink-0">
                  <span className="material-symbols-outlined text-secondary text-[24px]">history_edu</span>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-on-surface group-hover:text-secondary transition-colors">Immutable Audit Trail</h4>
                  <p className="text-xs font-medium text-on-surface-variant leading-relaxed">
                    Each vote is signed with a unique hardware-backed key, providing mathematically verifiable integrity.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Area */}
            <div>
              <button 
                className={`w-full h-12 text-white font-bold text-sm rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm ${isConfigured ? 'bg-secondary' : 'bg-primary hover:bg-primary/90'}`}
                onClick={handleEnableBiometrics}
                disabled={isConfigured}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isConfigured ? 'task_alt' : 'face'}
                </span>
                {isConfigured ? 'Biometrics Enabled' : 'Enable Biometrics'}
              </button>
              <p className="text-center mt-4 text-xs font-medium text-on-surface-variant">
                By enabling, you agree to use system-level biometric prompts for voting.
              </p>
            </div>
          </div>

          {/* Trusted Partners / Compliance Footer */}
          <div className="w-full pt-8 border-t border-outline-variant grid grid-cols-2 md:grid-cols-4 gap-4 opacity-60">
            <div className="flex flex-col items-center justify-center grayscale hover:grayscale-0 transition-all cursor-default">
              <span className="material-symbols-outlined text-[32px] text-on-surface-variant">verified_user</span>
              <span className="text-[10px] font-bold mt-1 uppercase tracking-widest text-center">NIST Compliant</span>
            </div>
            <div className="flex flex-col items-center justify-center grayscale hover:grayscale-0 transition-all cursor-default">
              <span className="material-symbols-outlined text-[32px] text-on-surface-variant">gpp_good</span>
              <span className="text-[10px] font-bold mt-1 uppercase tracking-widest text-center">EAL5+ Secure</span>
            </div>
            <div className="flex flex-col items-center justify-center grayscale hover:grayscale-0 transition-all cursor-default">
              <span className="material-symbols-outlined text-[32px] text-on-surface-variant">policy</span>
              <span className="text-[10px] font-bold mt-1 uppercase tracking-widest text-center">FIPS 140-2</span>
            </div>
            <div className="flex flex-col items-center justify-center grayscale hover:grayscale-0 transition-all cursor-default">
              <span className="material-symbols-outlined text-[32px] text-on-surface-variant">admin_panel_settings</span>
              <span className="text-[10px] font-bold mt-1 uppercase tracking-widest text-center">SOC2 Type II</span>
            </div>
          </div>

        </div>
      </main>

      {/* Bottom Nav Bar */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center bg-surface border-t border-outline-variant h-16 pb-safe z-40 md:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <a href="#" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors w-full h-full">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px] font-bold mt-1">Dashboard</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors w-full h-full">
          <span className="material-symbols-outlined">how_to_vote</span>
          <span className="text-[10px] font-bold mt-1">Ballots</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center bg-secondary/10 text-secondary rounded-full px-5 py-1 w-full h-full transition-colors font-bold">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
          <span className="text-[10px] font-bold mt-1">Security</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors w-full h-full">
          <span className="material-symbols-outlined">settings</span>
          <span className="text-[10px] font-bold mt-1">Settings</span>
        </a>
      </nav>

      {/* Biometric Simulation Overlay */}
      <div className={`fixed inset-0 z-[60] bg-[#0f172a]/60 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 ${isModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="bg-surface rounded-xl p-8 max-w-[320px] w-full mx-4 shadow-2xl border border-outline-variant text-center flex flex-col items-center gap-6">
          <div className="relative w-20 h-20">
            {isSuccess ? (
              <div className="absolute inset-0 bg-[#22c55e] rounded-full flex items-center justify-center animate-bounce shadow-lg">
                <span className="material-symbols-outlined text-white text-[40px]">check_circle</span>
              </div>
            ) : (
              <>
                <div className="absolute inset-0 bg-secondary/20 rounded-full animate-ping"></div>
                <div className="relative w-full h-full bg-surface rounded-full border-2 border-secondary flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-secondary text-[40px]">face</span>
                </div>
              </>
            )}
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-primary">{isSuccess ? 'Success' : 'Biometric Auth'}</h3>
            <p className="text-sm font-medium text-on-surface-variant">
              {isSuccess ? 'Biometrics configured successfully.' : 'Confirming identity for secure linkage...'}
            </p>
          </div>
          <div className="h-1.5 bg-surface-container-high w-full rounded-full overflow-hidden">
            <div 
              className="h-full bg-secondary transition-all duration-[2000ms] ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

    </div>
  );
};
