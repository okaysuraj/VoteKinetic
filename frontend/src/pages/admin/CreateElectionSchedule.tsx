import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const CreateElectionSchedule = () => {
  const navigate = useNavigate();
  const [autoRelease, setAutoRelease] = useState(true);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/admin/elections/new/voting-type'); // Assuming the order: Basic Info -> Eligibility -> Schedule -> Voting Type -> Security -> Preview
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
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-1">Election Schedule</h1>
              <p className="text-sm text-on-surface-variant font-medium">Step 3 of 6: Timeline & Automation</p>
            </div>
            <span className="text-sm font-bold text-secondary">50% Complete</span>
          </div>
          <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
            <div className="h-full bg-secondary w-1/2 rounded-full transition-all duration-500"></div>
          </div>
        </div>

        {/* Form Container */}
        <form className="space-y-8" id="schedule-form" onSubmit={handleNext}>
          
          {/* Timezone Banner */}
          <section className="bg-surface-container-low border border-outline-variant p-6 rounded-xl flex items-start gap-4 shadow-sm">
            <span className="material-symbols-outlined text-secondary text-2xl">info</span>
            <div className="space-y-1">
              <p className="font-bold text-sm text-on-surface">Default Timezone Applied</p>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                This election is currently synced to your organization's headquarters timezone: <span className="font-bold text-on-surface">UTC -05:00 (Eastern Time)</span>.
              </p>
            </div>
          </section>

          {/* Date/Time Selection Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-bold text-sm text-on-surface px-1">Start Date/Time</label>
              <input 
                className="w-full h-12 px-4 bg-surface border border-outline-variant rounded-lg focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none font-medium text-sm" 
                type="datetime-local" 
                defaultValue="2024-11-15T09:00"
                required
              />
              <p className="text-xs text-on-surface-variant px-1">When voting will officially open.</p>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="font-bold text-sm text-on-surface px-1">End Date/Time</label>
              <input 
                className="w-full h-12 px-4 bg-surface border border-outline-variant rounded-lg focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none font-medium text-sm" 
                type="datetime-local" 
                defaultValue="2024-11-20T17:00"
                required
              />
              <p className="text-xs text-on-surface-variant px-1">Final deadline for all submissions.</p>
            </div>
          </section>

          {/* Timezone & Sync */}
          <section className="flex flex-col gap-2">
            <label className="font-bold text-sm text-on-surface px-1">Global Timezone Selection</label>
            <div className="relative">
              <select className="w-full h-12 px-4 bg-surface border border-outline-variant rounded-lg focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none font-medium text-sm appearance-none cursor-pointer">
                <option value="est">(GMT-05:00) Eastern Time (US & Canada)</option>
                <option value="pst">(GMT-08:00) Pacific Time (US & Canada)</option>
                <option value="utc">(GMT+00:00) Universal Coordinated Time</option>
                <option value="cet">(GMT+01:00) Central European Time</option>
              </select>
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant pointer-events-none">expand_more</span>
            </div>
          </section>

          {/* Automatic Results Toggle */}
          <section className={`p-6 border rounded-xl flex items-center justify-between shadow-sm transition-colors cursor-pointer ${autoRelease ? 'bg-surface border-secondary' : 'bg-surface border-outline-variant'}`} onClick={() => setAutoRelease(!autoRelease)}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                <span className="material-symbols-outlined">auto_awesome</span>
              </div>
              <div>
                <h3 className={`font-bold text-sm mb-0.5 ${autoRelease ? 'text-primary' : 'text-on-surface-variant'}`}>Automatic Results Release</h3>
                <p className="text-xs text-on-surface-variant">Publish results immediately once the 'End Date' is reached.</p>
              </div>
            </div>
            <div className="relative inline-flex items-center">
              <div className={`w-12 h-6 rounded-full transition-colors ${autoRelease ? 'bg-secondary' : 'bg-surface-container-highest'}`}>
                <div className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform ${autoRelease ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </div>
            </div>
          </section>

          {/* Lock and Security Message */}
          <section className="flex items-start sm:items-center gap-3 p-5 bg-[#f3f4f6] rounded-xl border border-outline-variant">
            <span className="material-symbols-outlined text-outline-variant text-xl shrink-0 mt-0.5 sm:mt-0">lock</span>
            <p className="text-xs text-on-surface-variant italic leading-relaxed">
              Timeline settings will be encrypted and locked 24 hours before the 'Start Date'. Ensure your schedule aligns with your organizational bylaws.
            </p>
          </section>
          
        </form>

      </main>

      {/* Sticky Footer Navigation */}
      <footer className="fixed bottom-0 left-0 w-full bg-surface border-t border-outline-variant z-50">
        <div className="max-w-[1000px] mx-auto flex items-center justify-between px-4 md:px-8 py-4 md:py-6 h-20 md:h-auto">
          <button 
            className="flex items-center justify-center gap-2 px-6 h-12 border border-primary text-primary font-bold rounded-lg hover:bg-primary/5 transition-colors active:scale-95"
            onClick={() => navigate(-1)}
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            Back
          </button>
          <div className="flex items-center gap-4">
            <button className="hidden md:flex h-12 items-center px-4 font-bold text-sm text-on-surface-variant hover:text-primary transition-colors">
              Save Draft
            </button>
            <button 
              className="flex items-center justify-center gap-2 px-8 h-12 bg-primary text-white font-bold rounded-lg shadow-sm hover:bg-primary/90 transition-all active:scale-95"
              form="schedule-form"
              type="submit"
            >
              Next Step
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
};
