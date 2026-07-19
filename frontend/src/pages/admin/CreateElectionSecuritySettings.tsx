import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const CreateElectionSecuritySettings = () => {
  const navigate = useNavigate();
  const [nodes, setNodes] = useState([
    { id: 'alpha', name: 'Validator Alpha', active: true },
    { id: 'beta', name: 'Observer Beta', active: false },
    { id: 'gamma', name: 'Auditor Gamma', active: true },
    { id: 'public', name: 'Public Ledger', active: false },
  ]);

  const toggleNode = (id: string) => {
    setNodes(nodes.map(n => n.id === id ? { ...n, active: !n.active } : n));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/admin/elections/new/preview');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-32">
      <header className="bg-surface border-b border-outline-variant sticky top-0 z-40">
        <div className="max-w-[1440px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/admin')}>
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
        
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-end mb-3">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-1">Security Protocols</h1>
              <p className="text-sm text-on-surface-variant font-medium">Step 5 of 6: Cryptographic Configuration</p>
            </div>
            <span className="text-sm font-bold text-secondary">83.3% Complete</span>
          </div>
          <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
            <div className="h-full bg-secondary w-5/6 rounded-full transition-all duration-500"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          
          {/* Encryption Level (Hero Card) */}
          <div className="md:col-span-6 bg-primary text-white rounded-xl p-8 flex flex-col md:flex-row items-center justify-between shadow-lg relative overflow-hidden">
            <div className="relative z-10 text-center md:text-left mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">End-to-End Encrypted</h2>
              <p className="text-white/80 max-w-lg leading-relaxed">
                All ballots are encrypted on the voter's device using elliptic curve cryptography before transmission.
              </p>
            </div>
            <div className="relative z-10 w-24 h-24 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm shrink-0">
              <span className="material-symbols-outlined text-[48px]" style={{ fontVariationSettings: "'FILL' 1" }}>fingerprint</span>
            </div>
          </div>

          {/* Multi-Signature Keys (Toggle Selection) */}
          <div className="md:col-span-3 bg-surface border border-outline-variant rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-secondary text-2xl">key</span>
              <h3 className="font-bold text-primary text-lg">Multi-Signature Auditor Keys</h3>
            </div>
            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 border border-outline-variant rounded-lg cursor-pointer hover:bg-surface-container-low transition-colors">
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-on-surface">Decentralized Trust</span>
                  <span className="text-xs text-on-surface-variant mt-0.5">Requires 3/5 auditor approval</span>
                </div>
                <div className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                </div>
              </label>
              
              <label className="flex items-center justify-between p-4 border border-outline-variant rounded-lg cursor-pointer hover:bg-surface-container-low transition-colors">
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-on-surface">Hardware Security Module</span>
                  <span className="text-xs text-on-surface-variant mt-0.5">Mandatory physical key insertion</span>
                </div>
                <div className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                </div>
              </label>
            </div>
          </div>

          {/* Blockchain Node Selection */}
          <div className="md:col-span-3 bg-surface border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-secondary text-2xl">hub</span>
              <h3 className="font-bold text-primary text-lg">Blockchain Node Selection</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              {nodes.map(node => (
                <button 
                  key={node.id}
                  className={`flex items-center gap-3 p-3 rounded-lg text-left transition-all ${node.active ? 'border-2 border-secondary bg-secondary/10' : 'border border-outline-variant hover:bg-surface-container-low'}`}
                  onClick={() => toggleNode(node.id)}
                  type="button"
                >
                  <span className={`material-symbols-outlined text-[20px] ${node.active ? 'text-secondary' : 'text-outline-variant'}`}>
                    {node.active ? 'check_circle' : 'circle'}
                  </span>
                  <span className={`font-bold text-xs ${node.active ? 'text-secondary' : 'text-on-surface-variant'}`}>
                    {node.name}
                  </span>
                </button>
              ))}
            </div>
            
            <p className="mt-auto text-xs text-on-surface-variant italic leading-relaxed">
              Nodes ensure immutable record-keeping across disparate geographic locations.
            </p>
          </div>
          
        </div>

        {/* Security Animation/Visualization */}
        <div className="mt-8 relative h-48 rounded-xl overflow-hidden border border-outline-variant bg-surface-container shadow-sm">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-primary/40 flex items-end p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
              </div>
              <div>
                <h4 className="font-bold text-white mb-1 text-lg">Dynamic Cryptographic Shield Active</h4>
                <p className="text-sm text-white/80">Real-time simulation of current security configuration performance.</p>
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* Navigation Actions */}
      <footer className="fixed bottom-0 left-0 w-full bg-surface border-t border-outline-variant py-4 md:py-6 z-50">
        <div className="max-w-[1000px] mx-auto px-4 md:px-8 flex justify-between items-center">
          <button 
            className="flex items-center justify-center gap-2 px-6 h-12 border border-primary text-primary font-bold rounded-lg hover:bg-primary/5 transition-colors active:scale-95"
            onClick={() => navigate(-1)}
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            Back
          </button>
          
          <button 
            className="flex items-center justify-center gap-2 px-8 h-12 bg-primary text-white font-bold rounded-lg shadow-sm hover:bg-primary/90 transition-all active:scale-95"
            onClick={handleNext}
            type="button"
          >
            Next Step
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
        </div>
      </footer>

    </div>
  );
};
