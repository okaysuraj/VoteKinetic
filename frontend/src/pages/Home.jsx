import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

export default function Home() {
  const { user } = useAuth();

  return (
    <section className="hero container">
      <div className="hero-content">
        <p className="hero-eyebrow">Trusted digital democracy</p>
        <h1>Vote securely, anywhere, anytime</h1>
        <p className="hero-lead">
          A full-featured online voting platform with role-based access, real-time results,
          and one-vote-per-election integrity enforced at the database level.
        </p>
        <div className="hero-actions">
          {user ? (
            <Link to="/dashboard" className="btn btn-primary">
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link to="/register" className="btn btn-primary">
                Get started
              </Link>
              <Link to="/login" className="btn btn-outline">
                Sign in
              </Link>
            </>
          )}
          <Link to="/elections" className="btn btn-outline">
            Browse elections
          </Link>
        </div>
      </div>
      <div className="hero-features grid-3">
        <article className="card feature-card">
          <h3>🔐 Secure auth</h3>
          <p>JWT authentication, bcrypt password hashing, and protected API routes.</p>
        </article>
        <article className="card feature-card">
          <h3>🗳️ One vote rule</h3>
          <p>Database constraints prevent duplicate votes per user per election.</p>
        </article>
        <article className="card feature-card">
          <h3>📊 Live results</h3>
          <p>Transparent vote counts and percentage breakdowns for every election.</p>
        </article>
      </div>
    </section>
  );
}
