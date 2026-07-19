import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AccessibilityLanguage = () => {
  const navigate = useNavigate();
  const [activeLang, setActiveLang] = useState('English');
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [screenReader, setScreenReader] = useState(true);

  const languages = ['English', 'Spanish', 'French', 'German'];

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20">
      <header className="bg-surface border-b border-outline-variant sticky top-0 z-50">
        <div className="max-w-[800px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(-1)}>
            <span className="material-symbols-outlined text-on-surface-variant">arrow_back</span>
            <span className="font-label-md text-on-surface font-bold">Settings</span>
          </div>
        </div>
      </header>

      <main className="max-w-[800px] mx-auto w-full px-4 py-8 space-y-8 flex-grow">
        <header className="mb-6">
          <h1 className="font-headline-lg text-3xl font-bold text-primary">Accessibility & Language</h1>
          <p className="font-body-md text-on-surface-variant mt-2 leading-relaxed">
            Customize your VOTEKINETIC experience. Changes are saved securely to your device profile.
          </p>
        </header>

        <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6 border-b border-outline-variant pb-4">
            <span className="material-symbols-outlined text-secondary">translate</span>
            <h3 className="font-headline-md text-xl font-bold text-on-surface">Language Preference</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {languages.map((lang) => (
              <button 
                key={lang}
                onClick={() => setActiveLang(lang)}
                className={`flex items-center justify-center p-3 border rounded-lg transition-colors font-bold ${activeLang === lang ? 'bg-secondary-container/10 border-secondary text-primary' : 'border-outline-variant hover:bg-surface-container-low text-on-surface-variant'}`}
              >
                {lang}
                {activeLang === lang && <span className="material-symbols-outlined ml-2 text-secondary text-sm">check</span>}
              </button>
            ))}
          </div>
        </section>

        <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6 border-b border-outline-variant pb-4">
            <span className="material-symbols-outlined text-secondary">accessibility_new</span>
            <h3 className="font-headline-md text-xl font-bold text-on-surface">Accessibility</h3>
          </div>
          
          <div className="divide-y divide-outline-variant">
            <div className="flex items-center justify-between py-4">
              <div className="flex flex-col">
                <span className="font-bold text-on-surface">High Contrast Mode</span>
                <span className="text-sm text-on-surface-variant mt-1">Increases visual distinction between elements.</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={highContrast} 
                  onChange={() => setHighContrast(!highContrast)} 
                />
                <div className="w-11 h-6 bg-outline-variant rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-4">
              <div className="flex flex-col">
                <span className="font-bold text-on-surface">Large Text</span>
                <span className="text-sm text-on-surface-variant mt-1">Scale all interface text for better readability.</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={largeText} 
                  onChange={() => setLargeText(!largeText)} 
                />
                <div className="w-11 h-6 bg-outline-variant rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-4">
              <div className="flex flex-col">
                <span className="font-bold text-on-surface">Screen Reader Optimization</span>
                <span className="text-sm text-on-surface-variant mt-1">Enhanced ARIA labels and focus management.</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={screenReader} 
                  onChange={() => setScreenReader(!screenReader)} 
                />
                <div className="w-11 h-6 bg-outline-variant rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
              </label>
            </div>
          </div>
        </section>

        <section className="bg-primary text-white rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-xl font-bold mb-2">Need assistance?</h3>
            <p className="text-on-primary-container opacity-90 max-w-[400px]">Review our comprehensive documentation on how VOTEKINETIC ensures your accessibility needs are met.</p>
          </div>
          <Link to="#" className="flex items-center gap-2 px-6 py-3 bg-secondary-container text-on-secondary-container font-bold rounded-lg hover:bg-secondary-fixed transition-colors whitespace-nowrap">
            <span className="material-symbols-outlined">description</span>
            View Documentation
          </Link>
        </section>

        <div className="mt-8 border-t border-outline-variant pt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container rounded-full text-on-surface-variant text-sm font-medium mb-6">
            <span className="material-symbols-outlined text-sm">verified_user</span>
            Preferences are encrypted and locally stored
          </div>
          <div className="relative h-48 w-full rounded-xl overflow-hidden group">
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDFhtcvzA_DtbeV1XdVvrS--H1k-faBbmSm9w3PWTeoyGOoYGmyCIgODttN_QofybdD843lPetgIPqLag99hwRAdSHSNnIiGbDx0EUoUcY5WUvDv06hfBHI0JOD7mF_YPDLntcQWEXNqKlcvDqaAjqNxh_cZDTi8F4_ph08LTIC-55WZEhg9OUrUVMdYohDVwQhEF2vJ-P7sldo90Pci_PdwiqWPN6x9EVzlTS9dttkjVP1C_tPbn7xvA')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <span className="font-bold text-white opacity-90">Secure Preference Sync</span>
              <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
