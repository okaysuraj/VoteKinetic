import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { adminApi } from '../../api/client';

export const ManualAddVoter = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [sendEmail, setSendEmail] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    
    try {
      await adminApi.addUser(user, {
        email: data.email as string,
        password: 'ChangeMe123!', // Dummy default since we don't have password field yet
        role: 'VOTER',
        displayName: `${data.firstName} ${data.lastName}`,
        metadata: {
          nationalId: data.nationalId,
          phone: data.phone,
          district: data.district,
          sendEmail
        }
      });
      
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        alert('Citizen successfully enrolled in the voter registry.');
        navigate(-1);
      }, 2000);
    } catch (err: any) {
      alert(err.message || 'Failed to add voter');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="bg-surface border-b border-outline-variant sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(-1)}>
            <span className="material-symbols-outlined text-primary">arrow_back</span>
            <span className="font-headline-md text-primary font-bold tracking-tight hidden md:block">VOTEKINETIC Admin</span>
          </div>
        </div>
      </header>

      <main className="flex-grow w-full max-w-[800px] mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-primary mb-2">
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>person_add</span>
            <span className="font-bold text-xs uppercase tracking-wider">Voter Registry</span>
          </div>
          <h1 className="text-3xl font-bold text-on-surface tracking-tight mb-2">Register Individual Voter</h1>
          <p className="text-on-surface-variant max-w-2xl text-sm leading-relaxed">
            Manually add a verified citizen to the immutable registry. This requires matching identity documents and will trigger an audit log.
          </p>
        </div>

        <section className="bg-surface border border-outline-variant rounded-xl p-6 md:p-8 shadow-sm">
          <form id="voterForm" className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-bold text-sm text-on-surface flex items-center gap-2" htmlFor="firstName">
                  First Name <span className="text-error">*</span>
                </label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors">badge</span>
                  <input className="w-full h-12 pl-12 pr-4 bg-surface border border-outline-variant rounded-lg focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none font-medium" id="firstName" name="firstName" placeholder="Jane" required type="text" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-bold text-sm text-on-surface flex items-center gap-2" htmlFor="lastName">
                  Last Name <span className="text-error">*</span>
                </label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors">badge</span>
                  <input className="w-full h-12 pl-12 pr-4 bg-surface border border-outline-variant rounded-lg focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none font-medium" id="lastName" name="lastName" placeholder="Doe" required type="text" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-bold text-sm text-on-surface flex items-center gap-2" htmlFor="nationalId">
                National Identity Number <span className="text-error">*</span>
              </label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors">fingerprint</span>
                <input className="w-full h-12 pl-12 pr-4 bg-surface border border-outline-variant rounded-lg focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none font-medium tracking-widest font-mono" id="nationalId" name="nationalId" placeholder="XXX-XX-XXXX" required type="text" />
              </div>
              <p className="text-[11px] text-on-surface-variant">Must match government issued ID document.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-bold text-sm text-on-surface flex items-center gap-2" htmlFor="email">
                  Email Address <span className="text-error">*</span>
                </label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors">mail</span>
                  <input className="w-full h-12 pl-12 pr-4 bg-surface border border-outline-variant rounded-lg focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none font-medium" id="email" name="email" placeholder="jane.doe@example.gov" required type="email" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-bold text-sm text-on-surface" htmlFor="phone">Phone Number</label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors">call</span>
                  <input className="w-full h-12 pl-12 pr-4 bg-surface border border-outline-variant rounded-lg focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none font-medium" id="phone" name="phone" placeholder="+1 (555) 000-0000" type="tel" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-bold text-sm text-on-surface flex items-center gap-2" htmlFor="district">
                District / Region <span className="text-error">*</span>
              </label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors">map</span>
                <select className="w-full h-12 pl-12 pr-10 bg-surface border border-outline-variant rounded-lg focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none font-medium appearance-none cursor-pointer" id="district" name="district" required defaultValue="">
                  <option value="" disabled>Select electoral district...</option>
                  <option value="d1">District 1 - North</option>
                  <option value="d2">District 2 - East</option>
                  <option value="d3">District 3 - South</option>
                  <option value="d4">District 4 - West</option>
                  <option value="d5">District 5 - Central</option>
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant pointer-events-none">expand_more</span>
              </div>
            </div>

            <div className={`flex items-center justify-between p-4 bg-surface-container-low rounded-xl border transition-colors ${sendEmail ? 'border-secondary' : 'border-outline-variant'}`}>
              <div className="flex gap-4 items-center">
                <div className="bg-secondary/10 p-2 rounded-lg">
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-primary">Send Verification Email</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">The voter will receive a secure link to confirm identity.</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={sendEmail}
                  onChange={(e) => setSendEmail(e.target.checked)}
                />
                <div className="w-11 h-6 bg-outline-variant rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
              </label>
            </div>

            <div className="pt-6 border-t border-outline-variant flex flex-col md:flex-row gap-4 justify-end">
              <button 
                onClick={() => navigate(-1)}
                className="h-12 px-8 border border-outline-variant text-on-surface-variant font-bold rounded-lg hover:bg-surface-container-high transition-colors" 
                type="button"
              >
                Cancel
              </button>
              <button 
                disabled={loading || success}
                className={`h-12 px-8 font-bold rounded-lg transition-all shadow-sm flex items-center justify-center gap-2 min-w-[220px] ${success ? 'bg-secondary text-white' : 'bg-primary text-white hover:bg-primary/90'} ${loading ? 'opacity-80 cursor-wait' : ''}`} 
                type="submit"
              >
                {loading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                    Registering...
                  </>
                ) : success ? (
                  <>
                    <span className="material-symbols-outlined text-[20px]">check_circle</span>
                    Voter Added
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
                    Add to Registry
                  </>
                )}
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};