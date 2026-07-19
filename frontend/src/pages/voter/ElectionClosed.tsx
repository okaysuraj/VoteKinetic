
export const ElectionClosed = () => {
  
  return (
    <div className="flex flex-col min-h-screen bg-[#f9f9fc] text-[#1a1c1e] font-sans pb-20 md:pb-0">
      
      {/* TopAppBar */}
      <header className="w-full top-0 sticky z-40 bg-surface border-b border-outline-variant">
        <div className="flex justify-between items-center px-4 md:px-10 py-4 max-w-[1200px] mx-auto">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-[28px]" style={{ fontVariationSettings: "'FILL' 0" }}>account_balance</span>
            <h1 className="text-xl md:text-2xl tracking-tight font-bold text-primary">VOTEKINETIC</h1>
          </div>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-8 items-center">
              <a href="#" className="text-sm font-bold text-on-surface-variant hover:text-primary transition-colors">Dashboard</a>
              <a href="#" className="text-sm font-bold text-primary border-b-2 border-primary py-1">Elections</a>
              <a href="#" className="text-sm font-bold text-on-surface-variant hover:text-primary transition-colors">Profile</a>
            </nav>
            <span className="material-symbols-outlined text-primary text-[24px]">security</span>
          </div>
        </div>
      </header>

      <main className="flex-grow w-full max-w-[1000px] mx-auto px-4 py-8 md:py-12">
        
        {/* Status Hero */}
        <section className="relative bg-surface-container-lowest border border-outline-variant rounded-xl p-8 md:p-12 mb-8 overflow-hidden shadow-sm">
          <div className="relative z-10 flex flex-col items-center text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full bg-secondary animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] opacity-20"></div>
              <span className="material-symbols-outlined text-secondary text-[40px]" style={{ fontVariationSettings: "'FILL' 0" }}>lock_clock</span>
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1c1e]">Polls Are Now Closed</h2>
              <p className="text-base font-medium text-on-surface-variant max-w-lg mx-auto leading-relaxed">
                Voting for the 2024 General Municipal Election has officially concluded. The cryptographic tallying process has begun.
              </p>
            </div>
          </div>
          {/* Atmospheric Pattern Background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#115cb9 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}></div>
        </section>

        {/* Stats Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          
          {/* Participation Rate */}
          <div className="md:col-span-2 bg-[#001b44] p-8 rounded-xl text-white flex flex-col justify-between min-h-[200px] shadow-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-primary/20 transition-opacity group-hover:bg-primary/30 z-0"></div>
            <div className="relative z-10 flex justify-between items-start mb-6">
              <span className="text-sm font-bold text-[#aec6ff] uppercase tracking-widest">Voter Participation</span>
              <span className="material-symbols-outlined text-[#aec6ff] text-[24px]">analytics</span>
            </div>
            <div className="relative z-10">
              <div className="flex items-baseline gap-3">
                <span className="text-[64px] md:text-[80px] font-bold leading-none text-white tracking-tighter">92%</span>
                <span className="text-sm font-bold text-[#aec6ff] uppercase tracking-widest">Turnout Rate</span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-6">
                <div className="bg-[#659dfe] h-full rounded-full transition-all duration-1000 ease-out" style={{ width: '92%' }}></div>
              </div>
            </div>
          </div>

          {/* Verification Card */}
          <div className="bg-white border border-outline-variant p-8 rounded-xl flex flex-col justify-between min-h-[200px] shadow-sm hover:-translate-y-1 transition-transform">
            <span className="material-symbols-outlined text-secondary text-[40px] mb-6" style={{ fontVariationSettings: "'FILL' 0" }}>verified_user</span>
            <div>
              <h3 className="text-3xl font-bold text-[#1a1c1e] mb-1">2.4M</h3>
              <p className="text-sm font-bold text-on-surface-variant uppercase tracking-widest">Verified Votes Cast</p>
            </div>
          </div>

        </div>

        {/* Information & Process Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Cryptographic Notice */}
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-6 bg-[#eff6ff] rounded-xl border border-[#bfdbfe]">
              <span className="material-symbols-outlined text-[#1d4ed8] mt-1 shrink-0 text-[24px]">info</span>
              <div>
                <h4 className="text-sm font-bold text-[#1e3a8a] uppercase tracking-widest mb-2">Cryptographic Tallying</h4>
                <p className="text-sm font-medium text-[#1e40af] leading-relaxed">
                  Votes are being decrypted and counted using zero-knowledge proofs to ensure privacy and integrity. This process typically takes 12–24 hours.
                </p>
              </div>
            </div>
            <button className="w-full md:w-auto h-12 px-8 bg-primary text-white font-bold text-sm rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95">
              <span className="material-symbols-outlined text-[20px]">history</span>
              View Historical Archives
            </button>
          </div>

          {/* Image/Visual Representation */}
          <div className="relative rounded-xl overflow-hidden aspect-video border border-outline-variant shadow-sm group">
            <div className="absolute inset-0 bg-primary/10 z-10 transition-opacity group-hover:bg-transparent"></div>
            <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-20"></div>
            <div className="absolute bottom-6 left-6 flex items-center gap-2 text-white z-30">
              <span className="material-symbols-outlined text-[18px]">location_on</span>
              <span className="text-xs font-bold uppercase tracking-widest">Secure Tallying Node: #492-Delta</span>
            </div>
          </div>
          
        </div>
      </main>

      {/* BottomNavBar (Mobile only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center h-16 px-4 bg-surface border-t border-outline-variant z-50 shadow-lg pb-safe">
        <a href="#" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors w-full h-full">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px] font-bold mt-1">Dashboard</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center bg-[#dbeafe] text-[#1e40af] rounded-full px-5 py-1 w-full h-full font-bold transition-colors max-w-[80px]">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>how_to_vote</span>
          <span className="text-[10px] font-bold mt-1">Elections</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors w-full h-full">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-bold mt-1">Profile</span>
        </a>
      </nav>

    </div>
  );
};
