import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useActiveElections } from '../hooks/useElections';

export const ElectionsList: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('active');
  const { elections, loading, error, refresh } = useActiveElections();

  return (
    <div className="bg-background text-on-surface min-h-screen">
      {/* Top Navigation Bar */}
      <nav className="bg-surface border-b border-outline-variant fixed top-0 w-full z-50 transition-shadow">
        <div className="flex justify-between items-center px-gutter py-4 w-full max-w-[1440px] mx-auto">
          <div className="font-headline-md text-headline-md font-bold text-primary cursor-pointer" onClick={() => navigate('/')}>VOTEKINETIC</div>
          <div className="hidden md:flex items-center gap-stack-lg">
            <Link to="/dashboard" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">Dashboard</Link>
            <Link to="/voter/elections" className="font-label-md text-label-md text-secondary border-b-2 border-secondary pb-1">Ballots</Link>
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Results</a>
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Resources</a>
          </div>
          <div className="flex items-center gap-stack-md">
            <button className="material-symbols-outlined text-on-surface-variant p-2 hover:bg-surface-container rounded-full">notifications</button>
            <button className="material-symbols-outlined text-on-surface-variant p-2 hover:bg-surface-container rounded-full">account_circle</button>
          </div>
        </div>
      </nav>

      <main className="pt-[88px] min-h-screen pb-stack-lg">
        <div className="max-w-[1440px] mx-auto px-gutter grid grid-cols-12 gap-gutter">
          {/* Sidebar Navigation */}
          <aside className="col-span-3 hidden md:block">
            <div className="sticky top-[112px] space-y-stack-md">
              <h1 className="font-headline-md text-headline-md mb-stack-lg">My Elections</h1>
              <nav className="flex flex-col gap-2">
                <button 
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-label-md text-label-md transition-all ${filter === 'active' ? 'bg-secondary-container text-on-secondary-container' : 'hover:bg-surface-container text-on-surface-variant'}`}
                  onClick={() => setFilter('active')}
                >
                  <span className="material-symbols-outlined" style={filter === 'active' ? { fontVariationSettings: "'FILL' 1" } : {}}>how_to_vote</span>
                  Active Ballots
                </button>
                <button 
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-label-md text-label-md transition-all ${filter === 'upcoming' ? 'bg-secondary-container text-on-secondary-container' : 'hover:bg-surface-container text-on-surface-variant'}`}
                  onClick={() => setFilter('upcoming')}
                >
                  <span className="material-symbols-outlined" style={filter === 'upcoming' ? { fontVariationSettings: "'FILL' 1" } : {}}>schedule</span>
                  Upcoming
                </button>
                <button 
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-label-md text-label-md transition-all ${filter === 'past' ? 'bg-secondary-container text-on-secondary-container' : 'hover:bg-surface-container text-on-surface-variant'}`}
                  onClick={() => setFilter('past')}
                >
                  <span className="material-symbols-outlined" style={filter === 'past' ? { fontVariationSettings: "'FILL' 1" } : {}}>history</span>
                  Past Elections
                </button>
                <button className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-surface-container text-on-surface-variant font-label-md text-label-md transition-all">
                  <span className="material-symbols-outlined">verified_user</span>
                  Verification Registry
                </button>
              </nav>

              <div className="mt-stack-lg p-stack-md bg-surface-container-low border border-outline-variant rounded-lg">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <span className="material-symbols-outlined text-body-md">lock</span>
                  <span className="font-label-md text-label-md">Secure Connection</span>
                </div>
                <p className="font-label-sm text-label-sm text-on-surface-variant leading-relaxed">
                  Your voting session is protected by AES-256 institutional encryption. All interaction logs are hashed and stored in the secure audit trail.
                </p>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="col-span-12 md:col-span-9">
            {/* Status Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-md mb-stack-lg">
              <div className="bg-surface-container-lowest border border-outline-variant p-stack-md rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">Active Now</p>
                  <p className="font-headline-md text-headline-md text-primary">02</p>
                </div>
                <span className="material-symbols-outlined text-secondary opacity-50 text-display-lg">radio_button_checked</span>
              </div>
              <div className="bg-surface-container-lowest border border-outline-variant p-stack-md rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">Action Required</p>
                  <p className="font-headline-md text-headline-md text-error">01</p>
                </div>
                <span className="material-symbols-outlined text-error opacity-50 text-display-lg">priority_high</span>
              </div>
              <div className="bg-surface-container-lowest border border-outline-variant p-stack-md rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">Verified Casts</p>
                  <p className="font-headline-md text-headline-md text-on-surface">14</p>
                </div>
                <span className="material-symbols-outlined text-outline opacity-50 text-display-lg">verified</span>
              </div>
            </div>

            {/* Search & Sort */}
            <div className="flex justify-between items-center mb-stack-md">
              <div className="relative w-72">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
                <input 
                  className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-full text-label-md focus:ring-2 focus:ring-secondary focus:border-transparent outline-none" 
                  placeholder="Search elections..." 
                  type="text"
                />
              </div>
              <div className="flex gap-stack-sm">
                <button className="flex items-center gap-2 px-4 py-2 border border-outline-variant rounded-lg font-label-md text-label-md hover:bg-surface-container-high transition-colors">
                  <span className="material-symbols-outlined">filter_list</span>
                  Sort
                </button>
              </div>
            </div>

            {/* Elections Grid */}
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <div className="bg-error-container text-on-error-container p-6 rounded-xl border border-error">
                <h3 className="font-bold mb-2">Error loading elections</h3>
                <p>{error}</p>
                <button onClick={refresh} className="mt-4 bg-error text-white px-4 py-2 rounded">Retry</button>
              </div>
            ) : elections.length === 0 ? (
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-12 text-center flex flex-col items-center">
                <span className="material-symbols-outlined text-[64px] text-outline-variant mb-4 font-light">inbox</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">No active elections found</h3>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto">There are currently no active elections that require your vote.</p>
              </div>
            ) : (
              <div className="space-y-stack-md">
                {elections.map((election: any) => (
                  <div key={election.id} className="election-card bg-surface-container-lowest border border-outline-variant p-6 rounded-lg flex flex-col md:flex-row items-center gap-6 shadow-sm hover:border-secondary transition-colors duration-200 cursor-pointer">
                    <div className="w-24 h-24 bg-surface-container-high rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-display-lg text-primary opacity-30">account_balance</span>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 bg-secondary-container text-on-secondary-container text-label-sm font-bold rounded uppercase tracking-wider">Active</span>
                        <span className="text-on-surface-variant font-label-sm text-label-sm">Ends in {new Date(election.endDate).toLocaleDateString()}</span>
                      </div>
                      <h3 className="font-headline-md text-headline-md text-primary mb-1">{election.title}</h3>
                      <p className="font-body-md text-body-md text-on-surface-variant mb-4">{election.description || 'General Election'}</p>
                      <div className="flex items-center gap-stack-lg text-label-sm text-on-surface-variant">
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                          Starts: {new Date(election.startDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">timer</span>
                          Closes: {new Date(election.endDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 w-full md:w-auto">
                      <button 
                        className="w-full md:w-auto bg-secondary text-on-secondary px-8 py-3 rounded font-label-md text-label-md font-bold hover:opacity-90 active:scale-95 transition-all"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/voter/elections/${election.id}`);
                        }}
                      >
                        Cast Vote
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Institutional Verification Notice */}
            <div className="mt-stack-lg p-gutter bg-primary text-on-primary rounded-lg flex items-start gap-gutter shadow-lg">
              <span className="material-symbols-outlined text-display-lg mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
              <div>
                <h4 className="font-headline-md text-headline-md mb-2">Institutional-Grade Verification Active</h4>
                <p className="font-body-md text-body-md opacity-90 leading-relaxed max-w-2xl">
                  VOTEKINETIC employs Zero-Knowledge Proofs and multi-signature validation to ensure that every vote is anonymous yet fully verifiable. Your identity is linked to an encrypted token that cannot be decrypted by any single entity, including the election administrators. 
                </p>
                <div className="flex gap-4 mt-stack-md">
                  <a className="font-label-md text-label-md font-bold underline hover:no-underline" href="#">View Security Protocols</a>
                  <a className="font-label-md text-label-md font-bold underline hover:no-underline" href="#">Audit Trail (Public)</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low border-t border-outline-variant mt-stack-lg">
        <div className="flex flex-col md:flex-row justify-between items-center px-gutter py-stack-md w-full max-w-[1440px] mx-auto gap-4">
          <div className="font-label-md text-label-md font-bold text-on-surface">VOTEKINETIC</div>
          <p className="font-label-sm text-label-sm text-on-surface-variant text-center md:text-left">
            © 2024 VOTEKINETIC Institutional Voting Systems. All rights reserved. State-grade encryption active.
          </p>
          <div className="flex flex-wrap justify-center gap-stack-md">
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary underline transition-all" href="#">Security Protocol</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary underline transition-all" href="#">Privacy Policy</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary underline transition-all" href="#">Audit Logs</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary underline transition-all" href="#">Compliance</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary underline transition-all" href="#">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
