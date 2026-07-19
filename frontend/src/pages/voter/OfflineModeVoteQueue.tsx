import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const OfflineModeVoteQueue = () => {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(false);

  const queuedVotes = [
    {
      id: '1',
      title: '2024 General Municipal Election',
      subtitle: 'District 14 - City Council Seat',
      time: '14:22 PM',
      icon: 'ballot'
    },
    {
      id: '2',
      title: 'Regional Transportation Prop B',
      subtitle: 'State Infrastructure Bond',
      time: '14:45 PM',
      icon: 'how_to_vote'
    },
    {
      id: '3',
      title: 'Education Board Trustee Selection',
      subtitle: 'Ward 3 Candidates',
      time: '15:02 PM',
      icon: 'description'
    }
  ];

  const handleCheckConnection = () => {
    setIsChecking(true);
    setTimeout(() => {
      setIsChecking(false);
      alert('Connection status: Still Offline. Reconnecting in the background.');
    }, 1200);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20">
      <header className="bg-surface border-b border-outline-variant sticky top-0 z-50">
        <div className="max-w-[800px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(-1)}>
            <span className="material-symbols-outlined text-on-surface-variant">arrow_back</span>
            <span className="font-label-md text-on-surface font-bold">Back</span>
          </div>
          <span className="material-symbols-outlined text-error" title="Offline Mode Active">cloud_off</span>
        </div>
      </header>

      <main className="max-w-[800px] mx-auto w-full px-4 py-8 flex-grow">
        <section className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-surface-container-high mb-6 shadow-inner animate-pulse">
            <span className="material-symbols-outlined text-primary text-[40px]">signal_wifi_off</span>
          </div>
          <h2 className="font-headline-lg text-3xl font-bold text-on-surface mb-2">Connectivity Paused</h2>
          <p className="text-on-surface-variant max-w-md mx-auto leading-relaxed">
            VOTEKINETIC is currently operating in its secure local sandbox. Your voting integrity is maintained through localized hardware encryption.
          </p>
        </section>

        <section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-outline-variant bg-surface-container-low flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-on-surface-variant">list_alt</span>
              <h3 className="font-headline-md text-lg font-bold">Queued Votes</h3>
            </div>
            <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-xs font-bold">
              {queuedVotes.length} Pending
            </span>
          </div>

          <div className="divide-y divide-outline-variant">
            {queuedVotes.map((vote) => (
              <div key={vote.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-surface-container-low transition-colors group gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-surface flex items-center justify-center rounded-lg border border-outline-variant flex-none">
                    <span className="material-symbols-outlined text-primary">{vote.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface">{vote.title}</h4>
                    <p className="text-sm text-on-surface-variant">{vote.subtitle}</p>
                  </div>
                </div>
                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1 w-full sm:w-auto">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#f0fdf4] border border-[#bbf7d0] rounded-full">
                    <span className="material-symbols-outlined text-[#15803d] text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                    <span className="text-xs text-[#15803d] font-bold">Encrypted & Localized</span>
                  </div>
                  <span className="text-xs text-on-surface-variant font-medium">Voted {vote.time}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-surface-container-high/30 flex items-start gap-3">
            <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">info</span>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              All queued votes are stored in an AES-256 encrypted local vault tied to your device's Secure Enclave. Syncing will resume as soon as a stable connection is established. Do not clear your browser cache or logout while votes are pending.
            </p>
          </div>
        </section>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button 
            onClick={handleCheckConnection}
            disabled={isChecking}
            className="flex items-center justify-center gap-2 h-12 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 active:scale-95 transition-all shadow-sm disabled:opacity-70"
          >
            <span className={`material-symbols-outlined ${isChecking ? 'animate-spin' : ''}`}>refresh</span>
            {isChecking ? 'Checking...' : 'Check Connection'}
          </button>
          <button className="flex items-center justify-center gap-2 h-12 border border-primary text-primary rounded-lg font-bold hover:bg-primary-container/10 active:scale-95 transition-all">
            <span className="material-symbols-outlined">save</span>
            Export Offline Receipt
          </button>
        </div>
      </main>
    </div>
  );
};
