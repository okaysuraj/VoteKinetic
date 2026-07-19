import { useState } from 'react';

export const NotificationsInbox = () => {
    const [activeFilter, setActiveFilter] = useState('All');
  
  // State for read status of notifications
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'alert', title: '2024 General Election: Early Results', time: '1h ago', content: 'The preliminary results for the 2024 General Election are now available for viewing. Note: These results are not yet certified by the board.', unread: true, action: 'View Dashboard' },
    { id: 2, type: 'campaign', title: 'Maintenance Notice', time: '5h ago', content: 'Scheduled maintenance will occur on Saturday from 2:00 AM to 4:00 AM EST. Access to the voting portal may be intermittent during this window.', unread: true },
    { id: 3, type: 'verified', title: 'Ballot Successfully Cast', time: 'Yesterday', content: "Your ballot for the 'City Planning Committee' has been encrypted and recorded. Transaction ID: #VK-8842-X9.", unread: false },
    { id: 4, type: 'event', title: 'Voter Registration Deadline', time: '2 days ago', content: 'This is a reminder that the deadline for new voter registration for the upcoming local elections is in 7 days.', unread: false },
    { id: 5, type: 'key', title: 'Password Successfully Changed', time: '1 week ago', content: 'Your VOTEKINETIC account password was successfully updated. No further action is required.', unread: false },
  ]);

  const markAsRead = (id: number) => {
    setNotifications(notifications.map((n: any) => 
      n.id === id ? { ...n, unread: false } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n: any) => ({ ...n, unread: false })));
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
              <a href="#" className="text-sm font-bold text-on-surface-variant hover:text-primary transition-colors">Profile</a>
              <a href="#" className="text-sm font-bold text-primary border-b-2 border-primary py-1 relative">
                Inbox
                {notifications.some((n: any) => n.unread) && (
                  <span className="absolute -top-1 -right-3 w-2 h-2 bg-secondary rounded-full"></span>
                )}
              </a>
            </nav>
            <div className="w-8 h-8 rounded-full bg-[#f0f0f3] flex items-center justify-center relative cursor-pointer md:hidden">
              <span className="material-symbols-outlined text-on-surface-variant text-[20px]">notifications</span>
              {notifications.some((n: any) => n.unread) && (
                <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-secondary rounded-full border-2 border-white"></div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow w-full max-w-[800px] mx-auto px-4 py-8 md:py-12">
        
        {/* Header & Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2 tracking-tight">System Inbox</h1>
            <p className="text-sm font-medium text-on-surface-variant">Secure alerts, confirmations, and institutional notices.</p>
          </div>
          <button 
            className="text-secondary font-bold text-sm flex items-center gap-2 hover:bg-[#f0f0f3] px-3 py-2 rounded-lg transition-colors w-fit"
            onClick={markAllAsRead}
          >
            <span className="material-symbols-outlined text-[18px]">done_all</span>
            Mark all as read
          </button>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 sm:gap-3 mb-8 overflow-x-auto no-scrollbar pb-2">
          {['All', 'Unread', 'Alerts', 'System'].map(filter => (
            <button
              key={filter}
              className={`px-4 md:px-5 py-2 md:py-2.5 rounded-full font-bold text-xs md:text-sm transition-all whitespace-nowrap active:scale-95 ${
                activeFilter === filter 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'bg-white border border-outline-variant text-on-surface-variant hover:bg-[#f0f0f3]'
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          
          {notifications.filter((n: any) => activeFilter === 'All' || (activeFilter === 'Unread' && n.unread)).length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-20 text-center animate-[fade-in_0.3s_ease-out]">
              <span className="material-symbols-outlined text-6xl text-[#e2e2e5] mb-4">mail_outline</span>
              <h3 className="text-xl font-bold text-[#1a1c1e] mb-2">All caught up!</h3>
              <p className="text-sm font-medium text-on-surface-variant max-w-xs mx-auto leading-relaxed">
                There are no new notifications at this time. We'll alert you when something important happens.
              </p>
            </div>
          ) : (
            notifications.filter((n: any) => activeFilter === 'All' || (activeFilter === 'Unread' && n.unread)).map((notification: any) => (
              
              <div 
                key={notification.id}
                className={`group relative bg-white border border-outline-variant p-4 md:p-5 rounded-xl hover:shadow-md transition-all cursor-pointer ${notification.unread ? 'border-l-4 border-l-secondary bg-[#fff7ed]' : 'hover:bg-[#f9f9fc]'}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex gap-4 md:gap-5">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${notification.unread ? 'bg-[#dbeafe] text-[#1d4ed8]' : 'bg-[#f0f0f3] text-[#4b5563]'}`}>
                    <span className="material-symbols-outlined text-[24px]">{notification.type}</span>
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-1 gap-2">
                      <h3 className={`text-base md:text-lg text-[#1a1c1e] ${notification.unread ? 'font-bold' : 'font-semibold'}`}>
                        {notification.title}
                      </h3>
                      <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest whitespace-nowrap mt-1">
                        {notification.time}
                      </span>
                    </div>
                    
                    <p className={`text-sm md:text-base leading-relaxed ${notification.unread ? 'text-[#1a1c1e] font-medium' : 'text-on-surface-variant font-normal'}`}>
                      {notification.content}
                    </p>
                    
                    {notification.action && (
                      <div className="mt-4">
                        <button className="bg-white border border-outline-variant px-4 py-2 rounded-lg font-bold text-sm text-primary hover:bg-[#f9f9fc] transition-colors shadow-sm active:scale-95">
                          {notification.action}
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {notification.unread && (
                    <div className="w-2.5 h-2.5 bg-secondary rounded-full mt-2 shrink-0 shadow-sm animate-pulse"></div>
                  )}
                </div>
              </div>
            ))
          )}

        </div>

      </main>

      {/* BottomNavBar */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 px-4 bg-white border-t border-outline-variant shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pb-safe">
        <a href="#" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors flex-1 h-full active:scale-95">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px] font-bold mt-1">Dashboard</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors flex-1 h-full active:scale-95">
          <span className="material-symbols-outlined">ballot</span>
          <span className="text-[10px] font-bold mt-1">Elections</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors flex-1 h-full active:scale-95">
          <span className="material-symbols-outlined">analytics</span>
          <span className="text-[10px] font-bold mt-1">Results</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors flex-1 h-full active:scale-95">
          <span className="material-symbols-outlined">verified_user</span>
          <span className="text-[10px] font-bold mt-1">Audit</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center text-secondary font-bold hover:text-secondary-dark transition-colors flex-1 h-full active:scale-95 relative">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>mail</span>
          <span className="text-[10px] font-bold mt-1">Inbox</span>
          {notifications.some((n: any) => n.unread) && (
            <span className="absolute top-2 right-1/4 w-2 h-2 bg-secondary rounded-full border border-white"></span>
          )}
        </a>
      </nav>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
};
