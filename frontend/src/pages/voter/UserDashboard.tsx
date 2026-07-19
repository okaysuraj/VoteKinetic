import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { electionApi, ElectionSummary } from '../../api/client';

export const UserDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [elections, setElections] = useState<ElectionSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      electionApi.listActive(user).then(res => {
        setElections(res.elections);
      }).catch(err => {
        console.error("Failed to load elections", err);
      }).finally(() => {
        setLoading(false);
      });
    }
  }, [user]);

  return (
    <div className="bg-[#f9f9fc] text-[#1a1c1e] min-h-screen flex flex-col font-sans pb-16 md:pb-0">
      
      {/* TopAppBar */}
      <header className="w-full top-0 sticky z-50 bg-white border-b border-outline-variant shadow-sm transition-all">
        <div className="flex justify-between items-center px-4 md:px-10 py-4 max-w-[1200px] mx-auto">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-[28px]">verified_user</span>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-primary">VOTEKINETIC</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-[#f0f0f3] transition-colors relative">
              <span className="material-symbols-outlined text-on-surface-variant text-[24px]">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full border border-white"></span>
            </button>
            <span className="material-symbols-outlined text-primary text-[32px] cursor-pointer">account_circle</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow w-full max-w-[800px] mx-auto px-4 py-8 space-y-8">
        
        {/* Welcome Greeting */}
        <section className="space-y-2 animate-[fade-in_0.7s_ease-out]">
          <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">Welcome, Citizen</h2>
          <p className="text-base font-medium text-on-surface-variant">Your credentials have been successfully authenticated via sovereign-layer encryption.</p>
        </section>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          
          {/* Eligibility Status */}
          <div className="p-6 bg-white border border-outline-variant rounded-xl flex flex-col justify-between min-h-[160px] transition-all hover:shadow-md hover:border-primary/30">
            <div className="flex justify-between items-start">
              <span className="text-sm font-bold text-on-surface-variant uppercase tracking-widest">Current Eligibility Status</span>
              <span className="material-symbols-outlined text-secondary text-[24px]">verified_user</span>
            </div>
            <div>
              <div className="flex items-center gap-3 mt-4 mb-2">
                <div className="w-3.5 h-3.5 rounded-full bg-[#16a34a] shadow-[0_0_12px_rgba(22,163,74,0.6)] animate-pulse"></div>
                <span className="text-2xl font-bold text-[#16a34a] tracking-tight">Verified</span>
              </div>
              <p className="text-sm font-medium text-on-surface-variant">Validated until Dec 2026</p>
            </div>
          </div>

          {/* Identity Strength */}
          <div className="p-6 bg-[#dbeafe] text-[#1e40af] border border-[#bfdbfe] rounded-xl flex flex-col justify-between min-h-[160px] transition-all hover:shadow-md">
            <div className="flex justify-between items-start">
              <span className="text-sm font-bold uppercase tracking-widest opacity-80">Identity Strength</span>
              <span className="material-symbols-outlined text-[24px]">security</span>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold tracking-tight mb-2">High</div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-[#bfdbfe] rounded-full overflow-hidden">
                  <div className="w-full h-full bg-[#1d4ed8] rounded-full"></div>
                </div>
                <span className="text-sm font-bold">100%</span>
              </div>
              <p className="text-sm font-medium opacity-80 mt-3">256-bit encrypted secure tunnel</p>
            </div>
          </div>

          {/* Upcoming Elections */}
          <div className="md:col-span-2 p-6 bg-[#f9f9fc] border border-outline-variant rounded-xl space-y-6 transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-primary uppercase tracking-widest">Upcoming Elections</h3>
              <button 
                onClick={() => navigate('/voter/my-elections')}
                className="text-secondary font-bold text-sm hover:underline underline-offset-4"
              >
                View All
              </button>
            </div>
                        <div className="flex flex-col gap-4">
              {loading ? (
                <div className="p-4 text-center text-sm font-medium text-on-surface-variant">Loading elections...</div>
              ) : elections.length === 0 ? (
                <div className="p-4 text-center text-sm font-medium text-on-surface-variant">No active elections available at this time.</div>
              ) : elections.map(election => (
                <div 
                  key={election.id}
                  onClick={() => navigate(`/voter/election-pre-start/${election.id}`)}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 bg-white border border-outline-variant rounded-xl group hover:border-secondary transition-colors cursor-pointer shadow-sm gap-4 sm:gap-0"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg bg-[#f0f0f3] flex items-center justify-center shrink-0 group-hover:bg-[#dbeafe] transition-colors">
                      <span className="material-symbols-outlined text-primary text-[28px] group-hover:text-[#1d4ed8]">how_to_vote</span>
                    </div>
                    <div>
                      <div className="text-base font-bold text-[#1a1c1e] mb-1 group-hover:text-primary transition-colors">{election.title}</div>
                      <div className="text-xs font-medium text-on-surface-variant">{new Date(election.startDate).toLocaleDateString()} • {election.status}</div>
                    </div>
                  </div>
                  <div className="sm:text-right flex sm:block items-center">
                    <span className="px-4 py-1.5 bg-[#dcfce7] text-[#166534] border border-[#bbf7d0] text-[10px] rounded-full font-bold uppercase tracking-widest">{election.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="md:col-span-2 p-6 bg-white border border-outline-variant rounded-xl space-y-6 transition-all hover:shadow-md">
            <h3 className="text-sm font-bold text-primary uppercase tracking-widest">Recent Activity</h3>
            <div className="space-y-5">
              
              <div className="flex items-start gap-4">
                <div className="mt-1 w-8 h-8 rounded-full bg-[#f0f0f3] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-on-surface-variant text-[16px]">login</span>
                </div>
                <div className="flex-1 border-b border-outline-variant pb-4">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-sm font-bold text-[#1a1c1e]">Security login successful</span>
                    <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest whitespace-nowrap ml-2">2m ago</span>
                  </div>
                  <p className="text-xs font-medium text-on-surface-variant">IP 192.XXX.XX.81 â€¢ Chrome on MacOS</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 w-8 h-8 rounded-full bg-[#f0f0f3] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-on-surface-variant text-[16px]">history</span>
                </div>
                <div className="flex-1 border-b border-outline-variant pb-4">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-sm font-bold text-[#1a1c1e]">Credential validation audit</span>
                    <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest whitespace-nowrap ml-2">Yesterday</span>
                  </div>
                  <p className="text-xs font-medium text-on-surface-variant">Automated system check: PASS</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Atmospheric Visual Element (Institutional Background) */}
        <div className="relative w-full h-48 rounded-xl overflow-hidden mt-8 border border-outline-variant shadow-sm group">
          <div className="absolute inset-0 bg-[#0f172a]/70 z-10 transition-opacity group-hover:bg-[#0f172a]/60"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale opacity-50 group-hover:scale-105 transition-transform duration-1000"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 z-20 backdrop-blur-[1px]">
            <span className="material-symbols-outlined text-[#3b82f6] text-[40px] mb-3 drop-shadow-md" style={{ fontVariationSettings: "'FILL' 1" }}>encrypted</span>
            <h4 className="text-base font-bold text-white mb-2 tracking-wide">Active Protection Layer</h4>
            <p className="text-xs font-medium text-white/90 max-w-md leading-relaxed">
              Your session is being monitored for unauthorized access patterns. All biometric handshakes are end-to-end encrypted.
            </p>
          </div>
        </div>

      </main>

      {/* BottomNavBar */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center bg-white h-16 px-4 border-t border-outline-variant shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50 pb-safe">
        <a href="#" className="flex flex-col items-center justify-center bg-[#dbeafe] text-[#1e40af] rounded-full px-5 py-1 transition-transform active:scale-95 h-full w-full max-w-[80px]">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
          <span className="text-[10px] font-bold mt-1">Dashboard</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-transform active:scale-95 h-full w-full">
          <span className="material-symbols-outlined">lock_person</span>
          <span className="text-[10px] font-bold mt-1">Security</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-transform active:scale-95 h-full w-full">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-bold mt-1">Profile</span>
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
