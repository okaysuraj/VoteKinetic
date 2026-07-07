# Vote Kinetic

Vote Kinetic is a production-ready, cryptographic voting platform featuring a secure Node.js backend, a responsive React web interface, and a native React Native (Expo) mobile companion app. The platform leverages end-to-end verifiability, immutable logging, and multi-factor authentication (MFA) to ensure absolute election integrity.

## Architecture Overview

- **Backend (`/backend`)**: Node.js, Express, PostgreSQL. Handles all cryptographic hashing, JWT authentication, TOTP/MFA validation, and immutable audit logging.
- **Web App (`/frontend`)**: React (Vite). A sleek, glassmorphic dark-themed web interface for voters to cast ballots and admins to manage elections.
- **Mobile App (`/mobile`)**: React Native (Expo). A premium companion app offering full voting, ledger verification, and cryptographic identity generation natively on iOS and Android.

## Features

- **Immutable Audit Ledger**: All critical actions (login, vote, election creation) are logged using a blockchain-style hashing mechanism where each log cryptographically verifies the previous one.
- **Cryptographic Voting Receipts**: When a user casts a ballot, a SHA-256 hash receipt is generated, allowing them to verify their vote on the Public Bulletin Board without revealing their candidate choice.
- **Multi-Factor Authentication**: TOTP-based MFA integrated with `otplib` ensures robust security for administrative and voter accounts.
- **Platform Parity**: Full feature parity across web and mobile ecosystems.

## Getting Started

Please see the `/docs` folder for detailed setup and API instructions.

1. **Database Setup**: Set up your database in Neon Postgres Cloud and configure the `DATABASE_URL` inside `backend/.env`. Initialize and seed the database by running `npm run db:setup` inside `/backend`.
2. **Backend**: Navigate to `/backend`, run `npm install`, and start the server with `npm run dev`.
3. **Frontend**: Navigate to `/frontend`, run `npm install`, and start the dev server with `npm run dev`.
4. **Mobile**: Navigate to `/mobile`, run `npm install`, and start the Metro bundler with `npx expo start`.

## Documentation
- [System Architecture](./docs/ARCHITECTURE.md)
- [API Reference](./docs/API.md)
- [Security Model](./docs/SECURITY.md)

---

# VoteKinetic Project Audit Report

This report evaluates the current implementation status of the VoteKinetic project against the provided 17-point feature checklist across the Web, Mobile, Backend, and Database layers. It also details the missing configurations required to make the project production-ready.

---

## Feature Implementation Status

### 1. PLATFORM FOUNDATIONS (CORE)
- **Database Schema**: 🟢 Implemented. The `schema.prisma` file includes robust models for `Organization`, `User`, `Role`, and `UserRole`, providing a solid foundation for multi-tenancy and RBAC.
- **Backend/API**: 🟡 Partially Implemented. While the data structures exist, the API routes currently lack strict role enforcement. For example, `admin.routes.ts` has a comment `// Middleware to ensure admin scope would go here in production`, meaning any authenticated user can currently trigger admin endpoints.
- **Missing**: Fine-grained permission matrix enforcement in API middleware, organization-scoped data isolation in all read queries.

### 2. AUTHENTICATION & ACCOUNT SECURITY
- **Backend**: 🟡 Partially Implemented. Firebase Admin is in `package.json` and basic `requireAuth` middleware exists.
- **Web/Mobile**: 🟡 Partially Implemented. Firebase SDK is installed. Mobile uses `expo-local-authentication` for biometric checks before voting.
- **Missing**: Advanced security features like device fingerprinting, concurrent login detection, token expiry handling, and forced logout are not implemented.

### 3. USER PROFILE & PREFERENCES
- **Database/Backend**: 🔴 Not Implemented. The `User` model in `schema.prisma` only contains basic fields (`email`, `firebaseUid`, `displayName`).
- **Missing**: Language preferences, accessibility preferences, notification settings, device lists, and account deletion flows.

### 4. ORGANIZATION MANAGEMENT
- **Database**: 🟡 Partially Implemented. `Organization` model exists with basic name and domain.
- **Backend/Frontend**: 🔴 Not Implemented. There are no dedicated routes or UI screens for managing organizations, inviting members, assigning roles, or configuring branding/feature toggles.

### 5. ELECTION CREATION & CONFIGURATION
- **Database**: 🟡 Partially Implemented. `Election` model supports `title`, `description`, `startDate`, `endDate`, `status`, and `type`.
- **Backend**: 🟡 Partially Implemented. Basic creation route exists and generates RSA key pairs.
- **Missing**: Advanced configurations like timezone-aware scheduling, specific election rules, ballot design (images, party affiliations), and complex voting types (ranked choice logic is missing). Private keys are currently just logged, not stored securely.

### 6. VOTER ELIGIBILITY & ROLL MANAGEMENT
- **Backend**: 🟡 Partially Implemented. A CSV import route (`/import-voters`) exists to populate the `Eligibility` table.
- **Missing**: Manual addition UI, API-based sync, complex eligibility rules (custom attributes, org units), invite/reminder systems, and one-person-one-vote enforcement logic (see critical issue in section 7).

