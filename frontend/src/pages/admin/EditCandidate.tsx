import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const EditCandidate = () => {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [bio, setBio] = useState('Elena Vance is a dedicated public servant with over 15 years of experience in regional governance and infrastructure development. Her platform focuses on sustainable urban planning, transparent fiscal policy, and enhancing digital literacy in local school districts. Elena believes in a collaborative approach to solving complex societal issues, ensuring that every citizen\'s voice is represented in the decision-making process.');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleRemove = () => {
    if (window.confirm('Are you absolutely sure you want to remove this candidate? This action will permanently delete Elena Vance from the ballot and cannot be undone.')) {
      alert('Candidate removal process initiated. Audit trail logged.');
      navigate(-1);
    }
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
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-3xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>person_edit</span>
            <h1 className="text-3xl font-bold text-on-surface tracking-tight">Edit Candidate</h1>
          </div>
          <p className="text-on-surface-variant">Update the candidate's legal information as it should appear on the official electronic ballot.</p>
        </div>

        <div className="bg-surface border border-outline-variant rounded-xl p-6 md:p-10 shadow-sm relative">
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 pb-8 border-b border-outline-variant">
              <div className="relative group cursor-pointer">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-xl bg-surface-container-high border-2 border-dashed border-outline-variant flex flex-col items-center justify-center overflow-hidden transition-all group-hover:border-primary">
                  <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2">person</span>
                  <p className="text-[10px] font-bold text-center px-4 text-on-surface-variant uppercase tracking-wider group-hover:text-primary transition-colors">Change Photo</p>
                </div>
                <input accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" type="file" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-primary mb-2 uppercase tracking-wider">Official Profile Photo</h3>
                <p className="text-sm text-on-surface-variant mb-4 leading-relaxed max-w-lg">Upload a high-resolution portrait (min. 600x600px). This photo will be visible to all voters on the ballot interface.</p>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-surface-container-low text-[10px] font-bold rounded uppercase tracking-wider text-on-surface-variant border border-outline-variant">JPG or PNG</span>
                  <span className="px-2 py-1 bg-surface-container-low text-[10px] font-bold rounded uppercase tracking-wider text-on-surface-variant border border-outline-variant">Max 5MB</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block font-bold text-on-surface text-sm" htmlFor="fullName">Full Name <span className="text-error">*</span></label>
                <input className="w-full h-12 px-4 border border-outline-variant rounded-lg bg-surface text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" id="fullName" defaultValue="Elena Vance" required type="text" />
                <p className="text-[11px] text-on-surface-variant">Legal name as registered with the Election Commission.</p>
              </div>

              <div className="space-y-2">
                <label className="block font-bold text-on-surface text-sm" htmlFor="party">Party Affiliation <span className="text-error">*</span></label>
                <select className="w-full h-12 px-4 border border-outline-variant rounded-lg bg-surface text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none cursor-pointer" id="party" required defaultValue="democratic">
                  <option disabled value="">Select Party</option>
                  <option value="democratic">Progressive Alliance</option>
                  <option value="republican">National Unity Party</option>
                  <option value="independent">Independent Coalition</option>
                  <option value="green">Sustainability Front</option>
                  <option value="other">Other / Write-in Registered</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block font-bold text-on-surface text-sm" htmlFor="bio">Candidate Biography <span className="text-error">*</span></label>
              <textarea 
                className={`w-full p-4 border rounded-lg bg-surface text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none min-h-[150px] ${bio.length > 1000 ? 'border-error focus:border-error focus:ring-error' : 'border-outline-variant'}`} 
                id="bio" 
                placeholder="Provide a brief summary of the candidate's background, qualifications, and platform (max 1000 characters)..." 
                required 
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
              <div className="flex justify-between items-center">
                <p className="text-[11px] text-on-surface-variant">Voters will see this when requesting 'Candidate Info' at the poll.</p>
                <p className={`text-[11px] font-mono ${bio.length > 1000 ? 'text-error font-bold' : 'text-on-surface-variant'}`}>{bio.length} / 1000</p>
              </div>
            </div>

            <div className="p-4 bg-surface-container-low rounded-lg border border-outline-variant flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-on-surface-variant">description</span>
                <div>
                  <p className="font-bold text-sm text-on-surface">Eligibility Documents</p>
                  <p className="text-xs text-on-surface-variant">vance_eligibility_final.pdf</p>
                </div>
              </div>
              <span className="text-secondary font-bold text-xs cursor-pointer hover:underline">View File</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-8 border-t border-outline-variant">
              <button className="w-full sm:w-auto h-12 px-6 flex items-center justify-center gap-2 border-2 border-error text-error font-bold rounded-lg hover:bg-[#fee2e2] transition-colors" type="button" onClick={handleRemove}>
                <span className="material-symbols-outlined text-[20px]">delete_forever</span>
                Remove Candidate
              </button>

              <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4">
                <button className="h-12 px-8 font-bold text-on-surface-variant border border-outline-variant rounded-lg hover:bg-surface-container-low transition-all" type="button" onClick={() => navigate(-1)}>
                  Cancel
                </button>
                <button className="h-12 px-8 font-bold bg-primary text-white rounded-lg hover:bg-primary/90 transition-all shadow-sm flex items-center justify-center gap-2" type="submit">
                  Update Candidate
                </button>
              </div>
            </div>
          </form>

          {/* Toast Notification */}
          <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface px-6 py-3 rounded-full shadow-lg flex items-center gap-3 transition-all duration-300 z-50 ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
            <span className="material-symbols-outlined text-[#4ade80]">check_circle</span>
            <span className="text-sm font-bold">Candidate record updated successfully.</span>
          </div>

        </div>
      </main>
    </div>
  );
};
