import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Layout.css';

export default function Layout() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <div className="layout">
      <header className="header">
        <div className="container header-inner">
          <Link to="/" className="logo">
            <span className="logo-icon">✓</span>
            VoteSecure
          </Link>
          <nav className="nav">
            <NavLink to="/" end>
              Home
            </NavLink>
            {user && (
              <>
                <NavLink to="/dashboard">Dashboard</NavLink>
                <NavLink to="/elections">Elections</NavLink>
                {isAdmin && <NavLink to="/admin">Admin</NavLink>}
              </>
            )}
          </nav>
          <div className="header-actions">
            {user ? (
              <>
                <span className="user-pill">
                  {user.full_name}
                  <span className="role-tag">{user.role}</span>
                </span>
                <button type="button" className="btn btn-outline" onClick={handleLogout}>
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline">
                  Log in
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">
        <div className="container">
          <p>© {new Date().getFullYear()} VoteSecure — Secure Online Voting System</p>
        </div>
      </footer>
    </div>
  );
}
