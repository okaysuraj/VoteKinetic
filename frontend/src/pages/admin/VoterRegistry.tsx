import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const VoterRegistry = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [voterToBlock, setVoterToBlock] = useState<{name: string, id: string} | null>(null);

  const filters = ['All', 'Verified', 'Pending', 'Blocked'];

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
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-primary mb-2">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>how_to_reg</span>
              <span className="font-bold text-xs uppercase tracking-wider">Access Control</span>
            </div>
            <h1 className="text-3xl font-bold text-on-surface tracking-tight mb-2">Voter Registry</h1>
            <p className="text-on-surface-variant text-sm max-w-xl">
              Manage cryptographic identities and election access for registered citizens.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button className="h-10 px-4 border border-outline-variant text-on-surface-variant font-bold rounded-lg hover:bg-surface-container-high transition-colors flex items-center gap-2" onClick={() => navigate('/admin')}>
              <span className="material-symbols-outlined text-[18px]">file_upload</span>
              Import
            </button>
            <button className="h-10 px-4 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-2" onClick={() => navigate('/admin')}>
              <span className="material-symbols-outlined text-[18px]">person_add</span>
              Manual Add
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors">search</span>
            <input 
              type="text" 
              placeholder="Search by Name, Email, or Voter ID (VID)..." 
              className="w-full h-12 pl-12 pr-4 bg-surface border border-outline-variant rounded-xl focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none font-medium text-sm"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map(filter => (
              <button 
                key={filter}
                className={`h-9 px-4 rounded-full text-xs font-bold transition-all border ${activeFilter === filter ? 'bg-secondary/10 text-secondary border-secondary' : 'bg-surface border-outline-variant text-on-surface-variant hover:bg-surface-container-high'}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* List Section */}
        <section className="flex flex-col gap-3">
          
          <div className="flex items-center justify-between p-4 bg-surface border border-outline-variant rounded-xl hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#f0fdf4] text-[#16a34a] border border-[#bbf7d0] flex items-center justify-center font-bold text-lg">JD</div>
              <div>
                <h3 className="font-bold text-on-surface text-sm">Jonathan Davis</h3>
                <p className="text-xs text-on-surface-variant">jonathan.d@example.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 bg-[#f0fdf4] text-[#15803d] rounded-md text-[10px] font-bold uppercase tracking-wider border border-[#bbf7d0]">
                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                Verified
              </span>
              <button className="w-8 h-8 rounded-full hover:bg-surface-container-high flex items-center justify-center transition-colors text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px]">more_vert</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-surface border border-outline-variant rounded-xl hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#fdf4ff] text-[#c026d3] border border-[#f5d0fe] flex items-center justify-center font-bold text-lg">SM</div>
              <div>
                <h3 className="font-bold text-on-surface text-sm">Sarah Mitchell</h3>
                <p className="text-xs text-on-surface-variant">smitchell@district.org</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 bg-[#fffbeb] text-[#b45309] rounded-md text-[10px] font-bold uppercase tracking-wider border border-[#fde68a]">
                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>pending</span>
                Pending
              </span>
              <button className="w-8 h-8 rounded-full hover:bg-surface-container-high flex items-center justify-center transition-colors text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px]">more_vert</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-surface border border-outline-variant rounded-xl hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#fef2f2] text-[#ef4444] border border-[#fecaca] flex items-center justify-center font-bold text-lg">AR</div>
              <div>
                <h3 className="font-bold text-on-surface text-sm">Alister Roberts</h3>
                <p className="text-xs text-on-surface-variant">a.roberts@mail.net</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 bg-[#fef2f2] text-[#b91c1c] rounded-md text-[10px] font-bold uppercase tracking-wider border border-[#fecaca]">
                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>block</span>
                Blocked
              </span>
              <button className="w-8 h-8 rounded-full hover:bg-surface-container-high flex items-center justify-center transition-colors text-on-surface-variant" onClick={() => { setVoterToBlock({name: 'Alister Roberts', id: 'AR'}); setShowBlockModal(true); }}>
                <span className="material-symbols-outlined text-[20px]">more_vert</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-surface border border-outline-variant rounded-xl hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#eff6ff] text-[#3b82f6] border border-[#bfdbfe] flex items-center justify-center font-bold text-lg">EK</div>
              <div>
                <h3 className="font-bold text-on-surface text-sm">Elena Kozlova</h3>
                <p className="text-xs text-on-surface-variant">e.kozlova@global.edu</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 bg-[#f0fdf4] text-[#15803d] rounded-md text-[10px] font-bold uppercase tracking-wider border border-[#bbf7d0]">
                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                Verified
              </span>
              <button className="w-8 h-8 rounded-full hover:bg-surface-container-high flex items-center justify-center transition-colors text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px]">more_vert</span>
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-surface border border-outline-variant rounded-xl hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#fdf2f8] text-[#ec4899] border border-[#fbcfe8] flex items-center justify-center font-bold text-lg">MW</div>
              <div>
                <h3 className="font-bold text-on-surface text-sm">Marcus Webb</h3>
                <p className="text-xs text-on-surface-variant">webb.m@services.gov</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 bg-[#f0fdf4] text-[#15803d] rounded-md text-[10px] font-bold uppercase tracking-wider border border-[#bbf7d0]">
                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                Verified
              </span>
              <button className="w-8 h-8 rounded-full hover:bg-surface-container-high flex items-center justify-center transition-colors text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px]">more_vert</span>
              </button>
            </div>
          </div>

        </section>

        {/* Pagination */}
        <nav className="mt-8 flex items-center justify-between py-4 border-t border-outline-variant">
          <p className="text-xs text-on-surface-variant font-medium">Showing 1 to 5 of 1,284 voters</p>
          <div className="flex gap-2">
            <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-primary text-white font-bold text-sm">1</button>
            <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition-colors text-sm font-medium">2</button>
            <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition-colors text-sm font-medium">3</button>
            <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </nav>
      </main>

      {/* Block Voter Modal */}
      {showBlockModal && voterToBlock && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-surface/80 backdrop-blur-sm" onClick={() => setShowBlockModal(false)}></div>
          <div className="relative bg-surface-container-lowest w-full max-w-[500px] rounded-xl shadow-2xl border border-outline-variant overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#fef2f2] rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-[#ef4444] text-[40px]" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
              </div>
              <h3 className="text-2xl font-bold text-primary mb-3">Confirm Access Restriction</h3>
              <p className="text-on-surface-variant mb-8 max-w-[380px] text-sm leading-relaxed">
                Are you sure you want to block <strong>{voterToBlock.name}</strong>? This will immediately revoke their active session and invalidate their voting token for current elections.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <button 
                  className="flex-1 h-12 border border-outline-variant font-bold text-on-surface hover:bg-surface-container-low transition-colors rounded-lg"
                  onClick={() => setShowBlockModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="flex-1 h-12 bg-error text-white font-bold hover:bg-error/90 active:scale-95 transition-all rounded-lg shadow-sm"
                  onClick={() => {
                    alert(`Voter ${voterToBlock.name} blocked. Audit log updated.`);
                    setShowBlockModal(false);
                  }}
                >
                  Confirm Block
                </button>
              </div>
            </div>
            <div className="bg-surface-container-low px-8 py-4 flex items-center justify-center gap-2 border-t border-outline-variant">
              <span className="material-symbols-outlined text-[16px] text-on-surface-variant">lock</span>
              <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Action will be logged in the immutable audit trail</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
