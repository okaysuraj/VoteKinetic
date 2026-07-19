import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const SecuritySessionManagement = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(true);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="bg-surface border-b border-outline-variant sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-4 md:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
            <span className="material-symbols-outlined text-primary">shield_person</span>
            <span className="font-headline-md text-headline-md font-bold tracking-tight text-primary hidden sm:block">VOTEKINETIC</span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 text-on-surface-variant hover:bg-surface-container rounded-md font-label-md transition-colors"
            >
              Dashboard
            </button>
            <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold">
              {user?.email?.[0].toUpperCase() || 'U'}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[800px] mx-auto w-full px-4 py-8 space-y-8 flex-grow">
        <header className="mb-6">
          <h1 className="font-headline-lg text-3xl md:text-4xl text-primary font-bold">Security Settings</h1>
          <p className="font-body-md text-on-surface-variant mt-2">Manage your device authentication and monitor access to your voting profile.</p>
        </header>

        <section className="space-y-4">
          <h2 className="font-label-md uppercase tracking-wider text-outline font-bold">Active Sessions</h2>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                <span className="material-symbols-outlined">desktop_windows</span>
              </div>
              <div>
                <p className="font-label-md font-bold text-on-surface">Web Browser (Current Device)</p>
                <p className="text-sm text-on-surface-variant">Last active just now &bull; Secure Node</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">Active Now</span>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-label-md uppercase tracking-wider text-outline font-bold">Device History</h2>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 flex items-center justify-between hover:bg-surface-container-low transition-colors duration-200 cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
                  <span className="material-symbols-outlined">smartphone</span>
                </div>
                <div>
                  <p className="font-label-md font-bold text-on-surface">Mobile App</p>
                  <p className="text-sm text-on-surface-variant">Unknown Location &bull; Oct 23, 2023</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline">chevron_right</span>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-label-md uppercase tracking-wider text-outline font-bold">Security Actions</h2>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl divide-y divide-outline-variant shadow-sm">
            
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-on-surface-variant">lock_reset</span>
                <span className="font-body-md font-bold text-on-surface">Change Password</span>
              </div>
              <button className="bg-primary text-white font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity">Update</button>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-on-surface-variant">verified_user</span>
                <div>
                  <p className="font-body-md font-bold text-on-surface">Two-Factor Authentication</p>
                  <p className="text-sm text-on-surface-variant">{twoFactorEnabled ? 'Enabled via TOTP' : 'Disabled'}</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={twoFactorEnabled} 
                  onChange={() => setTwoFactorEnabled(!twoFactorEnabled)} 
                />
                <div className="w-11 h-6 bg-outline-variant rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
              </label>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-on-surface-variant">fingerprint</span>
                <div>
                  <p className="font-body-md font-bold text-on-surface">WebAuthn / Biometric</p>
                  <p className="text-sm text-on-surface-variant">{biometricEnabled ? 'Passkey Active' : 'Disabled'}</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={biometricEnabled} 
                  onChange={() => setBiometricEnabled(!biometricEnabled)} 
                />
                <div className="w-11 h-6 bg-outline-variant rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
              </label>
            </div>

          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-label-md uppercase tracking-wider text-outline font-bold">Audit Log</h2>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm">
            <p className="text-sm text-on-surface-variant mb-4 leading-relaxed">
              Every action taken on your account is cryptographically signed and stored in an immutable ledger to ensure full transparency.
            </p>
            <Link to="/voter/logs" className="inline-flex items-center gap-1 text-secondary font-bold hover:underline">
              View full cryptographic audit trail
              <span className="material-symbols-outlined text-lg">open_in_new</span>
            </Link>
          </div>
        </section>

        <div className="bg-primary text-on-primary rounded-xl p-8 relative overflow-hidden mt-8 shadow-lg">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-2">Institutional Grade Encryption</h3>
            <p className="text-on-primary-container opacity-90 max-w-md leading-relaxed">
              Your votes and session data are protected by post-quantum encryption standards. VOTEKINETIC ensures your digital identity remains sovereign.
            </p>
          </div>
          <div className="absolute -right-8 -bottom-8 opacity-10">
            <span className="material-symbols-outlined text-[120px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
          </div>
        </div>

      </main>

      <footer className="w-full mt-auto bg-surface border-t border-outline-variant">
        <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="text-on-surface-variant opacity-80 hover:opacity-100 transition-opacity">
            &copy; 2024 VOTEKINETIC Secure Systems.
          </div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="#" className="text-on-surface-variant hover:text-secondary font-medium transition-colors">Security Protocol</Link>
            <Link to="#" className="text-on-surface-variant hover:text-secondary font-medium transition-colors">Legal Compliance</Link>
            <Link to="#" className="text-on-surface-variant hover:text-secondary font-medium transition-colors">System Status</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
