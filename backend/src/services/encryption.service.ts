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
   * Encrypts a vote payload using the election's public key.
   * This is typically done on the client, but provided here for testing/utility.
   */
  static encryptVote(payload: string, publicKey: string): string {
    const buffer = Buffer.from(payload, 'utf8');
    const encrypted = crypto.publicEncrypt(publicKey, buffer);
    return encrypted.toString('base64');
  }

  /**
   * Decrypts an encrypted vote using the election's private key.
   */
  static decryptVote(encryptedPayload: string, privateKey: string): string {
    const buffer = Buffer.from(encryptedPayload, 'base64');
    const decrypted = crypto.privateDecrypt(privateKey, buffer);
    return decrypted.toString('utf8');
  }

  /**
   * Generates a SHA-256 hash of a payload for integrity checks.
   */
  static hashPayload(payload: string): string {
    return crypto.createHash('sha256').update(payload).digest('hex');
  }
}
