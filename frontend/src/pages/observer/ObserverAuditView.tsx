import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const ObserverAuditView = () => {
  const navigate = useNavigate();
  const [blockHeight, setBlockHeight] = useState(1402984);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setBlockHeight(prev => prev + 1);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="bg-surface border-b border-outline-variant sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/observer')}>
            <span className="material-symbols-outlined text-primary">visibility</span>
            <span className="font-headline-md text-primary font-bold tracking-tight">VOTEKINETIC</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-on-surface-variant uppercase tracking-widest hidden md:block">Observer Portal</span>
            <div className="w-8 h-8 rounded-full bg-surface-container-high border border-outline-variant flex items-center justify-center">
              <span className="material-symbols-outlined text-sm">person</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1000px] mx-auto w-full px-4 md:px-8 py-8 space-y-8 flex-grow">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary">verified_user</span>
              <h1 className="text-3xl font-bold text-on-surface tracking-tight">Audit Node View</h1>
            </div>
            <p className="text-on-surface-variant max-w-2xl">
              Live cryptographic ledger monitoring. This view allows independent observers to verify block transactions in real-time.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <div className="bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 flex items-center gap-3 w-full md:w-auto justify-between shadow-sm">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Network Status</span>
                <span className="text-sm font-bold text-secondary flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                  SYNCED
                </span>
              </div>
              <div className="h-8 w-[1px] bg-outline-variant mx-2"></div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Block Height</span>
                <span className="font-mono text-sm font-bold text-primary transition-colors duration-300">
                  {blockHeight.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-surface border border-outline-variant rounded-xl p-4 flex items-center gap-4 shadow-sm hover:border-primary transition-colors">
            <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[20px]">lan</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Active Peers</p>
              <p className="text-lg font-bold text-on-surface">2,048</p>
            </div>
          </div>
          <div className="bg-surface border border-outline-variant rounded-xl p-4 flex items-center gap-4 shadow-sm hover:border-primary transition-colors">
            <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[20px]">speed</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">TPS (Avg)</p>
              <p className="text-lg font-bold text-on-surface">142</p>
            </div>
          </div>
          <div className="bg-surface border border-outline-variant rounded-xl p-4 flex items-center gap-4 shadow-sm hover:border-primary transition-colors">
            <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[20px]">security</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Consensus</p>
              <p className="text-lg font-bold text-on-surface">99.8%</p>
            </div>
          </div>
          <div className="bg-surface border border-outline-variant rounded-xl p-4 flex items-center gap-4 shadow-sm hover:border-primary transition-colors">
            <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[20px]">database</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Ledger Size</p>
              <p className="text-lg font-bold text-on-surface">14.2 GB</p>
            </div>
          </div>
        </div>

        <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm">
          <div className="bg-surface-container-low px-6 py-4 border-b border-outline-variant flex justify-between items-center">
            <h2 className="font-bold text-on-surface uppercase tracking-wider text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">receipt_long</span>
              Latest Block Transactions
            </h2>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Live Feed</span>
            </div>
          </div>

          <div className="divide-y divide-outline-variant">
            <div className="p-5 flex flex-col gap-3 hover:bg-surface-container-lowest transition-colors group">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                  <span className="font-bold text-on-surface text-sm">LEDGER_SYNC_SUCCESS</span>
                </div>
                <span className="text-xs text-on-surface-variant font-mono">2023-10-27 14:22:10.452</span>
              </div>
              <div className="bg-surface-container-low p-3 rounded border border-outline-variant">
                <div className="flex flex-col md:flex-row gap-2 md:gap-8">
                  <div className="flex-1 overflow-hidden">
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase block mb-1">BLOCK_HASH</span>
                    <span className="text-xs text-primary font-mono truncate block">0x8f3c...f2d91b6a7710c</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase block mb-1">HEIGHT</span>
                    <span className="text-xs text-primary font-mono">{blockHeight}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 flex flex-col gap-3 hover:bg-surface-container-lowest transition-colors group">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary">account_tree</span>
                  <span className="font-bold text-on-surface text-sm">MERKLE_ROOT_UPDATED</span>
                </div>
                <span className="text-xs text-on-surface-variant font-mono">2023-10-27 14:21:55.102</span>
              </div>
              <div className="bg-surface-container-low p-3 rounded border border-outline-variant">
                <div className="flex flex-col md:flex-row gap-2 md:gap-8">
                  <div className="flex-1 overflow-hidden">
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase block mb-1">ROOT_HASH</span>
                    <span className="text-xs text-primary font-mono truncate block">0x2a91...e8c332900f11d</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase block mb-1">LEAVES</span>
                    <span className="text-xs text-primary font-mono">512</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 flex flex-col gap-3 hover:bg-surface-container-lowest transition-colors group">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary">vpn_key</span>
                  <span className="font-bold text-on-surface text-sm">SIGNATURE_VERIFIED</span>
                </div>
                <span className="text-xs text-on-surface-variant font-mono">2023-10-27 14:21:40.881</span>
              </div>
              <div className="bg-surface-container-low p-3 rounded border border-outline-variant">
                <div className="flex flex-col md:flex-row gap-2 md:gap-8">
                  <div className="flex-1 overflow-hidden">
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase block mb-1">SIGNER_ID</span>
                    <span className="text-xs text-primary font-mono truncate block">NODE_VAL_04_NORTH_SEC</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase block mb-1">STATUS</span>
                    <span className="text-xs text-secondary font-bold">HEALTHY</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 flex flex-col gap-3 hover:bg-surface-container-lowest transition-colors group">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary">database</span>
                  <span className="font-bold text-on-surface text-sm">STATE_COMMIT_COMPLETED</span>
                </div>
                <span className="text-xs text-on-surface-variant font-mono">2023-10-27 14:20:12.001</span>
              </div>
              <div className="bg-surface-container-low p-3 rounded border border-outline-variant">
                <div className="flex flex-col md:flex-row gap-2 md:gap-8">
                  <div className="flex-1 overflow-hidden">
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase block mb-1">TRANSACTION_ID</span>
                    <span className="text-xs text-primary font-mono truncate block">TX_VOTE_771_E2_BLOCK_84</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase block mb-1">LATENCY</span>
                    <span className="text-xs text-primary font-mono">14ms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button className="w-full p-4 font-bold text-sm text-primary hover:bg-surface-container-low transition-colors border-t border-outline-variant flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">expand_more</span>
            View Previous 100 Logs
          </button>
        </div>

        <div className="mt-8 p-6 bg-primary rounded-xl text-white flex flex-col md:flex-row items-center gap-6 shadow-md">
          <div className="flex-shrink-0">
            <span className="material-symbols-outlined text-[48px]" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-bold mb-2">Encrypted Chain Integrity</h3>
            <p className="text-sm opacity-90 leading-relaxed max-w-2xl">
              This audit node is currently tracking the global consensus. All hashes shown are generated locally from encrypted voting packets and verified against the network's Merkle Root.
            </p>
          </div>
          <div className="w-full md:w-auto mt-4 md:mt-0">
            <button className="w-full md:w-auto bg-white text-primary px-6 py-3 font-bold rounded-lg shadow-sm hover:opacity-90 active:scale-95 transition-all whitespace-nowrap uppercase tracking-widest text-sm">
              Download Report
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
