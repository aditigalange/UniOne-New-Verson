# Quick Setup Guide for Beginners

This guide assumes you have **zero coding experience**. Follow these steps exactly as written.

## What You Need First

1. **A Computer** (Windows, Mac, or Linux)
2. **Internet Connection**
3. **A Web Browser** (Chrome, Firefox, or Edge)

## Step-by-Step Setup

### Part 1: Install Node.js

1. Go to: https://nodejs.org/
2. Download the version that says "LTS" (Long Term Support)
3. Install it by double-clicking the downloaded file
4. Follow the installation wizard (click "Next" on everything)
5. **Restart your computer** after installation

**Verify it worked:**
- Press `Windows Key + R` (or `Cmd + Space` on Mac)
- Type `cmd` and press Enter (or `Terminal` on Mac)
- Type: `node --version`
- You should see a version number like `v18.17.0`
- If you see an error, Node.js didn't install correctly

### Part 2: Open the Project

1. Navigate to your project folder (`D:\new_UniOne`)
2. Right-click in the folder
3. Select "Open in Terminal" or "Open PowerShell window here"
4. If you don't see that option, open Terminal/PowerShell manually and type:
   ```
   cd D:\new_UniOne
   ```

### Part 3: Install Project Files

In the terminal window, type this command and press Enter:

```
npm install
```

**Wait for it to finish** (this takes 2-5 minutes). You'll see lots of text scrolling. When it's done, you'll see your command prompt again.

### Part 4: Set Up Firebase (Required!)

**You cannot skip this step.** The app needs Firebase to work.

1. Go to: https://console.firebase.google.com/
2. Sign in with your Google account (create one if you don't have one)
3. Click "Add project" or "Create a project"
4. Enter project name: `UniOne` (or any name you like)
5. Click "Continue" → "Continue" → "Create project"
6. Wait for it to finish (about 30 seconds)
7. Click "Continue"

**Enable Authentication:**
1. In the left menu, click "Authentication"
2. Click "Get started"
3. Click on "Email/Password"
4. Toggle the first switch to "Enabled"
5. Click "Save"

**Create Firestore Database:**
1. In the left menu, click "Firestore Database"
2. Click "Create database"
3. Select "Start in production mode"
4. Click "Next"
5. Choose a location (select the closest to you)
6. Click "Enable"

**Enable Storage:**
1. In the left menu, click "Storage"
2. Click "Get started"
3. Click "Next" (use default settings)
4. Click "Done"

**Get Your Configuration:**
1. Click the gear icon (⚙️) next to "Project Overview"
2. Click "Project settings"
3. Scroll down to "Your apps"
4. Click the web icon (</>)
5. Register app with name: `UniOne Web`
6. Click "Register app"
7. **Copy the config object** (it looks like this):

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

### Part 5: Add Firebase Config to Your Project

1. In your project folder, open the file: `src/firebase/config.ts`
2. Find the section that says:
   ```typescript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     ...
   };
   ```
3. Replace ALL the placeholder values with the actual values from Firebase
4. **Save the file** (Ctrl+S or Cmd+S)

### Part 6: Set Up Security Rules

1. In Firebase Console, go to "Firestore Database" → "Rules" tab
2. Delete everything in the editor
3. Copy the ENTIRE content from the file `firestore.rules` in your project
4. Paste it into the Firebase Rules editor
5. Click "Publish"

### Part 7: Run the App!

Back in your terminal, type:

```
npm run dev
```

Wait 10-20 seconds. You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

**Open your browser** and go to: `http://localhost:3000`

You should see the login page! 🎉

## Creating Your First Account

1. Click "Sign Up"
2. Fill in all fields:
   - Email (use your real email)
   - Password (at least 6 characters - remember this!)
   - Name
   - Department (e.g., "Computer Science")
   - Year (select from dropdown)
   - Student ID (any ID you want, e.g., "STU001")
3. Click "Create Account"
4. You'll be logged in automatically!

## Stopping the App

When you're done:
- Go back to the terminal window
- Press `Ctrl + C` (or `Cmd + C` on Mac)
- Type `Y` and press Enter

## Running the App Again Later

1. Open terminal in the project folder
2. Type: `npm run dev`
3. Open browser to `http://localhost:3000`

That's it! You're all set up.

## Need Help?

**If Firebase setup is confusing:**
- Watch this video: https://www.youtube.com/watch?v=9kRgVxULbag (first 5 minutes)

**If npm install fails:**
- Make sure Node.js is installed correctly
- Check your internet connection
- Try again

**If the app doesn't open:**
- Make sure you completed the Firebase setup
- Check that you saved the config file correctly
- Look for error messages in the terminal

---

**Remember:** You must complete ALL steps, especially the Firebase setup. The app will not work without it!
