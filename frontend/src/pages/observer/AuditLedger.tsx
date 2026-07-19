import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

interface LogEntry {
  type: string;
  hashContext: string;
  height: string;
  latency: string;
  timestamp: string;
  icon: string;
}

export const AuditLedger: React.FC = () => {
  const [consoleInput, setConsoleInput] = useState('');
  const [logs, setLogs] = useState<LogEntry[]>([
    { type: 'LEDGER_SYNC_SUCCESS', hashContext: 'b7f2...901e', height: '48,992,102', latency: '0.02s', timestamp: '12:40:01:234', icon: 'sync' },
    { type: 'MERKLE_ROOT_UPDATED', hashContext: 'f921...c10b', height: '48,992,101', latency: '0.05s', timestamp: '12:39:58:812', icon: 'account_tree' },
    { type: 'SIGNATURE_VERIFIED', hashContext: '82c4...e332', height: '48,992,101', latency: '0.11s', timestamp: '12:39:55:042', icon: 'ink_pen' },
    { type: 'LEDGER_SYNC_SUCCESS', hashContext: 'a1b2...c3d4', height: '48,992,100', latency: '0.03s', timestamp: '12:39:50:111', icon: 'sync' },
    { type: 'MERKLE_ROOT_UPDATED', hashContext: 'e5f6...g7h8', height: '48,992,099', latency: '0.04s', timestamp: '12:39:45:982', icon: 'account_tree' },
    { type: 'SIGNATURE_VERIFIED', hashContext: 'i9j0...k1l2', height: '48,992,099', latency: '0.12s', timestamp: '12:39:40:555', icon: 'ink_pen' },
  ]);

  const endOfMessagesRef = useRef<HTMLTableRowElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs((prevLogs) => {
        const newLogs = [...prevLogs];
        const lastLog = newLogs.pop();
        if (lastLog) {
          // Update timestamp to simulate real-time
          const now = new Date();
          lastLog.timestamp = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}:${now.getMilliseconds()}`;
          return [lastLog, ...newLogs];
        }
        return prevLogs;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleConsoleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && consoleInput) {
      alert('Executing audit command: ' + consoleInput);
      setConsoleInput('');
    }
  };

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen">
      {/* TopNavBar */}
      <header className="bg-surface border-b border-outline-variant fixed top-0 w-full z-50">
        <nav className="flex justify-between items-center px-gutter py-4 w-full max-w-[1440px] mx-auto">
          <div className="flex items-center gap-stack-lg">
            <span className="font-headline-md text-headline-md font-bold text-primary">VOTEKINETIC</span>
            <div className="hidden md:flex gap-6 items-center">
              <Link to="/observer/organizations" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">Organizations</Link>
              <Link to="/observer/tenants" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">Tenants</Link>
              <Link to="/observer/billing" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">Billing</Link>
              <Link to="/observer" className="font-label-md text-label-md text-secondary border-b-2 border-secondary pb-1">Global Settings</Link>
              <Link to="/observer/security" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">Security</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="material-symbols-outlined text-on-surface-variant hover:text-primary">notifications</button>
            <button className="material-symbols-outlined text-on-surface-variant hover:text-primary">account_circle</button>
          </div>
        </nav>
      </header>

      <main className="pt-24 pb-12 px-gutter max-w-[1440px] mx-auto min-h-screen">
        {/* Header & Top Metrics */}
        <div className="mb-stack-lg flex flex-col md:flex-row justify-between items-end gap-stack-md">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-secondary/10 text-secondary font-label-md text-label-sm uppercase tracking-wider rounded">Audit Ledger</span>
              <span className="text-on-surface-variant font-label-md text-label-sm">SCREEN_88_V2</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-primary">Observer Node Console</h1>
          </div>
          <div className="flex gap-gutter w-full md:w-auto">
            <div className="p-4 bg-surface-container-low border border-outline-variant rounded-lg flex flex-col gap-1 min-w-[140px]">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Node Health</span>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                <span className="font-label-md text-label-md text-on-surface font-bold">OPERATIONAL</span>
              </div>
            </div>
            <div className="p-4 bg-surface-container-low border border-outline-variant rounded-lg flex flex-col gap-1 min-w-[140px]">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Uptime</span>
              <span className="font-label-md text-label-md text-on-surface font-bold">99.982%</span>
            </div>
            <div className="p-4 bg-surface-container-low border border-outline-variant rounded-lg flex flex-col gap-1 min-w-[140px]">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Latency</span>
              <span className="font-label-md text-label-md text-on-surface font-bold">14ms</span>
            </div>
          </div>
        </div>

        {/* Terminal Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Left Column: Health & Stats */}
          <div className="lg:col-span-4 flex flex-col gap-gutter">
            {/* Real-Time Metrics Card */}
            <section className="bg-surface border border-outline-variant p-stack-md rounded-xl">
              <h3 className="font-label-md text-label-md text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">analytics</span>
                Technical Metrics
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-outline-variant">
                  <span className="text-on-surface-variant text-label-md font-label-md">Block Height</span>
                  <span className="font-mono font-bold text-on-surface text-label-md tracking-tighter">#48,992,102</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-outline-variant">
                  <span className="text-on-surface-variant text-label-md font-label-md">Last Sync</span>
                  <span className="text-on-surface text-label-md font-label-md">240ms ago</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-outline-variant">
                  <span className="text-on-surface-variant text-label-md font-label-md">Active Peers</span>
                  <span className="text-on-surface text-label-md font-label-md">12 Nodes</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-on-surface-variant text-label-md font-label-md">Data Throughput</span>
                  <span className="text-on-surface text-label-md font-label-md">8.4 GB/hr</span>
                </div>
              </div>
            </section>

            {/* Integrity Section */}
            <section className="bg-primary text-on-primary p-stack-md rounded-xl relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="font-label-md text-label-md text-on-primary-container mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">verified_user</span>
                  Chain Integrity
                </h3>
                <p className="text-label-md opacity-80 mb-6 leading-relaxed">
                  Continuous cryptographic verification of the ledger state is active. The Merkle tree root matches the consensus threshold.
                </p>
                <div className="bg-primary-container/30 border border-on-primary-container/20 rounded p-3 mb-6">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-label-sm font-label-sm uppercase tracking-tighter text-on-primary-container">Current Root Hash</span>
                    <span className="material-symbols-outlined text-label-md text-on-primary-container">lock</span>
                  </div>
                  <span className="font-mono text-label-sm break-all tracking-tighter">0x74a2...f892c90e11</span>
                </div>
                <button className="w-full h-12 bg-white text-primary font-label-md rounded flex items-center justify-center gap-2 hover:bg-on-primary-fixed transition-colors">
                  <span className="material-symbols-outlined">download</span>
                  Download Audit Report
                </button>
              </div>
              {/* Decorative Element */}
              <div className="absolute -right-8 -bottom-8 opacity-10">
                <span className="material-symbols-outlined text-[160px]">shield</span>
              </div>
            </section>

            {/* Map Visualization Placeholder */}
            <div className="bg-surface-container-low border border-outline-variant rounded-xl p-stack-md">
              <h3 className="font-label-md text-label-md text-primary mb-4">Node Distribution</h3>
              <div className="aspect-video bg-surface-variant rounded overflow-hidden relative grayscale opacity-70">
                <img className="w-full h-full object-cover" alt="GIS map visualization" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcxJ3ueId3AVxmCEf0yToSraN7pzNdtcbAnSmLIN_FZfTAYnqwtG-7nlVJM_tgqQY-48xxejTQh_yn6RB3tTyYqejhBm0OHtmG2f3dAW8SghCgaeCWpvEbIus9tNcisJwgmYWcukI3Cj1NaMqpEL1DPPHyhteCim_k3tXUreq6J-JMVKrE7r26Hs-_xNb4HUHRBrh1_QZ0Z12PYVxQAs_4XEg4K4LlfgrT9Wqz6Vr1O3Jj03WXtcIHJw" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-primary/90 text-on-primary px-3 py-1 rounded text-label-sm font-bold shadow-lg">Washington D.C. HQ</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High Density Stream */}
          <div className="lg:col-span-8">
            <div className="bg-white border border-outline-variant rounded-xl flex flex-col h-[800px] overflow-hidden shadow-sm">
              {/* Stream Header */}
              <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-low flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary">database</span>
                  <h2 className="font-label-md text-label-md text-primary font-bold">Cryptographic Event Stream</h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-label-sm text-on-surface-variant italic">Auto-refreshing stream</span>
                  <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
                </div>
              </div>

              {/* Stream Content */}
              <div className="flex-1 overflow-y-auto p-0">
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 bg-surface-container z-10">
                    <tr className="border-b border-outline-variant">
                      <th className="px-6 py-3 font-label-sm text-label-sm text-on-surface-variant uppercase">Event Type</th>
                      <th className="px-6 py-3 font-label-sm text-label-sm text-on-surface-variant uppercase">Hash Context</th>
                      <th className="px-6 py-3 font-label-sm text-label-sm text-on-surface-variant uppercase">Height</th>
                      <th className="px-6 py-3 font-label-sm text-label-sm text-on-surface-variant uppercase">Latency</th>
                      <th className="px-6 py-3 font-label-sm text-label-sm text-on-surface-variant uppercase">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/30">
                    {logs.map((log, i) => (
                      <tr key={i} className="hover:bg-surface-container-low transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-secondary text-[18px]">{log.icon}</span>
                            <span className="font-label-md text-label-md text-on-surface font-bold">{log.type}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-mono tracking-tighter text-label-sm text-on-surface-variant">
                          <span className="group-hover:text-primary transition-colors">{log.hashContext}</span>
                        </td>
                        <td className="px-6 py-4 text-label-md font-label-md text-on-surface">{log.height}</td>
                        <td className={`px-6 py-4 text-label-md font-label-md ${parseFloat(log.latency) < 0.1 ? 'text-green-600' : 'text-on-surface-variant'}`}>{log.latency}</td>
                        <td className="px-6 py-4 text-label-sm text-on-surface-variant">{log.timestamp}</td>
                      </tr>
                    ))}
                    <tr ref={endOfMessagesRef} />
                  </tbody>
                </table>
              </div>

              {/* Console Interaction Area */}
              <div className="p-4 bg-tertiary text-on-tertiary font-mono text-label-sm flex items-center gap-3 tracking-tighter">
                <span className="text-on-tertiary-container animate-pulse">SYSTEM_ACTIVE{'>'}</span>
                <input 
                  value={consoleInput}
                  onChange={(e) => setConsoleInput(e.target.value)}
                  onKeyDown={handleConsoleSubmit}
                  className="bg-transparent border-none focus:ring-0 w-full text-on-tertiary placeholder:text-on-tertiary-fixed-variant p-0 font-mono text-label-sm tracking-tighter outline-none" 
                  placeholder="Awaiting manual audit command..." 
                  type="text" 
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low border-t border-outline-variant mt-stack-lg">
        <div className="flex flex-col md:flex-row justify-between items-center px-gutter py-stack-md w-full max-w-[1440px] mx-auto gap-4">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-label-md text-label-md font-bold text-on-surface">VOTEKINETIC</span>
            <p className="font-label-sm text-label-sm text-on-surface-variant">© 2024 VOTEKINETIC Institutional Voting Systems. All rights reserved. State-grade encryption active.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary underline" href="#">Security Protocol</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary underline" href="#">Privacy Policy</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary underline" href="#">Audit Logs</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary underline" href="#">Compliance</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary underline" href="#">Terms of Service</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary underline" href="#">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
