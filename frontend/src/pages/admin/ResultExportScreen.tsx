import { useState } from 'react';

export const ResultExportScreen = () => {
  const [activeFormat, setActiveFormat] = useState('pdf');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const simulateGeneration = () => {
    setIsGenerating(true);
    setIsReady(false);
    setTimeout(() => {
      setIsGenerating(false);
      setIsReady(true);
      // Optional: scroll to status section (handled via generic smooth scroll if needed)
    }, 2000);
  };

  return (
    <div className="bg-[#f9f9fc] text-[#1a1c1e] min-h-screen flex flex-col font-sans pb-16 md:pb-0">
      
      {/* TopAppBar */}
      <header className="w-full top-0 sticky z-50 bg-white border-b border-outline-variant shadow-sm">
        <div className="flex justify-between items-center px-4 md:px-10 py-4 max-w-[1200px] mx-auto">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[28px]">verified_user</span>
            <span className="text-xl font-bold tracking-tight text-primary">VOTEKINETIC</span>
          </div>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-8 items-center">
              <a href="#" className="text-sm font-bold text-on-surface-variant hover:text-primary transition-colors">Dashboard</a>
              <a href="#" className="text-sm font-bold text-on-surface-variant hover:text-primary transition-colors">Elections</a>
              <a href="#" className="text-sm font-bold text-on-surface-variant hover:text-primary transition-colors">Audit</a>
              <a href="#" className="text-sm font-bold text-primary border-b-2 border-primary py-1 relative">
                Export
              </a>
            </nav>
            <div className="w-8 h-8 rounded-full bg-[#f0f0f3] flex items-center justify-center cursor-pointer">
              <span className="material-symbols-outlined text-on-surface-variant text-[20px]">account_circle</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow w-full max-w-[1000px] mx-auto px-4 py-8 md:py-12">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary text-[20px]">assignment_turned_in</span>
            <span className="text-sm font-bold text-on-surface-variant uppercase tracking-widest">2024 General Election</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3 tracking-tight">Certified Export</h1>
          <p className="text-sm font-medium text-on-surface-variant max-w-2xl leading-relaxed">
            Generate cryptographically signed result records for institutional compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Configuration Panel */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white border border-outline-variant p-6 rounded-xl shadow-sm flex flex-col gap-6">
              
              <div>
                <h3 className="text-sm font-bold text-[#1a1c1e] mb-4 uppercase tracking-widest">Select Format</h3>
                <div className="grid grid-cols-3 gap-3">
                  <button 
                    onClick={() => setActiveFormat('pdf')}
                    className={`flex flex-col items-center justify-center py-4 rounded-xl border transition-all ${activeFormat === 'pdf' ? 'bg-[#dbeafe] border-[#1d4ed8] text-[#1d4ed8] shadow-sm' : 'bg-white border-outline-variant text-on-surface-variant hover:bg-[#f9f9fc]'}`}
                  >
                    <span className="material-symbols-outlined text-[28px] mb-2">picture_as_pdf</span>
                    <span className="text-xs font-bold uppercase tracking-widest">PDF</span>
                  </button>
                  <button 
                    onClick={() => setActiveFormat('csv')}
                    className={`flex flex-col items-center justify-center py-4 rounded-xl border transition-all ${activeFormat === 'csv' ? 'bg-[#dbeafe] border-[#1d4ed8] text-[#1d4ed8] shadow-sm' : 'bg-white border-outline-variant text-on-surface-variant hover:bg-[#f9f9fc]'}`}
                  >
                    <span className="material-symbols-outlined text-[28px] mb-2">table_chart</span>
                    <span className="text-xs font-bold uppercase tracking-widest">CSV</span>
                  </button>
                  <button 
                    onClick={() => setActiveFormat('xml')}
                    className={`flex flex-col items-center justify-center py-4 rounded-xl border transition-all ${activeFormat === 'xml' ? 'bg-[#dbeafe] border-[#1d4ed8] text-[#1d4ed8] shadow-sm' : 'bg-white border-outline-variant text-on-surface-variant hover:bg-[#f9f9fc]'}`}
                  >
                    <span className="material-symbols-outlined text-[28px] mb-2">data_object</span>
                    <span className="text-xs font-bold uppercase tracking-widest">XML</span>
                  </button>
                </div>
              </div>
              
              <hr className="border-outline-variant" />
              
              <div>
                <h3 className="text-sm font-bold text-[#1a1c1e] mb-4 uppercase tracking-widest">Inclusion Criteria</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-on-surface-variant">Detailed Demographic Breakdown</span>
                    <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary border-outline-variant rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-on-surface-variant">Write-in Candidate Analytics</span>
                    <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary border-outline-variant rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-on-surface-variant">Checksum Verification Log</span>
                    <input type="checkbox" className="w-5 h-5 accent-primary border-outline-variant rounded" />
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Visual Preview Card */}
          <div className="lg:col-span-4">
            <div className="bg-white border border-outline-variant rounded-xl overflow-hidden flex flex-col h-full shadow-sm">
              <div className="relative h-40 bg-[#0f172a] flex items-center justify-center">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent"></div>
                <span className="material-symbols-outlined text-[#3b82f6] text-[64px] opacity-80 z-10">verified_user</span>
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between bg-white">
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-primary mb-1 uppercase tracking-widest">Blockchain Hash Integrity</h4>
                  <p className="text-sm text-on-surface-variant font-mono truncate bg-[#f0f0f3] p-2 rounded">0x88e1...4a2b99c01ff92</p>
                </div>
                <button 
                  onClick={simulateGeneration}
                  disabled={isGenerating}
                  className={`w-full h-12 text-white font-bold text-sm rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95 ${isGenerating ? 'bg-primary/70' : isReady ? 'bg-[#16a34a] hover:bg-[#15803d]' : 'bg-primary hover:bg-primary/90'}`}
                >
                  {isGenerating ? (
                    <><span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span> Generating...</>
                  ) : isReady ? (
                    <><span className="material-symbols-outlined text-[20px]">check</span> Regenerate Report</>
                  ) : (
                    <><span className="material-symbols-outlined text-[20px]">auto_awesome</span> Generate Certified Report</>
                  )}
                </button>
              </div>
            </div>
          </div>
          
        </div>

        {/* Download Status Section */}
        {isReady && (
          <section className="mb-12 animate-[fade-in_0.5s_ease-out]">
            <div className="bg-white border border-outline-variant p-6 rounded-xl border-l-4 border-l-secondary shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#fef08a] text-[#a16207] flex items-center justify-center shrink-0 shadow-sm">
                    <span className="material-symbols-outlined text-[24px]">check_circle</span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#1a1c1e]">Report Ready for Archival</h3>
                    <p className="text-sm font-medium text-on-surface-variant">Report_2024_ELECTION_V1.{activeFormat.toLowerCase()} (4.2 MB)</p>
                  </div>
                </div>
                <div className="flex gap-3 mt-4 md:mt-0">
                  <button className="flex-1 md:flex-none p-3 border border-outline-variant rounded-lg hover:bg-[#f9f9fc] transition-colors flex items-center justify-center text-on-surface-variant shadow-sm">
                    <span className="material-symbols-outlined text-[20px]">share</span>
                  </button>
                  <button className="flex-1 md:flex-none px-6 h-12 bg-secondary text-white rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-secondary-dark transition-all active:scale-95 shadow-sm">
                    <span className="material-symbols-outlined text-[20px]">download</span>
                    Download Now
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Audit Log / Table */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-primary tracking-tight">Recent Exports</h3>
            <button className="text-secondary font-bold text-sm flex items-center gap-1 hover:underline underline-offset-4">
              <span className="material-symbols-outlined text-[18px]">history</span>
              View Audit Log
            </button>
          </div>
          
          <div className="bg-white border border-outline-variant rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead className="bg-[#f9f9fc] border-b border-outline-variant">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Generated On</th>
                    <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Admin/Auditor</th>
                    <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Format</th>
                    <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  <tr className="hover:bg-[#f9f9fc] transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-[#1a1c1e]">Oct 24, 2024 • 14:22</td>
                    <td className="px-6 py-4 text-sm font-medium text-on-surface-variant">J. Smith (IEC Auditor)</td>
                    <td className="px-6 py-4"><span className="bg-[#dbeafe] text-[#1d4ed8] px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">PDF</span></td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-secondary hover:bg-[#fef08a] p-2 rounded-full transition-colors flex items-center justify-center ml-auto">
                        <span className="material-symbols-outlined text-[20px]">download</span>
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-[#f9f9fc] transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-[#1a1c1e]">Oct 23, 2024 • 09:10</td>
                    <td className="px-6 py-4 text-sm font-medium text-on-surface-variant">M. Chen (Observer)</td>
                    <td className="px-6 py-4"><span className="bg-[#f3f4f6] text-[#4b5563] px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-[#d1d5db]">CSV</span></td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-secondary hover:bg-[#fef08a] p-2 rounded-full transition-colors flex items-center justify-center ml-auto">
                        <span className="material-symbols-outlined text-[20px]">download</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

      </main>

      {/* BottomNavBar (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 px-4 bg-white border-t border-outline-variant shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pb-safe">
        <a href="#" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors flex-1 h-full active:scale-95">
          <span className="material-symbols-outlined">sensors</span>
          <span className="text-[10px] font-bold mt-1">Live</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors flex-1 h-full active:scale-95">
          <span className="material-symbols-outlined">assignment_turned_in</span>
          <span className="text-[10px] font-bold mt-1">Results</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors flex-1 h-full active:scale-95">
          <span className="material-symbols-outlined">verified_user</span>
          <span className="text-[10px] font-bold mt-1">Audit</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center bg-[#dbeafe] text-[#1e40af] rounded-full px-4 py-1 mx-2 active:scale-95 font-bold">
          <span className="material-symbols-outlined">ios_share</span>
          <span className="text-[10px] font-bold mt-1">Export</span>
        </a>
      </nav>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
};
