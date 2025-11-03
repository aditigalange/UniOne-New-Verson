// EXAMPLE FILE - DO NOT USE THIS DIRECTLY
// Copy the values from Firebase Console and replace in config.ts

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// EXAMPLE CONFIGURATION (Replace with your actual values)
// Get these from: Firebase Console → Project Settings → Your apps → Web app
const firebaseConfig = {
  apiKey: "AIzaSyB1234567890abcdefghijklmnopqrstuvwxyz",        // EXAMPLE - Replace with yours
  authDomain: "your-project-name.firebaseapp.com",             // EXAMPLE - Replace with yours
  projectId: "your-project-name",                              // EXAMPLE - Replace with yours
  storageBucket: "your-project-name.appspot.com",               // EXAMPLE - Replace with yours
  messagingSenderId: "123456789012",                           // EXAMPLE - Replace with yours
  appId: "1:123456789012:web:abc123def456ghi789jkl012mno345"    // EXAMPLE - Replace with yours
};

// After replacing all values above, save the file and restart the dev server

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
