import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ObserverElectionList = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');

  return (
    <div className="flex flex-col min-h-screen bg-background">
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
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-on-surface tracking-tight">Election Registry</h1>
            <p className="text-on-surface-variant mt-1">Monitor live and past elections for cryptographic integrity.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="h-12 w-12 rounded-lg bg-surface-container border border-outline-variant flex items-center justify-center hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined">search</span>
            </button>
            <button className="h-12 w-12 rounded-lg bg-surface-container border border-outline-variant flex items-center justify-center hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined">filter_list</span>
            </button>
          </div>
        </header>

        <div className="flex overflow-x-auto gap-2 pb-2 hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
          {['All', 'Live', 'Tallying', 'Closed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`whitespace-nowrap px-6 py-2 rounded-full font-bold text-sm transition-colors border ${filter === f ? 'bg-on-surface text-surface border-on-surface' : 'bg-surface border-outline-variant text-on-surface-variant hover:bg-surface-container-low'}`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <div className="bg-surface border border-outline-variant p-6 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-shadow group cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary shrink-0 group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                <span className="material-symbols-outlined">groups</span>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-xl font-bold text-primary">Public Health Advisory Council</h3>
                  <span className="px-3 py-0.5 rounded-full bg-[#dcfce7] text-[#166534] text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] animate-pulse"></span> Live
                  </span>
                </div>
                <p className="text-on-surface-variant text-sm">Community-led selection for regional health policy coordinators.</p>
                <div className="mt-3 flex items-center gap-4 text-xs text-outline">
                  <span className="flex items-center gap-1 font-medium"><span className="material-symbols-outlined text-sm">how_to_vote</span> 42k Votes Cast</span>
                </div>
              </div>
            </div>
            <button className="h-12 px-8 bg-primary text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shrink-0 shadow-sm" onClick={() => navigate('/observer/audit')}>
              Monitor <span className="material-symbols-outlined text-[20px]">monitoring</span>
            </button>
          </div>

          <div className="bg-surface-container-low border border-outline-variant p-6 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-shadow group cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center text-secondary shrink-0">
                <span className="material-symbols-outlined">analytics</span>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-xl font-bold text-on-surface">State Representatives 2024</h3>
                  <span className="px-3 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                    <span className="material-symbols-outlined text-[10px] animate-spin">sync</span> Tallying
                  </span>
                </div>
                <p className="text-on-surface-variant text-sm">District representative selection for the 8th term. Cryptographic verification in progress.</p>
                <div className="mt-3 flex items-center gap-4 text-xs text-outline font-medium">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">hourglass_empty</span> 82% Verified</span>
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">schedule</span> Est: 12:45 PM</span>
                </div>
              </div>
            </div>
            <button className="h-12 px-8 border-2 border-secondary text-secondary font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-secondary/10 transition-colors shrink-0" onClick={() => navigate('/observer/tally-audit')}>
              Audit <span className="material-symbols-outlined text-[20px]">verified</span>
            </button>
          </div>

          <div className="bg-surface-container-low border border-outline-variant p-6 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-shadow group opacity-80 hover:opacity-100 cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center text-outline shrink-0">
                <span className="material-symbols-outlined">lock</span>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-xl font-bold text-on-surface">Municipal Zoning Board Election</h3>
                  <span className="px-3 py-0.5 rounded-full bg-surface-variant text-on-surface-variant text-[10px] font-bold uppercase tracking-widest">
                    Closed
                  </span>
                </div>
                <p className="text-on-surface-variant text-sm">City planning and development oversight committee. Final results published.</p>
                <div className="mt-3 flex items-center gap-4 text-xs text-outline font-medium">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">event_available</span> June 12, 2024</span>
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">inventory</span> Archivally Sealed</span>
                </div>
              </div>
            </div>
            <button className="h-12 px-8 bg-surface-variant text-on-surface-variant font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-outline-variant transition-colors shrink-0" onClick={() => navigate('/observer/results')}>
              View Archive <span className="material-symbols-outlined text-[20px]">history</span>
            </button>
          </div>
        </div>

        <div className="mt-8 p-6 bg-surface-container rounded-xl border border-outline-variant flex flex-col md:flex-row gap-6 items-center shadow-sm">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-outline-variant hidden md:block">
            <div className="w-16 h-16 relative overflow-hidden rounded bg-gray-100" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBLsY2fIu2qreNAOtHdHOLxB9_YB-poB3s_Axmc_SrMZGI5Os45MlYc8mn1Dqxcc_drZ0TlS-Oc0N4z4uEc0er1Cm7YGlfBeXq_SZWaIRFCaFzqrDkhGYS95KptXyjNWg-EYJ-d9DoDUdTney9qOHK2Ky2InAWY9F56mMRP_VWirMVvyhC-gvyTDBtIPjXf-spOoywBO76TWCQPZ1v_K9CZJ1amkKAebojDSJNOtE5AI5-9M7WKaYGCqw')", backgroundSize: 'cover' }}></div>
          </div>
          <div className="flex-1">
            <h4 className="text-primary text-xs font-bold mb-1 uppercase tracking-widest">Observer Protocol</h4>
            <p className="text-on-surface-variant text-sm leading-relaxed">Real-time monitoring is subject to the Transparency Act 2024. All observation sessions are cryptographically logged for accountability.</p>
          </div>
          <button className="text-secondary font-bold text-sm hover:underline flex items-center gap-1 shrink-0">
            View Guidelines <span className="material-symbols-outlined text-sm">open_in_new</span>
          </button>
        </div>

      </main>
    </div>
  );
};
