import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const ObserverDashboard: React.FC = () => {
  const [syncPercentage, setSyncPercentage] = useState(99.98);
  const [currentHash, setCurrentHash] = useState('0x882a...9f3e4b');
  const [isHashHighlighted, setIsHashHighlighted] = useState(false);

  const [elections, setElections] = useState<any[]>([]);

  useEffect(() => {
    const hashes = ['0x882a...9f3e4b', '0x2b1c...a3f2d9', '0xef44...11c8e2', '0x99a2...7c5b31'];
    
    const interval = setInterval(() => {
      // Random subtle fluctuation in sync %
      const newSync = 99.90 + (Math.random() * 0.09);
      setSyncPercentage(Number(newSync.toFixed(2)));
      
      // Cycle hash
      if (Math.random() > 0.7) {
        setCurrentHash(hashes[Math.floor(Math.random() * hashes.length)]);
        setIsHashHighlighted(true);
        setTimeout(() => setIsHashHighlighted(false), 500);
      }
    }, 3000);

    const fetchElections = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/elections/all`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          setElections(data.elections || []);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchElections();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-surface text-on-surface min-h-screen font-body-md">
      {/* TopNavBar */}
      <header className="bg-surface border-b border-outline-variant docked full-width top-0 z-50 sticky">
        <div className="flex justify-between items-center px-gutter py-4 w-full max-w-[1440px] mx-auto">
          <div className="flex items-center gap-stack-lg">
            <span className="font-headline-md text-headline-md font-bold text-primary">VOTEKINETIC</span>
            <nav className="hidden md:flex gap-6">
              <Link to="/observer/organizations" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">Organizations</Link>
              <Link to="/observer/tenants" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">Tenants</Link>
              <Link to="/observer/billing" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">Billing</Link>
              <Link to="/observer" className="font-label-md text-label-md text-secondary border-b-2 border-secondary pb-1">Global Settings</Link>
              <Link to="/observer/security" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">Security</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden lg:block">
              <input className="bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 text-label-md focus:ring-2 focus:ring-secondary outline-none w-64" placeholder="Search parameters..." type="text" />
              <span className="material-symbols-outlined absolute right-3 top-2.5 text-on-surface-variant" style={{ fontSize: '20px' }}>search</span>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary transition-opacity">notifications</span>
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary transition-opacity">account_circle</span>
          </div>
        </div>
      </header>

      <main className="w-full max-w-[1440px] mx-auto px-gutter py-stack-lg min-h-screen">
        {/* Dashboard Header */}
        <div className="mb-stack-lg flex justify-between items-end">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-primary">Observer Command Center</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">Real-time cryptographic oversight and system integrity metrics.</p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 bg-surface-container-high px-4 py-2 rounded-lg">
              <span className="material-symbols-outlined text-secondary text-[20px]">verified_user</span>
              <span className="font-label-md text-label-md">Status: Authorized</span>
            </div>
            <button className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-label-md hover:opacity-90 transition-opacity">Generate Audit PDF</button>
          </div>
        </div>

        {/* Bento Layout Start */}
        <div className="grid grid-cols-12 gap-[24px]">
          {/* Metric: Blockchain Sync */}
          <div className="col-span-12 lg:col-span-3 bg-white/80 backdrop-blur-md border border-outline-variant p-6 rounded-xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="material-symbols-outlined text-secondary bg-secondary-fixed p-2 rounded-lg">account_tree</span>
                <span className="text-secondary font-label-sm animate-pulse flex items-center gap-1">● Live Sync</span>
              </div>
              <h3 className="font-label-md text-on-surface-variant uppercase tracking-wider">Blockchain Sync</h3>
              <p className="font-display-lg text-[36px] font-bold text-primary mt-1">{syncPercentage}%</p>
            </div>
            <div className="mt-4 pt-4 border-t border-outline-variant">
              <p className="font-label-sm text-on-surface-variant">Last Verified Hash</p>
              <p className={`font-label-sm font-mono truncate mt-1 transition-colors duration-500 ${isHashHighlighted ? 'text-primary' : 'text-secondary'}`}>
                {currentHash}
              </p>
            </div>
          </div>

          {/* Metric: Active Jurisdictions */}
          <div className="col-span-12 lg:col-span-3 bg-white/80 backdrop-blur-md border border-outline-variant p-6 rounded-xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="material-symbols-outlined text-secondary bg-secondary-fixed p-2 rounded-lg">language</span>
                <span className="text-on-surface-variant font-label-sm">Active Count</span>
              </div>
              <h3 className="font-label-md text-on-surface-variant uppercase tracking-wider">Live Jurisdictions</h3>
              <p className="font-display-lg text-[36px] font-bold text-primary mt-1">142</p>
            </div>
            <div className="mt-4 pt-4 border-t border-outline-variant flex justify-between items-center">
              <span className="font-label-sm text-on-surface-variant">Global Latency</span>
              <span className="font-label-sm text-secondary font-bold">42ms</span>
            </div>
          </div>

          {/* Cryptographic Workload Chart (Large) */}
          <div className="col-span-12 lg:col-span-6 bg-white/80 backdrop-blur-md border border-outline-variant p-6 rounded-xl relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-label-md font-bold text-on-surface">Cryptographic Workload</h3>
              <select className="bg-transparent border-none text-label-sm text-on-surface-variant focus:ring-0 cursor-pointer">
                <option>Last 60 Minutes</option>
                <option>Last 24 Hours</option>
              </select>
            </div>
            <div className="h-32 flex items-end gap-1 px-2">
              {/* Simple CSS bar chart as visualization */}
              <div className="w-full bg-secondary-fixed rounded-t-sm h-[30%] opacity-40"></div>
              <div className="w-full bg-secondary-fixed rounded-t-sm h-[45%] opacity-50"></div>
              <div className="w-full bg-secondary-fixed rounded-t-sm h-[60%] opacity-60"></div>
              <div className="w-full bg-secondary rounded-t-sm h-[85%]"></div>
              <div className="w-full bg-secondary-fixed rounded-t-sm h-[70%] opacity-80"></div>
              <div className="w-full bg-secondary-fixed rounded-t-sm h-[95%] opacity-90"></div>
              <div className="w-full bg-secondary-fixed rounded-t-sm h-[50%] opacity-50"></div>
              <div className="w-full bg-secondary-fixed rounded-t-sm h-[40%] opacity-40"></div>
              <div className="w-full bg-secondary rounded-t-sm h-[65%]"></div>
              <div className="w-full bg-secondary-fixed rounded-t-sm h-[80%] opacity-80"></div>
              <div className="w-full bg-secondary-fixed rounded-t-sm h-[55%] opacity-60"></div>
              <div className="w-full bg-secondary-fixed rounded-t-sm h-[45%] opacity-50"></div>
            </div>
            <div className="mt-4 flex justify-between font-label-sm text-on-surface-variant">
              <span>14:00</span>
              <span>14:30</span>
              <span>15:00</span>
            </div>
          </div>

          {/* Security Events Feed */}
          <div className="col-span-12 lg:col-span-4 bg-white/80 backdrop-blur-md border border-outline-variant p-6 rounded-xl max-h-[600px] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline-md text-[20px] text-primary">Security Events</h3>
              <span className="material-symbols-outlined text-error cursor-pointer">warning</span>
            </div>
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {/* Event Item */}
              <div className="p-3 bg-surface-container rounded-lg border-l-4 border-secondary">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-label-md text-on-surface font-bold">Ledger Access</span>
                  <span className="font-label-sm text-on-surface-variant">14:52:10</span>
                </div>
                <p className="font-label-sm text-on-surface-variant mb-2">Auth successful from observer-04</p>
                <code className="text-[10px] bg-surface-container-high px-1.5 py-0.5 rounded text-secondary font-mono">IP: 192.168.1.104</code>
              </div>
              {/* Event Item */}
              <div className="p-3 bg-surface-container rounded-lg border-l-4 border-error">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-label-md text-error font-bold">Anomaly Detected</span>
                  <span className="font-label-sm text-on-surface-variant">14:48:02</span>
                </div>
                <p className="font-label-sm text-on-surface-variant mb-2">Multi-IP collision in Zone-B</p>
                <code className="text-[10px] bg-surface-container-high px-1.5 py-0.5 rounded text-error font-mono">IP: 45.12.89.21</code>
              </div>
              {/* Event Item */}
              <div className="p-3 bg-surface-container rounded-lg border-l-4 border-secondary">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-label-md text-on-surface font-bold">Node Resync</span>
                  <span className="font-label-sm text-on-surface-variant">14:42:15</span>
                </div>
                <p className="font-label-sm text-on-surface-variant mb-2">Primary consensus node restored</p>
                <code className="text-[10px] bg-surface-container-high px-1.5 py-0.5 rounded text-secondary font-mono">ID: NODE-ALPHA-09</code>
              </div>
              {/* Event Item */}
              <div className="p-3 bg-surface-container rounded-lg border-l-4 border-secondary">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-label-md text-on-surface font-bold">Encrypted Handshake</span>
                  <span className="font-label-sm text-on-surface-variant">14:39:58</span>
                </div>
                <p className="font-label-sm text-on-surface-variant mb-2">Secure link verified (TLS 1.3)</p>
                <code className="text-[10px] bg-surface-container-high px-1.5 py-0.5 rounded text-secondary font-mono">CIPHER: AES-256-GCM</code>
              </div>
            </div>
          </div>

          {/* Observed Elections Table */}
          <div className="col-span-12 lg:col-span-8 bg-white/80 backdrop-blur-md border border-outline-variant p-6 rounded-xl">
            <h3 className="font-headline-md text-[20px] text-primary mb-6">Observed Elections</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-outline-variant">
                    <th className="text-left py-4 font-label-md text-on-surface-variant">Jurisdiction</th>
                    <th className="text-left py-4 font-label-md text-on-surface-variant">Status</th>
                    <th className="text-left py-4 font-label-md text-on-surface-variant">Progress</th>
                    <th className="text-right py-4 font-label-md text-on-surface-variant">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {elections.map((election: any) => {
                    const turnout = election._count?.eligibility > 0 
                      ? Math.round((election._count?.votes / election._count?.eligibility) * 100) 
                      : 0;
                    
                    return (
                      <tr key={election.id}>
                        <td className="py-4">
                          <div className="font-label-md font-bold text-on-surface">{election.title}</div>
                          <div className="font-label-sm text-on-surface-variant">ID: {election.id.substring(0, 8)}</div>
                        </td>
                        <td className="py-4">
                          <span className={`px-3 py-1 rounded-full font-label-sm flex items-center gap-1 w-fit ${
                            election.status === 'ACTIVE' ? 'bg-secondary-fixed text-on-secondary-fixed-variant' : 'bg-surface-container-highest text-on-surface-variant'
                          }`}>
                            {election.status === 'ACTIVE' && <span className="animate-pulse">●</span>} 
                            {election.status}
                          </span>
                        </td>
                        <td className="py-4 w-1/3">
                          <div className="flex items-center gap-4">
                            <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                              <div className="h-full bg-secondary" style={{ width: `${turnout}%` }}></div>
                            </div>
                            <span className="font-label-sm font-bold text-on-surface">{turnout}%</span>
                          </div>
                        </td>
                        <td className="py-4 text-right">
                          <Link to={`/observer/audit?electionId=${election.id}`} className="text-secondary font-label-md hover:underline">Monitor</Link>
                        </td>
                      </tr>
                    );
                  })}
                  {elections.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-4 text-center text-on-surface-variant">No elections available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Immutable Ledger Architecture Section */}
          <div 
            className="col-span-12 bg-white/80 backdrop-blur-md rounded-xl p-8 border-2 border-primary-container"
            style={{
              backgroundImage: 'radial-gradient(#DDE2E5 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          >
            <div className="flex flex-col md:flex-row gap-stack-lg items-center">
              <div className="flex-1">
                <div className="inline-block bg-primary text-on-primary px-3 py-1 rounded-sm font-label-sm mb-4">TECHNOLOGY STACK</div>
                <h2 className="font-headline-lg text-primary mb-4">Immutable Private Ledger</h2>
                <p className="font-body-md text-on-surface-variant max-w-2xl leading-relaxed">
                  Our proprietary blockchain architecture utilizes a Proof-of-Audit (PoA) consensus mechanism. Every vote is SHA-256 hashed and salt-padded before being committed to a sharded private ledger. Authorized observers can independently verify the hash chain integrity without compromising individual voter anonymity.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-secondary">lock</span>
                    <div>
                      <h4 className="font-label-md font-bold">AES-256 GCM</h4>
                      <p className="font-label-sm text-on-surface-variant">End-to-end encryption</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-secondary">token</span>
                    <div>
                      <h4 className="font-label-md font-bold">Homomorphic</h4>
                      <p className="font-label-sm text-on-surface-variant">Direct tally verification</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-secondary">shield</span>
                    <div>
                      <h4 className="font-label-md font-bold">Post-Quantum</h4>
                      <p className="font-label-sm text-on-surface-variant">Lattice-based security</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-auto flex flex-col items-center gap-4 bg-white p-6 rounded-xl border border-outline-variant">
                <div className="w-32 h-32 bg-surface-container p-2">
                  {/* Placeholder for QR Code */}
                  <img className="w-full h-full object-contain" alt="A high-fidelity minimalist QR code" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDxIkIkQxa4ZVHcrSN4gQL4FQi9Mf77tg6MIYebA8Re3LAQT-ooUkFAk1irtCeKendtAsP5dN3mlC5cGRcld0XkWp-eoydg7qE5ASNDC8Uui9gntJoWF4VR_J5SQa-37w0XMxOpo0YRi9SQuNs8nBSInMkod5laaIVkLiq0OkkeS91DSjqwkhnrp0N1OykFclU0Hxv-9YKaGF3mMNnGMIDFuNJUSiqIY6-egTBaJqtsiRluWm1EfPAow" />
                </div>
                <div className="text-center">
                  <p className="font-label-md font-bold">Verify Node 01-A</p>
                  <p className="font-label-sm text-on-surface-variant">Scan to verify hash root</p>
                </div>
                <button className="w-full border border-primary text-primary font-label-md py-2 rounded hover:bg-primary-fixed transition-colors">Download Key</button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low border-t border-outline-variant w-full mt-stack-lg">
        <div className="flex flex-col md:flex-row justify-between items-center px-gutter py-stack-md w-full max-w-[1440px] mx-auto gap-4">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-label-md text-label-md font-bold text-on-surface">VOTEKINETIC</span>
            <p className="font-label-sm text-label-sm text-on-surface-variant">© 2024 VOTEKINETIC Institutional Voting Systems. All rights reserved. State-grade encryption active.</p>
          </div>
          <div className="flex gap-6 flex-wrap justify-center">
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary underline transition-all" href="#">Security Protocol</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary underline transition-all" href="#">Privacy Policy</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary underline transition-all" href="#">Audit Logs</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary underline transition-all" href="#">Compliance</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary underline transition-all" href="#">Terms of Service</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary underline transition-all" href="#">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
