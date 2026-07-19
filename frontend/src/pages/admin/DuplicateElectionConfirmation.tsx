import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const DuplicateElectionConfirmation = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleDuplicate = () => {
    setIsProcessing(true);
    
    // Simulate server lag for trust-building
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col font-sans">
      
      {/* TopAppBar */}
      <header className="w-full top-0 sticky bg-surface border-b border-outline-variant z-40">
        <div className="flex justify-between items-center px-4 md:px-10 py-4 max-w-[1200px] mx-auto">
          <div className="flex items-center gap-2 cursor-pointer active:scale-95 transition-transform" onClick={() => navigate('/admin')}>
            <span className="material-symbols-outlined text-primary text-[28px]">how_to_vote</span>
            <span className="text-xl font-bold tracking-tight text-primary">VOTEKINETIC</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center cursor-pointer hover:bg-surface-container-highest transition-colors active:scale-95">
              <span className="material-symbols-outlined text-on-surface-variant">account_circle</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content: Duplication Screen */}
      <main className="flex-grow flex items-center justify-center px-4 py-8 relative overflow-hidden w-full">
        
        {/* Subtle Background Decoration */}
        <div className="absolute inset-0 pointer-events-none opacity-5 z-0" style={{ backgroundImage: 'radial-gradient(#115cb9 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        <div className="max-w-[500px] w-full bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm z-10 p-8 md:p-10 animate-[zoom-in_0.3s_ease-out]">
          
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#dbeafe] mb-4 border border-[#bfdbfe]">
              <span className="material-symbols-outlined text-[#1e40af] text-[32px]">content_copy</span>
            </div>
            <h1 className="text-2xl font-bold text-primary mb-2">Confirm Duplication</h1>
            <p className="text-sm font-medium text-on-surface-variant leading-relaxed">
              You are about to create a copy of the <span className="font-bold text-on-surface">"2024 National General Assembly"</span> election. This will replicate all settings, candidates, and configuration but will reset all vote counts.
            </p>
          </div>

          {/* Form Section */}
          <div className="space-y-8">
            <div className="space-y-2">
              <label 
                className={`block text-sm font-bold transition-colors ${isFocused ? 'text-primary' : 'text-on-surface-variant'}`} 
                htmlFor="election-title"
              >
                New Election Title
              </label>
              <input 
                id="election-title" 
                type="text" 
                defaultValue="Copy of 2024 National General Assembly"
                className="w-full px-4 h-12 border border-outline-variant rounded-lg focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all outline-none text-sm font-medium bg-white" 
                placeholder="Enter a title for the duplicated election" 
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
              <p className="text-[11px] text-on-surface-variant italic mt-1">
                * All existing ballots and criteria will be maintained in the duplicate.
              </p>
            </div>

            {/* Info Box */}
            <div className="flex gap-3 p-4 bg-surface-container-lowest rounded-lg border border-outline-variant items-start shadow-sm">
              <span className="material-symbols-outlined text-primary text-[20px] shrink-0">lock</span>
              <p className="text-xs font-medium text-on-surface-variant leading-relaxed">
                Security Notice: Access logs and administrative permissions will be inherited by the new election instance.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <button 
                className="h-12 border border-primary text-primary font-bold text-sm rounded-lg hover:bg-primary/5 transition-all active:scale-95 flex items-center justify-center shadow-sm"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
              <button 
                className="h-12 bg-primary text-white font-bold text-sm rounded-lg shadow-sm hover:bg-primary/90 transition-all active:scale-95 flex items-center justify-center gap-2"
                onClick={handleDuplicate}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Duplicate</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </>
                )}
              </button>
            </div>
          </div>
          
        </div>
      </main>

      {/* Success Message Overlay */}
      <div className={`fixed inset-0 bg-[#0f172a]/60 backdrop-blur-sm z-[100] flex items-center justify-center transition-opacity duration-300 ${isSuccess ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`bg-surface-container-lowest p-8 rounded-xl border border-outline-variant shadow-2xl text-center max-w-sm w-full mx-4 transform transition-transform duration-300 ${isSuccess ? 'scale-100' : 'scale-95'}`}>
          <div className="w-16 h-16 bg-[#dcfce7] text-[#166534] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#bbf7d0]">
            <span className="material-symbols-outlined text-[36px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          </div>
          <h2 className="text-2xl font-bold text-primary mb-2">Duplicate Created</h2>
          <p className="text-sm font-medium text-on-surface-variant mb-8 leading-relaxed">
            The election instance has been successfully cloned and is ready for configuration.
          </p>
          <button 
            className="w-full h-12 bg-primary text-white font-bold text-sm rounded-lg shadow-sm hover:bg-primary/90 transition-all active:scale-95"
            onClick={() => navigate('/admin/elections')}
          >
            Go to New Election
          </button>
        </div>
      </div>

      {/* Footer Meta */}
      <footer className="mt-auto py-6 text-center z-10 bg-surface border-t border-outline-variant">
        <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-70">
          © 2024 VOTEKINETIC SECURE SYSTEMS. All duplication actions are encrypted and logged.
        </p>
      </footer>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes zoom-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}} />
    </div>
  );
};
