import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { electionApi, voteApi, ElectionDetail } from '../../api/client';

export const BallotScreen = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [election, setElection] = useState<ElectionDetail | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  if (loading) return <div className="p-10 text-center">Loading ballot...</div>;

  useEffect(() => {
    if (user && id) {
      electionApi.getById(user, id)
        .then(res => setElection(res.election))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [user, id]);

  const candidates = election?.candidates || [];

  const handleInfoClick = (e: React.MouseEvent, name: string) => {
    e.preventDefault();
    e.stopPropagation();
    alert(`Detailed candidate manifesto and history for ${name} would appear in a modal here.`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface-container-lowest pb-20 md:pb-0">
      
      {/* Top App Bar */}
      <header className="bg-surface border-b border-outline-variant sticky top-0 z-40 px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-primary text-[28px]" style={{ fontVariationSettings: "'FILL' 0" }}>shield</span>
          <h1 className="font-headline-md text-primary font-bold tracking-tight">Official Ballot</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-surface-variant overflow-hidden border border-outline-variant shrink-0">
            <span className="material-symbols-outlined text-on-surface-variant w-full h-full flex items-center justify-center">person</span>
          </div>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="w-full bg-surface-container-lowest border-b border-outline-variant sticky top-16 z-30">
        <div className="max-w-[800px] mx-auto px-4 py-3 flex items-center justify-between">
          <span className="text-xs font-bold text-primary uppercase tracking-widest">Step 1 of 3</span>
          <div className="flex gap-2">
            <div className="w-8 h-2 bg-primary rounded-full"></div>
            <div className="w-8 h-2 bg-surface-container rounded-full"></div>
            <div className="w-8 h-2 bg-surface-container rounded-full"></div>
          </div>
        </div>
      </div>

      <main className="flex-grow flex flex-col items-center p-4 md:py-8 w-full max-w-[800px] mx-auto">
        
        {/* Election Context */}
        <section className="w-full text-center mb-8">
          <h2 className="text-2xl font-bold text-on-surface mb-2">Presidential General Election</h2>
          <p className="text-sm font-medium text-on-surface-variant">Select ONE (1) candidate for the office of President.</p>
        </section>

        {/* Candidate List */}
        <div className="w-full space-y-4">
          {candidates.map((candidate: any) => {
            const isSelected = selectedCandidate === candidate.id;
            return (
              <label 
                key={candidate.id}
                className={`group relative flex items-center p-4 bg-surface border rounded-lg cursor-pointer transition-all duration-200 shadow-sm ${isSelected ? 'border-primary bg-primary/5' : 'border-outline-variant hover:border-secondary'}`}
              >
                <input 
                  type="radio" 
                  name="candidate" 
                  className="hidden peer"
                  checked={isSelected}
                  onChange={() => setSelectedCandidate(candidate.id)}
                />
                
                <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border border-outline-variant mr-4">
                  <img src={candidate.imageUrl} alt={candidate.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-on-surface">{candidate.name}</h3>
                  <p className="text-sm font-medium text-secondary">{(candidate as any).party || 'Independent'}</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <button 
                    type="button"
                    className="p-2 text-outline-variant hover:text-primary transition-colors focus:outline-none"
                    onClick={(e) => handleInfoClick(e, candidate.name)}
                    title="Candidate Information"
                  >
                    <span className="material-symbols-outlined text-[24px]">info</span>
                  </button>
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'bg-primary border-primary' : 'border-outline-variant'}`}>
                    {isSelected && (
                      <span className="material-symbols-outlined text-white text-[20px]" style={{ fontVariationSettings: "'wght' 700" }}>check</span>
                    )}
                  </div>
                </div>
                
                {isSelected && (
                  <div className="absolute inset-0 border-2 border-primary rounded-lg pointer-events-none"></div>
                )}
              </label>
            );
          })}
        </div>

        {/* Action Footer */}
        <div className="w-full mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-outline-variant pt-6">
          <button 
            className="w-full sm:w-auto px-8 h-12 rounded-lg border border-primary text-primary font-bold text-sm hover:bg-primary/5 transition-colors shadow-sm"
            onClick={() => navigate('/voter/dashboard')}
          >
            Cancel Ballot
          </button>
          <button 
            className={`w-full sm:w-auto px-10 h-12 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm ${selectedCandidate ? 'bg-primary text-white hover:bg-primary/90 active:scale-95' : 'bg-surface-container text-on-surface-variant cursor-not-allowed opacity-70'}`}
            disabled={!selectedCandidate || submitting}
            onClick={async () => {
              if (selectedCandidate && id) {
                setSubmitting(true);
                const token = sessionStorage.getItem(`voting_token_${id}`);
                if (!token) {
                  alert("Session expired or token missing.");
                  setSubmitting(false);
                  return;
                }
                try {
                  const payload = JSON.stringify({ selection: selectedCandidate });
                  await voteApi.submit(id, token, payload);
                  sessionStorage.removeItem(`voting_token_${id}`);
                  navigate(`/voter/vote-success/${id}`);
                } catch (err) {
                  console.error("Failed to submit vote", err);
                  alert("Failed to submit vote.");
                } finally {
                  setSubmitting(false);
                }
              }
            }}
          >
            {submitting ? 'Encrypting...' : 'Review & Cast Ballot'}
            <span className="material-symbols-outlined text-[18px]">lock</span>
          </button>
        </div>
      </main>

      {/* Bottom Nav Bar */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center bg-surface border-t border-outline-variant h-16 pb-safe z-50 md:hidden">
        <a href="#" className="flex flex-col items-center justify-center bg-secondary/10 text-secondary rounded-full px-5 py-1 w-full h-full transition-colors font-bold">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>ballot</span>
          <span className="text-[10px] font-bold mt-1">Election</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors w-full h-full">
          <span className="material-symbols-outlined">fingerprint</span>
          <span className="text-[10px] font-bold mt-1">Identity</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors w-full h-full">
          <span className="material-symbols-outlined">receipt_long</span>
          <span className="text-[10px] font-bold mt-1">History</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors w-full h-full">
          <span className="material-symbols-outlined">help_outline</span>
          <span className="text-[10px] font-bold mt-1">Support</span>
        </a>
      </nav>

    </div>
  );
};
