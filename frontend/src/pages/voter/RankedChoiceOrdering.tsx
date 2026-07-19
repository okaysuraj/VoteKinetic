import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { electionApi, voteApi } from '../../api/client';

export const RankedChoiceOrdering = () => {
  const navigate = useNavigate();
  const { electionId } = useParams();
  const { user } = useAuth();
  
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user && electionId) {
      electionApi.getById(user, electionId)
        .then(res => {
          setCandidates(res.election.candidates || []);
        })
        .catch(err => {
          console.error(err);
          alert('Failed to load election details');
        })
        .finally(() => setLoading(false));
    }
  }, [user, electionId]);

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newCandidates = [...candidates];
    const temp = newCandidates[index - 1];
    newCandidates[index - 1] = newCandidates[index];
    newCandidates[index] = temp;
    setCandidates(newCandidates);
  };

  const moveDown = (index: number) => {
    if (index === candidates.length - 1) return;
    const newCandidates = [...candidates];
    const temp = newCandidates[index + 1];
    newCandidates[index + 1] = newCandidates[index];
    newCandidates[index] = temp;
    setCandidates(newCandidates);
  };

  const handleSubmit = async () => {
    if (!user || !electionId) return;
    setSubmitting(true);
    try {
      const payload = {
        candidateOrder: candidates.map((c: any) => c.id)
      };
      
      const res = await voteApi.castVote(user, electionId, payload);
      navigate('/voter/vote-receipt', { state: { receiptInfo: { electionId, voteHash: res.receipt.voteHash, blockHash: res.receipt.blockHash, timestamp: res.receipt.timestamp } } });
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Failed to submit vote');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#f9f9fc] text-[#1a1c1e] min-h-screen flex items-center justify-center font-sans">
        <div className="text-xl font-medium text-on-surface-variant animate-pulse">Loading secure ballot...</div>
      </div>
    );
  }

  return (
    <div className="bg-[#f9f9fc] text-[#1a1c1e] min-h-screen flex flex-col font-sans pb-16 md:pb-0">
      <header className="w-full top-0 sticky z-50 bg-white border-b border-outline-variant shadow-sm transition-all">
        <div className="flex justify-between items-center px-4 md:px-10 py-4 max-w-[800px] mx-auto">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-[#f0f0f3] transition-colors flex items-center justify-center group" disabled={submitting}>
            <span className="material-symbols-outlined text-primary text-[24px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">list_alt</span>
            <span className="font-bold text-lg tracking-tight text-primary">Rank Candidates</span>
          </div>
          <div className="w-10"></div>
        </div>
      </header>

      <main className="flex-grow w-full max-w-[800px] mx-auto px-4 py-8">
        <div className="bg-white border border-outline-variant rounded-xl p-6 mb-8 text-center shadow-sm">
          <span className="material-symbols-outlined text-secondary text-[48px] mb-4">format_list_numbered</span>
          <h2 className="text-2xl font-bold text-primary mb-2">Drag or use arrows to rank</h2>
          <p className="text-sm font-medium text-on-surface-variant max-w-md mx-auto">
            Order the candidates from your most preferred (1) to least preferred. Your vote is fully encrypted and anonymous.
          </p>
        </div>

        <div className="space-y-3 mb-12">
          {candidates.map((candidate, index) => (
            <div 
              key={candidate.id}
              className="flex items-center bg-white border border-outline-variant rounded-xl p-4 shadow-sm transition-all hover:shadow-md hover:border-primary/30"
            >
              <div className="w-10 h-10 rounded-full bg-[#f0f0f3] text-primary font-bold text-lg flex items-center justify-center shrink-0 mr-4 border border-outline-variant">
                {index + 1}
              </div>
              
              <div className="w-12 h-12 rounded-full overflow-hidden bg-[#e0e2ec] mr-4 shrink-0 border border-outline-variant">
                {candidate.image ? (
                  <img src={candidate.image} alt={candidate.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="material-symbols-outlined w-full h-full flex items-center justify-center text-on-surface-variant">person</span>
                )}
              </div>
              
              <div className="flex-1 min-w-0 pr-4">
                <div className="font-bold text-base text-[#1a1c1e] truncate">{candidate.name}</div>
                <div className="text-xs font-medium text-on-surface-variant truncate">{candidate.party || 'Independent'}</div>
              </div>

              <div className="flex flex-col gap-1 shrink-0">
                <button 
                  onClick={() => moveUp(index)}
                  disabled={index === 0 || submitting}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-[#f0f0f3] hover:bg-[#dbeafe] text-primary disabled:opacity-30 disabled:hover:bg-[#f0f0f3] transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">keyboard_arrow_up</span>
                </button>
                <button 
                  onClick={() => moveDown(index)}
                  disabled={index === candidates.length - 1 || submitting}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-[#f0f0f3] hover:bg-[#dbeafe] text-primary disabled:opacity-30 disabled:hover:bg-[#f0f0f3] transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">keyboard_arrow_down</span>
                </button>
              </div>
            </div>
          ))}
          {candidates.length === 0 && (
            <div className="p-8 text-center text-on-surface-variant">
              No candidates found for this election.
            </div>
          )}
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-outline-variant md:relative md:bg-transparent md:border-t-0 md:p-0 md:backdrop-blur-none">
          <div className="max-w-[800px] mx-auto">
            <button 
              className="w-full py-4 rounded-full bg-primary text-white font-bold text-lg tracking-wide hover:bg-[#1d4ed8] active:bg-[#1e3a8a] transition-all shadow-md flex items-center justify-center disabled:opacity-70"
              onClick={handleSubmit}
              disabled={submitting || candidates.length === 0}
            >
              {submitting ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span className="material-symbols-outlined mr-2">how_to_vote</span>
                  Sign & Submit Ballot
                </>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};