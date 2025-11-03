import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// Firebase configuration
// ⚠️ IMPORTANT: Replace these placeholder values with your actual Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Check if config is valid (not placeholder)
const isConfigValid = firebaseConfig.apiKey !== "YOUR_API_KEY" && 
                     firebaseConfig.apiKey.length > 20 &&
                     firebaseConfig.projectId !== "YOUR_PROJECT_ID" &&
                     firebaseConfig.projectId.length > 0;

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;

// Initialize Firebase only if config is valid - with error handling
if (isConfigValid) {
  try {
    // Check if already initialized
    const existingApps = getApps();
    if (existingApps.length === 0) {
      app = initializeApp(firebaseConfig);
    } else {
      app = existingApps[0];
    }
    
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
  } catch (error) {
    console.error('Firebase initialization error:', error);
    // Set to null if initialization fails
    app = null;
    auth = null;
    db = null;
    storage = null;
  }
} else {
  console.warn('⚠️ Firebase not configured. App will work in limited mode.');
  console.warn('⚠️ To enable full features, update src/firebase/config.ts with your Firebase credentials.');
}

// Export with null safety
export { auth, db, storage };
export default app;
