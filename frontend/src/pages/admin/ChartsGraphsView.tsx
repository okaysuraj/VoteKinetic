import { useEffect } from 'react';
import { useState } from 'react';

export const ChartsGraphsView = () => {
    const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animations after mount
    setTimeout(() => setAnimate(true), 100);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#f9f9fc] pb-20 md:pb-0 font-sans">
      
      {/* TopAppBar */}
      <header className="bg-surface border-b border-outline-variant flex justify-between items-center px-4 md:px-8 h-16 w-full sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-[28px]" style={{ fontVariationSettings: "'FILL' 0" }}>monitoring</span>
          <h1 className="font-headline-md text-primary font-bold tracking-tight">Analytics Engine</h1>
        </div>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-bold text-on-surface-variant hover:text-primary transition-colors">Overview</a>
            <a href="#" className="text-sm font-bold text-primary border-b-2 border-primary py-1">Metrics</a>
            <a href="#" className="text-sm font-bold text-on-surface-variant hover:text-primary transition-colors">Export</a>
          </nav>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center p-4 md:p-8 w-full">
        
        {/* Header Section */}
        <div className="w-full max-w-[1200px] mb-8">
          <h2 className="text-3xl font-bold text-primary mb-2">Visual Analytics Dashboard</h2>
          <p className="text-sm font-medium text-on-surface-variant">Real-time cryptographic verification of democratic participation. High-precision data for maximum transparency.</p>
        </div>

        {/* Bento Grid Layout */}
        <div className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Turnout Over Time (Line Chart Style) - Span 12 */}
          <section className="md:col-span-12 bg-white/70 backdrop-blur-md border border-outline-variant p-6 rounded-xl flex flex-col gap-6 shadow-sm hover:border-primary/30 transition-colors">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
              <div>
                <h3 className="text-xl font-bold text-primary mb-1">Voter Turnout Velocity</h3>
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Aggregate participation rate over the last 12 hours</p>
              </div>
              <div className="flex gap-2">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#dbeafe] text-[#1e40af] text-[10px] font-bold uppercase tracking-widest border border-[#bfdbfe]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb] mr-2 animate-pulse"></span>
                  Live Updates
                </span>
              </div>
            </div>
            
            <div className="relative h-64 w-full bg-surface-container-lowest rounded-lg overflow-hidden flex items-end px-4 border border-outline-variant shadow-inner">
              {/* Fake Grid Background */}
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#001b44 1px, transparent 1px), linear-gradient(90deg, #001b44 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
              
              {/* Fake Line Graph Using SVG for Precision */}
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 200">
                <path className="opacity-80 transition-all duration-1000 ease-out" d="M0,180 Q100,160 200,140 T400,100 T600,60 T800,40" fill="none" stroke="#115cb9" strokeWidth="3" strokeDasharray={animate ? "0" : "1500"} strokeDashoffset={animate ? "0" : "1500"}></path>
                <circle cx="200" cy="140" fill="#115cb9" r="4" className={`transition-opacity duration-1000 delay-300 ${animate ? 'opacity-100' : 'opacity-0'}`}></circle>
                <circle cx="400" cy="100" fill="#115cb9" r="4" className={`transition-opacity duration-1000 delay-500 ${animate ? 'opacity-100' : 'opacity-0'}`}></circle>
                <circle cx="600" cy="60" fill="#115cb9" r="4" className={`transition-opacity duration-1000 delay-700 ${animate ? 'opacity-100' : 'opacity-0'}`}></circle>
                <circle cx="800" cy="40" fill="#115cb9" r="6" className={`transition-opacity duration-1000 delay-1000 ${animate ? 'opacity-100' : 'opacity-0'}`}></circle>
              </svg>
              
              {/* Time Markers */}
              <div className="absolute bottom-2 left-0 right-0 flex justify-between px-6 text-[10px] font-bold text-outline-variant uppercase tracking-widest">
                <span>08:00</span><span>10:00</span><span>12:00</span><span>14:00</span><span>16:00</span><span>18:00</span><span>20:00</span>
              </div>
            </div>
          </section>

          {/* Candidate Votes (Bar Chart) - Span 7 */}
          <section className="md:col-span-7 bg-white/70 backdrop-blur-md border border-outline-variant p-6 rounded-xl shadow-sm hover:border-primary/30 transition-colors">
            <h3 className="text-xl font-bold text-primary mb-6">Candidate Vote Count</h3>
            <div className="space-y-6">
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-on-surface">Candidate A</span>
                  <span className="font-bold text-primary">42,890 (41%)</span>
                </div>
                <div className="h-4 bg-surface-container-high rounded-full overflow-hidden border border-outline-variant">
                  <div className={`h-full bg-primary transition-all duration-1000 ease-out`} style={{ width: animate ? '41%' : '0%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-on-surface">Candidate B</span>
                  <span className="font-bold text-secondary">38,122 (36%)</span>
                </div>
                <div className="h-4 bg-surface-container-high rounded-full overflow-hidden border border-outline-variant">
                  <div className={`h-full bg-secondary transition-all duration-1000 ease-out delay-100`} style={{ width: animate ? '36%' : '0%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-on-surface">Candidate C</span>
                  <span className="font-bold text-outline">15,004 (14%)</span>
                </div>
                <div className="h-4 bg-surface-container-high rounded-full overflow-hidden border border-outline-variant">
                  <div className={`h-full bg-outline transition-all duration-1000 ease-out delay-200`} style={{ width: animate ? '14%' : '0%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-on-surface">Others</span>
                  <span className="font-bold text-surface-variant-dark">9,443 (9%)</span>
                </div>
                <div className="h-4 bg-surface-container-high rounded-full overflow-hidden border border-outline-variant">
                  <div className={`h-full bg-outline-variant transition-all duration-1000 ease-out delay-300`} style={{ width: animate ? '9%' : '0%' }}></div>
                </div>
              </div>
              
            </div>
          </section>

          {/* Demographic Splits (Pie/Donut Style) - Span 5 */}
          <section className="md:col-span-5 bg-white/70 backdrop-blur-md border border-outline-variant p-6 rounded-xl flex flex-col items-center shadow-sm hover:border-primary/30 transition-colors">
            <h3 className="text-xl font-bold text-primary mb-8 self-start">Demographic Split</h3>
            
            <div className="relative w-48 h-48 flex items-center justify-center mb-8">
              {/* CSS Conic Gradient Donut */}
              <div className={`w-full h-full rounded-full transition-transform duration-1000 ease-out ${animate ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`} style={{ background: 'conic-gradient(#001b44 0% 35%, #115cb9 35% 65%, #659dfe 65% 85%, #e2e2e5 85% 100%)' }}></div>
              <div className="absolute w-32 h-32 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
                <span className="text-2xl font-bold text-primary">100k+</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-outline">Total Cast</span>
              </div>
            </div>
            
            <ul className="w-full space-y-3">
              <li className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-primary shadow-sm"></span>
                  <span className="font-medium text-on-surface">Age 18-25</span>
                </div>
                <span className="font-bold text-on-surface">35%</span>
              </li>
              <li className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-secondary shadow-sm"></span>
                  <span className="font-medium text-on-surface">Age 26-45</span>
                </div>
                <span className="font-bold text-on-surface">30%</span>
              </li>
              <li className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[#659dfe] shadow-sm"></span>
                  <span className="font-medium text-on-surface">Age 46-65</span>
                </div>
                <span className="font-bold text-on-surface">20%</span>
              </li>
              <li className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-surface-variant shadow-sm"></span>
                  <span className="font-medium text-on-surface">Age 65+</span>
                </div>
                <span className="font-bold text-on-surface">15%</span>
              </li>
            </ul>
          </section>

          {/* Verification Status - Span 6 */}
          <section className="md:col-span-6 bg-white/70 backdrop-blur-md border border-outline-variant p-6 rounded-xl flex items-center gap-6 shadow-sm hover:border-primary/30 transition-colors">
            <div className="bg-[#dbeafe] p-4 rounded-xl shrink-0 border border-[#bfdbfe]">
              <span className="material-symbols-outlined text-[#1e40af] text-[40px]" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
            </div>
            <div>
              <h4 className="text-lg font-bold text-primary mb-1">Cryptographic Integrity</h4>
              <p className="text-sm font-medium text-on-surface-variant leading-relaxed">99.9% of votes verified on ledger. Next block sync in 4s.</p>
            </div>
          </section>

          {/* Quick Export - Span 6 */}
          <section className="md:col-span-6 bg-white/70 backdrop-blur-md border border-outline-variant p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm hover:border-primary/30 transition-colors">
            <div>
              <h4 className="text-lg font-bold text-primary mb-1 text-center sm:text-left">Audit Log</h4>
              <p className="text-sm font-medium text-on-surface-variant text-center sm:text-left">Download certified result summary.</p>
            </div>
            <button className="w-full sm:w-auto bg-primary text-white px-8 h-12 rounded-lg font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm hover:bg-primary/90">
              <span className="material-symbols-outlined text-[18px]">download</span>
              Export PDF
            </button>
          </section>

        </div>
      </main>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 bg-surface border-t border-outline-variant h-16 pb-safe shadow-lg">
        <button className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors w-full h-full">
          <span className="material-symbols-outlined">sensors</span>
          <span className="text-[10px] font-bold mt-1">Live</span>
        </button>
        <button className="flex flex-col items-center justify-center bg-primary/10 text-primary rounded-full px-4 py-1 active:scale-95 transition-all font-bold w-full h-full max-w-[80px]">
          <span className="material-symbols-outlined">assignment_turned_in</span>
          <span className="text-[10px] font-bold mt-1">Results</span>
        </button>
        <button className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors w-full h-full">
          <span className="material-symbols-outlined">verified_user</span>
          <span className="text-[10px] font-bold mt-1">Audit</span>
        </button>
        <button className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors w-full h-full">
          <span className="material-symbols-outlined">ios_share</span>
          <span className="text-[10px] font-bold mt-1">Export</span>
        </button>
      </nav>

    </div>
  );
};
