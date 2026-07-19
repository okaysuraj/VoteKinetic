import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const SignUp = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await register(email, password);
      navigate('/login');
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f9f9fc] text-[#1a1c1e]">
      
      {/* TopAppBar */}
      <header className="w-full top-0 sticky bg-white border-b border-outline-variant z-50 shadow-sm">
        <div className="flex items-center justify-between px-4 md:px-10 py-4 max-w-[1200px] mx-auto">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[28px]">verified_user</span>
            <h1 className="text-xl font-bold tracking-tight text-primary">VOTEKINETIC</h1>
          </div>
          <button className="material-symbols-outlined text-on-surface-variant hover:bg-[#f0f0f3] hover:text-[#1a1c1e] transition-colors p-2 rounded-full active:scale-95">
            help_outline
          </button>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-[480px] space-y-12">
          
          {/* Branding/Security Anchor */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#dbeafe] mb-2 shadow-sm">
              <span className="material-symbols-outlined text-[#1d4ed8] text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
              Begin Verification
            </h2>
            <p className="text-base font-medium text-on-surface-variant max-w-[320px] mx-auto leading-relaxed">
              Create your digital voting identity on our encrypted sovereign network.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white border border-outline-variant p-6 md:p-10 rounded-2xl shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#1a1c1e]" htmlFor="email">Official Email Address</label>
                <div className="relative">
                  <input 
                    type="email" 
                    id="email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@organization.gov"
                    className="w-full h-12 bg-[#f9f9fc] px-4 rounded-lg border border-outline-variant text-[#1a1c1e] placeholder:text-outline-variant focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium text-base"
                  />
                </div>
                <p className="text-xs font-medium text-on-surface-variant mt-1">Use your registered institution email for immediate vetting.</p>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#1a1c1e]" htmlFor="password">Security Phrase</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    id="password" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full h-12 bg-[#f9f9fc] pl-4 pr-12 rounded-lg border border-outline-variant text-[#1a1c1e] placeholder:text-outline-variant focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium text-base"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-[#1a1c1e] transition-colors p-1"
                  >
                    <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
                {/* Password Strength Indicator */}
                <div className="flex gap-1 mt-2">
                  <div className="h-1 flex-1 bg-[#16a34a] rounded-full"></div>
                  <div className="h-1 flex-1 bg-[#16a34a] rounded-full"></div>
                  <div className="h-1 flex-1 bg-[#e2e2e5] rounded-full"></div>
                  <div className="h-1 flex-1 bg-[#e2e2e5] rounded-full"></div>
                </div>
              </div>

              {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
              {/* Terms Checkbox */}
              <div className="flex items-start gap-3 pt-2">
                <input 
                  type="checkbox" 
                  id="terms" 
                  required 
                  className="mt-1 w-5 h-5 rounded border-outline-variant text-secondary focus:ring-2 focus:ring-secondary/20 focus:ring-offset-0 cursor-pointer shrink-0 accent-secondary"
                />
                <label htmlFor="terms" className="text-xs font-medium text-on-surface-variant leading-relaxed cursor-pointer">
                  I acknowledge that my identity will be cryptographically hashed and verified against the national voter registry.
                </label>
              </div>

              {/* CTA Button */}
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-14 bg-primary text-white font-bold text-base rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group shadow-sm active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
              >
                {isLoading ? (
                  <span className="material-symbols-outlined animate-spin text-[20px]">refresh</span>
                ) : (
                  <>
                    Create Account
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform text-[20px]">arrow_forward</span>
                  </>
                )}
              </button>
              
            </form>
            
            <div className="mt-8 pt-8 border-t border-outline-variant text-center">
              <p className="text-sm font-medium text-on-surface-variant">
                Already have a verified ID?{' '}
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('/login'); }} className="text-secondary hover:underline underline-offset-4 font-bold transition-all ml-1">
                  Sign In
                </a>
              </p>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center items-center gap-6 opacity-60">
            <div className="flex items-center gap-2 text-on-surface-variant font-medium text-xs">
              <span className="material-symbols-outlined text-[18px]">security</span>
              AES-256 Encrypted
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant font-medium text-xs">
              <span className="material-symbols-outlined text-[18px]">gavel</span>
              Compliant Framework
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant font-medium text-xs">
              <span className="material-symbols-outlined text-[18px]">public</span>
              Sovereign Node Network
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 border-t border-outline-variant bg-white mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-4 max-w-[1200px] mx-auto text-center md:text-left">
          <div className="space-y-1">
            <p className="text-sm font-bold text-[#1a1c1e]">VOTEKINETIC</p>
            <p className="text-xs font-medium text-on-surface-variant">© 2024 VOTEKINETIC - Secured by State-Grade Encryption</p>
          </div>
          <nav className="flex gap-6 text-xs font-medium text-on-surface-variant">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Security Overview</a>
          </nav>
        </div>
      </footer>

    </div>
  );
};
