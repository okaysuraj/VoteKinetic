

export const AccountDisabled = () => {
  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col selection:bg-error-container selection:text-on-error-container">
      {/* TopAppBar */}
      <header className="bg-surface-container-lowest border-b border-outline-variant fixed top-0 w-full z-50">
        <div className="flex justify-between items-center w-full px-6 md:px-10 py-4 max-w-[800px] mx-auto">
          <span className="font-headline-md text-headline-md font-bold tracking-tight text-primary">VOTEKINETIC</span>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-primary">security</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center pt-24 pb-16 px-4">
        <div className="max-w-[800px] w-full flex flex-col gap-8">
          
          {/* Warning Header Section */}
          <section className="text-center flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-error-container flex items-center justify-center mb-2">
              <span className="material-symbols-outlined text-[40px] text-error">gpp_maybe</span>
            </div>
            <h1 className="font-display-lg text-display-lg text-error">Account Disabled</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[600px] mx-auto">
              Your access to the VOTEKINETIC secure voting terminal has been restricted due to a detected policy violation. This action is part of our institutional commitment to electoral integrity.
            </p>
          </section>

          {/* Technical Logs - Bento Style Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative overflow-hidden p-1">
            {/* System ID Card */}
            <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-lg relative overflow-hidden group hover:-translate-y-0.5 hover:shadow-sm transition-all">
              <div className="absolute w-full h-[2px] bg-[linear-gradient(90deg,transparent,#ba1a1a,transparent)] animate-[scan_3s_ease-in-out_infinite] top-0 z-10 opacity-0 group-hover:opacity-100"></div>
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-outline">fingerprint</span>
                <span className="font-label-md text-label-md text-on-surface-variant">SYSTEM LOG ID</span>
              </div>
              <div className="font-headline-md text-headline-md text-on-surface font-mono">VK-8829-0XF</div>
            </div>

            {/* Violation Type Card */}
            <div className="bg-surface-container-lowest border border-error p-4 rounded-lg hover:-translate-y-0.5 hover:shadow-sm transition-all">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-error">report_problem</span>
                <span className="font-label-md text-label-md text-error">VIOLATION TYPE</span>
              </div>
              <div className="font-headline-md text-headline-md text-on-surface">Unusual Authentication Pattern</div>
            </div>

            {/* Timestamp Card */}
            <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-lg hover:-translate-y-0.5 hover:shadow-sm transition-all">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-outline">schedule</span>
                <span className="font-label-md text-label-md text-on-surface-variant">TIMESTAMP</span>
              </div>
              <div className="font-headline-md text-headline-md text-on-surface">{new Date().toUTCString()}</div>
            </div>

            {/* Terminal IP Card */}
            <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-lg hover:-translate-y-0.5 hover:shadow-sm transition-all">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-outline">terminal</span>
                <span className="font-label-md text-label-md text-on-surface-variant">TERMINAL IP</span>
              </div>
              <div className="font-headline-md text-headline-md text-on-surface">192.168.1.104 [STATIC]</div>
            </div>
          </div>

          {/* Detail Message */}
          <div className="bg-surface-container-low p-4 border border-outline-variant rounded-lg">
            <div className="flex gap-4">
              <span className="material-symbols-outlined text-primary mt-1">info</span>
              <p className="font-body-md text-body-md text-on-surface-variant">
                To maintain the neutrality and security of the democratic process, accounts are automatically disabled when automated monitoring systems flag high-risk activity. Your session data has been archived for institutional review. 
              </p>
            </div>
          </div>

          {/* Action Area */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-4">
            <button className="w-full md:w-auto min-h-[48px] px-10 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">support_agent</span>
              Contact Support
            </button>
            <button className="w-full md:w-auto min-h-[48px] px-10 border border-outline text-on-surface rounded-lg font-label-md text-label-md hover:bg-surface-container-high active:scale-95 transition-all">
              Security Disclosure
            </button>
          </div>
          
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low border-t border-outline-variant mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center w-full p-6 md:p-10 gap-4 max-w-[800px] mx-auto">
          <div className="flex flex-col items-center md:items-start">
            <span className="font-label-md text-label-md font-semibold text-primary">VOTEKINETIC</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">© 2024 VOTEKINETIC Secure Systems. All rights reserved.</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Service</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Help Center</a>
          </div>
        </div>
      </footer>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
            0% { top: 0; opacity: 0; }
            50% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
        }
      `}} />
    </div>
  );
};
