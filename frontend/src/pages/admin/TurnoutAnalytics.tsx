import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const TurnoutAnalytics: React.FC = () => {
  const [searchParams] = useSearchParams();
  const electionId = searchParams.get('electionId');
  const { user } = useAuth();
  
  const [tallyData, setTallyData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTally = async () => {
      if (!electionId) {
        setError('No election ID provided');
        setLoading(false);
        return;
      }
      try {
        const token = await user?.getIdToken();
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/tally`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ electionId })
        });
        
        const data = await res.json();
        if (res.ok) {
          setTallyData(data);
        } else {
          setError(data.error || 'Failed to fetch tally');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      fetchTally();
    }
  }, [electionId, user]);

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col">
      {/* TopNavBar */}
      <header className="bg-surface sticky top-0 z-50 border-b border-outline-variant">
        <div className="flex justify-between items-center w-full px-gutter max-w-[1200px] mx-auto h-16">
          <Link to="/admin" className="text-headline-md font-headline-md font-bold tracking-tighter text-primary">VOTEKINETIC</Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/admin" className="text-on-surface-variant pb-1 hover:text-primary transition-colors font-label-md text-label-md">Elections</Link>
            <Link to="/admin/turnout" className="text-secondary border-b-2 border-secondary pb-1 font-label-md text-label-md">Results</Link>
            <a className="text-on-surface-variant pb-1 hover:text-primary transition-colors font-label-md text-label-md" href="#">Transparency</a>
            <a className="text-on-surface-variant pb-1 hover:text-primary transition-colors font-label-md text-label-md" href="#">Audit</a>
          </nav>
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer">notifications</span>
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer">shield</span>
            <div className="h-8 w-8 rounded-full bg-surface-container-high flex items-center justify-center overflow-hidden border border-outline-variant">
              <img className="w-full h-full object-cover" alt="Admin Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD57vBle3YKts2k0gxoTb19SzmNe7npmp8CBfqU-7WxzMz31p4UuchNkyOl6w0BMw1YR2gU0W9IxexhaKl36rjA46ezW0quRKobm3OLMqMD1P1GdflTwz2fhCp9nAg3Uu__bT4s03ohpY5YZzQnKxXaPmodn7QljLGx0fwRPQfhMzWz_of_S_HURZelrRUQzn_wVKfNpO70wVYBlu9WMrmYfVM5GRq0ysp5WtTLqFGi9Rv2ziVtzQCGog" />
            </div>
            <button className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-md text-label-md hover:opacity-90 transition-opacity">Secure Logout</button>
          </div>
        </div>
      </header>

      <main className="flex-grow w-full max-w-[1200px] mx-auto px-gutter py-stack-lg space-y-stack-lg">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-primary">Turnout Analytics</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">Real-time participation tracking for General Election 2024</p>
          </div>
          <div className="flex items-center gap-2 text-label-sm font-label-sm bg-surface-container-high px-3 py-1.5 rounded-full border border-outline-variant">
            <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
            <span>LIVE UPDATING</span>
            <span className="text-outline mx-1">•</span>
            <span>Last updated: 14:02:15 GMT</span>
          </div>
        </div>

        {/* High-Level KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          <div className="bg-surface border border-outline-variant p-stack-md rounded-xl space-y-2">
            <p className="font-label-md text-label-md text-on-surface-variant">Total Votes Cast</p>
            <div className="font-display-lg text-display-lg text-primary">{tallyData?.totalVotes || 0}</div>
            <p className="text-label-sm font-label-sm text-outline">Verified and cryptographically hashed</p>
          </div>
          <div className="bg-surface border border-outline-variant p-stack-md rounded-xl space-y-2">
            <p className="font-label-md text-label-md text-on-surface-variant">Valid Votes</p>
            <div className="font-display-lg text-display-lg text-primary">{tallyData?.validVotes || 0}</div>
            <p className="text-label-sm font-label-sm text-outline">Successfully decrypted votes</p>
          </div>
          <div className="bg-surface border border-outline-variant p-stack-md rounded-xl space-y-2">
            <p className="font-label-md text-label-md text-on-surface-variant">Election ID</p>
            <div className="font-headline-md text-primary truncate" title={tallyData?.electionId}>{tallyData?.electionId?.substring(0, 12)}...</div>
            <p className="text-label-sm font-label-sm text-outline">Current Tally Target</p>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Candidate Results */}
          <div className="lg:col-span-8 bg-surface border border-outline-variant rounded-xl p-gutter flex flex-col">
            <div className="flex justify-between items-center mb-stack-lg">
              <h2 className="font-headline-md text-headline-md text-primary">Election Results</h2>
            </div>
            
            {loading ? (
              <p className="text-center p-8">Loading Results...</p>
            ) : error ? (
              <p className="text-center p-8 text-error">{error}</p>
            ) : tallyData && tallyData.tally ? (
              <div className="flex-grow flex flex-col gap-4 overflow-y-auto max-h-96">
                {Object.entries(tallyData.tally).map(([candidateId, votes]: [string, any]) => {
                  const percentage = tallyData.totalVotes > 0 ? (votes / tallyData.totalVotes) * 100 : 0;
                  return (
                    <div key={candidateId} className="flex flex-col gap-2 p-4 bg-surface-container-low rounded border border-outline-variant">
                      <div className="flex justify-between">
                        <span className="font-label-md font-bold text-on-surface">Candidate ID: {candidateId.substring(0,8)}</span>
                        <span className="font-label-md font-bold text-secondary">{votes} Votes</span>
                      </div>
                      <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                        <div className="bg-primary h-full" style={{ width: `${percentage}%` }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-center p-8">No tally data available.</p>
            )}
          </div>

          {/* Demographic Clusters */}
          <div className="lg:col-span-4 bg-surface border border-outline-variant rounded-xl p-gutter space-y-stack-md">
            <h2 className="font-headline-md text-headline-md text-primary">Demographics</h2>
            <div className="space-y-gutter py-4">
              <div className="space-y-2">
                <div className="flex justify-between text-label-md font-label-md">
                  <span>Age 18-35</span>
                  <span className="text-primary">54.2%</span>
                </div>
                <div className="h-2 bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-secondary" style={{ width: '54.2%' }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-label-md font-label-md">
                  <span>Age 36-60</span>
                  <span className="text-primary">78.9%</span>
                </div>
                <div className="h-2 bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-secondary" style={{ width: '78.9%' }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-label-md font-label-md">
                  <span>Age 60+</span>
                  <span className="text-primary">82.1%</span>
                </div>
                <div className="h-2 bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-secondary" style={{ width: '82.1%' }}></div>
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-outline-variant">
              <p className="text-label-sm font-label-sm text-on-surface-variant italic">Historical data suggests the 18-35 bracket peaks after 17:00 local time.</p>
            </div>
          </div>

          {/* Regional Participation Table */}
          <div className="lg:col-span-7 bg-surface border border-outline-variant rounded-xl overflow-hidden">
            <div className="p-gutter border-b border-outline-variant">
              <h2 className="font-headline-md text-headline-md text-primary">Regional Participation</h2>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low">
                  <th className="p-4 font-label-md text-label-md text-on-surface-variant">District</th>
                  <th className="p-4 font-label-md text-label-md text-on-surface-variant">Turnout %</th>
                  <th className="p-4 font-label-md text-label-md text-on-surface-variant">Trend</th>
                  <th className="p-4 font-label-md text-label-md text-on-surface-variant text-right">Activity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                <tr className="hover:bg-surface-container-lowest transition-colors">
                  <td className="p-4 font-body-md text-body-md font-semibold">North District</td>
                  <td className="p-4 font-body-md text-body-md">72.4%</td>
                  <td className="p-4 text-secondary font-label-md">
                    <span className="flex items-center"><span className="material-symbols-outlined text-[16px] mr-1">arrow_upward</span> +2.4%</span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="inline-flex gap-0.5 items-end h-6">
                      <div className="w-1 bg-secondary opacity-30 h-2"></div>
                      <div className="w-1 bg-secondary opacity-50 h-3"></div>
                      <div className="w-1 bg-secondary opacity-80 h-5"></div>
                      <div className="w-1 bg-secondary h-4"></div>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-lowest transition-colors">
                  <td className="p-4 font-body-md text-body-md font-semibold">South Province</td>
                  <td className="p-4 font-body-md text-body-md">64.1%</td>
                  <td className="p-4 text-error font-label-md">
                    <span className="flex items-center"><span className="material-symbols-outlined text-[16px] mr-1">arrow_downward</span> -0.8%</span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="inline-flex gap-0.5 items-end h-6">
                      <div className="w-1 bg-secondary opacity-30 h-4"></div>
                      <div className="w-1 bg-secondary opacity-50 h-4"></div>
                      <div className="w-1 bg-secondary opacity-80 h-3"></div>
                      <div className="w-1 bg-secondary h-2"></div>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-lowest transition-colors">
                  <td className="p-4 font-body-md text-body-md font-semibold">East Capital</td>
                  <td className="p-4 font-body-md text-body-md">69.8%</td>
                  <td className="p-4 text-secondary font-label-md">
                    <span className="flex items-center"><span className="material-symbols-outlined text-[16px] mr-1">arrow_upward</span> +1.1%</span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="inline-flex gap-0.5 items-end h-6">
                      <div className="w-1 bg-secondary opacity-30 h-2"></div>
                      <div className="w-1 bg-secondary opacity-50 h-4"></div>
                      <div className="w-1 bg-secondary opacity-80 h-4"></div>
                      <div className="w-1 bg-secondary h-5"></div>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-lowest transition-colors">
                  <td className="p-4 font-body-md text-body-md font-semibold">West Territory</td>
                  <td className="p-4 font-body-md text-body-md">58.2%</td>
                  <td className="p-4 text-on-surface-variant font-label-md">
                    <span className="flex items-center"><span className="material-symbols-outlined text-[16px] mr-1">horizontal_rule</span> stable</span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="inline-flex gap-0.5 items-end h-6">
                      <div className="w-1 bg-secondary opacity-30 h-3"></div>
                      <div className="w-1 bg-secondary opacity-50 h-3"></div>
                      <div className="w-1 bg-secondary opacity-80 h-3"></div>
                      <div className="w-1 bg-secondary h-3"></div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="p-4 bg-surface-container-low text-center">
              <button className="text-secondary font-label-md text-label-md hover:underline">Download Comprehensive CSV Report</button>
            </div>
          </div>

          {/* Live Density Map */}
          <div className="lg:col-span-5 bg-surface border border-outline-variant rounded-xl overflow-hidden relative min-h-[400px]">
            <div className="absolute top-4 left-4 z-10 bg-surface/90 backdrop-blur border border-outline-variant p-3 rounded-lg shadow-sm">
              <h3 className="font-label-md text-label-md text-primary">Live Density Map</h3>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-grow flex gap-1 items-center">
                  <div className="w-2 h-2 rounded-full bg-secondary-container"></div>
                  <div className="w-2 h-2 rounded-full bg-secondary"></div>
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <span className="text-[10px] text-outline font-label-sm uppercase">Low → High Activity</span>
              </div>
            </div>
            {/* Simulated Heatmap Map Component */}
            <div className="w-full h-full bg-surface-container-highest relative overflow-hidden">
              <div className="w-full h-full bg-cover bg-center opacity-60" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDsTDgUK3_9EXS9Mm2U2I2YbdcSJUqqmY22-KWrrqPKnbAAEBnOu_hR8RQN9rofINCe4GSn6--5J0Ft72l-ZPWmHPBCkAkjYFietnqG0kwyNPwHp5GcK-J3tk45tMA7ndN6SROOMF2y0n7SrY1dSKEbLBvHEED6mDMwQ7KssZXG-xhhuIamrwugAlppMnKIWhUvvtd7A3sDDp6TeoxU03NSONmV4qEUZhHLRSzfrD-7I0dL2v1mIOHv4w')" }}></div>
              {/* Pulsing Hotspots */}
              <div className="absolute top-1/4 left-1/3 w-16 h-16 bg-secondary/20 rounded-full animate-ping"></div>
              <div className="absolute top-1/4 left-1/3 w-8 h-8 bg-secondary/40 rounded-full"></div>
              <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-primary/10 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-1/3 right-1/4 w-12 h-12 bg-primary/30 rounded-full"></div>
              <div className="absolute top-1/2 right-1/2 w-12 h-12 bg-secondary/20 rounded-full animate-pulse"></div>
            </div>
            <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
              <button className="w-8 h-8 bg-surface border border-outline-variant rounded flex items-center justify-center hover:bg-surface-container-low">
                <span className="material-symbols-outlined text-[20px]">add</span>
              </button>
              <button className="w-8 h-8 bg-surface border border-outline-variant rounded flex items-center justify-center hover:bg-surface-container-low">
                <span className="material-symbols-outlined text-[20px]">remove</span>
              </button>
            </div>
          </div>
        </div>

        {/* Security and Audit Trail Footer Section */}
        <div className="bg-surface-container-low border border-outline-variant rounded-xl p-gutter flex flex-col md:flex-row items-center justify-between gap-gutter">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-secondary-container/20 rounded-full">
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
            </div>
            <div>
              <h4 className="font-label-md text-label-md text-primary uppercase tracking-wider">End-to-End Verifiable</h4>
              <p className="text-label-sm font-label-sm text-on-surface-variant">All turnout data is cross-referenced with local cryptonodes in real-time.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-right">
              <p className="text-[10px] text-outline font-label-sm uppercase">Audit Hash</p>
              <p className="font-mono text-xs text-on-surface-variant">7f93...ae21</p>
            </div>
            <button className="border border-secondary text-secondary px-4 py-2 rounded-lg font-label-md text-label-md hover:bg-secondary/5 transition-colors">View Audit Log</button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant mt-auto">
        <div className="w-full py-stack-lg px-gutter max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-stack-md">
          <div className="font-label-md text-label-md font-bold text-primary">VOTEKINETIC</div>
          <div className="text-body-md font-body-md text-on-surface-variant text-center md:text-left">
            © 2024 VOTEKINETIC. Institutional Grade Encryption Protected.
          </div>
          <nav className="flex flex-wrap justify-center gap-4">
            <a className="text-label-sm font-label-sm text-on-surface-variant hover:underline hover:text-secondary transition-all" href="#">Security Protocol</a>
            <a className="text-label-sm font-label-sm text-on-surface-variant hover:underline hover:text-secondary transition-all" href="#">Accessibility</a>
            <a className="text-label-sm font-label-sm text-on-surface-variant hover:underline hover:text-secondary transition-all" href="#">Compliance</a>
            <a className="text-label-sm font-label-sm text-on-surface-variant hover:underline hover:text-secondary transition-all" href="#">Privacy Policy</a>
            <a className="text-label-sm font-label-sm text-on-surface-variant hover:underline hover:text-secondary transition-all" href="#">Terms of Service</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};
