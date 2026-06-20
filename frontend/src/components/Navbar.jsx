import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo headline-md" style={{ fontSize: '24px', letterSpacing: '-0.02em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <img src="/logo.svg" alt="Vote Kinetic Logo" style={{ width: '32px', height: '32px' }} />
          Vote Kinetic
        </Link>
        <nav className="nav-links label-caps">
          {isHome ? (
            <>
              <a href="#engineering">Engineering</a>
              <Link to="/collections">Collections</Link>
              <a href="#about">About</a>
            </>
          ) : (
            <>
              <Link to="/">Home</Link>
            </>
          )}
        </nav>
        <div className="nav-action" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          {user ? (
            <>
              <Link to="/dashboard" className="label-caps" style={{ color: 'var(--cyan-accent)', textDecoration: 'none', marginRight: '16px' }}>{user.full_name}</Link>
              <button onClick={handleLogout} className="btn-ghost" style={{ textDecoration: 'none', background: 'var(--pure-white)', color: 'var(--obsidian)' }}>Log Out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-ghost" style={{ textDecoration: 'none' }}>Log In</Link>
              <Link to="/signup" className="btn-ghost" style={{ textDecoration: 'none', background: 'var(--pure-white)', color: 'var(--obsidian)' }}>Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
