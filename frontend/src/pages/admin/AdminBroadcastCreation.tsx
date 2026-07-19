import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AdminBroadcastCreation = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSend = () => {
    setShowSuccessModal(true);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setMessage('');
    navigate('/admin');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20 md:pb-0">
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

      <main className="max-w-[1000px] mx-auto w-full px-4 md:px-8 py-8 flex-grow">
        
        {/* Header */}
        <div className="mb-8 border-b border-outline-variant pb-6">
          <div className="flex items-center gap-2 text-primary mb-2">
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>campaign</span>
            <span className="font-bold text-xs uppercase tracking-wider">Communication Center</span>
          </div>
          <h1 className="text-3xl font-bold text-on-surface tracking-tight mb-2">Create Broadcast</h1>
          <p className="text-on-surface-variant max-w-2xl text-sm leading-relaxed">
            Dispatch urgent, cryptographically signed messages directly to voter devices. Used for logistical updates and critical alerts.
          </p>
        </div>

        {/* Configuration Panel */}
        <div className="flex flex-col gap-6 mb-8">
          
          <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-sm text-on-surface-variant uppercase tracking-wider mb-4">Metadata</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-2">
                <label className="font-bold text-sm text-on-surface flex items-center gap-2" htmlFor="audience">
                  Target Audience
                </label>
                <div className="relative group">
                  <select className="w-full h-12 px-4 bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none font-medium appearance-none cursor-pointer" id="audience" defaultValue="all">
                    <option value="all">All Registered Voters</option>
                    <option value="d1">District 1 Only</option>
                    <option value="d2">District 2 Only</option>
                    <option value="unverified">Unverified Profiles</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant pointer-events-none">expand_more</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-bold text-sm text-on-surface flex items-center gap-2" htmlFor="priority">
                  Priority Level
                </label>
                <div className="relative group">
                  <select className="w-full h-12 px-4 bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none font-medium appearance-none cursor-pointer" id="priority" defaultValue="standard">
                    <option value="standard">Standard Update (Silent)</option>
                    <option value="high">High Priority (Push Notification)</option>
                    <option value="critical">Critical Alert (Bypass DND)</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant pointer-events-none">expand_more</span>
                </div>
              </div>

            </div>
          </div>

          <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-sm text-on-surface-variant uppercase tracking-wider mb-4">Message Content</h3>
            
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Broadcast Subject (e.g., Poll Location Change)" 
                className="w-full h-12 px-4 bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none font-bold text-lg"
              />
              
              <div className="border border-outline-variant rounded-lg overflow-hidden bg-surface-container-lowest focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all">
                <div className="flex items-center gap-2 p-2 border-b border-outline-variant bg-surface-container-low">
                  <button className="p-1.5 hover:bg-surface-container-high rounded text-on-surface-variant transition-colors"><span className="material-symbols-outlined text-[20px]">format_bold</span></button>
                  <button className="p-1.5 hover:bg-surface-container-high rounded text-on-surface-variant transition-colors"><span className="material-symbols-outlined text-[20px]">format_italic</span></button>
                  <div className="w-px h-6 bg-outline-variant mx-1"></div>
                  <button className="p-1.5 hover:bg-surface-container-high rounded text-on-surface-variant transition-colors"><span className="material-symbols-outlined text-[20px]">link</span></button>
                  <button className="p-1.5 hover:bg-surface-container-high rounded text-on-surface-variant transition-colors"><span className="material-symbols-outlined text-[20px]">format_list_bulleted</span></button>
                </div>
                <textarea 
                  className="w-full p-4 bg-transparent border-none outline-none resize-y min-h-[200px] font-medium leading-relaxed" 
                  placeholder="Enter the detailed message here. Professional and neutral tone is recommended for all official VOTEKINETIC communications..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
              
              <div className="flex justify-between items-center text-xs text-on-surface-variant font-medium">
                <span>Estimated read time: {Math.max(1, Math.ceil(message.length / 50))}s</span>
                <span className={message.length > 2000 ? 'text-error font-bold' : ''}>Character count: {message.length} / 2000</span>
              </div>
            </div>
          </div>
          
        </div>

        {/* Preview and Submission */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="md:col-span-2 bg-secondary/5 border border-secondary/20 p-6 rounded-xl flex items-start gap-4">
            <span className="material-symbols-outlined text-secondary mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
            <div>
              <h4 className="font-bold text-sm text-secondary mb-1">Broadcast Integrity Check</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Once sent, broadcasts are immutable and cryptographically signed. Ensure all dates and instructions are verified by a second administrator.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col gap-4">
            <button 
              className="h-12 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-all shadow-sm flex items-center justify-center gap-2 active:scale-95"
              onClick={handleSend}
            >
              <span className="material-symbols-outlined text-[20px]">send</span>
              Dispatch Broadcast
            </button>
            <button className="h-12 border border-primary text-primary font-bold rounded-lg hover:bg-primary/5 transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[20px]">visibility</span>
              Preview Message
            </button>
          </div>
        </div>

        {/* Recent Broadcasts Status */}
        <section className="mb-12">
          <div className="flex items-center gap-2 text-primary mb-4">
            <span className="material-symbols-outlined text-[20px]">history</span>
            <h3 className="font-bold text-lg">Transmission History</h3>
          </div>
          
          <div className="bg-surface border border-outline-variant rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-container-low border-b border-outline-variant">
                  <tr>
                    <th className="p-4 font-bold text-sm text-on-surface-variant uppercase tracking-wider">Subject</th>
                    <th className="p-4 font-bold text-sm text-on-surface-variant uppercase tracking-wider">Audience</th>
                    <th className="p-4 font-bold text-sm text-on-surface-variant uppercase tracking-wider">Status</th>
                    <th className="p-4 font-bold text-sm text-on-surface-variant uppercase tracking-wider text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  <tr className="hover:bg-surface-container-lowest transition-colors">
                    <td className="p-4 font-medium">Voter ID Verification Extended</td>
                    <td className="p-4 text-sm text-on-surface-variant">All Users</td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#f0fdf4] text-[#15803d] rounded text-[10px] font-bold uppercase tracking-wider border border-[#bbf7d0]">
                        <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> 
                        Delivered
                      </span>
                    </td>
                    <td className="p-4 text-sm text-on-surface-variant text-right">Oct 24, 2023</td>
                  </tr>
                  <tr className="hover:bg-surface-container-lowest transition-colors">
                    <td className="p-4 font-medium">District 4 Poll Location Change</td>
                    <td className="p-4 text-sm text-on-surface-variant">District 4</td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#f0fdf4] text-[#15803d] rounded text-[10px] font-bold uppercase tracking-wider border border-[#bbf7d0]">
                        <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> 
                        Delivered
                      </span>
                    </td>
                    <td className="p-4 text-sm text-on-surface-variant text-right">Oct 22, 2023</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

      </main>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-surface/80 backdrop-blur-sm" onClick={handleCloseModal}></div>
          <div className="relative bg-surface w-full max-w-sm rounded-xl shadow-2xl border border-outline-variant p-8 text-center animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 bg-[#f0fdf4] text-[#16a34a] border border-[#bbf7d0] rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
            </div>
            <h3 className="text-2xl font-bold text-on-surface mb-2">Broadcast Encrypted</h3>
            <p className="text-sm text-on-surface-variant mb-8 leading-relaxed">
              The broadcast has been signed and successfully dispatched to the blockchain relay.
            </p>
            <button 
              className="w-full h-12 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-all active:scale-95 shadow-sm"
              onClick={handleCloseModal}
            >
              Done
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
