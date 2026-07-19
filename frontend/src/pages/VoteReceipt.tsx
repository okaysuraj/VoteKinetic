import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

export const VoteReceipt: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [toastVisible, setToastVisible] = useState(false);
  const receiptId = location.state?.receiptId || '6f29e-88b12-c9a01-44de3-f617b-88220-4e11c';
  const electionTitle = location.state?.electionTitle || 'Institutional Policy Ballot';

  const handleCopy = () => {
    navigator.clipboard.writeText(receiptId).then(() => {
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 2000);
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col selection:bg-secondary-container selection:text-on-secondary-container">
      {/* TopNavBar */}
      <header className="w-full top-0 bg-surface border-b border-outline-variant z-50 sticky no-print">
        <div className="flex justify-between items-center w-full px-margin-desktop py-4 max-w-container-max mx-auto">
          <div className="text-headline-md font-headline-md font-bold tracking-tight text-primary cursor-pointer" onClick={() => navigate('/')}>VOTEKINETIC</div>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/dashboard" className="text-on-surface-variant font-label-md text-label-md hover:text-primary transition-colors">Dashboard</Link>
            <Link to="/voter/elections" className="text-secondary border-b-2 border-secondary pb-1 font-label-md text-label-md">Ballots</Link>
            <a className="text-on-surface-variant font-label-md text-label-md hover:text-primary transition-colors" href="#">Results</a>
            <a className="text-on-surface-variant font-label-md text-label-md hover:text-primary transition-colors" href="#">Resources</a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-surface-container-low rounded-lg transition-all">
              <span className="material-symbols-outlined text-on-surface-variant">notifications</span>
            </button>
            <button className="p-2 hover:bg-surface-container-low rounded-lg transition-all">
              <span className="material-symbols-outlined text-on-surface-variant">account_circle</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg flex flex-col items-center">
        {/* Header State */}
        <div className="w-full text-center mb-stack-lg no-print">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-container rounded-full mb-4">
            <span className="material-symbols-outlined text-on-primary-container text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-primary">Vote Cast Successfully</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">Your choices have been encrypted and stored in the secure institutional ledger.</p>
        </div>

        {/* Receipt Card Container */}
        <div className="w-full max-w-[500px] bg-white border border-outline-variant rounded-lg overflow-hidden receipt-shadow shadow-[0_12px_40px_-12px_rgba(0,0,0,0.08)]">
          {/* Receipt Header Section */}
          <div className="bg-surface-container-low p-8 text-center border-b border-dashed border-outline-variant relative">
            <div className="font-label-sm text-label-sm text-secondary tracking-widest uppercase mb-2">Official Voting Record</div>
            <div className="font-headline-md text-headline-md text-primary font-bold">VOTEKINETIC PROTOCOL</div>
            <div className="mt-4 flex flex-col gap-1">
              <div className="font-body-md text-body-md font-semibold">{electionTitle}</div>
              <div className="font-label-sm text-label-sm text-on-surface-variant">Election ID: VK-{new Date().getFullYear()}-IP</div>
            </div>
            {/* Digital Seal Overlay */}
            <div className="absolute top-4 right-4 opacity-10">
              <span className="material-symbols-outlined text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
            </div>
          </div>

          {/* Receipt Details Section */}
          <div className="p-8 space-y-6">
            {/* Data Grid */}
            <div className="grid grid-cols-2 gap-y-4">
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant mb-1">Cast Date</p>
                <p className="font-body-md text-body-md font-medium">{new Date().toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="font-label-sm text-label-sm text-on-surface-variant mb-1">Time</p>
                <p className="font-body-md text-body-md font-medium">{new Date().toLocaleTimeString()}</p>
              </div>
              <div className="col-span-2">
                <p className="font-label-sm text-label-sm text-on-surface-variant mb-1">Cryptographic Receipt ID</p>
                <div 
                  className="flex items-center justify-between bg-surface-container-lowest border border-outline-variant p-3 rounded group cursor-pointer hover:border-secondary transition-colors"
                  onClick={handleCopy}
                >
                  <code className="font-mono text-sm text-primary break-all">{receiptId}</code>
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-secondary text-lg ml-2">content_copy</span>
                </div>
              </div>
            </div>

            {/* QR Verification Section */}
            <div className="pt-6 border-t border-outline-variant flex flex-col items-center">
              <div className="p-4 bg-white border-4 border-surface-container rounded-xl mb-4">
                {/* QR Code Placeholder */}
                <div className="w-32 h-32 bg-on-surface flex items-center justify-center p-2 relative overflow-hidden" style={{ backgroundImage: "radial-gradient(#1a1c1e 0.5px, transparent 0.5px)", backgroundSize: "4px 4px" }}>
                  {/* Simulated QR inner patterns */}
                  <div className="absolute top-2 left-2 w-8 h-8 border-4 border-white"></div>
                  <div className="absolute top-2 right-2 w-8 h-8 border-4 border-white"></div>
                  <div className="absolute bottom-2 left-2 w-8 h-8 border-4 border-white"></div>
                  <div className="w-full h-full bg-white opacity-5"></div>
                </div>
              </div>
              <p className="font-label-sm text-label-sm text-on-surface-variant text-center px-8">Scan to verify the integrity of this record against the public bulletin board.</p>
            </div>

            {/* Digital Signature Block */}
            <div className="pt-6 border-t border-outline-variant">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-xl">encrypted</span>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm font-bold text-primary">SHA-256 DIGITAL SIGNATURE</p>
                  <p className="font-mono text-[10px] text-on-surface-variant truncate w-64">0x7f83b2...a1f92c8d4e5f6a1b2c3d4e5f6</p>
                </div>
              </div>
            </div>
          </div>

          {/* Receipt Bottom Tear */}
          <div className="receipt-tear-bottom"></div>
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-[500px] mt-stack-lg flex flex-col gap-3 no-print">
          <button className="w-full py-4 bg-primary text-on-primary rounded-lg font-label-md text-label-md flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-sm active:scale-[0.98]">
            <span className="material-symbols-outlined">download</span>
            Download Official PDF
          </button>
          <div className="flex gap-3">
            <button className="flex-1 py-4 border border-primary text-primary rounded-lg font-label-md text-label-md flex items-center justify-center gap-2 hover:bg-surface-container-low transition-all">
              <span className="material-symbols-outlined">mail</span>
              Email Receipt
            </button>
            <button 
              className="px-6 py-4 border border-outline-variant text-on-surface-variant rounded-lg font-label-md text-label-md flex items-center justify-center gap-2 hover:bg-surface-container-low transition-all"
              onClick={handlePrint}
            >
              <span className="material-symbols-outlined">print</span>
              Print
            </button>
          </div>
          <Link to="/voter/elections" className="text-center mt-4 text-on-surface-variant hover:text-primary font-label-md text-label-md transition-colors underline underline-offset-4 decoration-outline-variant">
            Return to Dashboard
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bottom-0 bg-surface-container-lowest border-t border-outline-variant mt-auto no-print">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-margin-desktop py-stack-lg max-w-container-max mx-auto gap-gutter">
          <div className="flex flex-col items-center md:items-start">
            <div className="font-label-md text-label-md font-bold text-on-surface mb-2">VOTEKINETIC</div>
            <p className="font-label-sm text-label-sm text-on-surface-variant text-center md:text-left max-w-xs">
              © 2024 VOTEKINETIC Institutional Voting Protocol v2.4.1. Secure Encrypted Transmission Guaranteed.
            </p>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
            <a className="text-on-surface-variant font-label-sm text-label-sm hover:text-secondary transition-all" href="#">Security Disclosure</a>
            <a className="text-on-surface-variant font-label-sm text-label-sm hover:text-secondary transition-all" href="#">Privacy Policy</a>
            <a className="text-on-surface-variant font-label-sm text-label-sm hover:text-secondary transition-all" href="#">Institutional Terms</a>
            <a className="text-on-surface-variant font-label-sm text-label-sm hover:text-secondary transition-all" href="#">Audit Logs</a>
            <a className="text-on-surface-variant font-label-sm text-label-sm hover:text-secondary transition-all" href="#">Support</a>
          </div>
        </div>
      </footer>

      {/* Success Toast */}
      <div 
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 bg-on-background text-white px-6 py-3 rounded-full flex items-center gap-3 transition-all duration-300 shadow-xl z-50 ${toastVisible ? 'opacity-100 -translate-y-2' : 'opacity-0 pointer-events-none'}`}
      >
        <span className="material-symbols-outlined text-green-400">check_circle</span>
        <span className="font-label-md text-label-md">Receipt ID copied to clipboard</span>
      </div>
    </div>
  );
};
