import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const CandidateOrderingRules = () => {
  const navigate = useNavigate();
  const [selectedRule, setSelectedRule] = useState('random');

  const [candidates, setCandidates] = useState([
    { id: '#00421', name: 'Dr. Sarah Jenkins', party: 'Independent Coalition', incumbent: true },
    { id: '#00438', name: 'Robert M. Chen', party: 'Progressive Alliance', incumbent: false },
    { id: '#00455', name: 'Elena Rodriguez', party: 'Heritage Union', incumbent: false },
    { id: '#00461', name: 'James Thorne', party: 'Liberty Party', incumbent: false }
  ]);

  const [draggedItem, setDraggedItem] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedItem(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (index: number) => {
    if (draggedItem === null) return;
    if (draggedItem !== index) {
      const newCandidates = [...candidates];
      const dragged = newCandidates[draggedItem];
      newCandidates.splice(draggedItem, 1);
      newCandidates.splice(index, 0, dragged);
      setCandidates(newCandidates);
      setSelectedRule('manual');
    }
    setDraggedItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20 md:pb-0">
      <header className="bg-surface border-b border-outline-variant sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(-1)}>
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
        <div className="mb-8 border-b border-outline-variant pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <div className="flex items-center gap-2 text-primary mb-2">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>gavel</span>
              <span className="font-bold text-xs uppercase tracking-wider">Ballot Configuration</span>
            </div>
            <h1 className="text-3xl font-bold text-on-surface tracking-tight mb-2">Candidate Ordering</h1>
            <p className="text-on-surface-variant max-w-2xl text-sm leading-relaxed">
              Define the global logic for how candidates are presented to voters on their device. Different states require specific randomization protocols to prevent order bias.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 flex flex-col gap-4">
            <h2 className="font-bold text-sm text-on-surface-variant uppercase tracking-wider mb-2">Algorithmic Rules</h2>
            
            <div 
              className={`p-4 rounded-xl cursor-pointer transition-all border ${selectedRule === 'random' ? 'bg-secondary/5 border-secondary shadow-sm' : 'bg-surface border-outline-variant hover:bg-surface-container-low'}`}
              onClick={() => setSelectedRule('random')}
            >
              <div className="flex items-start gap-3">
                <span className={`material-symbols-outlined text-[28px] ${selectedRule === 'random' ? 'text-secondary' : 'text-on-surface-variant'}`} style={{ fontVariationSettings: selectedRule === 'random' ? "'FILL' 1" : "'FILL' 0" }}>shuffle</span>
                <div>
                  <h3 className="font-bold text-on-surface mb-1">True Random (Per Voter)</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">Cryptographically shuffles the order for every individual digital ballot generated.</p>
                </div>
              </div>
            </div>

            <div 
              className={`p-4 rounded-xl cursor-pointer transition-all border ${selectedRule === 'alphabetical' ? 'bg-secondary/5 border-secondary shadow-sm' : 'bg-surface border-outline-variant hover:bg-surface-container-low'}`}
              onClick={() => setSelectedRule('alphabetical')}
            >
              <div className="flex items-start gap-3">
                <span className={`material-symbols-outlined text-[28px] ${selectedRule === 'alphabetical' ? 'text-secondary' : 'text-on-surface-variant'}`} style={{ fontVariationSettings: selectedRule === 'alphabetical' ? "'FILL' 1" : "'FILL' 0" }}>sort_by_alpha</span>
                <div>
                  <h3 className="font-bold text-on-surface mb-1">Alphabetical Fixed</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">Orders candidates A-Z by legal surname globally across all devices.</p>
                </div>
              </div>
            </div>

            <div 
              className={`p-4 rounded-xl cursor-pointer transition-all border ${selectedRule === 'manual' ? 'bg-secondary/5 border-secondary shadow-sm' : 'bg-surface border-outline-variant hover:bg-surface-container-low'}`}
              onClick={() => setSelectedRule('manual')}
            >
              <div className="flex items-start gap-3">
                <span className={`material-symbols-outlined text-[28px] ${selectedRule === 'manual' ? 'text-secondary' : 'text-on-surface-variant'}`} style={{ fontVariationSettings: selectedRule === 'manual' ? "'FILL' 1" : "'FILL' 0" }}>format_list_numbered</span>
                <div>
                  <h3 className="font-bold text-on-surface mb-1">Manual Override</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">Set an explicit static order. Use drag handles on the right to arrange.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="flex justify-between items-end mb-2">
              <h2 className="font-bold text-sm text-on-surface-variant uppercase tracking-wider">Preview & Manual Sorting</h2>
              {selectedRule === 'random' && <span className="text-xs font-bold text-secondary bg-secondary/10 px-2 py-1 rounded">PREVIEW (SHUFFLED)</span>}
            </div>

            <div className={`flex flex-col gap-2 rounded-xl p-4 bg-surface-container-low border border-outline-variant ${selectedRule !== 'manual' ? 'opacity-75' : ''}`}>
              {candidates.map((candidate, i) => (
                <div 
                  key={candidate.id}
                  draggable={selectedRule === 'manual'}
                  onDragStart={() => handleDragStart(i)}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(i)}
                  onDragEnd={handleDragEnd}
                  className={`group flex items-center justify-between p-4 bg-surface border border-outline-variant hover:bg-surface-container-high transition-colors ${selectedRule === 'manual' ? 'cursor-move' : ''} ${draggedItem === i ? 'opacity-50' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`material-symbols-outlined transition-colors ${selectedRule === 'manual' ? 'text-on-surface-variant group-hover:text-primary' : 'text-outline opacity-30'}`}>drag_handle</span>
                    <div>
                      <p className="font-bold text-on-surface">{candidate.name}</p>
                      <p className="text-xs text-on-surface-variant uppercase tracking-wider mt-1">ID: {candidate.id} • {candidate.party}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {candidate.incumbent && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary uppercase tracking-wider border border-primary/20">Incumbent</span>
                    )}
                    <span className="material-symbols-outlined text-sm text-on-surface-variant">info</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-4 mt-6 border-t border-outline-variant pt-6">
              <button className="h-12 px-6 border border-primary text-primary font-bold rounded-lg hover:bg-surface-container-high transition-colors" type="button" onClick={() => setSelectedRule('random')}>
                Reset to Default
              </button>
              <button className="h-12 px-8 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-sm flex items-center justify-center gap-2" type="button" onClick={() => {
                alert('Ordering rules securely saved. Audit entry generated.');
                navigate(-1);
              }}>
                <span className="material-symbols-outlined text-[20px]">lock</span>
                Save Ordering Rules
              </button>
            </div>
            
            <div className="flex items-start gap-4 p-4 mt-4 bg-[#f0f9ff] border border-[#bae6fd] rounded-lg">
              <span className="material-symbols-outlined text-[#0284c7]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              <div>
                <h5 className="font-bold text-sm text-[#0284c7] mb-1">Immutable Audit Entry</h5>
                <p className="text-xs text-[#0369a1] leading-relaxed">Updating these rules will generate a signed entry in the System Audit Log. Once the election period begins, ordering rules are locked and cannot be altered without an administrative bypass key.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
