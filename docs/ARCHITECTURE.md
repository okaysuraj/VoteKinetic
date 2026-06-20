# Vote Kinetic - System Architecture

## Component Diagram
The system is composed of three primary domains:

1. **PostgreSQL Database**: The source of truth. Contains tables for `users`, `elections`, `candidates`, `votes`, and `audit_logs`.
2. **Node.js/Express Backend**: A RESTful API that handles business logic, database transactions, cryptographic hashing, and JWT authorization.
3. **Clients**:
   - **React (Vite) Web Application**: Browser-based interface for voters and administrators.
   - **React Native (Expo) Mobile Application**: Native companion app for iOS and Android.

## Data Flow
- **Authentication**: Clients POST to `/api/auth/login`. The server verifies the bcrypt hash. If MFA is enabled for the user, it responds with a challenge. Once solved, it issues a stateless JWT.
- **Voting**: Clients POST to `/api/votes`. The server verifies the JWT, ensures the user hasn't voted in the specified election, logs the plaintext vote, generates the SHA-256 ballot receipt, inserts an Immutable Audit Log, and returns the hash to the client.
- **Ledger Verification**: Clients GET `/api/votes/bulletin/:electionId`. The server returns the list of stripped transaction hashes, allowing clients to independently verify the presence of their ballot on the ledger.

## File Structure
```text
/
├── backend/            # Express Server
│   ├── database/       # Schema and seed scripts
│   ├── routes/         # API Controllers
│   ├── server.js       # Entry point
│   └── package.json
├── frontend/           # Vite React App
│   ├── src/            # Components, Contexts, Pages
│   ├── index.html
│   └── package.json
├── mobile/             # Expo React Native App
│   ├── src/            # Screens, Context, Navigation
│   ├── App.js          # Entry point
│   └── app.json
├── docs/               # Architecture & API documentation
└── README.md
```
