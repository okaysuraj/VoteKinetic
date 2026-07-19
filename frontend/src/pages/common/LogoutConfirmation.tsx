import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LogoutConfirmation = () => {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    // Simulate secure logout processing
    setTimeout(() => {
      // In a real app, clear auth context/tokens here
      navigate('/login');
    }, 1200);
  };

  return (
    <div className="bg-[#f9f9fc] text-[#1a1c1e] font-sans min-h-screen flex flex-col relative overflow-hidden">
      
      {/* Subtle Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#dbeafe] opacity-30 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-[#fefce8] opacity-50 rounded-full blur-[100px]"></div>
      </div>

      {/* TopAppBar */}
      <header className="w-full top-0 sticky bg-white/80 backdrop-blur-md border-b border-outline-variant z-50">
        <div className="flex items-center justify-between px-4 md:px-10 py-4 max-w-[800px] mx-auto">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[28px]">verified_user</span>
            <span className="text-xl font-bold tracking-tight text-primary">VOTEKINETIC</span>
          </div>
          <button className="hover:bg-surface-container-low transition-colors p-2 rounded-full active:scale-95 text-on-surface-variant">
            <span className="material-symbols-outlined text-[24px]">help_outline</span>
          </button>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow flex items-center justify-center px-4 py-12 z-10">
        <div className="max-w-[440px] w-full bg-white border border-outline-variant p-8 md:p-10 rounded-xl text-center shadow-sm animate-[zoom-in_0.3s_ease-out]">
          
          {/* Security Icon Lockup */}
          <div className="mb-8 flex justify-center">
            <div className="w-16 h-16 rounded-full bg-[#f9f9fc] border border-outline-variant flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[32px] text-primary">logout</span>
            </div>
          </div>
          
          {/* Confirmation Message */}
          <h1 className="text-2xl font-bold text-[#1a1c1e] mb-3 tracking-tight">
            Confirm Logout
          </h1>
          <p className="text-sm font-medium text-on-surface-variant mb-10 leading-relaxed">
            Are you sure you want to end your current secure session? Your unsubmitted ballot progress may be lost.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col gap-4">
            {/* Logout (Destructive/Primary Intent) */}
            <button 
              className="w-full h-14 bg-primary text-white font-bold text-sm rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-all active:scale-95 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? (
                <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
              ) : (
                <span>Logout</span>
              )}
            </button>
            
            {/* Cancel (Dismissal) */}
            <button 
              className="w-full h-14 border border-outline-variant bg-white text-primary font-bold text-sm rounded-lg flex items-center justify-center gap-2 hover:bg-[#f9f9fc] transition-all active:scale-95 shadow-sm"
              onClick={() => navigate(-1)}
              disabled={isLoggingOut}
            >
              <span>Cancel</span>
            </button>
          </div>
          
          {/* Security Assurance */}
          <div className="mt-10 flex items-center justify-center gap-2 text-on-surface-variant opacity-70">
            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
            <span className="text-[10px] font-bold uppercase tracking-widest">Session Data Encrypted</span>
          </div>
          
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 bg-[#f9f9fc] border-t border-outline-variant z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 px-4 max-w-[800px] mx-auto text-center md:text-left">
          <div className="flex flex-col gap-1">
            <div className="text-sm font-bold text-[#1a1c1e]">VOTEKINETIC</div>
            <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">© 2024 VOTEKINETIC - Secured by State-Grade Encryption</div>
          </div>
          <nav className="flex flex-wrap justify-center gap-4 md:gap-6">
            <a href="#" className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest hover:text-primary transition-colors">Security Audit</a>
          </nav>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes zoom-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}} />
    </div>
  );
};
