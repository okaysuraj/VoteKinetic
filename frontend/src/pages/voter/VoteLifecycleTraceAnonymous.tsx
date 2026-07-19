import React from 'react';
import { useNavigate } from 'react-router-dom';

export const VoteLifecycleTraceAnonymous = () => {
  const navigate = useNavigate();

  const handleCopyHash = (text: string, e: React.MouseEvent<HTMLElement>) => {
    navigator.clipboard.writeText(text);
    const target = e.currentTarget;
    const originalText = target.innerText;
    target.innerText = "COPIED TO CLIPBOARD";
    target.classList.add('text-secondary');
    setTimeout(() => {
      target.innerText = originalText;
      target.classList.remove('text-secondary');
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="bg-surface border-b border-outline-variant sticky top-0 z-50">
        <div className="max-w-[800px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(-1)}>
            <span className="material-symbols-outlined text-on-surface-variant">arrow_back</span>
            <span className="font-label-md text-on-surface font-bold">Back to Receipt</span>
          </div>
          <div className="px-3 py-1 bg-surface-container-high rounded-full border border-outline-variant flex items-center gap-2 shadow-sm">
            <span className="w-2 h-2 bg-secondary rounded-full"></span>
            <span className="text-xs font-bold tracking-wider">LIVE TRACE</span>
          </div>
        </div>
      </header>

      <main className="max-w-[800px] mx-auto w-full px-4 py-8 flex-grow">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-primary mb-2 tracking-tight">Vote Lifecycle Trace</h1>
          <p className="text-on-surface-variant">
            Track the cryptographic journey of your ballot from device submission to final tally inclusion. Your identity remains completely decoupled from the payload.
          </p>
        </header>

        <div className="relative border-l-2 border-outline-variant ml-6 space-y-12 pb-12">
          
          <div className="relative pl-10">
            <div className="absolute -left-6 top-0 w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center z-10 shadow-sm">
              <span className="material-symbols-outlined">fingerprint</span>
            </div>
            <div className="p-6 rounded-xl bg-white shadow-sm border border-outline-variant">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-2">
                <div>
                  <h3 className="text-xl font-bold text-on-surface">Identity Anonymization</h3>
                  <p className="text-sm text-on-surface-variant">Oct 24, 2023 &bull; 09:14:10 UTC</p>
                </div>
                <span className="bg-surface-container-high px-3 py-1 rounded-full text-xs font-bold w-fit">STEP 01</span>
              </div>
              <p className="text-on-surface-variant mb-4">Your voter credentials have been verified and permanently stripped from the ballot payload, generating a zero-knowledge identity proof.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-surface-container-low p-3 rounded-lg border-l-4 border-secondary">
                  <p className="text-xs text-on-surface-variant font-bold uppercase mb-1">Public Key Hash</p>
                  <code 
                    className="font-mono text-sm break-all cursor-pointer hover:opacity-60 transition-opacity" 
                    title="Click to copy"
                    onClick={(e) => handleCopyHash("0x882a77f1b990cc21...d9e1", e)}
                  >
                    0x882a77f1b990cc21...d9e1
                  </code>
                </div>
                <div className="bg-surface-container-low p-3 rounded-lg border-l-4 border-secondary">
                  <p className="text-xs text-on-surface-variant font-bold uppercase mb-1">Authorization Signature</p>
                  <div className="flex items-center gap-2 text-secondary">
                    <span className="material-symbols-outlined text-sm">verified</span>
                    <span className="font-bold">District_Auth_v3.01</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative pl-10">
            <div className="absolute -left-6 top-0 w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center z-10 shadow-sm">
              <span className="material-symbols-outlined">draw</span>
            </div>
            <div className="p-6 rounded-xl bg-white shadow-sm border border-outline-variant">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-2">
                <div>
                  <h3 className="text-xl font-bold text-on-surface">Ballot Signed</h3>
                  <p className="text-sm text-on-surface-variant">Oct 24, 2023 &bull; 09:14:12 UTC</p>
                </div>
                <span className="bg-surface-container-high px-3 py-1 rounded-full text-xs font-bold w-fit">STEP 02</span>
              </div>
              <p className="text-on-surface-variant mb-4">Ballot content encrypted via homomorphic encryption and signed with the voter's ephemeral token.</p>
              
              <div className="bg-[#1e1e1e] text-[#d4d4d4] p-4 rounded-lg overflow-hidden relative shadow-inner">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold opacity-60">ENCRYPTED_PAYLOAD</span>
                  <span className="material-symbols-outlined text-sm opacity-60">lock</span>
                </div>
                <code 
                  className="font-mono text-xs block break-all leading-relaxed cursor-pointer hover:text-white transition-colors"
                  title="Click to copy payload hash"
                  onClick={(e) => handleCopyHash("f29e9282b0123891c98e72f09823e7f901c2389e1c2e3981f20398f12c3e981f20398f1c2e3981f20398f1c2e3981f20398f1c2e3981f20398f1c2e3981f20398f123c89e", e)}
                >
                  f29e9282b0123891c98e72f09823e7f901c2389e1c2e3981f20398f12c3e981f20398f1c2e3981f20398f1c2e3981f20398f1c2e3981f20398f1c2e3981f20398f123c89e
                </code>
              </div>
            </div>
          </div>

          <div className="relative pl-10">
            <div className="absolute -left-6 top-0 w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center z-10 shadow-sm">
              <span className="material-symbols-outlined">account_balance_wallet</span>
            </div>
            <div className="p-6 rounded-xl bg-white shadow-sm border border-outline-variant">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-2">
                <div>
                  <h3 className="text-xl font-bold text-on-surface">Ledger Entry</h3>
                  <p className="text-sm text-on-surface-variant">Oct 24, 2023 &bull; 09:14:15 UTC</p>
                </div>
                <span className="bg-surface-container-high px-3 py-1 rounded-full text-xs font-bold w-fit">STEP 03</span>
              </div>
              
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center py-3 border-b border-outline-variant">
                  <span className="text-on-surface-variant font-bold">Block Number</span>
                  <span className="font-mono font-bold text-lg">#4,821,093</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-outline-variant">
                  <span className="text-on-surface-variant font-bold">Merkle Root Hash</span>
                  <code 
                    className="font-mono cursor-pointer hover:opacity-60 transition-opacity"
                    onClick={(e) => handleCopyHash("0x992b...221c", e)}
                  >
                    0x992b...221c
                  </code>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-on-surface-variant font-bold">Network Confirmation</span>
                  <span className="text-primary font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">groups</span>
                    24/24 Nodes
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative pl-10">
            <div className="absolute -left-6 top-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center z-10 shadow-sm">
              <span className="material-symbols-outlined">analytics</span>
            </div>
            <div className="p-6 rounded-xl bg-white shadow-md border-2 border-primary">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-2">
                <div>
                  <h3 className="text-xl font-bold text-on-surface">Tally Inclusion</h3>
                  <p className="text-sm text-on-surface-variant">Oct 24, 2023 &bull; 20:00:01 UTC</p>
                </div>
                <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-bold w-fit tracking-wider">FINAL</span>
              </div>
              
              <div className="flex items-center gap-4 bg-surface-container-low p-4 rounded-lg border border-outline-variant">
                <div className="w-16 h-16 rounded bg-white flex items-center justify-center border border-outline-variant flex-none">
                  <span className="material-symbols-outlined text-3xl text-secondary">ballot</span>
                </div>
                <div>
                  <p className="font-bold text-on-surface">Verified Zero-Knowledge Proof</p>
                  <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">
                    The vote has been correctly aggregated into the final count without decrypting individual selection.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-8 p-6 bg-surface-container-low rounded-xl flex flex-col sm:flex-row items-center gap-6 border border-outline-variant shadow-sm">
          <div className="w-16 h-16 shrink-0 flex items-center justify-center bg-surface-container-high rounded-full">
            <span className="material-symbols-outlined text-[32px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-2">Cryptographic Integrity</h4>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Every step of the voting process is protected by industrial-grade encryption. The hashes provided above can be independently verified using the official election audit tool. This ensures your vote is counted as cast and cannot be altered or removed.
            </p>
          </div>
        </div>

      </main>
    </div>
  );
};
