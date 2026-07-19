# Vote Kinetic

Vote Kinetic is a cryptographic voting platform featuring a secure Node.js backend, a responsive React web interface, and a native React Native (Expo) mobile companion app.

---

# VoteKinetic Project Audit Report & Deployment Guide

This report evaluates the current implementation status of the VoteKinetic UI, its backend wiring, and a detailed guide on how to deploy this stack to production using Netlify (Frontend) and Render (Backend).

## 1. UI Implementation Audit

The platform's design was comprehensively scoped in the `skills/` directory, which included mockups for ~193 distinct screens across Web and Mobile.

### Web Frontend (`votekinetic-web-ui`)
- **Implemented Screens**: ~38
- **Missing Screens**: ~58
- **Status**: Core voting flows, admin dashboards, security management, and authentication have been successfully translated into React code inside `frontend/src/pages/`. Features like public audit portals and detailed candidate registration wizards remain unimplemented.

### Mobile Companion App (`votekinetic-mobile-ui`)
- **Implemented Screens**: ~49
- **Missing Screens**: ~48
- **Status**: The Expo app contains a robust implementation of the primary voter interfaces, biometric security setups, election browsing, and observer dashboards. Background sync and offline queues are still missing.

## 2. API & Database Wiring Status

- **Database Connectivity**: The backend utilizes `Prisma` connected to a PostgreSQL database. The core tables (`Organization`, `User`, `Election`, `EncryptedVote`, `Eligibility`) are successfully migrating and persisting data.
- **Frontend/Mobile API Integration**: 
  - The latest iterations (Phase 5) successfully replaced mock data with live API integrations. 
  - Screens like `PlatformSettings`, `EditElection`, and `SecurityManagement` actively communicate with the Node.js backend using `@tanstack/react-query` and standard `fetch` wrappers.
  - Changes to these screens actively mutate the PostgreSQL database in real-time.
- **Authentication**: Fully wired to Firebase for both Web and Mobile. The backend verifies incoming Firebase ID tokens using the Firebase Admin SDK.
- **Remaining Wiring**: While core flows are connected, many of the missing UI screens will require entirely new backend routes to be developed and wired.

---

## 3. Production Deployment Guide

Follow this guide to deploy the backend as a standard web service on **Render**, and the frontend as a static site on **Netlify**.

### Phase 1: Render Deployment (Backend Web Service)

1. **Create a new Web Service** on Render.
2. Connect your GitHub repository.
3. Configure the service settings:
   - **Root Directory**: `backend`
   - **Environment**: Node
   - **Build Command**: `npm install && npm run prisma:generate && npm run build`
   - **Start Command**: `npm run start`
4. **Environment Variables**:
   Add the following variables in the Render dashboard:
   - `DATABASE_URL`: Your production PostgreSQL connection string (e.g., from Neon or Supabase).
   - `REDIS_URL`: Your production Redis connection string (required for rate limiting and queues).
   - `FIREBASE_PROJECT_ID`: Your Firebase project ID.
   - `FIREBASE_CLIENT_EMAIL`: The client email from your Firebase Admin Service Account.
   - `FIREBASE_PRIVATE_KEY`: Your Firebase Admin private key. *(Note: Ensure the newlines `\n` are parsed correctly by Render, or parse them dynamically in your `index.ts`)*.
   - `PORT`: (Optional) Render automatically assigns this, but it defaults to `10000`.
   - `NODE_ENV`: `production`

5. Deploy! Once active, grab the public URL (e.g., `https://votekinetic-backend-xyz.onrender.com`).

### Phase 2: Netlify Deployment (Web Frontend)

1. **Create a new Site** on Netlify.
2. Connect the same GitHub repository.
3. Configure the build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
4. **Environment Variables**:
   Add the following variables in the Netlify dashboard:
   - `VITE_API_URL`: Your Render backend URL appended with `/api` (e.g., `https://votekinetic-backend-xyz.onrender.com/api`).
   - `VITE_FIREBASE_API_KEY`: Firebase Client API Key.
   - `VITE_FIREBASE_AUTH_DOMAIN`: Firebase Client Auth Domain.
   - `VITE_FIREBASE_PROJECT_ID`: Firebase Client Project ID.
   - `VITE_FIREBASE_STORAGE_BUCKET`: Firebase Client Storage Bucket.
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`: Firebase Client Messaging Sender ID.
   - `VITE_FIREBASE_APP_ID`: Firebase Client App ID.

5. **Client-Side Routing Fix**:
   Since React uses client-side routing, you must create a `_redirects` file in the `frontend/public/` folder containing the following line to prevent 404 errors on refresh:
   ```
   /*    /index.html   200
   ```
6. Deploy!

### Phase 3: Post-Deployment Verification

1. Navigate to your Netlify URL.
2. Attempt to register a new user or log in.
3. Observe the network tab to ensure API requests are successfully hitting your Render domain without CORS errors.
4. If CORS blocks the request, update `cors` configuration in `backend/src/index.ts` to explicitly allow your Netlify domain.
