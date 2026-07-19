import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ProfileOverview = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface-container-lowest pb-20 md:pb-0">
      {/* Header */}
      <header className="bg-surface border-b border-outline-variant sticky top-0 z-40 px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
          <h1 className="font-headline-md text-primary font-bold tracking-tight">VOTEKINETIC</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-surface-container transition-colors" onClick={() => navigate('/voter/profile')}>
            <span className="material-symbols-outlined text-on-surface-variant text-[28px]">account_circle</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[800px] mx-auto px-4 py-8 w-full">
        
        {/* Profile Header Section */}
        <section className="flex flex-col items-center text-center mb-8">
          <div className="relative mb-6 group cursor-pointer">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-surface-container-high border-2 border-outline-variant flex items-center justify-center overflow-hidden group-hover:border-primary transition-colors">
              <span className="material-symbols-outlined text-outline-variant text-[64px]" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 md:w-10 md:h-10 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center">
              <span className="material-symbols-outlined text-sm md:text-base">edit</span>
            </button>
          </div>
          <h2 className="text-3xl font-bold text-on-surface mb-1">Jane Doe</h2>
          <p className="text-sm font-medium text-on-surface-variant">Institutional Administrator</p>
        </section>

        {/* Profile Information Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          
          {/* Identity Card */}
          <div className="bg-surface border border-outline-variant rounded-xl p-6 flex flex-col gap-4 shadow-sm hover:-translate-y-0.5 transition-transform">
            <div className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-sm">badge</span>
              <span className="text-xs font-bold uppercase tracking-widest">Identity Details</span>
            </div>
            <div>
              <label className="text-xs font-bold text-on-surface-variant mb-1 block">Full Name</label>
              <p className="text-lg text-on-surface font-bold">Jane Doe</p>
            </div>
            <div className="mt-2">
              <label className="text-xs font-bold text-on-surface-variant mb-1 block">Voter Registration ID</label>
              <div className="flex items-center gap-2">
                <code className="font-mono bg-surface-container-lowest border border-outline-variant px-2 py-1 rounded text-primary text-sm font-bold">VK-8842-X</code>
                <span 
                  className={`material-symbols-outlined cursor-pointer transition-colors ${copied ? 'text-[#16a34a]' : 'text-secondary hover:text-primary'}`} 
                  onClick={handleCopy}
                >
                  {copied ? 'done' : 'content_copy'}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Card */}
          <div className="bg-surface border border-outline-variant rounded-xl p-6 flex flex-col gap-4 shadow-sm hover:-translate-y-0.5 transition-transform">
            <div className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-sm">alternate_email</span>
              <span className="text-xs font-bold uppercase tracking-widest">System Communication</span>
            </div>
            <div>
              <label className="text-xs font-bold text-on-surface-variant mb-1 block">Institutional Email</label>
              <p className="text-lg text-on-surface font-bold">j.doe@agency.gov</p>
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-[#15803d] bg-[#f0fdf4] w-fit px-3 py-1.5 rounded-full border border-[#bbf7d0]">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">Verified Agency Personnel</span>
            </div>
          </div>

          {/* Security Status */}
          <div className="md:col-span-2 bg-[#f0fdf4] text-[#166534] rounded-xl p-6 flex items-center justify-between border border-[#bbf7d0] shadow-sm">
            <div className="flex items-center gap-4">
              <div className="bg-[#22c55e] p-3 rounded-xl text-white shadow-sm">
                <span className="material-symbols-outlined">security</span>
              </div>
              <div>
                <h4 className="text-sm font-bold mb-0.5">Encrypted Session Active</h4>
                <p className="text-xs font-medium opacity-80">Last login: Today, 09:42 AM from 192.168.1.1</p>
              </div>
            </div>
            <span className="material-symbols-outlined hidden md:block opacity-60">chevron_right</span>
          </div>
          
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button className="w-full h-12 bg-primary text-white rounded-lg font-bold text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95">
            <span className="material-symbols-outlined">edit_square</span>
            Edit Profile
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button className="w-full h-12 bg-surface border border-outline-variant text-on-surface rounded-lg font-bold text-sm hover:bg-surface-container-low transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95">
              <span className="material-symbols-outlined">lock_reset</span>
              Change Password
            </button>
            <button className="w-full h-12 bg-surface border border-outline-variant text-on-surface rounded-lg font-bold text-sm hover:bg-surface-container-low transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95">
              <span className="material-symbols-outlined">notifications</span>
              Notification Preferences
            </button>
          </div>
        </div>

        {/* Security Disclaimer */}
        <div className="mt-8 p-6 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm">
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-secondary shrink-0">info</span>
            <p className="text-sm font-medium text-on-surface-variant leading-relaxed">
              Personal data is encrypted and stored in compliance with VK-Institutional security protocols. Changes to your full name or registration ID may require manual verification by the central board.
            </p>
          </div>
        </div>

      </main>

      {/* Bottom Nav Bar */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center bg-surface border-t border-outline-variant h-16 pb-safe z-50 md:hidden">
        <a href="/voter/dashboard" onClick={(e) => { e.preventDefault(); navigate('/voter/dashboard'); }} className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors w-full h-full">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px] font-bold mt-1">Dashboard</span>
        </a>
        <a href="/voter/security" onClick={(e) => { e.preventDefault(); navigate('/voter/security'); }} className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors w-full h-full">
          <span className="material-symbols-outlined">lock_person</span>
          <span className="text-[10px] font-bold mt-1">Security</span>
        </a>
        <a href="/voter/profile" onClick={(e) => e.preventDefault()} className="flex flex-col items-center justify-center text-primary font-bold transition-colors w-full h-full">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
          <span className="text-[10px] font-bold mt-1">Profile</span>
        </a>
      </nav>

    </div>
  );
};
