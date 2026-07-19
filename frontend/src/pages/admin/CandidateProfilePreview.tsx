import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { electionApi } from '../../api/client';

export const CandidateProfilePreview = () => {
  const navigate = useNavigate();
  const { id, candidateId } = useParams();
  const { user } = useAuth();
  
  const [deviceView, setDeviceView] = useState<'mobile' | 'desktop'>('mobile');
  const [candidate, setCandidate] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && id && candidateId) {
      electionApi.getById(user, id)
        .then(res => {
          const found = res.election.candidates?.find((c: any) => c.id === candidateId);
          setCandidate(found || null);
        })
        .catch(err => console.error('Failed to load candidate', err))
        .finally(() => setLoading(false));
    }
  }, [user, id, candidateId]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-background items-center justify-center">
        <div className="text-xl font-medium text-on-surface-variant animate-pulse">Loading preview...</div>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="flex flex-col min-h-screen bg-background items-center justify-center">
        <div className="text-xl font-medium text-error">Candidate not found</div>
        <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-primary text-white rounded-lg">Go Back</button>
      </div>
    );
  }

  const mobileClass = deviceView === 'mobile' ? 'bg-white shadow-sm text-primary font-bold' : 'text-on-surface-variant font-medium';
  const desktopClass = deviceView === 'desktop' ? 'bg-white shadow-sm text-primary font-bold' : 'text-on-surface-variant font-medium';
  const containerClass = deviceView === 'mobile'
    ? 'w-[375px] h-[812px] bg-white border-[8px] border-[#1a1c1e] rounded-[40px] overflow-hidden shadow-2xl shrink-0'
    : 'w-full max-w-[1000px] h-full bg-white border border-outline-variant rounded-xl shadow-lg flex flex-col';

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="bg-surface border-b border-outline-variant sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(-1)}>
            <span className="material-symbols-outlined text-primary">arrow_back</span>
            <span className="font-headline-md text-primary font-bold tracking-tight hidden md:block">VOTEKINETIC Admin</span>
          </div>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto w-full px-4 md:px-8 py-8 flex-grow flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-72 flex flex-col gap-6 shrink-0">
          <div>
            <div className="flex items-center gap-2 text-primary mb-2">
              <span className="material-symbols-outlined">preview</span>
              <h1 className="font-headline-sm font-bold tracking-tight">Profile Preview</h1>
            </div>
            <p className="text-sm font-medium text-on-surface-variant">See exactly how this profile will appear to voters on different devices.</p>
          </div>

          <div className="bg-surface-container border border-outline-variant rounded-xl p-4">
            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-3">Device View</h3>
            <div className="flex bg-surface-container-high p-1 rounded-lg">
              <button 
                onClick={() => setDeviceView('mobile')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md transition-all ${mobileClass}`}
              >
                <span className="material-symbols-outlined text-sm">smartphone</span>
                <span className="text-sm">Mobile</span>
              </button>
              <button 
                onClick={() => setDeviceView('desktop')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md transition-all ${desktopClass}`}
              >
                <span className="material-symbols-outlined text-sm">desktop_windows</span>
                <span className="text-sm">Desktop</span>
              </button>
            </div>
          </div>
        </aside>

        <section className="flex-grow flex justify-center bg-surface-container-lowest border border-outline-variant rounded-xl p-4 md:p-8 overflow-hidden relative">
          <div className={`transition-all duration-500 ease-in-out relative ${containerClass}`}>
            {deviceView === 'mobile' && (
              <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-50 pointer-events-none">
                <div className="w-32 h-6 bg-[#1a1c1e] rounded-b-[16px]"></div>
              </div>
            )}

            <div className="w-full h-full overflow-y-auto">
              <div className="relative">
                <div className="w-full h-32 md:h-48 bg-[#dbeafe] relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                
                <div className="px-4 md:px-8 pb-4 relative -mt-16 flex flex-col md:flex-row gap-4 md:gap-6 items-center md:items-end">
                  <div className="w-32 h-32 rounded-full border-4 border-white bg-[#e0e2ec] overflow-hidden shadow-md shrink-0">
                    {candidate.image ? (
                      <img src={candidate.image} alt="Candidate" className="w-full h-full object-cover" />
                    ) : (
                      <span className="material-symbols-outlined w-full h-full flex items-center justify-center text-[64px] text-on-surface-variant">person</span>
                    )}
                  </div>
                  <div className="text-center md:text-left flex-grow">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#1a1c1e] tracking-tight">{candidate.name}</h2>
                    <p className="text-sm md:text-base font-bold text-primary mt-1">{candidate.party || 'Independent'}</p>
                  </div>
                </div>
              </div>

              <div className="px-4 md:px-8 py-6 space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-widest mb-3 border-b border-outline-variant pb-2">Biography</h3>
                  <p className="text-sm md:text-base leading-relaxed text-[#1a1c1e]">
                    {candidate.bio || 'No biography provided for this candidate.'}
                  </p>
                </div>
              </div>
              <div className="h-20"></div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};