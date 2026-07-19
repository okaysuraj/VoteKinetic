import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ElectionAdminDashboard = () => {
  const navigate = useNavigate();
  const [reportState, setReportState] = useState<'idle' | 'generating' | 'ready'>('idle');

  const handleGenerateReport = () => {
    setReportState('generating');
    setTimeout(() => {
      setReportState('ready');
      setTimeout(() => {
        setReportState('idle');
      }, 3000);
    }, 2000);
  };

  return (
    <div className="bg-[#f9f9fc] text-[#1a1c1e] min-h-screen flex flex-col font-sans">
      
      {/* TopAppBar */}
      <header className="w-full top-0 sticky bg-white border-b border-[#e2e2e5] z-50 shadow-sm">
        <div className="flex justify-between items-center px-4 md:px-10 py-4 max-w-[1440px] mx-auto">
          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl font-bold text-[#001a40] tracking-tight">Admin Console</h1>
            <p className="text-xs font-medium text-[#74777f]">Institutional Node 44-B</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative cursor-pointer hover:bg-[#f0f0f3] p-2 rounded-full transition-colors hidden sm:block">
              <span className="material-symbols-outlined text-[#44474e]">notifications</span>
              <div className="absolute top-2 right-2 w-2 h-2 bg-[#ba1a1a] rounded-full border-2 border-white"></div>
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:bg-[#f0f0f3] p-1.5 rounded-full transition-colors pl-3 border border-[#e2e2e5]">
              <span className="text-sm font-bold text-[#001a40] hidden sm:block">A. Administrator</span>
              <div className="w-8 h-8 rounded-full bg-[#115cb9] flex items-center justify-center text-white">
                <span className="text-xs font-bold uppercase tracking-widest">AA</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow w-full max-w-[1200px] mx-auto px-4 py-8 md:py-10">
        
        {/* Key Actions Row */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          <button 
            className="group bg-white border border-[#e2e2e5] p-6 rounded-xl flex flex-col items-center justify-center gap-3 hover:border-[#115cb9] hover:shadow-md transition-all active:scale-95"
            onClick={() => navigate('/admin/elections/create')}
          >
            <div className="w-12 h-12 rounded-full bg-[#dbeafe] flex items-center justify-center text-[#1e40af] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[24px]">add_circle</span>
            </div>
            <span className="text-sm font-bold text-[#001a40]">New Election</span>
          </button>
          
          <button className="group bg-white border border-[#e2e2e5] p-6 rounded-xl flex flex-col items-center justify-center gap-3 hover:border-[#115cb9] hover:shadow-md transition-all active:scale-95">
            <div className="w-12 h-12 rounded-full bg-[#f3f4f6] flex items-center justify-center text-[#4b5563] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[24px]">group_add</span>
            </div>
            <span className="text-sm font-bold text-[#001a40]">Voter Import</span>
          </button>
          
          <button className="group bg-white border border-[#e2e2e5] p-6 rounded-xl flex flex-col items-center justify-center gap-3 hover:border-[#115cb9] hover:shadow-md transition-all active:scale-95">
            <div className="w-12 h-12 rounded-full bg-[#f3f4f6] flex items-center justify-center text-[#4b5563] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[24px]">settings</span>
            </div>
            <span className="text-sm font-bold text-[#001a40]">Platform Config</span>
          </button>
          
          <button 
            className="group bg-white border border-[#e2e2e5] p-6 rounded-xl flex flex-col items-center justify-center gap-3 hover:border-[#115cb9] hover:shadow-md transition-all active:scale-95"
            onClick={handleGenerateReport}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              reportState === 'ready' ? 'bg-[#dcfce7] text-[#166534]' : 'bg-[#f0fdf4] text-[#15803d]'
            } group-hover:scale-110`}>
              <span className={`material-symbols-outlined text-[24px] ${reportState === 'generating' ? 'animate-spin' : ''}`}>
                {reportState === 'generating' ? 'sync' : reportState === 'ready' ? 'check' : 'description'}
              </span>
            </div>
            <span className={`text-sm font-bold ${reportState === 'ready' ? 'text-[#166534]' : 'text-[#001a40]'}`}>
              {reportState === 'generating' ? 'Generating...' : reportState === 'ready' ? 'Report Ready' : 'Generate Audit Report'}
            </span>
          </button>
          
        </section>

        {/* Current Elections Table */}
        <section className="bg-white border border-[#e2e2e5] rounded-xl overflow-hidden mb-8 shadow-sm">
          <div className="p-6 border-b border-[#e2e2e5] flex justify-between items-center">
            <h3 className="text-xl font-bold text-[#001a40]">Current Elections</h3>
            <span className="material-symbols-outlined text-[#74777f] cursor-pointer hover:text-[#001a40] transition-colors">filter_list</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead className="bg-[#f9f9fc]">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-[#74777f] uppercase tracking-widest">Election Name</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#74777f] uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#74777f] uppercase tracking-widest">Participation</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#74777f] uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e2e5]">
                
                {/* Live */}
                <tr className="hover:bg-[#f0f0f3] transition-colors group">
                  <td className="px-6 py-5">
                    <p className="text-sm font-bold text-[#1a1c1e] group-hover:text-[#115cb9] transition-colors">2024 Municipal Board</p>
                    <p className="text-xs font-medium text-[#74777f] mt-1">Ends: Oct 12, 18:00</p>
                  </td>
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center px-2.5 py-1 rounded text-[10px] font-bold bg-[#EBF2FA] text-[#115cb9] border border-[#115cb9] tracking-widest uppercase">Live</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="w-full bg-[#e2e2e5] h-2 rounded-full max-w-[120px]">
                      <div className="bg-[#115cb9] h-full rounded-full" style={{ width: '74%' }}></div>
                    </div>
                    <span className="text-xs font-bold text-[#74777f] mt-1.5 block">74.2%</span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="text-[#115cb9] font-bold text-sm hover:underline underline-offset-4">Monitor</button>
                  </td>
                </tr>
                
                {/* Tallying */}
                <tr className="hover:bg-[#f0f0f3] transition-colors group">
                  <td className="px-6 py-5">
                    <p className="text-sm font-bold text-[#1a1c1e] group-hover:text-[#115cb9] transition-colors">Regional Council Vote</p>
                    <p className="text-xs font-medium text-[#74777f] mt-1">Ended: 2 hours ago</p>
                  </td>
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center px-2.5 py-1 rounded text-[10px] font-bold bg-[#f3f4f6] text-[#4b5563] border border-[#d1d5db] tracking-widest uppercase">Tallying</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="w-full bg-[#e2e2e5] h-2 rounded-full max-w-[120px]">
                      <div className="bg-[#10b981] h-full rounded-full" style={{ width: '100%' }}></div>
                    </div>
                    <span className="text-xs font-bold text-[#74777f] mt-1.5 block">98.1% Final</span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="text-[#115cb9] font-bold text-sm hover:underline underline-offset-4">Verify</button>
                  </td>
                </tr>
                
                {/* Scheduled */}
                <tr className="hover:bg-[#f0f0f3] transition-colors group">
                  <td className="px-6 py-5">
                    <p className="text-sm font-bold text-[#1a1c1e] group-hover:text-[#115cb9] transition-colors">Public Works Referendum</p>
                    <p className="text-xs font-medium text-[#74777f] mt-1">Starts: Nov 01, 09:00</p>
                  </td>
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center px-2.5 py-1 rounded text-[10px] font-bold bg-[#fef3c7] text-[#b45309] border border-[#fcd34d] tracking-widest uppercase">Scheduled</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs font-bold text-[#74777f]">—</span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="text-[#115cb9] font-bold text-sm hover:underline underline-offset-4">Edit</button>
                  </td>
                </tr>
                
                {/* Draft */}
                <tr className="hover:bg-[#f0f0f3] transition-colors group">
                  <td className="px-6 py-5">
                    <p className="text-sm font-bold text-[#1a1c1e] group-hover:text-[#115cb9] transition-colors">Staff Internal Election</p>
                    <p className="text-xs font-medium text-[#74777f] mt-1">Last edit: Today, 10:45</p>
                  </td>
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center px-2.5 py-1 rounded text-[10px] font-bold bg-white text-[#74777f] border border-[#e2e2e5] tracking-widest uppercase">Draft</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs font-bold text-[#74777f]">—</span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="text-[#115cb9] font-bold text-sm hover:underline underline-offset-4">Continue</button>
                  </td>
                </tr>
                
              </tbody>
            </table>
          </div>
        </section>

        {/* Visual Anchor: Secure Infrastructure */}
        <section className="relative w-full h-48 rounded-xl overflow-hidden mb-8 flex items-center px-8 border border-outline-variant shadow-sm group">
          <div className="absolute inset-0 bg-[#0f172a]/90 z-10 transition-opacity group-hover:bg-[#0f172a]/80"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale opacity-30 group-hover:scale-105 transition-transform duration-1000"></div>
          
          <div className="relative z-20 max-w-md">
            <h4 className="text-xl font-bold text-white mb-2">Immutable Audit Logs</h4>
            <p className="text-sm font-medium text-slate-300 leading-relaxed">
              All administrative actions are cryptographically hashed and stored on the ledger to ensure total transparency.
            </p>
          </div>
        </section>
        
      </main>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="fixed bottom-0 w-full z-50 bg-white border-t border-[#e2e2e5] md:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pb-safe">
        <div className="flex justify-around items-center h-16 w-full px-4">
          <button className="flex flex-col items-center justify-center text-[#74777f] hover:text-[#115cb9] transition-colors w-full h-full active:scale-95">
            <span className="material-symbols-outlined">home</span>
            <span className="text-[10px] font-bold mt-1">Home</span>
          </button>
          <button className="flex flex-col items-center justify-center bg-[#dbeafe] text-[#1e40af] rounded-full px-4 py-1 font-bold w-full h-full max-w-[80px] active:scale-95 transition-transform">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>ballot</span>
            <span className="text-[10px] font-bold mt-1">Elections</span>
          </button>
          <button className="flex flex-col items-center justify-center text-[#74777f] hover:text-[#115cb9] transition-colors w-full h-full active:scale-95">
            <span className="material-symbols-outlined">group</span>
            <span className="text-[10px] font-bold mt-1">Users</span>
          </button>
          <button className="flex flex-col items-center justify-center text-[#74777f] hover:text-[#115cb9] transition-colors w-full h-full active:scale-95" onClick={() => navigate('/admin/settings')}>
            <span className="material-symbols-outlined">settings</span>
            <span className="text-[10px] font-bold mt-1">Settings</span>
          </button>
        </div>
      </nav>

    </div>
  );
};
