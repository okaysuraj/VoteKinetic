import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AddCandidate = () => {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [bio, setBio] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20 md:pb-0">
      <header className="bg-surface border-b border-outline-variant sticky top-0 z-50">
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
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-3xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>person_add</span>
            <h1 className="text-3xl font-bold text-on-surface tracking-tight">Register Candidate</h1>
          </div>
          <p className="text-on-surface-variant">Enter the candidate's legal information as it should appear on the official electronic ballot.</p>
        </div>

        <div className="bg-surface border border-outline-variant rounded-xl p-6 md:p-10 shadow-sm relative">
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 pb-8 border-b border-outline-variant">
              <div className="relative group cursor-pointer">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-xl bg-surface-container-high border-2 border-dashed border-outline-variant flex flex-col items-center justify-center overflow-hidden transition-all group-hover:border-primary group-hover:bg-surface">
                  <span className="material-symbols-outlined text-4xl text-outline mb-2 group-hover:text-primary transition-colors">add_a_photo</span>
                  <p className="text-[10px] font-bold text-center px-4 text-on-surface-variant uppercase tracking-wider group-hover:text-primary transition-colors">Click to upload official portrait</p>
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
                <input className="w-full h-12 px-4 border border-outline-variant rounded-lg bg-surface text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" id="fullName" placeholder="e.g. Dr. Helena J. Montgomery" required type="text" />
                <p className="text-[11px] text-on-surface-variant">Legal name as registered with the Election Commission.</p>
              </div>

              <div className="space-y-2">
                <label className="block font-bold text-on-surface text-sm" htmlFor="party">Party Affiliation <span className="text-error">*</span></label>
                <select className="w-full h-12 px-4 border border-outline-variant rounded-lg bg-surface text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none cursor-pointer" id="party" required defaultValue="">
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
                className={`w-full p-4 border rounded-lg bg-surface text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none min-h-[150px] ${bio.length > 2500 ? 'border-error focus:border-error focus:ring-error' : 'border-outline-variant'}`} 
                id="bio" 
                placeholder="Provide a brief summary of the candidate's background, qualifications, and platform (max 2500 characters)..." 
                required 
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
              <div className="flex justify-between items-center">
                <p className="text-[11px] text-on-surface-variant">Voters will see this when requesting 'Candidate Info' at the poll.</p>
                <p className={`text-[11px] font-mono ${bio.length > 2500 ? 'text-error font-bold' : 'text-on-surface-variant'}`}>{bio.length} / 2500</p>
              </div>
            </div>

            <div className="p-4 bg-surface-container-low rounded-lg border border-outline-variant flex gap-4 items-start">
              <span className="material-symbols-outlined text-secondary mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              <div>
                <p className="font-bold text-sm text-primary mb-1">Administrative Verification</p>
                <p className="text-xs text-on-surface-variant leading-relaxed max-w-2xl">By saving this candidate, you confirm that all provided details have been verified against the official submission forms. This action will be logged in the System Audit.</p>
              </div>
            </div>

            <div className="flex flex-col-reverse md:flex-row justify-end gap-4 pt-8 border-t border-outline-variant">
              <button className="h-12 px-8 font-bold text-primary border border-primary rounded-lg hover:bg-surface-container-low transition-all" type="button" onClick={() => navigate(-1)}>
                Cancel
              </button>
              <button className="h-12 px-8 font-bold bg-primary text-white rounded-lg hover:bg-primary/90 transition-all shadow-sm flex items-center justify-center gap-2" type="submit">
                <span className="material-symbols-outlined text-[20px]">save</span>
                Save Candidate
              </button>
            </div>
          </form>

          {/* Toast Notification */}
          <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface px-6 py-3 rounded-full shadow-lg flex items-center gap-3 transition-all duration-300 z-50 ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
            <span className="material-symbols-outlined text-[#4ade80]">check_circle</span>
            <span className="text-sm font-bold">Candidate successfully registered and encrypted.</span>
          </div>

        </div>
      </main>
    </div>
  );
};
