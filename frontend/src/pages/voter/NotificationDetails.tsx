import { useNavigate } from 'react-router-dom';

export const NotificationDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="bg-surface border-b border-outline-variant sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/voter/notifications')}>
            <span className="material-symbols-outlined text-on-surface-variant">arrow_back</span>
            <span className="font-label-md text-on-surface font-bold hidden md:block">Back to Inbox</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">shield</span>
            <span className="font-headline-md text-primary font-bold tracking-tight">VOTEKINETIC</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-on-surface-variant">account_circle</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[800px] mx-auto w-full px-4 md:px-8 py-8 flex-grow pb-24 md:pb-8">
        <article className="bg-surface border border-outline-variant rounded-xl p-6 md:p-10 shadow-sm relative">
          
          <div className="absolute right-6 top-6 opacity-5 hidden md:block pointer-events-none">
            <span className="material-symbols-outlined text-[120px]">account_balance</span>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>gavel</span>
              </div>
              <div>
                <p className="font-bold text-sm text-on-surface">Electoral Commission</p>
                <div className="flex items-center gap-1 text-secondary">
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider">Official Comm</span>
                </div>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <time className="text-sm font-bold text-on-surface block">October 24, 2024</time>
              <p className="text-xs text-on-surface-variant">09:42 AM (UTC -5)</p>
            </div>
          </div>

          <div className="border-b border-outline-variant pb-6 mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-on-surface leading-tight">
              Your Official Voter Guide for the 2024 Municipal Governance Election is Now Available
            </h1>
          </div>

          <div className="space-y-6 text-on-surface-variant">
            <p className="font-medium text-on-surface">Dear Registered Citizen,</p>
            
            <p className="leading-relaxed">
              The VOTEKINETIC system has finalized the candidate roster and ballot measures for your specific jurisdiction in the upcoming Municipal Governance Election. As part of our commitment to institutional transparency and voter education, we have compiled a comprehensive guide to assist you in making an informed decision.
            </p>
            
            <p className="leading-relaxed">
              This document includes verified candidate statements, independent fiscal impact reports on all proposed measures, and a technical summary of the encryption protocols that will be used to protect your ballot once cast.
            </p>

            <div className="bg-surface-container-low border-l-4 border-primary p-6 my-8 rounded-r-lg">
              <p className="text-sm font-bold text-primary mb-2 uppercase tracking-wider">Important Deadline</p>
              <p className="text-on-surface italic font-medium">
                "The window for electronic absentee registration closes in 4 days. Please ensure your digital identification credentials are up to date."
              </p>
            </div>

            <p className="leading-relaxed">
              You can access your personalized guide directly through the platform dashboard. This information is also available in accessible formats upon request through the help center.
            </p>
            
            <p className="pt-6 border-t border-outline-variant mt-6 text-on-surface">
              Institutional Oversight Board,<br/>
              <strong className="text-primary">VOTEKINETIC Administration</strong>
            </p>
          </div>

          <div className="pt-8 mt-8 flex flex-col sm:flex-row gap-4">
            <button className="h-12 px-8 bg-primary text-white font-bold rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-sm">
              <span className="material-symbols-outlined text-[20px]">description</span>
              View Voter Guide
            </button>
            <button className="h-12 px-8 border border-primary text-primary font-bold rounded-lg hover:bg-surface-container-low transition-all flex items-center justify-center gap-2" onClick={() => navigate('/voter/elections')}>
              <span className="material-symbols-outlined text-[20px]">how_to_vote</span>
              Go to Elections
            </button>
          </div>
        </article>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface border border-outline-variant rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer group">
            <div className="flex justify-between items-start mb-3">
              <span className="material-symbols-outlined text-primary bg-primary-container p-2 rounded-lg">security</span>
              <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">open_in_new</span>
            </div>
            <h4 className="font-bold text-on-surface mb-1">Security Whitepaper</h4>
            <p className="text-sm text-on-surface-variant">Review our end-to-end verifiable voting architecture.</p>
          </div>
          <div className="bg-surface border border-outline-variant rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer group">
            <div className="flex justify-between items-start mb-3">
              <span className="material-symbols-outlined text-secondary bg-secondary-container p-2 rounded-lg">support_agent</span>
              <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">open_in_new</span>
            </div>
            <h4 className="font-bold text-on-surface mb-1">Help Center</h4>
            <p className="text-sm text-on-surface-variant">Need assistance with your ballot? Contact a verification officer.</p>
          </div>
        </div>
      </main>

      <div className="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col gap-4 z-30">
        <div className="p-2 bg-surface border border-outline-variant rounded-full shadow-lg flex flex-col gap-2">
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-primary transition-all" title="Share">
            <span className="material-symbols-outlined">share</span>
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-primary transition-all" title="Print">
            <span className="material-symbols-outlined">print</span>
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-[#fee2e2] hover:text-[#ef4444] transition-all" title="Delete">
            <span className="material-symbols-outlined">delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};
