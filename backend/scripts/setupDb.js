import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

const { Client } = pg;

const envPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '../.env');
dotenv.config({ path: envPath });

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function getDbConfig(dbName = 'postgres') {
  const password = process.env.DB_PASSWORD;
  if (password === undefined || password === '') {
    console.error(`
Database setup needs a PostgreSQL password in backend/.env

  1. Open: ${envPath}
  2. Set DB_PASSWORD to your PostgreSQL password for user "${process.env.DB_USER || 'postgres'}"
     Example: DB_PASSWORD=your_db_password
  3. Run again: npm run db:setup
`);
    process.exit(1);
  }

  return {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || 'postgres',
    password,
    database: dbName,
  };
}

async function run() {
  const defaultClient = new Client(getDbConfig('postgres'));
  await defaultClient.connect();

  const dbName = process.env.DB_NAME || 'voting_system';
  
  const res = await defaultClient.query(`SELECT datname FROM pg_catalog.pg_database WHERE datname = '${dbName}'`);
  if (res.rowCount === 0) {
    console.log(`Creating database ${dbName}...`);
    await defaultClient.query(`CREATE DATABASE ${dbName}`);
  }
  await defaultClient.end();

  const client = new Client(getDbConfig(dbName));
  await client.connect();

  const schemaPath = path.join(__dirname, '../database/schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf8');
  await client.query(schema);

  const adminHash = await bcrypt.hash('Admin@123', 10);
  const voterHash = await bcrypt.hash('Voter@123', 10);

  await client.query(
    `INSERT INTO users (full_name, email, password_hash, role)
     VALUES ($1, $2, $3, 'admin'), ($4, $5, $6, 'voter')
     ON CONFLICT (email) DO UPDATE SET 
        password_hash = EXCLUDED.password_hash, 
        full_name = EXCLUDED.full_name`,
    [
      'System Administrator',
      'admin@voting.com',
      adminHash,
      'Demo Voter',
      'voter@voting.com',
      voterHash,
    ]
  );

  const existingRes = await client.query(
    "SELECT id FROM elections WHERE title = 'Student Council Election 2026'"
  );

  if (existingRes.rowCount === 0) {
    const adminRes = await client.query(
      "SELECT id FROM users WHERE email = 'admin@voting.com'"
    );
    const adminId = adminRes.rows[0].id;

    const start = new Date();
    const end = new Date();
    end.setDate(end.getDate() + 14);

    const electionResult = await client.query(
      `INSERT INTO elections (title, description, start_date, end_date, status, created_by)
       VALUES ($1, $2, $3, $4, 'active', $5) RETURNING id`,
      [
        'Student Council Election 2026',
        'Vote for your student council representatives. One vote per registered voter.',
        start,
        end,
        adminId,
      ]
    );

    const electionId = electionResult.rows[0].id;
    const candidates = [
      ['Alex Johnson', 'Progress Alliance', 'Focused on campus sustainability and student wellness.'],
      ['Maria Garcia', 'Unity Party', 'Advocates for affordable housing and academic support programs.'],
      ['James Chen', 'Independent', 'Experienced student leader with a track record in event management.'],
    ];

    for (const [name, party, bio] of candidates) {
      await client.query(
        'INSERT INTO candidates (election_id, full_name, party, bio) VALUES ($1, $2, $3, $4)',
        [electionId, name, party, bio]
      );
    }
  }

  await client.end();
  console.log('Database setup complete.');
  console.log('Admin: admin@voting.com / Admin@123');
  console.log('Voter: voter@voting.com / Voter@123');
}

run().catch((err) => {
  if (err.code === '28P01') {
    console.error(`Setup failed: PostgreSQL rejected login for user "${process.env.DB_USER || 'postgres'}".
Check DB_USER and DB_PASSWORD in backend/.env match your PostgreSQL account.`);
  } else {
    console.error('Setup failed:', err.message);
  }
  process.exit(1);
});
