import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const TallyAuditView = () => {
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const audits = [
    { height: '#842,109', hash: '0x7f4e92a11b8d3c5f6e8d...', time: '14:22:01 UTC', status: 'Verified' },
    { height: '#842,108', hash: '0x2c1f93b22a9e4d6a7f9e...', time: '14:21:48 UTC', status: 'Verified' },
    { height: '#842,107', hash: '0x9a3d8c11e2f4b5d6c7a8...', time: '14:21:35 UTC', status: 'Validating' },
    { height: '#842,106', hash: '0x5b9f8d12c3a4e5d6f7b8...', time: '14:21:20 UTC', status: 'Verified' },
    { height: '#842,105', hash: '0x1a2b3c4d5e6f7a8b9c0d...', time: '14:21:05 UTC', status: 'Verified' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="bg-surface border-b border-outline-variant sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/observer')}>
            <span className="material-symbols-outlined text-primary">visibility</span>
            <span className="font-headline-md text-primary font-bold tracking-tight">VOTEKINETIC</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-on-surface-variant uppercase tracking-widest hidden md:block">Observer Portal</span>
            <div className="w-8 h-8 rounded-full bg-surface-container-high border border-outline-variant flex items-center justify-center">
              <span className="material-symbols-outlined text-sm">person</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto w-full px-4 md:px-8 py-8 flex-grow">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-on-surface mb-2 tracking-tight">Tally Audit View</h1>
            <p className="text-on-surface-variant max-w-2xl">
              Inspect the raw cryptographic ledger. Each block represents a batch of homomorphically encrypted votes.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              <span className="text-xs font-bold font-mono tracking-widest text-on-surface">NETWORK LIVE</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-surface border border-outline-variant p-6 rounded-xl shadow-sm">
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Total Processed</p>
            <p className="text-3xl font-bold text-primary font-mono tracking-tight">1,248,392</p>
          </div>
          <div className="bg-surface border border-outline-variant p-6 rounded-xl shadow-sm">
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Failed Verifications</p>
            <p className="text-3xl font-bold text-error font-mono tracking-tight">0</p>
          </div>
          <div className="bg-surface border border-outline-variant p-6 rounded-xl shadow-sm md:col-span-2 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Latest Block</p>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">link</span>
                <p className="font-mono font-bold">#842,109</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Generation Time</p>
              <p className="font-mono font-bold text-secondary">1.2s</p>
            </div>
          </div>
        </div>

        <div className="bg-surface border border-outline-variant rounded-xl shadow-sm overflow-hidden flex flex-col h-[600px]">
          <div className="p-4 border-b border-outline-variant bg-surface-container-low flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4 bg-surface px-4 py-2 rounded-lg border border-outline-variant flex-grow md:max-w-md">
              <span className="material-symbols-outlined text-on-surface-variant">search</span>
              <input type="text" placeholder="Search block hash or height..." className="bg-transparent border-none outline-none w-full text-sm font-mono placeholder:font-sans" />
            </div>
            <button className="p-2 border border-outline-variant rounded-lg hover:bg-surface-container-high transition-colors bg-surface">
              <span className="material-symbols-outlined text-on-surface-variant">filter_list</span>
            </button>
          </div>

          <div className="overflow-x-auto flex-grow">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-surface-container border-b border-outline-variant">
                  <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Block Height</th>
                  <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Cryptographic Proof (ZK-Hash)</th>
                  <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Timestamp</th>
                  <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {audits.map((audit, i) => (
                  <tr 
                    key={i} 
                    className={`transition-colors cursor-pointer ${selectedRow === i ? 'bg-secondary/10' : audit.status === 'Validating' ? 'bg-[#eff6ff]' : 'hover:bg-surface-container-lowest'}`}
                    onClick={() => setSelectedRow(i)}
                  >
                    <td className="px-6 py-4 font-mono text-sm text-primary font-bold">{audit.height}</td>
                    <td className="px-6 py-4 font-mono text-sm text-on-surface-variant truncate max-w-xs">{audit.hash}</td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant">{audit.time}</td>
                    <td className="px-6 py-4">
                      {audit.status === 'Verified' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#dcfce7] text-[#166534]">
                          Verified
                        </span>
                      ) : (
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 border-2 border-secondary border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-xs font-bold text-secondary">Validating...</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className={`text-secondary font-bold text-sm hover:underline ${audit.status !== 'Verified' ? 'opacity-50 cursor-not-allowed' : ''}`}>Inspect</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-outline-variant flex items-center justify-between bg-surface-container-low">
            <span className="text-sm font-medium text-on-surface-variant">Showing 5 of 1,248,392 records</span>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-outline-variant rounded-lg bg-surface hover:bg-surface-container-high text-sm font-bold shadow-sm transition-colors">Previous</button>
              <button className="px-4 py-2 border border-outline-variant rounded-lg bg-surface hover:bg-surface-container-high text-sm font-bold shadow-sm transition-colors">Next</button>
            </div>
          </div>
        </div>
      </main>
      
      <div className="fixed bottom-8 right-8 pointer-events-none opacity-[0.02] rotate-12 -z-10">
        <span className="material-symbols-outlined text-[320px]" style={{ fontVariationSettings: "'FILL' 1" }}>encrypted</span>
      </div>
    </div>
  );
};
