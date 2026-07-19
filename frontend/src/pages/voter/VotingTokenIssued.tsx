import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { voteApi } from '../../api/client';

export const VotingTokenIssued = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tokenInfo, setTokenInfo] = useState<{ token: string; expiresAt: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && id) {
      voteApi.requestToken(user, id)
        .then(res => {
          setTokenInfo(res);
          sessionStorage.setItem(`voting_token_${id}`, res.token);
        })
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [user, id]);

  if (loading) return <div className="p-10 text-center">Generating secure token...</div>;
  if (!tokenInfo) return <div className="p-10 text-center text-red-500">Failed to generate token</div>;

  return (
    <div className="bg-[#f9f9fc] text-[#1a1c1e] min-h-screen flex flex-col font-sans">
      
      {/* TopAppBar */}
      <header className="w-full top-0 sticky bg-white border-b border-outline-variant z-50 shadow-sm">
        <div className="flex justify-between items-center px-4 md:px-10 py-4 max-w-[800px] mx-auto">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-primary uppercase">VOTEKINETIC</h1>
          </div>
          <button className="material-symbols-outlined text-on-surface-variant hover:bg-[#f0f0f3] transition-colors p-2 rounded-full text-[28px]">
            account_circle
          </button>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow flex flex-col items-center px-4 py-8 max-w-[800px] mx-auto w-full">
        
        {/* Status Indicator */}
        <div className="w-full flex items-center justify-center gap-2 mb-8 animate-[fade-in_0.5s_ease-out]">
          <div className="h-2 w-16 bg-primary rounded-full"></div>
          <div className="h-2 w-16 bg-primary rounded-full"></div>
          <div className="h-2 w-16 bg-[#e2e2e5] rounded-full"></div>
        </div>

        <section className="w-full text-center space-y-4 mb-10 animate-[fade-in_0.7s_ease-out]">
          <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">Voting Token Issued</h2>
          <p className="text-base md:text-lg font-medium text-on-surface-variant max-w-[500px] mx-auto leading-relaxed">
            Your cryptographic credential has been successfully generated. This session is now encrypted and secured.
          </p>
        </section>

        {/* Cryptographic Token Card (Asymmetric / Bento Style) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 animate-[slide-up_0.8s_ease-out]">
          
          {/* Main Token Card */}
          <div className="md:col-span-2 bg-primary text-white rounded-2xl p-8 relative overflow-hidden shadow-lg token-pulse group transition-transform hover:scale-[1.02]">
            <div className="absolute top-0 right-0 p-4">
              <span className="material-symbols-outlined text-white text-[80px] opacity-10" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
            </div>
            
            <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-4">
                <div className="bg-[#1e40af] p-3 rounded-xl shadow-inner">
                  <span className="material-symbols-outlined text-white text-[24px]">fingerprint</span>
                </div>
                <span className="text-xs font-bold text-[#bfdbfe] uppercase tracking-widest">Active Session Token</span>
              </div>
              
              <div className="space-y-2">
                <p className="text-xs font-bold text-[#bfdbfe] uppercase tracking-widest">Credential Hash</p>
                <div className="text-3xl md:text-4xl font-mono font-bold tracking-tighter shimmer bg-clip-text text-transparent bg-gradient-to-r from-white via-[#bfdbfe] to-white group-hover:tracking-normal transition-all duration-300">
                  0x8a7f...4b2e
                </div>
              </div>
              
              <div className="flex justify-between items-end border-t border-white/20 pt-6">
                <div className="space-y-1.5">
                  <p className="text-xs font-bold text-[#bfdbfe] uppercase tracking-widest">Status</p>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-[#4ade80] rounded-full animate-ping"></div>
                    <span className="text-sm font-bold text-white uppercase tracking-widest">Verified & Ready</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-white/50 text-[24px]">lock</span>
              </div>
            </div>
          </div>

          {/* Security Context Panel */}
          <div className="bg-[#f0f0f3] border border-outline-variant rounded-2xl p-6 flex flex-col justify-center space-y-6 shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-secondary">
                <span className="material-symbols-outlined text-[20px]">visibility_off</span>
                <h3 className="text-sm font-bold tracking-wide">Anonymity Guaranteed</h3>
              </div>
              <p className="text-xs font-medium text-on-surface-variant leading-relaxed">Your identity is decoupled from this token before it reaches the ballot box.</p>
            </div>
            <div className="w-full h-px bg-outline-variant/50"></div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-secondary">
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                <h3 className="text-sm font-bold tracking-wide">One Vote Only</h3>
              </div>
              <p className="text-xs font-medium text-on-surface-variant leading-relaxed">The system ensures this unique identifier can only be cast a single time.</p>
            </div>
          </div>

        </div>

        {/* Progress/Action Section */}
        <div className="w-full bg-white border border-outline-variant rounded-2xl p-8 shadow-sm flex flex-col items-center space-y-8 animate-[fade-in_1s_ease-out]">
          <div className="w-full space-y-2">
            <div className="flex justify-between text-xs font-bold text-on-surface-variant px-1 uppercase tracking-widest">
              <span>Synchronizing Ledger</span>
              <span>100%</span>
            </div>
            <div className="h-2 w-full bg-[#f0f0f3] rounded-full overflow-hidden">
              <div className="h-full bg-secondary w-full transition-all duration-1000 ease-out"></div>
            </div>
          </div>
          
          <button 
            onClick={() => navigate('/voter/vote-confirmation')}
            className="w-full md:w-auto md:px-16 h-14 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 active:scale-[0.98] shadow-sm"
          >
            Start Ballot
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
          
          <p className="text-xs font-medium text-on-surface-variant text-center max-w-[400px]">
            By proceeding, you acknowledge that your choice is final once submitted.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center border-t border-outline-variant bg-white z-10">
        <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Institution-Grade Security Protocol v4.2</p>
      </footer>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .token-pulse {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
          50% { transform: scale(0.995); box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
        }
        .shimmer {
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }
        @keyframes shimmer {
          to { background-position: 200% center; }
        }
      `}} />
    </div>
  );
};
