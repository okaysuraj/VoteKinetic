import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Login } from './pages/Login';
import { VoterDashboard } from './pages/VoterDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { Button } from './components/ui/Button';

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) => {
  const { user, role } = useAuth();
  
  if (!user) return <Navigate to="/login" replace />;
  
  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

const DashboardRouter = () => {
  const { role } = useAuth();
  if (role === 'ADMIN') return <Navigate to="/admin" replace />;
  return <Navigate to="/voter" replace />;
};

const Navbar = () => {
  const { user, role, logout } = useAuth();
  
  return (
    <header className="p-4 border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center max-w-7xl">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent flex items-center gap-2">
          VoteKinetic {role === 'ADMIN' && <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full ml-2">ADMIN</span>}
        </h1>
        <nav className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm text-gray-400 hidden md:block">{user.email}</span>
              <Button variant="outline" onClick={logout} className="text-sm py-1.5 px-4">Logout</Button>
            </>
          ) : (
            <Button variant="outline" className="text-sm py-1.5 px-4">Help</Button>
          )}
        </nav>
      </div>
    </header>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-background text-foreground font-sans selection:bg-blue-500/30">
            <Navbar />
          
          <main className="container mx-auto p-4 py-8 max-w-7xl">
            <Routes>
              <Route path="/" element={
                <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-6">
                  <h2 className="text-5xl md:text-7xl font-extrabold text-center tracking-tight text-white leading-tight">
                    Secure. Transparent.<br/><span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Kinetic.</span>
                  </h2>
                  <p className="text-xl text-gray-400 text-center max-w-2xl mt-4">
                    The next-generation online voting platform guaranteeing anonymity, security, and cryptographic verifiability for your organization.
                  </p>
                  <div className="pt-8">
                    <Button onClick={() => window.location.href = '/login'} className="px-10 py-4 text-lg">
                      Enter the Portal
                    </Button>
                  </div>
                </div>
              } />
              
              <Route path="/login" element={<Login />} />
              
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardRouter />
                </ProtectedRoute>
              } />

              <Route path="/voter/*" element={
                <ProtectedRoute allowedRoles={['VOTER']}>
                  <VoterDashboard />
                </ProtectedRoute>
              } />

              <Route path="/admin/*" element={
                <ProtectedRoute allowedRoles={['ADMIN', 'SUPER_ADMIN']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
