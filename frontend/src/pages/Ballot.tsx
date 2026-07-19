import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Ballot: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [election, setElection] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchElection = async () => {
      try {
        const token = await user?.getIdToken();
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/elections/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        
        if (data.hasVoted) {
          navigate('/dashboard'); // Optionally navigate to already-voted page
          return;
        }
        
        setElection(data.election);
      } catch (error) {
        console.error('Failed to fetch election', error);
      } finally {
        setLoading(false);
      }
    };
    if (user) {
      fetchElection();
    }
  }, [id, user, navigate]);

  const handleContinue = () => {
    if (selectedCandidate) {
      navigate(`/voter/review/${id}`, { state: { candidate: selectedCandidate, election } });
    }
  };

  const handleCancel = () => {
    navigate(`/voter/elections/${id}`);
  };

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col">
      {/* TopNavBar */}
      <header className="w-full top-0 bg-surface border-b border-outline-variant z-50">
        <div className="flex justify-between items-center w-full px-margin-desktop py-4 max-w-container-max mx-auto">
          <div className="text-headline-md font-headline-md font-bold tracking-tight text-primary cursor-pointer" onClick={() => navigate('/')}>VOTEKINETIC</div>
          <nav className="hidden md:flex gap-gutter items-center">
            <Link to="/dashboard" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">Dashboard</Link>
            <Link to="/voter/elections" className="font-label-md text-label-md text-secondary border-b-2 border-secondary pb-1">Ballots</Link>
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Results</a>
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Resources</a>
          </nav>
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer p-2 hover:bg-surface-container-low rounded-lg transition-all">notifications</span>
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer p-2 hover:bg-surface-container-low rounded-lg transition-all">account_circle</span>
          </div>
        </div>
      </header>

      {/* Main Canvas */}
      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-desktop py-stack-lg">
        {/* Progress Indicator */}
        <div className="mb-stack-lg">
          <div className="flex justify-between items-end mb-2">
            <div>
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Step 1 of 3</span>
              <h1 className="font-headline-md text-headline-md text-primary mt-1">Candidate Selection</h1>
            </div>
            <span className="font-label-md text-label-md text-on-surface-variant">33% Complete</span>
          </div>
          <div className="w-full bg-surface-container h-1 rounded-full overflow-hidden">
            <div className="bg-secondary h-full w-1/3 transition-all duration-500"></div>
          </div>
        </div>

        {/* Ballot Content Section */}
        <div className="bg-surface-container-lowest border border-outline-variant p-stack-lg rounded-lg shadow-sm">
          {loading ? (
            <div className="flex justify-center p-8"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div></div>
          ) : !election ? (
            <div className="text-center p-8 text-error">Failed to load election details.</div>
          ) : (
            <>
              <div className="mb-stack-md border-b border-outline-variant pb-stack-md">
                <h2 className="font-headline-md text-headline-md text-on-surface">{election.title}</h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2">{election.description || 'Please select one candidate. Choices are final once submitted through the encryption protocol.'}</p>
              </div>

          {/* Candidate Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter py-stack-md">
            {election.candidates?.map((candidate: any) => (
              <label key={candidate.id} className="relative cursor-pointer group">
                <input 
                  type="radio" 
                  name="candidate" 
                  value={candidate.id} 
                  className="peer hidden" 
                  checked={selectedCandidate?.id === candidate.id}
                  onChange={() => setSelectedCandidate(candidate)}
                />
                <div className={`flex items-center gap-stack-md p-stack-md border rounded-lg transition-all hover:border-secondary ${selectedCandidate?.id === candidate.id ? 'border-secondary bg-[#EBF2FA]' : 'border-outline-variant'}`}>
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border border-outline-variant bg-surface-container-high flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-on-surface-variant">person</span>
                  </div>
                  <div className="flex-grow">
                    <div className="font-label-md text-label-md text-on-surface">{candidate.name}</div>
                    <div className="font-label-sm text-label-sm text-on-surface-variant">{candidate.bio || 'Independent'}</div>
                  </div>
                  <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center transition-colors ${selectedCandidate?.id === candidate.id ? 'border-secondary' : 'border-outline-variant group-hover:border-secondary'}`}>
                    <div className={`w-3 h-3 bg-secondary rounded-full transition-transform ${selectedCandidate?.id === candidate.id ? 'scale-100' : 'scale-0'}`}></div>
                  </div>
                </div>
              </label>
            ))}
          </div>
          </>
          )}

          {/* Footer Action Bar */}
          <div className="mt-stack-lg pt-stack-lg border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-gutter">
            <button 
              className="w-full md:w-auto px-6 py-3 font-label-md text-label-md text-error border border-error rounded-lg hover:bg-error-container transition-colors flex items-center justify-center gap-2"
              onClick={handleCancel}
            >
              <span className="material-symbols-outlined">cancel</span>
              Cancel Ballot
            </button>
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <button 
                className="w-full md:w-auto px-10 py-3 font-label-md text-label-md bg-primary text-on-primary rounded-lg shadow-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed" 
                disabled={!selectedCandidate} 
                onClick={handleContinue}
              >
                Continue to Review
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        {/* Security Disclaimer */}
        <div className="mt-stack-lg flex items-start gap-3 bg-surface-container-low p-4 rounded-lg border border-outline-variant/30">
          <span className="material-symbols-outlined text-secondary">lock_person</span>
          <div>
            <p className="font-label-sm text-label-sm text-on-surface-variant leading-relaxed">
              <strong>Secure Transmission:</strong> Your selection is protected by 4096-bit AES encryption. This session is being recorded for audit logs and is tied to your cryptographic signature. Do not share your screen while voting.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bottom-0 border-t border-outline-variant bg-surface-container-low mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-margin-desktop py-stack-lg max-w-container-max mx-auto gap-gutter">
          <div className="text-center md:text-left">
            <div className="font-label-md text-label-md font-bold text-on-surface mb-1">VOTEKINETIC</div>
            <p className="font-label-sm text-label-sm text-on-surface-variant">© 2024 VOTEKINETIC Institutional Voting Protocol v2.4.1. Secure Encrypted Transmission Guaranteed.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary transition-all" href="#">Security Disclosure</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary transition-all" href="#">Privacy Policy</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary transition-all" href="#">Audit Logs</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary transition-all" href="#">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
