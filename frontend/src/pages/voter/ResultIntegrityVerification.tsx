import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ResultIntegrityVerification = () => {
  const navigate = useNavigate();
  const [logs, setLogs] = useState<string[]>([
    "[14:22:01] Initializing secure handshake with Node #8...",
    "[14:22:03] Handshake successful. Peer identity: VKT-VAL-08-GLOBAL",
    "[14:22:05] Fetching state transition proof for epoch 104...",
    "[14:22:08] VALID: State root 0x5a2... matches consensus.",
    "[14:22:15] Incoming integrity request from regional auditor 'C. Miller'",
    "[14:22:20] AUDIT: Regional Ballot Bucket 002 Hash check triggered.",
    "[14:22:21] Analyzing block header #820 signatures...",
    "[14:22:22] SigCheck complete: 10/12 signatures verified (Threshold met).",
    "[14:22:25] SYNC: Ledger alignment 100%.",
    "[14:22:30] Awaiting next block broadcast..."
  ]);

  useEffect(() => {
    const newLogs = [
      "[14:23:02] Broadcast: Region 04 data push detected.",
      "[14:23:05] Validator #03 proposing block #822...",
      "[14:23:10] Received attestations from 8 nodes.",
      "[14:23:12] COMPLETED: Integrity Check for Block #821 passed.",
      "[14:23:15] MONITOR: Latency spikes detected in Zone B (normal range)."
    ];

    const interval = setInterval(() => {
      setLogs((prev) => {
        const time = new Date().toLocaleTimeString('en-GB', { hour12: false });
        const randomLog = newLogs[Math.floor(Math.random() * newLogs.length)];
        const formatted = `[${time}] ${randomLog}`;
        const updated = [...prev, formatted];
        if (updated.length > 25) return updated.slice(updated.length - 25);
        return updated;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-surface pb-20">
      <header className="bg-surface border-b border-outline-variant sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(-1)}>
            <span className="material-symbols-outlined text-on-surface-variant">arrow_back</span>
            <span className="font-label-md text-on-surface font-bold">Back to Results</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-full border border-outline-variant shadow-sm">
            <span className="w-2.5 h-2.5 bg-[#15803d] rounded-full animate-pulse shadow-[0_0_8px_rgba(21,128,61,0.8)]"></span>
            <span className="text-xs font-bold font-mono tracking-wider text-on-surface-variant">LEDGER SYNCED</span>
          </div>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto w-full px-4 md:px-10 py-8 flex-grow">
        <header className="mb-10 text-center max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold text-primary tracking-tight mb-4 uppercase">Integrity Verification</h1>
          <p className="text-on-surface-variant leading-relaxed">
            Monitor the cryptographic hashing and global node consensus of the election results in real-time. No single entity controls this data.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-5xl mx-auto">
          <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
            <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl flex flex-col justify-between shadow-sm">
              <span className="material-symbols-outlined text-primary mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>gpp_good</span>
              <p className="text-sm font-bold text-on-surface-variant uppercase tracking-wider mb-1">State Root Hash</p>
              <p className="font-mono text-lg font-bold text-on-surface break-all">0x7F9A...B31C</p>
            </div>
            
            <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl flex flex-col justify-between shadow-sm">
              <span className="material-symbols-outlined text-primary mb-4">lan</span>
              <p className="text-sm font-bold text-on-surface-variant uppercase tracking-wider mb-1">Active Validator Nodes</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-on-surface">1,024</p>
                <p className="text-xs text-[#15803d] font-bold">+12 online</p>
              </div>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl flex flex-col items-center justify-center text-center shadow-sm">
              <div className="relative w-24 h-24 mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-surface-container-high" />
                  <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * 75) / 100} className="text-primary transition-all duration-1000" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">75%</span>
                </div>
              </div>
              <p className="text-sm text-primary font-bold">PoA QUORUM REACHED</p>
              <p className="text-[10px] text-on-surface-variant mt-2 italic leading-tight">Verification requires min 9 validated regional authorities.</p>
            </div>
          </div>

          <div className="md:col-span-12 bg-surface-container-lowest border-l-8 border-secondary p-8 rounded-xl shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
              <div>
                <h3 className="text-xl font-bold text-primary mb-1">Hash Verification Stream</h3>
                <p className="text-on-surface-variant text-sm">Real-time cryptographic audit of regional ballot buckets</p>
              </div>
              <button className="bg-primary text-white px-6 h-12 font-bold uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center gap-2 rounded-lg whitespace-nowrap">
                <span className="material-symbols-outlined text-[20px]">restart_alt</span>
                Full Re-Tally
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4 border-b border-outline-variant pb-4">
                <div className="md:col-span-3">
                  <span className="text-xs font-bold uppercase text-on-surface-variant tracking-wider">Region 01</span>
                  <h4 className="font-bold text-primary">Metro North</h4>
                </div>
                <div className="md:col-span-6">
                  <div className="flex justify-between text-[10px] font-bold text-on-surface-variant mb-1">
                    <span>HASHING PACKETS...</span>
                    <span>98.2%</span>
                  </div>
                  <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-secondary w-[98%] transition-all duration-500"></div>
                  </div>
                </div>
                <div className="md:col-span-3 flex justify-end items-center gap-4">
                  <div className="text-right">
                    <p className="text-[10px] text-on-surface-variant font-bold uppercase">Status</p>
                    <p className="text-secondary font-bold text-sm">MATCHED</p>
                  </div>
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4 border-b border-outline-variant pb-4">
                <div className="md:col-span-3">
                  <span className="text-xs font-bold uppercase text-on-surface-variant tracking-wider">Region 02</span>
                  <h4 className="font-bold text-primary">Coastal District</h4>
                </div>
                <div className="md:col-span-6">
                  <div className="flex justify-between text-[10px] font-bold text-on-surface-variant mb-1">
                    <span>COMPARING LEDGER...</span>
                    <span>64.5%</span>
                  </div>
                  <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-secondary w-[64%] transition-all duration-500"></div>
                  </div>
                </div>
                <div className="md:col-span-3 flex justify-end items-center gap-4">
                  <div className="text-right">
                    <p className="text-[10px] text-on-surface-variant font-bold uppercase">Status</p>
                    <p className="text-on-surface-variant font-bold text-sm">PENDING</p>
                  </div>
                  <span className="material-symbols-outlined text-outline">pending</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <div className="md:col-span-3">
                  <span className="text-xs font-bold uppercase text-on-surface-variant tracking-wider">Region 03</span>
                  <h4 className="font-bold text-primary">Central Highlands</h4>
                </div>
                <div className="md:col-span-6">
                  <div className="flex justify-between text-[10px] font-bold text-on-surface-variant mb-1">
                    <span>QUEUED</span>
                    <span>0.0%</span>
                  </div>
                  <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-secondary w-0 transition-all duration-500"></div>
                  </div>
                </div>
                <div className="md:col-span-3 flex justify-end items-center gap-4">
                  <div className="text-right">
                    <p className="text-[10px] text-on-surface-variant font-bold uppercase">Status</p>
                    <p className="text-on-surface-variant font-bold text-sm opacity-50">STAGED</p>
                  </div>
                  <span className="material-symbols-outlined text-outline opacity-50">timer</span>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-12 bg-surface-container-lowest overflow-hidden rounded-xl shadow-sm border border-outline-variant">
            <div className="bg-primary px-6 py-4 flex justify-between items-center">
              <h3 className="text-white font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">terminal</span>
                NODE SYSTEM LOGS [INTERNAL_VERIFIER_04]
              </h3>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ef4444]"></div>
                <div className="w-3 h-3 rounded-full bg-[#eab308]"></div>
                <div className="w-3 h-3 rounded-full bg-[#22c55e]"></div>
              </div>
            </div>
            <div className="bg-[#1e1e1e] p-6 h-64 overflow-y-auto font-mono text-xs leading-relaxed text-[#a3a3a3]">
              {logs.map((log, index) => (
                <p key={index} className={log.includes('VALID') || log.includes('MATCHED') || log.includes('SYNC') || log.includes('COMPLETED') ? 'text-[#22c55e]' : log.includes('AUDIT') ? 'text-white font-bold' : ''}>
                  {log}
                </p>
              ))}
              <div className="inline-block w-2 h-4 bg-[#22c55e] ml-1 animate-pulse align-middle"></div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};
