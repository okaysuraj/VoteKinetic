import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { electionApi } from '../../api/client';

export const LiveElectionMonitoring = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  
  const [election, setElection] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!user || !id) return;
    
    const fetchStats = () => {
      electionApi.getById(user, id)
        .then(res => setElection(res.election))
        .catch(err => console.error('Failed to poll election', err))
        .finally(() => setLoading(false));
    };
    
    fetchStats();
    let interval: any;
    if (!isPaused) {
      interval = setInterval(fetchStats, 5000);
    }
    return () => clearInterval(interval);
  }, [user, id, isPaused]);

  const handlePauseToggle = () => {
    setIsPaused(!isPaused);
  };

  const handleShutdown = async () => {
    if (window.confirm('CRITICAL: Are you sure you want to trigger an Emergency Shutdown? This will lock all voter sessions immediately.')) {
      if (user && id) {
        try {
          await electionApi.updateStatus(user, id, 'PAUSED');
          alert('SYSTEM SHUTDOWN INITIATED. Session recorded.');
          navigate('/admin/dashboard');
        } catch (err: any) {
          alert(err.message || 'Failed to pause election');
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-background items-center justify-center font-sans">
        <div className="text-xl font-medium animate-pulse text-primary">Establishing secure telemetry link...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20 md:pb-0 font-sans">
      <header className="bg-surface border-b border-outline-variant sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/admin/dashboard')}>
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

      <main className="max-w-[1440px] mx-auto w-full px-4 md:px-8 py-8 flex-grow">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-error animate-pulse text-[28px]">sensors</span>
              <h1 className="font-headline-lg font-bold text-primary">Live Monitoring Control</h1>
            </div>
            <p className="text-sm font-medium text-on-surface-variant">
              Election: {election?.title || 'Unknown'} (ID: {election?.id || id})
            </p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handlePauseToggle}
              className={`px-4 py-2 rounded-lg font-bold text-sm tracking-wide transition-colors ${isPaused ? 'bg-primary text-white hover:bg-[#1d4ed8]' : 'bg-surface-container text-on-surface hover:bg-surface-container-high border border-outline-variant'}`}
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">{isPaused ? 'play_arrow' : 'pause'}</span>
                {isPaused ? 'Resume Telemetry' : 'Pause Updates'}
              </span>
            </button>
            <button 
              onClick={handleShutdown}
              className="px-4 py-2 bg-error text-white rounded-lg font-bold text-sm tracking-wide hover:bg-[#b3261e] transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">power_settings_new</span>
              Emergency Shutdown
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Total Votes Cast</h3>
              <span className="material-symbols-outlined text-primary text-[20px]">how_to_vote</span>
            </div>
            <div className="text-4xl font-mono font-bold text-primary">{election?._count?.votes || 0}</div>
            <div className="mt-3 text-xs font-bold text-[#16a34a] flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
              <span>12.4% last hour</span>
            </div>
          </div>
          
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Election Status</h3>
              <span className="material-symbols-outlined text-primary text-[20px]">info</span>
            </div>
            <div className={`text-2xl font-bold tracking-tight mt-2 ${election?.status === 'ACTIVE' ? 'text-[#16a34a]' : 'text-[#f59e0b]'}`}>
              {election?.status || 'UNKNOWN'}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};