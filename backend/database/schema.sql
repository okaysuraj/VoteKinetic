CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(180) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'voter' CHECK (role IN ('admin', 'voter')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  totp_secret VARCHAR(64),
  mfa_enabled BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_role ON users (role);
CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);

DROP TRIGGER IF EXISTS set_timestamp_users ON users;
CREATE TRIGGER set_timestamp_users
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

CREATE TABLE IF NOT EXISTS elections (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'completed', 'cancelled')),
  created_by INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE RESTRICT
);

CREATE INDEX IF NOT EXISTS idx_elections_status ON elections (status);
CREATE INDEX IF NOT EXISTS idx_elections_dates ON elections (start_date, end_date);

DROP TRIGGER IF EXISTS set_timestamp_elections ON elections;
CREATE TRIGGER set_timestamp_elections
BEFORE UPDATE ON elections
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

CREATE TABLE IF NOT EXISTS candidates (
  id SERIAL PRIMARY KEY,
  election_id INT NOT NULL,
  full_name VARCHAR(120) NOT NULL,
  party VARCHAR(120),
  bio TEXT,
  photo_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (election_id) REFERENCES elections(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_candidates_election ON candidates (election_id);

CREATE TABLE IF NOT EXISTS votes (
  id SERIAL PRIMARY KEY,
  election_id INT NOT NULL,
  user_id INT NOT NULL,
  candidate_id INT NOT NULL,
  transaction_hash VARCHAR(64) UNIQUE,
  receipt_salt VARCHAR(64),
  voted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (election_id, user_id),
  FOREIGN KEY (election_id) REFERENCES elections(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_votes_election ON votes (election_id);

CREATE TABLE IF NOT EXISTS system_logs (
  id SERIAL PRIMARY KEY,
  action VARCHAR(100) NOT NULL,
  details TEXT,
  user_id INT,
  previous_hash VARCHAR(64) NOT NULL,
  current_hash VARCHAR(64) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_system_logs_created_at ON system_logs (created_at);
