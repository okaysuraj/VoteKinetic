import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useQuery } from '@tanstack/react-query';

export const EditElection = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ['election', id],
    queryFn: async () => {
      const token = await user?.getIdToken();
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/elections/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch election');
      return res.json();
    },
    enabled: !!user && !!id
  });

  const election = data?.election;

  if (isLoading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-error">Error loading election</div>;


  return (
    <div className="bg-surface text-on-surface h-screen flex overflow-hidden">
      {/* SideNavBar */}
      <nav className="bg-surface-container-low border-r border-outline-variant w-64 flex flex-col py-8 px-4 shrink-0">
        <div className="mb-8 px-2 flex items-center gap-3">
          <span className="material-symbols-outlined text-headline-md" style={{ fontVariationSettings: "'FILL' 1" }}>how_to_vote</span>
          <span className="font-headline-md text-headline-md text-primary">VOTEKINETIC</span>
        </div>
        <div className="mb-8 px-2">
          <p className="font-label-md text-label-md text-on-surface">Admin Console</p>
          <p className="font-label-sm text-label-sm text-on-surface-variant">Level 4 Access</p>
        </div>
        
        <button className="bg-primary text-on-primary font-label-md text-label-md h-12 rounded-lg flex items-center justify-center gap-2 mb-8 hover:bg-primary-container transition-colors">
          <span className="material-symbols-outlined">add</span>
          New Election
        </button>

        <ul className="flex-1 space-y-2">
          <li>
            <Link to="/admin" className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg font-label-md text-label-md">
              <span className="material-symbols-outlined">dashboard</span>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/elections/edit" className="flex items-center gap-3 px-3 py-2 bg-secondary-container text-on-secondary-container font-bold rounded-lg font-label-md text-label-md">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>how_to_vote</span>
              Ballot Config
            </Link>
          </li>
          <li>
            <Link to="/admin" className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg font-label-md text-label-md">
              <span className="material-symbols-outlined">key</span>
              Cryptographic Keys
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full bg-background overflow-hidden">
        {/* Top App Bar */}
        <header className="bg-surface border-b border-outline-variant h-20 flex items-center justify-between px-10 shrink-0">
          <div>
            <h1 className="font-headline-md text-headline-md text-on-surface">Edit Election: {election?.title || 'Unknown'}</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">ID: {id} • Status: {election?.status}</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 border border-outline text-on-surface font-label-md text-label-md rounded hover:bg-surface-container transition-colors">Preview Ballot</button>
            <button className="px-4 py-2 bg-primary text-on-primary font-label-md text-label-md rounded hover:bg-primary-container transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">lock</span>
              Finalize & Lock
            </button>
          </div>
        </header>

        {/* Status Banner */}
        <div className="bg-surface-container-low border-b border-outline-variant py-3 px-10 shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              Drafting
            </span>
            <span className="font-body-md text-body-md text-on-surface-variant">Configuration 85% Complete</span>
          </div>
          <div className="w-64 bg-surface-container-highest rounded-full h-2 overflow-hidden">
            <div className="bg-secondary h-full rounded-full" style={{ width: '85%' }}></div>
          </div>
        </div>

        {/* Multi-pane Layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Secondary Navigation Pane (Left) */}
          <aside className="w-56 border-r border-outline-variant bg-surface p-4 shrink-0 overflow-y-auto">
            <nav className="space-y-1">
              <button className="w-full text-left block px-3 py-2 text-on-surface-variant font-label-md text-label-md rounded hover:bg-surface-container-low transition-colors">Ballot Info</button>
              <button className="w-full text-left block px-3 py-2 text-on-surface-variant font-label-md text-label-md rounded hover:bg-surface-container-low transition-colors">Schedule</button>
              <button className="w-full text-left block px-3 py-2 bg-secondary/10 text-secondary border-l-2 border-secondary font-label-md text-label-md rounded-r">Candidates</button>
              <button className="w-full text-left block px-3 py-2 text-on-surface-variant font-label-md text-label-md rounded hover:bg-surface-container-low transition-colors">Voting Districts</button>
              <button className="w-full text-left block px-3 py-2 text-on-surface-variant font-label-md text-label-md rounded hover:bg-surface-container-low transition-colors">Security Rules</button>
            </nav>
          </aside>

          {/* Main Workspace Pane */}
          <section className="flex-1 overflow-y-auto p-10 bg-surface-bright">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface mb-1">Candidates & Measures</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant">Manage the individuals appearing on this ballot. All data is encrypted upon entry.</p>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
                  <input className="pl-10 pr-4 py-2 border border-outline rounded bg-surface focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent font-body-md text-body-md w-64" placeholder="Search candidates..." type="text" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                
                {election?.candidates?.map((candidate: any) => (
                  <div key={candidate.id} className="bg-surface border border-outline-variant rounded p-4 relative group hover:border-secondary hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all">
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button aria-label="Edit" className="text-on-surface-variant hover:text-secondary"><span className="material-symbols-outlined text-sm">edit</span></button>
                      <button aria-label="Delete" className="text-on-surface-variant hover:text-error"><span className="material-symbols-outlined text-sm">delete</span></button>
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded bg-surface-container-highest border border-outline-variant flex items-center justify-center">
                        <span className="material-symbols-outlined text-[32px] text-on-surface-variant">person</span>
                      </div>
                      <div>
                        <h3 className="font-label-md text-label-md text-on-surface">{candidate.name}</h3>
                        <p className="font-label-sm text-label-sm text-on-surface-variant">{candidate.bio || 'Candidate'}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add New Slot */}
                <button className="bg-surface-container-lowest border border-dashed border-outline rounded p-4 flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low hover:border-secondary hover:text-secondary transition-all min-h-[180px] group">
                  <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-3 group-hover:bg-secondary-container transition-colors">
                    <span className="material-symbols-outlined group-hover:text-on-secondary-container">person_add</span>
                  </div>
                  <span className="font-label-md text-label-md">Add New Candidate</span>
                </button>
                
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
