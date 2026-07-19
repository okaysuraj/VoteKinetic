import crypto from 'crypto';

export class EncryptionService {
  /**
   * Generates a new RSA key pair for an election.
   * @returns { publicKey, privateKey }
   */
  static generateKeyPair() {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
      }
    });

    return { publicKey, privateKey };
  }

  /**
   * Generates a new RSA key pair for an election and returns the public key and encrypted private key.
   */
  static generateElectionKeyPair() {
    const { publicKey, privateKey } = this.generateKeyPair();
    const encryptedPrivateKey = this.encryptPrivateKey(privateKey);
    return { publicKey, encryptedPrivateKey };
  }

  /**
   * Encrypts a vote payload using the election's public key.
   * This is typically done on the client, but provided here for testing/utility.
   */
  static encryptVote(payload: string, publicKey: string): string {
    const buffer = Buffer.from(payload, 'utf8');
    const encrypted = crypto.publicEncrypt(
      {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_PADDING,
      },
      buffer
    );
    return encrypted.toString('base64');
  }

  /**
   * Decrypts an encrypted vote using the election's private key.
   */
  static decryptVote(encryptedPayload: string, privateKey: string): string {
    const buffer = Buffer.from(encryptedPayload, 'base64');
    const decrypted = crypto.privateDecrypt(
      {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_PADDING,
      },
      buffer
    );
    return decrypted.toString('utf8');
  }

  /**
   * Generates a SHA-256 hash of a payload for integrity checks.
   */
  static hashPayload(payload: string): string {
    return crypto.createHash('sha256').update(payload).digest('hex');
  }

  /**
   * Encrypts the private key using AES-256-GCM
   */
  static encryptPrivateKey(privateKey: string): string {
    const masterKey = process.env.MASTER_KEY || 'default_dev_master_key_change_me_in_prod';
    const key = crypto.createHash('sha256').update(String(masterKey)).digest('base64').substring(0, 32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    
    let encrypted = cipher.update(privateKey, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag().toString('hex');
    
    return `${iv.toString('hex')}:${authTag}:${encrypted}`;
  }

  /**
   * Decrypts the private key using AES-256-GCM
   */
  static decryptPrivateKey(encryptedData: string): string {
    const masterKey = process.env.MASTER_KEY || 'default_dev_master_key_change_me_in_prod';
    const key = crypto.createHash('sha256').update(String(masterKey)).digest('base64').substring(0, 32);
    
    const parts = encryptedData.split(':');
    const iv = Buffer.from(parts[0], 'hex');
    const authTag = Buffer.from(parts[1], 'hex');
    const encrypted = parts[2];
    
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(authTag);
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }
}
