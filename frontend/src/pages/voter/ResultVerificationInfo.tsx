import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ResultVerificationInfo = () => {
  const navigate = useNavigate();
  const [receiptCode, setReceiptCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleVerify = () => {
    if (receiptCode.trim() !== '') {
      setIsVerifying(true);
      setTimeout(() => {
        setIsVerifying(false);
        setIsVerified(true);
      }, 1500);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-surface">
      <aside className="hidden md:flex flex-col w-72 bg-surface border-r border-outline-variant fixed inset-y-0 z-10 p-4">
        <div className="mb-8 px-4 mt-16">
          <h2 className="font-headline-md text-2xl font-bold text-primary">Election Portal</h2>
        </div>
        <nav className="flex-grow space-y-1">
          <Link to="#" className="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-all">
            <span className="material-symbols-outlined">analytics</span>
            <span className="font-label-md">Live Turnout</span>
          </Link>
          <Link to="#" className="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-all">
            <span className="material-symbols-outlined">equalizer</span>
            <span className="font-label-md">Election Results</span>
          </Link>
          <Link to="#" className="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-all">
            <span className="material-symbols-outlined">list_alt</span>
            <span className="font-label-md">Detailed Breakdown</span>
          </Link>
          <Link to="#" className="flex items-center gap-4 px-4 py-3 bg-secondary-container text-on-secondary-container rounded-full transition-all">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            <span className="font-label-md font-bold">Verification Info</span>
          </Link>
          <Link to="/voter/integrity" className="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-all">
            <span className="material-symbols-outlined">security</span>
            <span className="font-label-md">Integrity Check</span>
          </Link>
          <Link to="#" className="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-all">
            <span className="material-symbols-outlined">fact_check</span>
            <span className="font-label-md">Tally Audit</span>
          </Link>
          <Link to="#" className="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-all">
            <span className="material-symbols-outlined">download</span>
            <span className="font-label-md">Export Results</span>
          </Link>
        </nav>
        <div className="mt-auto p-4 bg-surface-container-low rounded-xl">
          <p className="text-xs text-primary font-bold mb-1">SECURE CONNECTION</p>
          <p className="text-xs text-on-surface-variant">Validated by Global Governance Standards Protocol.</p>
        </div>
      </aside>

      <main className="flex-grow w-full md:ml-72 flex flex-col min-h-screen">
        <header className="bg-surface border-b border-outline-variant sticky top-0 z-50">
          <div className="px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(-1)}>
              <span className="material-symbols-outlined text-on-surface-variant md:hidden">arrow_back</span>
              <span className="font-label-md text-on-surface font-bold md:hidden">Back</span>
            </div>
            <div className="hidden md:flex font-headline-md text-primary font-bold tracking-tight">VOTEKINETIC</div>
          </div>
        </header>

        <div className="p-4 md:p-8 space-y-8 max-w-5xl mx-auto w-full flex-grow">
          <header className="mb-8">
            <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4 tracking-tight">End-to-End Verification</h1>
            <p className="text-on-surface-variant text-lg leading-relaxed max-w-3xl">
              Understand how your vote is cryptographically secured, anonymized, and tallied with mathematical certainty.
            </p>
          </header>

          <section className={`relative p-8 rounded-2xl overflow-hidden transition-all duration-700 ${isVerified ? 'bg-secondary/10 border border-secondary shadow-[0_0_20px_rgba(34,197,94,0.15)]' : 'bg-surface-container-lowest border border-outline-variant shadow-sm'}`}>
            <div className="relative z-10 flex flex-col md:flex-row gap-6 md:items-end justify-between">
              <div className="w-full md:w-2/3">
                <h3 className="text-2xl font-bold text-on-surface mb-2">Verify Your Ballot Status</h3>
                <p className="text-on-surface-variant mb-6">Enter your unique 24-character cryptographic receipt code below.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-grow">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline">qr_code_scanner</span>
                    <input 
                      type="text" 
                      placeholder="e.g. VK-9912-PX..." 
                      className={`w-full h-14 pl-12 pr-4 bg-surface border ${isVerified ? 'border-secondary bg-[#f0fdf4]' : 'border-outline'} rounded-lg font-mono text-sm uppercase tracking-widest text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all`}
                      value={receiptCode}
                      onChange={(e) => setReceiptCode(e.target.value)}
                    />
                  </div>
                  <button 
                    onClick={handleVerify}
                    disabled={isVerifying || receiptCode.trim() === ''}
                    className={`h-14 px-8 font-bold text-white rounded-lg transition-all flex items-center justify-center gap-2 whitespace-nowrap min-w-[160px] ${isVerified ? 'bg-secondary' : 'bg-primary hover:opacity-90'}`}
                  >
                    {isVerifying ? (
                      <><span className="material-symbols-outlined animate-spin">refresh</span> VERIFYING...</>
                    ) : isVerified ? (
                      <>VERIFIED <span className="material-symbols-outlined">check_circle</span></>
                    ) : (
                      'CHECK STATUS'
                    )}
                  </button>
                </div>
              </div>
              <div className="hidden md:flex flex-col items-center justify-center p-4 bg-surface-container rounded-xl w-32 h-32 border border-outline-variant">
                <span className="material-symbols-outlined text-[48px] text-primary mb-2">lock</span>
                <span className="text-[10px] font-bold text-center tracking-widest">AES-256</span>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-5 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
              <h4 className="text-xl font-bold mb-6">The Tally Process</h4>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center font-bold text-primary">1</div>
                  <p className="text-on-surface-variant text-sm leading-relaxed">Individual votes are encrypted at the moment of selection.</p>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center font-bold text-primary">2</div>
                  <p className="text-on-surface-variant text-sm leading-relaxed">Homomorphic encryption allows votes to be added together while still encrypted.</p>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center font-bold text-primary">3</div>
                  <p className="text-on-surface-variant text-sm leading-relaxed">Only the final total is decrypted, ensuring zero leakage of individual choices.</p>
                </li>
              </ul>
            </div>

            <div className="col-span-12 md:col-span-7 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden flex flex-col shadow-sm">
              <div className="p-6">
                <h4 className="text-xl font-bold mb-1">Verifiable Audit Trail</h4>
                <p className="text-on-surface-variant text-sm">Watch the live verification nodes processing proofs.</p>
              </div>
              <div className="flex-grow bg-primary overflow-hidden relative">
                <div className="relative z-10 p-6 flex items-center justify-center h-full min-h-[200px]">
                  <div className="flex flex-col items-center text-white">
                    <span className="text-6xl font-bold">100%</span>
                    <span className="text-sm font-bold tracking-widest uppercase opacity-80 mt-2">Integrity Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section className="space-y-6">
            <h3 className="text-2xl font-bold text-primary">Recent Verification Activity</h3>
            <div className="border border-outline-variant rounded-xl divide-y divide-outline-variant bg-white shadow-sm overflow-hidden">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>fact_check</span>
                  <div>
                    <p className="font-bold text-on-surface text-sm font-mono">VK-9912-PX... verified</p>
                    <p className="text-xs text-on-surface-variant">Block height: 844,212</p>
                  </div>
                </div>
                <span className="text-xs text-on-surface-variant font-medium">2 mins ago</span>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>fact_check</span>
                  <div>
                    <p className="font-bold text-on-surface text-sm font-mono">VK-4410-LZ... verified</p>
                    <p className="text-xs text-on-surface-variant">Block height: 844,209</p>
                  </div>
                </div>
                <span className="text-xs text-on-surface-variant font-medium">5 mins ago</span>
              </div>
            </div>
            <button className="w-full py-4 text-secondary font-bold border border-secondary rounded-lg hover:bg-secondary/10 transition-colors tracking-widest uppercase text-sm">
              DOWNLOAD FULL AUDIT LOG
            </button>
          </section>
        </div>
      </main>
    </div>
  );
};
