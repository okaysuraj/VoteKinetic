import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const BroadcastHistory = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

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
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>history</span>
              <span className="font-bold text-xs uppercase tracking-wider">Communication Center</span>
            </div>
            <h1 className="text-3xl font-bold text-on-surface tracking-tight mb-2">Broadcast History</h1>
            <p className="text-on-surface-variant text-sm max-w-xl">
              Immutable log of all official communications sent to the electorate and administrative staff.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <button className="h-10 px-4 border border-outline-variant text-on-surface-variant font-bold rounded-lg hover:bg-surface-container-high transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
              Filters
            </button>
            <button 
              className="h-10 px-4 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-2"
              onClick={() => navigate('/admin/broadcasts/new')}
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              New Broadcast
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-surface border border-outline-variant p-4 rounded-xl flex flex-col justify-center">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Total Sent</span>
            <span className="text-2xl font-bold text-on-surface">1,204</span>
          </div>
          <div className="bg-surface border border-outline-variant p-4 rounded-xl flex flex-col justify-center">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Delivered</span>
            <span className="text-2xl font-bold text-[#16a34a]">99.8%</span>
          </div>
          <div className="bg-surface border border-outline-variant p-4 rounded-xl flex flex-col justify-center">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Open Rate</span>
            <span className="text-2xl font-bold text-primary">76.2%</span>
          </div>
          <div className="bg-surface border border-outline-variant p-4 rounded-xl flex flex-col justify-center">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Bounced</span>
            <span className="text-2xl font-bold text-[#dc2626]">0.2%</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative group">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors">search</span>
          <input 
            type="text" 
            placeholder="Search by subject, recipient, or broadcast ID..." 
            className="w-full h-12 pl-12 pr-4 bg-surface border border-outline-variant rounded-xl focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none font-medium text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Broadcast List */}
        <div className="flex flex-col gap-3">
          
          {/* Item 1 */}
          <div className="flex items-center gap-4 p-5 bg-surface border border-outline-variant rounded-xl hover:shadow-sm transition-all cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>campaign</span>
            </div>
            <div className="flex-grow min-w-0">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-1">
                <h4 className="font-bold text-on-surface text-sm truncate">Election Day Procedures Update: Central Region</h4>
                <span className="inline-flex px-2 py-0.5 bg-[#f0fdf4] text-[#15803d] border border-[#bbf7d0] rounded text-[10px] font-bold uppercase tracking-wider w-fit">Delivered</span>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-on-surface-variant mt-1">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">group</span> 24,500 Voters</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">event</span> Oct 24, 2023 • 09:00 AM</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">mail</span> Email + Push</span>
              </div>
            </div>
            <button className="w-8 h-8 rounded-full hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant transition-colors shrink-0">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>

          {/* Item 2 */}
          <div className="flex items-center gap-4 p-5 bg-surface border border-outline-variant rounded-xl hover:shadow-sm transition-all cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>build</span>
            </div>
            <div className="flex-grow min-w-0">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-1">
                <h4 className="font-bold text-on-surface text-sm truncate">System Maintenance: Scheduled Outage Notification</h4>
                <span className="inline-flex px-2 py-0.5 bg-[#f0fdf4] text-[#15803d] border border-[#bbf7d0] rounded text-[10px] font-bold uppercase tracking-wider w-fit">Delivered</span>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-on-surface-variant mt-1">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">group</span> 12,400 Staff</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">event</span> Oct 20, 2023 • 11:30 PM</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">sms</span> SMS</span>
              </div>
            </div>
            <button className="w-8 h-8 rounded-full hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant transition-colors shrink-0">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>

          {/* Item 3 */}
          <div className="flex items-center gap-4 p-5 bg-surface border border-outline-variant rounded-xl hover:shadow-sm transition-all cursor-pointer opacity-70">
            <div className="w-12 h-12 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">drafts</span>
            </div>
            <div className="flex-grow min-w-0">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-1">
                <h4 className="font-bold text-on-surface text-sm truncate">Volunteer Training: Session #4 Resources</h4>
                <span className="inline-flex px-2 py-0.5 bg-surface-container-highest text-on-surface-variant border border-outline-variant rounded text-[10px] font-bold uppercase tracking-wider w-fit">Draft</span>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-on-surface-variant mt-1">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">group</span> 450 Volunteers</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">edit</span> Last edit Oct 18, 2023</span>
              </div>
            </div>
            <button className="w-8 h-8 rounded-full hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant transition-colors shrink-0">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>

          {/* Item 4 */}
          <div className="flex items-center gap-4 p-5 bg-surface border border-outline-variant rounded-xl hover:shadow-sm transition-all cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-[#fef2f2] text-[#ef4444] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>emergency</span>
            </div>
            <div className="flex-grow min-w-0">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-1">
                <h4 className="font-bold text-on-surface text-sm truncate">URGENT: Polling Station #42 Closure Alert</h4>
                <span className="inline-flex px-2 py-0.5 bg-[#f0fdf4] text-[#15803d] border border-[#bbf7d0] rounded text-[10px] font-bold uppercase tracking-wider w-fit">Delivered</span>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-on-surface-variant mt-1">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">group</span> 5,200 District Voters</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">event</span> Oct 12, 2023 • 08:15 AM</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">all_out</span> All Channels</span>
              </div>
            </div>
            <button className="w-8 h-8 rounded-full hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant transition-colors shrink-0">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>

        </div>

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-between py-4 border-t border-outline-variant">
          <span className="text-xs text-on-surface-variant font-medium">Showing 1 to 4 of 42 entries</span>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition-colors disabled:opacity-30" disabled>
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-primary text-white font-bold text-sm">1</button>
            <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition-colors text-sm font-medium">2</button>
            <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition-colors text-sm font-medium">3</button>
            <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>

      </main>

    </div>
  );
};
