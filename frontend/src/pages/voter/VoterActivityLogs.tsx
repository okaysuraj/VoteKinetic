import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { userApi } from '../../api/client';

export const VoterActivityLogs = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      userApi.getActivityLogs(user)
        .then(res => setLogs(res.activity || []))
        .catch(err => console.error('Failed to load activity logs', err))
        .finally(() => setLoading(false));
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-surface text-on-surface items-center justify-center">
        <div className="text-xl font-medium animate-pulse text-on-surface-variant">Loading audit trail...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-surface text-on-surface">
      <header className="w-full top-0 sticky bg-surface border-b border-outline-variant z-50">
        <div className="max-w-[1440px] mx-auto px-4 md:px-10 flex justify-between items-center h-16">
          <div className="flex items-center gap-6">
            <Link to="/voter/dashboard" className="font-headline-md text-headline-md font-bold text-primary">VOTEKINETIC</Link>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="text-sm font-bold text-primary hover:underline">Go Back</button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 max-w-[1000px] mx-auto w-full">
        <main className="flex-1 p-4 md:p-10 bg-surface-bright min-w-0">
          <div className="mb-8">
            <h1 className="font-headline-lg text-headline-lg text-primary">System Audit Trail</h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">Immutable cryptographic log of your authentication and submission events.</p>
          </div>

          <div className="bg-white border border-outline-variant rounded-xl p-6 shadow-sm mb-8">
            <div className="flex items-center justify-between mb-6 border-b border-outline-variant pb-4">
              <h2 className="font-headline-sm font-bold text-primary">Recent Activity</h2>
              <span className="material-symbols-outlined text-on-surface-variant">history</span>
            </div>

            <div className="space-y-6">
              {logs.map(log => (
                <div key={log.id} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary text-[20px]">
                      {log.action.includes('BALLOT') ? 'how_to_vote' : 'login'}
                    </span>
                  </div>
                  <div className="flex-1 border-b border-outline-variant pb-6">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-on-surface">{log.action.replace(/_/g, ' ')}</span>
                      <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">{new Date(log.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      {log.details}
                      <br/>
                      IP: <span className="font-mono text-xs bg-surface-container px-1 py-0.5 rounded">{log.ipAddress || 'Unknown'}</span>
                    </p>
                  </div>
                </div>
              ))}
              {logs.length === 0 && (
                <div className="text-center py-8 text-on-surface-variant">No activity logged yet.</div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};