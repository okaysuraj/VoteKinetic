import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { tallyApi } from '../../api/client';

export const DetailedResultsBreakdown = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && id) {
      tallyApi.exportResults(user, id)
        .then(res => setData(res.export))
        .catch(err => console.error('Failed to load detailed results', err))
        .finally(() => setLoading(false));
    }
  }, [user, id]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-surface-container-lowest items-center justify-center font-sans">
        <div className="text-xl font-medium animate-pulse text-on-surface-variant">Reconciling ledger data...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-surface-container-lowest pb-20 md:pb-0 font-sans">
      <header className="bg-surface border-b border-outline-variant flex justify-between items-center px-4 md:px-8 h-16 w-full sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined text-on-surface">arrow_back</span>
          </button>
          <span className="material-symbols-outlined text-primary text-[28px]" style={{ fontVariationSettings: "'FILL' 0" }}>assignment</span>
          <h1 className="font-headline-md text-primary font-bold tracking-tight">Detailed Breakdown</h1>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center p-4 md:p-8 w-full">
        <div className="w-full max-w-[1200px] flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-outline-variant pb-6">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-2">Regional Tabulation Matrix</h2>
              <p className="text-sm font-medium text-on-surface-variant max-w-2xl">
                Cryptographically verified results segmented by geographical electoral districts. Data is immutable and reconciled with the main ledger.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[#16a34a] bg-[#dcfce7] px-3 py-1 rounded-full uppercase tracking-widest border border-[#bbf7d0]">
                Ledger Synced
              </span>
            </div>
          </div>

          <div className="bg-white border border-outline-variant rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-lowest border-b border-outline-variant">
                    <th className="p-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Region</th>
                    <th className="p-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest text-right">Total Votes</th>
                    <th className="p-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest text-right">Registered</th>
                    <th className="p-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Turnout</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {data?.demographics?.map((d: any, index: number) => (
                    <tr key={index} className="hover:bg-surface-container-lowest transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-on-surface text-base">{d.region}</div>
                      </td>
                      <td className="p-4 text-right font-mono font-medium text-on-surface">{d.votes.toLocaleString()}</td>
                      <td className="p-4 text-right font-mono text-on-surface-variant">{d.registered.toLocaleString()}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-3 w-full max-w-[200px]">
                          <div className="flex-1 h-2 bg-surface-container-high rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: d.turnout }}></div>
                          </div>
                          <span className="text-sm font-bold text-primary w-12 text-right">{d.turnout}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {!data?.demographics?.length && (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-on-surface-variant">No demographic data available.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};