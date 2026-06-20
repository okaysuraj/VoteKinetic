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

1. **Database Setup**: Use Docker Compose to spin up the PostgreSQL database (`docker compose up -d`).
2. **Backend**: Navigate to `/backend`, run `npm install`, and start the server with `npm run dev`.
3. **Frontend**: Navigate to `/frontend`, run `npm install`, and start the dev server with `npm run dev`.
4. **Mobile**: Navigate to `/mobile`, run `npm install`, and start the Metro bundler with `npx expo start`.

## Documentation
- [System Architecture](./docs/ARCHITECTURE.md)
- [API Reference](./docs/API.md)
- [Security Model](./docs/SECURITY.md)
