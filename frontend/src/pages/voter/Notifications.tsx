import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Notifications = () => {
  const [activeNotification, setActiveNotification] = useState<number>(1);

  return (
    <div className="bg-surface text-on-surface flex flex-col min-h-screen">
      {/* TopNavBar */}
      <header className="bg-surface border-b border-outline-variant w-full top-0 sticky z-50">
        <div className="flex justify-between items-center px-4 md:px-10 py-4 w-full max-w-[1440px] mx-auto">
          <Link to="/dashboard" className="font-headline-md text-headline-md font-bold text-primary">VOTEKINETIC</Link>
          <div className="flex items-center gap-4">
            <Link to="/voter/notifications" className="material-symbols-outlined p-2 text-secondary border-b-2 border-secondary pb-1">notifications</Link>
            <Link to="/voter/profile" className="material-symbols-outlined p-2 text-on-surface-variant hover:text-primary transition-colors">account_circle</Link>
          </div>
        </div>
      </header>
      
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-10 py-8">
        {/* Inbox Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-primary mb-2">Notifications Inbox</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">Manage your institutional alerts and system updates.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-secondary font-label-md text-label-md hover:underline">
              <span className="material-symbols-outlined text-[18px]">done_all</span>
              Mark all as read
            </button>
          </div>
        </div>
        
        {/* Master-Detail Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden min-h-[700px] shadow-sm">
          {/* Left Column: Master List */}
          <div className="md:col-span-5 border-r border-outline-variant flex flex-col bg-surface-container-low">
            {/* Tabs */}
            <div className="flex border-b border-outline-variant bg-surface">
              <button className="flex-1 py-4 font-label-md text-label-md text-secondary border-b-2 border-secondary bg-secondary/5">All</button>
              <button className="flex-1 py-4 font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">Unread</button>
              <button className="flex-1 py-4 font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">Archived</button>
            </div>
            
            {/* Search/Filter within List */}
            <div className="p-4 border-b border-outline-variant bg-surface">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
                <input className="w-full pl-10 pr-4 py-2 bg-surface-container-high border-none rounded-lg text-body-md focus:ring-2 focus:ring-secondary/20 outline-none" placeholder="Search notifications..." type="text"/>
              </div>
            </div>
            
            {/* Scrollable List */}
            <div className="flex-1 overflow-y-auto">
              {/* Notification Card 1 */}
              <div 
                className={`p-4 border-b border-outline-variant cursor-pointer transition-all group ${activeNotification === 1 ? 'bg-secondary-fixed/30 border-l-4 border-l-secondary' : 'hover:bg-surface-container-highest'}`}
                onClick={() => setActiveNotification(1)}
              >
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-error-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-error">security</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-label-md text-label-md text-on-surface truncate pr-2">New Login Detected</h3>
                      <span className="font-label-sm text-label-sm text-outline shrink-0">2m ago</span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 mb-2">A successful login was recorded from an unrecognized IP address (192.168.1.45) in Geneva, Switzerland.</p>
                    <div className="flex gap-4">
                      <span className="text-secondary font-label-sm text-label-sm font-bold">Review Activity</span>
                    </div>
                  </div>
                  {activeNotification !== 1 && <div className="w-2 h-2 rounded-full bg-secondary shrink-0 mt-2"></div>}
                </div>
              </div>
              
              {/* Notification Card 2 */}
              <div 
                className={`p-4 border-b border-outline-variant cursor-pointer transition-all group ${activeNotification === 2 ? 'bg-secondary-fixed/30 border-l-4 border-l-secondary' : 'hover:bg-surface-container-highest'}`}
                onClick={() => setActiveNotification(2)}
              >
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-on-secondary-fixed-variant">how_to_vote</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-label-md text-label-md text-on-surface truncate pr-2">Vote Confirmation</h3>
                      <span className="font-label-sm text-label-sm text-outline shrink-0">1h ago</span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 mb-2">Your ballot for the 2024 General Election has been successfully recorded in the secure ledger.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
          
          {/* Right Column: Detail View */}
          <div className="md:col-span-7 flex flex-col bg-surface" id="detail-view">
            {activeNotification === 1 ? (
              <>
                {/* Detail Header */}
                <div className="p-8 border-b border-outline-variant flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-error-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-error text-[32px]">security</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 bg-error-container text-on-error-container font-label-sm text-label-sm rounded">High Priority</span>
                        <span className="font-label-sm text-label-sm text-outline">Ref: SEC-9942</span>
                      </div>
                      <h2 className="font-headline-md text-headline-md text-primary">New Login Detected</h2>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </div>
                
                {/* Detail Content */}
                <div className="flex-1 p-8 overflow-y-auto">
                  <div className="max-w-[600px]">
                    <div className="mb-8">
                      <p className="font-label-md text-label-md text-on-surface mb-2">Timestamp: <span className="font-normal text-on-surface-variant">Just now</span></p>
                      <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                        Our security monitoring system has flagged a successful authentication event that deviates from your typical access patterns. Please review the details below immediately to ensure your account integrity.
                      </p>
                    </div>
                    
                    {/* Data Grid for Login Info */}
                    <div className="grid grid-cols-2 gap-6 p-4 bg-surface-container-low border border-outline-variant rounded-lg mb-8">
                      <div>
                        <span className="font-label-sm text-label-sm text-outline block mb-1">IP Address</span>
                        <span className="font-body-md text-body-md text-on-surface font-semibold">192.168.1.45</span>
                      </div>
                      <div>
                        <span className="font-label-sm text-label-sm text-outline block mb-1">Location</span>
                        <span className="font-body-md text-body-md text-on-surface font-semibold">Geneva, Switzerland</span>
                      </div>
                      <div>
                        <span className="font-label-sm text-label-sm text-outline block mb-1">Device</span>
                        <span className="font-body-md text-body-md text-on-surface font-semibold">Chrome v119 on MacOS</span>
                      </div>
                      <div>
                        <span className="font-label-sm text-label-sm text-outline block mb-1">Auth Method</span>
                        <span className="font-body-md text-body-md text-on-surface font-semibold">2FA - TOTP Verified</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                      <button className="bg-primary text-on-primary px-6 py-3 font-label-md text-label-md rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                        <span className="material-symbols-outlined">verified_user</span>
                        Yes, it was me
                      </button>
                      <button className="border border-error text-error px-6 py-3 font-label-md text-label-md rounded-lg flex items-center justify-center gap-2 hover:bg-error/5 transition-colors">
                        <span className="material-symbols-outlined">lock_reset</span>
                        No, secure my account
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Detail Header */}
                <div className="p-8 border-b border-outline-variant flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-secondary-fixed flex items-center justify-center">
                      <span className="material-symbols-outlined text-secondary text-[32px]">how_to_vote</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-label-sm text-label-sm text-outline">Ref: VT-100</span>
                      </div>
                      <h2 className="font-headline-md text-headline-md text-primary">Vote Confirmation</h2>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </div>
                
                {/* Detail Content */}
                <div className="flex-1 p-8 overflow-y-auto">
                  <div className="max-w-[600px]">
                    <div className="mb-8">
                      <p className="font-label-md text-label-md text-on-surface mb-2">Timestamp: <span className="font-normal text-on-surface-variant">1h ago</span></p>
                      <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                        Your ballot for the 2024 General Election has been successfully recorded in the secure ledger. You can view your vote receipt in your profile.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low border-t border-outline-variant mt-8">
        <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-10 py-4 w-full max-w-[1440px] mx-auto gap-4">
          <div className="text-center md:text-left">
            <div className="font-label-md text-label-md font-bold text-on-surface mb-1">VOTEKINETIC</div>
            <p className="font-label-sm text-label-sm text-on-surface-variant max-w-[400px]">© 2024 VOTEKINETIC Institutional Voting Systems.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary hover:underline transition-all" href="#">Security Protocol</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary hover:underline transition-all" href="#">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
