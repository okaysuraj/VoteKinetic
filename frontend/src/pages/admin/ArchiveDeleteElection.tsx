import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ArchiveDeleteElection = () => {
  const navigate = useNavigate();
  const [showDeletePanel, setShowDeletePanel] = useState(false);
  const [deleteInput, setDeleteInput] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleArchive = () => {
    setShowToast(true);
    setTimeout(() => {
      navigate('/admin');
    }, 2000);
  };

  const handleDelete = () => {
    setShowToast(true);
    setTimeout(() => {
      navigate('/admin');
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="bg-surface border-b border-outline-variant sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(-1)}>
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

      <main className="max-w-[800px] mx-auto w-full px-4 py-8 flex-grow">
        <div className="bg-surface border border-outline-variant rounded-xl shadow-sm overflow-hidden flex flex-col">
          
          <div className="p-8 pb-6 flex flex-col items-center text-center border-b border-outline-variant">
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-error rounded-full animate-ping opacity-20"></div>
              <div className="relative w-16 h-16 rounded-full bg-error flex items-center justify-center shadow-lg">
                <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-[#b91c1c] mt-2 mb-2">Critical Action Required</h2>
            <p className="text-sm text-on-surface-variant max-w-lg leading-relaxed">
              You are about to modify the status of <strong>2024 Presidential Delegate Primaries</strong>. This action affects historical audit trails.
            </p>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Archive Option */}
            <div className={`flex flex-col border rounded-xl p-6 transition-all ${showDeletePanel ? 'opacity-50 pointer-events-none' : 'border-outline-variant hover:border-secondary cursor-pointer'}`}>
              <div className="flex items-center gap-3 mb-3">
                <span className="material-symbols-outlined text-secondary">inventory_2</span>
                <h3 className="font-bold text-on-surface text-lg">Archive Election</h3>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-6 flex-grow">
                Moves the election to the <strong>read-only</strong> historical vault. All ballots and results are preserved for audit purposes. You cannot restart the election once archived.
              </p>
              <button 
                className="w-full py-3 border border-secondary text-secondary font-bold rounded-lg hover:bg-secondary/10 transition-colors"
                onClick={handleArchive}
              >
                Archive Record
              </button>
            </div>

            {/* Delete Option */}
            <div className={`flex flex-col border rounded-xl p-6 transition-all ${showDeletePanel ? 'opacity-50 pointer-events-none' : 'border-error/30 bg-[#fef2f2] hover:border-error cursor-pointer'}`}>
              <div className="flex items-center gap-3 mb-3">
                <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>delete_forever</span>
                <h3 className="font-bold text-error text-lg">Delete Election</h3>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-6 flex-grow">
                <strong>Permanent removal.</strong> All metadata, candidate profiles, and unverified logs will be purged. This action is irreversible and violates standard audit protocols.
              </p>
              <button 
                className="w-full py-3 bg-error text-white font-bold rounded-lg hover:bg-error/90 transition-colors shadow-sm"
                onClick={() => setShowDeletePanel(true)}
              >
                Request Deletion
              </button>
            </div>

          </div>

          {/* Destructive Confirmation Panel */}
          {showDeletePanel && (
            <div className="border-t border-outline-variant p-6 bg-surface-container-low transition-all animate-in fade-in slide-in-from-top-4">
              <div className="max-w-[480px] mx-auto text-center">
                <label className="block text-sm text-on-surface-variant mb-4 font-medium" htmlFor="delete-confirm">
                  To verify you want to permanently delete this election, type <span className="text-error font-bold tracking-widest">DELETE</span> below.
                </label>
                <input 
                  className="w-full h-12 px-4 rounded-lg border border-outline-variant bg-surface text-on-surface focus:outline-none focus:border-error focus:ring-1 focus:ring-error transition-all text-center font-bold tracking-widest uppercase placeholder:font-normal placeholder:tracking-normal placeholder:text-on-surface-variant/40" 
                  id="delete-confirm" 
                  placeholder="Type DELETE here" 
                  type="text"
                  value={deleteInput}
                  onChange={(e) => setDeleteInput(e.target.value)}
                />
                <div className="flex gap-4 mt-6">
                  <button 
                    className="flex-1 py-3 border border-outline-variant text-on-surface-variant font-bold rounded-lg hover:bg-surface-container-high transition-colors"
                    onClick={() => { setShowDeletePanel(false); setDeleteInput(''); }}
                  >
                    Cancel
                  </button>
                  <button 
                    className={`flex-1 py-3 text-white font-bold rounded-lg shadow-sm transition-all ${deleteInput === 'DELETE' ? 'bg-error hover:bg-error/90' : 'bg-error/50 cursor-not-allowed'}`}
                    disabled={deleteInput !== 'DELETE'}
                    onClick={handleDelete}
                  >
                    Confirm Deletion
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="p-4 border-t border-outline-variant flex items-center justify-center gap-2 text-on-surface-variant/60 bg-surface-container-lowest">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
            <span className="text-xs font-bold uppercase tracking-wider">Security Policy: ISO-27001 Compliance Governed Action</span>
          </div>

        </div>

        <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface-container-low border border-outline-variant p-6 rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center mb-4 shadow-sm">
              <span className="material-symbols-outlined text-primary">history</span>
            </div>
            <h4 className="font-bold text-on-surface mb-2">Audit Trail</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">Archiving maintains an immutable log required for state certifications and legal compliance.</p>
          </div>
          <div className="bg-surface-container-low border border-outline-variant p-6 rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center mb-4 shadow-sm">
              <span className="material-symbols-outlined text-primary">data_usage</span>
            </div>
            <h4 className="font-bold text-on-surface mb-2">Storage Usage</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">Archived elections do not count towards your active concurrent election limits.</p>
          </div>
          <div className="bg-surface-container-low border border-outline-variant p-6 rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center mb-4 shadow-sm">
              <span className="material-symbols-outlined text-primary">lock_reset</span>
            </div>
            <h4 className="font-bold text-on-surface mb-2">Encrypted Purge</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">Deletion uses a multi-pass cryptographic overwrite to ensure data cannot be recovered.</p>
          </div>
        </section>

        {/* Toast Notification */}
        <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface px-6 py-3 rounded-full shadow-lg flex items-center gap-3 transition-all duration-300 z-50 ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
          <span className="material-symbols-outlined text-[#4ade80]">check_circle</span>
          <span className="text-sm font-bold">Action successful. Updating records...</span>
        </div>

      </main>
    </div>
  );
};
