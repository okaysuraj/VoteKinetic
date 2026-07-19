import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const CreateElectionEligibilityRules = () => {
  const navigate = useNavigate();
  const [biometricRequired, setBiometricRequired] = useState(false);
  const [mfaRequired, setMfaRequired] = useState(true);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/admin/elections/new/preview');
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

      <main className="max-w-[1000px] mx-auto w-full px-4 md:px-8 py-8 flex-grow flex flex-col">
        
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-end mb-3">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-1">Create New Election</h1>
              <p className="text-sm text-on-surface-variant font-medium">Step 2 of 6: Eligibility & Access Rules</p>
            </div>
            <span className="text-sm font-bold text-secondary">33.2% Complete</span>
          </div>
          <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
            <div className="h-full bg-secondary w-2/6 transition-all duration-500 ease-out"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 flex-grow">
          {/* Option 1: CSV Upload */}
          <section className="md:col-span-12 border border-outline-variant bg-surface p-6 rounded-xl flex flex-col gap-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary text-3xl">upload_file</span>
              <h3 className="text-xl font-bold text-primary">Direct Roster Upload</h3>
            </div>
            <p className="text-sm text-on-surface-variant">Upload a pre-approved list of eligible voters. Only these identities will be issued cryptographic voting tokens.</p>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-2/3 border-2 border-dashed border-outline-variant rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-surface-container-low hover:border-secondary transition-all">
                <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2">cloud_upload</span>
                <p className="font-bold text-on-surface mb-1 text-sm">Drag and drop your CSV file here</p>
                <p className="text-xs text-on-surface-variant mb-4">or click to browse local files (Max 5MB)</p>
                
                <label className="bg-surface-container-high border border-outline-variant px-6 py-2 rounded-lg cursor-pointer hover:bg-surface-container-highest transition-colors inline-block">
                  <span className="text-sm font-bold text-on-surface">Select File</span>
                  <input type="file" className="hidden" accept=".csv" />
                </label>
                
                <div className="mt-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px] text-primary">info</span>
                  <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">Required headers: voter_id, email, full_name</span>
                </div>
              </div>
              
              <div className="md:w-1/3 flex items-center justify-center">
                <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl w-full">
                  <h4 className="font-bold text-sm text-primary uppercase tracking-wider mb-4">Requirement Preview</h4>
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium text-on-surface-variant">Total Eligible</span>
                      <span className="font-bold">--</span>
                    </div>
                    <div className="w-full h-px bg-outline-variant"></div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium text-on-surface-variant">Unique Keys</span>
                      <span className="text-on-surface-variant italic font-medium">Pending...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Option 2: Domain Restriction */}
          <section className="md:col-span-7 border border-outline-variant bg-surface p-6 rounded-xl flex flex-col gap-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary text-3xl">domain</span>
              <h3 className="text-xl font-bold text-primary">Domain Restriction</h3>
            </div>
            <p className="text-sm text-on-surface-variant">Limit participation to users with specific organizational email domains.</p>
            
            <div className="flex flex-col gap-3">
              <label className="font-bold text-sm text-on-surface" htmlFor="domains">Allowed Domains</label>
              <div className="flex gap-2">
                <input 
                  className="flex-grow border border-outline-variant rounded-lg px-4 h-12 bg-surface-container-lowest focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all font-medium text-sm" 
                  id="domains" 
                  placeholder="e.g., @agency.gov, @university.edu" 
                  type="text"
                />
                <button className="bg-primary text-white font-bold h-12 px-6 rounded-lg hover:bg-primary/90 transition-colors active:scale-95 shadow-sm">
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="bg-[#eff6ff] text-[#1d4ed8] border border-[#bfdbfe] px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2">
                  @agency.gov <span className="material-symbols-outlined text-sm cursor-pointer">close</span>
                </span>
              </div>
            </div>
          </section>

          {/* Option 3: Biometric & Multi-Factor */}
          <section className={`md:col-span-5 border bg-surface p-6 rounded-xl flex flex-col gap-6 shadow-sm transition-colors ${biometricRequired || mfaRequired ? 'border-secondary' : 'border-outline-variant'}`}>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-error text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>fingerprint</span>
              <h3 className="text-xl font-bold text-primary">Enhanced Security</h3>
            </div>
            <p className="text-sm text-on-surface-variant">Require additional identity verification layers before ballot access.</p>
            
            <div className="mt-auto space-y-6">
              <label className="flex items-center justify-between cursor-pointer group">
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-on-surface">Biometric Requirement</span>
                  <span className="text-xs text-on-surface-variant mt-0.5">Face ID / Touch ID at login</span>
                </div>
                <div className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={biometricRequired}
                    onChange={(e) => setBiometricRequired(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                </div>
              </label>
              
              <div className="h-px bg-outline-variant"></div>
              
              <label className="flex items-center justify-between cursor-pointer group">
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-on-surface">MFA (SMS/TOTP)</span>
                  <span className="text-xs text-on-surface-variant mt-0.5">Time-based one-time password</span>
                </div>
                <div className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={mfaRequired}
                    onChange={(e) => setMfaRequired(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                </div>
              </label>
            </div>
          </section>
        </div>

        {/* Security Warning */}
        <div className="bg-[#f0fdf4] border border-[#bbf7d0] p-4 rounded-xl flex gap-4 items-start mt-6 shadow-sm">
          <span className="material-symbols-outlined text-[#16a34a] text-2xl shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>gpp_maybe</span>
          <div>
            <p className="font-bold text-[#15803d] text-sm mb-1">Note on Data Privacy</p>
            <p className="text-xs text-[#166534] leading-relaxed">
              Uploaded CSV data is encrypted at rest and hashed. VOTEKINETIC does not store plain-text identifiers after the voting session is concluded.
            </p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8 pt-8 border-t border-outline-variant">
          <button 
            className="w-full md:w-auto h-12 border border-primary text-primary font-bold px-8 rounded-lg flex items-center justify-center gap-2 hover:bg-primary/5 transition-colors active:scale-95" 
            onClick={() => navigate(-1)}
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Back
          </button>
          
          <button 
            className="w-full md:w-auto h-12 bg-primary text-white font-bold px-10 rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 shadow-sm active:scale-95 transition-all"
            onClick={handleNext}
          >
            Next Step
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </main>
    </div>
  );
};
