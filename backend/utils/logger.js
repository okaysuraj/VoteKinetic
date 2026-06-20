import crypto from 'crypto';
import pool from '../config/db.js';

/**
 * Appends a cryptographically chained log entry to the system_logs table.
 * @param {string} action - Short description of the action (e.g., 'VOTE_CAST', 'ELECTION_CREATED')
 * @param {string|object} details - Any JSON-serializable details about the action
 * @param {number|null} userId - The user ID who performed the action (optional)
 */
export async function logAction(action, details, userId = null) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    // Lock the logs table to prevent race conditions in the hash chain
    await client.query('LOCK TABLE system_logs IN EXCLUSIVE MODE');
    
    // Get the previous hash
    const { rows } = await client.query('SELECT current_hash FROM system_logs ORDER BY id DESC LIMIT 1');
    const previousHash = rows.length > 0 ? rows[0].current_hash : '0'.repeat(64); // Genesis hash
    
    const timestamp = new Date().toISOString();
    const detailsStr = typeof details === 'string' ? details : JSON.stringify(details);
    
    // Calculate new hash: SHA-256(previousHash + action + details + userId + timestamp)
    const hashData = `${previousHash}:${action}:${detailsStr}:${userId || 'SYS'}:${timestamp}`;
    const currentHash = crypto.createHash('sha256').update(hashData).digest('hex');
    
    await client.query(
      'INSERT INTO system_logs (action, details, user_id, previous_hash, current_hash) VALUES ($1, $2, $3, $4, $5)',
      [action, detailsStr, userId, previousHash, currentHash]
    );
    
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Failed to write cryptographic log:', error);
  } finally {
    client.release();
  }
}
