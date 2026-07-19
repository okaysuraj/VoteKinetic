import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { organizationApi } from '../../api/client';

export const OrganizationBillingSuperAdmin = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  
  const [billing, setBilling] = useState<any>(null);
  const [org, setOrg] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !id) return;
    Promise.all([
      organizationApi.getById(user, id),
      organizationApi.getBilling(user, id),
    ])
      .then(([orgRes, billRes]) => {
        setOrg(orgRes.organization);
        setBilling(billRes.billing);
      })
      .catch(err => console.error('Failed to load billing', err))
      .finally(() => setLoading(false));
  }, [user, id]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-surface-container-lowest items-center justify-center">
        <div className="text-xl font-medium animate-pulse text-on-surface-variant">Loading billing data...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-surface-container-lowest pb-20 md:pb-0">
      
      {/* Global Super Admin Header */}
      <header className="bg-surface border-b border-outline-variant sticky top-0 z-40">
        <div className="max-w-[1440px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-error rounded flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>admin_panel_settings</span>
            </div>
            <span className="font-headline-md text-primary font-bold tracking-tight">VOTEKINETIC <span className="text-error font-normal text-sm ml-1 uppercase tracking-widest hidden md:inline">Super Admin</span></span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest hidden sm:block">SYSTEM.BILLING</span>
            <div className="flex items-center gap-2 cursor-pointer hover:bg-surface-container p-1 pr-3 rounded-full transition-colors" onClick={() => navigate('/super-admin')}>
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-sm">shield_person</span>
              </div>
              <span className="text-sm font-bold text-on-surface hidden md:block">SysAdmin_01</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row flex-grow max-w-[1440px] mx-auto w-full">
        
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-64 border-r border-outline-variant bg-surface py-6 px-4 shrink-0">
          <button 
            onClick={() => navigate('/super-admin/organizations')} 
            className="flex items-center gap-2 text-on-surface-variant hover:text-primary mb-8 font-bold text-sm transition-colors w-fit"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            Back to Orgs
          </button>
          
          <nav className="space-y-1">
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-lg transition-colors">
              <span className="material-symbols-outlined">monitoring</span>
              <span className="font-bold text-sm">Overview</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-lg transition-colors">
              <span className="material-symbols-outlined">api</span>
              <span className="font-bold text-sm">API Integration</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 bg-primary/10 text-primary font-bold rounded-lg transition-colors">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>receipt_long</span>
              <span className="text-sm">Billing & Usage</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-lg transition-colors">
              <span className="material-symbols-outlined">policy</span>
              <span className="font-bold text-sm">Security Policies</span>
            </a>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow p-4 md:p-8 overflow-y-auto">
          
          <div className="max-w-[1000px] mx-auto space-y-8">
            
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-bold text-primary">{org?.name || 'Unknown Org'}</h1>
                <span className="px-2 py-0.5 bg-[#dcfce7] text-[#166534] text-[10px] font-bold uppercase rounded border border-[#bbf7d0]">{billing?.plan || 'Standard'}</span>
              </div>
              <p className="text-sm text-on-surface-variant font-medium">Billing & Usage Overview • Org ID: {id}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Current Cycle Summary */}
              <section className="bg-surface border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <span className="material-symbols-outlined text-primary text-2xl">credit_card</span>
                  <h2 className="text-xl font-bold text-primary">Current Cycle</h2>
                </div>
                
                <div className="mb-8">
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Estimated Total</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-4xl font-bold text-on-surface">${billing?.currentAmount?.toFixed(2) || '0.00'}</p>
                    <p className="text-sm text-on-surface-variant">USD</p>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-1">Oct 1 - Oct 31, 2024</p>
                </div>
                
                <div className="mt-auto space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium text-on-surface-variant">Base Platform Fee</span>
                    <span className="font-bold text-on-surface">$3,000.00</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium text-on-surface-variant">Active Voter Premium</span>
                    <span className="font-bold text-on-surface">$1,250.00</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium text-on-surface-variant">Overage Charges</span>
                    <span className="font-bold text-on-surface">$0.00</span>
                  </div>
                </div>
              </section>

              {/* Resource Utilization */}
              <section className="bg-surface border border-outline-variant rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-2xl">data_usage</span>
                    <h2 className="text-xl font-bold text-primary">Resource Limits</h2>
                  </div>
                  <button className="text-secondary font-bold text-sm hover:underline">Manage Plan</button>
                </div>
                
                <div className="space-y-6">
                  
                  {/* Usage Item 1 */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[18px]">how_to_vote</span>
                        <span className="font-bold text-sm text-on-surface">Registered Voters</span>
                      </div>
                      <span className="font-bold text-sm text-on-surface">12,450 / 15,000</span>
                    </div>
                    <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                      <div className="bg-secondary h-full transition-all duration-1000" style={{ width: '83%' }}></div>
                    </div>
                    <p className="mt-1 text-[10px] font-medium text-on-surface-variant uppercase tracking-wider">83% of tier capacity reached</p>
                  </div>
                  
                  {/* Usage Item 2 */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[18px]">analytics</span>
                        <span className="font-bold text-sm text-on-surface">Monthly Active Ballots</span>
                      </div>
                      <span className="font-bold text-sm text-on-surface">42 / 100</span>
                    </div>
                    <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                      <div className="bg-secondary h-full transition-all duration-1000" style={{ width: '42%' }}></div>
                    </div>
                    <p className="mt-1 text-[10px] font-medium text-on-surface-variant uppercase tracking-wider">42% of tier capacity reached</p>
                  </div>
                  
                  {/* Usage Item 3 */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-error text-[18px]">storage</span>
                        <span className="font-bold text-sm text-on-surface">Encrypted Storage</span>
                      </div>
                      <span className="font-bold text-sm text-on-surface">4.8 GB / 5 GB</span>
                    </div>
                    <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                      <div className="bg-error h-full transition-all duration-1000" style={{ width: '96%' }}></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <p className="text-[10px] text-error font-bold uppercase tracking-wider">CRITICAL: 96% of capacity</p>
                      <a href="#" className="text-xs text-secondary font-bold hover:underline">Buy Overages</a>
                    </div>
                  </div>
                  
                </div>
              </section>
              
            </div>

            {/* Invoice History */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-primary">Invoice History</h2>
                <button className="text-secondary font-bold text-sm hover:underline">View All</button>
              </div>
              <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-lowest border-b border-outline-variant">
                      <th className="p-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest w-[30%]">Invoice ID</th>
                      <th className="p-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest w-[25%]">Date</th>
                      <th className="p-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest w-[25%]">Amount</th>
                      <th className="p-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest w-[15%]">Status</th>
                      <th className="p-4 w-[5%]"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant">
                    <tr className="hover:bg-surface-container-lowest transition-colors">
                      <td className="p-4 font-bold text-sm text-on-surface">INV-2024-009</td>
                      <td className="p-4 text-sm font-medium text-on-surface-variant">Sep 24, 2024</td>
                      <td className="p-4 text-sm font-bold text-on-surface">$4,250.00</td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1 bg-[#dcfce7] text-[#166534] px-2 py-0.5 rounded border border-[#bbf7d0] text-[10px] font-bold">
                          <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> PAID
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors text-[20px]">file_download</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-surface-container-lowest transition-colors">
                      <td className="p-4 font-bold text-sm text-on-surface">INV-2024-008</td>
                      <td className="p-4 text-sm font-medium text-on-surface-variant">Aug 24, 2024</td>
                      <td className="p-4 text-sm font-bold text-on-surface">$4,250.00</td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1 bg-[#dcfce7] text-[#166534] px-2 py-0.5 rounded border border-[#bbf7d0] text-[10px] font-bold">
                          <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> PAID
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors text-[20px]">file_download</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-surface-container-lowest transition-colors">
                      <td className="p-4 font-bold text-sm text-on-surface">INV-2024-007</td>
                      <td className="p-4 text-sm font-medium text-on-surface-variant">Jul 24, 2024</td>
                      <td className="p-4 text-sm font-bold text-on-surface">$3,900.00</td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1 bg-[#dcfce7] text-[#166534] px-2 py-0.5 rounded border border-[#bbf7d0] text-[10px] font-bold">
                          <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> PAID
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors text-[20px]">file_download</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Help/Trust Section */}
            <div className="mt-8 p-6 bg-surface-container-lowest border border-outline-variant rounded-xl flex items-start gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>shield_lock</span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-on-surface">Financial Transparency & Security</h4>
                <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">
                  All billing operations are performed over encrypted channels. Horizon Group Ltd. maintains a history of all system resource allocations for democratic auditing purposes.
                </p>
                <button className="mt-4 text-secondary font-bold text-sm hover:underline flex items-center gap-1">
                  Download Compliance Report <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                </button>
              </div>
            </div>

          </div>
          
        </main>
      </div>

      {/* Bottom NavBar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 border-t border-outline-variant bg-surface flex justify-around items-center h-16 pb-safe shadow-sm">
        <a href="/super-admin" onClick={(e) => { e.preventDefault(); navigate('/super-admin'); }} className="flex flex-col items-center justify-center text-on-surface-variant active:scale-95 transition-transform">
          <span className="material-symbols-outlined">home</span>
          <span className="text-[10px] font-bold mt-1">Home</span>
        </a>
        <a href="/super-admin/organizations" onClick={(e) => { e.preventDefault(); navigate('/super-admin/organizations'); }} className="flex flex-col items-center justify-center text-primary font-bold active:scale-95 transition-transform">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>corporate_fare</span>
          <span className="text-[10px] font-bold mt-1">Orgs</span>
        </a>
        <a href="/super-admin/users" onClick={(e) => { e.preventDefault(); navigate('/super-admin/users'); }} className="flex flex-col items-center justify-center text-on-surface-variant active:scale-95 transition-transform">
          <span className="material-symbols-outlined">people</span>
          <span className="text-[10px] font-bold mt-1">Users</span>
        </a>
        <a href="/super-admin/settings" onClick={(e) => { e.preventDefault(); navigate('/super-admin/settings'); }} className="flex flex-col items-center justify-center text-on-surface-variant active:scale-95 transition-transform">
          <span className="material-symbols-outlined">shield_person</span>
          <span className="text-[10px] font-bold mt-1">Admin</span>
        </a>
      </nav>

    </div>
  );
};