### 7. SECURE VOTING FLOW (CRITICAL)
- **Backend (Token Issuance)**: 🟡 Partially Implemented. `/token` route generates a token and hashes it.
- **Backend (Vote Submission)**: 🟡 Partially Implemented. `/submit` route handles encrypted payload, invalidates the token, and stores an append-only vote hash in a transaction.
- > [!CAUTION]
  > **Critical Flaw**: One-person-one-vote is broken. The `Eligibility.hasVoted` flag defaults to `false` and is **never updated** to `true` when a token is issued or a vote is submitted. Because tokens are decoupled from identity for anonymity, a user can repeatedly hit the `/token` endpoint to get infinite tokens and cast infinite votes.
- **Frontend/Mobile**: 🔴 Not Implemented. The encryption and submission flow is currently mocked/simulated in `VoterDashboard.tsx` and `VoterDashboardScreen.tsx`.

### 8. VOTE SECURITY & INTEGRITY
- **Database**: 🟢 Implemented. `EncryptedVote` model handles append-only storage and vote hashes.
- **Backend**: 🟡 Partially Implemented. Public keys are generated per election.
- **Missing**: The actual client-side encryption logic using the public key is missing on the frontend and mobile apps.

### 9. RESULTS & TALLYING
- **Backend/Frontend**: 🔴 Not Implemented. There is no logic or API routes for decrypting the votes with the private key and tallying the results based on the election type.

### 10. TRANSPARENCY & AUDITING
- **Database/Backend**: 🟢 Implemented. `AuditLog` model exists and `AuditService` is actively used in routes (e.g., when pausing an election or importing voters).
- **Missing**: Cryptographic verification tools, public audit portals, and observer read-only access.

### 11. ADMIN & OPERATOR TOOLS
- **Backend**: 🟡 Partially Implemented. Routes exist to pause elections and view basic platform metrics.
- **Frontend**: 🔴 Not Implemented. The `AdminDashboard.tsx` is present but lacks the comprehensive wizard, live monitoring, and incident response tools requested.

### 12. NOTIFICATIONS & COMMUNICATION
- **Infrastructure**: 🟡 Partially Implemented. `bullmq`, `redis`, and `nodemailer` are installed in the backend. `expo-notifications` is in the mobile app.
- **Implementation**: 🔴 Not Implemented. There are no actual email sending functions, push notification triggers, or scheduled reminder queues implemented in the codebase yet.

### 13. MOBILE (EXPO) SPECIFIC FEATURES
- **Implementation**: 🟡 Partially Implemented. Firebase Auth and Biometric login (`expo-local-authentication`) are set up.
- **Missing**: Offline vote capture, background sync, network state awareness, and app integrity checks.

### 14. OBSERVABILITY & MONITORING
- **Implementation**: 🔴 Not Implemented. No structured logging (e.g., Winston/Pino), APM (e.g., Datadog, New Relic), or error tracking (e.g., Sentry) is configured.

### 15. PRIVACY, LEGAL & COMPLIANCE
- **Implementation**: 🔴 Not Implemented. No consent flows, data retention automation, or legal disclaimers are present in the application flow.

### 16. QUALITY, TESTING & RELIABILITY
- **Implementation**: 🔴 Not Implemented. There are no unit test, integration test, or load test suites configured in the repository (e.g., no Jest, Cypress, or artillery configurations).

### 17. OPTIONAL ADVANCED / DIFFERENTIATORS
- **Implementation**: 🔴 Not Implemented. No ZKP integrations, AI fraud detection, or blockchain anchors are present.

---

## Production Readiness: Required Configuration & Keys

To make this project fully functional and production-ready, you must implement the missing core features (especially the `hasVoted` logic and tallying system) and provision the following infrastructure and configuration keys:

> [!IMPORTANT]
> All sensitive keys must be managed via a secure environment variable manager (e.g., Doppler, AWS Parameter Store) and never committed to source control.

### 1. Database & Caching
- **`DATABASE_URL`**: A production PostgreSQL connection string (e.g., AWS RDS, Supabase, Neon).
- **`REDIS_URL`**: A production Redis instance for BullMQ (background jobs/notifications) and rate limiting.

### 2. Authentication (Firebase)
- **Firebase Admin SDK Service Account JSON**: Required for the backend to verify ID tokens and manage users.
- **Firebase Client Keys**: `API_KEY`, `AUTH_DOMAIN`, `PROJECT_ID` for both Web and Mobile apps to allow user login.

### 3. Security & Cryptography
- **Secure Key Management Service (KMS)**: The backend currently logs the generated `privateKey` to the console upon election creation. This is a massive security risk. You need integration with AWS KMS, HashiCorp Vault, or Google Cloud KMS to securely store the private key required to decrypt votes at the end of an election.
- **`JWT_SECRET` / `SESSION_SECRET`**: Standard secrets for internal session/cookie management if utilized alongside Firebase.

### 4. Communication & Notifications
- **SMTP Credentials**: Required for `nodemailer` (e.g., SendGrid, AWS SES, Postmark API keys).
- **Expo Push Notifications Token**: Required to send push notifications to the mobile app.

### 5. Observability (Optional but Recommended for Prod)
- **Sentry DSN**: For frontend, mobile, and backend error tracking.
- **Log Management API Key**: For structured logs (e.g., Datadog, Logtail).

### 6. Mobile Build Configuration
- **Apple Developer Account & Google Play Console Account**: Required to build, sign, and distribute the Expo apps.
- **App Signing Keys**: For production Android/iOS builds.
