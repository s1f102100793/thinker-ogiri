import dotenv from 'dotenv';
import { getApp, getApps, initializeApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import { GoogleAuthProvider, connectAuthEmulator, getAuth } from 'firebase/auth';

dotenv.config();

interface AuthObjects {
  auth: Auth;
  provider: GoogleAuthProvider;
}

let cachedAuth: AuthObjects | undefined;

export const createAuth = (): AuthObjects => {
  if (cachedAuth !== undefined) return cachedAuth;

  let app;

  // Check if Firebase app is already initialized
  if (!getApps().length) {
    // If not, initialize a new Firebase app
    app = initializeApp({
      apiKey: process.env.FIRE_BASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    });
  } else {
    // If yes, use the existing Firebase app
    app = getApp();
  }

  const auth = getAuth(app);

  if (process.env.NEXT_PUBLIC_AUTH_EMULATOR_URL !== undefined) {
    connectAuthEmulator(auth, process.env.NEXT_PUBLIC_AUTH_EMULATOR_URL, { disableWarnings: true });
  }

  const provider = new GoogleAuthProvider();

  cachedAuth = { auth, provider };

  return { auth, provider };
};
