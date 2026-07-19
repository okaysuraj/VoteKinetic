import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const VoterProfile = () => {
  const { user } = useAuth();

  return (
    <div className="bg-surface text-on-surface flex flex-col min-h-screen">
      {/* TopNavBar */}
      <header className="w-full top-0 sticky bg-surface border-b border-outline-variant z-50">
        <div className="max-w-[1440px] mx-auto px-4 md:px-10 flex justify-between items-center h-16">
          <div className="flex items-center gap-6">
            <Link to="/dashboard" className="font-headline-md text-headline-md font-bold text-primary">VOTEKINETIC</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/voter/notifications" className="material-symbols-outlined text-primary cursor-pointer hover:text-secondary transition-colors duration-200">notifications</Link>
            <Link to="/voter/profile" className="material-symbols-outlined text-primary cursor-pointer hover:text-secondary transition-colors duration-200">settings</Link>
            <div className="w-8 h-8 rounded-full border border-outline-variant bg-surface-container flex items-center justify-center ml-2">
              <span className="material-symbols-outlined text-on-surface-variant text-sm">person</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Main Content */}
        <main className="flex-1 p-4 md:p-10 bg-surface-bright flex justify-center">
          <div className="w-full max-w-[1000px] grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Identity & Actions */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-8 flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full border-4 border-surface-variant bg-surface-container-high flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[64px] text-on-surface-variant">person</span>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">{user?.displayName || 'Voter Profile'}</h1>
                <p className="font-body-md text-body-md text-on-surface-variant mb-2">Voter ID: <span className="font-mono text-primary font-medium tracking-wide">{user?.uid || 'VOT-000'}</span></p>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm mb-8">
                  Active Civilian
                </span>
                <div className="w-full space-y-2">
                  <button className="w-full flex items-center justify-center gap-2 bg-primary text-on-primary font-label-md text-label-md py-3 rounded hover:bg-primary-container transition-colors duration-200">
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                    Edit Profile
                  </button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4">
                <h3 className="font-headline-md text-headline-md text-on-surface mb-4 text-sm border-b border-outline-variant pb-2">Record Overview</h3>
                <div className="flex justify-between items-center py-2">
                  <span className="font-body-md text-body-md text-on-surface-variant">Elections Participated</span>
                  <span className="font-label-md text-label-md text-primary">3</span>
                </div>
                <div className="flex justify-between items-center py-2 border-t border-surface-variant">
                  <span className="font-body-md text-body-md text-on-surface-variant">Last Voted</span>
                  <span className="font-label-md text-label-md text-primary">Recently</span>
                </div>
                <div className="flex justify-between items-center py-2 border-t border-surface-variant">
                  <span className="font-body-md text-body-md text-on-surface-variant">Risk Level</span>
                  <span className="font-label-md text-label-md text-surface-tint">Low</span>
                </div>
              </div>
            </div>

            {/* Right Column: Details & Audit */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              {/* Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Account Info */}
                <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-4 border-b border-outline-variant pb-3">
                    <span className="material-symbols-outlined text-primary">person</span>
                    <h3 className="font-headline-md text-headline-md text-on-surface text-base">Account Information</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Date of Birth</label>
                      <div className="font-body-md text-body-md text-on-surface">Protected Info</div>
                    </div>
                    <div>
                      <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Registered Address</label>
                      <div className="font-body-md text-body-md text-on-surface">Secure Database Location</div>
                    </div>
                    <div>
                      <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Contact Email</label>
                      <div className="font-body-md text-body-md text-on-surface">{user?.email || 'email@voters.gov'}</div>
                    </div>
                  </div>
                </div>

                {/* Registration Status */}
                <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-4 border-b border-outline-variant pb-3">
                    <span className="material-symbols-outlined text-primary">how_to_reg</span>
                    <h3 className="font-headline-md text-headline-md text-on-surface text-base">Registration Status</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Verification Level</label>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
                        <span className="font-body-md text-body-md text-on-surface">Level 3 (Biometric Confirmed)</span>
                      </div>
                    </div>
                    <div>
                      <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Station Assignment</label>
                      <div className="font-body-md text-body-md text-on-surface">Online Secure Terminal</div>
                    </div>
                    <div>
                      <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Registration Date</label>
                      <div className="font-body-md text-body-md text-on-surface">System Timestamp</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Audit Trail Table */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-lg flex flex-col overflow-hidden">
                <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">history</span>
                    <h3 className="font-headline-md text-headline-md text-on-surface text-base">Recent Audit Trail</h3>
                  </div>
                  <Link to="/voter/logs" className="font-label-sm text-label-sm text-secondary hover:text-primary transition-colors">View Full Log</Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-surface-variant bg-surface-bright">
                        <th className="p-3 font-label-sm text-label-sm text-on-surface-variant font-medium">Timestamp</th>
                        <th className="p-3 font-label-sm text-label-sm text-on-surface-variant font-medium">Event Type</th>
                        <th className="p-3 font-label-sm text-label-sm text-on-surface-variant font-medium">IP Address</th>
                        <th className="p-3 font-label-sm text-label-sm text-on-surface-variant font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="font-body-md text-body-md text-on-surface divide-y divide-surface-variant">
                      <tr className="hover:bg-surface-container-lowest transition-colors">
                        <td className="p-3 text-sm text-on-surface-variant">Just now</td>
                        <td className="p-3 text-sm">Profile Data Accessed</td>
                        <td className="p-3 text-sm font-mono text-on-surface-variant">Secure Node</td>
                        <td className="p-3">
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-secondary">
                            <span className="w-2 h-2 rounded-full bg-secondary"></span>
                            Success
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-surface-container-lowest transition-colors">
                        <td className="p-3 text-sm text-on-surface-variant">Earlier today</td>
                        <td className="p-3 text-sm">Dashboard Accessed</td>
                        <td className="p-3 text-sm font-mono text-on-surface-variant">Secure Node</td>
                        <td className="p-3">
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-secondary">
                            <span className="w-2 h-2 rounded-full bg-secondary"></span>
                            Success
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="w-full mt-auto bg-surface-container-highest border-t border-outline-variant">
        <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-4 flex flex-col md:flex-row justify-between items-center">
          <div className="font-label-sm text-label-sm text-on-surface-variant opacity-80 hover:opacity-100 transition-opacity">
            © 2024 VOTEKINETIC Secure Systems.
          </div>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary transition-colors" href="#">Security Protocol</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary transition-colors" href="#">Legal Compliance</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary transition-colors" href="#">System Status</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
