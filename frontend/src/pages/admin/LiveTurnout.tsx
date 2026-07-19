import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const LiveTurnout: React.FC = () => {
  const [currentCount, setCurrentCount] = useState(1248392);

  useEffect(() => {
    const updateCounter = () => {
      const increment = Math.floor(Math.random() * 5) + 1;
      setCurrentCount(prev => prev + increment);
      
      // Randomly delay the next update for more "real" feel
      setTimeout(updateCounter, 1000 + (Math.random() * 2000));
    };

    const timer = setTimeout(updateCounter, 1000 + (Math.random() * 2000));
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-background text-on-surface min-h-screen">
      {/* Top Navigation Bar */}
      <header className="bg-surface border-b border-outline-variant w-full h-16 sticky top-0 z-50">
        <div className="flex justify-between items-center px-margin-desktop w-full max-w-[1200px] mx-auto h-full">
          <Link to="/admin" className="font-headline-md text-headline-md font-bold text-primary">VOTEKINETIC</Link>
          <nav className="hidden md:flex gap-gutter items-center">
            <Link to="/admin" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">Dashboard</Link>
            <Link to="/admin/settings" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">Ballots</Link>
            <Link to="/admin/turnout" className="font-body-md text-body-md text-secondary font-bold border-b-2 border-secondary pb-1">Results</Link>
            <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Resources</a>
          </nav>
          <div className="flex items-center gap-stack-md">
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:bg-surface-container-low p-2 rounded-full transition-all">notifications</span>
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:bg-surface-container-low p-2 rounded-full transition-all">help</span>
            <div className="w-8 h-8 rounded-full bg-primary-fixed-dim flex items-center justify-center overflow-hidden">
              <img className="w-full h-full object-cover" alt="Admin Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC27jef27wymDYSDaXjpcVulKoPAwZ3MrqUpgRZEg4eKi6Q9nsZXtYUe66mdikbO0kNhTcbsl5VhIUV51dMP-pfggcyxKRl1pAv4EgQbmIcCZxAt6bGcK8cbZCBXkviwCEiRgVJLu5rdUg0IypTxa2p9raDxzU1jO00qC5xHdShRe1iBVUWqfOrNPhiBQckkSLzVAmzLwmno4WZNC9zgEcbjjuzwZAenSE4pzSiuRVMhIkOPMFEVAdPpA" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-margin-desktop py-stack-lg space-y-stack-lg">
        {/* Live Participation Hero Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          <div className="md:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <div className="flex items-center gap-2 text-error font-label-md">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-error"></span>
                </span>
                LIVE STREAMING
              </div>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-primary mb-stack-sm">Global Participation</h1>
            <p className="font-body-md text-body-md text-on-surface-variant mb-stack-lg max-w-md">Real-time tracking of verified voter turnout across all authorized institutional nodes.</p>
            
            <div className="flex items-baseline gap-4 mb-stack-md">
              <span className="font-display-lg text-display-lg text-primary tabular-nums" id="counter">
                {currentCount.toLocaleString()}
              </span>
              <span className="font-label-md text-label-md text-secondary bg-secondary-container px-2 py-1 rounded">Total Ballots Cast</span>
            </div>
            
            <div className="space-y-stack-sm">
              <div className="flex justify-between font-label-md text-on-surface-variant">
                <span>Projected Turnout Goal: 68.5%</span>
                <span>Current: 52.4%</span>
              </div>
              <div className="w-full h-4 bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-secondary w-[52.4%] transition-all duration-1000 ease-out shimmer"></div>
              </div>
            </div>
          </div>

          {/* Verification Check Card */}
          <div className="bg-primary text-on-primary rounded-xl p-stack-lg flex flex-col justify-between border border-primary-container">
            <div className="space-y-stack-sm">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                <h3 className="font-label-md text-label-md uppercase tracking-wider">Verification Integrity</h3>
              </div>
              <p className="font-body-md text-body-md opacity-90 leading-relaxed">System state is currently verified through decentralized consensus. All cryptographic signatures match the local ledger.</p>
            </div>
            <div className="mt-stack-lg pt-stack-md border-t border-primary-container">
              <div className="flex justify-between items-center mb-2">
                <span className="font-label-sm text-label-sm opacity-70">Uptime Reliability</span>
                <span className="font-label-md text-label-md">99.998%</span>
              </div>
              <button className="w-full bg-on-primary text-primary h-12 rounded font-label-md hover:bg-surface-variant transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[18px]">security</span>
                Audit Integrity Log
              </button>
            </div>
          </div>
        </section>

        {/* Analytics Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Map Visualization */}
          <div className="lg:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden flex flex-col">
            <div className="p-stack-md border-b border-outline-variant flex justify-between items-center">
              <h2 className="font-headline-md text-headline-md text-primary">Regional Participation</h2>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-surface-container text-on-surface-variant rounded-full text-label-sm hover:bg-outline-variant transition-colors">By Density</button>
                <button className="px-3 py-1 bg-primary text-on-primary rounded-full text-label-sm">By Growth</button>
              </div>
            </div>
            <div className="h-[400px] bg-surface-container-low relative group cursor-crosshair">
              <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-multiply" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBUOgrQtKUNU-FkrcLHPRhkZVMYjBssQKu-IVGCsSC22I5GQqGjRXFvLVPHMejccJ3Qdx9cREMIWaSfAB8glz2KnwNFQ_ZVY8TWuwAfy7V494zhwOtEMtUyAhbS02spB_powy7A71G3m0ac8uGQmPR0gzql_BdlcWg5bNULkRTqDLbZ_xeMd_-Tt3denQuFEsgMgr66KCP4FG1x4V_OHuWOUVfV6M7iKR8yc0Ks1WDJZ97ZdHgfMTBDbA')" }}></div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="p-4 bg-surface-container-lowest shadow-lg border border-outline-variant rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="font-label-sm text-label-sm text-on-surface-variant">Central District</p>
                  <p className="font-headline-md text-headline-md text-primary">72.4%</p>
                  <p className="font-label-sm text-label-sm text-secondary">+2.1% from last hour</p>
                </div>
              </div>
            </div>
          </div>

          {/* Highest Turnout Table */}
          <div className="lg:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden flex flex-col">
            <div className="p-stack-md border-b border-outline-variant">
              <h2 className="font-label-md text-label-md text-primary uppercase">Highest Turnout</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
              <table className="w-full text-left">
                <thead className="bg-surface-container-low">
                  <tr>
                    <th className="p-3 font-label-sm text-label-sm text-on-surface-variant">District</th>
                    <th className="p-3 font-label-sm text-label-sm text-on-surface-variant text-right">Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  <tr className="hover:bg-surface-container transition-colors">
                    <td className="p-3 font-body-md text-body-md">North Sector A</td>
                    <td className="p-3 font-label-md text-label-md text-right text-secondary">84.2%</td>
                  </tr>
                  <tr className="hover:bg-surface-container transition-colors">
                    <td className="p-3 font-body-md text-body-md">Eastern Marches</td>
                    <td className="p-3 font-label-md text-label-md text-right text-secondary">79.1%</td>
                  </tr>
                  <tr className="hover:bg-surface-container transition-colors">
                    <td className="p-3 font-body-md text-body-md">Metro-South</td>
                    <td className="p-3 font-label-md text-label-md text-right text-secondary">76.8%</td>
                  </tr>
                  <tr className="hover:bg-surface-container transition-colors">
                    <td className="p-3 font-body-md text-body-md">Lake District</td>
                    <td className="p-3 font-label-md text-label-md text-right text-secondary">71.5%</td>
                  </tr>
                  <tr className="hover:bg-surface-container transition-colors">
                    <td className="p-3 font-body-md text-body-md">Highland Center</td>
                    <td className="p-3 font-label-md text-label-md text-right text-secondary">68.3%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button className="w-full py-3 bg-surface-container-low text-primary font-label-sm hover:bg-surface-container transition-colors">View All Districts</button>
          </div>
        </section>

        {/* Live Integrity Stream */}
        <section className="bg-surface-container border border-outline-variant rounded-xl p-stack-md">
          <div className="flex items-center justify-between mb-stack-md">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-on-surface-variant">analytics</span>
              <h2 className="font-label-md text-label-md text-primary uppercase tracking-widest">Live Integrity Stream</h2>
            </div>
            <div className="text-label-sm text-on-surface-variant flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              Aggregating 42 Nodes
            </div>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
            <div className="flex justify-between items-center bg-surface-container-lowest p-3 rounded border border-outline-variant/30">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary text-sm">lock</span>
                <span className="font-label-sm text-label-sm text-on-surface">Block #9,248,102 verified by Validator-04</span>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant">14:22:01</span>
            </div>
            <div className="flex justify-between items-center bg-surface-container-lowest p-3 rounded border border-outline-variant/30 opacity-80">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary text-sm">how_to_vote</span>
                <span className="font-label-sm text-label-sm text-on-surface">Batch transmission received: 1,402 encrypted records</span>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant">14:21:44</span>
            </div>
            <div className="flex justify-between items-center bg-surface-container-lowest p-3 rounded border border-outline-variant/30 opacity-60">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary text-sm">sync</span>
                <span className="font-label-sm text-label-sm text-on-surface">Global ledger sync complete across institutional mesh</span>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant">14:21:12</span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container border-t border-outline-variant w-full py-stack-lg mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center px-margin-desktop w-full max-w-[1200px] mx-auto gap-gutter">
          <div className="flex flex-col gap-1">
            <div className="font-label-md text-label-md font-bold text-on-surface">VOTEKINETIC</div>
            <p className="font-label-sm text-label-sm text-on-surface-variant opacity-90">© 2024 VOTEKINETIC Institutional Integrity System. All rights reserved.</p>
          </div>
          <nav className="flex gap-stack-md">
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">Security Disclosures</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">Institutional Terms</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">Audit Logs</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">Privacy Policy</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};
