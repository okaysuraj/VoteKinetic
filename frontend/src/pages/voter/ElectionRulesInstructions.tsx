import { useEffect } from 'react';
import { useState } from 'react';

export const ElectionRulesInstructions = () => {
    const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#f9f9fc] text-[#1a1c1e] min-h-screen font-sans pb-20 md:pb-8">
      
      {/* TopAppBar */}
      <header className={`w-full top-0 sticky z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-outline-variant' : 'bg-[#f9f9fc] border-b border-outline-variant'}`}>
        <div className="flex justify-between items-center px-4 md:px-10 py-4 max-w-[1200px] mx-auto">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-[28px]" style={{ fontVariationSettings: "'FILL' 0" }}>account_balance</span>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-primary">VOTEKINETIC</h1>
          </div>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-8 items-center">
              <a href="#" className="text-sm font-bold text-on-surface-variant hover:text-primary transition-colors">Dashboard</a>
              <a href="#" className="text-sm font-bold text-primary border-b-2 border-primary py-1">Elections</a>
              <a href="#" className="text-sm font-bold text-on-surface-variant hover:text-primary transition-colors">Profile</a>
            </nav>
            <div className="flex items-center gap-2 text-[#b45309] bg-[#fef3c7] px-3 py-1.5 rounded-full border border-[#fcd34d]">
              <span className="material-symbols-outlined text-[16px]">menu_book</span>
              <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:block">Guidelines</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-[800px] mx-auto px-4 py-8 md:py-12">
        
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 tracking-tight">Voting Protocol & Rules</h2>
          <p className="text-base font-medium text-on-surface-variant max-w-xl mx-auto leading-relaxed">
            Please review the following institutional guidelines carefully before proceeding to cast your digital ballot.
          </p>
        </div>

        {/* Section 1: Eligibility & Identity */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-secondary text-[28px]">fingerprint</span>
            <h3 className="text-2xl font-bold text-[#1a1c1e]">1. Eligibility & Identity Verification</h3>
          </div>
          <div className="bg-white border border-outline-variant rounded-xl p-8 shadow-sm">
            <p className="text-sm font-medium text-on-surface-variant mb-6 leading-relaxed">
              Participation in this election requires strict adherence to digital identity protocols to prevent fraud and ensure one-person-one-vote integrity.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-[#16a34a] text-[20px] mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="text-sm font-bold text-[#1a1c1e] leading-relaxed">Active Registration: You must hold an active voter registration profile within the designated district.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-[#16a34a] text-[20px] mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="text-sm font-bold text-[#1a1c1e] leading-relaxed">Biometric Confirmation: Real-time liveness check via system-integrated facial or fingerprint analysis.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-[#16a34a] text-[20px] mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="text-sm font-bold text-[#1a1c1e] leading-relaxed">Device Trust: Voting must occur on a registered, secure device with no active remote-access software.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 2: Ballot Secrecy */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-secondary text-[28px]">visibility_off</span>
            <h3 className="text-2xl font-bold text-[#1a1c1e]">2. Ballot Secrecy & Privacy</h3>
          </div>
          <div className="bg-white border border-outline-variant rounded-xl p-8 shadow-sm">
            <p className="text-sm font-medium text-on-surface-variant mb-8 leading-relaxed">
              VOTEKINETIC utilizes advanced zero-knowledge proofs to ensure that your identity is decoupled from your vote selection.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 border-l-4 border-secondary bg-[#f9f9fc] rounded-r-lg">
                <p className="text-xs font-bold text-primary mb-2 uppercase tracking-widest">End-to-End Encryption</p>
                <p className="text-xs font-medium text-on-surface-variant leading-relaxed">Your selection is encrypted on your local device before transmission to the central audit ledger.</p>
              </div>
              <div className="p-6 border-l-4 border-secondary bg-[#f9f9fc] rounded-r-lg">
                <p className="text-xs font-bold text-primary mb-2 uppercase tracking-widest">Zero-Trace Auditing</p>
                <p className="text-xs font-medium text-on-surface-variant leading-relaxed">Audit trails verify the inclusion of your vote without exposing the choice itself to any administrator.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Voting Procedure */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-secondary text-[28px]">how_to_vote</span>
            <h3 className="text-2xl font-bold text-[#1a1c1e]">3. Voting Procedures</h3>
          </div>
          <div className="space-y-6">
            <div className="flex gap-5 bg-white p-6 rounded-xl border border-outline-variant shadow-sm">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#e0e7ff] text-[#3730a3] flex items-center justify-center font-bold text-lg border border-[#c7d2fe]">1</div>
              <div>
                <h4 className="text-base font-bold text-[#1a1c1e] mb-2">Select Candidates</h4>
                <p className="text-sm font-medium text-on-surface-variant leading-relaxed">Navigate through the ballot categories. Tap a candidate card to highlight your choice. A blue border indicates selection.</p>
              </div>
            </div>
            <div className="flex gap-5 bg-white p-6 rounded-xl border border-outline-variant shadow-sm">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#e0e7ff] text-[#3730a3] flex items-center justify-center font-bold text-lg border border-[#c7d2fe]">2</div>
              <div>
                <h4 className="text-base font-bold text-[#1a1c1e] mb-2">Review Ballot</h4>
                <p className="text-sm font-medium text-on-surface-variant leading-relaxed">Review the summary page carefully. Once you proceed to the final confirmation, choices cannot be modified.</p>
              </div>
            </div>
            <div className="flex gap-5 bg-white p-6 rounded-xl border border-outline-variant shadow-sm">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#e0e7ff] text-[#3730a3] flex items-center justify-center font-bold text-lg border border-[#c7d2fe]">3</div>
              <div>
                <h4 className="text-base font-bold text-[#1a1c1e] mb-2">Cast & Receipt</h4>
                <p className="text-sm font-medium text-on-surface-variant leading-relaxed">Authenticate with your biometric key. A cryptographic receipt hash will be generated for your personal records.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Aesthetic Visual Break */}
        <div className="relative w-full h-48 rounded-xl overflow-hidden mb-12 border border-outline-variant shadow-sm group">
          <div className="absolute inset-0 bg-[#0f172a]/40 z-10 transition-opacity group-hover:bg-[#0f172a]/30"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale opacity-80 group-hover:scale-105 transition-transform duration-1000"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent z-20 flex items-end p-8">
            <div className="flex items-center gap-3 text-white">
              <span className="material-symbols-outlined text-[24px]">lock</span>
              <span className="text-sm font-bold uppercase tracking-widest opacity-90">Your security is our priority.</span>
            </div>
          </div>
        </div>

        {/* Section 4: Prohibited Actions */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-[#dc2626] text-[28px]">warning</span>
            <h3 className="text-2xl font-bold text-[#1a1c1e]">4. Prohibited Actions</h3>
          </div>
          <div className="bg-[#fef2f2] text-[#991b1b] rounded-xl p-8 border border-[#fecaca] shadow-sm">
            <p className="text-sm font-bold mb-4 uppercase tracking-widest">Legal Warning: The following actions are strictly prohibited and may lead to prosecution:</p>
            <ul className="list-disc list-inside space-y-2 text-sm font-medium opacity-90 pl-2">
              <li>Recording or capturing images of your digital ballot.</li>
              <li>Attempting to access the ballot using another person's credentials.</li>
              <li>Interfering with the transmission of another person's vote.</li>
            </ul>
          </div>
        </section>

        {/* CTA Action */}
        <div className="flex flex-col gap-6 items-center justify-center border-t border-outline-variant pt-10">
          <p className="text-sm font-medium text-on-surface-variant text-center max-w-md leading-relaxed">
            By continuing, you acknowledge that you have read and understood all voting protocols and legal requirements.
          </p>
          <button className="bg-primary text-white font-bold text-sm px-10 h-14 rounded-lg hover:bg-primary/90 transition-all active:scale-95 flex items-center justify-center gap-3 shadow-sm w-full sm:w-auto">
            I Understand and Agree
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
        </div>

      </main>

      {/* BottomNavBar */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center h-16 px-4 bg-white border-t border-outline-variant z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pb-safe">
        <a href="#" className="flex flex-col items-center justify-center text-on-surface-variant transition-colors hover:text-primary w-full h-full active:scale-95">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px] font-bold mt-1">Dashboard</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center bg-[#dbeafe] text-[#1e40af] rounded-full px-5 py-1 transition-colors w-full h-full max-w-[80px] active:scale-95">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>how_to_vote</span>
          <span className="text-[10px] font-bold mt-1">Elections</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center text-on-surface-variant transition-colors hover:text-primary w-full h-full active:scale-95">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-bold mt-1">Profile</span>
        </a>
      </nav>

    </div>
  );
};
