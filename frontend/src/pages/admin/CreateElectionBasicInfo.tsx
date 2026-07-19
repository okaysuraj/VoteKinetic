import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const CreateElectionBasicInfo = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, save to context or state management here
    navigate('/admin/elections/new/schedule');
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
              <p className="text-sm text-on-surface-variant font-medium">Step 1 of 6: Basic Information</p>
            </div>
            <span className="text-sm font-bold text-secondary">16.6% Complete</span>
          </div>
          <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
            <div className="h-full bg-secondary w-1/6 transition-all duration-500 ease-out"></div>
          </div>
        </div>

        {/* Form Section */}
        <section className="bg-surface border border-outline-variant rounded-xl p-6 md:p-10 shadow-sm flex-grow flex flex-col">
          
          {/* Context Icon */}
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-outline-variant">
            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-on-surface mb-1">Election Identity</h2>
              <p className="text-sm text-on-surface-variant">Provide the foundational details for your democratic process.</p>
            </div>
          </div>

          {/* Form Fields */}
          <form className="space-y-6 flex-grow flex flex-col" id="election-form" onSubmit={handleNext}>
            
            <div className="space-y-2">
              <label className="block font-bold text-sm text-on-surface" htmlFor="election-title">Election Title</label>
              <input 
                className="w-full px-4 h-12 bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none font-medium text-sm" 
                id="election-title" 
                placeholder="e.g., 2024 National Assembly Election" 
                required 
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <p className="text-xs text-on-surface-variant">This title will be visible to all eligible voters on their digital ballots.</p>
            </div>
            
            <div className="space-y-2">
              <label className="block font-bold text-sm text-on-surface" htmlFor="organization-name">Organization Name</label>
              <div className="relative">
                <input 
                  className="w-full px-4 h-12 bg-surface-container-low border border-outline-variant rounded-lg font-medium text-sm text-on-surface-variant cursor-not-allowed" 
                  id="organization-name" 
                  readOnly 
                  type="text" 
                  value="Votekinetic Central Authority"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[20px]">lock</span>
                </div>
              </div>
              <p className="text-xs text-on-surface-variant italic">Managed by the central administrative console.</p>
            </div>
            
            <div className="space-y-2 flex-grow flex flex-col">
              <label className="block font-bold text-sm text-on-surface" htmlFor="election-description">Election Description</label>
              <textarea 
                className="w-full p-4 bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none font-medium text-sm resize-none flex-grow min-h-[150px]" 
                id="election-description" 
                placeholder="Provide a detailed overview of the election purpose, eligibility criteria, and key dates..." 
                required 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <div className="flex justify-end">
                <p className={`text-xs font-medium ${description.length > 2000 ? 'text-error' : 'text-on-surface-variant'}`}>
                  {description.length} / 2000 characters
                </p>
              </div>
            </div>
            
          </form>
        </section>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-8 gap-4">
          <button 
            className="w-full md:w-auto px-8 h-12 border border-primary text-primary font-bold rounded-lg hover:bg-primary/5 transition-colors active:scale-95 flex items-center justify-center gap-2"
            onClick={() => navigate('/admin')}
            type="button"
          >
            <span className="material-symbols-outlined">close</span>
            Cancel
          </button>
          
          <button 
            className="w-full md:w-auto px-10 h-12 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-sm" 
            form="election-form" 
            type="submit"
          >
            Next Step
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>

      </main>

    </div>
  );
};
