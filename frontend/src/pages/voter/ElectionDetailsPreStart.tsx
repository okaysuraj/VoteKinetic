import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { electionApi, ElectionDetail } from '../../api/client';

export const ElectionDetailsPreStart = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [election, setElection] = useState<ElectionDetail | null>(null);
  const [isEligible, setIsEligible] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && id) {
      electionApi.getById(user, id)
        .then(res => {
          setElection(res.election);
          setIsEligible(res.isEligible);
          setHasVoted(res.hasVoted);
        })
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [user, id]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!election) return <div className="p-10 text-center">Election not found</div>;
  
  return (
    <div className="flex flex-col min-h-screen bg-surface text-on-surface font-sans">
      
      {/* TopAppBar */}
      <header className="w-full top-0 sticky z-50 bg-surface border-b border-outline-variant transition-all">
        <div className="flex justify-between items-center px-4 md:px-10 py-4 max-w-[1200px] mx-auto">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-[28px]" style={{ fontVariationSettings: "'FILL' 0" }}>account_balance</span>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-primary">VOTEKINETIC</h1>
          </div>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-8 items-center">
              <a href="#" className="text-sm font-bold text-on-surface-variant hover:text-primary transition-colors">Dashboard</a>
              <a href="#" className="text-sm font-bold text-primary border-b-2 border-primary py-1">Elections</a>
              <a href="#" className="text-sm font-bold text-on-surface-variant hover:text-primary transition-colors">Profile</a>
            </nav>
            <div className="flex items-center gap-2 text-primary bg-primary/5 px-3 py-1.5 rounded-full border border-primary/20">
              <span className="material-symbols-outlined text-[16px]">lock</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">Encrypted</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-[1000px] mx-auto px-4 py-8 md:py-12 relative">
        
        {/* Breadcrumb Navigation */}
                <nav className="flex items-center gap-2 text-sm font-bold text-on-surface-variant mb-8 uppercase tracking-widest text-[10px]">
          <a href="#" className="hover:text-primary transition-colors">My Elections</a>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="text-primary">{election.title}</span>
        </nav>

        {/* Hero Section */}
        <section className="mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#fef3c7] text-[#b45309] border border-[#fcd34d]">
            <span className="material-symbols-outlined text-[16px]">schedule</span>
            <span className="text-[10px] font-bold uppercase tracking-widest">{election.status}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a1c1e] tracking-tight leading-tight">{election.title}</h2>
          <p className="text-lg font-medium text-on-surface-variant max-w-2xl leading-relaxed">
            {election.description}
          </p>
        </section>

        {/* Bento-style Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Date & Time (Highlighted) */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 flex flex-col justify-between shadow-sm hover:border-primary/30 transition-colors">
            <div className="mb-6">
              <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-6">Voting Period</h3>
              <div className="space-y-6">
                                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-on-surface-variant mt-0.5">event</span>
                  <div>
                    <p className="text-sm font-bold text-on-surface-variant uppercase tracking-widest mb-1">Starts</p>
                    <p className="text-xl font-bold text-[#1a1c1e]">{new Date(election.startDate).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-on-surface-variant mt-0.5">event_busy</span>
                  <div>
                    <p className="text-sm font-bold text-on-surface-variant uppercase tracking-widest mb-1">Ends</p>
                    <p className="text-xl font-bold text-[#1a1c1e]">{new Date(election.endDate).toLocaleString()}</p>
                  </div>
                </div>
                                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-on-surface-variant mt-0.5">event</span>
                  <div>
                    <p className="text-sm font-bold text-on-surface-variant uppercase tracking-widest mb-1">Starts</p>
                    <p className="text-xl font-bold text-[#1a1c1e]">{new Date(election.startDate).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-on-surface-variant mt-0.5">event_busy</span>
                  <div>
                    <p className="text-sm font-bold text-on-surface-variant uppercase tracking-widest mb-1">Ends</p>
                    <p className="text-xl font-bold text-[#1a1c1e]">{new Date(election.endDate).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-6 border-t border-outline-variant">
              <div className="flex items-center gap-2 text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px]">schedule</span>
                <span className="text-sm font-bold">Countdown: 14 days, 3 hours remaining</span>
              </div>
            </div>
          </div>

          {/* Governing Body Card */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 overflow-hidden relative shadow-sm hover:border-primary/30 transition-colors flex flex-col">
            <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-6">Governing Body</h3>
            <div className="flex items-center gap-6 mb-8">
              <div className="w-16 h-16 rounded-full bg-[#f9f9fc] border border-outline-variant flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                <img src="https://images.unsplash.com/photo-1544640808-32ca72ac7f37?auto=format&fit=crop&q=80" alt="Seal" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-xl font-bold text-[#1a1c1e] mb-1">Central Board of Elections</p>
                <p className="text-sm font-medium text-on-surface-variant">Metropolitan District (MD-24)</p>
              </div>
            </div>
            <div className="mt-auto space-y-3">
              <a href="#" className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-container-low transition-colors group">
                <span className="text-sm font-bold text-[#1a1c1e]">View Certification Authority</span>
                <span className="material-symbols-outlined text-secondary text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </a>
              <a href="#" className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-container-low transition-colors group">
                <span className="text-sm font-bold text-[#1a1c1e]">Governance Charter (PDF)</span>
                <span className="material-symbols-outlined text-secondary text-[20px] group-hover:translate-x-1 transition-transform">download</span>
              </a>
            </div>
          </div>

          {/* Eligibility & Requirements */}
          <div className="md:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl p-8 shadow-sm hover:border-primary/30 transition-colors">
            <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-6">Voter Eligibility Requirements</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              <div className="p-6 bg-[#f9f9fc] border border-outline-variant/50 rounded-xl">
                <span className="material-symbols-outlined text-secondary mb-4 text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>person_check</span>
                <p className="text-base font-bold text-[#1a1c1e] mb-2">Registration</p>
                <p className="text-xs font-medium text-on-surface-variant leading-relaxed">Must be a registered voter in the MD-24 district as of Sept 01, 2024.</p>
              </div>
              
              <div className="p-6 bg-[#f9f9fc] border border-outline-variant/50 rounded-xl">
                <span className="material-symbols-outlined text-secondary mb-4 text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>fingerprint</span>
                <p className="text-base font-bold text-[#1a1c1e] mb-2">Verification</p>
                <p className="text-xs font-medium text-on-surface-variant leading-relaxed">Digital ID or Biometric verification required at the time of ballot submission.</p>
              </div>
              
              <div className="p-6 bg-[#f9f9fc] border border-outline-variant/50 rounded-xl">
                <span className="material-symbols-outlined text-secondary mb-4 text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>gavel</span>
                <p className="text-base font-bold text-[#1a1c1e] mb-2">Compliance</p>
                <p className="text-xs font-medium text-on-surface-variant leading-relaxed">Adherence to the Digital Elections Act 2022 is mandatory for all participants.</p>
              </div>
              
            </div>
          </div>

          {/* Descriptive Summary & Roadmap */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 shadow-sm hover:border-primary/30 transition-colors">
              <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-6">Election Summary</h3>
              <div className="text-sm font-medium text-on-surface-variant leading-relaxed space-y-4">
                <p>The 2024 Municipal Governance Election marks the third iteration of the fully digital voting framework within our metropolitan district. This election will determine the seats for 12 Municipal Councilors, 4 School Board Trustees, and 2 District Oversight Commissioners. All votes are processed through a zero-knowledge proof architecture ensuring absolute privacy and immutable record-keeping.</p>
                <p>Voters are encouraged to review candidate profiles which will be unlocked 48 hours prior to the start of the voting window. For technical assistance, please contact the secure helpdesk integrated within the VOTEKINETIC platform.</p>
              </div>
            </div>
          </div>
          
        </div>

        {/* Actions Section */}
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          {hasVoted ? (
            <button className="w-full sm:w-auto px-10 h-12 bg-green-600 text-white font-bold text-sm rounded-lg flex items-center justify-center gap-2 shadow-sm cursor-not-allowed">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              Already Voted
            </button>
          ) : election.status === 'ACTIVE' && isEligible ? (
            <button 
              onClick={() => navigate(`/voter/voting-token`)}
              className="w-full sm:w-auto px-10 h-12 bg-primary text-white font-bold text-sm rounded-lg flex items-center justify-center gap-2 shadow-sm hover:opacity-90"
            >
              Start Voting
            </button>
          ) : (
            <button 
              className="w-full sm:w-auto px-10 h-12 bg-primary text-white font-bold text-sm rounded-lg flex items-center justify-center gap-2 opacity-60 cursor-not-allowed shadow-sm"
              disabled
            >
              <span className="material-symbols-outlined text-[18px]">lock</span>
              Vote Not Available
            </button>
          )}
          <button className="w-full sm:w-auto px-10 h-12 border border-primary text-primary font-bold text-sm rounded-lg hover:bg-primary/5 transition-colors shadow-sm">
            Set Calendar Reminder
          </button>
        </div>
        
        <div className="h-24 md:h-0"></div> {/* Spacer for fixed BottomNav */}
      </main>

      {/* BottomNavBar */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center h-16 px-4 bg-surface border-t border-outline-variant z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pb-safe">
        <a href="#" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors w-full h-full">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px] font-bold mt-1">Dashboard</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center bg-[#dbeafe] text-[#1e40af] rounded-full px-5 py-1 w-full h-full font-bold transition-colors max-w-[80px]">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>how_to_vote</span>
          <span className="text-[10px] font-bold mt-1">Elections</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors w-full h-full">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-bold mt-1">Profile</span>
        </a>
      </nav>

    </div>
  );
};
