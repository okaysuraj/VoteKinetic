# Vote Kinetic - API Reference

Base URL: `/api`

## Authentication (`/auth`)

### `POST /auth/register`
Creates a new cryptographic identity.
- **Body**: `{ full_name, email, password, role }`
- **Response**: `{ token, user }`

### `POST /auth/login`
Authenticates an existing node.
- **Body**: `{ email, password, totp_code? }`
- **Response**: 
  - Success: `{ token, user }`
  - MFA Required: `{ requires_mfa: true, message: "..." }`

### `GET /auth/me`
Retrieves current user identity (requires Auth Header).

### `POST /auth/mfa/generate`
Generates a TOTP secret and provisioning URI (requires Auth Header).
- **Response**: `{ secret, qrCode }`

### `POST /auth/mfa/verify`
Verifies a TOTP code and enables MFA (requires Auth Header).
- **Body**: `{ code }`

---

## Elections (`/elections`)

### `GET /elections`
Retrieves all elections.

### `GET /elections/:id`
Retrieves election details and candidates. If an Authorization header is provided, it also checks if the user has voted.

### `POST /elections`
Creates a new election (requires Admin Auth Header).

---

## Voting (`/votes`)

### `POST /votes`
Casts a cryptographic ballot (requires Auth Header).
- **Body**: `{ election_id, candidate_id }`
- **Response**: `{ message, transaction_hash }`

### `GET /votes/bulletin/:electionId`
Retrieves the public ledger of stripped transaction hashes for an election.

---

## Analytics & Audit (`/stats`)

### `GET /stats/dashboard`
Retrieves high-level platform statistics.

### `GET /stats/logs`
Retrieves the immutable audit log ledger (requires Admin Auth Header).
- **Response**: `[{ id, action, details, timestamp, previous_hash, hash }]`
