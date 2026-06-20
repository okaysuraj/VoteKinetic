# Vote Kinetic - Security & Cryptographic Model

The Vote Kinetic platform employs defense-in-depth and cryptographic verifiability to ensure election integrity.

## 1. Immutable Audit Ledger
The backend maintains an `audit_logs` table. Every action inserted into this table calculates its `hash` using:
`SHA-256(action + user_id + timestamp + details + previous_hash)`.
Because every log references the hash of the log before it, the ledger forms an unbreakable chain. If any historical log is tampered with, all subsequent hashes will fail validation, instantly alerting administrators to a data breach.

## 2. End-to-End Verifiability (E2E-V)
When a voter casts a ballot, the server generates a unique `transaction_hash` using:
`SHA-256(election_id + user_id + candidate_id + timestamp + salt)`.
- The voter's plaintext choice is stored securely in the database.
- Only the `transaction_hash` and timestamp are exposed on the **Public Bulletin Board**.
- The voter can verify that their hash appears on the ledger, proving their vote was counted, without the system publicly revealing who they voted for.

## 3. Multi-Factor Authentication (MFA)
Vote Kinetic uses Time-Based One-Time Passwords (TOTP) via the `otplib` library.
- Users can enable MFA to generate a base32 secret.
- The platform provides a QR code URI (compatible with Google Authenticator, Authy, etc.).
- The `/auth/login` endpoint dynamically intercepts standard logins if MFA is enabled, returning `requires_mfa: true`. The client must then submit a valid 6-digit `totp_code` to receive their JWT.

## 4. Application Security (AppSec)
The Node.js backend is hardened using:
- **Helmet**: Secures HTTP headers.
- **Express-Rate-Limit**: Throttles requests to prevent brute-force attacks on login and voting endpoints.
- **Bcrypt**: All passwords are cryptographically salted and hashed.
- **JWT**: Stateless authentication tokens.
- **Expo Secure Store**: The mobile app encrypts the JWT into the device's native Keychain/Keystore.
