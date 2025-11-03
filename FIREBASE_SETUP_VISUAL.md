# Visual Guide: Firebase Setup (Step-by-Step with Screenshots Description)

## 📸 Step-by-Step Visual Instructions

### Step 1: Open Firebase Console
1. Go to: **https://console.firebase.google.com/**
2. Sign in with your Google account
3. You'll see your projects dashboard

---

### Step 2: Create or Select Project

**If you don't have a project yet:**
- Click **"Add project"** or **"Create a project"**
- Enter project name: **"UniOne"** (or any name)
- Click **Continue**
- (Optional) Enable Google Analytics → Click **Continue**
- Click **Create project**
- Wait 30 seconds → Click **Continue**

**If you already have a project:**
- Click on your project name from the list

---

### Step 3: Get Your Configuration

**Visual Description of What You'll See:**

```
Firebase Console Layout:
┌─────────────────────────────────────┐
│ 🔥 Firebase    [⚙️ Project Settings] │
├─────────────────────────────────────┤
│ Project Overview                   │
│                                     │
│ Build: Authentication, Firestore... │
│                                     │
│ [⚙️ Project Settings] ← CLICK HERE │
└─────────────────────────────────────┘
```

1. **Click the ⚙️ gear icon** next to "Project Overview" (top left)
2. **Click "Project settings"** from the dropdown
3. You'll see multiple tabs: General, Usage and billing, Service accounts, etc.
4. **Scroll down** past the "General" section
5. Look for **"Your apps"** section

**What "Your apps" section looks like:**
```
Your apps
┌──────────────────────────────────────┐
│ iOS         Android         Web  </> │ ← Look for this </> icon
└──────────────────────────────────────┘
```

---

### Step 4: Register Web App (If Not Done)

**If you see a web app already registered:**
- Click on the web app card
- You'll see your config - **copy it!**

**If you don't see a web app:**
1. Click the **web icon `</>`** 
2. A modal/popup appears:
   ```
   ┌─────────────────────────────┐
   │ Add Firebase to your web app│
   ├─────────────────────────────┤
   │ App nickname:               │
   │ [UniOne Web         ]       │ ← Type this
   │                             │
   │ [ ] Also set up Firebase    │
   │     Hosting                 │
   │                             │
   │         [Register app]      │ ← Click here
   └─────────────────────────────┘
   ```
3. Enter nickname: **"UniOne Web"**
4. **Don't check** the hosting option (unless you want it)
5. Click **"Register app"**

---

### Step 5: Copy Configuration

**After clicking "Register app", you'll see:**

```
┌──────────────────────────────────────────────┐
│ Firebase SDK snippet                         │
│ Choose your config:                          │
│ ⚫ CDN  ⚫ npm  ⚫ Config                      │
│                                               │
│ const firebaseConfig = {                     │
│   apiKey: "AIzaSy...",        ← Copy all of │
│   authDomain: "...",          ← this config  │
│   projectId: "...",           ← object      │
│   storageBucket: "...",                      │
│   messagingSenderId: "...",                  │
│   appId: "..."                               │
│ };                                           │
│                                               │
│ [Copy]  [Continue to console]                │
└──────────────────────────────────────────────┘
```

1. **Select "Config"** option (not CDN or npm)
2. You'll see the `firebaseConfig` object
3. **Click "Copy"** button (or manually select and copy all)
4. **Copy ALL 6 values:**
   - apiKey
   - authDomain  
   - projectId
   - storageBucket
   - messagingSenderId
   - appId

---

### Step 6: Enable Required Services

**Before using the app, enable these services:**

#### A. Enable Authentication:
```
Firebase Console Sidebar:
├─ 📊 Project Overview
├─ 🔐 Authentication          ← Click here
├─ 📝 Firestore Database
├─ 📦 Storage
└─ ...
```

1. Click **"Authentication"** in left sidebar
2. Click **"Get started"** (if first time)
3. Go to **"Sign-in method"** tab
4. Click **"Email/Password"**
5. Toggle **"Enable"** switch to ON
6. Click **"Save"**

#### B. Enable Firestore:
1. Click **"Firestore Database"** in sidebar
2. Click **"Create database"**
3. Select **"Start in production mode"**
4. Click **Next**
5. Choose location (closest to you)
6. Click **Enable**

#### C. Enable Storage:
1. Click **"Storage"** in sidebar
2. Click **"Get started"**
3. Click **Next** (use defaults)
4. Click **Done**

---

### Step 7: Update Your Code

1. Open file: **`src/firebase/config.ts`** in your code editor
2. Find the `firebaseConfig` object
3. Replace **ALL 6 placeholder values** with your copied values

**Before:**
```typescript
apiKey: "YOUR_API_KEY",  ❌ Wrong
```

**After:**
```typescript
apiKey: "AIzaSyB1234567890abcdefghijklmnopqrstuvwxyz",  ✅ Correct
```

4. **Save the file** (Ctrl+S)

---

### Step 8: Restart Development Server

1. In your terminal, press **Ctrl+C** to stop the server
2. Run again: **`npm run dev`**
3. Open browser: **http://localhost:3000**
4. **Error should be gone!** ✅

---

## ✅ Quick Checklist

Before testing, verify:
- [ ] You copied config from Firebase Console
- [ ] All 6 values replaced in `src/firebase/config.ts`
- [ ] Values are in quotes (strings)
- [ ] No typos or extra spaces
- [ ] File is saved
- [ ] Authentication enabled (Email/Password)
- [ ] Firestore Database created
- [ ] Storage enabled
- [ ] Dev server restarted

---

## 🎯 Where to Find Each Value

| What You Need | Where to Find It |
|--------------|------------------|
| All 6 values | Firebase Console → Project Settings → Your apps → Web app → Config |
| If config not showing | Click `</>` icon → Register app → Get config |

---

## 💡 Pro Tip

**Copy the ENTIRE config object at once** instead of copying each field individually - it's faster and reduces errors!

---

**Follow these steps and your Firebase error will be fixed!** 🚀
