import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { adminApi } from '../../api/client';

export const BlockVoterConfirmation = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBlock = async () => {
    if (!user || !id) return;
    setLoading(true);
    try {
      await adminApi.blockVoter(user, id, reason || 'No reason provided');
      alert('Voter access revoked successfully.');
      navigate(-1);
    } catch (err: any) {
      alert(err.message || 'Failed to block voter');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface-container-lowest pb-20 md:pb-0 font-sans">
      <header className="fixed top-0 w-full z-40 bg-surface border-b border-outline-variant h-16">
        <div className="flex items-center justify-between px-4 md:px-8 h-full max-w-[1440px] mx-auto">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-surface-container transition-colors -ml-2">
              <span className="material-symbols-outlined text-on-surface">arrow_back</span>
            </button>
            <span className="material-symbols-outlined text-primary text-[28px]" style={{ fontVariationSettings: "'FILL' 0" }}>shield</span>
            <h1 className="font-headline-md text-primary font-bold tracking-tight">Voter Management</h1>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-24 px-4 md:px-8 flex justify-center w-full max-w-[1440px] mx-auto">
        <div className="w-full max-w-[600px] mt-8 md:mt-16">
          <div className="bg-white border-2 border-error/20 rounded-2xl p-6 md:p-10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-2 bg-error"></div>
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-error/10 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-error text-[40px]">person_off</span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-on-surface tracking-tight mb-4">Revoke Voter Access</h2>
              <p className="text-on-surface-variant font-medium text-sm md:text-base leading-relaxed mb-8 max-w-md">
                You are about to cryptographically invalidate this voter's cryptographic key. They will be immediately disconnected and prevented from casting any future ballots.
              </p>

              <div className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl p-4 mb-8 text-left">
                <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-4">Voter Profile (ID: {id})</h3>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-on-surface-variant">person</span>
                  </div>
                  <div>
                    <div className="font-bold text-on-surface text-base">Unknown Voter (Fetch not impl)</div>
                    <div className="text-sm text-error font-medium mt-0.5">Status: Active</div>
                  </div>
                </div>
              </div>

              <div className="w-full space-y-2 mb-8">
                <label className="font-bold text-sm text-on-surface text-left block" htmlFor="reason">
                  Reason for Revocation <span className="text-error">*</span>
                </label>
                <div className="relative group text-left">
                  <span className="material-symbols-outlined absolute left-4 top-4 text-outline-variant group-focus-within:text-error transition-colors">edit_note</span>
                  <textarea 
                    id="reason" 
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full h-24 pl-12 pr-4 py-3 bg-surface border border-outline-variant rounded-lg focus:ring-1 focus:ring-error focus:border-error transition-all outline-none font-medium resize-none" 
                    placeholder="Provide a mandatory reason for the audit ledger..."
                    required
                  ></textarea>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <button 
                  className="flex-1 py-4 font-bold rounded-xl border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition-colors"
                  onClick={() => navigate(-1)}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button 
                  className="flex-1 py-4 font-bold rounded-xl bg-error text-white shadow-md hover:bg-[#b3261e] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  onClick={() => setIsModalOpen(true)}
                  disabled={!reason.trim() || loading}
                >
                  <span className="material-symbols-outlined text-[20px]">gavel</span>
                  Revoke Access
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-[fade-in_0.2s_ease-out]">
          <div className="bg-white rounded-2xl w-full max-w-[400px] shadow-2xl overflow-hidden animate-[scale-in_0.2s_ease-out]">
            <div className="p-6 md:p-8">
              <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-error">warning</span>
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-2 tracking-tight">Confirm Revocation</h3>
              <p className="text-sm font-medium text-on-surface-variant mb-6 leading-relaxed">
                This action is permanent. The cryptographic key will be destroyed and this event will be permanently recorded in the immutable audit ledger.
              </p>
              <div className="flex flex-col gap-3">
                <button 
                  className="w-full py-3.5 font-bold rounded-xl bg-error text-white hover:bg-[#b3261e] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  onClick={() => { setIsModalOpen(false); handleBlock(); }}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="material-symbols-outlined animate-spin">sync</span>
                  ) : (
                    <span className="material-symbols-outlined text-[20px]">lock</span>
                  )}
                  {loading ? 'Revoking...' : 'Yes, Revoke Key'}
                </button>
                <button 
                  className="w-full py-3.5 font-bold rounded-xl border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition-colors"
                  onClick={() => setIsModalOpen(false)}
                  disabled={loading}
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};