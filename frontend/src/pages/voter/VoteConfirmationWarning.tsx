import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const VoteConfirmationWarning = () => {
  const navigate = useNavigate();
  const [pin, setPin] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [pinError, setPinError] = useState(false);

  const handleSubmit = () => {
    if (pin.length >= 4) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSuccess(true);
      }, 1500);
    } else {
      setPinError(true);
      setTimeout(() => setPinError(false), 500);
    }
  };

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setPin(value);
  };

  return (
    <div className="bg-[#f9f9fc] text-[#1a1c1e] min-h-screen flex flex-col font-sans overflow-hidden">
      
      {/* Brand Header */}
      <header className="w-full top-0 sticky z-50 bg-white border-b border-outline-variant shadow-sm transition-all">
        <div className="flex justify-between items-center px-4 md:px-10 py-4 max-w-[1200px] mx-auto">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-[28px]">verified_user</span>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-primary">VOTEKINETIC</h1>
          </div>
          <button className="p-2 rounded-full hover:bg-[#f0f0f3] transition-colors relative" onClick={() => navigate('/voter/dashboard')}>
            <span className="material-symbols-outlined text-primary text-[32px] cursor-pointer">account_circle</span>
          </button>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow flex items-center justify-center px-4 py-8 relative overflow-hidden">
        
        {/* Subtle Background Decorative Element */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80')" }}></div>
          <div className="absolute inset-0 bg-[#f9f9fc]/80 backdrop-blur-sm"></div>
        </div>

        {/* Simulated Ballot Page Underneath (Focus Prioritization) */}
        <div className="max-w-[800px] w-full blur-[3px] opacity-40 select-none z-10 pointer-events-none">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-secondary uppercase tracking-widest">Step 3 of 3</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">Review Your Selections</h2>
            <div className="h-1.5 w-full bg-[#f0f0f3] rounded-full overflow-hidden">
              <div className="h-full w-full bg-secondary"></div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-6 border border-outline-variant rounded-xl bg-white flex justify-between items-center shadow-sm">
              <div>
                <p className="text-xs font-medium text-on-surface-variant uppercase tracking-widest mb-1">Presidential Candidate</p>
                <p className="text-2xl font-bold">Julian A. Thorne</p>
              </div>
              <span className="material-symbols-outlined text-secondary text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
            <div className="p-6 border border-outline-variant rounded-xl bg-white flex justify-between items-center shadow-sm">
              <div>
                <p className="text-xs font-medium text-on-surface-variant uppercase tracking-widest mb-1">Local Proposition 14</p>
                <p className="text-2xl font-bold">Support: Yes</p>
              </div>
              <span className="material-symbols-outlined text-secondary text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
          </div>
        </div>

        {/* THE MODAL (Final Warning) */}
        {!isSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1a1c1e]/40 backdrop-blur-sm animate-[fade-in_0.3s_ease-out]">
            <div className="bg-white w-full max-w-[480px] rounded-2xl border border-outline-variant overflow-hidden flex flex-col shadow-2xl">
              
              {/* Modal Header/Identity */}
              <div className="p-8 text-center bg-[#f9f9fc] border-b border-outline-variant">
                <div className="w-20 h-20 bg-[#dbeafe] rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <span className="material-symbols-outlined text-[#1d4ed8] text-[40px]" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#1a1c1e] mb-3 tracking-tight">Cast Your Final Ballot?</h2>
                <p className="text-sm font-medium text-on-surface-variant px-2 leading-relaxed">
                  You are about to cryptographically sign and submit your vote. This action is irreversible.
                </p>
              </div>
              
              {/* PIN/Security Input Area */}
              <div className="p-8 space-y-8">
                <div className="space-y-4">
                  <label className="text-sm font-bold text-[#1a1c1e] block text-center" htmlFor="secure-pin">Enter Secure PIN or Biometric Key</label>
                  <div className="relative max-w-[300px] mx-auto">
                    <input 
                      type="password"
                      id="secure-pin"
                      maxLength={6}
                      placeholder="••••••"
                      value={pin}
                      onChange={handlePinChange}
                      className={`w-full h-14 px-4 border ${pinError ? 'border-[#dc2626] animate-[shake_0.5s]' : 'border-outline-variant'} rounded-xl bg-[#f9f9fc] focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all text-center tracking-[1em] font-bold text-2xl placeholder:tracking-normal placeholder:font-normal`}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <span className="material-symbols-outlined text-on-surface-variant text-[24px]">fingerprint</span>
                    </div>
                  </div>
                  <p className="text-xs font-medium text-on-surface-variant text-center uppercase tracking-widest">Standard 256-bit encryption active</p>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full h-14 bg-primary text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all active:scale-[0.98] shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <><span className="animate-spin material-symbols-outlined text-[20px]">sync</span> Processing Signature...</>
                    ) : (
                      <><span className="material-symbols-outlined text-[20px]">lock</span> Cast Irreversible Vote</>
                    )}
                  </button>
                  <button 
                    onClick={() => navigate(-1)}
                    disabled={isSubmitting}
                    className="w-full h-14 border border-outline-variant text-[#1a1c1e] font-bold text-sm rounded-xl hover:bg-[#f9f9fc] transition-all shadow-sm bg-white"
                  >
                    Go Back
                  </button>
                </div>
              </div>
              
              {/* Institutional Footnote */}
              <div className="px-8 py-5 bg-[#f0f0f3] flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-on-surface-variant text-[16px]">gavel</span>
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Certified Voting Protocol v4.2</span>
              </div>
              
            </div>
          </div>
        )}

      </main>

      {/* Success Feedback (Hidden by default) */}
      {isSuccess && (
        <div className="fixed inset-0 z-[200] bg-primary flex flex-col items-center justify-center text-center p-6 animate-[fade-in_0.5s_ease-out]">
          <div className="max-w-md w-full animate-[slide-up_0.5s_ease-out]">
            <span className="material-symbols-outlined text-white text-[120px] mb-8 animate-[pulse_2s_infinite]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">Vote Recorded</h1>
            <p className="text-lg font-medium text-white/90 mb-10 leading-relaxed">
              Your selection has been hashed and added to the official ledger. You may now close this window safely.
            </p>
            <div className="p-5 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm mb-10">
              <p className="text-sm text-white font-mono break-all font-bold">TXID: 8F2A-C9E4-110B-098F-VOTE-9922</p>
            </div>
            <button 
              onClick={() => navigate('/voter/dashboard')}
              className="px-8 h-12 bg-white text-primary font-bold text-sm rounded-lg shadow-sm hover:bg-[#f9f9fc] active:scale-95 transition-all w-full md:w-auto"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-5px); }
          40%, 80% { transform: translateX(5px); }
        }
      `}} />
    </div>
  );
};
