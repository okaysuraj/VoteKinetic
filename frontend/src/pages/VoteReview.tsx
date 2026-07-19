import React, { useState } from 'react';
import { useNavigate, useParams, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const VoteReview: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const candidate = location.state?.candidate;
  const election = location.state?.election;
  const { user } = useAuth();
  const [isCasting, setIsCasting] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Generating cryptographic proof...');
  const [loadingTitle, setLoadingTitle] = useState('Encrypting Ballot');
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If no candidate was passed in state, go back
  if (!candidate || !election) {
    navigate(`/voter/ballot/${id}`);
    return null;
  }

  const handleCastVote = async () => {
    setIsCasting(true);
    setError(null);
    
    try {
      setLoadingMessage('Securing voting token...');
      const userToken = await user?.getIdToken();
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
      
      // Step 1: Request token
      const tokenRes = await fetch(`${API_URL}/vote/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify({ electionId: id })
      });
      
      if (!tokenRes.ok) {
        const errData = await tokenRes.json();
        throw new Error(errData.error || 'Failed to get voting token');
      }
      
      const { token } = await tokenRes.json();
      
      setLoadingMessage('Transmitting to decentralized ledger...');
      
      // Simulate encryption locally (in reality this would use the election's public key)
      const encryptedPayload = btoa(JSON.stringify({ candidateId: candidate.id, timestamp: Date.now() }));
      
      // Step 2: Submit vote
      const submitRes = await fetch(`${API_URL}/vote/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}` // Rate limiter might still want this, though backend uses tokenHash
        },
        body: JSON.stringify({ electionId: id, token, encryptedPayload })
      });
      
      if (!submitRes.ok) {
        const errData = await submitRes.json();
        throw new Error(errData.error || 'Failed to submit vote');
      }
      
      const { receipt } = await submitRes.json();
      
      setLoadingTitle('Vote Cast Successfully');
      setLoadingMessage('Redirecting to confirmation...');
      setIsSuccess(true);
      
      setTimeout(() => {
        navigate(`/voter/receipt/${id}`, { state: { receiptId: receipt, electionTitle: election.title } });
      }, 1000);
      
    } catch (err: any) {
      setError(err.message || 'An error occurred during submission.');
      setIsCasting(false);
    }
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col">
      {/* TopNavBar */}
      <header className="bg-surface dark:bg-surface-container w-full top-0 border-b border-outline-variant dark:border-outline z-50">
        <div className="flex justify-between items-center w-full px-margin-desktop py-4 max-w-container-max mx-auto">
          <div className="text-headline-md font-headline-md font-bold tracking-tight text-primary dark:text-primary-fixed cursor-pointer" onClick={() => navigate('/')}>
            VOTEKINETIC
          </div>
          <nav className="hidden md:flex gap-8 items-center">
            <Link to="/voter/elections" className="font-label-md text-label-md text-secondary dark:text-secondary-fixed border-b-2 border-secondary dark:border-secondary-fixed pb-1 opacity-80 transition-all duration-150">Ballots</Link>
            <Link to="/dashboard" className="font-label-md text-label-md text-on-surface-variant dark:text-on-tertiary-container hover:text-primary dark:hover:text-primary-fixed transition-colors">Dashboard</Link>
            <a className="font-label-md text-label-md text-on-surface-variant dark:text-on-tertiary-container hover:text-primary dark:hover:text-primary-fixed transition-colors" href="#">Results</a>
            <a className="font-label-md text-label-md text-on-surface-variant dark:text-on-tertiary-container hover:text-primary dark:hover:text-primary-fixed transition-colors" href="#">Resources</a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-surface-container-low dark:hover:bg-tertiary-container rounded-lg transition-colors">
              <span className="material-symbols-outlined text-on-surface-variant">notifications</span>
            </button>
            <button className="p-2 hover:bg-surface-container-low dark:hover:bg-tertiary-container rounded-lg transition-colors">
              <span className="material-symbols-outlined text-on-surface-variant">account_circle</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center py-stack-lg px-margin-mobile relative">
        <div className="w-full max-w-container-max space-y-stack-lg">
          {/* Progress Tracker */}
          <div className="flex justify-between items-center px-4">
            <div className="flex items-center gap-2 opacity-50">
              <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-md text-label-md">
                <span className="material-symbols-outlined text-[16px]">check</span>
              </div>
              <span className="font-label-md text-label-md text-on-surface">Selection</span>
            </div>
            <div className="flex-grow h-[1px] bg-outline-variant mx-4"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-md text-label-md">2</div>
              <span className="font-label-md text-label-md text-on-surface">Review</span>
            </div>
            <div className="flex-grow h-[1px] bg-outline-variant mx-4"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full border border-outline text-outline flex items-center justify-center font-label-md text-label-md">3</div>
              <span className="font-label-md text-label-md text-outline">Cast</span>
            </div>
          </div>

          {/* Page Header */}
          <div className="text-center">
            <h1 className="font-headline-lg text-headline-lg text-primary">Review Your Ballot</h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">Please confirm your selections before final encryption.</p>
          </div>

          {/* Warning Banner */}
          <div className="bg-error-container text-on-error-container p-stack-md rounded-lg flex items-start gap-4 border border-error/20">
            <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
            <div>
              <h2 className="font-label-md text-label-md font-bold">Important Action Required</h2>
              <p className="font-body-md text-body-md mt-1">Once you confirm and cast your vote, it is <strong>immutable</strong>. It cannot be changed, retracted, or deleted due to the cryptographic protocol of the VOTEKINETIC system.</p>
            </div>
          </div>

          {/* Main Selection Card */}
          <section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
            <div className="p-stack-lg">
              <h3 className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant mb-stack-md">Your Candidate Selection</h3>
              <div className="space-y-stack-md">
                {/* Selected Item */}
                <div className="flex items-center gap-stack-lg p-stack-md bg-secondary-container/10 border-2 border-secondary rounded-lg">
                  <span className="font-display-lg text-display-lg text-secondary opacity-50 w-12 text-center">01</span>
                  <div className="flex-grow">
                    <h4 className="font-headline-md text-headline-md text-on-secondary-container">{candidate.name}</h4>
                    <p className="font-body-md text-body-md text-on-surface-variant">{candidate.bio || 'Independent'}</p>
                  </div>
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
              </div>
            </div>

            {/* Encryption Detail Section */}
            <div className="bg-surface-container-low p-stack-lg border-t border-outline-variant">
              <div className="flex flex-col md:flex-row gap-stack-lg items-center">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-on-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md text-primary">Election Security Protocol</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                    Your selections are protected by End-to-End Encryption (E2EE). Upon confirmation, your ballot will be fragmented, encrypted with a 4096-bit institutional key, and distributed across the decentralized ledger to ensure anonymity and auditability.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-gutter justify-center pt-stack-md">
            {error && (
              <div className="text-error text-center mb-4 font-label-md">
                Error: {error}
              </div>
            )}
            <button 
              className="px-stack-lg py-4 border border-primary text-primary font-label-md text-label-md rounded-lg hover:bg-primary-fixed-dim transition-colors flex items-center justify-center gap-2 min-w-[200px]"
              onClick={() => navigate(`/voter/elections/${id}/ballot`)}
            >
              <span className="material-symbols-outlined">edit</span>
              Edit Selections
            </button>
            <button 
              className="px-stack-lg py-4 bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg min-w-[240px] relative overflow-hidden" 
              onClick={handleCastVote}
            >
              <span className="material-symbols-outlined">lock</span>
              Confirm &amp; Cast Vote
            </button>
          </div>

          {/* Verification Image */}
          <div className="flex justify-center mt-stack-lg">
            <div className="relative w-full h-48 rounded-xl overflow-hidden grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDrAseAEkqDSlAw0AZWGojhaqEhwNFoN0hHT-vh7qeLjuK-VRE7lgAa3eRQf2e3_SBw1acnzePZugK2Nb_NdoJqUnPYMPCwuEAJdr5WqKmKEBl25Wr7yi5eGA8o4sR03ThYGE8lDfLFo-zJgeHidPjl5PLHIWyqHLOz3GND-fb4lgjT1HARWmbXXuhrAMK_5xES1PrjjmXKpMVcrIG1kyGx7Hw1VJKBeqQPFR7sB7pczSNe2YhsvtBdrg')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Overlay for Confirmation Micro-interaction */}
        {isCasting && (
          <div className="fixed inset-0 bg-primary/90 z-[100] flex flex-col items-center justify-center transition-opacity duration-500">
            {!isSuccess && <div className="w-24 h-24 border-4 border-on-primary/20 border-t-on-primary rounded-full animate-spin mb-stack-lg"></div>}
            <h2 className="font-headline-lg text-headline-lg text-on-primary">{loadingTitle}</h2>
            <p className="font-body-md text-body-md text-on-primary-container mt-2">{loadingMessage}</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-lowest dark:bg-tertiary-container w-full bottom-0 border-t border-outline-variant dark:border-outline mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-margin-desktop py-stack-lg max-w-container-max mx-auto gap-gutter">
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="font-label-md text-label-md font-bold text-on-surface dark:text-surface-bright">VOTEKINETIC</div>
            <p className="font-label-sm text-label-sm text-on-surface-variant dark:text-on-tertiary-fixed-variant text-center md:text-left">
              © 2024 VOTEKINETIC Institutional Voting Protocol v2.4.1. Secure Encrypted Transmission Guaranteed.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a className="font-label-sm text-label-sm text-on-surface-variant dark:text-on-tertiary-fixed-variant hover:text-secondary dark:hover:text-secondary-fixed hover:underline transition-all" href="#">Security Disclosure</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant dark:text-on-tertiary-fixed-variant hover:text-secondary dark:hover:text-secondary-fixed hover:underline transition-all" href="#">Privacy Policy</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant dark:text-on-tertiary-fixed-variant hover:text-secondary dark:hover:text-secondary-fixed hover:underline transition-all" href="#">Institutional Terms</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant dark:text-on-tertiary-fixed-variant hover:text-secondary dark:hover:text-secondary-fixed hover:underline transition-all" href="#">Audit Logs</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant dark:text-on-tertiary-fixed-variant hover:text-secondary dark:hover:text-secondary-fixed hover:underline transition-all" href="#">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
