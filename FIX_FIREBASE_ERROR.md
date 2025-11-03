# Fix: Firebase API Key Error

**Error Message:** `Firebase: Error (auth/api-key-not-valid.-please-pass-a-valid-api-key.)`

This error means your Firebase configuration is not set up correctly. Follow these steps to fix it.

---

## 🔧 Solution: Add Your Firebase Configuration

### Step 1: Get Your Firebase Configuration

1. **Go to Firebase Console:**
   - Open: https://console.firebase.google.com/
   - Sign in with your Google account

2. **Select or Create Your Project:**
   - If you haven't created a project, click "Add project"
   - Enter a project name (e.g., "UniOne")
   - Follow the setup wizard and click "Create project"

3. **Get Your Web App Configuration:**
   - Click the **gear icon (⚙️)** next to "Project Overview" at the top left
   - Click **"Project settings"**
   - Scroll down to the section **"Your apps"**
   - If you see a web app already registered, click on it
   - **OR** if you don't see a web app:
     - Click the **web icon `</>`** 
     - Register your app with nickname: **"UniOne Web"**
     - Click **"Register app"**
     - **Copy the config object** that appears

4. **Copy the Configuration:**
   You'll see something like this:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
     authDomain: "your-project-name.firebaseapp.com",
     projectId: "your-project-name",
     storageBucket: "your-project-name.appspot.com",
     messagingSenderId: "123456789012",
     appId: "1:123456789012:web:abcdef1234567890"
   };
   ```

### Step 2: Update Your Project File

1. **Open the config file:**
   - Navigate to: `src/firebase/config.ts`
   - Open it in your code editor

2. **Replace ALL the placeholder values:**
   
   **BEFORE (Current - Wrong):**
   ```typescript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_PROJECT_ID.appspot.com",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   ```

   **AFTER (Correct):**
   ```typescript
   const firebaseConfig = {
     apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",  // Your actual API key
     authDomain: "your-project-name.firebaseapp.com",  // Your actual auth domain
     projectId: "your-project-name",  // Your actual project ID
     storageBucket: "your-project-name.appspot.com",  // Your actual storage bucket
     messagingSenderId: "123456789012",  // Your actual messaging sender ID
     appId: "1:123456789012:web:abcdef1234567890"  // Your actual app ID
   };
   ```

3. **Save the file** (Ctrl+S or Cmd+S)

### Step 3: Verify Firebase Services Are Enabled

Make sure these services are enabled in your Firebase project:

1. **Authentication:**
   - Go to Firebase Console → **Authentication**
   - Click **"Get started"** if not already enabled
   - Go to **"Sign-in method"** tab
   - Click on **"Email/Password"**
   - Toggle **"Enable"** → Click **"Save"**

2. **Firestore Database:**
   - Go to Firebase Console → **Firestore Database**
   - Click **"Create database"** if not created
   - Choose **"Start in production mode"** → Next
   - Select a location → **Enable**

3. **Storage:**
   - Go to Firebase Console → **Storage**
   - Click **"Get started"**
   - Use default settings → **Done**

### Step 4: Restart Your Development Server

1. **Stop the current server:**
   - Go to your terminal
   - Press `Ctrl + C` (or `Cmd + C` on Mac)

2. **Start it again:**
   ```bash
   npm run dev
   ```

3. **Test the app:**
   - Open `http://localhost:3000`
   - Try to sign up or login
   - The error should be gone!

---

## ✅ Quick Checklist

Before trying again, make sure:

- [ ] You copied the config from Firebase Console (not typed manually)
- [ ] All 6 values are replaced (apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId)
- [ ] The values are wrapped in quotes `"..."` 
- [ ] No extra spaces or typos
- [ ] You saved the file (`src/firebase/config.ts`)
- [ ] Authentication is enabled in Firebase Console
- [ ] Firestore Database is created
- [ ] Storage is enabled
- [ ] You restarted the dev server

---

## 🎯 Example: What Correct Config Looks Like

Here's an example of what your config file should look like (with fake values for illustration):

```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB1234567890abcdefghijklmnopqrstuvwxyz",
  authDomain: "unione-project.firebaseapp.com",
  projectId: "unione-project",
  storageBucket: "unione-project.appspot.com",
  messagingSenderId: "987654321098",
  appId: "1:987654321098:web:abc123def456ghi789"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
```

**Important:** Replace these with YOUR actual values from Firebase Console!

---

## 🚨 Common Mistakes to Avoid

1. **Don't leave placeholder text** like "YOUR_API_KEY"
2. **Don't add extra quotes** or brackets
3. **Don't miss any fields** - all 6 are required
4. **Don't use someone else's config** - each project has unique values
5. **Make sure values are strings** - they should be in quotes

---

## 💡 Still Not Working?

If you still get the error after following these steps:

1. **Double-check the config values:**
   - Go back to Firebase Console
   - Project Settings → Your apps
   - Copy the config again
   - Make sure you copied the entire string for each field

2. **Check browser console:**
   - Open browser DevTools (F12)
   - Look for any other error messages
   - Share the full error if you need more help

3. **Verify Firebase services:**
   - Make sure Authentication is enabled
   - Make sure you're using the correct project

4. **Clear browser cache:**
   - Press `Ctrl + Shift + R` (or `Cmd + Shift + R` on Mac)
   - Or open in incognito/private mode

---

**Once you complete these steps, the error will be fixed!** ✅
