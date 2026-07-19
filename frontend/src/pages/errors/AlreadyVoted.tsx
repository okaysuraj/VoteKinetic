import { useNavigate } from 'react-router-dom';

export const AlreadyVoted = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col">
      {/* TopNavBar */}
      <header className="w-full top-0 bg-surface border-b border-outline-variant z-50">
        <nav className="flex justify-between items-center w-full px-10 py-4 max-w-[800px] mx-auto">
          <div className="text-headline-md font-headline-md font-bold tracking-tight text-primary">
            VOTEKINETIC
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md" href="#">Dashboard</a>
            <a className="text-secondary border-b-2 border-secondary pb-1 font-label-md text-label-md" href="#">Ballots</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md" href="#">Results</a>
          </div>
        </nav>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="max-w-[800px] w-full mx-auto">
          
          {/* Success Confirmation Card */}
          <div className="border border-outline-variant bg-surface-container-lowest rounded-xl p-8 text-center max-w-[600px] mx-auto shadow-sm hover:-translate-y-0.5 transition-transform">
            
            {/* Status Icon */}
            <div className="mb-4">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary-container/10 text-secondary mb-4">
                <span className="material-symbols-outlined !text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
            </div>
            
            {/* Main Message */}
            <h1 className="font-headline-lg text-headline-lg text-primary mb-2">Participation Confirmed</h1>
            <p className="font-body-md text-body-md text-on-surface-variant mb-8">
              Your selections for the <strong>2024 Institutional Leadership General Election</strong> have been successfully recorded and encrypted. You have already cast your vote.
            </p>
            
            {/* Receipt ID Section */}
            <div className="bg-surface-container-low rounded-lg p-4 mb-8 border border-outline-variant">
              <span className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-1">Electronic Receipt ID</span>
              <div className="flex items-center justify-center gap-2">
                <code className="font-mono text-headline-md text-primary font-bold">VK-8829-001X-TRON</code>
                <button className="text-secondary hover:bg-secondary-fixed p-1 rounded transition-colors" title="Copy to Clipboard">
                  <span className="material-symbols-outlined text-body-md">content_copy</span>
                </button>
              </div>
            </div>
            
            {/* Security Badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-high border border-outline-variant">
                <span className="material-symbols-outlined text-[18px] text-on-tertiary-fixed-variant" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                <span className="font-label-sm text-label-sm text-on-tertiary-fixed-variant">Identity Locked</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-high border border-outline-variant">
                <span className="material-symbols-outlined text-[18px] text-on-tertiary-fixed-variant" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
                <span className="font-label-sm text-label-sm text-on-tertiary-fixed-variant">Encryption Active</span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button 
                onClick={() => navigate('/dashboard')}
                className="min-h-[48px] px-8 bg-primary text-on-primary font-label-md text-label-md rounded hover:bg-primary/90 transition-all shadow-sm"
              >
                Back to My Elections
              </button>
              <button className="min-h-[48px] px-8 border border-primary text-primary font-label-md text-label-md rounded hover:bg-surface-container-low transition-all">
                Verify Vote
              </button>
            </div>
            
            {/* Audit Notice */}
            <p className="mt-8 font-label-sm text-label-sm text-on-surface-variant opacity-70">
              A copy of this receipt has been sent to your registered institutional email. Audit logs will be available after the polls close on Nov 5th.
            </p>
          </div>

          {/* Contextual Information (Bento Style Sub-info) */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[800px] mx-auto">
            <div className="bg-surface-container rounded-xl p-6 border border-outline-variant/30">
              <h3 className="font-label-md text-label-md text-primary flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-body-md">info</span>
                What happens next?
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Your vote is now part of the immutable ledger. Once the counting period begins, your anonymous receipt can be used to verify inclusion without compromising your privacy.
              </p>
            </div>
            <div className="bg-surface-container rounded-xl p-6 border border-outline-variant/30">
              <h3 className="font-label-md text-label-md text-primary flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-body-md">help_outline</span>
                Need Assistance?
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                If you believe there was an error in your submission, please contact the Protocol Support desk immediately. Reference your Receipt ID for all inquiries.
              </p>
            </div>
          </div>
          
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-surface-container-lowest border-t border-outline-variant mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-10 py-8 max-w-[800px] mx-auto gap-6">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <div className="font-label-md text-label-md font-bold text-on-surface">VOTEKINETIC</div>
            <div className="font-label-sm text-label-sm text-on-surface-variant">
              © 2024 VOTEKINETIC Institutional Voting Protocol.
            </div>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary hover:underline transition-all" href="#">Security Disclosure</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary hover:underline transition-all" href="#">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
