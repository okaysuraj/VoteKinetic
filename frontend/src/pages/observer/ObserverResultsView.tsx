import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const ObserverResultsView = () => {
  const navigate = useNavigate();
  const [showLabel, setShowLabel] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLabel(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20 md:pb-0">
      <header className="bg-surface border-b border-outline-variant sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/observer')}>
            <span className="material-symbols-outlined text-primary">visibility</span>
            <span className="font-headline-md text-primary font-bold tracking-tight">VOTEKINETIC</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-on-surface-variant uppercase tracking-widest hidden md:block">Observer Portal</span>
            <div className="w-8 h-8 rounded-full bg-surface-container-high border border-outline-variant flex items-center justify-center">
              <span className="material-symbols-outlined text-sm">person</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1000px] mx-auto w-full px-4 md:px-8 py-8 space-y-8 flex-grow">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>analytics</span>
              <h1 className="text-3xl font-bold text-on-surface tracking-tight">Finalized Results</h1>
            </div>
            <p className="text-on-surface-variant max-w-2xl">
              Cryptographically verified election outcome. All data has been committed to the immutable ledger and audited by independent nodes.
            </p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 border border-outline-variant rounded-lg font-bold text-on-surface-variant hover:bg-surface-container-low transition-colors shadow-sm">
            <span className="material-symbols-outlined">download</span>
            Export Audit Bundle
          </button>
        </header>

        <section className="bg-primary text-white rounded-xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-md relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
            <span className="material-symbols-outlined text-[120px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
          </div>
          <div className="z-10 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2">Presidential General Election 2024</h2>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm font-medium">
              <span className="flex items-center gap-1 opacity-90"><span className="material-symbols-outlined text-sm">calendar_today</span> Oct 24, 2024</span>
              <span className="flex items-center gap-1 opacity-90"><span className="material-symbols-outlined text-sm">how_to_vote</span> 842,911 Turnout</span>
              <span className="flex items-center gap-1 text-secondary font-bold bg-white/20 px-3 py-1 rounded-full"><span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span> Ledger Secured</span>
            </div>
          </div>
        </section>

        <section className="bg-surface border border-outline-variant rounded-xl p-6 md:p-8 shadow-sm">
          <h3 className="font-bold text-on-surface uppercase tracking-wider mb-8">Official Tally</h3>
          
          <div className="space-y-8">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 overflow-hidden border border-outline-variant rounded-full shrink-0">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAE4tD6303h9b6zN8CjW4x0vQvXfQ60_68_u9n_e7P75P-9yqB2c4yO6SgP-gD_b5r6-p0vL1t3gL1t4XnOq0Qp_B6AXuAE4tD6303h9b6zN8CjW4x0vQvXfQ60_68_u9n_e7P75P-9yqB2c4yO6SgP-gD_b5r6-p0vL1t3gL1t4XnOq0Qp" alt="Elena Rodriguez" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary text-lg">Elena Rodriguez</h4>
                    <p className="text-sm text-on-surface-variant">Progressive Coalition</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold text-on-surface tracking-tight">48.2%</span>
                  <p className="text-sm text-on-surface-variant font-medium">406,283 Votes</p>
                </div>
              </div>
              <div className="w-full bg-surface-container-low h-8 relative rounded-full overflow-hidden">
                <div className="bg-primary h-full transition-all duration-1000 ease-out" style={{ width: '48.2%' }}></div>
                <div className="absolute inset-0 flex items-center px-3 pointer-events-none">
                  <span className={`text-white text-xs font-bold transition-opacity duration-1000 ${showLabel ? 'opacity-100' : 'opacity-0'}`}>LEAD</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 overflow-hidden border border-outline-variant rounded-full shrink-0">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvnrrLNWb1kzVfNsu9WvsnFHgM6mvRK0xegCROZ4iEvNbxUKb5xRqHKD4GhghKKNP_f5_XD9OM-uL-HAyUjXv1QbB8vBPpIEMi1xsOJFF27vI77JsOLgkZIokVtaO2dISBDI8fjrI0oWMbIQNKQKuN9B_iu1z-7k2dGSvFMsrsXwItBCtRrtWMyDzt1oRRjAi_j3MWe3lZwCNXx0465ARZ326pQIBl6pG05rakv2Jkt1j6EZFRLw6gFg" alt="Marcus Thorne" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary text-lg">Marcus Thorne</h4>
                    <p className="text-sm text-on-surface-variant">National Heritage Alliance</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold text-on-surface tracking-tight">41.5%</span>
                  <p className="text-sm text-on-surface-variant font-medium">349,808 Votes</p>
                </div>
              </div>
              <div className="w-full bg-surface-container-low h-8 rounded-full overflow-hidden">
                <div className="bg-secondary h-full transition-all duration-1000 ease-out" style={{ width: '41.5%' }}></div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 overflow-hidden border border-outline-variant rounded-full shrink-0">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAU28Oq7kZ4ct64SLeCBiodUo4_XthqySaQyqGD98ZqqRx2r0e8ADpLZLDXKSW9iQbIWMBFbiHkvSua-fdnQJgy3TeY9fBhh64Mn9F7Vrs5xOD3b4fjY_k8KWlpbfH9LoV_2_AWjFNkbReuEDW90uqrjFC6M2EDK1LAjIQA8b2_jJowmFDq02C8If6MKrrnozhada968FkppxM72CWjWZpINVjcVmp9CFemExQzRZlCprJYQHnwaqrA3A" alt="Jordan Vane" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary text-lg">Jordan Vane</h4>
                    <p className="text-sm text-on-surface-variant">Independent Liberty Party</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold text-on-surface tracking-tight">10.3%</span>
                  <p className="text-sm text-on-surface-variant font-medium">86,820 Votes</p>
                </div>
              </div>
              <div className="w-full bg-surface-container-low h-8 rounded-full overflow-hidden">
                <div className="bg-outline-variant h-full transition-all duration-1000 ease-out" style={{ width: '10.3%' }}></div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-primary uppercase tracking-wider">Regional Distribution</h3>
              <span className="material-symbols-outlined text-on-surface-variant">map</span>
            </div>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between items-center text-sm mb-1">
                  <span className="font-medium text-on-surface-variant">Northern Sector</span>
                  <span className="font-bold text-on-surface">248,102</span>
                </div>
                <div className="w-full bg-surface-container-low h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[70%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center text-sm mb-1">
                  <span className="font-medium text-on-surface-variant">Central District</span>
                  <span className="font-bold text-on-surface">312,449</span>
                </div>
                <div className="w-full bg-surface-container-low h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[85%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center text-sm mb-1">
                  <span className="font-medium text-on-surface-variant">Southern Provinces</span>
                  <span className="font-bold text-on-surface">282,360</span>
                </div>
                <div className="w-full bg-surface-container-low h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[78%]"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-primary uppercase tracking-wider">Live Audit Log</h3>
              <span className="material-symbols-outlined text-on-surface-variant">history</span>
            </div>
            <div className="space-y-4">
              <div className="flex gap-4 items-start p-3 bg-surface rounded-lg border border-outline-variant">
                <span className="material-symbols-outlined text-secondary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <div>
                  <p className="font-bold text-sm text-on-surface">Ledger Finalized</p>
                  <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">Block height 1,429,081 confirmed by all nodes.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start p-3 bg-surface rounded-lg border border-outline-variant">
                <span className="material-symbols-outlined text-secondary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                <div>
                  <p className="font-bold text-sm text-on-surface">Observer Sign-off</p>
                  <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">3rd party auditors (Group B) verified cryptographic proof.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start p-3 bg-surface rounded-lg border border-outline-variant">
                <span className="material-symbols-outlined text-secondary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                <div>
                  <p className="font-bold text-sm text-on-surface">Public Key Released</p>
                  <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">Audit key now public for individual voter verification.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
