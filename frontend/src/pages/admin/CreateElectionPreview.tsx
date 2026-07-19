import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const CreateElectionPreview = () => {
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleLaunch = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmLaunch = () => {
    setShowConfirmModal(false);
    alert('Election Launched Successfully!');
    navigate('/admin');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-32">
      <header className="bg-surface border-b border-outline-variant sticky top-0 z-40">
        <div className="max-w-[1440px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/admin')}>
            <span className="material-symbols-outlined text-primary">arrow_back</span>
            <span className="font-headline-md text-primary font-bold tracking-tight hidden md:block">VOTEKINETIC Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-on-surface-variant uppercase tracking-widest hidden md:block">Admin Portal</span>
            <div className="w-8 h-8 rounded-full bg-surface-container-high border border-outline-variant flex items-center justify-center">
              <span className="material-symbols-outlined text-sm">person</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1000px] mx-auto w-full px-4 md:px-8 py-8 flex-grow">
        
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-end mb-3">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-1">Preview & Launch</h1>
              <p className="text-sm text-on-surface-variant font-medium">Step 6 of 6: Final Review</p>
            </div>
            <span className="text-sm font-bold text-secondary">100% Complete</span>
          </div>
          <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
            <div className="h-full bg-[#16a34a] w-full transition-all duration-500 ease-out"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Identity Section */}
          <section className="bg-surface border border-outline-variant p-6 rounded-xl flex flex-col gap-4 shadow-sm hover:-translate-y-0.5 transition-transform">
            <div className="flex items-center justify-between border-b border-outline-variant pb-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-2xl">description</span>
                <h2 className="text-xl font-bold text-primary">Identity</h2>
              </div>
              <button className="text-secondary font-bold text-sm hover:underline">Edit</button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block mb-1">Title</label>
                <p className="text-sm font-bold text-on-surface">2024 National Assembly Election</p>
              </div>
              <div>
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block mb-1">Description</label>
                <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-3">
                  This election will determine the representatives for the upcoming legislative term. Please review all candidates carefully before submitting your immutable ballot.
                </p>
              </div>
            </div>
          </section>

          {/* Schedule Section */}
          <section className="bg-surface border border-outline-variant p-6 rounded-xl flex flex-col gap-4 shadow-sm hover:-translate-y-0.5 transition-transform">
            <div className="flex items-center justify-between border-b border-outline-variant pb-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-2xl">event</span>
                <h2 className="text-xl font-bold text-primary">Schedule</h2>
              </div>
              <button className="text-secondary font-bold text-sm hover:underline">Edit</button>
            </div>
            
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">play_circle</span>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block mb-0.5">Starts On</label>
                  <p className="text-sm font-bold text-on-surface">October 15, 2024 - 08:00 AM</p>
                  <p className="text-xs text-on-surface-variant mt-0.5">UTC (Universal Coordinated Time)</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">stop_circle</span>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block mb-0.5">Ends On</label>
                  <p className="text-sm font-bold text-on-surface">October 17, 2024 - 06:00 PM</p>
                  <p className="text-xs text-on-surface-variant mt-0.5">Total Duration: 58 Hours</p>
                </div>
              </div>
            </div>
          </section>

          {/* Rules Section */}
          <section className="bg-surface border border-outline-variant p-6 rounded-xl md:col-span-2 shadow-sm hover:-translate-y-0.5 transition-transform">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-2xl">gavel</span>
                <h2 className="text-xl font-bold text-primary">Voting Rules</h2>
              </div>
              <button className="text-secondary font-bold text-sm hover:underline">Edit</button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="border-l-2 border-primary pl-4">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block mb-1">Type</label>
                <p className="text-sm font-bold text-on-surface mb-0.5">Ranked Choice</p>
                <p className="text-xs text-on-surface-variant">Single Transferable Vote</p>
              </div>
              <div className="border-l-2 border-outline-variant pl-4">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block mb-1">Anonymity</label>
                <p className="text-sm font-bold text-on-surface mb-0.5">Full Blind</p>
                <p className="text-xs text-on-surface-variant">Identity detached from ballot</p>
              </div>
              <div className="border-l-2 border-outline-variant pl-4">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block mb-1">Voters</label>
                <p className="text-sm font-bold text-on-surface mb-0.5">12,450 Eligible</p>
                <p className="text-xs text-on-surface-variant">Verified Municipal Database</p>
              </div>
            </div>
          </section>

          {/* Security Section */}
          <section className="bg-primary text-white p-6 rounded-xl md:col-span-2 shadow-lg relative overflow-hidden">
            <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
              <span className="material-symbols-outlined" style={{ fontSize: '240px' }}>verified_user</span>
            </div>
            
            <div className="flex items-center justify-between relative z-10 mb-8 border-b border-white/20 pb-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#bfdbfe] text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                <h2 className="text-xl font-bold text-white">Security Protocols</h2>
              </div>
              <button className="text-[#bfdbfe] font-bold text-sm hover:text-white transition-colors">Verify Certificates</button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative z-10">
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-[#bfdbfe] text-3xl">shield_lock</span>
                <div>
                  <p className="font-bold text-sm text-white mb-2">End-to-End Verifiable</p>
                  <p className="text-xs text-white/80 leading-relaxed">Each voter receives a tracking ID to verify their vote was recorded accurately without revealing their choice.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-[#bfdbfe] text-3xl">key</span>
                <div>
                  <p className="font-bold text-sm text-white mb-2">Threshold Encryption</p>
                  <p className="text-xs text-white/80 leading-relaxed">The results are encrypted and can only be decrypted when 3 of 5 trustees provide their digital keys.</p>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Final Check Warning */}
        <div className="mt-8 flex items-start sm:items-center gap-4 p-4 bg-[#fef2f2] rounded-xl border border-[#fecaca] shadow-sm">
          <span className="material-symbols-outlined text-[#ef4444] text-2xl shrink-0 mt-0.5 sm:mt-0" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
          <p className="text-sm font-medium text-[#b91c1c] leading-relaxed">
            By clicking "Launch Election", you certify that the parameters above are correct. Invitations will be sent to 12,450 verified voters automatically.
          </p>
        </div>

      </main>

      {/* Navigation Buttons / Sticky Footer */}
      <footer className="fixed bottom-0 left-0 w-full bg-surface border-t border-outline-variant py-4 md:py-6 z-50">
        <div className="max-w-[1000px] mx-auto px-4 md:px-8 flex justify-between items-center">
          <button 
            className="flex items-center justify-center gap-2 px-6 h-12 border border-outline-variant text-on-surface font-bold rounded-lg hover:bg-surface-container-low transition-colors active:scale-95"
            onClick={() => navigate(-1)}
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            Back
          </button>
          <div className="flex gap-3">
            <button className="hidden sm:flex items-center justify-center gap-2 px-6 h-12 bg-surface-container-low text-primary font-bold rounded-lg hover:bg-surface-container-high transition-colors active:scale-95 border border-outline-variant">
              <span className="material-symbols-outlined text-[20px]">drafts</span>
              Save Draft
            </button>
            <button 
              className="flex items-center justify-center gap-2 px-6 md:px-8 h-12 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-all shadow-sm active:scale-95"
              onClick={handleLaunch}
            >
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
              Launch Election
            </button>
          </div>
        </div>
      </footer>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-surface/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0" onClick={() => setShowConfirmModal(false)}></div>
          <div className="bg-surface rounded-xl max-w-md w-full p-8 text-center shadow-2xl border border-outline-variant relative z-10 animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
            </div>
            <h3 className="text-2xl font-bold text-primary mb-3">Confirm Secure Launch</h3>
            <p className="text-sm text-on-surface-variant mb-8 leading-relaxed">
              This action will finalize the election and encrypt the ballot configuration. Are you sure you wish to initiate the voting period?
            </p>
            <div className="flex flex-col gap-3">
              <button 
                className="w-full h-12 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-sm active:scale-95"
                onClick={handleConfirmLaunch}
              >
                Yes, Launch Electronically
              </button>
              <button 
                className="w-full h-12 text-on-surface-variant font-bold hover:bg-surface-container-low rounded-lg transition-colors"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel and Review
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
